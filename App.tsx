import { StatusBar } from "expo-status-bar";
import * as Speech from "expo-speech";
import { useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View
} from "react-native";

import {
  createTestSession,
  getVocabularyStats,
  openVocabularyDatabase,
  recordAnswer
} from "./src/database";
import type { AnswerResult, TestSummary, VocabularyItem } from "./src/types";

const TEST_SIZE = 10;

type Database = Awaited<ReturnType<typeof openVocabularyDatabase>>;
type Stats = Awaited<ReturnType<typeof getVocabularyStats>>;
type AnsweredItem = {
  item: VocabularyItem;
  result: AnswerResult;
};

export default function App() {
  const [db, setDb] = useState<Database | null>(null);
  const [stats, setStats] = useState<Stats | null>(null);
  const [sessionItems, setSessionItems] = useState<VocabularyItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnswerVisible, setIsAnswerVisible] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [answeredItems, setAnsweredItems] = useState<AnsweredItem[]>([]);
  const [summary, setSummary] = useState<TestSummary>({ correct: 0, incorrect: 0, total: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    void initialize();

    return () => {
      void Speech.stop();
    };
  }, []);

  const currentItem = sessionItems[currentIndex];
  const isFinished = summary.total >= TEST_SIZE || currentIndex >= TEST_SIZE;
  const scoreLabel = `${summary.correct} / ${summary.total}`;
  const progressLabel = `${Math.min(currentIndex + 1, TEST_SIZE)} / ${TEST_SIZE}`;

  const accuracyLabel = useMemo(() => {
    if (summary.total === 0) {
      return "0%";
    }

    return `${Math.round((summary.correct / summary.total) * 100)}%`;
  }, [summary.correct, summary.total]);

  async function initialize() {
    try {
      const database = await openVocabularyDatabase();
      setDb(database);
      await refreshStats(database);
      await startNewSession(database);
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "DBの初期化に失敗しました。");
    } finally {
      setIsLoading(false);
    }
  }

  async function refreshStats(database = db) {
    if (!database) {
      return;
    }

    setStats(await getVocabularyStats(database));
  }

  async function startNewSession(database = db) {
    if (!database) {
      return;
    }

    setIsLoading(true);
    await Speech.stop();
    setIsSpeaking(false);
    const nextItems = await createTestSession(database);
    setSessionItems(nextItems);
    setCurrentIndex(0);
    setIsAnswerVisible(false);
    setAnsweredItems([]);
    setSummary({ correct: 0, incorrect: 0, total: 0 });
    setIsLoading(false);
  }

  async function answer(result: AnswerResult) {
    if (!db || !currentItem || !isAnswerVisible) {
      return;
    }

    await recordAnswer(db, currentItem.id, result);
    setAnsweredItems((items) => [...items, { item: currentItem, result }]);
    setSummary((currentSummary) => ({
      correct: currentSummary.correct + (result === "correct" ? 1 : 0),
      incorrect: currentSummary.incorrect + (result === "incorrect" ? 1 : 0),
      total: currentSummary.total + 1
    }));
    setIsAnswerVisible(false);
    setCurrentIndex((index) => index + 1);
    await refreshStats(db);
  }

  async function speakCurrentTerm() {
    if (!currentItem || isSpeaking) {
      return;
    }

    await Speech.stop();
    setIsSpeaking(true);
    Speech.speak(currentItem.term, {
      language: "en-US",
      pitch: 1,
      rate: 0.86,
      onDone: () => setIsSpeaking(false),
      onError: () => setIsSpeaking(false),
      onStopped: () => setIsSpeaking(false)
    });
  }

  if (isLoading && sessionItems.length === 0) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.loadingScreen}>
          <ActivityIndicator color="#0F766E" size="large" />
          <Text style={styles.loadingText}>単語データベースを準備しています</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (errorMessage) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.loadingScreen}>
          <Text style={styles.errorTitle}>起動できませんでした</Text>
          <Text style={styles.errorText}>{errorMessage}</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>英単語メモリー</Text>
            <Text style={styles.subtitle}>10問ずつ、間違えた語を濃く復習する。</Text>
          </View>
          <Pressable style={styles.headerButton} onPress={() => void startNewSession()}>
            <Text style={styles.headerButtonText}>新しい10問</Text>
          </Pressable>
        </View>

        <View style={styles.statsGrid}>
          <View style={styles.statPanel}>
            <Text style={styles.statValue}>{stats?.total ?? 0}</Text>
            <Text style={styles.statLabel}>登録語句</Text>
          </View>
          <View style={styles.statPanel}>
            <Text style={styles.statValue}>{stats?.known ?? 0}</Text>
            <Text style={styles.statLabel}>覚えた判定</Text>
          </View>
          <View style={styles.statPanel}>
            <Text style={styles.statValue}>{scoreLabel}</Text>
            <Text style={styles.statLabel}>今回の正解</Text>
          </View>
        </View>

        {isFinished ? (
          <View style={styles.finishPanel}>
            <Text style={styles.finishTitle}>10問終了</Text>
            <Text style={styles.finishScore}>正答率 {accuracyLabel}</Text>
            <Text style={styles.finishText}>
              不正解にした語句は次回以降の抽選で出やすくなります。正解が安定した語句は少しずつ出題頻度が下がります。
            </Text>
            <View style={styles.reviewList}>
              <Text style={styles.reviewTitle}>今回の10問</Text>
              {answeredItems.map(({ item, result }, index) => (
                <View key={`${item.id}-${index}`} style={styles.reviewRow}>
                  <View style={styles.reviewTextBlock}>
                    <Text style={styles.reviewTerm}>
                      {index + 1}. {item.term}
                    </Text>
                    <Text style={styles.reviewMeaning}>{item.meaningJa}</Text>
                  </View>
                  <Text
                    style={[
                      styles.reviewResult,
                      result === "correct" ? styles.reviewCorrect : styles.reviewIncorrect
                    ]}
                  >
                    {result === "correct" ? "正解" : "不正解"}
                  </Text>
                </View>
              ))}
            </View>
            <Pressable style={styles.primaryButton} onPress={() => void startNewSession()}>
              <Text style={styles.primaryButtonText}>次の10問を始める</Text>
            </Pressable>
          </View>
        ) : (
          <>
            <View style={styles.progressRow}>
              <Text style={styles.progressText}>Question {progressLabel}</Text>
              <View style={styles.progressRight}>
                <Text style={styles.progressText}>
                  {currentItem?.itemType === "phrase" ? "熟語・句動詞" : "英単語"}
                </Text>
                <Pressable
                  accessibilityLabel={`${currentItem?.term ?? ""} の音声を再生`}
                  accessibilityRole="button"
                  disabled={!currentItem || isSpeaking}
                  onPress={() => void speakCurrentTerm()}
                  style={({ pressed }) => [
                    styles.speakerButton,
                    pressed && styles.buttonPressed,
                    (!currentItem || isSpeaking) && styles.disabledButton
                  ]}
                >
                  <Text style={styles.speakerButtonText}>{isSpeaking ? "再生中" : "音声"}</Text>
                </Pressable>
              </View>
            </View>

            <Pressable
              accessibilityRole="button"
              disabled={!currentItem}
              onPress={() => setIsAnswerVisible(true)}
              style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
            >
              <Text style={styles.cardHint}>
                {isAnswerVisible ? "和訳" : "タップして和訳を表示"}
              </Text>
              <Text style={styles.word}>{currentItem?.term}</Text>
              {isAnswerVisible ? (
                <View style={styles.answerBlock}>
                  <Text style={styles.meaning}>{currentItem?.meaningJa}</Text>
                  <Text style={styles.definition}>{currentItem?.definitionEn}</Text>
                </View>
              ) : null}
            </Pressable>

            <View style={styles.actions}>
              <Pressable
                disabled={!isAnswerVisible}
                onPress={() => void answer("incorrect")}
                style={({ pressed }) => [
                  styles.actionButton,
                  styles.incorrectButton,
                  pressed && styles.buttonPressed,
                  !isAnswerVisible && styles.disabledButton
                ]}
              >
                <Text style={styles.actionButtonText}>不正解</Text>
              </Pressable>
              <Pressable
                disabled={!isAnswerVisible}
                onPress={() => void answer("correct")}
                style={({ pressed }) => [
                  styles.actionButton,
                  styles.correctButton,
                  pressed && styles.buttonPressed,
                  !isAnswerVisible && styles.disabledButton
                ]}
              >
                <Text style={styles.actionButtonText}>正解</Text>
              </Pressable>
            </View>
          </>
        )}

        <View style={styles.sourcePanel}>
          <Text style={styles.sourceTitle}>出題範囲</Text>
          <Text style={styles.sourceText}>
            NGSL英単語 {stats?.words ?? 0} 件、句動詞 {stats?.phrases ?? 0} 件。回答履歴は端末内SQLiteに保存されます。
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F7F8FB"
  },
  loadingScreen: {
    alignItems: "center",
    flex: 1,
    gap: 14,
    justifyContent: "center",
    padding: 24
  },
  loadingText: {
    color: "#475569",
    fontSize: 15,
    fontWeight: "700"
  },
  errorTitle: {
    color: "#991B1B",
    fontSize: 20,
    fontWeight: "800"
  },
  errorText: {
    color: "#475569",
    fontSize: 15,
    lineHeight: 22,
    textAlign: "center"
  },
  container: {
    gap: 18,
    padding: 20,
    paddingBottom: 36
  },
  header: {
    alignItems: "flex-start",
    flexDirection: "row",
    gap: 12,
    justifyContent: "space-between",
    paddingTop: 12
  },
  title: {
    color: "#111827",
    fontSize: 28,
    fontWeight: "800",
    letterSpacing: 0
  },
  subtitle: {
    color: "#5B6472",
    fontSize: 14,
    lineHeight: 21,
    marginTop: 6,
    maxWidth: 230
  },
  headerButton: {
    backgroundColor: "#111827",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10
  },
  headerButtonText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "800"
  },
  statsGrid: {
    flexDirection: "row",
    gap: 10
  },
  statPanel: {
    backgroundColor: "#FFFFFF",
    borderColor: "#E5E7EB",
    borderRadius: 8,
    borderWidth: 1,
    flex: 1,
    minHeight: 74,
    padding: 12
  },
  statValue: {
    color: "#0F766E",
    fontSize: 20,
    fontWeight: "800",
    letterSpacing: 0
  },
  statLabel: {
    color: "#64748B",
    fontSize: 12,
    fontWeight: "700",
    marginTop: 4
  },
  progressRow: {
    alignItems: "center",
    flexDirection: "row",
    gap: 12,
    justifyContent: "space-between"
  },
  progressRight: {
    alignItems: "center",
    flexDirection: "row",
    flexShrink: 0,
    gap: 8
  },
  progressText: {
    color: "#475569",
    fontSize: 13,
    fontWeight: "800"
  },
  speakerButton: {
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderColor: "#CBD5E1",
    borderRadius: 8,
    borderWidth: 1,
    minWidth: 58,
    paddingHorizontal: 10,
    paddingVertical: 8
  },
  speakerButtonText: {
    color: "#0F172A",
    fontSize: 12,
    fontWeight: "800"
  },
  card: {
    backgroundColor: "#12343B",
    borderRadius: 8,
    justifyContent: "center",
    minHeight: 330,
    padding: 24,
    shadowColor: "#0F172A",
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.14,
    shadowRadius: 20
  },
  cardPressed: {
    transform: [{ scale: 0.99 }]
  },
  cardHint: {
    color: "#99F6E4",
    fontSize: 13,
    fontWeight: "800",
    marginBottom: 16
  },
  word: {
    color: "#FFFFFF",
    fontSize: 38,
    fontWeight: "800",
    letterSpacing: 0,
    lineHeight: 46
  },
  answerBlock: {
    borderTopColor: "rgba(255,255,255,0.18)",
    borderTopWidth: 1,
    gap: 10,
    marginTop: 22,
    paddingTop: 18
  },
  meaning: {
    color: "#ECFDF5",
    fontSize: 22,
    fontWeight: "800",
    lineHeight: 30
  },
  definition: {
    color: "#CCFBF1",
    fontSize: 15,
    lineHeight: 22
  },
  actions: {
    flexDirection: "row",
    gap: 12
  },
  actionButton: {
    alignItems: "center",
    borderRadius: 8,
    flex: 1,
    paddingVertical: 16
  },
  incorrectButton: {
    backgroundColor: "#DC2626"
  },
  correctButton: {
    backgroundColor: "#0F766E"
  },
  actionButtonText: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "800"
  },
  buttonPressed: {
    opacity: 0.82
  },
  disabledButton: {
    opacity: 0.42
  },
  finishPanel: {
    backgroundColor: "#FFFFFF",
    borderColor: "#D1D5DB",
    borderRadius: 8,
    borderWidth: 1,
    gap: 12,
    padding: 18
  },
  finishTitle: {
    color: "#111827",
    fontSize: 24,
    fontWeight: "800"
  },
  finishScore: {
    color: "#0F766E",
    fontSize: 34,
    fontWeight: "800"
  },
  finishText: {
    color: "#475569",
    fontSize: 15,
    lineHeight: 23
  },
  reviewList: {
    borderTopColor: "#E5E7EB",
    borderTopWidth: 1,
    gap: 10,
    marginTop: 4,
    paddingTop: 14
  },
  reviewTitle: {
    color: "#111827",
    fontSize: 16,
    fontWeight: "800"
  },
  reviewRow: {
    alignItems: "center",
    backgroundColor: "#F8FAFC",
    borderColor: "#E5E7EB",
    borderRadius: 8,
    borderWidth: 1,
    flexDirection: "row",
    gap: 10,
    justifyContent: "space-between",
    padding: 10
  },
  reviewTextBlock: {
    flex: 1,
    gap: 3
  },
  reviewTerm: {
    color: "#111827",
    fontSize: 15,
    fontWeight: "800",
    lineHeight: 21
  },
  reviewMeaning: {
    color: "#475569",
    fontSize: 13,
    lineHeight: 19
  },
  reviewResult: {
    borderRadius: 8,
    fontSize: 12,
    fontWeight: "800",
    minWidth: 58,
    overflow: "hidden",
    paddingHorizontal: 8,
    paddingVertical: 6,
    textAlign: "center"
  },
  reviewCorrect: {
    backgroundColor: "#D1FAE5",
    color: "#065F46"
  },
  reviewIncorrect: {
    backgroundColor: "#FEE2E2",
    color: "#991B1B"
  },
  primaryButton: {
    alignItems: "center",
    backgroundColor: "#111827",
    borderRadius: 8,
    marginTop: 4,
    paddingVertical: 15
  },
  primaryButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "800"
  },
  sourcePanel: {
    backgroundColor: "#FFFFFF",
    borderColor: "#E5E7EB",
    borderRadius: 8,
    borderWidth: 1,
    gap: 6,
    padding: 14
  },
  sourceTitle: {
    color: "#111827",
    fontSize: 15,
    fontWeight: "800"
  },
  sourceText: {
    color: "#64748B",
    fontSize: 13,
    lineHeight: 20
  }
});
