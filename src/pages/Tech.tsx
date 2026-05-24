import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { ReelsView } from "@/components/ReelsView";
import { Cpu } from "lucide-react";
import { getCachedNews, setCachedNews } from "@/lib/newsCache";

interface NewsArticle {
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  source: { name: string };
  category: string;
  language?: string;
}

const Tech = () => {
  const navigate = useNavigate();
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [seenUrls, setSeenUrls] = useState<Set<string>>(new Set());
  const [nextPageToken, setNextPageToken] = useState<string>('');

  useEffect(() => {
    const cached = getCachedNews('tech');
    if (cached && cached.articles.length > 0) {
      setArticles(cached.articles);
      setNextPageToken(cached.nextPageToken);
      setSeenUrls(new Set(cached.articles.map((a: NewsArticle) => a.url)));
      setHasMore(!!cached.nextPageToken);
      setLoading(false);
      return;
    }
    fetchTechNews(true);
  }, []);

  const fetchTechNews = async (isInitial = false, pageToken = '') => {
    if (isInitial) setLoading(true); else setLoadingMore(true);

    try {
      const { data, error } = await supabase.functions.invoke('fetch-news', {
        body: {
          language: 'en',
          country: 'in',
          category: 'technology',
          nextPage: pageToken,
        },
      });

      if (error) throw error;

      if (data?.articles && data.articles.length > 0) {
        const newArticles = data.articles.filter((article: NewsArticle) => !seenUrls.has(article.url));
        const newSeenUrls = new Set(seenUrls);
        newArticles.forEach((a: NewsArticle) => newSeenUrls.add(a.url));
        setSeenUrls(newSeenUrls);

        if (isInitial) {
          setArticles(newArticles);
          setCachedNews('tech', newArticles, data.nextPage || '');
        } else {
          setArticles(prev => {
            const merged = [...prev, ...newArticles];
            setCachedNews('tech', merged, data.nextPage || '');
            return merged;
          });
        }

        if (data.nextPage) setNextPageToken(data.nextPage);
        else setHasMore(false);
      } else {
        if (isInitial) setArticles([]);
        setHasMore(false);
      }
    } catch (error) {
      console.error('Tech news fetch error:', error);
      if (isInitial) setArticles([]);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  const loadMore = useCallback(() => {
    if (!loadingMore && hasMore) {
      fetchTechNews(false, nextPageToken);
    }
  }, [loadingMore, hasMore, nextPageToken]);

  return (
    <div className="min-h-[100dvh] w-full bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/90 backdrop-blur-lg border-b border-border/50">
        <div className="flex items-center gap-2.5 px-4 py-3">
          <div className="w-8 h-8 rounded-full bg-primary/15 flex items-center justify-center">
            <Cpu className="w-4 h-4 text-primary" />
          </div>
          <div>
            <h1 className="text-base font-extrabold tracking-tight text-foreground">Tech News</h1>
            <p className="text-[10px] text-muted-foreground">AI, Startups & Technology</p>
          </div>
        </div>
      </header>

      <ReelsView
        articles={articles}
        loading={loading || loadingMore}
        onLoadMore={loadMore}
        hasMore={hasMore}
        language="en"
        onArticleView={() => {}}
      />
    </div>
  );
};

export default Tech;
