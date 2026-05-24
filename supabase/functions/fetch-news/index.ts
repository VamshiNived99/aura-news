import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

type NewsArticle = {
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  source: { name: string };
  category: string;
  language: string;
  // UI-ready enrichment (added by enrichArticles)
  id?: string;
  headline?: string;
  summary?: string;
  tts_text?: string;
  duration?: number;
  location?: string;
};

type PaginationToken = {
  newsDataPage?: string;
  newsApiPage?: number;
};

type ProviderResult = {
  articles: NewsArticle[];
  nextPage?: string;
  hasMore?: boolean;
};

const INDIA_LANGUAGE_CONFIG: Record<string, { hl: string; gl: string; ceid: string }> = {
  en: { hl: "en-IN", gl: "IN", ceid: "IN:en" },
  hi: { hl: "hi", gl: "IN", ceid: "IN:hi" },
  te: { hl: "te", gl: "IN", ceid: "IN:te" },
  ta: { hl: "ta", gl: "IN", ceid: "IN:ta" },
  kn: { hl: "kn", gl: "IN", ceid: "IN:kn" },
  ml: { hl: "ml", gl: "IN", ceid: "IN:ml" },
  mr: { hl: "mr", gl: "IN", ceid: "IN:mr" },
  bn: { hl: "bn", gl: "IN", ceid: "IN:bn" },
  gu: { hl: "gu", gl: "IN", ceid: "IN:gu" },
};

const WORLD_CONFIG = { hl: "en-US", gl: "US", ceid: "US:en" };
const PAGE_SIZE = 20;
const FETCH_TIMEOUT = 4000; // 4s timeout per fetch

const BLOCKED_DOMAINS = [
  "google-analytics.com", "googletagmanager.com", "doubleclick.net",
  "googlesyndication.com", "googleadservices.com", "gstatic.com",
  "googleapis.com", "google.com", "googleusercontent.com",
  "news.google.com", "consent.google.com", "accounts.google.com",
  "play.google.com", "facebook.com", "twitter.com", "t.co",
];

const REGIONAL_RSS_FEEDS: Record<string, string[]> = {
  te: ["https://telugu.oneindia.com/rss/telugu-news.xml", "https://telugu.samayam.com/rssfeedstopstories.cms"],
  hi: ["https://navbharattimes.indiatimes.com/rssfeedstopstories.cms", "https://hindi.oneindia.com/rss/hindi-news.xml"],
  ta: ["https://tamil.oneindia.com/rss/tamil-news.xml", "https://tamilsamayam.com/rssfeedstopstories.cms"],
  kn: ["https://kannada.oneindia.com/rss/kannada-news.xml", "https://vijaykarnataka.com/rssfeedstopstories.cms"],
  ml: ["https://malayalam.oneindia.com/rss/malayalam-news.xml", "https://malayalam.samayam.com/rssfeedstopstories.cms"],
  mr: ["https://marathi.abplive.com/rss", "https://maharashtratimes.com/rssfeedstopstories.cms"],
  bn: ["https://bengali.oneindia.com/rss/bengali-news.xml", "https://eisamay.com/rssfeedstopstories.cms"],
  gu: ["https://gujarati.oneindia.com/rss/gujarati-news.xml", "https://navgujaratsamay.com/rssfeedstopstories.cms"],
};

const TRUSTED_RSS_FEEDS: Record<string, Record<string, string[]>> = {
  in: {
    all: ["https://www.thehindu.com/news/national/feeder/default.rss", "https://indianexpress.com/section/india/feed/"],
    technology: ["https://www.thehindu.com/sci-tech/technology/feeder/default.rss", "https://indianexpress.com/section/technology/feed/"],
    sports: ["https://www.thehindu.com/sport/feeder/default.rss"],
    business: ["https://www.thehindubusinessline.com/markets/feeder/default.rss"],
    economy: ["https://www.thehindubusinessline.com/economy/feeder/default.rss"],
  },
  worldwide: {
    all: ["https://feeds.bbci.co.uk/news/world/rss.xml"],
    technology: ["https://feeds.bbci.co.uk/news/technology/rss.xml"],
    sports: ["https://feeds.bbci.co.uk/sport/rss.xml?edition=uk"],
    business: ["https://feeds.bbci.co.uk/news/business/rss.xml"],
  },
};

// Fast fetch with timeout
async function fetchWithTimeout(url: string, options: RequestInit = {}, timeout = FETCH_TIMEOUT): Promise<Response> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeout);
  try {
    const response = await fetch(url, { ...options, signal: controller.signal });
    clearTimeout(timer);
    return response;
  } catch (e) {
    clearTimeout(timer);
    throw e;
  }
}

function decodePaginationToken(rawToken: string | undefined): PaginationToken {
  if (!rawToken) return { newsApiPage: 1 };
  try {
    if (rawToken.startsWith("{")) return JSON.parse(rawToken);
    const decoded = atob(rawToken);
    const parsed = JSON.parse(decoded);
    return { newsDataPage: parsed.newsDataPage, newsApiPage: typeof parsed.newsApiPage === "number" ? parsed.newsApiPage : 1 };
  } catch { return { newsDataPage: rawToken, newsApiPage: 1 }; }
}

function encodePaginationToken(token: PaginationToken): string {
  if (!token.newsDataPage && !token.newsApiPage) return "";
  return btoa(JSON.stringify(token));
}

function safeDate(input: string | undefined): string {
  if (!input) return new Date().toISOString();
  const parsed = new Date(input);
  return Number.isNaN(parsed.getTime()) ? new Date().toISOString() : parsed.toISOString();
}

function getHostname(url: string): string {
  try { return new URL(url).hostname.toLowerCase(); } catch { return ""; }
}

function isBlockedUrl(url: string): boolean {
  const host = getHostname(url);
  if (!host) return true;
  return BLOCKED_DOMAINS.some(d => host === d || host.endsWith(`.${d}`));
}

function isValidArticleUrl(url: string): boolean {
  if (!url || url.length < 15) return false;
  const host = getHostname(url);
  if (!host || host.length < 4) return false;
  if (isBlockedUrl(url)) return false;
  if (host.includes("w3.org") || host.includes("schema.org") || host.includes("xmlns.com")) return false;
  try {
    const u = new URL(url);
    if (u.pathname.length <= 1 && !u.search) return false;
    if (/\.(js|css|png|jpg|gif|svg|ico|woff|ttf|xml|xsd)$/i.test(u.pathname)) return false;
    return true;
  } catch { return false; }
}

