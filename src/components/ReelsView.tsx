import { motion, PanInfo, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { ExternalLink, Share2, Bookmark, Loader2, Play, Pause, Gauge, AudioLines, MapPin } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import ShareModal from "@/components/ShareModal";
import { createShareContent, ShareContent } from "@/utils/shareUtils";
import { getPreferredSpeechText, speechService } from "@/lib/speechService";
import {
  getCachedResolvedImage,
  getNewsImageCandidates,
  preloadNewsImage,
  rememberResolvedImage,
} from "@/lib/newsImages";
import { preloadTTS } from "@/lib/ttsCache";
import { haptic } from "@/lib/haptics";
import { openArticle } from "@/lib/openArticle";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string;
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string;

interface NewsArticle {
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  source: { name: string };
  category: string;
  language?: string;
  // Optional UI-ready fields enriched by the fetch-news edge function
  id?: string;
  headline?: string;
  summary?: string;
  tts_text?: string;
  duration?: number;
  location?: string;
  // Some sources expose the article image as `image` (e.g. Current Affairs feed).
  // ReelsView accepts either field so Home/Local/CA all behave the same.
  image?: string;
}

interface ReelsViewProps {
  articles: NewsArticle[];
  loading?: boolean;
  isWorldwide?: boolean;
  onToggleWorldwide?: () => void;
  onLoadMore?: () => void;
  hasMore?: boolean;
  language?: string;
  fullHeight?: boolean;
  onArticleView?: () => void;
  onReadFullArticle?: () => void;
  locationLabel?: string;
  /** "local" renders premium hyperlocal styling with smart category chips and a context block. */
  variant?: "default" | "local";
}

const SPEEDS = [1, 1.25, 1.5];

// Match the gradient palette used by Current Affairs so the fallback look
// is consistent across Home, Local and Current Affairs.
const CATEGORY_GRADIENT_FALLBACK: Record<string, string> = {
  national: "from-orange-500 to-red-500",
  politics: "from-orange-500 to-red-500",
  world: "from-blue-500 to-cyan-500",
  international: "from-blue-500 to-cyan-500",
  economy: "from-emerald-500 to-teal-500",
  business: "from-emerald-500 to-teal-500",
  finance: "from-emerald-500 to-teal-500",
  polity: "from-purple-500 to-indigo-500",
  technology: "from-pink-500 to-rose-500",
  tech: "from-pink-500 to-rose-500",
  science: "from-pink-500 to-rose-500",
  sports: "from-amber-500 to-yellow-500",
  entertainment: "from-fuchsia-500 to-purple-500",
  general: "from-primary to-primary/70",
};

function getCategoryGradient(category?: string): string {
  const key = (category || "").trim().toLowerCase();
  for (const k of Object.keys(CATEGORY_GRADIENT_FALLBACK)) {
    if (key.includes(k)) return CATEGORY_GRADIENT_FALLBACK[k];
  }
  return CATEGORY_GRADIENT_FALLBACK.general;
}

const estimateMinutes = (text: string) => {
  const words = (text || "").trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 180));
};

