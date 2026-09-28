import "dotenv/config";

import { getGithubRepositories } from "./github.repository.service.js";

import {
  getGithubLanguages,
  calculateLanguagePercentages,
} from "./github.language.service.js";

const username = "Chirag-12-06";

const repositories =
  await getGithubRepositories(username);

const {
  languageTotals,
  failedRepositories,
} = await getGithubLanguages(
  username,
  repositories
);

const languages =
  calculateLanguagePercentages(
    languageTotals
  );

console.dir(
  {
    languages,
    failedRepositories,
  },
  { depth: null }
);