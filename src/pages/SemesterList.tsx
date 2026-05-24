import { useNavigate, useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, BookOpen, GraduationCap } from "lucide-react";
import { engineeringData } from "@/data/engineering";

const SemesterList = () => {
  const navigate = useNavigate();
  const { branchId, yearIndex } = useParams();

  const branchData = branchId ? engineeringData[branchId] || [] : [];
  const yearData = branchData[parseInt(yearIndex || '0')];

  if (!yearData) {
    return <div className="min-h-[100dvh] w-full bg-background flex items-center justify-center">Year data not found</div>;
  }

  return (
    <div className="min-h-[100dvh] w-full bg-background pb-24">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="flex items-center gap-3 px-4 py-3">
          <Button variant="ghost" size="icon" onClick={() => navigate(`/exam-prep/engineering/${branchId}`)}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-lg font-bold">{yearData.year}</h1>
            <p className="text-xs text-muted-foreground">Select Semester</p>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="w-full px-4 py-4 space-y-4">
        {yearData.semesters.map((semester, idx) => (
          <Card
            key={idx}
            className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:border-primary/50"
            onClick={() => navigate(`/exam-prep/engineering/${branchId}/${yearIndex}/${idx}`)}
          >
            <CardHeader className="pb-3">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5">
                  <GraduationCap className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <CardTitle className="text-xl">Semester {semester.semester}</CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">
                    {yearData.year} - {semester.semester === 1 ? 'First' : 'Second'} Semester
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <Badge variant="secondary" className="text-xs">
                  <BookOpen className="w-3 h-3 mr-1" />
                  {semester.subjects.length} Subjects
                </Badge>
                <Button variant="ghost" size="sm" className="group">
                  <span>View Subjects</span>
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

export default SemesterList;
