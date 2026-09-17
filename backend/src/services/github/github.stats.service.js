function calculateStreaks(contributionDays) {
  const activeDays = contributionDays
    .filter((day) => day.contributionCount > 0)
    .map((day) => day.date)
    .sort();

  if (activeDays.length === 0) {
    return {
      currentStreak: 0,
      longestStreak: 0,
    };
  }

  let longestStreak = 1;
  let currentStreak = 1;

  for (let i = 1; i < activeDays.length; i++) {
    const previous = new Date(activeDays[i - 1]);
    const current = new Date(activeDays[i]);

    const difference = (current - previous) / (1000 * 60 * 60 * 24);

    if (difference === 1) {
      currentStreak++;
      longestStreak = Math.max(longestStreak, currentStreak);
    } else {
      currentStreak = 1;
    }
  }

  const today = new Date();
  const todayString = today.toISOString().split("T")[0];

  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);
  const yesterdayString = yesterday.toISOString().split("T")[0];

  const lastActiveDay = activeDays[activeDays.length - 1];

  if (lastActiveDay !== todayString && lastActiveDay !== yesterdayString) {
    currentStreak = 0;
  }

  return {
    currentStreak,
    longestStreak,
  };
}

function calculateRepositoryStats(repositories) {
  const originalRepositories = repositories.filter((repo) => !repo.fork);

  const totalStars = originalRepositories.reduce(
    (total, repo) => total + repo.stargazers_count,
    0,
  );

  const totalForks = originalRepositories.reduce(
    (total, repo) => total + repo.forks_count,
    0,
  );

  const mostStarredRepository = originalRepositories.reduce(
    (mostStarred, repo) => {
      if (
        !mostStarred ||
        repo.stargazers_count > mostStarred.stargazers_count
      ) {
        return repo;
      }

      return mostStarred;
    },
    null,
  );

  const mostStarred =
    mostStarredRepository && mostStarredRepository.stargazers_count > 0
      ? {
          name: mostStarredRepository.name,
          stars: mostStarredRepository.stargazers_count,
          url: mostStarredRepository.html_url,
        }
      : null;

  return {
    totalStars,
    totalForks,
    originalRepositories: originalRepositories.length,
    mostStarredRepository: mostStarred,
  };
}

function calculateActivityStats(contributionDays) {
  const today = new Date();

  // Start of the month after the same month last year
  const startDate = new Date(
    today.getFullYear() - 1,
    today.getMonth() + 1,
    1
  );

  const filteredDays = contributionDays.filter((day) => {
    const date = new Date(day.date);
    return date >= startDate && date <= today;
  });

  const activeDays = filteredDays.filter(
    (day) => day.contributionCount > 0,
  );

  const totalContributions = filteredDays.reduce(
    (total, day) => total + day.contributionCount,
    0,
  );

  const activeDayCount = activeDays.length;

  const averageContributionsPerActiveDay =
    activeDayCount === 0
      ? 0
      : Number((totalContributions / activeDayCount).toFixed(2));

  const mostActiveDay = filteredDays.reduce((mostActive, day) => {
    if (
      !mostActive ||
      day.contributionCount > mostActive.contributionCount
    ) {
      return day;
    }

    return mostActive;
  }, null);

  const contributionsByMonth = {};

  for (const day of filteredDays) {
    const month = day.date.slice(0, 7);

    contributionsByMonth[month] =
      (contributionsByMonth[month] ?? 0) + day.contributionCount;
  }

  return {
    totalContributions,
    activeDayCount,
    averageContributionsPerActiveDay,

    mostActiveDay: mostActiveDay
      ? {
          date: mostActiveDay.date,
          contributions: mostActiveDay.contributionCount,
        }
      : null,

    contributionsByMonth,
  };
}


export function extractGithubStats(
  user,
  contributions,
  repositories,
  pinnedRepositories,
  languages,
) {
  const contributionDays = contributions.weeks.flatMap(
    (week) => week.contributionDays,
  );

  const contributionMap = Object.fromEntries(
    contributionDays.map((day) => [day.date, day.contributionCount]),
  );

  const today = new Date();

  const heatmap = Array.from({ length: 365 }, (_, index) => {
    const date = new Date(today);

    date.setDate(today.getDate() - (364 - index));

    const key = date.toISOString().split("T")[0];

    return contributionMap[key] ?? 0;
  });

  const activityStats = calculateActivityStats(contributionDays);

  const { currentStreak, longestStreak } = calculateStreaks(contributionDays);

  const repositoryStats = calculateRepositoryStats(repositories);

  // const pinnedRepositoryStats = calculateRepositoryStats(pinnedRepositories);

  return {
  profile: {
    profileUrl: user.html_url,
    username: user.login,
    publicRepos: user.public_repos,
  },

  contributions: {
    totalCommits:
      contributions.totalCommitContributions,

    totalPullRequests:
      contributions.totalPullRequestContributions,

    totalIssues:
      contributions.totalIssueContributions,

    contributedRepositories:
      contributions.totalRepositoriesWithContributedCommits,

    totalContributions:
      activityStats.totalContributions,

    activeDayCount:
      activityStats.activeDayCount,

    averageContributionsPerActiveDay:
      activityStats.averageContributionsPerActiveDay,

    currentStreak,
    longestStreak,

    mostActiveDay:
      activityStats.mostActiveDay,

    contributionsByMonth:
      activityStats.contributionsByMonth,
  },

  repositories: {
    totalStars:
      repositoryStats.totalStars,

    totalForks:
      repositoryStats.totalForks,

    originalRepositories:
      repositoryStats.originalRepositories,

    mostStarredRepository:
      repositoryStats.mostStarredRepository,

    pinnedRepositories,
  },

  languages,

  heatmap,
};
}
