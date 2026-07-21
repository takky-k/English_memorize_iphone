import { vocabularySeed } from "./data/vocabularySeed";
import type {
  AnswerResult,
  AttemptRecord,
  VocabularyItem,
  VocabularyStats
} from "./types";

const DB_NAME = "english-memory-pwa";
const DB_VERSION = 1;
const SEED_VERSION = "2026-07-21-ngsl-1.01-phrasal-50";
const TEST_SIZE = 10;

type StoreName = "items" | "attempts" | "meta";
type MetaRecord = {
  key: string;
  value: string;
};

export async function initializeStore() {
  const db = await openDatabase();
  await seedVocabulary(db);
  return db;
}

export async function getVocabularyStats(db: IDBDatabase): Promise<VocabularyStats> {
  const items = await getAllItems(db);

  return items.reduce<VocabularyStats>(
    (stats, item) => {
      const isKnown =
        item.totalAttempts >= 3 &&
        item.incorrectAttempts / Math.max(1, item.totalAttempts) <= 0.2;

      return {
        total: stats.total + 1,
        words: stats.words + (item.itemType === "word" ? 1 : 0),
        phrases: stats.phrases + (item.itemType === "phrase" ? 1 : 0),
        known: stats.known + (isKnown ? 1 : 0),
        attempts: stats.attempts + item.totalAttempts,
        correct: stats.correct + item.correctAttempts,
        incorrect: stats.incorrect + item.incorrectAttempts
      };
    },
    { total: 0, words: 0, phrases: 0, known: 0, attempts: 0, correct: 0, incorrect: 0 }
  );
}

export async function createTestSession(db: IDBDatabase) {
  const items = await getAllItems(db);
  return sampleWeighted(items, TEST_SIZE);
}

export async function recordAnswer(
  db: IDBDatabase,
  item: VocabularyItem,
  result: AnswerResult,
  sessionId: string
) {
  const now = Date.now();

  await new Promise<void>((resolve, reject) => {
    const transaction = db.transaction(["items", "attempts"], "readwrite");
    const itemStore = transaction.objectStore("items");
    const attemptStore = transaction.objectStore("attempts");
    const request = itemStore.get(item.id);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => {
      const stored = request.result as VocabularyItem | undefined;
      const nextItem: VocabularyItem = {
        ...(stored ?? item),
        totalAttempts: (stored?.totalAttempts ?? item.totalAttempts) + 1,
        correctAttempts:
          (stored?.correctAttempts ?? item.correctAttempts) + (result === "correct" ? 1 : 0),
        incorrectAttempts:
          (stored?.incorrectAttempts ?? item.incorrectAttempts) +
          (result === "incorrect" ? 1 : 0),
        lastSeenAt: now
      };
      const attempt: AttemptRecord = {
        itemId: item.id,
        result,
        answeredAt: now,
        sessionId,
        term: item.term,
        meaningJa: item.meaningJa
      };

      itemStore.put(nextItem);
      attemptStore.add(attempt);
    };

    transaction.oncomplete = () => resolve();
    transaction.onerror = () => reject(transaction.error);
    transaction.onabort = () => reject(transaction.error);
  });
}

export async function getRecentAttempts(db: IDBDatabase, limit = 10) {
  return new Promise<AttemptRecord[]>((resolve, reject) => {
    const transaction = db.transaction("attempts", "readonly");
    const index = transaction.objectStore("attempts").index("answeredAt");
    const request = index.openCursor(null, "prev");
    const attempts: AttemptRecord[] = [];

    request.onerror = () => reject(request.error);
    request.onsuccess = () => {
      const cursor = request.result;
      if (!cursor || attempts.length >= limit) {
        resolve(attempts);
        return;
      }

      attempts.push(cursor.value as AttemptRecord);
      cursor.continue();
    };
  });
}

export async function exportStudyData(db: IDBDatabase) {
  const [items, attempts] = await Promise.all([getAllItems(db), getAllAttempts(db)]);

  return {
    exportedAt: new Date().toISOString(),
    seedVersion: SEED_VERSION,
    items,
    attempts
  };
}

