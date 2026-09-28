import { ApiError } from "../../../../utils/apiError.js";
import { getLeetCodeProfile } from "./leetcode.api.js";
import { setCachedLeetCodeStats } from "./leetcode.cache.js";
import { extractLeetCodeStats } from "./leetcode.extractor.js";

export async function fetchLeetCodeStats(username) {
  try {
    const data = await getLeetCodeProfile(username);

    if (!data?.data) {
      throw new ApiError(404, "LeetCode user not found");
    }

    const user = data?.data.matchedUser;
    const contest = data?.data.userContestRanking;
    const contestHistory = data?.data.userContestRankingHistory;

    const solved = Object.fromEntries(
      user.submitStats.acSubmissionNum.map((item) => [
        item.difficulty.toLowerCase(),
        item.count,
      ]),
    );

    const calendar = JSON.parse(user.userCalendar?.submissionCalendar || "{}");

    const stats = extractLeetCodeStats(
      user,
      solved,
      contest,
      contestHistory,
      calendar,
    );

    setCachedLeetCodeStats(username, stats);

    return stats;
  } catch (error) {
    console.error("LeetCode stats error:", error);
    if (error.response?.status === 404) {
      throw new ApiError(404, "LeetCode user not found");
    }

    throw new ApiError(500, "Failed to fetch LeetCode data");
  }
}
