import github from "./github.api.js";

export async function getRepositoryLanguages(owner, repo) {
  const { data } = await github.get(`/repos/${owner}/${repo}/languages`);

  return data;
}

export async function getGithubLanguages(username, repositories) {
  const originalRepositories = repositories.filter((repo) => !repo.fork);

  const results = await Promise.allSettled(
    originalRepositories.map((repo) =>
      getRepositoryLanguages(username, repo.name),
    ),
  );

  const languageTotals = {};
  let failedRepositories = 0;

  for (const result of results) {
    if (result.status === "rejected") {
      failedRepositories++;
      continue;
    }

    for (const [language, bytes] of Object.entries(result.value)) {
      languageTotals[language] = (languageTotals[language] ?? 0) + bytes;
    }
  }

  return {
    languageTotals,
    failedRepositories,
  };
}

export function calculateLanguagePercentages(languageTotals) {
  const totalBytes = Object.values(languageTotals).reduce(
    (sum, bytes) => sum + bytes,
    0,
  );

  if (totalBytes === 0) return [];

  return Object.entries(languageTotals)
    .map(([language, bytes]) => ({
      language,
      bytes,
      percentage: Number(((bytes / totalBytes) * 100).toFixed(2)),
    }))
    .sort((a, b) => b.bytes - a.bytes);
}