export async function resetStudyProgress(db: IDBDatabase) {
  const items = await getAllItems(db);

  await new Promise<void>((resolve, reject) => {
    const transaction = db.transaction(["items", "attempts"], "readwrite");
    const itemStore = transaction.objectStore("items");

    for (const item of items) {
      itemStore.put({
        ...item,
        totalAttempts: 0,
        correctAttempts: 0,
        incorrectAttempts: 0,
        lastSeenAt: null
      });
    }

    transaction.objectStore("attempts").clear();
    transaction.oncomplete = () => resolve();
    transaction.onerror = () => reject(transaction.error);
    transaction.onabort = () => reject(transaction.error);
  });
}

function openDatabase() {
  return new Promise<IDBDatabase>((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);
    request.onupgradeneeded = () => {
      const db = request.result;

      if (!db.objectStoreNames.contains("items")) {
        const items = db.createObjectStore("items", { keyPath: "id" });
        items.createIndex("itemType", "itemType", { unique: false });
        items.createIndex("sourceRank", "sourceRank", { unique: false });
      }

      if (!db.objectStoreNames.contains("attempts")) {
        const attempts = db.createObjectStore("attempts", {
          keyPath: "attemptId",
          autoIncrement: true
        });
        attempts.createIndex("itemId", "itemId", { unique: false });
        attempts.createIndex("answeredAt", "answeredAt", { unique: false });
        attempts.createIndex("sessionId", "sessionId", { unique: false });
      }

      if (!db.objectStoreNames.contains("meta")) {
        db.createObjectStore("meta", { keyPath: "key" });
      }
    };
  });
}

async function seedVocabulary(db: IDBDatabase) {
  const currentVersion = await getMeta(db, "seedVersion");

  if (currentVersion === SEED_VERSION) {
    return;
  }

  const existingItems = new Map((await getAllItems(db)).map((item) => [item.id, item]));

  await new Promise<void>((resolve, reject) => {
    const transaction = db.transaction(["items", "meta"], "readwrite");
    const itemStore = transaction.objectStore("items");

    for (const seed of vocabularySeed) {
      const existing = existingItems.get(seed.id);
      itemStore.put({
        ...seed,
        totalAttempts: existing?.totalAttempts ?? 0,
        correctAttempts: existing?.correctAttempts ?? 0,
        incorrectAttempts: existing?.incorrectAttempts ?? 0,
        lastSeenAt: existing?.lastSeenAt ?? null
      });
    }

    transaction.objectStore("meta").put({ key: "seedVersion", value: SEED_VERSION });
    transaction.oncomplete = () => resolve();
    transaction.onerror = () => reject(transaction.error);
    transaction.onabort = () => reject(transaction.error);
  });
}

function getMeta(db: IDBDatabase, key: string) {
  return new Promise<string | null>((resolve, reject) => {
    const request = db.transaction("meta", "readonly").objectStore("meta").get(key);
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve((request.result as MetaRecord | undefined)?.value ?? null);
  });
}

function getAllItems(db: IDBDatabase) {
  return getAllFromStore<VocabularyItem>(db, "items");
}

function getAllAttempts(db: IDBDatabase) {
  return getAllFromStore<AttemptRecord>(db, "attempts");
}

function getAllFromStore<T>(db: IDBDatabase, storeName: StoreName) {
  return new Promise<T[]>((resolve, reject) => {
    const request = db.transaction(storeName, "readonly").objectStore(storeName).getAll();
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result as T[]);
  });
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
  const stableKnown = attempts >= 3 && incorrectRate <= 0.2;
  const newItemBonus = attempts === 0 ? 1.3 : 1;
  const mistakeBonus = 1 + item.incorrectAttempts * 0.38 + incorrectRate * 2.5;
  const knownPenalty = stableKnown ? 0.22 : 1;
  const oldSeenBonus = item.lastSeenAt ? Math.min(1.5, (Date.now() - item.lastSeenAt) / 604800000) : 1;
  const frequencyPriority = Math.max(0.35, 1.12 - item.sourceRank / 5200);

  return Math.max(0.05, newItemBonus * mistakeBonus * knownPenalty * oldSeenBonus * frequencyPriority);
}