// Derive an editorial-style category chip from the headline + summary.
// Pure heuristic — keeps things instant and free, no extra API.
type LocalChip = { label: string; tone: string };
const LOCAL_CHIP_RULES: Array<{ test: RegExp; label: string; tone: string }> = [
  { test: /\b(breaking|just\s*in|urgent|big\s*news|alert)\b/i, label: "Breaking", tone: "bg-red-500/85 text-white shadow-[0_0_14px_rgba(239,68,68,0.45)]" },
  { test: /\b(traffic|jam|gridlock|diversion|road\s*closed|metro|bus|train|flight\s*(delay|cancel)|highway)\b/i, label: "Traffic Alert", tone: "bg-amber-500/85 text-white shadow-[0_0_14px_rgba(245,158,11,0.45)]" },
  { test: /\b(rain|storm|cyclone|flood|heatwave|temperature|monsoon|weather|imd|forecast|fog)\b/i, label: "Weather", tone: "bg-sky-500/85 text-white shadow-[0_0_14px_rgba(14,165,233,0.45)]" },
  { test: /\b(crime|murder|assault|theft|robbery|arrest|fir|police|fraud|scam)\b/i, label: "Crime Watch", tone: "bg-rose-600/85 text-white shadow-[0_0_14px_rgba(225,29,72,0.4)]" },
  { test: /\b(power\s*cut|water\s*supply|garbage|pothole|sewage|civic|municipal|bmc|ghmc|bbmp|gram\s*panchayat|corporation)\b/i, label: "Civic Issue", tone: "bg-emerald-500/85 text-white shadow-[0_0_14px_rgba(16,185,129,0.4)]" },
  { test: /\b(mla|mp|minister|cm|chief\s*minister|election|poll|bjp|congress|brs|trs|dmk|aap|party|assembly|parliament|mlc)\b/i, label: "Local Politics", tone: "bg-orange-500/85 text-white shadow-[0_0_14px_rgba(249,115,22,0.4)]" },
  { test: /\b(festival|temple|procession|rally|protest|bandh|strike|inauguration)\b/i, label: "Community", tone: "bg-fuchsia-500/85 text-white shadow-[0_0_14px_rgba(217,70,239,0.4)]" },
  { test: /\b(school|college|university|exam|results|admission|recruit|job|vacancy|scholarship)\b/i, label: "Education & Jobs", tone: "bg-indigo-500/85 text-white shadow-[0_0_14px_rgba(99,102,241,0.4)]" },
  { test: /\b(hospital|covid|virus|dengue|health|vaccine|outbreak)\b/i, label: "Health", tone: "bg-teal-500/85 text-white shadow-[0_0_14px_rgba(20,184,166,0.4)]" },
];

function deriveLocalChip(article: NewsArticle | undefined): LocalChip {
  if (!article) return { label: "District Update", tone: "bg-white/15 text-white border border-white/20" };
  const haystack = `${article.headline || article.title || ""} ${article.summary || article.description || ""}`;
  for (const rule of LOCAL_CHIP_RULES) {
    if (rule.test.test(haystack)) return { label: rule.label, tone: rule.tone };
  }
  return { label: "District Update", tone: "bg-white/15 text-white border border-white/20" };
}

