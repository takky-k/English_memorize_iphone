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

## Phrasal Verbs and Daily Expressions

The app includes:

- 50 hand-selected daily phrasal verbs in `src/data/phrasalVerbSeed.ts`
- 110 additional PHaVE-ranked phrasal verbs in `src/data/phaveExpansionSeed.ts`
- 272 daily spoken chunks and practical expressions in `src/data/dailyPhraseSeed.ts`
- 40 targeted words and 80 collocations or conversation frames in
  `src/data/personalizedExpansionSeed.ts`
- 51 reviewed high-frequency meanings in `src/data/ngslMeaningOverrides.ts`

References checked:

- PHaVE List: 150 frequent phrasal verbs and their major corpus senses
- PHRASE List: 505 frequent non-transparent multiword expressions from the BNC
- Cambridge Grammar spoken-English sections on chunks, discourse markers, and vague expressions
- BBC Learning English and VOA Learning English daily-expression videos and transcripts
- Cambridge Dictionary entries for individual meaning checks

Definitions in the seed are short original paraphrases. Japanese meanings were manually
reviewed for the everyday senses selected. Run `pnpm run audit:data` to check for blank
fields, normalized duplicate terms, and valid NGSL meaning overrides.
