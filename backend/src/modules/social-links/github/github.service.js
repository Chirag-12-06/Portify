import prisma from "../../../lib/prisma.js";
import { ApiError } from "../../../utils/apiError.js";

import { fetchGithubStats } from "../../../services/github/github.fetch.service.js";

import {
  getCachedGithubStats,
  getInFlightRequest,
  removeInFlightRequest,
  setInFlightRequest,
} from "../../../services/github/github.cache.js";

function extractUsername(url) {
  return url.replace(/\/$/, "").split("/").pop();
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
