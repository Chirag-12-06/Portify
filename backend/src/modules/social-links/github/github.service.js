import prisma from "../../../lib/prisma.js";
import { ApiError } from "../../../utils/apiError.js";

import { getGithubProfile } from "../../../services/github/github.profile.service.js";
import { getGithubContributions } from "../../../services/github/github.contribution.service.js";
import { extractGithubStats } from "../../../services/github/github.stats.service.js";

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

  try {
    const user = await getGithubProfile(username);

    const contributionCalendar =
      await getGithubContributions(username);

    return extractGithubStats(
      user,
      contributionCalendar,
    );
  } catch (error) {
    if (error.response?.status === 404) {
      throw new ApiError(404, "GitHub user not found");
    }

    throw new ApiError(
      500,
      "Failed to fetch GitHub data",
    );
  }
}