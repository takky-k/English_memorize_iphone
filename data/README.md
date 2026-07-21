# Vocabulary Data

## NGSL

The app currently imports `NGSL-1.01_en_ja.csv` as the Japanese-ready NGSL seed.

Source used:

- GitHub mirror: `koba-ninkigumi/ngsl`
- File: `NGSL-1.01_en_ja.csv`

Reference checked:

- Official NGSL site says NGSL 1.2 has 2809 words and is licensed under Creative Commons Attribution-ShareAlike 4.0 International.

## Phrasal Verbs

The app currently includes a 50-item starter set of common daily phrasal verbs in `src/data/phrasalVerbSeed.ts`.

Reference checked:

- PHaVE List: a research-based list of 150 frequent phrasal verbs and meanings.

There does not appear to be one canonical public "700 daily essential phrasal verbs" list. The database schema supports adding a larger CSV-backed phrase list later.
