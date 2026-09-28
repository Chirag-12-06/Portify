import github from "./github.api.js";

export async function getGithubRepositories(username) {
  const { data } = await github.get(`/users/${username}/repos`, {
    params: {
      per_page: 100,
      sort: "updated",
    },
  });

  return data;
}