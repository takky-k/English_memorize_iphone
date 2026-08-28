export type VocabularyItemType = "word" | "phrase";

export type VocabularySeedItem = {
  id: string;
  term: string;
  meaningJa: string;
  definitionEn: string;
  exampleEn?: string;
  exampleJa?: string;
  pos: string;
  itemType: VocabularyItemType;
  source: string;
  sourceRank: number;
};

export type VocabularyItem = VocabularySeedItem & {
  totalAttempts: number;
  correctAttempts: number;
  uncertainAttempts: number;
  incorrectAttempts: number;
  lastSeenAt: number | null;
  excludedAt: number | null;
  screenedAt: number | null;
};

export type AnswerResult = "correct" | "uncertain" | "incorrect" | "excluded";
export type ScreeningDecision = "keep" | "exclude";

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
  uncertain: number;
  incorrect: number;
  excluded: number;
  total: number;
};

export type VocabularyStats = {
  total: number;
  studyable: number;
  answeredStudyable: number;
  words: number;
  phrases: number;
  known: number;
  excluded: number;
  attempts: number;
  correct: number;
  uncertain: number;
  incorrect: number;
};
