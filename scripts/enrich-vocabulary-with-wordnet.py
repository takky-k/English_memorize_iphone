import argparse
import csv
import re
import sqlite3
from pathlib import Path

from wordfreq import get_frequency_dict


POS_MAP = {
    "noun": "n",
    "verb": "v",
    "adjective": "a",
    "adverb": "r",
}
MAX_MEANINGS = 4
JAPANESE_FREQUENCIES = get_frequency_dict("ja")
JAPANESE_VERB_ENDING = re.compile(r"[うくぐすつぬぶむる]$")


def split_meanings(value: str) -> list[str]:
    normalized = value.replace(";", "、").replace("；", "、")
    return [meaning.strip() for meaning in normalized.split("、") if meaning.strip()]


def build_wordnet_lookup(
    connection: sqlite3.Connection, rows: list[list[str]]
) -> dict[tuple[str, str], list[str]]:
    requested = {
        (row[1].lower(), POS_MAP.get(row[2].lower(), "")) for row in rows if row
    }
    connection.execute(
        "CREATE TEMP TABLE requested (lemma TEXT, pos TEXT, PRIMARY KEY (lemma, pos))"
    )
    connection.executemany(
        "INSERT INTO requested (lemma, pos) VALUES (?, ?)", sorted(requested)
    )
    matched_rows = connection.execute(
        """
        SELECT requested.lemma, requested.pos, es.synset, es.freq, jw.lemma
        FROM requested
        JOIN word AS ew
          ON lower(ew.lemma) = requested.lemma
         AND (requested.pos = '' OR ew.pos = requested.pos)
        JOIN sense AS es ON es.wordid = ew.wordid
        JOIN sense AS js ON js.synset = es.synset AND js.lang = 'jpn'
        JOIN word AS jw ON jw.wordid = js.wordid AND jw.lang = 'jpn'
        WHERE ew.lang = 'eng'
          AND es.freq > 0
        ORDER BY
          requested.lemma,
          requested.pos,
          es.freq DESC,
          es.synset
        """
    ).fetchall()

    senses: dict[tuple[str, str], dict[str, tuple[int, list[str]]]] = {}
    for lemma, wordnet_pos, synset, frequency, meaning in matched_rows:
        cleaned = meaning.strip()
        sense_group = senses.setdefault((lemma, wordnet_pos), {})
        sense_frequency, candidates = sense_group.setdefault(
            synset, (frequency or 0, [])
        )
        if cleaned and cleaned not in candidates:
            candidates.append(cleaned)
        sense_group[synset] = (sense_frequency, candidates)

    lookup: dict[tuple[str, str], list[str]] = {}
    for key, sense_group in senses.items():
        ordered_senses = sorted(
            sense_group.values(), key=lambda sense: sense[0], reverse=True
        )
        meanings = []
        for _, candidates in ordered_senses:
            if key[1] == "v":
                verb_candidates = [
                    candidate
                    for candidate in candidates
                    if JAPANESE_VERB_ENDING.search(candidate)
                ]
                candidates = verb_candidates or candidates
            commonest = max(
                candidates,
                key=lambda candidate: (
                    JAPANESE_FREQUENCIES.get(candidate, 0),
                    -len(candidate),
                ),
            )
            if commonest not in meanings:
                meanings.append(commonest)
        lookup[key] = meanings
    return lookup


def enrich_row(
    lookup: dict[tuple[str, str], list[str]], row: list[str]
) -> tuple[list[str], bool]:
    rank, lemma, pos, definition_en, meaning_ja = row
    meanings = split_meanings(meaning_ja)
    meaning_keys = {normalize_meaning(meaning) for meaning in meanings}
    candidates = lookup.get((lemma.lower(), POS_MAP.get(pos.lower(), "")), [])

    for candidate in candidates:
        candidate_key = normalize_meaning(candidate)
        if candidate_key not in meaning_keys:
            meanings.append(candidate)
            meaning_keys.add(candidate_key)
        if len(meanings) >= MAX_MEANINGS:
            break

    enriched = "、".join(meanings[:MAX_MEANINGS])
    return [rank, lemma, pos, definition_en, enriched], enriched != meaning_ja


def normalize_meaning(meaning: str) -> str:
    return meaning.removeprefix("～").removesuffix("する").replace(" ", "")


def main() -> None:
    parser = argparse.ArgumentParser(
        description="Add Japanese WordNet meanings to the NGSL vocabulary CSV."
    )
    parser.add_argument("--database", required=True, type=Path)
    parser.add_argument("--input", required=True, type=Path)
    parser.add_argument("--output", required=True, type=Path)
    args = parser.parse_args()

    with args.input.open("r", encoding="utf-8-sig", newline="") as source:
        rows = list(csv.reader(source))

    header, data_rows = rows[0], rows[1:]
    connection = sqlite3.connect(args.database)
    try:
        lookup = build_wordnet_lookup(connection, data_rows)
        enriched_rows = [enrich_row(lookup, row) for row in data_rows if row]
    finally:
        connection.close()

    args.output.parent.mkdir(parents=True, exist_ok=True)
    with args.output.open("w", encoding="utf-8", newline="") as destination:
        writer = csv.writer(destination, lineterminator="\n")
        writer.writerow(["Rank", "Lemma", "POS", "Definition", "MeaningJa"])
        writer.writerows(row for row, _ in enriched_rows)

    changed = sum(1 for _, was_changed in enriched_rows if was_changed)
    print(f"Enriched {changed} of {len(enriched_rows)} entries using Japanese WordNet.")


if __name__ == "__main__":
    main()
