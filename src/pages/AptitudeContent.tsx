import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Loader2, RefreshCw, XCircle } from "lucide-react";
import { aptitudeData } from "@/data/aptitude";
import { fetchEducationalContent, TopicContent } from "@/lib/contentService";
import { toast } from "sonner";
import ContentDisplay from "@/components/content/ContentDisplay";

const AptitudeContent = () => {
  const navigate = useNavigate();
  const { categoryId } = useParams();
  const [searchParams] = useSearchParams();
  const topic = searchParams.get("topic") || "";
  const subject = searchParams.get("subject") || "";
  
  const category = aptitudeData.find(c => c.id === categoryId);
  
  const [content, setContent] = useState<TopicContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchContent = async () => {
    if (!topic || !subject) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const data = await fetchEducationalContent({
        topic: topic,
        subject: subject,
        unit: category?.name || 'Aptitude',
        examType: 'Government Job Exams (SSC, Banking, Railway)',
        category: 'aptitude'
      });
      setContent(data);
    } catch (err: any) {
      console.error('Error fetching content:', err);
      setError(err.message || 'Failed to load content');
      toast.error('Failed to load content. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContent();
  }, [topic, subject, categoryId]);

  return (
    <div className="min-h-[100dvh] w-full bg-background pb-24">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border safe-area-top">
        {category && <div className={`h-1 bg-gradient-to-r ${category.gradient}`} />}
        <div className="flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 sm:py-3">
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8 sm:h-9 sm:w-9"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          </Button>
          <div className="flex-1 min-w-0">
            <h1 className="text-sm sm:text-base font-bold truncate">{topic}</h1>
            <p className="text-[10px] sm:text-xs text-muted-foreground truncate">{subject}</p>
          </div>
          {!loading && (
            <Button variant="ghost" size="icon" onClick={fetchContent}>
              <RefreshCw className="w-4 h-4" />
            </Button>
          )}
        </div>
      </header>

      {/* Content */}
      <div className="w-full px-3 sm:px-4 py-3 sm:py-4 max-w-2xl mx-auto">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-16 sm:py-20 gap-3 sm:gap-4">
            <Loader2 className="w-6 h-6 sm:w-8 sm:h-8 animate-spin text-primary" />
            <p className="text-muted-foreground text-xs sm:text-sm">Generating premium content...</p>
            <p className="text-muted-foreground text-[10px]">From trusted book sources + AI</p>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center py-16 sm:py-20 gap-3 sm:gap-4">
            <XCircle className="w-12 h-12 text-destructive" />
            <p className="text-destructive text-sm">{error}</p>
            <Button onClick={fetchContent} size="sm">
              <RefreshCw className="w-4 h-4 mr-2" /> Retry
            </Button>
          </div>
        ) : content ? (
          <ContentDisplay content={content} />
        ) : (
          <div className="flex flex-col items-center justify-center py-16 sm:py-20 gap-3 sm:gap-4">
            <p className="text-muted-foreground text-sm">No content available</p>
            <Button onClick={() => navigate(-1)} size="sm">Go Back</Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AptitudeContent;