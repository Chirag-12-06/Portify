export function extractRepositories(repositories) {
  return repositories.map(extractRepositoryInfo);
}

export function extractRepositoryInfo(repo) {
  return {
    id: repo.id,
    name: repo.name,
    description: repo.description,
    url: repo.html_url,
    language: repo.language,
    topics: repo.topics ?? [],
    stars: repo.stargazers_count,
    forks: repo.forks_count,
    createdAt: repo.created_at,
    updatedAt: repo.updated_at,
    pushedAt: repo.pushed_at,
  };
}