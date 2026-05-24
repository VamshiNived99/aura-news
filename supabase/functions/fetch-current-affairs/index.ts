import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

type CAItem = {
  id: string;
  title: string;
  summary: string;
  category: string;
  source: string;
  sourceUrl: string;
  pubDate: string;
  image?: string;
  tags?: string[];
};

// Curated RSS feeds covering current affairs relevant for all major Indian exams
const FEEDS: { url: string; source: string; category: string }[] = [
  // National & policy
  { url: "https://www.thehindu.com/news/national/feeder/default.rss", source: "The Hindu", category: "National" },
  { url: "https://indianexpress.com/section/india/feed/", source: "Indian Express", category: "National" },
  { url: "https://www.livemint.com/rss/politics", source: "Livemint", category: "Polity" },
  // International
  { url: "https://www.thehindu.com/news/international/feeder/default.rss", source: "The Hindu", category: "International" },
  // Economy & business
  { url: "https://www.thehindubusinessline.com/economy/feeder/default.rss", source: "BusinessLine", category: "Economy" },
  { url: "https://www.livemint.com/rss/economy", source: "Livemint", category: "Economy" },
  // Science & tech
  { url: "https://www.thehindu.com/sci-tech/science/feeder/default.rss", source: "The Hindu", category: "Science & Tech" },
  // Sports
  { url: "https://www.thehindu.com/sport/feeder/default.rss", source: "The Hindu", category: "Sports" },
  // Government / PIB
  { url: "https://news.google.com/rss/search?q=PIB+India+OR+government+scheme&hl=en-IN&gl=IN&ceid=IN:en", source: "PIB / Govt", category: "Govt Schemes" },
  // Awards & appointments (high-yield for exams)
  { url: "https://news.google.com/rss/search?q=awards+OR+appointment+India+2025&hl=en-IN&gl=IN&ceid=IN:en", source: "News", category: "Awards & Appointments" },
  // Defence
  { url: "https://news.google.com/rss/search?q=Indian+defence+OR+DRDO+OR+ISRO&hl=en-IN&gl=IN&ceid=IN:en", source: "News", category: "Defence & Space" },
];

function stripHtml(html: string): string {
  return html
    .replace(/<!\[CDATA\[(.*?)\]\]>/gs, "$1")
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}

function extractTag(xml: string, tag: string): string {
  const re = new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, "i");
  const m = xml.match(re);
  return m ? stripHtml(m[1]) : "";
}

function extractImage(xml: string): string | undefined {
  // Try multiple image patterns
  const patterns = [
    /<media:content[^>]+url=["']([^"']+)["']/i,
    /<media:thumbnail[^>]+url=["']([^"']+)["']/i,
    /<enclosure[^>]+url=["']([^"']+)["'][^>]+type=["']image/i,
    /<img[^>]+src=["']([^"']+)["']/i,
  ];
  for (const re of patterns) {
    const m = xml.match(re);
    if (m && m[1]) return m[1];
  }
  return undefined;
}

function parseRSS(xml: string, source: string, category: string): CAItem[] {
  const items: CAItem[] = [];
  const itemRegex = /<item[\s\S]*?<\/item>/gi;
  const matches = xml.match(itemRegex) || [];
  for (const raw of matches.slice(0, 12)) {
    const title = extractTag(raw, "title");
    const link = extractTag(raw, "link");
    const desc = extractTag(raw, "description") || extractTag(raw, "content:encoded");
    const date = extractTag(raw, "pubDate") || extractTag(raw, "dc:date");
    if (!title || !link) continue;
    items.push({
      id: `${source}-${link}`.slice(0, 200),
      title,
      summary: desc.slice(0, 320),
      category,
      source,
      sourceUrl: link,
      pubDate: date || new Date().toISOString(),
      image: extractImage(raw),
    });
  }
  return items;
}

async function fetchFeed(url: string, source: string, category: string): Promise<CAItem[]> {
  try {
    const res = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; CurrentAffairsBot/1.0)",
        "Accept": "application/rss+xml, application/xml, text/xml, */*",
      },
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) return [];
    const xml = await res.text();
    return parseRSS(xml, source, category);
  } catch (e) {
    console.warn(`Feed failed: ${url}`, e);
    return [];
  }
}

// In-memory cache (per edge instance)
const cache = new Map<string, { ts: number; data: CAItem[] }>();
const CACHE_TTL = 15 * 60 * 1000; // 15 minutes

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const url = new URL(req.url);
    const category = url.searchParams.get("category") || "all";
    const cacheKey = `ca:${category}`;

    const cached = cache.get(cacheKey);
    if (cached && Date.now() - cached.ts < CACHE_TTL) {
      return new Response(JSON.stringify({ items: cached.data, cached: true }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const feedsToFetch = category === "all"
      ? FEEDS
      : FEEDS.filter(f => f.category.toLowerCase() === category.toLowerCase());

    const results = await Promise.all(
      feedsToFetch.map(f => fetchFeed(f.url, f.source, f.category))
    );

    let all: CAItem[] = results.flat();

    // Deduplicate by title
    const seen = new Set<string>();
    all = all.filter(i => {
      const key = i.title.toLowerCase().slice(0, 80);
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });

    // Sort by pubDate descending
    all.sort((a, b) => {
      const da = new Date(a.pubDate).getTime() || 0;
      const db = new Date(b.pubDate).getTime() || 0;
      return db - da;
    });

    // Cap at 80
    all = all.slice(0, 80);

    cache.set(cacheKey, { ts: Date.now(), data: all });

    return new Response(JSON.stringify({ items: all, cached: false }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    return new Response(JSON.stringify({ error: msg, items: [] }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
