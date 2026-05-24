import { useNavigate, useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, BookOpen, GraduationCap } from "lucide-react";
import { engineeringData } from "@/data/engineering";

const BranchYears = () => {
  const navigate = useNavigate();
  const { branchId } = useParams();

  const branchData = branchId ? engineeringData[branchId] || [] : [];

  const getBranchName = () => {
    const names: Record<string, string> = {
      'cse-aiml': 'CSE - AI & ML',
      'cse': 'CSE',
      'ece': 'ECE',
      'eee': 'EEE',
      'civil': 'Civil',
      'mechanical': 'Mechanical'
    };
    return names[branchId || ''] || 'Engineering';
  };

  // Count total subjects across all semesters for a year
  const getTotalSubjects = (yearData: typeof branchData[0]) => {
    return yearData.semesters.reduce((acc, sem) => acc + sem.subjects.length, 0);
  };

  return (
    <div className="min-h-[100dvh] w-full bg-background pb-24">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="flex items-center gap-3 px-4 py-3">
          <Button variant="ghost" size="icon" onClick={() => navigate('/exam-prep/engineering')}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-lg font-bold">{getBranchName()}</h1>
            <p className="text-xs text-muted-foreground">Select your year</p>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="w-full px-4 py-4 space-y-3">
        {branchData.length > 0 ? (
          branchData.map((yearData, idx) => (
            <Card
              key={idx}
              className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:border-primary/50"
              onClick={() => navigate(`/exam-prep/engineering/${branchId}/${idx}`)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center text-primary-foreground font-bold text-lg">
                      {idx + 1}
                    </div>
                    <div>
                      <CardTitle className="text-lg">{yearData.year}</CardTitle>
                      <p className="text-sm text-muted-foreground">{yearData.semesters.length} Semesters</p>
                    </div>
                  </div>
                  <Badge variant="secondary">
                    <GraduationCap className="w-3 h-3 mr-1" />
                    {getTotalSubjects(yearData)} Subjects
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {yearData.semesters.map((semester, semIdx) => (
                    <Badge key={semIdx} variant="outline" className="text-xs">
                      Sem {semester.semester}: {semester.subjects.length} subjects
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <Card>
            <CardContent className="pt-6 text-center">
              <BookOpen className="w-12 h-12 mx-auto mb-3 text-muted-foreground" />
              <p className="text-muted-foreground">Syllabus data coming soon...</p>
              <p className="text-sm text-muted-foreground mt-2">
                We're working on adding {getBranchName()} syllabus
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default BranchYears;
