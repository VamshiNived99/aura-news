interface NewsImageArticle {
  title: string;
  category?: string;
  url?: string;
  urlToImage?: string;
  // Some feeds (e.g. Current Affairs) expose the article image as `image`.
  // We accept either so Home, Local and Current Affairs share one logic.
  image?: string;
}

const CATEGORY_QUERY_MAP: Record<string, string> = {
  politics: 'india parliament government',
  political: 'india parliament government',
  technology: 'AI technology futuristic',
  tech: 'AI technology futuristic',
  finance: 'stock market charts',
  business: 'stock market charts',
  economy: 'stock market charts',
  local: 'city skyline streets',
  world: 'global news map',
  sports: 'sports stadium action',
  entertainment: 'cinema celebrity spotlight',
  general: 'breaking news journalism',
};

// Real publisher CDNs that we trust to actually show the story photo.
// Wikipedia, Openverse, Wikimedia thumbnails are NOT trusted because the
// fetch-news backend often picks unrelated articles (e.g., tree photos for
// Haryana crime stories). We override those with topic-relevant generated
// images so the user always sees something matching the headline.
// Hosts that frequently return generic/unrelated images (Wikipedia thumbs,
// stock placeholders, source logos). We skip these and generate a topic
// image instead. Everything else — including OG images scraped by the
// backend — is trusted as the real story photo.
// Only reject obvious placeholders / blank values. Anything the data source
// gave us (including Wikipedia, Openverse, og:image scrapes, etc.) is treated
// as that article's image — we trust the backend to pick per-article URLs.
const PLACEHOLDER_HOSTS = ['gravatar.com', 'placeholder.com', 'via.placeholder'];

// Reject newspaper screenshots, e-paper PDFs, source logos, and tiny thumbs.
// These destroy the cinematic reel feel.
const LOW_QUALITY_PATTERNS = /\b(epaper|e-paper|newspaper|frontpage|front-page|thumb(nail)?s?|logo|favicon|sprite|placeholder|blank|default[-_]?image|noimage|no[-_]image)\b/i;

function isUsableImage(url?: string) {
  if (!url) return false;
  try {
    const u = new URL(url);
    if (!/^https?:$/.test(u.protocol)) return false;
    const host = u.hostname.toLowerCase();
    if (PLACEHOLDER_HOSTS.some((bad) => host.includes(bad))) return false;
    if (LOW_QUALITY_PATTERNS.test(u.pathname)) return false;
    if (LOW_QUALITY_PATTERNS.test(u.search)) return false;
    // Reject obvious tiny dimensions in URL (e.g. ?w=100 or _100x100).
    const dim = u.pathname.match(/_(\d{2,3})x(\d{2,3})\./);
    if (dim && Number(dim[1]) < 300 && Number(dim[2]) < 300) return false;
    return true;
  } catch {
    return false;
  }
}

