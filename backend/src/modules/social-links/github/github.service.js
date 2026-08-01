import axios from "axios";

import prisma from "../../../lib/prisma.js";
import { ApiError } from "../../../utils/apiError.js";

function extractUsername(url) {
  return url.replace(/\/$/, "").split("/").pop();
}

function buildHeatmap(contributionMap) {
  const today = new Date();

  return Array.from({ length: 365 }, (_, index) => {
    const date = new Date(today);
    date.setDate(today.getDate() - (364 - index));

    const key = date.toISOString().split("T")[0];

    return contributionMap[key]?.count ?? 0;
  });
}

const CONTRIBUTION_QUERY = `
query($username: String!) {
  user(login: $username) {
    contributionsCollection {
      contributionCalendar {
        weeks {
          contributionDays {
            date
            contributionCount
          }
        }
      }
    }
  }
}
`;

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
    // Fetch profile
   const github = axios.create({
  baseURL: "https://api.github.com",
  timeout: 10000,
  headers: {
    Accept: "application/vnd.github+json",
    Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
  },
});

const { data: user } = await github.get(`/users/${username}`);

    // Fetch contribution graph
    const { data: graphQLData } = await github.post(
  "/graphql",
  {
    query: CONTRIBUTION_QUERY,
    variables: { username },
  },
  {
    headers: {
      "Content-Type": "application/json",
    },
  }
);

    if (graphQLData.errors) {
      console.error(graphQLData.errors);
      throw new ApiError(500, "Failed to fetch GitHub contributions");
    }

    const contributionDays =
      graphQLData.data.user.contributionsCollection.contributionCalendar.weeks.flatMap(
        (week) => week.contributionDays,
      );

    const contributionMap = Object.fromEntries(
      contributionDays.map((day) => [
        day.date,
        {
          count: day.contributionCount,
        },
      ]),
    );

    const heatmap = buildHeatmap(contributionMap);

    return {
      profileUrl: user.html_url,
      username: user.login,
      publicRepos: user.public_repos,
      heatmap,
    };
  } catch (error) {
    console.error("GitHub API Error:", {
      message: error.message,
      response: error.response?.data,
    });

    if (error.response?.status === 404) {
      throw new ApiError(404, "GitHub user not found");
    }

    throw new ApiError(500, "Failed to fetch GitHub data");
  }
}