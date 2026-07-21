import api from "./api";

/* ---------- Links ---------- */

export async function getSocials() {
  const { data } = await api.get("/social-links");
  return data.data;
}

/* ---------- LeetCode ---------- */

export async function getLeetCodeStats() {
  const { data } = await api.get("/social-links/leetcode");
  return data;
}

/* ---------- GitHub ---------- */

export async function getGithubStats() {
  const { data } = await api.get("/social-links/github");
  return data;
}