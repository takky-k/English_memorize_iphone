import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const csvPath = path.join(root, "data", "NGSL-1.01_en_ja.csv");
const outputPath = path.join(root, "src", "data", "ngslSeed.ts");

function parseCsvLine(line) {
  const cells = [];
  let current = "";
  let inQuotes = false;

  for (let index = 0; index < line.length; index += 1) {
    const char = line[index];
    const next = line[index + 1];

    if (char === '"' && next === '"') {
      current += '"';
      index += 1;
      continue;
    }

    if (char === '"') {
      inQuotes = !inQuotes;
      continue;
    }

    if (char === "," && !inQuotes) {
      cells.push(current);
      current = "";
      continue;
    }

    current += char;
  }

  cells.push(current);
  return cells;
}

const csv = fs.readFileSync(csvPath, "utf8").replace(/^\uFEFF/, "");
const lines = csv.split(/\r?\n/).filter(Boolean);
const rows = lines.slice(1).map((line) => parseCsvLine(line));
const items = rows
  .map(([rank, term, pos, definitionEn, meaningJa]) => ({
    id: `ngsl-1-01-${rank}`,
    term,
    meaningJa,
    definitionEn,
    pos,
    itemType: "word",
    source: "NGSL 1.01 en-ja",
    sourceRank: Number(rank)
  }))
  .filter((item) => item.term && item.meaningJa);

const file = `import type { VocabularySeedItem } from "../types";

export const ngslSeed: VocabularySeedItem[] = ${JSON.stringify(items, null, 2)};
`;

fs.writeFileSync(outputPath, file, "utf8");
console.log(`Wrote ${items.length} NGSL items to ${path.relative(root, outputPath)}`);