const CATEGORY_FALLBACKS: Record<string, string[]> = {
  politics: [
    'https://images.pexels.com/photos/1550337/pexels-photo-1550337.jpeg?auto=compress&cs=tinysrgb&w=1200',
    'https://images.pexels.com/photos/6077326/pexels-photo-6077326.jpeg?auto=compress&cs=tinysrgb&w=1200',
    'https://images.pexels.com/photos/8730987/pexels-photo-8730987.jpeg?auto=compress&cs=tinysrgb&w=1200',
    'https://images.pexels.com/photos/4669109/pexels-photo-4669109.jpeg?auto=compress&cs=tinysrgb&w=1200',
    'https://images.pexels.com/photos/2304167/pexels-photo-2304167.jpeg?auto=compress&cs=tinysrgb&w=1200',
  ],
  technology: [
    'https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg?auto=compress&cs=tinysrgb&w=1200',
    'https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg?auto=compress&cs=tinysrgb&w=1200',
    'https://images.pexels.com/photos/586019/pexels-photo-586019.jpeg?auto=compress&cs=tinysrgb&w=1200',
    'https://images.pexels.com/photos/2599244/pexels-photo-2599244.jpeg?auto=compress&cs=tinysrgb&w=1200',
    'https://images.pexels.com/photos/2885320/pexels-photo-2885320.jpeg?auto=compress&cs=tinysrgb&w=1200',
  ],
  finance: [
    'https://images.pexels.com/photos/210607/pexels-photo-210607.jpeg?auto=compress&cs=tinysrgb&w=1200',
    'https://images.pexels.com/photos/534216/pexels-photo-534216.jpeg?auto=compress&cs=tinysrgb&w=1200',
    'https://images.pexels.com/photos/590041/pexels-photo-590041.jpeg?auto=compress&cs=tinysrgb&w=1200',
    'https://images.pexels.com/photos/8370752/pexels-photo-8370752.jpeg?auto=compress&cs=tinysrgb&w=1200',
    'https://images.pexels.com/photos/3943723/pexels-photo-3943723.jpeg?auto=compress&cs=tinysrgb&w=1200',
  ],
  local: [
    'https://images.pexels.com/photos/466685/pexels-photo-466685.jpeg?auto=compress&cs=tinysrgb&w=1200',
    'https://images.pexels.com/photos/338515/pexels-photo-338515.jpeg?auto=compress&cs=tinysrgb&w=1200',
    'https://images.pexels.com/photos/3601425/pexels-photo-3601425.jpeg?auto=compress&cs=tinysrgb&w=1200',
    'https://images.pexels.com/photos/2387873/pexels-photo-2387873.jpeg?auto=compress&cs=tinysrgb&w=1200',
    'https://images.pexels.com/photos/3408744/pexels-photo-3408744.jpeg?auto=compress&cs=tinysrgb&w=1200',
  ],
  world: [
    'https://images.pexels.com/photos/7230316/pexels-photo-7230316.jpeg?auto=compress&cs=tinysrgb&w=1200',
    'https://images.pexels.com/photos/355465/pexels-photo-355465.jpeg?auto=compress&cs=tinysrgb&w=1200',
    'https://images.pexels.com/photos/220201/pexels-photo-220201.jpeg?auto=compress&cs=tinysrgb&w=1200',
    'https://images.pexels.com/photos/2422259/pexels-photo-2422259.jpeg?auto=compress&cs=tinysrgb&w=1200',
    'https://images.pexels.com/photos/2422290/pexels-photo-2422290.jpeg?auto=compress&cs=tinysrgb&w=1200',
  ],
  sports: [
    'https://images.pexels.com/photos/274422/pexels-photo-274422.jpeg?auto=compress&cs=tinysrgb&w=1200',
    'https://images.pexels.com/photos/2294400/pexels-photo-2294400.jpeg?auto=compress&cs=tinysrgb&w=1200',
    'https://images.pexels.com/photos/47356/freeway-traffic-stadium-lights-47356.jpeg?auto=compress&cs=tinysrgb&w=1200',
    'https://images.pexels.com/photos/3621104/pexels-photo-3621104.jpeg?auto=compress&cs=tinysrgb&w=1200',
    'https://images.pexels.com/photos/618612/pexels-photo-618612.jpeg?auto=compress&cs=tinysrgb&w=1200',
  ],
  entertainment: [
    'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=1200',
    'https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=1200',
    'https://images.pexels.com/photos/3137890/pexels-photo-3137890.jpeg?auto=compress&cs=tinysrgb&w=1200',
    'https://images.pexels.com/photos/2873486/pexels-photo-2873486.jpeg?auto=compress&cs=tinysrgb&w=1200',
    'https://images.pexels.com/photos/3152126/pexels-photo-3152126.jpeg?auto=compress&cs=tinysrgb&w=1200',
  ],
  general: [
    'https://images.pexels.com/photos/518543/pexels-photo-518543.jpeg?auto=compress&cs=tinysrgb&w=1200',
    'https://images.pexels.com/photos/97050/pexels-photo-97050.jpeg?auto=compress&cs=tinysrgb&w=1200',
    'https://images.pexels.com/photos/3944454/pexels-photo-3944454.jpeg?auto=compress&cs=tinysrgb&w=1200',
    'https://images.pexels.com/photos/3944405/pexels-photo-3944405.jpeg?auto=compress&cs=tinysrgb&w=1200',
    'https://images.pexels.com/photos/164686/pexels-photo-164686.jpeg?auto=compress&cs=tinysrgb&w=1200',
    'https://images.pexels.com/photos/3944377/pexels-photo-3944377.jpeg?auto=compress&cs=tinysrgb&w=1200',
    'https://images.pexels.com/photos/3944454/pexels-photo-3944454.jpeg?auto=compress&cs=tinysrgb&w=1200',
  ],
};

function hash(input: string) {
  let value = 0;
  for (let i = 0; i < input.length; i += 1) {
    value = ((value << 5) - value + input.charCodeAt(i)) | 0;
  }
  return Math.abs(value);
}

