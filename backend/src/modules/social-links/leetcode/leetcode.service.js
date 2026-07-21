import axios from "axios";

import prisma from "../../../lib/prisma.js";
import { ApiError } from "../../../utils/apiError.js";

function extractUsername(url) {
  return url.replace(/\/$/, "").split("/").pop();
}

function buildHeatmap(calendar) {
  const oneDay = 86400;
  const today = new Date();
  const end = Math.floor(today.getTime() / 1000);

  const cells = [];

  for (let i = 364; i >= 0; i--) {
    const ts = end - i * oneDay;

    // Normalize to midnight UTC
    const midnight = ts - (ts % oneDay);

    cells.push({
      date: new Date(midnight * 1000),
      count: calendar[midnight] ?? 0,
    });
  }

  return cells;
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
      reputation
      starRating
    }

    badges {
      id
      displayName
      icon
    }
  }

  userContestRanking(username: $username) {
    rating
    attendedContestsCount
    globalRanking
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
      {
        headers: {
          "Content-Type": "application/json",
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
      starRating: user.profile?.starRating,
      badges: user.badges,

      contestRating: contest?.rating,
      attendedContestsCount: contest?.attendedContestsCount,
      globalRanking: contest?.globalRanking,
      topPercentage: contest?.topPercentage,

      heatmap: buildHeatmap(calendar),
    };
  // } catch (error) {
  //   if (error instanceof ApiError) throw error;

  //   throw new ApiError(500, "Failed to fetch LeetCode data");
  // }
  }catch (error) {
  console.dir(error.response?.data, { depth: null });

  throw error;
}
}
