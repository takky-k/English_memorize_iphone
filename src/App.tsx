import { useEffect, useMemo, useState } from "react";

import {
  addCustomVocabularyItem,
  createScreeningSession,
  createTestSession,
  exportStudyData,
  getRecentAttempts,
  getVocabularyStats,
  initializeStore,
  recordAnswer,
  resetStudyProgress,
  restoreScreeningItem,
  screenVocabularyItem
} from "./storage";
import type {
  AnswerResult,
  AttemptRecord,
  ScreeningDecision,
  TestSummary,
  VocabularyItemType,
  VocabularyItem,
  VocabularyStats
} from "./types";

const TEST_SIZE = 10;
const initialSummary: TestSummary = {
  correct: 0,
  uncertain: 0,
  incorrect: 0,
  excluded: 0,
  total: 0
};

type AnsweredItem = {
  item: VocabularyItem;
  result: AnswerResult;
};

type AppMode = "test" | "screening";

type ScreeningUndo = {
  item: VocabularyItem;
  decision: ScreeningDecision;
};

function createSessionId() {
  return `session-${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

export default function App() {
  const [db, setDb] = useState<IDBDatabase | null>(null);
  const [stats, setStats] = useState<VocabularyStats | null>(null);
  const [recentAttempts, setRecentAttempts] = useState<AttemptRecord[]>([]);
  const [sessionItems, setSessionItems] = useState<VocabularyItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnswerVisible, setIsAnswerVisible] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [answeredItems, setAnsweredItems] = useState<AnsweredItem[]>([]);
  const [newTerm, setNewTerm] = useState("");
  const [newMeaning, setNewMeaning] = useState("");
  const [newDefinition, setNewDefinition] = useState("");
  const [newItemType, setNewItemType] = useState<VocabularyItemType>("word");
  const [addMessage, setAddMessage] = useState("");
  const [summary, setSummary] = useState<TestSummary>(initialSummary);
  const [sessionId, setSessionId] = useState(createSessionId);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [mode, setMode] = useState<AppMode>("test");
  const [screeningItems, setScreeningItems] = useState<VocabularyItem[]>([]);
  const [screeningIndex, setScreeningIndex] = useState(0);
  const [screeningBaseCompleted, setScreeningBaseCompleted] = useState(0);
  const [screeningTotal, setScreeningTotal] = useState(0);
  const [isScreeningMeaningVisible, setIsScreeningMeaningVisible] = useState(false);
  const [isScreeningSaving, setIsScreeningSaving] = useState(false);
  const [screeningUndo, setScreeningUndo] = useState<ScreeningUndo[]>([]);

  useEffect(() => {
    void initialize();

    return () => {
      window.speechSynthesis?.cancel();
    };
  }, []);

  const currentItem = sessionItems[currentIndex];
  const currentScreeningItem = screeningItems[screeningIndex];
  const screeningCompleted = Math.min(
    screeningBaseCompleted + screeningIndex,
    screeningTotal
  );
  const screeningRemaining = Math.max(screeningTotal - screeningCompleted, 0);
  const screeningProgress =
    screeningTotal > 0 ? Math.round((screeningCompleted / screeningTotal) * 100) : 100;
  const sessionTargetCount = Math.min(TEST_SIZE, sessionItems.length);
  const isFinished =
    sessionTargetCount > 0 &&
    (summary.total >= sessionTargetCount || currentIndex >= sessionTargetCount);
  const scoreLabel = `${summary.correct} / ${summary.total}`;
  const progressLabel =
    sessionTargetCount > 0
      ? `${Math.min(currentIndex + 1, sessionTargetCount)} / ${sessionTargetCount}`
      : `0 / ${TEST_SIZE}`;
  const lifetimeAccuracyLabel =
    stats && stats.attempts > 0 ? `${Math.round((stats.correct / stats.attempts) * 100)}%` : "0%";

  const accuracyLabel = useMemo(() => {
    if (summary.total === 0) {
      return "0%";
    }

    return `${Math.round((summary.correct / summary.total) * 100)}%`;
  }, [summary.correct, summary.total]);

  async function initialize() {
    try {
      const database = await initializeStore();
      setDb(database);
      await refreshDashboard(database);
      await startNewSession(database);
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "ブラウザ内データベースの初期化に失敗しました。"
      );
    } finally {
      setIsLoading(false);
    }
  }

  async function refreshDashboard(database = db) {
    if (!database) {
      return;
    }

    const [nextStats, nextAttempts] = await Promise.all([
      getVocabularyStats(database),
      getRecentAttempts(database)
    ]);
    setStats(nextStats);
    setRecentAttempts(nextAttempts);
  }

  async function startNewSession(database = db) {
    if (!database) {
      return;
    }

    window.speechSynthesis?.cancel();
    setIsSpeaking(false);
    setIsLoading(true);
    const nextItems = await createTestSession(database);
    setSessionItems(nextItems);
    setCurrentIndex(0);
    setIsAnswerVisible(false);
    setAnsweredItems([]);
    setSummary(initialSummary);
    setSessionId(createSessionId());
    setIsLoading(false);
  }

  async function startScreening(database = db) {
    if (!database) {
      return;
    }

    setIsLoading(true);
    const nextScreening = await createScreeningSession(database);
    setScreeningItems(nextScreening.items);
    setScreeningIndex(0);
    setScreeningBaseCompleted(nextScreening.completed);
    setScreeningTotal(nextScreening.total);
    setIsScreeningMeaningVisible(false);
    setScreeningUndo([]);
    setMode("screening");
    setIsLoading(false);
  }

  async function leaveScreening() {
    if (!db) {
      return;
    }

    setMode("test");
    await refreshDashboard(db);
    await startNewSession(db);
  }

  async function screenCurrentItem(decision: ScreeningDecision) {
    if (!db || !currentScreeningItem || isScreeningSaving) {
      return;
    }

    setIsScreeningSaving(true);
    try {
      await screenVocabularyItem(db, currentScreeningItem, decision);
      setScreeningUndo((entries) => [...entries, { item: currentScreeningItem, decision }]);
      setScreeningIndex((index) => index + 1);
      setIsScreeningMeaningVisible(false);

      if (decision === "exclude") {
        setStats((currentStats) =>
          currentStats ? { ...currentStats, excluded: currentStats.excluded + 1 } : currentStats
        );
      }
    } finally {
      setIsScreeningSaving(false);
    }
  }

  async function undoScreening() {
    if (!db || screeningUndo.length === 0 || isScreeningSaving) {
      return;
    }

    const lastEntry = screeningUndo[screeningUndo.length - 1];
    setIsScreeningSaving(true);
    try {
      await restoreScreeningItem(db, lastEntry.item);
      setScreeningUndo((entries) => entries.slice(0, -1));
      setScreeningIndex((index) => Math.max(0, index - 1));
      setIsScreeningMeaningVisible(false);

      if (lastEntry.decision === "exclude") {
        setStats((currentStats) =>
          currentStats
            ? { ...currentStats, excluded: Math.max(0, currentStats.excluded - 1) }
            : currentStats
        );
      }
    } finally {
      setIsScreeningSaving(false);
    }
  }

  async function answer(result: AnswerResult) {
    if (!db || !currentItem || (result !== "excluded" && !isAnswerVisible)) {
      return;
    }

    await recordAnswer(db, currentItem, result, sessionId);
    setAnsweredItems((items) => [...items, { item: currentItem, result }]);
    setSummary((currentSummary) => ({
      correct:
        currentSummary.correct + (result === "correct" || result === "excluded" ? 1 : 0),
      uncertain: currentSummary.uncertain + (result === "uncertain" ? 1 : 0),
      incorrect: currentSummary.incorrect + (result === "incorrect" ? 1 : 0),
      excluded: currentSummary.excluded + (result === "excluded" ? 1 : 0),
      total: currentSummary.total + 1
    }));
    setIsAnswerVisible(false);
    setCurrentIndex((index) => index + 1);
    await refreshDashboard(db);
  }

  function speakCurrentTerm() {
    if (!currentItem || isSpeaking || !("speechSynthesis" in window)) {
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(currentItem.term);
    utterance.lang = "en-US";
    utterance.rate = 0.86;
    utterance.pitch = 1;
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  }

  async function downloadBackup() {
    if (!db) {
      return;
    }

    const data = await exportStudyData(db);
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `english-memory-backup-${new Date().toISOString().slice(0, 10)}.json`;
    link.click();
    URL.revokeObjectURL(url);
  }

  async function resetProgress() {
    if (
      !db ||
      !window.confirm(
        "回答履歴と仕分けの進捗をリセットします。大学生向けの既知語は除外のまま残します。よろしいですか？"
      )
    ) {
      return;
    }

    await resetStudyProgress(db);
    setMode("test");
    await refreshDashboard(db);
    await startNewSession(db);
  }

  async function addVocabulary(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!db) {
      return;
    }

    const term = newTerm.trim();
    const meaningJa = newMeaning.trim();

    if (!term || !meaningJa) {
      setAddMessage("英語と和訳は必須です。");
      return;
    }

    const { merged } = await addCustomVocabularyItem(db, {
      term,
      meaningJa,
      definitionEn: newDefinition,
      itemType: newItemType
    });
    setNewTerm("");
    setNewMeaning("");
    setNewDefinition("");
    setNewItemType("word");
    setAddMessage(
      merged
        ? `「${term}」の既存項目に和訳を追加しました。`
        : `「${term}」を追加しました。次回以降の10問に出ます。`
    );
    await refreshDashboard(db);
  }

  if (isLoading && sessionItems.length === 0) {
    return (
      <main className="screen center-screen">
        <div className="loader" aria-hidden="true" />
        <p>単語データベースを準備しています</p>
      </main>
    );
  }

  if (errorMessage) {
    return (
      <main className="screen center-screen">
        <h1>起動できませんでした</h1>
        <p>{errorMessage}</p>
      </main>
    );
  }

  if (mode === "screening") {
    return (
      <main className="screen screening-screen">
        <header className="app-header screening-header">
          <div>
            <h1>高速仕分け</h1>
            <p>
              {screeningCompleted} / {screeningTotal} 完了
            </p>
          </div>
          <button
            className="outline-button"
            disabled={isScreeningSaving}
            type="button"
            onClick={() => void leaveScreening()}
          >
            テストへ戻る
          </button>
        </header>

        <section className="screening-progress" aria-label="仕分けの進捗">
          <div>
            <strong>{screeningProgress}%</strong>
            <span>残り {screeningRemaining}語句</span>
          </div>
          <div
            aria-valuemax={screeningTotal}
            aria-valuemin={0}
            aria-valuenow={screeningCompleted}
            className="progress-track"
            role="progressbar"
          >
            <span style={{ width: `${screeningProgress}%` }} />
          </div>
        </section>

        {!currentScreeningItem ? (
          <section className="finish-panel screening-finish" aria-label="仕分け完了">
            <div className="finish-heading">
              <div>
                <h2>仕分け完了</h2>
                <p>残した語句だけが、今後の10問テストに出題されます。</p>
              </div>
              <strong>100%</strong>
            </div>
            <button className="primary-button" type="button" onClick={() => void leaveScreening()}>
              10問テストへ
            </button>
          </section>
        ) : (
          <section className="study-panel screening-panel" aria-label="高速仕分け">
            <div className="question-meta">
              <span>
                {screeningCompleted + 1} / {screeningTotal}
              </span>
              <span>
                {currentScreeningItem.itemType === "phrase" ? "熟語・句動詞" : "英単語"}
              </span>
            </div>

            <button
              aria-label={`${currentScreeningItem.term}の和訳を表示`}
              className={`flip-card screening-card ${
                isScreeningMeaningVisible ? "is-flipped" : ""
              }`}
              type="button"
              onClick={() => setIsScreeningMeaningVisible(true)}
            >
              <span className="card-hint">
                {isScreeningMeaningVisible ? "和訳" : "英語"}
              </span>
              <span className={`term ${getTermSizeClass(currentScreeningItem.term)}`}>
                {currentScreeningItem.term}
              </span>
              {isScreeningMeaningVisible ? (
                <span className="answer-block">
                  <span className="meaning">{currentScreeningItem.meaningJa}</span>
                  <span className="definition">{currentScreeningItem.definitionEn}</span>
                </span>
              ) : null}
            </button>

            <div className="screening-actions">
              <button
                className="screening-keep-button"
                disabled={isScreeningSaving}
                type="button"
                onClick={() => void screenCurrentItem("keep")}
              >
                残す
              </button>
              <button
                className="screening-exclude-button"
                disabled={isScreeningSaving}
                type="button"
                onClick={() => void screenCurrentItem("exclude")}
              >
                除外して次へ
              </button>
            </div>
            <button
              className="screening-undo-button"
              disabled={screeningUndo.length === 0 || isScreeningSaving}
              type="button"
              onClick={() => void undoScreening()}
            >
              ひとつ戻す
            </button>
          </section>
        )}
      </main>
    );
  }

  return (
    <main className="screen">
      <header className="app-header">
        <div>
          <h1>英単語メモリー</h1>
          <p>大学生向け。抽象語・多義語・熟語を10問ずつ復習する。</p>
        </div>
        <div className="header-actions">
          <button className="outline-button" type="button" onClick={() => void startScreening()}>
            高速仕分け
          </button>
          <button className="small-dark-button" type="button" onClick={() => void startNewSession()}>
            新しい10問
          </button>
        </div>
      </header>

      <section className="stats-grid" aria-label="学習状況">
        <Stat label="累計回答" value={`${stats?.attempts ?? 0}`} />
        <Stat label="累計正解率" value={lifetimeAccuracyLabel} />
        <Stat label="登録語句" value={`${stats?.total ?? 0}`} />
        <Stat label="覚えた判定" value={`${stats?.known ?? 0}`} />
        <Stat label="テスト除外" value={`${stats?.excluded ?? 0}`} />
        <Stat label="今回の正解" value={scoreLabel} />
      </section>

      {sessionItems.length === 0 ? (
        <section className="finish-panel" aria-label="出題できる語句なし">
          <div className="finish-heading">
            <div>
              <h2>出題できる語句がありません</h2>
              <p>除外した語句を戻す場合は、履歴リセットで学習状態を初期化できます。</p>
            </div>
          </div>
        </section>
      ) : isFinished ? (
        <section className="finish-panel" aria-label="今回の結果">
          <div className="finish-heading">
            <div>
              <h2>{sessionTargetCount}問終了</h2>
              <p>不正解とあやふやは次回以降に出やすくなります。</p>
            </div>
            <strong>{accuracyLabel}</strong>
          </div>

          <div className="review-list">
            <h3>今回の{sessionTargetCount}問</h3>
            {answeredItems.map(({ item, result }, index) => (
              <ResultRow
                key={`${item.id}-${index}`}
                index={index + 1}
                term={item.term}
                meaning={item.meaningJa}
                result={result}
              />
            ))}
          </div>

          <button className="primary-button" type="button" onClick={() => void startNewSession()}>
            次の10問を始める
          </button>
        </section>
      ) : (
        <section className="study-panel" aria-label="単語テスト">
          <div className="question-meta">
            <span>Question {progressLabel}</span>
            <div className="meta-actions">
              <span>{currentItem?.itemType === "phrase" ? "熟語・句動詞" : "英単語"}</span>
              <button
                aria-label={`${currentItem?.term ?? ""} の音声を再生`}
                className="icon-button"
                disabled={!currentItem || isSpeaking}
                type="button"
                onClick={speakCurrentTerm}
              >
                {isSpeaking ? <PauseIcon /> : <SpeakerIcon />}
              </button>
            </div>
          </div>

          <button
            className={`flip-card ${isAnswerVisible ? "is-flipped" : ""}`}
            disabled={!currentItem}
            type="button"
            onClick={() => setIsAnswerVisible(true)}
          >
            <span className="card-hint">{isAnswerVisible ? "和訳" : "タップして和訳を表示"}</span>
            <span className={`term ${getTermSizeClass(currentItem?.term ?? "")}`}>
              {currentItem?.term}
            </span>
            {isAnswerVisible ? (
              <span className="answer-block">
                <span className="meaning">{currentItem?.meaningJa}</span>
                <span className="definition">{currentItem?.definitionEn}</span>
              </span>
            ) : null}
          </button>

          <div className="answer-actions">
            <button
              className="incorrect-button"
              disabled={!isAnswerVisible}
              type="button"
              onClick={() => void answer("incorrect")}
            >
              不正解
            </button>
            <button
              className="uncertain-button"
              disabled={!isAnswerVisible}
              type="button"
              onClick={() => void answer("uncertain")}
            >
              あやふや
            </button>
            <button
              className="correct-button"
              disabled={!isAnswerVisible}
              type="button"
              onClick={() => void answer("correct")}
            >
              正解
            </button>
            <button
              className="exclude-button"
              disabled={!currentItem}
              type="button"
              onClick={() => void answer("excluded")}
            >
              もう出さない
            </button>
          </div>
        </section>
      )}

      <section className="source-panel" aria-label="データ保存">
        <div>
          <h2>保存方法</h2>
          <p>
            GitHub Pagesはアプリ本体だけを配信します。単語帳と回答履歴は、このスマホのブラウザ内IndexedDBに保存されます。
            日本語訳には
            <a
              href="https://bond-lab.github.io/wnja/index.ja.html"
              rel="noreferrer"
              target="_blank"
            >
              日本語WordNet 1.1
            </a>
            を利用しています。
          </p>
        </div>
        <div className="utility-actions">
          <button type="button" onClick={() => void downloadBackup()}>
            バックアップ
          </button>
          <button type="button" onClick={() => void resetProgress()}>
            履歴リセット
          </button>
        </div>
      </section>

      <section className="add-panel" aria-label="単語やフレーズを追加">
        <div className="section-heading">
          <h2>語句を追加</h2>
          <span>custom</span>
        </div>
        <form className="add-form" onSubmit={(event) => void addVocabulary(event)}>
          <label>
            <span>英単語・熟語</span>
            <input
              autoCapitalize="none"
              autoCorrect="off"
              placeholder="例: take over"
              type="text"
              value={newTerm}
              onChange={(event) => setNewTerm(event.target.value)}
            />
          </label>
          <label>
            <span>和訳</span>
            <input
              placeholder="例: 引き継ぐ、支配する"
              type="text"
              value={newMeaning}
              onChange={(event) => setNewMeaning(event.target.value)}
            />
          </label>
          <label>
            <span>英語説明・メモ（任意）</span>
            <textarea
              placeholder="例: to begin controlling or being responsible for something"
              rows={3}
              value={newDefinition}
              onChange={(event) => setNewDefinition(event.target.value)}
            />
          </label>
          <div className="segmented-control" role="group" aria-label="語句の種類">
            <button
              className={newItemType === "word" ? "selected" : ""}
              type="button"
              onClick={() => setNewItemType("word")}
            >
              英単語
            </button>
            <button
              className={newItemType === "phrase" ? "selected" : ""}
              type="button"
              onClick={() => setNewItemType("phrase")}
            >
              熟語
            </button>
          </div>
          <button className="primary-button" type="submit">
            追加する
          </button>
          {addMessage ? <p className="form-message">{addMessage}</p> : null}
        </form>
      </section>

      <section className="history-panel" aria-label="直近の回答">
        <div className="section-heading">
          <h2>直近10件</h2>
          <span>
            {stats?.words ?? 0} words / {stats?.phrases ?? 0} phrases
          </span>
        </div>
        {recentAttempts.length === 0 ? (
          <p className="muted">まだ回答履歴がありません。</p>
        ) : (
          <div className="compact-list">
            {recentAttempts.map((attempt, index) => (
              <ResultRow
                key={`${attempt.sessionId}-${attempt.itemId}-${attempt.answeredAt}`}
                index={index + 1}
                term={attempt.term}
                meaning={attempt.meaningJa}
                result={attempt.result}
              />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="stat-card">
      <strong>{value}</strong>
      <span>{label}</span>
    </div>
  );
}

function ResultRow({
  index,
  term,
  meaning,
  result
}: {
  index: number;
  term: string;
  meaning: string;
  result: AnswerResult;
}) {
  return (
    <div className="result-row">
      <div>
        <strong>
          {index}. {term}
        </strong>
        <span>{meaning}</span>
      </div>
      <span className={`result-chip ${result}`}>{getResultLabel(result)}</span>
    </div>
  );
}

function getTermSizeClass(term: string) {
  const longestPart = Math.max(...term.split(/[\s-]+/).map((part) => part.length), 0);

  if (longestPart >= 16) {
    return "term-extra-long";
  }

  if (longestPart >= 13) {
    return "term-long";
  }

  if (longestPart >= 10) {
    return "term-compact";
  }

  return "";
}

function getResultLabel(result: AnswerResult) {
  const labels: Record<AnswerResult, string> = {
    correct: "正解",
    uncertain: "あやふや",
    incorrect: "不正解",
    excluded: "除外"
  };

  return labels[result];
}

function SpeakerIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path d="M4 9v6h4l5 4V5L8 9H4Z" />
      <path d="M16 9.5a4 4 0 0 1 0 5" />
      <path d="M18.5 7a7 7 0 0 1 0 10" />
    </svg>
  );
}

function PauseIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path d="M8 5h3v14H8V5Zm5 0h3v14h-3V5Z" />
    </svg>
  );
}