function normalizeCategory(category?: string) {
  const value = (category || '').trim().toLowerCase();
  if (!value) return 'general';
  if (value.includes('polit')) return 'politics';
  if (value.includes('tech')) return 'technology';
  if (value.includes('econom') || value.includes('business') || value.includes('finan')) return 'finance';
  if (value.includes('sport')) return 'sports';
  if (value.includes('entertain')) return 'entertainment';
  if (value.includes('world')) return 'world';
  if (value.includes('local')) return 'local';
  return 'general';
}

function extractKeywords(title: string, max = 3) {
  const stopWords = new Set([
    'the', 'a', 'an', 'and', 'or', 'of', 'to', 'for', 'in', 'on', 'at', 'from', 'by', 'with', 'after', 'before', 'into', 'during', 'amid', 'about', 'over', 'under',
    'news', 'today', 'live', 'latest', 'update', 'updates', 'report', 'reports', 'says', 'said', 'will', 'this', 'that', 'these', 'those', 'their', 'they', 'them',
    'new', 'top', 'big', 'set', 'get', 'how', 'why', 'what', 'when', 'who', 'has', 'had', 'have', 'been', 'was', 'were', 'are', 'is',
  ]);

  // Strip leading source labels like "HCA |" or "Delhi:" that pollute keywords.
  const cleanedTitle = title
    .replace(/^[^\p{L}\p{N}]*[A-Z0-9]{2,6}\s*[|:]\s*/u, '')
    .replace(/\s+[-|–—]\s+[\p{L}\s]+$/u, '');
  const rawWords = cleanedTitle
    .replace(/[^\p{L}\p{N}\s-]/gu, ' ')
    .split(/\s+/)
    .map((part) => part.trim())
    .filter((part) => /[A-Za-z]/.test(part) && part.length > 2 && !stopWords.has(part.toLowerCase()));

  // Score: proper nouns (capitalised, not at sentence start of common word)
  // get priority because they are usually the subject of the news.
  const scored = rawWords.map((word, idx) => {
    let score = 1;
    if (/^[A-Z][a-z]+/.test(word)) score += 3; // proper noun
    if (/^[A-Z]{2,}$/.test(word)) score += 2;  // acronym (likely org/place)
    if (idx < 6) score += 1;                    // appears early in headline
    if (word.length > 6) score += 1;
    return { word: word.toLowerCase(), score, idx };
  });
  scored.sort((a, b) => b.score - a.score || a.idx - b.idx);

  const unique: string[] = [];
  const seen = new Set<string>();
  for (const { word } of scored) {
    if (seen.has(word)) continue;
    seen.add(word);
    unique.push(word);
    if (unique.length >= max) break;
  }

  return unique;
}

function buildQuery(article: NewsImageArticle, locationLabel?: string) {
  const category = normalizeCategory(article.category);
  const categoryQuery = CATEGORY_QUERY_MAP[category] || CATEGORY_QUERY_MAP.general;
  const keywords = extractKeywords(article.title || '', 4);
  const location = locationLabel?.trim();

  // Headline keywords carry the story; put them FIRST so the prompt is
  // anchored on what the article is actually about.
  if (keywords.length >= 2) {
    return [...keywords, location, category === 'local' ? 'city' : ''].filter(Boolean).join(' ');
  }

  if (category === 'local' && location) {
    return [location, 'city', categoryQuery, ...keywords].filter(Boolean).join(' ');
  }

  return [categoryQuery, location, ...keywords].filter(Boolean).join(' ');
}

function cleanQueryWords(query: string, max = 5) {
  return query
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]/gu, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .split(' ')
    .filter(Boolean)
    .slice(0, max);
}

// Real photographs from Unsplash CDN — much more relevant than AI-generated
// imagery for actual news content. Loremflickr returns curated photos by tag.
function buildLoremFlickrUrl(query: string, article: NewsImageArticle) {
  // Per-article unique seed so every swipe gets a different photo.
  const sig = hash(`${article.url || article.title}|flickr|${query}`);
  const tags = cleanQueryWords(query, 4).join(',') || 'news';
  return `https://loremflickr.com/720/1280/${encodeURIComponent(tags)}?lock=${sig}`;
}

function buildPollinationsUrl(query: string, article: NewsImageArticle) {
  // Unique seed per article — guarantees a fresh AI image on every swipe
  // even when two stories share keywords.
  const sig = hash(`${article.url || article.title}|pollinations|${query}`);
  const words = cleanQueryWords(query, 8).join(' ');
  const prompt = `${words || 'breaking news'}, indian news photograph, photojournalism, realistic, editorial, sharp focus, no text`;
  return `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?width=720&height=1280&nologo=true&enhance=true&seed=${sig}&model=flux`;
}