function normalizeUrl(rawUrl: string): string {
  try {
    const url = new URL(rawUrl);
    ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "oc", "ved", "gaa_at", "gaa_ts", "hl", "gl", "ceid"].forEach(p => url.searchParams.delete(p));
    if (url.pathname.length > 1 && url.pathname.endsWith("/")) url.pathname = url.pathname.slice(0, -1);
    return url.toString();
  } catch { return rawUrl; }
}

function cleanHtml(text: string | undefined): string {
  if (!text) return "";
  return text
    .replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&nbsp;/g, " ")
    .replace(/&#x27;/g, "'").replace(/&#x2F;/g, "/").replace(/&#\d+;/g, "")
    .replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

function extractTag(content: string, tag: string): string {
  const cdataRegex = new RegExp(`<${tag}[^>]*><!\\[CDATA\\[([\\s\\S]*?)\\]\\]><\\/${tag}>`, "i");
  const simpleRegex = new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, "i");
  const cdataMatch = content.match(cdataRegex);
  if (cdataMatch?.[1]) return cdataMatch[1].trim();
  const simpleMatch = content.match(simpleRegex);
  return simpleMatch?.[1]?.trim() || "";
}

function extractImageFromHtml(html: string): string {
  if (!html) return "";
  const imgMatch = html.match(/<img[^>]+src=["']([^"']+)["'][^>]*>/i);
  return imgMatch?.[1] || "";
}

function parseRSS(xml: string): Array<{ title: string; link: string; pubDate: string; description: string; imageUrl: string; source: string }> {
  const articles: Array<{ title: string; link: string; pubDate: string; description: string; imageUrl: string; source: string }> = [];
  const itemRegex = /<item>([\s\S]*?)<\/item>/g;
  let match: RegExpExecArray | null;
  while ((match = itemRegex.exec(xml)) !== null) {
    const itemContent = match[1];
    const title = cleanHtml(extractTag(itemContent, "title"));
    const link = extractTag(itemContent, "link");
    const pubDate = extractTag(itemContent, "pubDate");
    const rawDescription = extractTag(itemContent, "description");
    const source = cleanHtml(extractTag(itemContent, "source")) || "";
    if (!title || !link) continue;
    articles.push({ title, link, pubDate, description: cleanHtml(rawDescription), imageUrl: extractImageFromHtml(rawDescription), source });
  }
  return articles;
}

function categorizeArticle(title: string): string {
  const text = title.toLowerCase();
  if (["cricket", "sport", "match", "ipl", "football"].some(k => text.includes(k))) return "Sports";
  if (["election", "minister", "government", "bjp", "congress", "modi", "parliament"].some(k => text.includes(k))) return "Politics";
  if (["economy", "market", "stock", "rupee", "rbi", "sensex"].some(k => text.includes(k))) return "Economy";
  if (["tech", "ai", "digital", "startup", "google", "apple", "microsoft"].some(k => text.includes(k))) return "Technology";
  if (["film", "bollywood", "hollywood", "movie", "actor"].some(k => text.includes(k))) return "Entertainment";
  return "General";
}

// Pull the most meaningful keywords from the title for image search
function extractKeywords(title: string, max = 3): string[] {
  if (!title) return ["news"];
  const stop = new Set(["the","a","an","and","or","of","to","in","on","for","with","at","by","from","as","is","are","was","were","be","been","being","this","that","these","those","it","its","we","you","i","he","she","they","them","his","her","their","our","your","my","but","not","no","so","if","than","then","over","after","before","into","about","up","down","new","says","said","will","can","may","has","have","had","get","got","one","two","three","amid","among","while","during","since","until","because","via","also","just","still","more","most","very","much","such","like","make","made","take","took","give","gave","go","goes","went","come","came","know","known","see","seen","look","looks","find","found","tell","told","ask","asked","work","works","worked","call","called","try","tries","tried","need","needs","want","wants","use","used","show","shows","showed","year","years","day","days","time","times","week","weeks","month","months","today","yesterday","tomorrow","report","reports","reported","update","updates"]);
  const words = title
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .split(/\s+/)
    .filter(w => w.length > 2 && !stop.has(w.toLowerCase()));
  // Proper nouns first (capitalized), then other meaningful words
  const proper = words.filter(w => /^[A-Z]/.test(w));
  const others = words.filter(w => !/^[A-Z]/.test(w));
  const ordered = [...proper, ...others];
  const seen = new Set<string>();
  const result: string[] = [];
  for (const w of ordered) {
    const lw = w.toLowerCase();
    if (!seen.has(lw)) { seen.add(lw); result.push(lw); }
    if (result.length >= max) break;
  }
  return result.length ? result : ["news"];
}

// Curated free-to-use images per category (Pexels CDN — direct image URLs, no API key, always load)
const CATEGORY_IMAGE_BANK: Record<string, string[]> = {
  Sports: [
    "https://images.pexels.com/photos/274422/pexels-photo-274422.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/2294400/pexels-photo-2294400.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/3621104/pexels-photo-3621104.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/46798/the-ball-stadion-football-the-pitch-46798.jpeg?auto=compress&cs=tinysrgb&w=800",
  ],
  Politics: [
    "https://images.pexels.com/photos/1550337/pexels-photo-1550337.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/8828687/pexels-photo-8828687.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/6077326/pexels-photo-6077326.jpeg?auto=compress&cs=tinysrgb&w=800",
  ],
  Economy: [
    "https://images.pexels.com/photos/210607/pexels-photo-210607.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/259027/pexels-photo-259027.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/3943723/pexels-photo-3943723.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/534216/pexels-photo-534216.jpeg?auto=compress&cs=tinysrgb&w=800",
  ],
  Technology: [
    "https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/2599244/pexels-photo-2599244.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/735911/pexels-photo-735911.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg?auto=compress&cs=tinysrgb&w=800",
  ],
  Entertainment: [
    "https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/799443/pexels-photo-799443.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/2240763/pexels-photo-2240763.jpeg?auto=compress&cs=tinysrgb&w=800",
  ],
  General: [
    "https://images.pexels.com/photos/518543/pexels-photo-518543.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/1369476/pexels-photo-1369476.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/97050/pexels-photo-97050.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/3756879/pexels-photo-3756879.jpeg?auto=compress&cs=tinysrgb&w=800",
  ],
};

