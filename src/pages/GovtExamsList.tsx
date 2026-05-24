import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, BookOpen } from "lucide-react";
import { govtExams } from "@/data/govtExams";

const GovtExamsList = () => {
  const navigate = useNavigate();

  const categories = [...new Set(govtExams.map(exam => exam.category))];

  return (
    <div className="min-h-[100dvh] w-full bg-background pb-24">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="flex items-center gap-3 px-4 py-3">
          <Button variant="ghost" size="icon" onClick={() => navigate('/exam-prep')}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-lg font-bold">Government Exams</h1>
            <p className="text-xs text-muted-foreground">Select an exam to start</p>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="w-full px-4 py-4 space-y-6">
        {categories.map(category => (
          <div key={category}>
            <h2 className="text-lg font-semibold mb-3 px-2">{category}</h2>
            <div className="space-y-3">
              {govtExams
                .filter(exam => exam.category === category)
                .map(exam => (
                  <Card
                    key={exam.id}
                    className="cursor-pointer hover:shadow-lg transition-all duration-300"
                    onClick={() => navigate(`/exam-prep/govt-exams/${exam.id}`)}
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3">
                          <div className="p-2 rounded-lg bg-primary/10">
                            <BookOpen className="w-5 h-5 text-primary" />
                          </div>
                          <div>
                            <CardTitle className="text-lg">{exam.name}</CardTitle>
                            <CardDescription className="line-clamp-2 mt-1">
                              {exam.overview}
                            </CardDescription>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <div className="flex gap-2">
                          <Badge variant="secondary" className="text-xs">
                            {exam.syllabus.length} Subjects
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            Age: {exam.ageLimit.split('-')[0]}-{exam.ageLimit.split('-')[1].split(' ')[0]}
                          </Badge>
                        </div>
                        <Button variant="ghost" size="sm">
                          View Details →
                        </Button>
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

export default GovtExamsList;
