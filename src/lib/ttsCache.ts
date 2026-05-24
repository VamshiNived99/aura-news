// Tiny in-memory + sessionStorage TTS audio cache.
// Keyed by text+language+speed. Holds Blob URLs and revokes the oldest when full.

interface Entry { url: string; createdAt: number; }

const MAX_ENTRIES = 12;
const memory = new Map<string, Entry>();

function makeKey(text: string, language: string, speed: number) {
  // hash-ish key — text can be long, just use length+first/last chars + lang+speed
  const t = (text || "").trim();
  const head = t.slice(0, 64);
  const tail = t.slice(-32);
  return `${language}|${speed}|${t.length}|${head}|${tail}`;
}

export function getCachedTTS(text: string, language: string, speed: number): string | null {
  const k = makeKey(text, language, speed);
  return memory.get(k)?.url ?? null;
}

export function setCachedTTS(text: string, language: string, speed: number, blob: Blob): string {
  const k = makeKey(text, language, speed);
  // Evict oldest when over capacity
  if (memory.size >= MAX_ENTRIES) {
    let oldestKey: string | null = null;
    let oldestAt = Infinity;
    for (const [key, v] of memory.entries()) {
      if (v.createdAt < oldestAt) { oldestAt = v.createdAt; oldestKey = key; }
    }
    if (oldestKey) {
      const old = memory.get(oldestKey);
      if (old) try { URL.revokeObjectURL(old.url); } catch {}
      memory.delete(oldestKey);
    }
  }
  const url = URL.createObjectURL(blob);
  memory.set(k, { url, createdAt: Date.now() });
  return url;
}

// Clean text before sending to TTS — improves natural flow & avoids reading garbage
export function cleanTextForTTS(raw: string): string {
  if (!raw) return "";
  let text = raw;
  // Strip URLs
  text = text.replace(/https?:\/\/\S+/g, " ");
  text = text.replace(/www\.\S+/g, " ");
  // Strip emails
  text = text.replace(/\S+@\S+\.\S+/g, " ");
  // Remove HTML entities/tags if any slipped through
  text = text.replace(/<[^>]+>/g, " ");
  text = text.replace(/&[a-z]+;/gi, " ");
  // Strip hashtags & @mentions but keep word
  text = text.replace(/[#@](\w+)/g, "$1");
  // Expand common abbreviations so the voice sounds like a real news reader
  // instead of spelling out letters.
  const ABBREVIATIONS: Array<[RegExp, string]> = [
    [/\bvs\.?\b/gi, "versus"],
    [/\be\.g\.?/gi, "for example"],
    [/\bi\.e\.?/gi, "that is"],
    [/\betc\.?\b/gi, "etcetera"],
    [/\bPM\b/g, "Prime Minister"],
    [/\bCM\b/g, "Chief Minister"],
    [/\bMP\b/g, "Member of Parliament"],
    [/\bMLA\b/g, "M L A"],
    [/\bUS\b/g, "United States"],
    [/\bUSA\b/g, "United States"],
    [/\bUK\b/g, "United Kingdom"],
    [/\bUAE\b/g, "U A E"],
    [/\bEU\b/g, "European Union"],
    [/\bUN\b/g, "United Nations"],
    [/\bRBI\b/g, "R B I"],
    [/\bSBI\b/g, "S B I"],
    [/\bGST\b/g, "G S T"],
    [/\bIPL\b/g, "I P L"],
    [/\bBCCI\b/g, "B C C I"],
    [/\bISRO\b/g, "ISRO"],
    [/\bBJP\b/g, "B J P"],
    [/\bINC\b/g, "Congress"],
    [/\bAAP\b/g, "A A P"],
    [/\bCEO\b/g, "C E O"],
    [/\bIT\b/g, "I T"],
    [/\bAI\b/g, "A I"],
    [/\bNo\.\s*(\d)/g, "number $1"],
    [/\bRs\.?\s*/g, "rupees "],
    [/\b\$\s*/g, "dollars "],
    [/\b(\d+)\s*kg\b/gi, "$1 kilograms"],
    [/\b(\d+)\s*km\b/gi, "$1 kilometres"],
    [/%/g, " percent"],
    [/&/g, " and "],
  ];
  for (const [re, sub] of ABBREVIATIONS) text = text.replace(re, sub);
  // Normalise quote/dash glyphs
  text = text.replace(/[“”]/g, '"').replace(/[‘’]/g, "'");
  text = text.replace(/[—–]/g, ", ");
  // Collapse weird symbol runs but preserve combining marks used by Indic scripts
  text = text.replace(/[^\p{L}\p{M}\p{N}\s.,!?;:'"।]/gu, " ");
  // Natural news-reader pacing: short pause after commas, longer after sentences.
  text = text.replace(/,\s*/g, ", ");
  text = text.replace(/([.!?।])\s+/g, "$1 … ");
  // Avoid stuttering on triple dots
  text = text.replace(/(?:\.\s*){2,}/g, ". ");
  // Collapse whitespace
  text = text.replace(/\s+/g, " ").trim();
  return text;
}

// Async fetch+cache — used by the player and the preloader.
export async function fetchTTSBlob(opts: {
  text: string;
  language: string;
  speed: number;
  supabaseUrl: string;
  apiKey: string;
}): Promise<{ url: string; blob: Blob } | null> {
  const cleaned = cleanTextForTTS(opts.text);
  if (!cleaned) return null;
  const cached = getCachedTTS(cleaned, opts.language, opts.speed);
  if (cached) return { url: cached, blob: new Blob() }; // blob unused on cache hit
  try {
    const res = await fetch(`${opts.supabaseUrl}/functions/v1/regional-tts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: opts.apiKey,
        Authorization: `Bearer ${opts.apiKey}`,
      },
      body: JSON.stringify({ text: cleaned, language: opts.language }),
    });
    if (!res.ok) return null;
    const blob = await res.blob();
    if (!blob || blob.size < 200) return null;
    const url = setCachedTTS(cleaned, opts.language, opts.speed, blob);
    return { url, blob };
  } catch {
    return null;
  }
}

// Fire-and-forget preloader. Safe to call repeatedly — it deduplicates by key.
const inFlight = new Map<string, Promise<unknown>>();
export function preloadTTS(opts: {
  text: string;
  language: string;
  speed: number;
  supabaseUrl: string;
  apiKey: string;
}) {
  const cleaned = cleanTextForTTS(opts.text);
  if (!cleaned) return;
  const k = `${opts.language}|${opts.speed}|${cleaned.length}`;
  if (getCachedTTS(cleaned, opts.language, opts.speed)) return;
  if (inFlight.has(k)) return;
  const p = fetchTTSBlob(opts).finally(() => inFlight.delete(k));
  inFlight.set(k, p);
}
