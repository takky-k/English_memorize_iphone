# Vocabulary Data

## NGSL

The app imports `NGSL-1.01_en_ja.csv` as the Japanese-ready NGSL seed. Common
Japanese WordNet senses are appended up to a maximum of four meanings per entry.

Source used:

- GitHub mirror: `koba-ninkigumi/ngsl`
- File: `NGSL-1.01_en_ja.csv`

Japanese enrichment source:

- [Japanese WordNet 1.1](https://bond-lab.github.io/wnja/eng/downloads.html)
- English part of speech and sense usage frequency are used to discard unrelated
  or unattested senses.
- `wordfreq` ranks Japanese synonyms so common modern wording is preferred.
- 2,291 of the 2,801 NGSL entries currently have at least one additional meaning.
- The Japanese WordNet license is stored in `licenses/JAPANESE_WORDNET_LICENSE.txt`.

Regeneration requires the Japanese WordNet SQLite database and Python packages
listed in `scripts/requirements-vocabulary.txt`:

```text
python scripts/enrich-vocabulary-with-wordnet.py \
  --database path/to/wnjpn.db \
  --input data/NGSL-1.01_en_ja.csv \
  --output data/NGSL-1.01_en_ja.csv
node scripts/build-vocabulary-seed.mjs
```

Reference checked:

- Official NGSL site says NGSL 1.2 has 2809 words and is licensed under Creative Commons Attribution-ShareAlike 4.0 International.

## Phrasal Verbs

The app currently includes a 50-item starter set of common daily phrasal verbs in `src/data/phrasalVerbSeed.ts`.

Reference checked:

- PHaVE List: a research-based list of 150 frequent phrasal verbs and meanings.

There does not appear to be one canonical public "700 daily essential phrasal verbs" list. The database schema supports adding a larger CSV-backed phrase list later.