export const ReelsView = ({
  articles,
  loading,
  onLoadMore,
  hasMore = true,
  language = "en",
  fullHeight = false,
  onArticleView,
  onReadFullArticle,
  locationLabel,
  variant = "default",
}: ReelsViewProps) => {
  const { toast } = useToast();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [savedArticles, setSavedArticles] = useState<Set<string>>(new Set());
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoadingAudio, setIsLoadingAudio] = useState(false);
  const [progress, setProgress] = useState(0);
  // Default to 1.25x — feels closer to a real news reader's pace.
  const [speedIdx, setSpeedIdx] = useState(1);
  const [showOverlay, setShowOverlay] = useState(false);
  const [resolvedImage, setResolvedImage] = useState<string | null>(null);
  const [showShareModal, setShowShareModal] = useState(false);
  const [shareContent, setShareContent] = useState<ShareContent | null>(null);

  const overlayHideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastTapAt = useRef(0);
  const dragMovedRef = useRef(false);
  const lastTrackedIndex = useRef(-1);
  const fallbackToastKey = useRef<string | null>(null);
  const autoPlayOnChangeRef = useRef(false);
  const playAudioRef = useRef<() => Promise<void>>(async () => {});

  const currentArticle = articles[currentIndex];
  const currentText = useMemo(() => {
    if (!currentArticle) return "";
    // Prefer backend-prepared TTS text (already cleaned + paused) for instant,
    // human-like playback. Fall back to client-side preparation if missing.
    if (currentArticle.tts_text && currentArticle.tts_text.trim().length > 0) {
      return currentArticle.tts_text;
    }
    return getPreferredSpeechText({
      title: currentArticle.title,
      description: currentArticle.description,
      language: currentArticle.language || language,
    });
  }, [currentArticle, language]);
  const minutes = currentArticle?.duration
    ? Math.max(1, Math.round(currentArticle.duration / 60))
    : estimateMinutes(currentText);
  const containerHeight = fullHeight ? "h-[100dvh]" : "h-[calc(100dvh-130px)]";

  const imageCandidates = useMemo(() => {
    if (!currentArticle) return [];
    return getNewsImageCandidates(currentArticle, locationLabel);
  }, [currentArticle, locationLabel]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("savedArticles") || "[]");
    setSavedArticles(new Set(saved.map((a: NewsArticle) => a.url)));
  }, []);

  useEffect(() => {
    if (currentIndex >= articles.length - 5 && hasMore && onLoadMore && !loading) {
      onLoadMore();
    }
  }, [currentIndex, articles.length, hasMore, onLoadMore, loading]);

  useEffect(() => {
    if (currentIndex > 0 && currentIndex !== lastTrackedIndex.current && onArticleView) {
      lastTrackedIndex.current = currentIndex;
      onArticleView();
    }
  }, [currentIndex, onArticleView]);

  const flashOverlay = useCallback(() => {
    setShowOverlay(true);
    if (overlayHideTimer.current) clearTimeout(overlayHideTimer.current);
    overlayHideTimer.current = setTimeout(() => setShowOverlay(false), 2000);
  }, []);

  const stopAudio = useCallback(() => {
    speechService.stop();
    setIsPlaying(false);
    setIsLoadingAudio(false);
    setProgress(0);
  }, []);

  const goNext = useCallback((autoPlay = false) => {
    if (currentIndex < articles.length - 1) {
      autoPlayOnChangeRef.current = autoPlay;
      setDirection(-1);
      setCurrentIndex((p) => p + 1);
    }
  }, [currentIndex, articles.length]);

  const goPrev = useCallback((autoPlay = false) => {
    if (currentIndex > 0) {
      autoPlayOnChangeRef.current = autoPlay;
      setDirection(1);
      setCurrentIndex((p) => p - 1);
    }
  }, [currentIndex]);

  const playAudio = useCallback(async () => {
    if (!currentArticle || !currentText.trim()) return;

    const articleLang = currentArticle.language || language;
    setIsLoadingAudio(true);
    setProgress(0);

    const result = await speechService.speak({
      text: currentText,
      language: articleLang,
      rate: SPEEDS[speedIdx],
      onStart: () => {
        setIsLoadingAudio(false);
        setIsPlaying(true);
        flashOverlay();
      },
      onPauseChange: (paused) => {
        setIsPlaying(!paused);
      },
      onProgress: (value) => {
        setProgress(value);
      },
      onFallback: () => {
        const articleKey = `${currentArticle.url}|${articleLang}`;
        if (fallbackToastKey.current !== articleKey) {
          fallbackToastKey.current = articleKey;
          toast({ description: "Playing in English" });
        }
      },
      onEnd: () => {
        setIsPlaying(false);
        setProgress(1);
        window.setTimeout(() => goNext(true), 260);
      },
      onError: () => {
        setIsLoadingAudio(false);
        setIsPlaying(false);
        setProgress(0);
      },
    });

    if (!result.started) {
      setIsLoadingAudio(false);
      setIsPlaying(false);
      setProgress(0);
    }
  }, [currentArticle, currentText, flashOverlay, goNext, language, speedIdx, toast]);

  playAudioRef.current = playAudio;

  useEffect(() => {
    const cached = currentArticle ? getCachedResolvedImage(currentArticle, locationLabel) : null;
    setResolvedImage(cached || imageCandidates[0] || null);
  }, [currentArticle, imageCandidates, locationLabel]);

  useEffect(() => {
    const shouldAutoPlay = autoPlayOnChangeRef.current;
    autoPlayOnChangeRef.current = false;
    stopAudio();
    if (shouldAutoPlay) {
      // 280ms debounce: if the user keeps swiping, the next stopAudio()
      // cancels this timer before playback ever starts, so we never queue
      // overlapping speech during rapid scrolling.
      const timer = window.setTimeout(() => {
        playAudioRef.current().catch(() => undefined);
      }, 280);
      return () => window.clearTimeout(timer);
    }
  }, [currentIndex, stopAudio]);

  useEffect(() => () => stopAudio(), [stopAudio]);

  useEffect(() => {
    if (!articles.length) return;
    const cleaners = articles
      .slice(currentIndex + 1, currentIndex + 4)
      .map((article) => preloadNewsImage(article, locationLabel));
    return () => {
      cleaners.forEach((clean) => clean());
    };
  }, [articles, currentIndex, locationLabel]);

  // Preload TTS audio for the next 1-2 cards so fast swipes start instantly.
  useEffect(() => {
    if (!articles.length || !SUPABASE_URL || !SUPABASE_KEY) return;
    const upcoming = articles.slice(currentIndex + 1, currentIndex + 3);
    upcoming.forEach((article) => {
      const lang = article.language || language;
      const text = getPreferredSpeechText({
        title: article.title,
        description: article.description,
        language: lang,
      });
      if (!text) return;
      preloadTTS({
        text,
        language: lang,
        speed: SPEEDS[speedIdx],
        supabaseUrl: SUPABASE_URL,
        apiKey: SUPABASE_KEY,
      });
    });
  }, [articles, currentIndex, language, speedIdx]);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      const continuePlayback = isPlaying || isLoadingAudio;
      if (e.deltaY > 30) goNext(continuePlayback);
      else if (e.deltaY < -30) goPrev(continuePlayback);
    };
    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [goNext, goPrev, isLoadingAudio, isPlaying]);

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    if (Number.isNaN(date.getTime()) || diffMs < 0) return "Just now";
    const diffSecs = Math.floor(diffMs / 1000);
    const diffMins = Math.floor(diffMs / 60000);
    const diffHrs = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);
    if (diffSecs < 45) return "Just now";
    if (diffMins < 60) return `${Math.max(1, diffMins)}m ago`;
    if (diffHrs < 24) return `${diffHrs}h ago`;
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString(undefined, { day: "numeric", month: "short" });
  };

  const handleDragEnd = (_e: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    // Use distance OR velocity — matches Instagram's responsive snap feel.
    const distanceThreshold = 60;
    const velocityThreshold = 450;
    const continuePlayback = isPlaying || isLoadingAudio;
    if (Math.abs(info.offset.y) > 8) dragMovedRef.current = true;
    const swipedUp = info.offset.y < -distanceThreshold || info.velocity.y < -velocityThreshold;
    const swipedDown = info.offset.y > distanceThreshold || info.velocity.y > velocityThreshold;
    if (swipedUp) {
      stopAudio();
      haptic.light();
      goNext(continuePlayback);
    } else if (swipedDown) {
      stopAudio();
      haptic.light();
      goPrev(continuePlayback);
    }
  };

  const togglePlay = useCallback(() => {
    if (isLoadingAudio) return;
    const now = Date.now();
    if (now - lastTapAt.current < 250) return;
    lastTapAt.current = now;

    if (speechService.hasActiveSpeech()) {
      const paused = speechService.togglePause();
      if (paused === null) {
        playAudioRef.current().catch(() => undefined);
        return;
      }
      setIsPlaying(!paused);
      flashOverlay();
      return;
    }

    playAudioRef.current().catch(() => undefined);
  }, [flashOverlay, isLoadingAudio]);

  const cycleSpeed = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    const next = (speedIdx + 1) % SPEEDS.length;
    setSpeedIdx(next);
    if (speechService.hasActiveSpeech() && !speechService.isPaused()) {
      speechService.setRate(SPEEDS[next]).catch(() => undefined);
    }
    flashOverlay();
  }, [flashOverlay, speedIdx]);

  const handleCardTap = useCallback(() => {
    if (dragMovedRef.current) {
      dragMovedRef.current = false;
      return;
    }
    togglePlay();
  }, [togglePlay]);

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!currentArticle) return;
    haptic.selection();
    setShareContent(createShareContent(currentArticle.title, currentArticle.url));
    setShowShareModal(true);
  };

  const handleSave = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!currentArticle) return;
    const next = new Set(savedArticles);
    const list = JSON.parse(localStorage.getItem("savedArticles") || "[]");
    if (next.has(currentArticle.url)) {
      next.delete(currentArticle.url);
      localStorage.setItem("savedArticles", JSON.stringify(list.filter((x: NewsArticle) => x.url !== currentArticle.url)));
      haptic.light();
      toast({ title: "Removed from saved" });
    } else {
      next.add(currentArticle.url);
      list.push(currentArticle);
      localStorage.setItem("savedArticles", JSON.stringify(list));
      haptic.success();
      toast({ title: "Saved!" });
    }
    setSavedArticles(next);
  };

  const handleImageError = useCallback(() => {
    if (!resolvedImage) {
      setResolvedImage(imageCandidates[0] || null);
      return;
    }
    const currentPos = imageCandidates.findIndex((candidate) => candidate === resolvedImage);
    const nextCandidate = imageCandidates[currentPos + 1] || null;
    setResolvedImage(nextCandidate);
  }, [imageCandidates, resolvedImage]);

  const handleImageLoad = useCallback(() => {
    if (currentArticle && resolvedImage) {
      rememberResolvedImage(currentArticle, resolvedImage, locationLabel);
    }
  }, [currentArticle, locationLabel, resolvedImage]);

  const variants = {
    // Cinematic crossfade + short slide (Instagram-style snap, not a full-page swipe).
    enter: (d: number) => ({ y: d > 0 ? "-22%" : "22%", opacity: 0, scale: 0.985 }),
    center: { y: 0, opacity: 1, scale: 1 },
    exit: (d: number) => ({ y: d > 0 ? "18%" : "-18%", opacity: 0, scale: 0.985 }),
  };

  // Category accent colors
  const getCategoryAccent = (cat?: string) => {
    const key = (cat || "").toLowerCase();
    if (key.includes("politic") || key.includes("national")) return "bg-red-500/70 text-red-100";
    if (key.includes("tech") || key.includes("science")) return "bg-blue-500/70 text-blue-100";
    if (key.includes("sport")) return "bg-green-500/70 text-green-100";
    if (key.includes("finance") || key.includes("business") || key.includes("economy")) return "bg-amber-500/70 text-amber-100";
    if (key.includes("entertainment")) return "bg-purple-500/70 text-purple-100";
    return "bg-white/15 text-white";
  };

  if (loading && articles.length === 0) {
    return (
      <div className={`${containerHeight} flex items-center justify-center bg-black`}>
        <div className="w-full h-full relative overflow-hidden">
          {/* Shimmer skeleton */}
          <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900" />
          <div className="absolute inset-0 animate-pulse">
            <div className="absolute top-0 left-0 right-0 flex gap-1 px-3 pt-2">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="flex-1 h-[2.5px] rounded-full bg-white/10" />
              ))}
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-5 pb-12 space-y-3">
              <div className="w-16 h-5 rounded-full bg-white/10" />
              <div className="space-y-2">
                <div className="w-[85%] h-6 rounded-lg bg-white/10" />
                <div className="w-[65%] h-6 rounded-lg bg-white/8" />
              </div>
              <div className="rounded-2xl bg-white/[0.05] backdrop-blur-sm p-4 space-y-2">
                <div className="w-full h-3 rounded bg-white/8" />
                <div className="w-[90%] h-3 rounded bg-white/6" />
                <div className="w-[75%] h-3 rounded bg-white/5" />
              </div>
              <div className="w-32 h-10 rounded-full bg-white/10" />
            </div>
          </div>
          {/* Shimmer sweep */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.03] to-transparent animate-[shimmer_2s_infinite]" style={{ animationTimingFunction: 'ease-in-out' }} />
        </div>
      </div>
    );
  }

  if (articles.length === 0 || !currentArticle) {
    return (
      <div className={`${containerHeight} flex items-center justify-center bg-background`}>
        <div className="text-center px-8">
          <div className="text-4xl mb-3">📰</div>
          <p className="text-lg font-semibold text-foreground mb-1">No stories found</p>
          <p className="text-sm text-muted-foreground">Try switching language or region</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`${containerHeight} overflow-hidden relative bg-background select-none`}>
      <motion.div
        key={currentIndex}
        custom={direction}
        variants={variants}
        initial="enter"
        animate="center"
        exit="exit"
        transition={{
          y: { type: "spring", stiffness: 420, damping: 38, mass: 0.7, restDelta: 0.001 },
          scale: { type: "spring", stiffness: 420, damping: 38 },
          opacity: { duration: 0.28, ease: [0.22, 0.61, 0.36, 1] },
        }}
        drag="y"
        dragConstraints={{ top: 0, bottom: 0 }}
        dragElastic={0.22}
        dragMomentum={false}
        onDragEnd={handleDragEnd}
        onTap={handleCardTap}
        className="reel-surface absolute inset-0 w-full h-full cursor-pointer overflow-hidden"
      >
        <div className={`absolute inset-0 w-full h-full ${resolvedImage ? "bg-black" : `bg-gradient-to-br ${getCategoryGradient(currentArticle.category)}`}`}>
          {resolvedImage ? (
            <motion.img
              key={`img-${currentIndex}`}
              src={resolvedImage}
              alt={currentArticle.title}
              loading="eager"
              decoding="async"
              referrerPolicy="no-referrer"
              onLoad={handleImageLoad}
              onError={handleImageError}
              initial={{ scale: 1.06 }}
              animate={{ scale: 1.18 }}
              transition={{ duration: 14, ease: "linear" }}
              className="reel-parallax absolute inset-0 w-full h-full object-cover object-center will-change-transform"
              style={{ filter: 'contrast(1.06) saturate(1.12) brightness(0.96)' }}
            />
          ) : null}
          {/* Layered cinematic gradients — top dim, transparent middle, deep bottom */}
          <div className="absolute inset-x-0 top-0 bg-gradient-to-b from-black/40 via-black/10 to-transparent" style={{ height: '28%' }} />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/95 via-black/65 to-transparent" style={{ height: '60%' }} />
          <div className="absolute inset-0 bg-black/[0.05]" />
        </div>

        <AnimatePresence>
          {(showOverlay || isLoadingAudio) && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 6 }}
              transition={{ duration: 0.18 }}
              className="absolute top-[max(env(safe-area-inset-top,12px),12px)] right-3 z-30 flex items-center gap-2 pointer-events-none"
            >
              <button
                onClick={cycleSpeed}
                className="pointer-events-auto px-2.5 h-7 rounded-full bg-black/35 backdrop-blur-xl border border-white/15 text-white text-[11px] font-semibold flex items-center gap-1 active:scale-95 transition-transform"
                aria-label="Playback speed"
              >
                <Gauge className="w-3 h-3" />
                {SPEEDS[speedIdx]}x
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="relative h-full flex flex-col justify-end text-white">
          {/* Floating content — no box */}
          <div className="px-5 pb-24 pr-16 space-y-2.5">
            {variant === "local" ? (
              <motion.div
                key={`meta-${currentIndex}`}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08, duration: 0.35 }}
                className="flex items-center gap-2"
              >
                {(() => {
                  const chip = deriveLocalChip(currentArticle);
                  return (
                    <span className={`inline-flex items-center px-2.5 py-[3px] rounded-full text-[10px] font-bold uppercase tracking-[0.12em] backdrop-blur-md ${chip.tone}`}>
                      {chip.label}
                    </span>
                  );
                })()}
                <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-white/55">
                  {formatTime(currentArticle.publishedAt)}
                </span>
              </motion.div>
            ) : (
              <motion.div
                key={`meta-${currentIndex}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1, duration: 0.4 }}
                className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-white/55"
              >
                <span className="text-white/75">{currentArticle.category || "News"}</span>
                <span className="w-1 h-1 rounded-full bg-white/25" />
                <span>{formatTime(currentArticle.publishedAt)}</span>
              </motion.div>
            )}

            <motion.h2
              key={`title-${currentIndex}`}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.45, ease: "easeOut" }}
              className="text-[22px] sm:text-[26px] font-extrabold leading-[1.08] tracking-tight drop-shadow-[0_2px_14px_rgba(0,0,0,0.85)] line-clamp-3"
            >
              {(currentArticle.headline || currentArticle.title || "")
                .replace(/\s*[-–—|·•:]\s*[A-Za-z][A-Za-z0-9.&' ]{2,40}$/u, "")
                .replace(/\s+\S*\.(com|in|org|net)\b\.?$/i, "")
                .trim()}
            </motion.h2>

            {(currentArticle.summary || currentArticle.description) && (
              <motion.div
                key={`summary-${currentIndex}`}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25, duration: 0.5, ease: "easeOut" }}
                className="relative"
              >
                <div className="relative">
                  <p className={`text-[13px] leading-[1.6] text-white/75 ${variant === "local" ? "line-clamp-6" : "line-clamp-4"}`} style={{ textShadow: '0 1px 3px rgba(0,0,0,0.55)' }}>
                    {(currentArticle.summary || currentArticle.description || "").replace(/\s*\(([A-Z][a-zA-Z0-9 .&]{2,30})\)\s*$/u, "").trim()}
                  </p>
                  {/* Soft bottom fade so clipped text never feels harsh */}
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-5 bg-gradient-to-t from-black/40 to-transparent" />
                </div>
                {variant === "local" && locationLabel && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.32, duration: 0.4 }}
                    className="mt-2.5 flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/[0.06] backdrop-blur-xl border border-white/[0.08]"
                  >
                    <MapPin className="w-3.5 h-3.5 text-primary shrink-0" />
                    <span className="text-[11.5px] text-white/80 truncate">
                      <span className="text-white/55">Impact area:</span>{" "}
                      <span className="font-semibold text-white/95">{locationLabel}</span>
                    </span>
                  </motion.div>
                )}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onReadFullArticle?.();
                    openArticle(currentArticle.url);
                  }}
                  className="mt-2 inline-flex items-center gap-1 text-[12px] font-semibold text-primary/95 hover:text-primary transition-colors active:scale-95"
                >
                  Open Article
                  <span aria-hidden className="translate-y-[-1px]">→</span>
                </button>
              </motion.div>
            )}

            <motion.div
              key={`listen-${currentIndex}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.4 }}
              className="flex items-center gap-3 mt-1.5"
            >
              <motion.button
                whileTap={{ scale: 0.93 }}
                onClick={(e) => {
                  e.stopPropagation();
                  togglePlay();
                }}
                disabled={isLoadingAudio}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full font-semibold text-[11.5px] text-white bg-white/[0.08] backdrop-blur-2xl border border-white/[0.1] transition-all disabled:opacity-60"
              >
                {isLoadingAudio ? (
                  <Loader2 className="w-3 h-3 animate-spin" />
                ) : isPlaying ? (
                  <>
                    <AudioLines className="w-3 h-3 text-primary animate-pulse" />
                    <span>Playing</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3 h-3 fill-current" />
                    <span>Listen</span>
                  </>
                )}
                <span className="text-white/35">•</span>
                <span className="text-white/55">{minutes}m</span>
              </motion.button>
            </motion.div>
          </div>

          <div className="absolute right-3 bottom-28 flex flex-col gap-4 z-30">
            <motion.button
              whileTap={{ scale: 0.88 }}
              onClick={handleSave}
              onPointerDown={(e) => e.stopPropagation()}
              className={`w-12 h-12 flex items-center justify-center rounded-full backdrop-blur-xl border shadow-lg transition-all ${
                savedArticles.has(currentArticle.url)
                  ? "bg-primary/90 text-primary-foreground border-primary/40 shadow-[0_0_16px_hsl(180_70%_50%/0.4)]"
                  : "bg-white/[0.08] text-white border-white/[0.1] shadow-[0_4px_20px_rgba(0,0,0,0.3)]"
              }`}
              aria-label="Bookmark"
            >
              <Bookmark className={`w-5 h-5 ${savedArticles.has(currentArticle.url) ? "fill-current" : ""}`} />
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.88 }}
              onClick={handleShare}
              onPointerDown={(e) => e.stopPropagation()}
              className="w-12 h-12 flex items-center justify-center rounded-full bg-white/[0.08] backdrop-blur-xl text-white border border-white/[0.1] shadow-[0_4px_20px_rgba(0,0,0,0.3)] transition-all"
              aria-label="Share"
            >
              <Share2 className="w-5 h-5" />
            </motion.button>
          </div>

        {/* Top reel position indicator */}
        </div>

        {/* Instagram-style progress bars */}
        <div className="absolute top-0 left-0 right-0 z-40 flex gap-[3px] px-3 pt-[max(env(safe-area-inset-top,6px),6px)]">
          {articles.slice(0, Math.min(articles.length, 12)).map((_, i) => (
            <div key={i} className="flex-1 h-[2.5px] rounded-full overflow-hidden bg-white/15">
              {i < currentIndex ? (
                <div className="h-full w-full bg-white/80 rounded-full" />
              ) : i === currentIndex ? (
                <motion.div
                  className="h-full rounded-full"
                  style={{
                    width: `${Math.max(0, Math.min(1, progress)) * 100}%`,
                    background: 'linear-gradient(90deg, rgba(255,255,255,0.6), rgba(255,255,255,0.95))',
                    boxShadow: '0 0 6px rgba(255,255,255,0.4)',
                  }}
                  transition={{ ease: "linear" }}
                />
              ) : null}
            </div>
          ))}
        </div>

        {/* Bottom audio progress bar */}
        {(isPlaying || progress > 0) && (
          <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-white/5 z-20">
            <motion.div
              className="h-full bg-gradient-to-r from-primary/80 to-primary"
              style={{ width: `${Math.max(0, Math.min(1, progress)) * 100}%` }}
              transition={{ ease: "linear" }}
            />
          </div>
        )}
      </motion.div>

      {loading && articles.length > 0 && (
        <div className="absolute bottom-20 left-0 right-0 z-20 pointer-events-none">
          <div className="mx-auto w-full max-w-sm px-6">
            <div className="h-[2px] rounded-full overflow-hidden bg-white/10">
              <div className="h-full w-1/3 bg-gradient-to-r from-transparent via-primary/60 to-transparent rounded-full animate-[shimmer_1.5s_ease-in-out_infinite]" />
            </div>
          </div>
        </div>
      )}

      {shareContent && (
        <ShareModal
          isOpen={showShareModal}
          onClose={() => setShowShareModal(false)}
          content={shareContent}
        />
      )}
    </div>
  );
};