// Loremflickr supports a "match all tags" mode and a per-article lock seed.
// We build TWO variants so if the most-specific tag combo has no matches,
// the broader one still returns a relevant photo.
function buildLoremFlickrVariants(query: string, article: NewsImageArticle) {
  const seedBase = `${article.url || article.title}`;
  const words = cleanQueryWords(query, 5);
  const variants: string[] = [];
  if (words.length >= 2) {
    const sigA = hash(`${seedBase}|flickr|all|${words.join(',')}`);
    variants.push(
      `https://loremflickr.com/720/1280/${encodeURIComponent(words.slice(0, 3).join(','))}/all?lock=${sigA}`,
    );
  }
  const sigB = hash(`${seedBase}|flickr|any|${words.join(',')}`);
  variants.push(
    `https://loremflickr.com/720/1280/${encodeURIComponent(words.slice(0, 3).join(',') || 'news')}?lock=${sigB}`,
  );
  // A second any-match with a single strongest keyword (broad fallback).
  if (words[0]) {
    const sigC = hash(`${seedBase}|flickr|broad|${words[0]}`);
    variants.push(
      `https://loremflickr.com/720/1280/${encodeURIComponent(words[0])}?lock=${sigC}`,
    );
  }
  return variants;
}

function getFallback(category: string, seed: string) {
  const bank = CATEGORY_FALLBACKS[category] || CATEGORY_FALLBACKS.general;
  return bank[hash(seed || category) % bank.length];
}

export function getNewsImageCacheKey(article: NewsImageArticle, locationLabel?: string) {
  return `news_image_${hash(`${article.url || article.title}|${locationLabel || ''}`)}`;
}

// Relevance score in [0,1] — how confident we are the keywords actually
// describe the story. Used to decide between AI generation, real photos and
// category fallbacks.
export function getKeywordRelevance(article: NewsImageArticle) {
  const keywords = extractKeywords(article.title || '', 4);
  if (!keywords.length) return 0;
  // Long, multi-keyword headlines with proper nouns score highest.
  const properNounBonus = keywords.filter((k) => /^[a-z]+$/.test(k) && k.length > 4).length * 0.15;
  const lengthScore = Math.min(keywords.length / 4, 1) * 0.55;
  return Math.min(1, lengthScore + properNounBonus);
}

// Image caching disabled — every render reads the image directly from the
// article data so there is no chance of a stale URL being reused across
// different stories.
export function getCachedResolvedImage(_article: NewsImageArticle, _locationLabel?: string) {
  return null;
}

export function rememberResolvedImage(_article: NewsImageArticle, _url: string, _locationLabel?: string) {
  /* no-op */
}

export function getNewsImageCandidates(article: NewsImageArticle, _locationLabel?: string) {
  // 1) Use the source image only if it passes quality checks (no newspaper
  //    screenshots, epaper, logos, tiny thumbs).
  // 2) Otherwise fall back to a curated, cinematic, category-relevant photo
  //    from our Pexels bank — keyed by the article URL/title so each story
  //    gets a stable, distinct image instead of a gradient.
  const candidates: string[] = [];
  if (isUsableImage(article.urlToImage)) candidates.push(article.urlToImage!);
  if (isUsableImage(article.image) && !candidates.includes(article.image!)) {
    candidates.push(article.image!);
  }
  const category = normalizeCategory(article.category);
  const seed = `${article.url || article.title || ''}|${category}`;
  const fallback = getFallback(category, seed);
  if (fallback && !candidates.includes(fallback)) candidates.push(fallback);
  // Add one more from the bank as a secondary fallback.
  const bank = CATEGORY_FALLBACKS[category] || CATEGORY_FALLBACKS.general;
  const second = bank[(hash(seed) + 1) % bank.length];
  if (second && !candidates.includes(second)) candidates.push(second);
  return candidates;
}

export function preloadNewsImage(article: NewsImageArticle, locationLabel?: string) {
  if (typeof window === 'undefined') return () => {};
  // If we already have a cached resolved image for this story, just warm the
  // browser cache for it. Otherwise warm the top candidate.
  const cached = getCachedResolvedImage(article, locationLabel);
  const candidates = getNewsImageCandidates(article, locationLabel);
  const target = cached || candidates[0];
  if (!target) return () => {};
  const img = new Image();
  img.decoding = 'async';
  img.referrerPolicy = 'no-referrer';
  img.onload = () => {
    // Persist the first successfully decoded URL so the next view is instant.
    rememberResolvedImage(article, target, locationLabel);
  };
  img.src = target;
  return () => {
    img.onload = null;
    img.onerror = null;
  };
}
