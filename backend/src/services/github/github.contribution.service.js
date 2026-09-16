import github from "./github.api.js";

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

export async function getGithubContributions(username) {
  const { data } = await github.post(
    "/graphql",
    {
      query: CONTRIBUTION_QUERY,
      variables: { username },
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  if (data.errors) {
    throw new Error("Failed to fetch GitHub contributions");
  }

  return data.data.user.contributionsCollection.contributionCalendar;
}