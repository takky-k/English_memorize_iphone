import { dailyPhraseSeed } from "./dailyPhraseSeed";
import { ngslMeaningOverrides } from "./ngslMeaningOverrides";
import { ngslSeed } from "./ngslSeed";
import { personalizedExpansionSeed } from "./personalizedExpansionSeed";
import { phaveExpansionSeed } from "./phaveExpansionSeed";
import { phrasalVerbSeed } from "./phrasalVerbSeed";
import { withUsageExamples } from "./usageExamples";

const reviewedNgslSeed = ngslSeed.map((item) => ({
  ...item,
  ...ngslMeaningOverrides[item.term.toLocaleLowerCase("en-US")]
}));

export const vocabularySeed = withUsageExamples([
  ...reviewedNgslSeed,
  ...phrasalVerbSeed,
  ...phaveExpansionSeed,
  ...dailyPhraseSeed,
  ...personalizedExpansionSeed
]);
