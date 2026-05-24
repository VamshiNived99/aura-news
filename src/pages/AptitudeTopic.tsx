import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, BookOpen, ChevronRight } from "lucide-react";
import { aptitudeData } from "@/data/aptitude";

const AptitudeTopic = () => {
  const navigate = useNavigate();
  const { categoryId, topicId } = useParams();

  const category = aptitudeData.find(c => c.id === categoryId);
  const topic = category?.topics.find(t => t.id === topicId);

  if (!category || !topic) {
    return (
      <div className="min-h-[100dvh] w-full bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Topic not found</p>
      </div>
    );
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-500/10 text-green-600 border-green-500/20';
      case 'medium': return 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20';
      case 'hard': return 'bg-red-500/10 text-red-600 border-red-500/20';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const handleSubtopicClick = (subtopic: string) => {
    const params = new URLSearchParams({
      topic: subtopic,
      subject: `${category.name} - ${topic.name}`,
      unit: topic.name,
    });
    navigate(`/exam-prep/aptitude/${categoryId}/${topicId}/content?${params.toString()}`);
  };

  return (
    <div className="min-h-[100dvh] w-full bg-background pb-24">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border safe-area-top">
        <div className={`h-1 bg-gradient-to-r ${category.gradient}`} />
        <div className="flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 sm:py-3">
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8 sm:h-9 sm:w-9"
            onClick={() => navigate(`/exam-prep/aptitude/${categoryId}`)}
          >
            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          </Button>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-0.5">
              <span className="text-base sm:text-lg">{topic.icon}</span>
              <h1 className="text-sm sm:text-base font-bold truncate">{topic.name}</h1>
            </div>
            <p className="text-[10px] sm:text-xs text-muted-foreground truncate">{category.name}</p>
          </div>
          <Badge variant="outline" className={`text-[9px] sm:text-[10px] ${getDifficultyColor(topic.difficulty)}`}>
            {topic.difficulty}
          </Badge>
        </div>
      </header>

      {/* Topic Info */}
      <div className="w-full px-3 sm:px-4 py-3 sm:py-4">
        <div className="bg-card rounded-xl border border-border p-3 sm:p-4 mb-4">
          <p className="text-xs sm:text-sm text-muted-foreground">{topic.description}</p>
        </div>

        {/* Subtopics */}
        <h3 className="text-sm sm:text-base font-semibold mb-3 px-1">
          Subtopics ({topic.subtopics.length})
        </h3>
        <div className="space-y-2">
          {topic.subtopics.map((subtopic, idx) => (
            <button
              key={idx}
              onClick={() => handleSubtopicClick(subtopic)}
              className="w-full flex items-center gap-2 sm:gap-3 p-3 sm:p-4 rounded-xl bg-card border border-border hover:shadow-md transition-all text-left active:scale-[0.99] touch-target"
            >
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <BookOpen className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary" />
              </div>
              <span className="text-xs sm:text-sm flex-1 line-clamp-2">{subtopic}</span>
              <ChevronRight className="w-4 h-4 text-muted-foreground flex-shrink-0" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AptitudeTopic;
