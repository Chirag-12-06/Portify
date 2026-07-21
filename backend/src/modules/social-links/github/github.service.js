import axios from "axios";

import prisma from "../../../lib/prisma.js";
import { ApiError } from "../../../utils/apiError.js";

function extractUsername(url) {
  return url.replace(/\/$/, "").split("/").pop();
}

function buildHeatmap(contributionMap) {
  const cells = [];
  const today = new Date();

  for (let i = 364; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);

    const key = date.toISOString().split("T")[0];

    cells.push({
      date: key,
      count: contributionMap[key]?.count ?? 0,
    });
  }

  return cells;
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
    const { data: user } = await axios.get(
      `https://api.github.com/users/${username}`,
      {
        headers: {
          Accept: "application/vnd.github+json",
        },
      },
    );

    const { data: heatmapData } = await axios.get(
      `https://github-contributions-api.jogruber.de/v4/${username}`,
    );

    const contributionMap = Object.fromEntries(
      heatmapData.contributions.map((day) => [day.date, day]),
    );

    const heatmap = buildHeatmap(contributionMap);

    return {
      profileUrl: user.html_url,
      username: user.login,
      publicRepos: user.public_repos,

      heatmap: heatmap,
    };
  } catch (error) {
    if (error.response?.status === 404) {
      throw new ApiError(404, "GitHub user not found");
    }

    throw new ApiError(500, "Failed to fetch GitHub data");
  }
}
