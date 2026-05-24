import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, BookOpen, ChevronRight } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { engineeringData } from "@/data/engineering";

const SubjectDetails = () => {
  const navigate = useNavigate();
  const { branchId, yearIndex, semesterIndex, subjectIndex } = useParams();

  const branchData = branchId ? engineeringData[branchId] || [] : [];
  const yearData = branchData[parseInt(yearIndex || '0')];
  const semesterData = yearData?.semesters[parseInt(semesterIndex || '0')];
  const subject = semesterData?.subjects[parseInt(subjectIndex || '0')];

  if (!yearData || !semesterData || !subject) {
    return <div className="min-h-[100dvh] w-full bg-background flex items-center justify-center">Subject not found</div>;
  }

  const handleChapterClick = (chapter: string, unitName: string) => {
    const params = new URLSearchParams({
      topic: chapter,
      subject: subject.name,
      unit: unitName,
    });
    navigate(`/exam-prep/engineering/${branchId}/${yearIndex}/${semesterIndex}/${subjectIndex}/content?${params.toString()}`);
  };

  return (
    <div className="min-h-[100dvh] w-full bg-background pb-24">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border safe-area-top">
        <div className="flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 sm:py-3">
          <Button 
            variant="ghost" 
            size="icon"
            className="h-8 w-8 sm:h-9 sm:w-9"
            onClick={() => navigate(`/exam-prep/engineering/${branchId}/${yearIndex}/${semesterIndex}`)}
          >
            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          </Button>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-0.5">
              <Badge variant="outline" className="text-[10px] sm:text-xs font-mono">
                {subject.code}
              </Badge>
            </div>
            <h1 className="text-sm sm:text-base font-bold truncate">{subject.name}</h1>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="w-full px-3 sm:px-4 py-3 sm:py-4">
        <div className="mb-3 sm:mb-4">
          <p className="text-xs sm:text-sm text-muted-foreground">
            {yearData.year} • Semester {semesterData.semester}
          </p>
        </div>

        <Accordion type="single" collapsible className="space-y-2">
          {subject.units.map((unit) => (
            <AccordionItem
              key={unit.unitNumber}
              value={`unit-${unit.unitNumber}`}
              className="border rounded-lg px-3 sm:px-4 bg-card"
            >
              <AccordionTrigger className="hover:no-underline py-3 sm:py-4">
                <div className="flex items-center gap-2 sm:gap-3 text-left">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-xs sm:text-sm font-semibold text-primary">{unit.unitNumber}</span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm sm:text-base font-medium">Unit {unit.unitNumber}</p>
                    <p className="text-xs sm:text-sm text-muted-foreground truncate">{unit.unitName}</p>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pb-3 sm:pb-4 pt-2">
                <div className="ml-9 sm:ml-11 space-y-2">
                  <p className="text-xs sm:text-sm font-medium text-muted-foreground mb-2">Tap to learn:</p>
                  {unit.chapters.map((chapter, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleChapterClick(chapter, `Unit ${unit.unitNumber}: ${unit.unitName}`)}
                      className="w-full flex items-center gap-2 p-2 sm:p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors text-left touch-target"
                    >
                      <BookOpen className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary flex-shrink-0" />
                      <span className="text-xs sm:text-sm flex-1 line-clamp-2">{chapter}</span>
                      <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-muted-foreground flex-shrink-0" />
                    </button>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
};

export default SubjectDetails;
