import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { BookOpen, CheckCircle, Lightbulb, Calculator, FileText, BookMarked, Award, TrendingUp, Brain } from "lucide-react";
import { TopicContent } from "@/lib/contentService";
import { ConceptMap } from "./ConceptMap";
import { FlowchartDiagram } from "./FlowchartDiagram";
import { ComparisonTable } from "./ComparisonTable";
import { MnemonicCard } from "./MnemonicCard";
import { FormulaCard } from "./FormulaCard";
import { WorkedExample } from "./WorkedExample";
import { QuickRevision } from "./QuickRevision";
import { PracticeQuestion } from "./PracticeQuestion";

interface ContentDisplayProps {
  content: TopicContent;
}

export const ContentDisplay = ({ content }: ContentDisplayProps) => {
  return (
    <div className="space-y-4">
      {/* Introduction */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-primary" /> {content.title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground leading-relaxed">{content.introduction}</p>
          {content.bookReferences && content.bookReferences.length > 0 && (
            <div className="flex items-center gap-2 mt-3 flex-wrap">
              <BookMarked className="w-3 h-3 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">References:</span>
              {content.bookReferences.slice(0, 3).map((book, i) => (
                <Badge key={i} variant="secondary" className="text-[10px]">{book}</Badge>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Concept Map */}
      {content.conceptMap && content.conceptMap.nodes?.length > 0 && (
        <ConceptMap title={content.conceptMap.title} nodes={content.conceptMap.nodes} />
      )}

      {/* Formulas */}
      {content.formulas && content.formulas.length > 0 && (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <Calculator className="w-4 h-4 text-blue-600" /> Important Formulas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <FormulaCard formulas={content.formulas} />
          </CardContent>
        </Card>
      )}

      {/* Mnemonics */}
      {content.mnemonics && content.mnemonics.length > 0 && (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <Brain className="w-4 h-4 text-amber-600" /> Memory Tricks & Mnemonics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <MnemonicCard mnemonics={content.mnemonics} />
          </CardContent>
        </Card>
      )}

      {/* Sections */}
      <Accordion type="single" collapsible className="space-y-3">
        {content.sections?.map((section, index) => (
          <AccordionItem key={index} value={`section-${index}`} className="border rounded-xl px-4 bg-card">
            <AccordionTrigger className="hover:no-underline">
              <span className="text-sm font-semibold text-left">{section.heading}</span>
            </AccordionTrigger>
            <AccordionContent className="space-y-4 pt-2">
              <p className="text-sm text-muted-foreground whitespace-pre-line leading-relaxed">{section.content}</p>
              
              {/* Section Diagram */}
              {section.diagram && section.diagram.steps?.length > 0 && (
                <FlowchartDiagram
                  title={section.diagram.title}
                  type={section.diagram.type}
                  steps={section.diagram.steps}
                />
              )}
              
              {/* Key Points */}
              {section.keyPoints && section.keyPoints.length > 0 && (
                <div className="bg-primary/5 rounded-xl p-4">
                  <h5 className="font-semibold text-xs mb-3 flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-primary" /> Key Points
                  </h5>
                  <ul className="space-y-2">
                    {section.keyPoints.map((point, i) => (
                      <li key={i} className="text-xs flex items-start gap-2">
                        <span className="w-5 h-5 bg-primary/20 rounded-full flex items-center justify-center text-[10px] font-bold text-primary flex-shrink-0">
                          {i + 1}
                        </span>
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Common Mistakes */}
              {section.commonMistakes && section.commonMistakes.length > 0 && (
                <div className="bg-red-500/5 rounded-xl p-4 border border-red-500/20">
                  <h5 className="font-semibold text-xs mb-2 text-red-600 flex items-center gap-2">
                    ⚠️ Common Mistakes to Avoid
                  </h5>
                  <ul className="space-y-1">
                    {section.commonMistakes.map((mistake, i) => (
                      <li key={i} className="text-xs text-red-700/80 flex items-start gap-2">
                        <span>•</span> {mistake}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Worked Examples */}
              {section.examples && section.examples.length > 0 && (
                <div className="space-y-3">
                  <h5 className="font-semibold text-sm flex items-center gap-2">
                    <FileText className="w-4 h-4 text-green-600" /> Worked Examples
                  </h5>
                  <WorkedExample examples={section.examples} />
                </div>
              )}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      {/* Comparison Table */}
      {content.comparisonTable && content.comparisonTable.rows?.length > 0 && (
        <ComparisonTable
          title={content.comparisonTable.title}
          headers={content.comparisonTable.headers}
          rows={content.comparisonTable.rows}
        />
      )}

      {/* Quick Revision */}
      {content.quickRevision && content.quickRevision.length > 0 && (
        <QuickRevision points={content.quickRevision} />
      )}

      {/* Summary */}
      {content.summary && (
        <Card className="bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">📝 Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm leading-relaxed">{content.summary}</p>
          </CardContent>
        </Card>
      )}

      {/* Exam Insights */}
      {content.examInsights && (
        <Card className="bg-gradient-to-r from-purple-500/5 to-violet-500/10 border-purple-500/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-purple-600" /> Exam Insights
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">{content.examInsights}</p>
          </CardContent>
        </Card>
      )}

      {/* Study Tips */}
      {content.studyTips && content.studyTips.length > 0 && (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <Lightbulb className="w-4 h-4 text-amber-500" /> Study Tips
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {content.studyTips.map((tip, index) => (
              <div key={index} className="flex items-start gap-2 p-2 bg-amber-500/10 rounded-lg">
                <span className="text-amber-600">💡</span>
                <p className="text-xs">{tip}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Previous Year Questions */}
      {content.previousYearQuestions && content.previousYearQuestions.length > 0 && (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <Award className="w-4 h-4 text-indigo-600" /> Previous Year Questions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {content.previousYearQuestions.map((pyq, index) => (
              <div key={index} className="p-3 bg-muted/30 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="outline" className="text-[10px]">{pyq.exam}</Badge>
                  <Badge variant="secondary" className="text-[10px]">{pyq.year}</Badge>
                </div>
                <p className="text-xs font-medium mb-2">{pyq.question}</p>
                <p className="text-xs text-muted-foreground">
                  <span className="font-semibold text-green-600">Answer:</span> {pyq.answer}
                </p>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Practice Questions */}
      {content.practiceQuestions && content.practiceQuestions.length > 0 && (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">🎯 Practice Questions</CardTitle>
          </CardHeader>
          <CardContent>
            <PracticeQuestion questions={content.practiceQuestions} />
          </CardContent>
        </Card>
      )}

      {/* Related Topics */}
      {content.relatedTopics && content.relatedTopics.length > 0 && (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">📚 Related Topics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {content.relatedTopics.map((topic, index) => (
                <Badge key={index} variant="outline" className="text-xs">{topic}</Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ContentDisplay;