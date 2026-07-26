import axios from "axios";

import prisma from "../../../lib/prisma.js";
import { ApiError } from "../../../utils/apiError.js";

function extractUsername(url) {
  return url.replace(/\/$/, "").split("/").pop();
}

function buildHeatmap(calendar) {
  const SECONDS_PER_DAY = 86400;
  const end = Math.floor(Date.now() / 1000);

  return Array.from({ length: 365 }, (_, index) => {
    const ts = end - (364 - index) * SECONDS_PER_DAY;
    const midnight = ts - (ts % SECONDS_PER_DAY);

    return calendar[midnight] ?? 0;
  });
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

  const query = `
    query getUserProfile($username: String!) {
  matchedUser(username: $username) {
    username

    submitStats {
      acSubmissionNum {
        difficulty
        count
      }
    }

    userCalendar {
      streak
      totalActiveDays
      submissionCalendar
    }

    profile {
      ranking
    }

  }

  userContestRanking(username: $username) {
    rating
    topPercentage
  }
}
  `;

  try {
    const { data } = await axios.post(
      "https://leetcode.com/graphql",
      {
        query,
        variables: {
          username,
        },
      },
    );

    if (!data.data?.matchedUser) {
      throw new ApiError(404, "LeetCode user not found");
    }

    const user = data.data.matchedUser;
    const contest = data.data.userContestRanking;

    const solved = Object.fromEntries(
      user.submitStats.acSubmissionNum.map((item) => [
        item.difficulty.toLowerCase(),
        item.count,
      ]),
    );

    const calendar = JSON.parse(user.userCalendar.submissionCalendar);

    return {
      profileUrl: socialLink.url,
      username: user.username,

      solved: solved.all,
      easy: solved.easy,
      medium: solved.medium,
      hard: solved.hard,

      streak: user.userCalendar.streak,
      activeDays: user.userCalendar.totalActiveDays,

      ranking: user.profile?.ranking,

      contestRating: contest?.rating,
      topPercentage: contest?.topPercentage,

      heatmap: buildHeatmap(calendar),
    };
  } catch (error) {
    if (error instanceof ApiError) throw error;

    throw new ApiError(500, "Failed to fetch LeetCode data");
  }
}
