export function getUsernameFromUrl(url) {
  return url?.replace(/\/$/, "").split("/").pop();
}
