import { supabase } from "@/integrations/supabase/client";

const cache = new Map<string, string>();

function isGoogleNews(url: string): boolean {
  try {
    const h = new URL(url).hostname;
    return /(^|\.)(news|consent|accounts)\.google\.com$/i.test(h);
  } catch { return false; }
}

/**
 * Resolves Google News redirect URLs to the original publisher URL,
 * then opens it in a new tab. Falls back to the original URL on failure.
 * Uses noopener/noreferrer so the link doesn't load inside WebViews
 * that block embedded Google News pages.
 */
export async function openArticle(url: string): Promise<void> {
  if (!url) return;

  // Open a placeholder tab synchronously so popup blockers / WebViews
  // treat this as a user-initiated navigation.
  const win = typeof window !== "undefined"
    ? window.open("about:blank", "_blank", "noopener,noreferrer")
    : null;

  let target = url;
  try {
    if (isGoogleNews(url)) {
      if (cache.has(url)) {
        target = cache.get(url)!;
      } else {
        const { data } = await supabase.functions.invoke("resolve-article-url", {
          body: { url },
        });
        if (data?.url && !isGoogleNews(data.url)) {
          target = data.url;
          cache.set(url, target);
        }
      }
    }
  } catch (_) {
    // ignore — fall back to original url
  }

  if (win) {
    try { win.location.href = target; } catch { /* noop */ }
  } else if (typeof window !== "undefined") {
    window.open(target, "_blank", "noopener,noreferrer");
  }
}