import * as SQLite from "expo-sqlite";

import { vocabularySeed } from "./data/vocabularySeed";
import type { AnswerResult, VocabularyItem, VocabularySeedItem } from "./types";

const DATABASE_NAME = "vocabulary-memory.db";
const TEST_SIZE = 10;

type VocabularyRow = {
  id: string;
  term: string;
  meaning_ja: string;
  definition_en: string;
  pos: string;
  item_type: "word" | "phrase";
  source: string;
  source_rank: number;
  total_attempts: number;
  correct_attempts: number;
  incorrect_attempts: number;
  last_seen_at: number | null;
};

type CountRow = {
  count: number;
};

export async function openVocabularyDatabase() {
  const db = await SQLite.openDatabaseAsync(DATABASE_NAME);
  await db.execAsync(`
    PRAGMA journal_mode = WAL;

    CREATE TABLE IF NOT EXISTS vocabulary_items (
      id TEXT PRIMARY KEY NOT NULL,
      term TEXT NOT NULL,
      meaning_ja TEXT NOT NULL,
      definition_en TEXT NOT NULL,
      pos TEXT NOT NULL,
      item_type TEXT NOT NULL CHECK (item_type IN ('word', 'phrase')),
      source TEXT NOT NULL,
      source_rank INTEGER NOT NULL,
      total_attempts INTEGER NOT NULL DEFAULT 0,
      correct_attempts INTEGER NOT NULL DEFAULT 0,
      incorrect_attempts INTEGER NOT NULL DEFAULT 0,
      last_seen_at INTEGER
    );

    CREATE INDEX IF NOT EXISTS vocabulary_items_source_rank_index
      ON vocabulary_items(source, source_rank);

    CREATE INDEX IF NOT EXISTS vocabulary_items_item_type_index
      ON vocabulary_items(item_type);
  `);

  await seedDatabase(db);
  return db;
}

export async function getVocabularyStats(db: SQLite.SQLiteDatabase) {
  const row = await db.getFirstAsync<{
    total: number;
    words: number;
    phrases: number;
    known: number;
    attempts: number;
  }>(`
    SELECT
      COUNT(*) AS total,
      SUM(CASE WHEN item_type = 'word' THEN 1 ELSE 0 END) AS words,
      SUM(CASE WHEN item_type = 'phrase' THEN 1 ELSE 0 END) AS phrases,
      SUM(CASE WHEN total_attempts >= 3 AND incorrect_attempts * 1.0 / total_attempts <= 0.2 THEN 1 ELSE 0 END) AS known,
      SUM(total_attempts) AS attempts
    FROM vocabulary_items;
  `);

  return {
    total: row?.total ?? 0,
    words: row?.words ?? 0,
    phrases: row?.phrases ?? 0,
    known: row?.known ?? 0,
    attempts: row?.attempts ?? 0
  };
}

export async function createTestSession(db: SQLite.SQLiteDatabase) {
  const rows = await db.getAllAsync<VocabularyRow>(`
    SELECT *
    FROM vocabulary_items
    ORDER BY source_rank ASC;
  `);

  return sampleWeighted(rows.map(mapRowToVocabularyItem), TEST_SIZE);
}

export async function recordAnswer(
  db: SQLite.SQLiteDatabase,
  itemId: string,
  result: AnswerResult
) {
  const now = Date.now();
  const correctIncrement = result === "correct" ? 1 : 0;
  const incorrectIncrement = result === "incorrect" ? 1 : 0;

  await db.runAsync(
    `
      UPDATE vocabulary_items
      SET
        total_attempts = total_attempts + 1,
        correct_attempts = correct_attempts + ?,
        incorrect_attempts = incorrect_attempts + ?,
        last_seen_at = ?
      WHERE id = ?;
    `,
    correctIncrement,
    incorrectIncrement,
    now,
    itemId
  );
}

async function seedDatabase(db: SQLite.SQLiteDatabase) {
  const row = await db.getFirstAsync<CountRow>(
    "SELECT COUNT(*) AS count FROM vocabulary_items;"
  );

  if ((row?.count ?? 0) >= vocabularySeed.length) {
    return;
  }

  await db.withTransactionAsync(async () => {
    for (const item of vocabularySeed) {
      await insertSeedItem(db, item);
    }
  });
}

async function insertSeedItem(db: SQLite.SQLiteDatabase, item: VocabularySeedItem) {
  await db.runAsync(
    `
      INSERT OR IGNORE INTO vocabulary_items (
        id,
        term,
        meaning_ja,
        definition_en,
        pos,
        item_type,
        source,
        source_rank
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?);
    `,
    item.id,
    item.term,
    item.meaningJa,
    item.definitionEn,
    item.pos,
    item.itemType,
    item.source,
    item.sourceRank
  );
}

function mapRowToVocabularyItem(row: VocabularyRow): VocabularyItem {
  return {
    id: row.id,
    term: row.term,
    meaningJa: row.meaning_ja,
    definitionEn: row.definition_en,
    pos: row.pos,
    itemType: row.item_type,
    source: row.source,
    sourceRank: row.source_rank,
    totalAttempts: row.total_attempts,
    correctAttempts: row.correct_attempts,
    incorrectAttempts: row.incorrect_attempts,
    lastSeenAt: row.last_seen_at
  };
}

function sampleWeighted(items: VocabularyItem[], count: number) {
  const pool = [...items];
  const selected: VocabularyItem[] = [];

  while (selected.length < count && pool.length > 0) {
    const weights = pool.map(getReviewWeight);
    const totalWeight = weights.reduce((sum, weight) => sum + weight, 0);
    let cursor = Math.random() * totalWeight;
    let chosenIndex = 0;

    for (let index = 0; index < pool.length; index += 1) {
      cursor -= weights[index];
      if (cursor <= 0) {
        chosenIndex = index;
        break;
      }
    }

    const [chosen] = pool.splice(chosenIndex, 1);
    selected.push(chosen);
  }

  return selected;
}

function getReviewWeight(item: VocabularyItem) {
  const attempts = item.totalAttempts;
  const incorrectRate = attempts === 0 ? 0.45 : item.incorrectAttempts / attempts;
  const correctStreakSignal =
    attempts >= 3 && item.correctAttempts >= 3 && incorrectRate <= 0.2 ? 0.25 : 1;
  const newItemBonus = attempts === 0 ? 1.35 : 1;
  const mistakeBonus = 1 + item.incorrectAttempts * 0.35 + incorrectRate * 2.4;
  const frequencyPriority = Math.max(0.35, 1.15 - item.sourceRank / 5000);

  return Math.max(0.05, newItemBonus * mistakeBonus * correctStreakSignal * frequencyPriority);
}
