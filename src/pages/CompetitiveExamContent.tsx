import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Loader2, RefreshCw, XCircle } from "lucide-react";
import { competitiveExams } from "@/data/competitiveExams";
import { fetchEducationalContent, TopicContent } from "@/lib/contentService";
import { toast } from "sonner";
import ContentDisplay from "@/components/content/ContentDisplay";

const CompetitiveExamContent = () => {
  const navigate = useNavigate();
  const { examId, topicId } = useParams();
  const [searchParams] = useSearchParams();
  const subtopic = searchParams.get('subtopic') || '';
  
  const [content, setContent] = useState<TopicContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const exam = competitiveExams.find(e => e.id === examId);
  let topic = null;
  let subject = null;

  if (exam) {
    for (const sub of exam.syllabus) {
      const foundTopic = sub.topics.find(t => t.id === topicId);
      if (foundTopic) {
        topic = foundTopic;
        subject = sub.subject;
        break;
      }
    }
  }

  const fetchContent = async () => {
    if (!subtopic || !topic || !subject) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const data = await fetchEducationalContent({
        topic: subtopic,
        subject: subject,
        unit: topic.name,
        examType: exam?.name,
        category: 'competitive-exams'
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
  }, [subtopic, topic, subject, exam?.name]);

  if (!exam || !topic) {
    return (
      <div className="min-h-[100dvh] flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground">Content not found</p>
          <Button onClick={() => navigate(-1)} className="mt-4">Go Back</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[100dvh] w-full bg-background pb-24">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="flex items-center gap-3 px-4 py-3">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex-1">
            <h1 className="text-lg font-bold line-clamp-1">{subtopic}</h1>
            <p className="text-xs text-muted-foreground">{exam.name} • {topic.name}</p>
          </div>
          {!loading && (
            <Button variant="ghost" size="icon" onClick={fetchContent}>
              <RefreshCw className="w-4 h-4" />
            </Button>
          )}
        </div>
      </header>

      {/* Content */}
      <div className="px-4 py-4 max-w-2xl mx-auto">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-16 gap-4">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
            <p className="text-muted-foreground text-sm">Generating premium content...</p>
            <p className="text-muted-foreground text-xs">From trusted book sources + AI</p>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center py-16 gap-4">
            <XCircle className="w-12 h-12 text-destructive" />
            <p className="text-destructive">{error}</p>
            <Button onClick={fetchContent}>
              <RefreshCw className="w-4 h-4 mr-2" /> Retry
            </Button>
          </div>
        ) : content ? (
          <ContentDisplay content={content} />
        ) : null}
      </div>
    </div>
  );
};

export default CompetitiveExamContent;