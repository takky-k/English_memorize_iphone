import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const ngslPath = path.join(root, "src", "data", "ngslSeed.ts");
const phrasePaths = [
  path.join(root, "src", "data", "phrasalVerbSeed.ts"),
  path.join(root, "src", "data", "phaveExpansionSeed.ts"),
  path.join(root, "src", "data", "dailyPhraseSeed.ts")
];
const personalizedPath = path.join(root, "src", "data", "personalizedExpansionSeed.ts");
const overridePath = path.join(root, "src", "data", "ngslMeaningOverrides.ts");
const difficultyPath = path.join(root, "src", "data", "personalDifficultyProfile.ts");

const ngslSource = fs.readFileSync(ngslPath, "utf8");
const ngslItems = JSON.parse(
  ngslSource.slice(ngslSource.indexOf("= [") + 2, ngslSource.lastIndexOf("]") + 1)
);
const items = ngslItems.map((item) => ({
  file: path.relative(root, ngslPath),
  term: item.term,
  meaningJa: item.meaningJa,
  definitionEn: item.definitionEn,
  itemType: "word",
  sourceRank: item.sourceRank
}));

for (const phrasePath of phrasePaths) {
  const source = fs.readFileSync(phrasePath, "utf8");
  const relativePath = path.relative(root, phrasePath);
  const objectRows = [...source.matchAll(
    /\{\s*id:\s*"[^"]+",\s*term:\s*"([^"]+)",\s*meaningJa:\s*"([^"]+)",\s*definitionEn:\s*"([^"]+)"/g
  )];
  const tupleRows = [...source.matchAll(
    /^\s*\["([^"]+)",\s*"([^"]+)",\s*"([^"]+)"\],?$/gm
  )];

  for (const match of [...objectRows, ...tupleRows]) {
    items.push({
      file: relativePath,
      term: match[1],
      meaningJa: match[2],
      definitionEn: match[3],
      itemType: "phrase"
    });
  }
}

const personalizedSource = fs.readFileSync(personalizedPath, "utf8");
const personalizedRelativePath = path.relative(root, personalizedPath);
const wordBlock = personalizedSource.slice(
  personalizedSource.indexOf("const wordRows"),
  personalizedSource.indexOf("const phraseRows")
);
const phraseBlock = personalizedSource.slice(
  personalizedSource.indexOf("const phraseRows"),
  personalizedSource.indexOf("export const personalizedExpansionSeed")
);
addTupleRows(wordBlock, personalizedRelativePath, "word");
addTupleRows(phraseBlock, personalizedRelativePath, "phrase");

const errors = [];
const grouped = new Map();
const itemByTerm = new Map(items.map((item) => [normalizeTerm(item.term), item]));
const overrideSource = fs.readFileSync(overridePath, "utf8");
const overrideRows = [...overrideSource.matchAll(
  /^\s{2}([a-z]+):\s*\{\s*\r?\n\s*meaningJa:\s*"([^"]+)",\s*\r?\n\s*definitionEn:\s*"([^"]+)"/gm
)];
const difficultySource = fs.readFileSync(difficultyPath, "utf8");
const difficultyRanks = JSON.parse(
  `[${difficultySource.slice(
    difficultySource.indexOf("new Set([") + "new Set([".length,
    difficultySource.indexOf("]);")
  )}]`
);
const uniqueDifficultyRanks = new Set(difficultyRanks);

for (const match of overrideRows) {
  const item = itemByTerm.get(normalizeTerm(match[1]));

  if (!item) {
    errors.push(`Meaning override has no matching NGSL term: ${match[1]}`);
    continue;
  }

  item.meaningJa = match[2];
  item.definitionEn = match[3];
}

if (difficultyRanks.length !== uniqueDifficultyRanks.size) {
  errors.push("Personal difficulty profile contains duplicate NGSL ranks");
}

for (const rank of difficultyRanks) {
  if (!Number.isInteger(rank) || rank < 1 || rank > ngslItems.length) {
    errors.push(`Invalid NGSL rank in personal difficulty profile: ${rank}`);
  }
}

for (const basicTerm of ["we", "fish", "key"]) {
  const item = itemByTerm.get(basicTerm);

  if (!item || uniqueDifficultyRanks.has(item.sourceRank)) {
    errors.push(`Basic term should remain outside the review profile: ${basicTerm}`);
  }
}

for (const retainedTerm of ["kind", "state", "charge"]) {
  const item = itemByTerm.get(retainedTerm);

  if (!item || !uniqueDifficultyRanks.has(item.sourceRank)) {
    errors.push(`Retained polysemous term is missing from review profile: ${retainedTerm}`);
  }
}

for (const item of items) {
  if (!item.term.trim() || !item.meaningJa.trim() || !item.definitionEn.trim()) {
    errors.push(`Blank vocabulary field in ${item.file}: ${item.term || "(missing term)"}`);
  }

  const key = normalizeTerm(item.term);
  grouped.set(key, [...(grouped.get(key) ?? []), item]);
}

for (const [term, duplicates] of grouped) {
  if (duplicates.length > 1) {
    errors.push(
      `Duplicate term "${term}" in ${duplicates.map((item) => item.file).join(", ")}`
    );
  }
}

if (errors.length > 0) {
  console.error(errors.join("\n"));
  process.exitCode = 1;
} else {
  const wordCount = items.filter((item) => item.itemType === "word").length;
  const phraseCount = items.filter((item) => item.itemType === "phrase").length;
  console.log(
    `Vocabulary audit passed: ${items.length} unique items ` +
      `(${wordCount} words, ${phraseCount} phrases, ` +
      `${overrideRows.length} reviewed NGSL meanings, ` +
      `${uniqueDifficultyRanks.size} personal review ranks).`
  );
}

function addTupleRows(source, file, itemType) {
  const tupleRows = [...source.matchAll(
    /^\s*\["([^"]+)",\s*"([^"]+)",\s*"([^"]+)"\],?$/gm
  )];

  for (const match of tupleRows) {
    items.push({
      file,
      term: match[1],
      meaningJa: match[2],
      definitionEn: match[3],
      itemType
    });
  }
}

function normalizeTerm(term) {
  return term
    .trim()
    .toLocaleLowerCase("en-US")
    .replace(/[’‘]/g, "'")
    .replace(/\s+/g, " ");
}
