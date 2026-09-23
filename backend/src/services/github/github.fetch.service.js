import {getGithubProfile} from "./github.profile.service.js";
import {getGithubContributions} from "./github.contribution.service.js";
import {extractGithubStats} from "./github.stats.service.js";
import {getPinnedRepositories} from "./github.pinnedRepository.service.js";
import {getGithubRepositories} from "./github.repository.service.js";
import {getGithubLanguages, calculateLanguagePercentages} from "./github.language.service.js";
import {setCachedGithubStats} from "./github.cache.js";

export async function fetchGithubStats(username) {
  try {
    const user = await getGithubProfile(username);

    const contributions = await getGithubContributions(username);

    const repositories = await getGithubRepositories(username);

    const pinnedRepositories = await getPinnedRepositories(username);

    const { languageTotals } = await getGithubLanguages(
      username,
      repositories,
    );

    const languages = calculateLanguagePercentages(languageTotals);

    const stats = extractGithubStats(
      user,
      contributions,
      repositories,
      pinnedRepositories,
      languages,
    );

    setCachedGithubStats(username, stats);

    return stats;
  } catch (error) {
    console.error("GitHub stats error:", error);
    if (error.response?.status === 404) {
      throw new ApiError(404, "GitHub user not found");
    }

    throw new ApiError(500, "Failed to fetch GitHub data");
  }
}