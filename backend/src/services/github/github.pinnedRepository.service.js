import github from "./github.api.js";

export async function getPinnedRepositories(username) {
  const query = `
    query ($username: String!) {
      user(login: $username) {
        pinnedItems(first: 6, types: REPOSITORY) {
          nodes {
            ... on Repository {
              name
              description
              url
              primaryLanguage {
                name
              }
              stargazerCount
              forkCount
            }
          }
        }
      }
    }
  `;

  const { data } = await github.post("/graphql", {
    query,
    variables: {
      username,
    },
  });

  return data.data.user.pinnedItems.nodes.map((repo) => ({
    name: repo.name,
    description: repo.description,
    url: repo.url,
  }));
}