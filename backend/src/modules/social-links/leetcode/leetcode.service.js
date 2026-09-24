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

      profile {
        realName
        aboutMe
        userAvatar
        ranking
      }

      submitStats {
        acSubmissionNum {
          difficulty
          count
          submissions
        }

        totalSubmissionNum {
          difficulty
          count
          submissions
        }
      }

      userCalendar {
        streak
        totalActiveDays
        submissionCalendar
      }

      badges {
        id
        name
        displayName
        icon
        creationDate
      }

      languageProblemCount {
        languageName
        problemsSolved
      }

      tagProblemCounts {
        advanced {
          tagName
          problemsSolved
        }

        intermediate {
          tagName
          problemsSolved
        }

        fundamental {
          tagName
          problemsSolved
        }
      }
    }

    userContestRanking(username: $username) {
      attendedContestsCount
      rating
      globalRanking
      totalParticipants
      topPercentage
    }

    userContestRankingHistory(username: $username) {
      attended
      rating
      ranking
      problemsSolved

      contest {
        title
        startTime
      }
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
    const contestHistory = data.data.userContestRankingHistory;

    const solved = Object.fromEntries(
      user.submitStats.acSubmissionNum.map((item) => [
        item.difficulty.toLowerCase(),
        item.count,
      ]),
    );

    const calendar = JSON.parse(user.userCalendar?.submissionCalendar || "{}");

    return {
      profileUrl: socialLink.url,

      // Basic identity
      username: user.username,

      profile: {
        realName: user.profile?.realName,
        aboutMe: user.profile?.aboutMe,
        avatar: user.profile?.userAvatar,
        ranking: user.profile?.ranking,
      },

      // Problems solved
      solved: solved.all,
      easy: solved.easy,
      medium: solved.medium,
      hard: solved.hard,

      // Activity
      activity: {
        streak: user.userCalendar?.streak,
        activeDays: user.userCalendar?.totalActiveDays,
      },

      // Languages
      languages: user.languageProblemCount?.map((item) => ({
        language: item.languageName,
        problemsSolved: item.problemsSolved,
      })),

      // DSA / topic skills
      skills: {
        advanced: user.tagProblemCounts?.advanced,
        intermediate: user.tagProblemCounts?.intermediate,
        fundamental: user.tagProblemCounts?.fundamental,
      },

      // Contest
      contest: {
        attended: contest?.attendedContestsCount,
        rating: contest?.rating,
        globalRanking: contest?.globalRanking,
        totalParticipants: contest?.totalParticipants,
        topPercentage: contest?.topPercentage,
      },

      // Contest history
      contestHistory: contestHistory
        ?.filter((item) => item.attended)
        .map((item) => ({
          contest: item.contest?.title,
          startTime: item.contest?.startTime,
          rating: item.rating,
          ranking: item.ranking,
          problemsSolved: item.problemsSolved,
        })),

      // Daily activity
      heatmap: buildHeatmap(calendar),
    };
  } catch (error) {
    if (error instanceof ApiError) throw error;

    throw new ApiError(500, "Failed to fetch LeetCode data");
  }
}
