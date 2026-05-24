import { useNavigate, useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, BookOpen } from "lucide-react";
import { engineeringData } from "@/data/engineering";

const SubjectsList = () => {
  const navigate = useNavigate();
  const { branchId, yearIndex, semesterIndex } = useParams();

  const branchData = branchId ? engineeringData[branchId] || [] : [];
  const yearData = branchData[parseInt(yearIndex || '0')];
  const semesterData = yearData?.semesters[parseInt(semesterIndex || '0')];

  if (!yearData || !semesterData) {
    return <div className="min-h-[100dvh] w-full bg-background flex items-center justify-center">Data not found</div>;
  }

  return (
    <div className="min-h-[100dvh] w-full bg-background pb-24">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="flex items-center gap-3 px-4 py-3">
          <Button variant="ghost" size="icon" onClick={() => navigate(`/exam-prep/engineering/${branchId}/${yearIndex}`)}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="min-w-0 flex-1">
            <h1 className="text-base font-bold truncate">{yearData.year} - Sem {semesterData.semester}</h1>
            <p className="text-xs text-muted-foreground">{semesterData.subjects.length} Subjects</p>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="w-full px-4 py-4 space-y-3">
        {semesterData.subjects.map((subject, idx) => (
          <Card
            key={idx}
            className="cursor-pointer hover:shadow-lg transition-all duration-300"
            onClick={() => navigate(`/exam-prep/engineering/${branchId}/${yearIndex}/${semesterIndex}/${idx}`)}
          >
            <CardHeader className="pb-3">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <BookOpen className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant="outline" className="text-xs font-mono">
                      {subject.code}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg">{subject.name}</CardTitle>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <Badge variant="secondary" className="text-xs">
                  {subject.units.length} Units
                </Badge>
                <Button variant="ghost" size="sm" className="group">
                  <span>View Units</span>
                  <span className="group-hover:translate-x-1 transition-transform ml-2">→</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SubjectsList;
