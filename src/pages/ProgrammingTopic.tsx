import { useNavigate, useParams } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Code, ChevronRight } from "lucide-react";
import { programmingLanguages } from "@/data/programmingLanguages";

const ProgrammingTopic = () => {
  const navigate = useNavigate();
  const { langId, topicId } = useParams();

  const language = programmingLanguages.find(l => l.id === langId);
  const topic = language?.topics.find(t => t.id === topicId);

  if (!language || !topic) {
    return (
      <div className="min-h-[100dvh] flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground">Topic not found</p>
          <Button onClick={() => navigate(-1)} className="mt-4">
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[100dvh] w-full bg-background pb-24">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="flex items-center gap-3 px-4 py-3">
          <Button variant="ghost" size="icon" onClick={() => navigate(`/exam-prep/programming/${langId}`)}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex-1">
            <h1 className="text-lg font-bold">{topic.name}</h1>
            <p className="text-xs text-muted-foreground">{language.name}</p>
          </div>
          <span className="text-2xl">{language.icon}</span>
        </div>
      </header>

      {/* Content */}
      <div className="px-4 py-4 space-y-4">
        <div className={`bg-gradient-to-r ${language.color} rounded-xl p-4`}>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center">
              <Code className="w-5 h-5 text-white" />
            </div>
            <div className="text-white">
              <h2 className="font-semibold">{topic.name}</h2>
              <p className="text-xs text-white/80">{topic.subtopics.length} Subtopics</p>
            </div>
          </div>
        </div>

        <h3 className="font-semibold text-sm px-2">Select a subtopic to learn</h3>

        <div className="space-y-2">
          {topic.subtopics.map((subtopic, index) => (
            <Card 
              key={index}
              className="cursor-pointer hover:shadow-md transition-all active:scale-[0.99]"
              onClick={() => navigate(`/exam-prep/programming/${langId}/${topicId}/content?subtopic=${encodeURIComponent(subtopic)}`)}
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-semibold text-primary">
                      {index + 1}
                    </div>
                    <div>
                      <h4 className="font-medium text-sm">{subtopic}</h4>
                      <div className="flex gap-2 mt-1">
                        <Badge variant="outline" className="text-[10px]">
                          Examples
                        </Badge>
                        <Badge variant="secondary" className="text-[10px]">
                          Practice
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProgrammingTopic;