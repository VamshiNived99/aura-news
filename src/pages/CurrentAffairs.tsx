import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Newspaper, RefreshCw, Calendar, Bookmark,
  TrendingUp, Sparkles, Loader2, Brain,
  ChevronRight, Award, Eye, BookOpen
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

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

const CATEGORIES = [
  { key: "all", label: "All", icon: "🌐" },
  { key: "National", label: "National", icon: "🇮🇳" },
  { key: "International", label: "World", icon: "🌍" },
  { key: "Economy", label: "Economy", icon: "💰" },
  { key: "Polity", label: "Polity", icon: "🏛️" },
  { key: "Science & Tech", label: "Sci & Tech", icon: "🔬" },
  { key: "Sports", label: "Sports", icon: "🏆" },
  { key: "Govt Schemes", label: "Schemes", icon: "📋" },
  { key: "Awards & Appointments", label: "Awards", icon: "🎖️" },
  { key: "Defence & Space", label: "Defence", icon: "🛡️" },
];

const CATEGORY_GRADIENTS: Record<string, string> = {
  National: "from-orange-500 to-red-500",
  International: "from-blue-500 to-cyan-500",
  Economy: "from-emerald-500 to-teal-500",
  Polity: "from-purple-500 to-indigo-500",
  "Science & Tech": "from-pink-500 to-rose-500",
  Sports: "from-amber-500 to-yellow-500",
  "Govt Schemes": "from-indigo-500 to-blue-500",
  "Awards & Appointments": "from-fuchsia-500 to-purple-500",
  "Defence & Space": "from-slate-600 to-slate-800",
};

// Exam-relevance filter: exclude crime/accidents/entertainment etc.
const EXCLUDE_KEYWORDS = [
  "murder", "rape", "molest", "assault", "killed", "killing", "dead body",
  "accident", "crash", "collision", "stabbed", "shot dead", "suicide",
  "robbery", "loot", "kidnap", "abduct", "arrest", "fir ", "encounter",
  "bollywood", "actress", "actor", "celebrity", "box office", "trailer",
  "viral video", "tiktok", "instagram reel", "wedding", "divorce",
  "horoscope", "astrology", "weather forecast",
];

const PREFER_KEYWORDS = [
  "scheme", "yojana", "policy", "bill", "act", "cabinet", "ministry",
  "rbi", "gdp", "inflation", "budget", "report", "index", "ranking",
  "summit", "treaty", "agreement", "bilateral", "united nations", "g20", "brics",
  "isro", "drdo", "satellite", "mission", "research", "vaccine", "technology",
  "supreme court", "parliament", "appointed", "award", "nobel",
];

function isExamRelevant(item: CAItem): boolean {
  const text = `${item.title} ${item.summary}`.toLowerCase();
  if (EXCLUDE_KEYWORDS.some((k) => text.includes(k))) return false;
  // Always allow these high-yield categories
  const safeCats = ["Govt Schemes", "Economy", "International", "Science & Tech", "Polity", "Defence & Space", "Awards & Appointments"];
  if (safeCats.includes(item.category)) return true;
  // For National/Sports require a preferred keyword
  if (PREFER_KEYWORDS.some((k) => text.includes(k))) return true;
  return false;
}

function isToday(iso: string): boolean {
  const d = new Date(iso);
  if (isNaN(d.getTime())) return false;
  const now = new Date();
  return d.getDate() === now.getDate() &&
    d.getMonth() === now.getMonth() &&
    d.getFullYear() === now.getFullYear();
}

