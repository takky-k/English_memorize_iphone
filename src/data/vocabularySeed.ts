import { dailyPhraseSeed } from "./dailyPhraseSeed";
import { ngslSeed } from "./ngslSeed";
import { phaveExpansionSeed } from "./phaveExpansionSeed";
import { phrasalVerbSeed } from "./phrasalVerbSeed";

export const vocabularySeed = [
  ...ngslSeed,
  ...phrasalVerbSeed,
  ...phaveExpansionSeed,
  ...dailyPhraseSeed
];
