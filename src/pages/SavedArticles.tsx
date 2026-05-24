import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Trash2, ExternalLink, BookmarkX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface SavedArticle {
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  source: { name: string };
  category: string;
  language?: string;
}

const SavedArticles = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [articles, setArticles] = useState<SavedArticle[]>([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('savedArticles') || '[]');
    setArticles(saved.reverse());
  }, []);

  const removeArticle = (url: string) => {
    const updated = articles.filter(a => a.url !== url);
    setArticles(updated);
    localStorage.setItem('savedArticles', JSON.stringify([...updated].reverse()));
    toast({ title: "Article removed" });
  };

  const clearAll = () => {
    setArticles([]);
    localStorage.setItem('savedArticles', JSON.stringify([]));
    toast({ title: "All saved articles cleared" });
  };

  return (
    <div className="min-h-[100dvh] bg-background pb-24">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate(-1)} className="p-1.5 rounded-full hover:bg-accent">
              <ArrowLeft className="w-5 h-5 text-foreground" />
            </button>
            <h1 className="text-lg font-bold text-foreground">Saved Articles</h1>
          </div>
          {articles.length > 0 && (
            <Button variant="ghost" size="sm" onClick={clearAll} className="text-destructive text-xs">
              <Trash2 className="w-3.5 h-3.5 mr-1" />
              Clear All
            </Button>
          )}
        </div>
      </div>

      {articles.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-[60vh] px-8 text-center">
          <BookmarkX className="w-16 h-16 text-muted-foreground/40 mb-4" />
          <p className="text-lg font-semibold text-foreground mb-1">No saved articles</p>
          <p className="text-sm text-muted-foreground">Tap the bookmark icon on any news article to save it here</p>
        </div>
      ) : (
        <div className="px-4 py-3 space-y-3">
          {articles.map((article, idx) => (
            <div key={idx} className="bg-card rounded-xl border border-border overflow-hidden">
              <div className="flex gap-3 p-3">
                <img 
                  src={article.urlToImage || 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=200'}
                  alt=""
                  className="w-20 h-20 rounded-lg object-cover flex-shrink-0"
                  loading="lazy"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-muted-foreground mb-1">
                    {article.category || 'News'}
                  </p>
                  <h3 className="text-sm font-semibold text-foreground line-clamp-2 leading-snug">
                    {article.title}
                  </h3>
                  <div className="flex items-center gap-2 mt-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-7 text-[11px] px-2.5 rounded-full"
                      onClick={() => window.open(article.url, '_blank')}
                    >
                      <ExternalLink className="w-3 h-3 mr-1" />
                      Read
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-7 text-[11px] px-2 text-destructive"
                      onClick={() => removeArticle(article.url)}
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SavedArticles;
