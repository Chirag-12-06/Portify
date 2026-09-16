export function extractGithubStats(user, contributionCalendar) {
  const contributionDays =
    contributionCalendar.weeks.flatMap(
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

  const today = new Date();

  const heatmap = Array.from({ length: 365 }, (_, index) => {
    const date = new Date(today);

    date.setDate(today.getDate() - (364 - index));

    const key = date.toISOString().split("T")[0];

    return contributionMap[key]?.count ?? 0;
  });

  return {
    profileUrl: user.html_url,
    username: user.login,
    publicRepos: user.public_repos,
    heatmap,
  };
}