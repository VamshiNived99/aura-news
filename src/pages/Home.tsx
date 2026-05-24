import { useState, useEffect, useCallback, useRef } from "react";
import { Moon, Sun } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useTheme } from "next-themes";
import { useToast } from "@/hooks/use-toast";
import { ReelsView } from "@/components/ReelsView";
import { useNotifications } from "@/hooks/useNotifications";
import { getCachedNews, setCachedNews } from "@/lib/newsCache";

interface NewsArticle {
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  source: { name: string };
  category: string;
}

const Home = () => {
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();
  const { toast } = useToast();
  const { notifyBreakingNews } = useNotifications();
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [isWorldwide, setIsWorldwide] = useState(false);
  const [nextPageToken, setNextPageToken] = useState<string>('');
  const [seenUrls, setSeenUrls] = useState<Set<string>>(new Set());
  // Progressive fallback so Home never dead-ends after pagination exhausts.
  // 0=normal, 1=trending query (48h), 2=top stories (72h), 3=worldwide trending.
  const [fallbackLevel, setFallbackLevel] = useState<number>(0);
  // Cycle counter — loops queries forever so feed never dead-ends.
  const [cycleCount, setCycleCount] = useState<number>(0);

  useEffect(() => {
    const cacheKey = `home_${isWorldwide ? 'world' : 'india'}`;
    const cached = getCachedNews(cacheKey);
    if (cached && cached.articles.length > 0) {
      setArticles(cached.articles);
      setNextPageToken(cached.nextPageToken);
      setSeenUrls(new Set(cached.articles.map((a: NewsArticle) => a.url)));
      setHasMore(!!cached.nextPageToken);
      setLoading(false);
      return;
    }
    setArticles([]);
    setNextPageToken('');
    setSeenUrls(new Set());
    setHasMore(true);
    setFallbackLevel(0);
    setCycleCount(0);
    fetchNews(true);
  }, [isWorldwide]);

  const fetchNews = async (isInitial = false, pageToken = '') => {
    if (isInitial) setLoading(true); else setLoadingMore(true);

    try {
      // Build fallback request based on current level so the feed keeps
      // surfacing content even after primary pagination is exhausted.
      const ROTATE = isWorldwide
        ? ['world breaking news', 'world latest headlines', 'top global stories today', 'world politics today', 'world business news', 'world technology news']
        : ['India breaking news', 'India latest headlines', 'India top stories today', 'India politics today', 'India business news', 'India sports news'];
      const fbQuery =
        fallbackLevel === 0 ? (cycleCount === 0 ? '' : ROTATE[cycleCount % ROTATE.length])
        : fallbackLevel === 1 ? (isWorldwide ? 'world trending news' : 'India trending news')
        : fallbackLevel === 2 ? (isWorldwide ? 'world top stories today' : 'India top stories today')
        : ROTATE[(cycleCount + fallbackLevel) % ROTATE.length];
      const fbMaxAge = fallbackLevel === 0 ? 24 : fallbackLevel === 1 ? 48 : 72;
      const fbCountry = fallbackLevel >= 3 ? 'worldwide' : (isWorldwide ? 'worldwide' : 'in');
      const { data, error } = await supabase.functions.invoke('fetch-news', {
        body: {
          language: 'en',
          country: fbCountry,
          nextPage: pageToken,
          maxAgeHours: fbMaxAge,
          ...(fbQuery ? { query: fbQuery } : {}),
        },
      });
      if (error) throw error;

      if (data?.articles && data.articles.length > 0) {
        const newArticles = data.articles.filter((a: NewsArticle) => !seenUrls.has(a.url));
        const newSeenUrls = new Set(seenUrls);
        newArticles.forEach((a: NewsArticle) => newSeenUrls.add(a.url));
        setSeenUrls(newSeenUrls);

        if (isInitial && fallbackLevel === 0) {
          setArticles(newArticles);
          setCachedNews(`home_${isWorldwide ? 'world' : 'india'}`, newArticles, data.nextPage || '');
        } else {
          setArticles(prev => {
            const merged = [...prev, ...newArticles];
            setCachedNews(`home_${isWorldwide ? 'world' : 'india'}`, merged, data.nextPage || '');
            return merged;
          });
        }
        
        // Check for breaking news notifications
        notifyBreakingNews(newArticles.map((a: NewsArticle) => ({ title: a.title, category: a.category })));

        if (data.nextPage) {
          setNextPageToken(data.nextPage);
          setHasMore(true);
        } else {
          setNextPageToken('');
          // Escalate, or loop back to level 0 with a new cycle so the feed
          // is truly infinite — never dead-ends.
          if (fallbackLevel < 3) {
            setFallbackLevel((l) => l + 1);
          } else {
            setFallbackLevel(0);
            setCycleCount((c) => c + 1);
          }
          setHasMore(true);
        }
      } else {
        // No fresh articles at this level — escalate or loop forever.
        if (fallbackLevel < 3) {
          setFallbackLevel((l) => l + 1);
        } else {
          setFallbackLevel(0);
          setCycleCount((c) => c + 1);
        }
        setNextPageToken('');
        setHasMore(true);
      }
    } catch (error) {
      console.error("Error fetching news:", error);
      // Soft-fail: escalate or loop instead of toasting on every error.
      if (fallbackLevel < 3) {
        setFallbackLevel((l) => l + 1);
      } else {
        setFallbackLevel(0);
        setCycleCount((c) => c + 1);
      }
      setHasMore(true);
    } finally { setLoading(false); setLoadingMore(false); }
  };

  const loadMore = useCallback(() => {
    if (!loadingMore && hasMore) {
      fetchNews(false, nextPageToken);
    }
  }, [loadingMore, hasMore, nextPageToken]);

  // Auto-escalate: when fallbackLevel bumps after exhaustion, fetch the
  // next broader batch so swiping never hits a dead-end.
  useEffect(() => {
    if (fallbackLevel === 0 && cycleCount === 0) return;
    if (loading || loadingMore) return;
    if (!hasMore) return;
    fetchNews(false, '');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fallbackLevel, cycleCount]);

  return (
    <div className="min-h-[100dvh] w-full bg-black relative">
      {/* Floating cinematic header — overlays reel */}
      <header className="fixed top-0 left-0 right-0 z-[55] pointer-events-none">
        <div className="absolute inset-0 h-28 bg-gradient-to-b from-black/70 via-black/30 to-transparent" />
        <div className="relative flex items-center justify-between px-4 pt-[env(safe-area-inset-top,8px)] pb-2 mt-2 pointer-events-auto">
          <h1 className="text-xl font-extrabold tracking-tight drop-shadow-lg">
            <span className="text-primary">AURA</span>
          </h1>
          
          <div className="flex items-center gap-2">
            {/* India/World toggle */}
            <div className="flex bg-white/[0.08] backdrop-blur-xl rounded-full p-0.5 border border-white/[0.1] shadow-lg">
              <button
                onClick={() => setIsWorldwide(false)}
                className={`px-3 py-1.5 rounded-full text-[11px] font-semibold transition-all duration-200 ${
                  !isWorldwide
                    ? 'bg-white/20 text-white shadow-[0_0_10px_rgba(255,255,255,0.1)]'
                    : 'text-white/50 hover:text-white/70'
                }`}
              >
                🇮🇳 India
              </button>
              <button
                onClick={() => setIsWorldwide(true)}
                className={`px-3 py-1.5 rounded-full text-[11px] font-semibold transition-all duration-200 ${
                  isWorldwide
                    ? 'bg-white/20 text-white shadow-[0_0_10px_rgba(255,255,255,0.1)]'
                    : 'text-white/50 hover:text-white/70'
                }`}
              >
                🌍 World
              </button>
            </div>
            
            {/* Theme toggle */}
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="w-8 h-8 rounded-full bg-white/[0.08] backdrop-blur-xl border border-white/[0.1] flex items-center justify-center hover:bg-white/[0.15] transition-colors text-white shadow-lg"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-white/80" /> : <Moon className="w-4 h-4 text-white/80" />}
            </button>
          </div>
        </div>
      </header>

      {/* Content */}
      <ReelsView 
        articles={articles} 
        loading={loading || loadingMore} 
        isWorldwide={isWorldwide}
        onToggleWorldwide={() => setIsWorldwide(!isWorldwide)}
        onLoadMore={loadMore}
        hasMore={hasMore}
        language="en"
        fullHeight={true}
        onArticleView={() => {}}
        onReadFullArticle={() => {}}
      />
    </div>
  );
};

export default Home;