function timeAgo(iso: string): string {
  const t = new Date(iso).getTime();
  if (isNaN(t)) return "Recent";
  const diff = Date.now() - t;
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${Math.max(1, mins)}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

// Strip HTML tags + decode common entities + collapse whitespace.
// Safe to run on already-plain text.
function cleanText(input?: string): string {
  if (!input) return "";
  let s = String(input);
  // Drop script/style blocks entirely
  s = s.replace(/<(script|style)[\s\S]*?<\/\1>/gi, " ");
  // Replace <br>, </p>, </div>, </li> with spaces to preserve word boundaries
  s = s.replace(/<\s*(br|\/p|\/div|\/li|\/h[1-6])\s*\/?>/gi, " ");
  // Strip remaining tags
  s = s.replace(/<[^>]+>/g, "");
  // Decode common named entities + numeric entities
  const named: Record<string, string> = {
    "&nbsp;": " ", "&amp;": "&", "&lt;": "<", "&gt;": ">",
    "&quot;": '"', "&apos;": "'", "&#39;": "'", "&hellip;": "…",
    "&ndash;": "–", "&mdash;": "—", "&rsquo;": "’", "&lsquo;": "‘",
    "&ldquo;": "“", "&rdquo;": "”",
  };
  s = s.replace(/&[a-zA-Z]+;|&#\d+;/g, (m) => {
    if (named[m]) return named[m];
    const num = m.match(/&#(\d+);/);
    if (num) { try { return String.fromCharCode(parseInt(num[1], 10)); } catch { return " "; } }
    return " ";
  });
  // Remove inline URLs
  s = s.replace(/https?:\/\/\S+/gi, "");
  // Collapse whitespace + trim
  s = s.replace(/\s+/g, " ").trim();
  return s;
}

// Build a short readable summary (first ~2 sentences, capped).
function makeSummary(text: string, maxChars = 220): string {
  const clean = cleanText(text);
  if (!clean) return "";
  const sentences = clean.match(/[^.!?]+[.!?]+/g);
  let out = sentences ? sentences.slice(0, 2).join(" ").trim() : clean;
  if (out.length > maxChars) out = out.slice(0, maxChars).replace(/\s+\S*$/, "") + "…";
  return out;
}

const CurrentAffairs = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState<CAItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState("all");
  const [bookmarks, setBookmarks] = useState<Set<string>>(new Set());
  const [todayOnly, setTodayOnly] = useState(true);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("ca_bookmarks") || "[]");
      setBookmarks(new Set(saved));
    } catch {}
  }, []);

  async function load(cat: string) {
    setLoading(true);
    try {
      const url = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/fetch-current-affairs?category=${encodeURIComponent(cat)}`;
      const res = await fetch(url, {
        headers: {
          apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
      });
      const data = await res.json();
      const raw: CAItem[] = data.items || [];
      // Clean HTML/entities first, then filter for exam-relevance + meaningful summary
      const cleaned: CAItem[] = raw.map((it) => ({
        ...it,
        title: cleanText(it.title),
        summary: makeSummary(it.summary || ""),
      }));
      const filtered = cleaned.filter(
        (it) => isExamRelevant(it) && it.summary && it.summary.trim().length >= 60
      );
      setItems(filtered);
    } catch (e) {
      toast.error("Failed to load current affairs");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load(category);
  }, [category]);

  function toggleBookmark(id: string) {
    setBookmarks(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      localStorage.setItem("ca_bookmarks", JSON.stringify([...next]));
      return next;
    });
  }

  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long", day: "numeric", month: "long", year: "numeric"
  });

  const visibleItems = todayOnly
    ? items.filter((it) => isToday(it.pubDate))
    : items;
  // If today-only filter leaves nothing, fall back to all so screen isn't empty
  const displayItems = todayOnly && visibleItems.length === 0 ? items : visibleItems;

  // Top 5 for the currently-selected category, sorted by latest date desc.
  // Backend already returns items for the selected category, but we re-sort
  // and slice locally so the highlights update instantly with category changes.
  const topFive = [...displayItems]
    .sort((a, b) => {
      const ta = new Date(a.pubDate).getTime() || 0;
      const tb = new Date(b.pubDate).getTime() || 0;
      return tb - ta;
    })
    .slice(0, 5);
  const [activeTop, setActiveTop] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  // Helper: extract 3 short bullets from an item's summary
  function bulletize(text: string, max = 3): string[] {
    const clean = (text || "").trim();
    if (!clean) return [];
    const parts = clean
      .split(/(?<=[.!?])\s+/)
      .map((s) => s.trim())
      .filter((s) => s.length > 20);
    return parts.slice(0, max);
  }

  // Map exam relevance from category
  function examTags(cat: string): string[] {
    const map: Record<string, string[]> = {
      "Govt Schemes": ["UPSC", "SSC"],
      "Economy": ["UPSC", "Banking", "SSC"],
      "International": ["UPSC", "SSC"],
      "Polity": ["UPSC", "SSC"],
      "Science & Tech": ["UPSC", "SSC"],
      "Sports": ["SSC"],
      "Awards & Appointments": ["UPSC", "SSC", "Banking"],
      "Defence & Space": ["UPSC", "SSC", "Defence"],
      "National": ["UPSC", "SSC"],
    };
    return map[cat] || ["UPSC"];
  }

  return (
    <div className="relative min-h-[100dvh] w-full bg-[hsl(228_20%_4%)] text-white pb-28 overflow-hidden">
      {/* Ambient neon glows */}
      <div className="pointer-events-none fixed inset-0 -z-0 overflow-hidden">
        <div className="absolute -top-40 -left-20 w-[420px] h-[420px] rounded-full bg-violet-600/20 blur-[160px]" />
        <div className="absolute top-40 -right-24 w-[350px] h-[350px] rounded-full bg-cyan-500/15 blur-[160px]" />
        <div className="absolute top-[55%] left-1/4 w-[300px] h-[300px] rounded-full bg-fuchsia-500/12 blur-[160px]" />
        <div className="absolute bottom-20 right-1/4 w-[280px] h-[280px] rounded-full bg-blue-500/10 blur-[160px]" />
      </div>

      {/* Header */}
      <header className="relative z-40 sticky top-0 bg-[hsl(228_20%_4%)]/80 backdrop-blur-2xl border-b border-white/[0.06]">
        <div className="px-4 pt-4 pb-2.5 flex items-start justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="relative shrink-0">
              <div className="absolute -inset-1.5 rounded-2xl bg-gradient-to-br from-cyan-400/40 via-violet-500/40 to-fuchsia-500/40 blur-lg" />
              <div className="relative w-11 h-11 rounded-2xl bg-white/[0.08] backdrop-blur-md border border-white/[0.12] flex items-center justify-center">
                <Brain className="w-5 h-5 text-white" />
              </div>
            </div>
            <div className="min-w-0">
              <h1 className="text-[17px] font-extrabold leading-tight bg-gradient-to-r from-cyan-300 via-violet-300 to-fuchsia-300 bg-clip-text text-transparent truncate">
                Exam Intelligence
              </h1>
              <p className="text-[10px] text-white/50 flex items-center gap-1 mt-0.5">
                <Calendar className="w-3 h-3" /> {today}
              </p>
            </div>
          </div>
          <Button
            variant="ghost" size="icon"
            onClick={() => load(category)} disabled={loading}
            className="h-9 w-9 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 text-white/85"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          </Button>
        </div>

        {/* Today / This week toggle */}
        <div className="px-4 pb-2.5 flex items-center gap-2">
          <button
            onClick={() => setTodayOnly(true)}
            className={`px-3.5 py-1.5 rounded-full text-[11px] font-bold border transition-all ${
              todayOnly
                ? "bg-white text-black border-white shadow-[0_4px_20px_-6px_rgba(255,255,255,0.4)]"
                : "bg-white/[0.05] text-white/70 border-white/[0.08]"
            }`}
          >Today</button>
          <button
            onClick={() => setTodayOnly(false)}
            className={`px-3.5 py-1.5 rounded-full text-[11px] font-bold border transition-all ${
              !todayOnly
                ? "bg-white text-black border-white shadow-[0_4px_20px_-6px_rgba(255,255,255,0.4)]"
                : "bg-white/[0.05] text-white/70 border-white/[0.08]"
            }`}
          >This Week</button>
          <span className="ml-auto text-[10px] text-white/50 font-semibold">
            {displayItems.length} updates
          </span>
        </div>

        {/* Category chips */}
        <div
          className="w-full overflow-x-auto overflow-y-hidden scroll-smooth pb-2.5 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          style={{ WebkitOverflowScrolling: "touch", overscrollBehaviorX: "contain" }}
        >
          <div className="flex flex-nowrap gap-1.5 px-4 pr-6 w-max">
            {CATEGORIES.map(c => (
              <button
                key={c.key}
                onClick={() => setCategory(c.key)}
                className={`shrink-0 px-3 py-1.5 rounded-full text-[11px] font-semibold whitespace-nowrap transition-all border ${
                  category === c.key
                    ? "bg-gradient-to-r from-cyan-400 to-violet-500 text-white border-transparent shadow-[0_4px_16px_-4px_rgba(124,58,237,0.6)]"
                    : "bg-white/[0.04] text-white/70 border-white/[0.08] hover:bg-white/[0.08]"
                }`}
              >
                <span className="mr-1">{c.icon}</span>{c.label}
              </button>
            ))}
          </div>
        </div>
      </header>

      <main className="relative z-10 pt-4 space-y-7">
        {loading && items.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="relative">
              <div className="absolute -inset-4 rounded-full bg-cyan-500/20 blur-2xl" />
              <Loader2 className="relative w-10 h-10 animate-spin text-cyan-300" />
            </div>
            <p className="text-sm text-white/50 mt-4 font-medium">Loading intelligence…</p>
          </div>
        )}

        {!loading && displayItems.length === 0 && (
          <div className="text-center py-20 px-6">
            <Newspaper className="w-12 h-12 mx-auto text-white/30 mb-3" />
            <p className="text-sm text-white/50">No intelligence updates available</p>
          </div>
        )}

        {/* === 1. SPOTLIGHT HERO === */}
        {topFive[0] && (
          <section className="px-4">
            <div className="relative">
              {/* Outer glow */}
              <div className="absolute -inset-1 rounded-[28px] bg-gradient-to-br from-violet-500/30 via-cyan-500/20 to-fuchsia-500/30 blur-2xl opacity-70" />
              <div className="relative rounded-[26px] overflow-hidden shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)]">
                {/* Background image or gradient */}
                {topFive[0].image ? (
                  <img src={topFive[0].image} alt="" className="absolute inset-0 w-full h-full object-cover" onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }} />
                ) : null}
                <div className={`absolute inset-0 ${topFive[0].image ? "" : `bg-gradient-to-br ${CATEGORY_GRADIENTS[topFive[0].category] || "from-violet-600 to-cyan-600"}`}`} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(139,92,246,0.25),transparent_70%)]" />
                
                <div className="relative p-6 pt-5 min-h-[240px] flex flex-col justify-end">
                  {/* Badge */}
                  <div className="absolute top-5 left-5 flex items-center gap-2">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/[0.12] backdrop-blur-xl border border-white/[0.15] text-[10px] font-bold uppercase tracking-wider">
                      <Sparkles className="w-3 h-3 text-amber-300" /> Spotlight
                    </span>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full bg-gradient-to-r ${CATEGORY_GRADIENTS[topFive[0].category] || "from-violet-500 to-fuchsia-500"} text-[9px] font-bold uppercase tracking-wider`}>
                      {topFive[0].category}
                    </span>
                  </div>

                  {/* Title */}
                  <h2 className="text-[20px] font-extrabold leading-tight tracking-tight line-clamp-2 mb-3">
                    {topFive[0].title}
                  </h2>

                  {/* Bullets */}
                  {bulletize(topFive[0].summary, 2).length > 0 && (
                    <ul className="space-y-1.5 mb-3">
                      {bulletize(topFive[0].summary, 2).map((b, k) => (
                        <li key={k} className="flex items-start gap-2 text-[12px] leading-snug text-white/80">
                          <span className="mt-1.5 w-1 h-1 shrink-0 rounded-full bg-cyan-400" />
                          <span className="line-clamp-1">{b}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Why it matters */}
                  <p className="text-[11px] text-white/50 mb-4">
                    <span className="text-amber-300/80 font-semibold">Why it matters:</span> Likely asked in {examTags(topFive[0].category).join(", ")} exams
                  </p>

                  {/* CTA */}
                  <a
                    href={topFive[0].sourceUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 self-start px-5 py-2.5 rounded-2xl bg-white text-black font-bold text-[13px] shadow-[0_8px_30px_-8px_rgba(255,255,255,0.5)] hover:shadow-[0_12px_40px_-8px_rgba(255,255,255,0.6)] transition-shadow active:scale-[0.97]"
                  >
                    <Eye className="w-4 h-4" /> Explore
                  </a>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* === 2. TOP 5 EXAM TOPICS CAROUSEL === */}
        {topFive.length > 0 && (
          <section>
            <div className="flex items-end justify-between px-4 mb-3">
              <div>
                <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-violet-300/80">
                  <TrendingUp className="w-3 h-3" /> Top Topics
                </div>
                <h2 className="text-[16px] font-extrabold tracking-tight mt-0.5">Must-Know Updates</h2>
              </div>
              <span className="text-[10px] text-white/40 font-medium">Swipe →</span>
            </div>
            <div
              ref={carouselRef}
              className="flex gap-3 overflow-x-auto scrollbar-hide snap-x snap-mandatory px-[14vw] pb-6 pt-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
              onScroll={(e) => {
                const el = e.currentTarget;
                const center = el.scrollLeft + el.clientWidth / 2;
                let best = 0, bestD = Infinity;
                Array.from(el.children).forEach((c, i) => {
                  const ch = c as HTMLElement;
                  const m = ch.offsetLeft + ch.offsetWidth / 2;
                  const d = Math.abs(m - center);
                  if (d < bestD) { bestD = d; best = i; }
                });
                setActiveTop(best);
              }}
            >
              {topFive.map((item, i) => {
                const grad = CATEGORY_GRADIENTS[item.category] || "from-violet-500 to-fuchsia-600";
                const isActive = i === activeTop;
                const dist = Math.abs(i - activeTop);
                const tags = examTags(item.category);
                return (
                  <motion.a
                    key={`top-${item.id}`}
                    href={item.sourceUrl} target="_blank" rel="noreferrer"
                    animate={{
                      scale: dist === 0 ? 1 : dist === 1 ? 0.92 : 0.88,
                      opacity: dist === 0 ? 1 : dist === 1 ? 0.8 : 0.6,
                    }}
                    transition={{ type: "spring", stiffness: 260, damping: 24 }}
                    className="snap-center shrink-0 w-[72vw] max-w-[300px]"
                  >
                    <div className={`relative h-[260px] rounded-[24px] overflow-hidden transition-shadow ${
                      isActive
                        ? "shadow-[0_20px_50px_-10px_rgba(124,58,237,0.5)] ring-1 ring-white/20"
                        : "shadow-[0_8px_24px_-10px_rgba(0,0,0,0.5)] ring-1 ring-white/[0.08]"
                    }`}>
                      {isActive && (
                        <div className="pointer-events-none absolute -inset-1.5 rounded-[28px] bg-gradient-to-r from-cyan-400/30 via-violet-500/30 to-fuchsia-500/30 blur-xl opacity-80 -z-10" />
                      )}
                      <div className={`absolute inset-0 bg-gradient-to-br ${grad}`} />
                      {item.image && (
                        <img
                          src={item.image} alt="" loading="lazy"
                          className="absolute inset-0 w-full h-full object-cover opacity-30 mix-blend-overlay"
                          onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
                        />
                      )}
                      <div className="absolute inset-0 bg-black/40" />
                      <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/80 to-transparent" />
                      <div className="absolute inset-0 rounded-[24px] ring-1 ring-inset ring-white/[0.12]" />

                      <div className="relative h-full p-4 flex flex-col">
                        <div className="flex items-center justify-between mb-auto">
                          <span className="inline-flex items-center gap-1 px-2 h-5 rounded-full bg-black/50 backdrop-blur-md border border-white/[0.12] text-[10px] font-bold">#{i + 1}</span>
                          <span className="inline-flex items-center px-2 h-5 rounded-full bg-white/[0.12] backdrop-blur-md border border-white/[0.15] text-[9px] font-bold uppercase tracking-wider">
                            {item.category}
                          </span>
                        </div>

                        <h3 className="font-extrabold text-[15px] leading-snug line-clamp-2 tracking-tight mb-2.5">
                          {item.title}
                        </h3>

                        <div className="flex flex-wrap gap-1.5 mb-3">
                          {tags.slice(0, 3).map((t) => (
                            <span key={t} className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/[0.1] border border-white/[0.15] text-[9px] font-bold">
                              <Award className="w-2.5 h-2.5 text-amber-300" /> {t}
                            </span>
                          ))}
                        </div>

                        <div className="w-full h-10 rounded-2xl bg-white/[0.12] backdrop-blur-md border border-white/[0.15] flex items-center justify-center gap-1.5 text-[12px] font-bold text-white shadow-[0_8px_24px_-6px_rgba(0,0,0,0.5)]">
                          <BookOpen className="w-3.5 h-3.5" /> Revise
                        </div>
                      </div>
                    </div>
                  </motion.a>
                );
              })}
            </div>
            {topFive.length > 1 && (
              <div className="flex justify-center gap-1.5 -mt-4">
                {topFive.map((_, i) => (
                  <span key={i} className={`h-1.5 rounded-full transition-all ${i === activeTop ? "w-6 bg-white" : "w-1.5 bg-white/30"}`} />
                ))}
              </div>
            )}
          </section>
        )}

        {/* === 3. CLEAN VERTICAL FEED === */}
        {displayItems.length > 0 && (
          <section className="px-4 space-y-4 pb-4">
            <div className="flex items-center gap-2">
              <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/50 flex items-center gap-1.5">
                <Newspaper className="w-3 h-3" /> All Updates
              </div>
              <span className="ml-auto text-[10px] text-white/35 font-medium">{displayItems.length} items</span>
            </div>
            {displayItems.map((item, i) => {
              const grad = CATEGORY_GRADIENTS[item.category] || "from-violet-500 to-fuchsia-600";
              const isBookmarked = bookmarks.has(item.id);
              const bullets = bulletize(item.summary, 3);
              const tags = examTags(item.category);
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: Math.min(i * 0.04, 0.4), duration: 0.35 }}
                  whileTap={{ scale: 0.98 }}
                  className="group relative rounded-[20px] bg-white/[0.04] border border-white/[0.07] overflow-hidden shadow-[0_4px_24px_-8px_rgba(0,0,0,0.4)]"
                >
                  {/* Left accent line */}
                  <div className={`absolute top-3 bottom-3 left-0 w-[3px] rounded-full bg-gradient-to-b ${grad}`} />

                  <a href={item.sourceUrl} target="_blank" rel="noreferrer" className="block p-5 pl-5">
                    {/* Category + time row */}
                    <div className="flex items-center gap-2 mb-2.5">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-md bg-gradient-to-r ${grad} text-[9px] font-bold uppercase tracking-wider text-white`}>
                        {item.category}
                      </span>
                      <span className="text-[9px] text-white/35 ml-auto">{timeAgo(item.pubDate)}</span>
                      <button
                        onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleBookmark(item.id); }}
                        className="w-7 h-7 rounded-lg bg-white/[0.05] flex items-center justify-center shrink-0"
                      >
                        <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? "fill-cyan-300 text-cyan-300" : "text-white/30"}`} />
                      </button>
                    </div>

                    {/* Title */}
                    <h3 className="font-bold text-[14px] leading-snug line-clamp-2 text-white/90 tracking-tight mb-2.5">
                      {item.title}
                    </h3>

                    {/* Bullets */}
                    {bullets.length > 0 && (
                      <ul className="space-y-1 mb-3">
                        {bullets.map((b, k) => (
                          <li key={k} className="flex items-start gap-2 text-[11px] leading-snug text-white/55">
                            <span className="mt-1.5 w-1 h-1 shrink-0 rounded-full bg-cyan-400/50" />
                            <span className="line-clamp-1">{b}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    {/* Why it matters */}
                    <p className="text-[10px] text-white/40 mb-3">
                      <span className="text-amber-300/70 font-semibold">Why it matters:</span>{" "}
                      Likely asked in {tags.join(", ")} exams
                    </p>

                    {/* Read CTA */}
                    <span className="inline-flex items-center gap-1 text-[12px] font-semibold text-cyan-300/80 group-hover:text-cyan-200 transition-colors">
                      Read <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                  </a>
                </motion.div>
              );
            })}
          </section>
        )}
      </main>
    </div>
  );
};

export default CurrentAffairs;
