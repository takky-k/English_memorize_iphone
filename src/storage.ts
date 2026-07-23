import { vocabularySeed } from "./data/vocabularySeed";
import type {
  AnswerResult,
  AttemptRecord,
  ScreeningDecision,
  VocabularyItemType,
  VocabularyItem,
  VocabularyStats
} from "./types";

const DB_NAME = "english-memory-pwa";
const DB_VERSION = 1;
const SEED_VERSION = "2026-07-23-fast-screening";
const TEST_SIZE = 10;

type StoreName = "items" | "attempts" | "meta";
type MetaRecord = {
  key: string;
  value: string;
};
type CustomVocabularyInput = {
  term: string;
  meaningJa: string;
  definitionEn: string;
  itemType: VocabularyItemType;
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
      const uncertainAttempts = item.uncertainAttempts ?? 0;
      const incorrectAttempts = item.incorrectAttempts ?? 0;
      const isExcluded = Boolean(item.excludedAt);
      const isKnown = item.totalAttempts >= 3 && getDifficultyRate(item) <= 0.2;

      return {
        total: stats.total + 1,
        words: stats.words + (item.itemType === "word" ? 1 : 0),
        phrases: stats.phrases + (item.itemType === "phrase" ? 1 : 0),
        known: stats.known + (isKnown ? 1 : 0),
        excluded: stats.excluded + (isExcluded ? 1 : 0),
        attempts: stats.attempts + item.totalAttempts,
        correct: stats.correct + item.correctAttempts,
        uncertain: stats.uncertain + uncertainAttempts,
        incorrect: stats.incorrect + incorrectAttempts
      };
    },
    {
      total: 0,
      words: 0,
      phrases: 0,
      known: 0,
      excluded: 0,
      attempts: 0,
      correct: 0,
      uncertain: 0,
      incorrect: 0
    }
  );
}

export async function createTestSession(db: IDBDatabase) {
  const items = (await getAllItems(db)).filter((item) => !item.excludedAt);
  return sampleWeighted(items, TEST_SIZE);
}

export async function createScreeningSession(db: IDBDatabase) {
  const allItems = await getAllItems(db);
  const items = allItems
    .filter((item) => !item.excludedAt && !item.screenedAt)
    .sort((left, right) => {
      const typeDifference = Number(left.itemType === "phrase") - Number(right.itemType === "phrase");
      return typeDifference || left.sourceRank - right.sourceRank || left.term.localeCompare(right.term);
    });
  const completed = allItems.filter((item) => item.excludedAt || item.screenedAt).length;

  return {
    items,
    completed,
    total: allItems.length
  };
}

export async function screenVocabularyItem(
  db: IDBDatabase,
  item: VocabularyItem,
  decision: ScreeningDecision
) {
  const now = Date.now();

  return new Promise<VocabularyItem>((resolve, reject) => {
    const transaction = db.transaction("items", "readwrite");
    const store = transaction.objectStore("items");
    const request = store.get(item.id);
    let nextItem = item;

    request.onerror = () => reject(request.error);
    request.onsuccess = () => {
      const stored = request.result as VocabularyItem | undefined;
      nextItem = {
        ...(stored ?? item),
        screenedAt: now,
        excludedAt: decision === "exclude" ? now : stored?.excludedAt ?? item.excludedAt ?? null
      };
      store.put(nextItem);
    };
    transaction.oncomplete = () => resolve(nextItem);
    transaction.onerror = () => reject(transaction.error);
    transaction.onabort = () => reject(transaction.error);
  });
}

export async function restoreScreeningItem(db: IDBDatabase, item: VocabularyItem) {
  return new Promise<void>((resolve, reject) => {
    const transaction = db.transaction("items", "readwrite");
    transaction.objectStore("items").put(item);
    transaction.oncomplete = () => resolve();
    transaction.onerror = () => reject(transaction.error);
    transaction.onabort = () => reject(transaction.error);
  });
}

