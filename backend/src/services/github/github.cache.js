const cache = new Map();
const inFlight = new Map();

const CACHE_TTL = 10 * 60 * 1000;

export function getCachedGithubStats(username) {
  const entry = cache.get(username);

  if (!entry) {
    return null;
  }

  if (Date.now() - entry.timestamp > CACHE_TTL) {
    cache.delete(username);
    return null;
  }

  return entry.data;
}

export function setCachedGithubStats(username, data) {
  cache.set(username, {
    data,
    timestamp: Date.now(),
  });
}

export function getInFlightRequest(username) {
  return inFlight.get(username);
}

export function setInFlightRequest(username, promise) {
  inFlight.set(username, promise);
}

export function removeInFlightRequest(username) {
  inFlight.delete(username);
}