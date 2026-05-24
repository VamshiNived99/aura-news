import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ChevronRight } from "lucide-react";
import { aptitudeData } from "@/data/aptitude";

const AptitudeCategory = () => {
  const navigate = useNavigate();
  const { categoryId } = useParams();

  const category = aptitudeData.find(c => c.id === categoryId);

  if (!category) {
    return (
      <div className="min-h-[100dvh] w-full bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Category not found</p>
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
            onClick={() => navigate('/exam-prep/aptitude')}
          >
            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          </Button>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-lg sm:text-xl">{category.icon}</span>
              <h1 className="text-sm sm:text-base font-bold truncate">{category.name}</h1>
            </div>
            <p className="text-[10px] sm:text-xs text-muted-foreground">{category.topics.length} topics to master</p>
          </div>
        </div>
      </header>

      {/* Topics List */}
      <div className="w-full px-3 sm:px-4 py-3 sm:py-4 space-y-2 sm:space-y-3">
        {category.topics.map((topic, index) => (
          <button
            key={topic.id}
            onClick={() => navigate(`/exam-prep/aptitude/${categoryId}/${topic.id}`)}
            className="w-full bg-card rounded-xl border border-border p-3 sm:p-4 flex items-start gap-3 text-left hover:shadow-md transition-all active:scale-[0.99]"
          >
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 text-base sm:text-lg">
              {topic.icon}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2 mb-1">
                <h3 className="text-sm sm:text-base font-medium">{topic.name}</h3>
                <Badge variant="outline" className={`text-[9px] sm:text-[10px] ${getDifficultyColor(topic.difficulty)}`}>
                  {topic.difficulty}
                </Badge>
              </div>
              <p className="text-[10px] sm:text-xs text-muted-foreground line-clamp-2 mb-2">
                {topic.description}
              </p>
              <div className="flex items-center gap-1 text-[10px] sm:text-xs text-muted-foreground">
                <span>{topic.subtopics.length} subtopics</span>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground flex-shrink-0 mt-1" />
          </button>
        ))}
      </div>
    </div>
  );
};

export default AptitudeCategory;
