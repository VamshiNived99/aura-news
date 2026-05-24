import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft } from "lucide-react";
import { competitiveExams } from "@/data/competitiveExams";

const CompetitiveExamsHome = () => {
  const navigate = useNavigate();
  const categories = [...new Set(competitiveExams.map(e => e.category))];

  return (
    <div className="min-h-[100dvh] w-full bg-background pb-24">
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="flex items-center gap-3 px-4 py-3">
          <Button variant="ghost" size="icon" onClick={() => navigate('/exam-prep')}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-lg font-bold">Competitive Exams</h1>
            <p className="text-xs text-muted-foreground">JEE, NEET, GATE, CAT & more</p>
          </div>
        </div>
      </header>

      <div className="w-full px-4 py-4 space-y-6">
        {categories.map(category => (
          <div key={category}>
            <h2 className="text-base font-semibold mb-3">{category}</h2>
            <div className="space-y-3">
              {competitiveExams.filter(e => e.category === category).map(exam => (
                <Card key={exam.id} className="cursor-pointer hover:shadow-lg transition-all" onClick={() => navigate(`/exam-prep/competitive/${exam.id}`)}>
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{exam.icon}</span>
                      <div>
                        <CardTitle className="text-lg">{exam.name}</CardTitle>
                        <CardDescription className="line-clamp-2 text-xs">{exam.overview.substring(0, 100)}...</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex gap-2 flex-wrap">
                      <Badge variant="secondary" className="text-xs">{exam.syllabus.length} Subjects</Badge>
                      <Badge variant="outline" className="text-xs">Advanced</Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CompetitiveExamsHome;
