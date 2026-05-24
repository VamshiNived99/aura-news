import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, Award } from "lucide-react";

interface Question {
  question: string;
  options: Record<string, string> | string[];
  correctAnswer: string | number;
  explanation: string;
  difficulty?: string;
  examSource?: string;
}

interface PracticeQuestionProps {
  questions: Question[];
  className?: string;
}

export const PracticeQuestion = ({ questions, className }: PracticeQuestionProps) => {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string | number>>({});
  const [showResults, setShowResults] = useState<Record<number, boolean>>({});

  if (!questions || questions.length === 0) return null;

  const handleSelect = (qIndex: number, answer: string | number) => {
    if (showResults[qIndex]) return;
    setSelectedAnswers(prev => ({ ...prev, [qIndex]: answer }));
  };

  const checkAnswer = (qIndex: number) => {
    setShowResults(prev => ({ ...prev, [qIndex]: true }));
  };

  const getDifficultyColor = (difficulty?: string) => {
    switch (difficulty?.toLowerCase()) {
      case 'easy':
        return 'border-green-500 text-green-600 bg-green-500/10';
      case 'hard':
        return 'border-red-500 text-red-600 bg-red-500/10';
      default:
        return 'border-amber-500 text-amber-600 bg-amber-500/10';
    }
  };

  const getOptions = (q: Question): [string, string][] => {
    if (Array.isArray(q.options)) {
      return q.options.map((opt, i) => [String.fromCharCode(65 + i), opt]);
    }
    return Object.entries(q.options);
  };

  return (
    <div className={cn("space-y-4", className)}>
      {questions.map((q, qIndex) => {
        const options = getOptions(q);
        const isCorrect = selectedAnswers[qIndex] === q.correctAnswer;

        return (
          <div
            key={qIndex}
            className="rounded-xl border border-border overflow-hidden bg-card"
          >
            {/* Question Header */}
            <div className="px-4 py-3 bg-muted/30 border-b border-border flex items-start justify-between gap-2">
              <p className="text-sm font-medium flex-1">
                <span className="text-primary font-bold mr-2">Q{qIndex + 1}.</span>
                {q.question}
              </p>
              <div className="flex items-center gap-2 flex-shrink-0">
                {q.difficulty && (
                  <Badge variant="outline" className={cn("text-[10px]", getDifficultyColor(q.difficulty))}>
                    {q.difficulty}
                  </Badge>
                )}
                {q.examSource && (
                  <Badge variant="secondary" className="text-[10px]">
                    <Award className="w-3 h-3 mr-1" />
                    {q.examSource}
                  </Badge>
                )}
              </div>
            </div>

            {/* Options */}
            <div className="p-4 space-y-2">
              {options.map(([key, value]) => {
                const isSelected = selectedAnswers[qIndex] === key;
                const isCorrectOption = key === q.correctAnswer;
                const showResult = showResults[qIndex];

                return (
                  <button
                    key={key}
                    onClick={() => handleSelect(qIndex, key)}
                    disabled={showResult}
                    className={cn(
                      "w-full text-left p-3 rounded-lg border text-xs transition-all flex items-center gap-2",
                      showResult
                        ? isCorrectOption
                          ? "bg-green-500/20 border-green-500"
                          : isSelected
                            ? "bg-red-500/20 border-red-500"
                            : "bg-muted/30 border-border"
                        : isSelected
                          ? "bg-primary/20 border-primary"
                          : "bg-muted/30 border-border hover:bg-muted/50"
                    )}
                  >
                    <span className={cn(
                      "w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0",
                      showResult && isCorrectOption
                        ? "bg-green-500 text-white"
                        : showResult && isSelected && !isCorrectOption
                          ? "bg-red-500 text-white"
                          : isSelected
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted"
                    )}>
                      {showResult && isCorrectOption ? (
                        <CheckCircle className="w-4 h-4" />
                      ) : showResult && isSelected && !isCorrectOption ? (
                        <XCircle className="w-4 h-4" />
                      ) : (
                        key
                      )}
                    </span>
                    <span className="flex-1">{value}</span>
                  </button>
                );
              })}
            </div>

            {/* Check Button / Result */}
            <div className="px-4 pb-4">
              {selectedAnswers[qIndex] !== undefined && !showResults[qIndex] && (
                <Button
                  onClick={() => checkAnswer(qIndex)}
                  className="w-full"
                  size="sm"
                >
                  Check Answer
                </Button>
              )}

              {showResults[qIndex] && (
                <div className={cn(
                  "p-3 rounded-lg text-xs",
                  isCorrect ? "bg-green-500/10 border border-green-500/20" : "bg-red-500/10 border border-red-500/20"
                )}>
                  <p className={cn("font-bold mb-1", isCorrect ? "text-green-700" : "text-red-700")}>
                    {isCorrect ? "✓ Correct!" : `✗ Incorrect. Correct answer: ${q.correctAnswer}`}
                  </p>
                  <p className="text-muted-foreground">{q.explanation}</p>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PracticeQuestion;