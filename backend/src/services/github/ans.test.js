import "dotenv/config";

import { getGithubRepositories } from "./github.repository.service.js";
import {
  getGithubLanguages,
  calculateLanguagePercentages,
} from "./github.language.service.js";

const repositories =
  await getGithubRepositories("Chirag-12-06");

const languageTotals =
  await getGithubLanguages("Chirag-12-06", repositories);

const languages =
  calculateLanguagePercentages(languageTotals);

console.dir(languages, { depth: null });