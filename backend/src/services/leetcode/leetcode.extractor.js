function buildHeatmap(calendar) {
  const SECONDS_PER_DAY = 86400;
  const end = Math.floor(Date.now() / 1000);

  return Array.from({ length: 365 }, (_, index) => {
    const ts = end - (364 - index) * SECONDS_PER_DAY;
    const midnight = ts - (ts % SECONDS_PER_DAY);

    return calendar[midnight] ?? 0;
  });
}

export function extractLeetCodeStats(
  user,
  solved,
  contest,
  contestHistory,
  calendar,
) {
  return {
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
}
