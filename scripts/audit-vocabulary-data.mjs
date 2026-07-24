import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const ngslPath = path.join(root, "src", "data", "ngslSeed.ts");
const phrasePaths = [
  path.join(root, "src", "data", "phrasalVerbSeed.ts"),
  path.join(root, "src", "data", "phaveExpansionSeed.ts"),
  path.join(root, "src", "data", "dailyPhraseSeed.ts")
];

const ngslSource = fs.readFileSync(ngslPath, "utf8");
const ngslItems = JSON.parse(
  ngslSource.slice(ngslSource.indexOf("= [") + 2, ngslSource.lastIndexOf("]") + 1)
);
const items = ngslItems.map((item) => ({
  file: path.relative(root, ngslPath),
  term: item.term,
  meaningJa: item.meaningJa,
  definitionEn: item.definitionEn
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
      definitionEn: match[3]
    });
  }
}

const errors = [];
const grouped = new Map();

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
  const phraseCount = items.length - ngslItems.length;
  console.log(
    `Vocabulary audit passed: ${items.length} unique items ` +
      `(${ngslItems.length} words, ${phraseCount} phrases).`
  );
}

function normalizeTerm(term) {
  return term
    .trim()
    .toLocaleLowerCase("en-US")
    .replace(/[’‘]/g, "'")
    .replace(/\s+/g, " ");
}
