// Client-side news cache utility
const NEWS_CACHE_TTL = 3 * 60 * 1000; // 3 minutes
const PERSIST_TTL = 6 * 60 * 60 * 1000; // 6 hours — for instant offline revisit

interface CachedNews {
  articles: any[];
  timestamp: number;
  nextPageToken: string;
}

export function getCachedNews(key: string): CachedNews | null {
  try {
    const raw = sessionStorage.getItem(`news_cache_${key}`);
    if (raw) {
      const cached: CachedNews = JSON.parse(raw);
      if (Date.now() - cached.timestamp <= NEWS_CACHE_TTL) return cached;
      sessionStorage.removeItem(`news_cache_${key}`);
    }
    // Fall back to longer-lived localStorage copy for instant open on revisit.
    const persisted = localStorage.getItem(`news_cache_${key}`);
    if (persisted) {
      const cached: CachedNews = JSON.parse(persisted);
      if (Date.now() - cached.timestamp <= PERSIST_TTL) return cached;
      localStorage.removeItem(`news_cache_${key}`);
    }
    return null;
  } catch {
    return null;
  }
}

export function setCachedNews(key: string, articles: any[], nextPageToken: string) {
  try {
    const data: CachedNews = { articles, timestamp: Date.now(), nextPageToken };
    sessionStorage.setItem(`news_cache_${key}`, JSON.stringify(data));
    // Persist a trimmed copy for instant revisit (cap to 30 articles to stay small).
    const trimmed: CachedNews = { ...data, articles: articles.slice(0, 30) };
    localStorage.setItem(`news_cache_${key}`, JSON.stringify(trimmed));
  } catch {
    // sessionStorage full or unavailable
  }
}
