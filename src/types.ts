export type VocabularyItemType = "word" | "phrase";

export type VocabularySeedItem = {
  id: string;
  term: string;
  meaningJa: string;
  definitionEn: string;
  pos: string;
  itemType: VocabularyItemType;
  source: string;
  sourceRank: number;
};

export type VocabularyItem = VocabularySeedItem & {
  totalAttempts: number;
  correctAttempts: number;
  incorrectAttempts: number;
  lastSeenAt: number | null;
};

export type AnswerResult = "correct" | "incorrect";

export type AttemptRecord = {
  attemptId?: number;
  itemId: string;
  result: AnswerResult;
  answeredAt: number;
  sessionId: string;
  term: string;
  meaningJa: string;
};

export type TestSummary = {
  correct: number;
  incorrect: number;
  total: number;
};

export type VocabularyStats = {
  total: number;
  words: number;
  phrases: number;
  known: number;
  attempts: number;
  correct: number;
  incorrect: number;
};