// Stable hash so the same article keeps the same image
function hashString(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = ((h << 5) - h + s.charCodeAt(i)) | 0;
  return Math.abs(h);
}

function getCategoryFallback(title: string, index: number): string {
  const category = categorizeArticle(title);
  const bank = CATEGORY_IMAGE_BANK[category] || CATEGORY_IMAGE_BANK.General;
  const idx = hashString(title || String(index)) % bank.length;
  return bank[idx];
}

// In-memory image cache (per cold start) — keyed by query
const imageCache = new Map<string, string>();

// ===== UI-READY ENRICHMENT HELPERS =====

// Stable article id (hash of normalized url)
function makeArticleId(url: string): string {
  let h = 0;
  for (let i = 0; i < url.length; i++) h = ((h << 5) - h + url.charCodeAt(i)) | 0;
  return `art_${Math.abs(h).toString(36)}`;
}

// Strip publisher / source mentions that pollute reel UI ("- The Hindu",
// "Eenadu | ...", "PrabhaNews:", " via NDTV", domain suffixes, etc.).
function stripSourceFromTitle(title: string): string {
  if (!title) return "";
  let t = title.replace(/\s+/g, " ").trim();
  // Trailing " - Source" / " | Source" / " — Source" / " · Source"
  t = t.replace(/\s*[-–—|·•:]\s*[A-Za-z][A-Za-z0-9.&' ]{2,40}$/u, "").trim();
  // " via Source" / " (Source)"
  t = t.replace(/\s+via\s+[A-Za-z][A-Za-z0-9 .&]{2,30}$/i, "").trim();
  t = t.replace(/\s*\(([A-Z][a-zA-Z0-9 .&]{2,30})\)\s*$/u, "").trim();
  // Drop trailing ".com" tokens
  t = t.replace(/\s+\S*\.(com|in|org|net)\b\.?$/i, "").trim();
  // Leading "SOURCE | " / "SOURCE: " — keep known city prefixes only.
  t = t.replace(/^([A-Za-z][A-Za-z0-9 .&]{1,30})\s*[:|]\s+/u, (m, p1) => {
    const head = String(p1).trim();
    if (KNOWN_LOCATIONS.some(c => c.toLowerCase() === head.toLowerCase())) return `${head}: `;
    return "";
  });
  return t.trim();
}

// Trim a headline to ~12-14 words, keeping it natural.
function trimHeadline(title: string, maxWords = 14): string {
  const clean = stripSourceFromTitle(title);
  if (!clean) return "";
  const words = clean.split(" ");
  if (words.length <= maxWords) return clean;
  return words.slice(0, maxWords).join(" ").replace(/[,;:.\-—–]+$/, "") + "…";
}

// Rich summary: aim for ~100+ words of readable, deduplicated context.
// We greedily concatenate sentences from the description, drop ones that just
// repeat the headline, and stop once we have enough material.
function buildSummary(description: string, title: string): string {
  const desc = (description || "").replace(/\s+/g, " ").trim();
  const head = (title || "").replace(/\s+/g, " ").trim();
  const src = desc || head;
  if (!src) return "";

  const headKey = head.toLowerCase().replace(/[^a-z0-9 ]+/g, " ").replace(/\s+/g, " ").trim();
  const sentences = src
    .split(/(?<=[.!?।])\s+/)
    .map(s => s.trim())
    .filter(Boolean);

  const seen = new Set<string>();
  const picked: string[] = [];
  let words = 0;
  // Aim for ~100–140 words of REAL source content. AI fallback below
  // handles cases where the source is too thin.
  const MAX_WORDS = 140;

  for (const s of sentences) {
    const key = s.toLowerCase().replace(/[^a-z0-9 ]+/g, " ").replace(/\s+/g, " ").trim();
    if (!key || seen.has(key)) continue;
    // Skip sentences that are essentially the headline.
    if (headKey && (key === headKey || (key.length > 20 && headKey.includes(key)) || (key.length > 20 && key.includes(headKey)))) continue;
    seen.add(key);
    // Drop sentences that are themselves source attributions.
    const isAttribution = /\b(eenadu|prabhanews|ndtv|times of india|the hindu|indian express|news18|abp|zee news|aaj tak)\b/i.test(s)
      || /\b(reports|reported|according to|as per)\s+[A-Z]/.test(s);
    if (isAttribution) continue;
    picked.push(stripSourceFromTitle(s));
    words += s.split(/\s+/).filter(Boolean).length;
    if (words >= MAX_WORDS) break;
  }

  let out = picked.join(" ").trim();

  // Trim to MAX_WORDS without breaking mid-sentence when possible.
  if (out.split(/\s+/).length > MAX_WORDS) {
    const trimmed = out.split(/\s+/).slice(0, MAX_WORDS).join(" ");
    out = trimmed.replace(/[,;:\-—–]+\S*$/, "").trim();
    if (!/[.!?।]$/.test(out)) out += "…";
  }
  return out;
}

// Build TTS-ready text: clean noise, expand a few abbreviations, add pause markers.
// Mirrors the client-side cleaner so playback feels human even before client cleanup.
function buildTtsText(title: string, description: string): string {
  const raw = [title, description].filter(Boolean).join(". ");
  if (!raw) return "";
  let t = raw;
  t = t.replace(/https?:\/\/\S+/g, " ").replace(/www\.\S+/g, " ");
  t = t.replace(/<[^>]+>/g, " ").replace(/&[a-z]+;/gi, " ");
  t = t.replace(/[“”]/g, '"').replace(/[‘’]/g, "'").replace(/[—–]/g, ", ");
  const ABBR: Array<[RegExp, string]> = [
    [/\bPM\b/g, "Prime Minister"],
    [/\bCM\b/g, "Chief Minister"],
    [/\bUS\b/g, "United States"],
    [/\bUK\b/g, "United Kingdom"],
    [/\bRs\.?\s*/g, "rupees "],
    [/%/g, " percent"],
    [/&/g, " and "],
  ];
  for (const [re, sub] of ABBR) t = t.replace(re, sub);
  // Pause markers
  t = t.replace(/,\s*/g, ", ");
  t = t.replace(/([.!?।])\s+/g, "$1 … ");
  t = t.replace(/(?:\.\s*){2,}/g, ". ");
  t = t.replace(/\s+/g, " ").trim();
  return t;
}

// Estimate speech duration in seconds (~165 wpm for news pacing).
function estimateDurationSec(text: string): number {
  const words = (text || "").trim().split(/\s+/).filter(Boolean).length;
  if (!words) return 0;
  return Math.max(4, Math.round((words / 165) * 60));
}

// Extract a likely location label from the headline (Indian city heuristics).
const KNOWN_LOCATIONS = [
  "Delhi","Mumbai","Bengaluru","Bangalore","Chennai","Hyderabad","Kolkata","Pune",
  "Ahmedabad","Jaipur","Lucknow","Kochi","Bhopal","Patna","Chandigarh","Surat",
  "Indore","Nagpur","Visakhapatnam","Vijayawada","Coimbatore","Madurai","Mysuru",
  "Thiruvananthapuram","Kanpur","Goa","Noida","Gurugram","Gurgaon",
];
function extractLocation(title: string): string {
  if (!title) return "";
  for (const city of KNOWN_LOCATIONS) {
    const re = new RegExp(`\\b${city}\\b`, "i");
    if (re.test(title)) return city;
  }
  // "City: ..." pattern
  const m = title.match(/^([A-Z][a-zA-Z]{2,15})\s*:\s/);
  if (m && !["The","India","World","News","Latest","Breaking"].includes(m[1])) return m[1];
  return "";
}

// Scrape og:image AND og:description / first long paragraphs from the article
// URL so we can both (a) fall back to a real publisher image and (b) enrich
// short descriptions into proper 100-word summaries.
type PageMeta = { image: string | null; description: string | null };
const pageMetaCache = new Map<string, PageMeta>();
async function fetchPageMeta(articleUrl: string): Promise<PageMeta> {
  if (!articleUrl || !isValidArticleUrl(articleUrl)) return { image: null, description: null };
  const cached = pageMetaCache.get(articleUrl);
  if (cached) return cached;
  try {
    const res = await fetchWithTimeout(articleUrl, {
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; AuraNews/1.0)",
        "Accept": "text/html,application/xhtml+xml",
      },
    }, 3000);
    if (!res.ok) return { image: null, description: null };
    // Read up to 256KB so we also capture early body <p> tags for summary fallback.
    const reader = res.body?.getReader();
    if (!reader) return { image: null, description: null };
    let html = "";
    let read = 0;
    const decoder = new TextDecoder();
    while (read < 256 * 1024) {
      const { value, done } = await reader.read();
      if (done) break;
      html += decoder.decode(value, { stream: true });
      read += value.byteLength;
    }
    try { reader.cancel(); } catch {}
    const ogImg =
      html.match(/<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/i)?.[1] ||
      html.match(/<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:image["']/i)?.[1] ||
      html.match(/<meta[^>]+name=["']twitter:image["'][^>]+content=["']([^"']+)["']/i)?.[1] ||
      null;
    const image = ogImg ? (ogImg.startsWith("http") ? ogImg : new URL(ogImg, articleUrl).toString()) : null;
    const ogDesc =
      html.match(/<meta[^>]+property=["']og:description["'][^>]+content=["']([^"']+)["']/i)?.[1] ||
      html.match(/<meta[^>]+name=["']twitter:description["'][^>]+content=["']([^"']+)["']/i)?.[1] ||
      html.match(/<meta[^>]+name=["']description["'][^>]+content=["']([^"']+)["']/i)?.[1] ||
      "";
    // Pull the first few sufficiently long <p> blocks from article body.
    const paragraphs: string[] = [];
    const pRegex = /<p[^>]*>([\s\S]*?)<\/p>/gi;
    let m: RegExpExecArray | null;
    while ((m = pRegex.exec(html)) && paragraphs.length < 6) {
      const txt = cleanHtml(m[1]);
      if (txt && txt.split(/\s+/).length >= 12) paragraphs.push(txt);
    }
    const bodyText = paragraphs.join(" ").trim();
    const description = [cleanHtml(ogDesc), bodyText].filter(Boolean).join(" ").trim() || null;
    const meta: PageMeta = { image, description };
    pageMetaCache.set(articleUrl, meta);
    return meta;
  } catch {
    return { image: null, description: null };
  }
}

async function enrichArticles(articles: NewsArticle[]): Promise<NewsArticle[]> {
  // Scrape og:image + og:description / body paragraphs for any article
  // that either lacks a usable image OR has a short description (<100 words).
  // This is what turns 1-sentence RSS blurbs into proper 100-word reel summaries.
  const wordCount = (s: string) => (s || "").trim().split(/\s+/).filter(Boolean).length;
  const needsMeta = articles
    .map((a, i) => ({ a, i }))
    .filter(({ a }) => {
      const noImg = !a.urlToImage || a.urlToImage.includes("pexels.com");
      const shortDesc = wordCount(a.description) < 100;
      // Skip Google News redirect URLs — they can't be scraped directly.
      const isGoogleRedirect = /news\.google\.com/i.test(a.url || "");
      return (noImg || shortDesc) && !isGoogleRedirect;
    })
    .slice(0, 20);
  await Promise.all(
    needsMeta.map(async ({ a }) => {
      const meta = await fetchPageMeta(a.url);
      if (meta.image && (!a.urlToImage || a.urlToImage.includes("pexels.com"))) {
        a.urlToImage = meta.image;
      }
      if (meta.description && wordCount(a.description) < wordCount(meta.description)) {
        // Merge: keep original lead, append richer body text for buildSummary().
        a.description = `${a.description ? a.description + " " : ""}${meta.description}`.trim();
      }
    }),
  );

  return articles.map((a) => {
    const headline = trimHeadline(a.title, 14);
    const summary = buildSummary(a.description, a.title);
    const tts_text = buildTtsText(a.title, a.description);
    const duration = estimateDurationSec(tts_text);
    const location = extractLocation(a.title);
    return {
      ...a,
      id: makeArticleId(a.url),
      headline,
      summary,
      tts_text,
      duration,
      location,
    };
  });
}

// ------------------------------------------------------------------
// AI-powered summary expansion (Lovable AI Gateway).
// Used ONLY when scraping + source description still leave us with a
// thin (<100 word) summary. Rewrites into a 100–140 word editorial
// paragraph in the article's own language. Falls back silently if the
// gateway is unavailable so the feed never breaks.
// ------------------------------------------------------------------
const LANG_NAME: Record<string, string> = {
  en: "English", hi: "Hindi", te: "Telugu", ta: "Tamil", kn: "Kannada",
  ml: "Malayalam", mr: "Marathi", bn: "Bengali", gu: "Gujarati", pa: "Punjabi",
  ur: "Urdu", or: "Odia",
};

async function aiExpandSummary(
  title: string,
  description: string,
  language: string,
): Promise<string | null> {
  const apiKey = Deno.env.get("LOVABLE_API_KEY");
  if (!apiKey) return null;
  const langName = LANG_NAME[language] || "English";
  const src = (description || "").trim();
  const system = `You are an Indian news editor writing crisp, factual reel summaries in ${langName}. Output ONLY the summary paragraph — no preface, no quotes, no markdown, no source attribution.`;
  const user = [
    `Write a single coherent paragraph of 100 to 140 words in ${langName} that explains the news story.`,
    `Cover: what happened, where, who is involved, why it matters, and what may happen next.`,
    `Do NOT repeat the headline verbatim. Do NOT invent facts not implied by the source. No filler like "more details awaited" or "sources said".`,
    ``,
    `HEADLINE: ${title}`,
    `SOURCE NOTES: ${src || "(none — infer cautiously from the headline only, stay factual, no speculation)"}`,
  ].join("\n");

  try {
    const res = await fetchWithTimeout(
      "https://ai.gateway.lovable.dev/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "google/gemini-2.5-flash-lite",
          messages: [
            { role: "system", content: system },
            { role: "user", content: user },
          ],
          temperature: 0.4,
        }),
      },
      6000,
    );
    if (!res.ok) return null;
    const data = await res.json().catch(() => null);
    const text: string | undefined = data?.choices?.[0]?.message?.content;
    if (!text) return null;
    const cleaned = text.replace(/^["'`\s]+|["'`\s]+$/g, "").replace(/\s+/g, " ").trim();
    const wc = cleaned.split(/\s+/).filter(Boolean).length;
    if (wc < 80) return null;
    return cleaned;
  } catch {
    return null;
  }
}

// Run AI expansion in parallel for any article whose summary is still
// below 100 words after scraping. Capped concurrency to control cost.
async function aiBackfillWeakSummaries(
  articles: NewsArticle[],
  language: string,
  maxCalls = 12,
): Promise<void> {
  const wc = (s: string) => (s || "").trim().split(/\s+/).filter(Boolean).length;
  const weak = articles
    .map((a, i) => ({ a, i }))
    .filter(({ a }) => wc(a.summary || "") < 100)
    .slice(0, maxCalls);
  if (!weak.length) return;
  await Promise.all(
    weak.map(async ({ a }) => {
      const expanded = await aiExpandSummary(a.title, a.description || a.summary || "", language);
      if (expanded && wc(expanded) >= 100) {
        a.summary = expanded;
        // Refresh TTS + duration so audio matches the new paragraph.
        a.tts_text = buildTtsText(a.title, expanded);
        a.duration = estimateDurationSec(a.tts_text);
      }
    }),
  );
}

// Fetch a relevant image from Wikipedia (page summary thumbnails — high quality, on-topic)
async function fetchWikipediaImage(query: string): Promise<string | null> {
  if (!query) return null;
  const cacheKey = `wiki:${query.toLowerCase()}`;
  if (imageCache.has(cacheKey)) return imageCache.get(cacheKey)!;
  try {
    // Step 1: search for the most relevant page title
    const searchUrl = `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(query)}&srlimit=1&format=json&origin=*`;
    const searchRes = await fetchWithTimeout(searchUrl, { headers: { "User-Agent": "AuraNews/1.0" } }, 2000);
    if (!searchRes.ok) return null;
    const searchData = await searchRes.json();
    const pageTitle = searchData?.query?.search?.[0]?.title;
    if (!pageTitle) return null;

    // Step 2: get page summary (includes thumbnail/originalimage)
    const summaryUrl = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(pageTitle)}`;
    const sumRes = await fetchWithTimeout(summaryUrl, { headers: { "User-Agent": "AuraNews/1.0" } }, 2000);
    if (!sumRes.ok) return null;
    const sumData = await sumRes.json();
    const img = sumData?.originalimage?.source || sumData?.thumbnail?.source || null;
    if (img) imageCache.set(cacheKey, img);
    return img;
  } catch { return null; }
}

// Fetch from Openverse as secondary source (Wikimedia/Flickr CC)
async function fetchOpenverseImage(query: string): Promise<string | null> {
  if (!query) return null;
  const cacheKey = `ov:${query.toLowerCase()}`;
  if (imageCache.has(cacheKey)) return imageCache.get(cacheKey)!;
  try {
    const url = `https://api.openverse.org/v1/images/?q=${encodeURIComponent(query)}&page_size=3&mature=false`;
    const res = await fetchWithTimeout(url, { headers: { "User-Agent": "AuraNews/1.0" } }, 2000);
    if (!res.ok) return null;
    const data = await res.json();
    const results = Array.isArray(data?.results) ? data.results : [];
    const pick = results.find((r: any) => r?.thumbnail || r?.url);
    const img = pick?.thumbnail || pick?.url || null;
    if (img) imageCache.set(cacheKey, img);
    return img;
  } catch { return null; }
}

// Resolve image: try Wikipedia (best for proper-noun news topics), then Openverse, then category fallback
async function resolveImageForArticle(title: string, index: number): Promise<string> {
  const keywords = extractKeywords(title, 3);
  // Build queries from most specific to most general
  const queries: string[] = [];
  if (keywords.length >= 2) queries.push(keywords.slice(0, 2).join(" "));
  if (keywords[0]) queries.push(keywords[0]);
  if (keywords.length >= 3) queries.push(keywords.join(" "));

  for (const q of queries) {
    const wiki = await fetchWikipediaImage(q);
    if (wiki) return wiki;
  }
  for (const q of queries) {
    const ov = await fetchOpenverseImage(q);
    if (ov) return ov;
  }
  return getCategoryFallback(title, index);
}

// Synchronous helper retained for inline defaults; real resolution happens later
function getImageForArticle(title: string, index: number): string {
  return getCategoryFallback(title, index);
}

// ===== FAST DATA SOURCES (no URL resolution) =====

async function fetchFromNewsData(language: string, country: string, category: string, nextPageToken?: string): Promise<ProviderResult> {
  const NEWSDATA_API_KEY = Deno.env.get("NEWSDATA_API_KEY");
  if (!NEWSDATA_API_KEY) return { articles: [] };

  const params = new URLSearchParams({ apikey: NEWSDATA_API_KEY, language, size: "10" });
  if (country !== "worldwide") params.set("country", "in");
  if (category !== "all") params.set("category", category === "economy" ? "business" : category);
  if (nextPageToken) params.set("page", nextPageToken);

  try {
    const response = await fetchWithTimeout(`https://newsdata.io/api/1/news?${params.toString()}`);
    if (!response.ok) return { articles: [] };

    const data = await response.json();
    const items = Array.isArray(data?.results) ? data.results : [];

    const articles: NewsArticle[] = items
      .filter((item: any) => item?.title && item?.link && isValidArticleUrl(item.link))
      .map((item: any, index: number) => ({
        title: cleanHtml(item.title),
        description: cleanHtml(item.description) || cleanHtml(item.title),
        url: normalizeUrl(item.link),
        urlToImage: item.image_url || getImageForArticle(item.title, index),
        publishedAt: safeDate(item.pubDate),
        source: { name: item.source_name || item.source_id || "NewsData" },
        category: item.category?.[0] ? String(item.category[0]).replace(/^./, s => s.toUpperCase()) : categorizeArticle(item.title),
        language,
      }));

    return { articles, nextPage: typeof data?.nextPage === "string" ? data.nextPage : undefined };
  } catch (e) {
    console.warn("[fetch-news] NewsData error", e);
    return { articles: [] };
  }
}

async function fetchFromNewsApi(language: string, country: string, category: string, page = 1): Promise<ProviderResult> {
  const NEWS_API_KEY = Deno.env.get("NEWS_API_KEY");
  if (!NEWS_API_KEY) return { articles: [] };

  const mappedCategory = category === "economy" ? "business" : category;
  let endpoint = "";

  if (country === "worldwide") {
    const query = mappedCategory === "all" ? "world news" : `${mappedCategory} news`;
    const params = new URLSearchParams({ q: query, language: "en", sortBy: "publishedAt", pageSize: String(PAGE_SIZE), page: String(page) });
    endpoint = `https://newsapi.org/v2/everything?${params.toString()}`;
  } else {
    const params = new URLSearchParams({ country: "in", pageSize: String(PAGE_SIZE), page: String(page) });
    if (mappedCategory !== "all") params.set("category", mappedCategory);
    endpoint = `https://newsapi.org/v2/top-headlines?${params.toString()}`;
  }

  try {
    const response = await fetchWithTimeout(endpoint, { headers: { "X-Api-Key": NEWS_API_KEY } });
    if (!response.ok) return { articles: [] };

    const data = await response.json();
    const items = Array.isArray(data?.articles) ? data.articles : [];

    const articles: NewsArticle[] = items
      .filter((item: any) => item?.title && item?.url && isValidArticleUrl(item.url))
      .map((item: any, index: number) => ({
        title: cleanHtml(item.title),
        description: cleanHtml(item.description) || cleanHtml(item.title),
        url: normalizeUrl(item.url),
        urlToImage: item.urlToImage || getImageForArticle(item.title, index),
        publishedAt: safeDate(item.publishedAt),
        source: { name: item.source?.name || "NewsAPI" },
        category: mappedCategory === "all" ? categorizeArticle(item.title) : mappedCategory.replace(/^./, s => s.toUpperCase()),
        language: "en",
      }));

    const totalResults = typeof data?.totalResults === "number" ? data.totalResults : 0;
    return { articles, hasMore: page * PAGE_SIZE < totalResults };
  } catch (e) {
    console.warn("[fetch-news] NewsAPI error", e);
    return { articles: [] };
  }
}

async function fetchFromTrustedRss(language: string, country: string, category: string): Promise<ProviderResult> {
  const countryKey = country === "worldwide" ? "worldwide" : "in";
  const categoryFeeds = TRUSTED_RSS_FEEDS[countryKey]?.[category] || [];
  const feeds = categoryFeeds.length > 0 ? categoryFeeds : TRUSTED_RSS_FEEDS[countryKey]?.all || [];
  if (feeds.length === 0) return { articles: [] };

  const feedResults = await Promise.all(
    feeds.map(async (feedUrl) => {
      try {
        const response = await fetchWithTimeout(feedUrl, { headers: { "User-Agent": "Mozilla/5.0 (compatible; AuraNews/1.0)" } });
        if (!response.ok) return [] as NewsArticle[];
        const xml = await response.text();
        return parseRSS(xml).slice(0, 6)
          .map((item, index) => ({
            title: item.title,
            description: item.description || item.title,
            url: normalizeUrl(item.link),
            urlToImage: item.imageUrl || getImageForArticle(item.title, index),
            publishedAt: safeDate(item.pubDate),
            source: { name: item.source || getHostname(feedUrl).replace(/^www\./, "") },
            category: category === "all" ? categorizeArticle(item.title) : category.replace(/^./, s => s.toUpperCase()),
            language,
          }))
          .filter(a => isValidArticleUrl(a.url));
      } catch { return [] as NewsArticle[]; }
    }),
  );

  return { articles: feedResults.flat() };
}

async function fetchFromRegionalRss(language: string): Promise<ProviderResult> {
  const feeds = REGIONAL_RSS_FEEDS[language];
  if (!feeds || feeds.length === 0) return { articles: [] };

  const feedResults = await Promise.all(
    feeds.map(async (feedUrl) => {
      try {
        const response = await fetchWithTimeout(feedUrl, { headers: { "User-Agent": "Mozilla/5.0 (compatible; AuraNews/1.0)" } });
        if (!response.ok) return [] as NewsArticle[];
        const xml = await response.text();
        return parseRSS(xml).slice(0, 10)
          .map((item, index) => ({
            title: item.title,
            description: item.description || item.title,
            url: normalizeUrl(item.link),
            urlToImage: item.imageUrl || getImageForArticle(item.title, index),
            publishedAt: safeDate(item.pubDate),
            source: { name: item.source || getHostname(feedUrl).replace(/^www\./, "") },
            category: categorizeArticle(item.title),
            language,
          }))
          .filter(a => isValidArticleUrl(a.url));
      } catch { return [] as NewsArticle[]; }
    }),
  );

  return { articles: feedResults.flat() };
}

// Google News RSS — NO URL resolution (use Google News URLs directly, much faster)
async function fetchFromGoogleRSS(language: string, country: string, category: string, query?: string): Promise<ProviderResult> {
  const isWorldwide = country === "worldwide";
  const config = isWorldwide ? WORLD_CONFIG : INDIA_LANGUAGE_CONFIG[language] || INDIA_LANGUAGE_CONFIG.en;

  // Use category-specific topic paths for better results
  const topicMap: Record<string, string> = {
    technology: "/topics/CAAqJggKIiBDQkFTRWdvSUwyMHZNRGRqTVhZU0FtVnVHZ0pKVGlnQVAB",
    sports: "/topics/CAAqJggKIiBDQkFTRWdvSUwyMHZNRFp1ZEdvU0FtVnVHZ0pKVGlnQVAB",
    business: "/topics/CAAqJggKIiBDQkFTRWdvSUwyMHZNRGx6TVdZU0FtVnVHZ0pKVGlnQVAB",
    economy: "/topics/CAAqJggKIiBDQkFTRWdvSUwyMHZNRGx6TVdZU0FtVnVHZ0pKVGlnQVAB",
  };

  // If a free-text query is supplied (e.g. district / city / "near me" mode),
  // hit Google News' /search endpoint instead of topic feeds — this gives
  // hyperlocal results we can't get from generic India feeds.
  const trimmedQuery = (query || "").trim();
  const topicPath = category !== "all" ? (topicMap[category] || "") : "";
  const feedUrl = trimmedQuery
    ? `https://news.google.com/rss/search?q=${encodeURIComponent(trimmedQuery)}&hl=${config.hl}&gl=${config.gl}&ceid=${config.ceid}`
    : `https://news.google.com/rss${topicPath}?hl=${config.hl}&gl=${config.gl}&ceid=${config.ceid}`;

  try {
    const response = await fetchWithTimeout(feedUrl, {
      headers: { "User-Agent": "Mozilla/5.0 (compatible; AuraNews/1.0)" },
    });
    if (!response.ok) return { articles: [] };

    const xml = await response.text();
    const rssItems = parseRSS(xml).slice(0, 15);

    // Instead of resolving URLs (slow), use Google News URLs directly
    // The "Full Story" link on the client will open these in browser
    const articles: NewsArticle[] = rssItems
      .filter(item => item.title && item.link)
      .map((item, index) => ({
        title: item.title,
        description: item.description || item.title,
        url: item.link, // Keep Google News URL - fast, no resolution needed
        urlToImage: item.imageUrl || getImageForArticle(item.title, index),
        publishedAt: safeDate(item.pubDate),
        source: { name: item.source || "Google News" },
        category: categorizeArticle(item.title),
        language: isWorldwide ? "en" : language,
      }));

    return { articles };
  } catch (e) {
    console.warn("[fetch-news] Google RSS error", e);
    return { articles: [] };
  }
}

function dedupeAndSort(articles: NewsArticle[]): NewsArticle[] {
  const seen = new Set<string>();
  const seenTitles = new Set<string>();
  const deduped: NewsArticle[] = [];
  for (const article of articles) {
    if (!article.url) continue;
    const key = normalizeUrl(article.url);
    const titleKey = article.title.toLowerCase().substring(0, 60);
    if (seen.has(key) || seenTitles.has(titleKey)) continue;
    seen.add(key);
    seenTitles.add(titleKey);
    deduped.push({ ...article, url: key });
  }
  deduped.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
  return deduped;
}

// In-memory cache (persists across warm invocations)
const cache = new Map<string, { data: any; timestamp: number }>();
const CACHE_TTL = 30 * 60 * 1000; // 30 minutes — UI-ready cards rarely change

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body = await req.json().catch(() => ({}));
    const language = typeof body.language === "string" ? body.language : "en";
    const country = body.country === "worldwide" ? "worldwide" : "in";
    const category = typeof body.category === "string" ? body.category.toLowerCase() : "all";
    const incomingNextPage = typeof body.nextPage === "string" ? body.nextPage : "";
    const query = typeof body.query === "string" ? body.query.trim().slice(0, 200) : "";
    // Strict freshness window — reject anything older than this. Defaults to
    // 24h; client can pass a higher value (e.g. 48) as a fallback step.
    const maxAgeHours = typeof body.maxAgeHours === "number" && body.maxAgeHours > 0
      ? Math.min(Math.max(body.maxAgeHours, 1), 168)
      : 24;

    // Check cache for initial loads (no pagination)
    const cacheKey = `${language}:${country}:${category}:${query}:${incomingNextPage}:${maxAgeHours}`;
    const cached = cache.get(cacheKey);
    if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
      console.log(`[fetch-news] Cache hit for ${cacheKey}`);
      return new Response(JSON.stringify(cached.data), {
        headers: { ...corsHeaders, "Content-Type": "application/json", "Cache-Control": "public, max-age=180" },
      });
    }

    const parsedToken = decodePaginationToken(incomingNextPage);
    const newsApiPage = parsedToken.newsApiPage ?? 1;

    const isEnglish = language === "en";
    const isRegionalLanguage = !isEnglish;

    // Fetch from all applicable sources in parallel
    const promises: Promise<ProviderResult>[] = [];

    // For hyperlocal queries we skip NewsData (no city/district granularity)
    // and rely on Google News search which supports arbitrary text.
    if (!query) {
      promises.push(fetchFromNewsData(language, country, category, parsedToken.newsDataPage));
    }
    promises.push(fetchFromGoogleRSS(language, country, category, query));

    if (isRegionalLanguage && !query) {
      promises.push(fetchFromRegionalRss(language));
    }

    if ((isEnglish || country === "worldwide") && !query) {
      promises.push(fetchFromNewsApi(language, country, category, newsApiPage));
      promises.push(fetchFromTrustedRss(language, country, category));
    }

    const results = await Promise.all(promises);

    const allArticles: NewsArticle[] = [];
    let newsDataNextPage: string | undefined;
    let newsApiHasMore = false;

    for (const result of results) {
      allArticles.push(...result.articles);
      if (result.nextPage) newsDataNextPage = result.nextPage;
      if (result.hasMore) newsApiHasMore = true;
    }

    let articles = dedupeAndSort(allArticles).slice(0, 40);

    // STRICT FRESHNESS FILTER — reject anything older than maxAgeHours.
    // If the strict pass leaves us with very little, soften to 2x the window
    // (capped at 72h) so the user still sees something fresh-ish.
    const ageMs = (h: number) => Date.now() - h * 3600_000;
    const freshStrict = articles.filter(a => new Date(a.publishedAt).getTime() >= ageMs(maxAgeHours));
    if (freshStrict.length >= 6) {
      articles = freshStrict;
    } else {
      const softWindow = Math.min(maxAgeHours * 2, 72);
      const freshSoft = articles.filter(a => new Date(a.publishedAt).getTime() >= ageMs(softWindow));
      articles = freshSoft.length > 0 ? freshSoft : articles.slice(0, 8); // last-resort: keep newest few
    }

    // Upgrade ALL article images to keyword-relevant Wikipedia thumbnails (with fallbacks)
    // We always try to find a more relevant image, even if the article had one — except for trusted publisher CDNs
    const TRUSTED_IMAGE_HOSTS = [
      "thehindu.com", "indianexpress.com", "bbci.co.uk", "ndtvimg.com",
      "hindustantimes.com", "livemint.com", "wikipedia.org", "wikimedia.org",
    ];
    const isTrustedPublisherImage = (u: string) => {
      if (!u) return false;
      try {
        const h = new URL(u).hostname;
        return TRUSTED_IMAGE_HOSTS.some(t => h.includes(t));
      } catch { return false; }
    };
    const toUpgrade = articles
      .map((a, i) => ({ a, i }))
      .filter(({ a }) => !a.urlToImage || !isTrustedPublisherImage(a.urlToImage))
      .slice(0, 30);

    await Promise.all(
      toUpgrade.map(async ({ a, i }) => {
        const img = await resolveImageForArticle(a.title, i);
        if (img) a.urlToImage = img;
      })
    );

    // Strict tech filtering
    if (category === "technology") {
      const TECH_KEYWORDS_LONG = [
        "technology", "artificial intelligence", "machine learning", "deep learning",
        "startup", "software", "hardware", "digital", "cyber", "blockchain",
        "cryptocurrency", "robot", "automation", "computer", "internet",
        "smartphone", "laptop", "gadget", "semiconductor", "processor",
        "algorithm", "developer", "programming", "silicon valley", "venture capital",
        "metaverse", "quantum computing", "biotech", "fintech", "edtech", "healthtech",
        "smart home", "wearable", "electric vehicle",
      ];
      const TECH_REGEX = [
        /\btech\b/i, /\bA\.?I\.?\b/, /\bapp\b/i, /\bdata\b/i, /\bcloud\b/i,
        /\bcrypto\b/i, /\bchip\b/i, /\bgpu\b/i, /\b5g\b/i, /\biot\b/i,
        /\bsaas\b/i, /\bdrone\b/i,
        /\bgoogle\b/i, /\bapple\b/i, /\bmicrosoft\b/i, /\bnvidia\b/i,
        /\bopenai\b/i, /\bchatgpt\b/i, /\bgemini\b/i, /\banthropic\b/i,
        /\btesla\b/i, /\bspacex\b/i, /\bandroid\b/i, /\bsamsung\b/i,
      ];
      
      articles = articles.filter(a => {
        const text = `${a.title} ${a.description}`.toLowerCase();
        if (TECH_KEYWORDS_LONG.some(kw => text.includes(kw))) return true;
        const raw = `${a.title} ${a.description}`;
        return TECH_REGEX.some(re => re.test(raw));
      });
    }

    // Cap to 15 UI-ready cards per page (matches reels-style swipe spec)
    articles = articles.slice(0, 15);

    // Enrich each card with id/headline/summary/tts_text/duration/location
    // and og:image fallback for any article without a usable image.
    articles = await enrichArticles(articles);

    // AI rescue: for anything still thin after scraping, expand via the
    // Lovable AI gateway into a 100–140 word editorial paragraph in the
    // article's own language. This is what turns 1-line RSS blurbs into
    // proper reel summaries.
    await aiBackfillWeakSummaries(articles, language, 12);

    // Strict quality gate: every reel must have a 100+ word summary that
    // is NOT just the headline repeated. Drop weak ones rather than
    // letting them poison the premium feed.
    const wc = (s: string) => (s || "").trim().split(/\s+/).filter(Boolean).length;
    const norm = (s: string) => (s || "").toLowerCase().replace(/[^a-z0-9 ]+/g, " ").replace(/\s+/g, " ").trim();
    const isWeak = (a: NewsArticle) => {
      const summary = (a.summary || "").trim();
      if (wc(summary) < 100) return true;
      const sNorm = norm(summary);
      const hNorm = norm(a.title || "");
      // Reject if summary is essentially the headline repeated.
      if (hNorm && sNorm.startsWith(hNorm) && sNorm.length < hNorm.length + 60) return true;
      // Reject obvious filler.
      if (/\b(more details (awaited|soon)|sources said|details awaited|stay tuned)\b/i.test(summary)) return true;
      return false;
    };
    const strong = articles.filter(a => !isWeak(a));
    if (strong.length >= 3) {
      articles = strong;
    } else {
      // Last-resort soft floor at 80 words so the feed never goes empty
      // on a bad fetch cycle.
      const soft = articles.filter(a => wc(a.summary || "") >= 80);
      articles = soft.length > 0 ? soft : articles;
    }

    const nextToken = newsDataNextPage || newsApiHasMore
      ? encodePaginationToken({ newsDataPage: newsDataNextPage, newsApiPage: newsApiHasMore ? newsApiPage + 1 : undefined })
      : "";

    const responseData = { articles, status: "ok", language, country, nextPage: nextToken, totalFound: articles.length };
    
    // Cache the response
    cache.set(cacheKey, { data: responseData, timestamp: Date.now() });
    // Evict old cache entries
    if (cache.size > 50) {
      const now = Date.now();
      for (const [k, v] of cache) { if (now - v.timestamp > CACHE_TTL) cache.delete(k); }
    }

    console.log(`[fetch-news] ${articles.length} articles for lang=${language}, country=${country}, cat=${category}`);

    return new Response(JSON.stringify(responseData), {
      headers: { ...corsHeaders, "Content-Type": "application/json", "Cache-Control": "public, max-age=180" },
    });
  } catch (error) {
    console.error("[fetch-news] fatal error", error);
    return new Response(
      JSON.stringify({ error: "Failed to fetch news", articles: [] }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});
