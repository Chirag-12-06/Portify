import github from "./github.api.js";

export async function getGithubProfile(username) {
  const { data } = await github.get(`/users/${username}`);

  return data;
}