export async function recordAnswer(
  db: IDBDatabase,
  item: VocabularyItem,
  result: AnswerResult,
  sessionId: string
) {
  const now = Date.now();
  const isCorrectish = result === "correct" || result === "excluded";

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
          (stored?.correctAttempts ?? item.correctAttempts) + (isCorrectish ? 1 : 0),
        uncertainAttempts:
          (stored?.uncertainAttempts ?? item.uncertainAttempts ?? 0) +
          (result === "uncertain" ? 1 : 0),
        incorrectAttempts:
          (stored?.incorrectAttempts ?? item.incorrectAttempts) +
          (result === "incorrect" ? 1 : 0),
        lastSeenAt: now,
        excludedAt: result === "excluded" ? now : stored?.excludedAt ?? item.excludedAt ?? null,
        screenedAt: stored?.screenedAt ?? item.screenedAt ?? null
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

export async function addCustomVocabularyItem(db: IDBDatabase, input: CustomVocabularyInput) {
  const normalizedTerm = normalizeTerm(input.term);
  const existing = (await getAllItems(db)).find(
    (item) => normalizeTerm(item.term) === normalizedTerm
  );

  if (existing) {
    const updatedItem: VocabularyItem = {
      ...existing,
      meaningJa: mergeMeanings([existing.meaningJa, input.meaningJa])
    };

    await new Promise<void>((resolve, reject) => {
      const request = db.transaction("items", "readwrite").objectStore("items").put(updatedItem);
      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve();
    });

    return { item: updatedItem, merged: true };
  }

  const now = Date.now();
  const item: VocabularyItem = {
    id: `custom-${now}-${Math.random().toString(36).slice(2)}`,
    term: input.term.trim(),
    meaningJa: input.meaningJa.trim(),
    definitionEn: input.definitionEn.trim() || "自分で追加した語句",
    pos: input.itemType === "phrase" ? "phrase" : "custom",
    itemType: input.itemType,
    source: "custom",
    sourceRank: now,
    totalAttempts: 0,
    correctAttempts: 0,
    uncertainAttempts: 0,
    incorrectAttempts: 0,
    lastSeenAt: null,
    excludedAt: null,
    screenedAt: null
  };

  await new Promise<void>((resolve, reject) => {
    const request = db.transaction("items", "readwrite").objectStore("items").add(item);
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve();
  });

  return { item, merged: false };
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
        uncertainAttempts: 0,
        incorrectAttempts: 0,
        lastSeenAt: null,
        excludedAt: null,
        screenedAt: null
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

  const [existingItems, existingAttempts] = await Promise.all([
    getAllItems(db),
    getAllAttempts(db)
  ]);
  const seedGroups = groupByNormalizedTerm(vocabularySeed);
  const existingGroups = groupByNormalizedTerm(existingItems);
  const allTerms = new Set([...seedGroups.keys(), ...existingGroups.keys()]);
  const mergedItems = new Map<string, VocabularyItem>();
  const canonicalIdByOldId = new Map<string, string>();

  for (const normalizedTerm of allTerms) {
    const seeds = seedGroups.get(normalizedTerm) ?? [];
    const storedItems = existingGroups.get(normalizedTerm) ?? [];
    const base = seeds[0] ?? chooseStoredCanonical(storedItems);

    if (!base) {
      continue;
    }

    const meaningSources =
      seeds.length > 0
        ? [...seeds.map((seed) => seed.meaningJa), ...storedItems
            .filter((item) => item.source === "custom")
            .map((item) => item.meaningJa)]
        : storedItems.map((item) => item.meaningJa);
    const latestSeen = getLatestTimestamp(storedItems.map((item) => item.lastSeenAt));
    const latestExclusion = getLatestTimestamp(storedItems.map((item) => item.excludedAt));
    const latestScreening = getLatestTimestamp(storedItems.map((item) => item.screenedAt));
    const mergedItem: VocabularyItem = {
      ...base,
      meaningJa: mergeMeanings(meaningSources),
      totalAttempts: sum(storedItems.map((item) => item.totalAttempts)),
      correctAttempts: sum(storedItems.map((item) => item.correctAttempts)),
      uncertainAttempts: sum(storedItems.map((item) => item.uncertainAttempts ?? 0)),
      incorrectAttempts: sum(storedItems.map((item) => item.incorrectAttempts)),
      lastSeenAt: latestSeen,
      excludedAt: latestExclusion,
      screenedAt: latestScreening
    };

    mergedItems.set(mergedItem.id, mergedItem);
    for (const storedItem of storedItems) {
      canonicalIdByOldId.set(storedItem.id, mergedItem.id);
    }
  }
  const itemByNormalizedTerm = new Map(
    [...mergedItems.values()].map((item) => [normalizeTerm(item.term), item])
  );

  await new Promise<void>((resolve, reject) => {
    const transaction = db.transaction(["items", "attempts", "meta"], "readwrite");
    const itemStore = transaction.objectStore("items");
    const attemptStore = transaction.objectStore("attempts");

    itemStore.clear();
    for (const item of mergedItems.values()) {
      itemStore.put(item);
    }

    for (const attempt of existingAttempts) {
      const normalizedTerm = normalizeTerm(attempt.term);
      const fallbackItem = itemByNormalizedTerm.get(normalizedTerm);
      const canonicalId = canonicalIdByOldId.get(attempt.itemId) ?? fallbackItem?.id;
      const canonicalItem = canonicalId ? mergedItems.get(canonicalId) : undefined;

      if (canonicalItem) {
        attemptStore.put({
          ...attempt,
          itemId: canonicalItem.id,
          term: canonicalItem.term,
          meaningJa: canonicalItem.meaningJa
        });
      }
    }

    transaction.objectStore("meta").put({ key: "seedVersion", value: SEED_VERSION });
    transaction.oncomplete = () => resolve();
    transaction.onerror = () => reject(transaction.error);
    transaction.onabort = () => reject(transaction.error);
  });
}

function normalizeTerm(term: string) {
  return term.trim().toLocaleLowerCase("en-US").replace(/[‘’]/g, "'").replace(/\s+/g, " ");
}

function groupByNormalizedTerm<T extends { term: string }>(items: T[]) {
  const groups = new Map<string, T[]>();

  for (const item of items) {
    const key = normalizeTerm(item.term);
    groups.set(key, [...(groups.get(key) ?? []), item]);
  }

  return groups;
}

function chooseStoredCanonical(items: VocabularyItem[]) {
  return [...items].sort((left, right) => {
    const customDifference = Number(left.source === "custom") - Number(right.source === "custom");
    return customDifference || left.sourceRank - right.sourceRank;
  })[0];
}

function mergeMeanings(meanings: string[]) {
  const uniqueMeanings = meanings
    .flatMap((meaning) => meaning.split(/[、；;]/))
    .map((meaning) => meaning.trim())
    .filter(Boolean)
    .filter((meaning, index, all) => all.indexOf(meaning) === index);

  return uniqueMeanings.join("、");
}

function getLatestTimestamp(values: Array<number | null | undefined>) {
  const timestamps = values.filter((value): value is number => typeof value === "number");
  return timestamps.length > 0 ? Math.max(...timestamps) : null;
}

function sum(values: number[]) {
  return values.reduce((total, value) => total + value, 0);
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
  if (item.excludedAt) {
    return 0;
  }

  const attempts = item.totalAttempts;
  const uncertainAttempts = item.uncertainAttempts ?? 0;
  const incorrectAttempts = item.incorrectAttempts ?? 0;
  const difficultyRate = getDifficultyRate(item);
  const stableKnown = attempts >= 3 && difficultyRate <= 0.2;
  const newItemBonus = attempts === 0 ? 1.3 : 1;
  const mistakeBonus = 1 + incorrectAttempts * 0.38 + uncertainAttempts * 0.18 + difficultyRate * 2.5;
  const knownPenalty = stableKnown ? 0.22 : 1;
  const oldSeenBonus = item.lastSeenAt
    ? Math.min(1.5, (Date.now() - item.lastSeenAt) / 604800000)
    : 1;
  const frequencyPriority = Math.max(0.35, 1.12 - item.sourceRank / 5200);

  return Math.max(0.05, newItemBonus * mistakeBonus * knownPenalty * oldSeenBonus * frequencyPriority);
}

function getDifficultyRate(item: VocabularyItem) {
  const attempts = item.totalAttempts;

  if (attempts === 0) {
    return 0.45;
  }

  return ((item.incorrectAttempts ?? 0) + (item.uncertainAttempts ?? 0) * 0.5) / attempts;
}
