import prisma from "../../../lib/prisma.js";
import { ApiError } from "../../../utils/apiError.js";

import { getGithubProfile } from "../../../services/github/github.profile.service.js";
import { getGithubContributions } from "../../../services/github/github.contribution.service.js";
import { extractGithubStats } from "../../../services/github/github.stats.service.js";
import { getGithubRepositories } from "../../../services/github/github.repository.service.js";

import {
  getGithubLanguages,
  calculateLanguagePercentages,
} from "../../../services/github/github.language.service.js";

import {
  getCachedGithubStats,
  setCachedGithubStats,
  getInFlightRequest,
  setInFlightRequest,
  removeInFlightRequest,
} from "../../../services/github/github.cache.js";

function extractUsername(url) {
  return url.replace(/\/$/, "").split("/").pop();
}

async function fetchGithubStats(username) {
    try {
    const user = await getGithubProfile(username);

    const contributions = await getGithubContributions(username);

    const repositories = await getGithubRepositories(username);

    const { languageTotals, failedRepositories } = await getGithubLanguages(
      username,
      repositories,
    );

    const languages = calculateLanguagePercentages(languageTotals);

    const stats = extractGithubStats(
      user,
      contributions,
      repositories,
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

export async function getGithubStats() {
  const socialLink = await prisma.socialLink.findFirst({
    where: {
      platform: "GITHUB",
    },
  });

  if (!socialLink) {
    throw new ApiError(404, "GitHub profile not found");
  }

  const username = extractUsername(socialLink.url);

  const cachedStats = getCachedGithubStats(username);

  if (cachedStats) {
    return cachedStats;
  }

  const existingRequest = getInFlightRequest(username);

  if (existingRequest) {
    return existingRequest;
  }

  const request = fetchGithubStats(username);

  setInFlightRequest(username, request);

  try {
    return await request;
  } finally {
    removeInFlightRequest(username);
  }
}
