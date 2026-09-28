import prisma from "../../../lib/prisma.js";
import { ApiError } from "../../../utils/apiError.js";

import { fetchLeetCodeStats } from "../../../services/leetcode/leetcode.fetch.service.js";

import {
  getCachedLeetCodeStats,
  getInFlightRequest,
  removeInFlightRequest,
  setInFlightRequest,
} from "../../../services/leetcode/leetcode.cache.js";

function extractUsername(url) {
  return url.replace(/\/$/, "").split("/").pop();
}

export async function getLeetCodeStats() {
  const socialLink = await prisma.socialLink.findFirst({
    where: {
      platform: "LEETCODE",
    },
  });

  if (!socialLink) {
    throw new ApiError(404, "LeetCode profile not found");
  }

  const username = extractUsername(socialLink.url);

  const cachedStats = getCachedLeetCodeStats(username);

  if (cachedStats) {
    return cachedStats;
  }

  const existingRequest = getInFlightRequest(username);

  if (existingRequest) {
    return existingRequest;
  }

  const request = fetchLeetCodeStats(username);

  setInFlightRequest(username, request);

  try {
    return await request;
  } finally {
    removeInFlightRequest(username);
  }
}
