import { useEffect, useMemo, useState } from "react";

import {
  createTestSession,
  exportStudyData,
  getRecentAttempts,
  getVocabularyStats,
  initializeStore,
  recordAnswer,
  resetStudyProgress
} from "./storage";
import type {
  AnswerResult,
  AttemptRecord,
  TestSummary,
  VocabularyItem,
  VocabularyStats
} from "./types";

const TEST_SIZE = 10;

type AnsweredItem = {
  item: VocabularyItem;
  result: AnswerResult;
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
  const [summary, setSummary] = useState<TestSummary>({ correct: 0, incorrect: 0, total: 0 });
  const [sessionId, setSessionId] = useState(createSessionId);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    void initialize();

    return () => {
      window.speechSynthesis?.cancel();
    };
  }, []);

  const currentItem = sessionItems[currentIndex];
  const isFinished = summary.total >= TEST_SIZE || currentIndex >= TEST_SIZE;
  const scoreLabel = `${summary.correct} / ${summary.total}`;
  const progressLabel = `${Math.min(currentIndex + 1, TEST_SIZE)} / ${TEST_SIZE}`;
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
    setSummary({ correct: 0, incorrect: 0, total: 0 });
    setSessionId(createSessionId());
    setIsLoading(false);
  }

  async function answer(result: AnswerResult) {
    if (!db || !currentItem || !isAnswerVisible) {
      return;
    }

    await recordAnswer(db, currentItem, result, sessionId);
    setAnsweredItems((items) => [...items, { item: currentItem, result }]);
    setSummary((currentSummary) => ({
      correct: currentSummary.correct + (result === "correct" ? 1 : 0),
      incorrect: currentSummary.incorrect + (result === "incorrect" ? 1 : 0),
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
    if (!db || !window.confirm("正解/不正解の履歴をすべてリセットします。よろしいですか？")) {
      return;
    }

    await resetStudyProgress(db);
    await refreshDashboard(db);
    await startNewSession(db);
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

  return (
    <main className="screen">
      <header className="app-header">
        <div>
          <h1>英単語メモリー</h1>
          <p>10問ずつ、苦手な語句を濃く復習する。</p>
        </div>
        <button className="small-dark-button" type="button" onClick={() => void startNewSession()}>
          新しい10問
        </button>
      </header>

      <section className="stats-grid" aria-label="学習状況">
        <Stat label="累計回答" value={`${stats?.attempts ?? 0}`} />
        <Stat label="累計正解率" value={lifetimeAccuracyLabel} />
        <Stat label="登録語句" value={`${stats?.total ?? 0}`} />
        <Stat label="覚えた判定" value={`${stats?.known ?? 0}`} />
        <Stat label="今回の正解" value={scoreLabel} />
      </section>

      {isFinished ? (
        <section className="finish-panel" aria-label="今回の結果">
          <div className="finish-heading">
            <div>
              <h2>10問終了</h2>
              <p>不正解は次回以降に出やすくなります。</p>
            </div>
            <strong>{accuracyLabel}</strong>
          </div>

          <div className="review-list">
            <h3>今回の10問</h3>
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
            <span className="term">{currentItem?.term}</span>
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
              className="correct-button"
              disabled={!isAnswerVisible}
              type="button"
              onClick={() => void answer("correct")}
            >
              正解
            </button>
          </div>
        </section>
      )}

      <section className="source-panel" aria-label="データ保存">
        <div>
          <h2>保存方法</h2>
          <p>
            GitHub Pagesはアプリ本体だけを配信します。単語帳と回答履歴は、このスマホのブラウザ内IndexedDBに保存されます。
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
      <span className={`result-chip ${result}`}>{result === "correct" ? "正解" : "不正解"}</span>
    </div>
  );
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
