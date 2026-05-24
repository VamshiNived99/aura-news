import { useState, useEffect, useCallback } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Clock, CheckCircle, XCircle, AlertTriangle, Trophy, RotateCcw, ChevronLeft, ChevronRight, Flag } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface Question {
  id: string;
  question: string;
  options: { A: string; B: string; C: string; D: string };
  correctAnswer: string;
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

interface MockTestResult {
  totalQuestions: number;
  attempted: number;
  correct: number;
  incorrect: number;
  skipped: number;
  score: number;
  percentage: number;
  timeTaken: number;
  answers: Record<string, string>;
}

const MockTest = () => {
  const navigate = useNavigate();
  const { examType, examId, testId } = useParams();
  const [searchParams] = useSearchParams();
  
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [flagged, setFlagged] = useState<Set<string>>(new Set());
  const [timeLeft, setTimeLeft] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [testStarted, setTestStarted] = useState(false);
  const [testEnded, setTestEnded] = useState(false);
  const [result, setResult] = useState<MockTestResult | null>(null);
  const [showReview, setShowReview] = useState(false);
  const [testInfo, setTestInfo] = useState({ title: '', duration: 0, totalQuestions: 0 });

  // Load test data
  useEffect(() => {
    const loadTest = async () => {
      setIsLoading(true);
      try {
        // Generate mock questions based on exam type
        const mockQuestions = await generateMockQuestions(examType || '', examId || '', testId || '');
        setQuestions(mockQuestions);
        setTestInfo({
          title: searchParams.get('title') || 'Mock Test',
          duration: parseInt(searchParams.get('duration') || '30'),
          totalQuestions: mockQuestions.length
        });
        setTimeLeft(parseInt(searchParams.get('duration') || '30') * 60);
      } catch (error) {
        toast({ title: "Error loading test", variant: "destructive" });
      } finally {
        setIsLoading(false);
      }
    };
    loadTest();
  }, [examType, examId, testId, searchParams]);

  // Timer
  useEffect(() => {
    if (!testStarted || testEnded || timeLeft <= 0) return;
    
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [testStarted, testEnded, timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswer = (questionId: string, answer: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: answer }));
  };

  const toggleFlag = (questionId: string) => {
    setFlagged(prev => {
      const newSet = new Set(prev);
      if (newSet.has(questionId)) {
        newSet.delete(questionId);
      } else {
        newSet.add(questionId);
      }
      return newSet;
    });
  };

  const handleSubmit = useCallback(() => {
    if (testEnded) return;
    
    const timeTaken = (testInfo.duration * 60) - timeLeft;
    let correct = 0;
    let incorrect = 0;
    let skipped = 0;

    questions.forEach(q => {
      if (!answers[q.id]) {
        skipped++;
      } else if (answers[q.id] === q.correctAnswer) {
        correct++;
      } else {
        incorrect++;
      }
    });

    const score = correct * 4 - incorrect; // +4 for correct, -1 for incorrect
    const maxScore = questions.length * 4;
    const percentage = Math.round((correct / questions.length) * 100);

    setResult({
      totalQuestions: questions.length,
      attempted: questions.length - skipped,
      correct,
      incorrect,
      skipped,
      score: Math.max(0, score),
      percentage,
      timeTaken,
      answers
    });
    setTestEnded(true);
  }, [testEnded, testInfo.duration, timeLeft, questions, answers]);

  const goBack = () => {
    if (examType === 'govt') {
      navigate(`/exam-prep/govt-exams/${examId}`);
    } else if (examType === 'competitive') {
      navigate(`/exam-prep/competitive/${examId}`);
    } else if (examType === 'aptitude') {
      navigate(`/exam-prep/aptitude`);
    } else {
      navigate('/exam-prep');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-[100dvh] flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4" />
          <p className="text-muted-foreground">Loading test questions...</p>
        </div>
      </div>
    );
  }

  // Test Start Screen
  if (!testStarted && !testEnded) {
    return (
      <div className="min-h-[100dvh] w-full bg-background pb-24">
        <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
          <div className="flex items-center gap-3 px-4 py-3">
            <Button variant="ghost" size="icon" onClick={goBack}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="text-lg font-bold">{testInfo.title}</h1>
          </div>
        </header>

        <div className="px-4 py-8 max-w-lg mx-auto">
          <Card className="mb-6">
            <CardHeader className="text-center pb-4">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                <Trophy className="w-10 h-10 text-primary" />
              </div>
              <CardTitle className="text-xl">{testInfo.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="p-4 bg-muted/50 rounded-lg">
                  <p className="text-2xl font-bold text-primary">{testInfo.totalQuestions}</p>
                  <p className="text-sm text-muted-foreground">Questions</p>
                </div>
                <div className="p-4 bg-muted/50 rounded-lg">
                  <p className="text-2xl font-bold text-primary">{testInfo.duration} min</p>
                  <p className="text-sm text-muted-foreground">Duration</p>
                </div>
              </div>

              <div className="space-y-2 text-sm">
                <h4 className="font-semibold">Instructions:</h4>
                <ul className="space-y-1 text-muted-foreground">
                  <li>• Each correct answer: +4 marks</li>
                  <li>• Each incorrect answer: -1 mark</li>
                  <li>• Unattempted questions: 0 marks</li>
                  <li>• You can flag questions for review</li>
                  <li>• Timer will auto-submit when time ends</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Button className="w-full" size="lg" onClick={() => setTestStarted(true)}>
            Start Test
          </Button>
        </div>
      </div>
    );
  }

  // Result Screen
  if (testEnded && result) {
    return (
      <div className="min-h-[100dvh] w-full bg-background pb-24">
        <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
          <div className="flex items-center gap-3 px-4 py-3">
            <Button variant="ghost" size="icon" onClick={goBack}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="text-lg font-bold">Test Result</h1>
          </div>
        </header>

        {!showReview ? (
          <div className="px-4 py-6 max-w-lg mx-auto space-y-6">
            {/* Score Card */}
            <Card className="text-center overflow-hidden">
              <div className={`py-6 ${result.percentage >= 70 ? 'bg-green-500/10' : result.percentage >= 40 ? 'bg-yellow-500/10' : 'bg-red-500/10'}`}>
                <div className={`w-24 h-24 mx-auto rounded-full flex items-center justify-center ${result.percentage >= 70 ? 'bg-green-500' : result.percentage >= 40 ? 'bg-yellow-500' : 'bg-red-500'}`}>
                  <span className="text-3xl font-bold text-white">{result.percentage}%</span>
                </div>
                <p className="text-lg font-semibold mt-4">
                  {result.percentage >= 70 ? 'Excellent!' : result.percentage >= 40 ? 'Good Effort!' : 'Keep Practicing!'}
                </p>
              </div>
              <CardContent className="py-6">
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="text-center p-3 bg-muted/50 rounded-lg">
                    <p className="text-xl font-bold">{result.score}</p>
                    <p className="text-xs text-muted-foreground">Total Score</p>
                  </div>
                  <div className="text-center p-3 bg-muted/50 rounded-lg">
                    <p className="text-xl font-bold">{formatTime(result.timeTaken)}</p>
                    <p className="text-xs text-muted-foreground">Time Taken</p>
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-2 text-center">
                  <div className="p-2 rounded-lg bg-muted/50">
                    <p className="text-lg font-bold">{result.totalQuestions}</p>
                    <p className="text-[10px] text-muted-foreground">Total</p>
                  </div>
                  <div className="p-2 rounded-lg bg-green-500/10">
                    <p className="text-lg font-bold text-green-600">{result.correct}</p>
                    <p className="text-[10px] text-muted-foreground">Correct</p>
                  </div>
                  <div className="p-2 rounded-lg bg-red-500/10">
                    <p className="text-lg font-bold text-red-600">{result.incorrect}</p>
                    <p className="text-[10px] text-muted-foreground">Wrong</p>
                  </div>
                  <div className="p-2 rounded-lg bg-yellow-500/10">
                    <p className="text-lg font-bold text-yellow-600">{result.skipped}</p>
                    <p className="text-[10px] text-muted-foreground">Skipped</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline" className="w-full" onClick={() => setShowReview(true)}>
                <CheckCircle className="w-4 h-4 mr-2" /> Review Answers
              </Button>
              <Button className="w-full" onClick={goBack}>
                <RotateCcw className="w-4 h-4 mr-2" /> Back to Exam
              </Button>
            </div>
          </div>
        ) : (
          // Review Mode
          <div className="px-4 py-4 space-y-4 pb-24">
            <Button variant="outline" size="sm" onClick={() => setShowReview(false)} className="mb-2">
              <ArrowLeft className="w-4 h-4 mr-2" /> Back to Results
            </Button>
            
            {questions.map((q, index) => {
              const userAnswer = result.answers[q.id];
              const isCorrect = userAnswer === q.correctAnswer;
              const isSkipped = !userAnswer;

              return (
                <Card key={q.id} className={`${isSkipped ? 'border-yellow-500/50' : isCorrect ? 'border-green-500/50' : 'border-red-500/50'}`}>
                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between">
                      <span className="text-sm font-medium">Q{index + 1}</span>
                      <Badge variant={isSkipped ? 'secondary' : isCorrect ? 'default' : 'destructive'} className={isCorrect ? 'bg-green-500' : ''}>
                        {isSkipped ? 'Skipped' : isCorrect ? 'Correct' : 'Incorrect'}
                      </Badge>
                    </div>
                    <p className="text-sm">{q.question}</p>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {Object.entries(q.options).map(([key, value]) => (
                      <div 
                        key={key} 
                        className={`p-2 rounded-lg text-sm ${
                          key === q.correctAnswer 
                            ? 'bg-green-500/20 border border-green-500' 
                            : userAnswer === key && key !== q.correctAnswer
                              ? 'bg-red-500/20 border border-red-500'
                              : 'bg-muted/50'
                        }`}
                      >
                        <span className="font-medium">{key}.</span> {value}
                        {key === q.correctAnswer && <CheckCircle className="inline w-4 h-4 ml-2 text-green-600" />}
                        {userAnswer === key && key !== q.correctAnswer && <XCircle className="inline w-4 h-4 ml-2 text-red-600" />}
                      </div>
                    ))}
                    <div className="mt-3 p-3 bg-primary/5 rounded-lg">
                      <p className="text-xs font-semibold mb-1">Explanation:</p>
                      <p className="text-xs text-muted-foreground">{q.explanation}</p>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    );
  }

  // Active Test Screen
  const currentQuestion = questions[currentIndex];
  const progress = ((currentIndex + 1) / questions.length) * 100;
  const answeredCount = Object.keys(answers).length;

  return (
    <div className="min-h-[100dvh] w-full bg-background flex flex-col">
      {/* Header with Timer */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="flex items-center justify-between px-4 py-2">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Q {currentIndex + 1}/{questions.length}</span>
          </div>
          <div className={`flex items-center gap-2 px-3 py-1 rounded-full ${timeLeft < 60 ? 'bg-red-500/20 text-red-600' : timeLeft < 300 ? 'bg-yellow-500/20 text-yellow-600' : 'bg-primary/10 text-primary'}`}>
            <Clock className="w-4 h-4" />
            <span className="font-mono font-bold">{formatTime(timeLeft)}</span>
          </div>
        </div>
        <Progress value={progress} className="h-1 rounded-none" />
      </header>

      {/* Question Content */}
      <div className="flex-1 px-4 py-4 overflow-y-auto pb-32">
        <Card className="mb-4">
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              <Badge variant={currentQuestion.difficulty === 'easy' ? 'secondary' : currentQuestion.difficulty === 'medium' ? 'default' : 'destructive'}>
                {currentQuestion.difficulty}
              </Badge>
              <Button
                variant={flagged.has(currentQuestion.id) ? "default" : "ghost"}
                size="sm"
                onClick={() => toggleFlag(currentQuestion.id)}
              >
                <Flag className={`w-4 h-4 ${flagged.has(currentQuestion.id) ? 'fill-current' : ''}`} />
              </Button>
            </div>
            <p className="text-base leading-relaxed mt-3">{currentQuestion.question}</p>
          </CardHeader>
          <CardContent>
            <RadioGroup
              value={answers[currentQuestion.id] || ''}
              onValueChange={(value) => handleAnswer(currentQuestion.id, value)}
              className="space-y-3"
            >
              {Object.entries(currentQuestion.options).map(([key, value]) => (
                <div key={key} className={`flex items-center space-x-3 p-3 rounded-lg border transition-colors ${answers[currentQuestion.id] === key ? 'border-primary bg-primary/5' : 'border-border hover:bg-muted/50'}`}>
                  <RadioGroupItem value={key} id={`option-${key}`} />
                  <Label htmlFor={`option-${key}`} className="flex-1 cursor-pointer text-sm">
                    <span className="font-semibold mr-2">{key}.</span>{value}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </CardContent>
        </Card>

        {/* Question Navigation Grid */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Question Navigator</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-10 gap-1.5">
              {questions.map((q, idx) => (
                <button
                  key={q.id}
                  onClick={() => setCurrentIndex(idx)}
                  className={`w-7 h-7 rounded text-xs font-medium transition-colors relative ${
                    idx === currentIndex
                      ? 'bg-primary text-primary-foreground'
                      : answers[q.id]
                        ? 'bg-green-500 text-white'
                        : 'bg-muted hover:bg-muted/80'
                  }`}
                >
                  {idx + 1}
                  {flagged.has(q.id) && (
                    <span className="absolute -top-1 -right-1 w-2 h-2 bg-orange-500 rounded-full" />
                  )}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <span className="w-3 h-3 bg-green-500 rounded" /> Answered ({answeredCount})
              </div>
              <div className="flex items-center gap-1">
                <span className="w-3 h-3 bg-muted rounded" /> Not Answered ({questions.length - answeredCount})
              </div>
              <div className="flex items-center gap-1">
                <span className="w-3 h-3 bg-orange-500 rounded-full" /> Flagged ({flagged.size})
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-16 left-0 right-0 bg-background border-t border-border p-3">
        <div className="flex items-center gap-3 max-w-lg mx-auto">
          <Button
            variant="outline"
            size="sm"
            disabled={currentIndex === 0}
            onClick={() => setCurrentIndex(prev => prev - 1)}
            className="flex-1"
          >
            <ChevronLeft className="w-4 h-4 mr-1" /> Prev
          </Button>
          
          {currentIndex === questions.length - 1 ? (
            <Button 
              size="sm" 
              className="flex-1 bg-green-600 hover:bg-green-700"
              onClick={handleSubmit}
            >
              Submit Test
            </Button>
          ) : (
            <Button
              size="sm"
              onClick={() => setCurrentIndex(prev => prev + 1)}
              className="flex-1"
            >
              Next <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

// Generate mock questions based on exam type
async function generateMockQuestions(examType: string, examId: string, testId: string): Promise<Question[]> {
  // Return pre-defined questions for different exam types
  const baseQuestions: Question[] = [
    {
      id: '1',
      question: 'If the cost price of an article is ₹500 and it is sold at 20% profit, what is the selling price?',
      options: { A: '₹550', B: '₹600', C: '₹580', D: '₹620' },
      correctAnswer: 'B',
      explanation: 'Selling Price = Cost Price + Profit = 500 + (20% of 500) = 500 + 100 = ₹600',
      difficulty: 'easy'
    },
    {
      id: '2',
      question: 'A train 200m long passes a platform 100m long in 15 seconds. What is the speed of the train?',
      options: { A: '72 km/hr', B: '60 km/hr', C: '54 km/hr', D: '48 km/hr' },
      correctAnswer: 'A',
      explanation: 'Total distance = 200 + 100 = 300m. Speed = 300/15 = 20 m/s = 20 × 18/5 = 72 km/hr',
      difficulty: 'medium'
    },
    {
      id: '3',
      question: 'If A:B = 2:3 and B:C = 4:5, then A:B:C is:',
      options: { A: '8:12:15', B: '2:3:5', C: '8:15:12', D: '2:5:3' },
      correctAnswer: 'A',
      explanation: 'A:B = 2:3 = 8:12, B:C = 4:5 = 12:15. So A:B:C = 8:12:15',
      difficulty: 'medium'
    },
    {
      id: '4',
      question: 'Find the next number in the series: 2, 6, 12, 20, 30, ?',
      options: { A: '40', B: '42', C: '44', D: '46' },
      correctAnswer: 'B',
      explanation: 'Differences: 4, 6, 8, 10, 12. Next difference is 12, so 30 + 12 = 42',
      difficulty: 'easy'
    },
    {
      id: '5',
      question: 'In a certain code, COMPUTER is written as RFUVQNPC. How will PRINTER be written?',
      options: { A: 'QSJOUFQ', B: 'SFUOJQR', C: 'QSJOFSQ', D: 'SFUOQJR' },
      correctAnswer: 'B',
      explanation: 'Each letter is shifted by +1 and the word is reversed. PRINTER → QSJOUFQ → SFUOJQR',
      difficulty: 'hard'
    },
    {
      id: '6',
      question: 'The compound interest on ₹8000 at 5% per annum for 2 years is:',
      options: { A: '₹800', B: '₹820', C: '₹840', D: '₹860' },
      correctAnswer: 'B',
      explanation: 'CI = P(1+r/100)^n - P = 8000(1.05)² - 8000 = 8820 - 8000 = ₹820',
      difficulty: 'medium'
    },
    {
      id: '7',
      question: 'If "DELHI" is coded as "CCIDD", then "MUMBAI" will be coded as:',
      options: { A: 'LTLAZG', B: 'NVNCAJ', C: 'LLKZ@H', D: 'LSLYZI' },
      correctAnswer: 'D',
      explanation: 'Each letter is replaced by the previous letter: M→L, U→S, M→L, B→Y, A→Z, I→I (special case)',
      difficulty: 'hard'
    },
    {
      id: '8',
      question: 'A can do a work in 10 days and B can do it in 15 days. In how many days can they finish it together?',
      options: { A: '5 days', B: '6 days', C: '7 days', D: '8 days' },
      correctAnswer: 'B',
      explanation: 'Work done per day = 1/10 + 1/15 = (3+2)/30 = 5/30 = 1/6. So they finish in 6 days.',
      difficulty: 'easy'
    },
    {
      id: '9',
      question: 'What is the average of first 50 natural numbers?',
      options: { A: '25', B: '25.5', C: '26', D: '26.5' },
      correctAnswer: 'B',
      explanation: 'Average of first n natural numbers = (n+1)/2 = (50+1)/2 = 51/2 = 25.5',
      difficulty: 'easy'
    },
    {
      id: '10',
      question: 'If log₁₀2 = 0.3010, then log₁₀50 is:',
      options: { A: '1.6990', B: '1.6020', C: '1.5010', D: '1.7010' },
      correctAnswer: 'A',
      explanation: 'log₁₀50 = log₁₀(100/2) = log₁₀100 - log₁₀2 = 2 - 0.3010 = 1.6990',
      difficulty: 'hard'
    },
    {
      id: '11',
      question: 'A man walks 5 km East, then turns left and walks 3 km, then turns left again and walks 5 km. How far is he from the starting point?',
      options: { A: '3 km', B: '5 km', C: '8 km', D: '13 km' },
      correctAnswer: 'A',
      explanation: 'He walks East 5km, North 3km, West 5km. He is now 3km North of starting point.',
      difficulty: 'easy'
    },
    {
      id: '12',
      question: 'If the radius of a circle is increased by 50%, by what percent is the area increased?',
      options: { A: '100%', B: '125%', C: '150%', D: '225%' },
      correctAnswer: 'B',
      explanation: 'New radius = 1.5r. New area = π(1.5r)² = 2.25πr². Increase = 1.25πr² = 125%',
      difficulty: 'medium'
    },
    {
      id: '13',
      question: 'Statement: All cats are dogs. All dogs are birds. Conclusions: I. All cats are birds. II. All birds are cats.',
      options: { A: 'Only I follows', B: 'Only II follows', C: 'Both follow', D: 'Neither follows' },
      correctAnswer: 'A',
      explanation: 'All cats are dogs and all dogs are birds means all cats are birds (I follows). But we cannot conclude all birds are cats.',
      difficulty: 'medium'
    },
    {
      id: '14',
      question: 'The HCF of two numbers is 12 and their LCM is 360. If one number is 60, what is the other?',
      options: { A: '72', B: '84', C: '48', D: '96' },
      correctAnswer: 'A',
      explanation: 'HCF × LCM = Product of numbers. 12 × 360 = 60 × x. x = 4320/60 = 72',
      difficulty: 'medium'
    },
    {
      id: '15',
      question: 'In how many ways can 5 people be seated in a row?',
      options: { A: '60', B: '100', C: '120', D: '150' },
      correctAnswer: 'C',
      explanation: '5! = 5 × 4 × 3 × 2 × 1 = 120 ways',
      difficulty: 'easy'
    },
    {
      id: '16',
      question: 'A shopkeeper sells an article at 10% loss. If he had sold it for ₹90 more, he would have gained 5%. The cost price is:',
      options: { A: '₹500', B: '₹550', C: '₹600', D: '₹650' },
      correctAnswer: 'C',
      explanation: 'Let CP = x. 1.05x - 0.9x = 90. 0.15x = 90. x = ₹600',
      difficulty: 'hard'
    },
    {
      id: '17',
      question: 'The sum of angles in a hexagon is:',
      options: { A: '540°', B: '720°', C: '900°', D: '1080°' },
      correctAnswer: 'B',
      explanation: 'Sum of interior angles = (n-2) × 180° = (6-2) × 180° = 4 × 180° = 720°',
      difficulty: 'easy'
    },
    {
      id: '18',
      question: 'If 3x + 2y = 12 and 2x + 3y = 13, then x + y equals:',
      options: { A: '4', B: '5', C: '6', D: '7' },
      correctAnswer: 'B',
      explanation: 'Adding both equations: 5x + 5y = 25. So x + y = 5',
      difficulty: 'medium'
    },
    {
      id: '19',
      question: 'A boat goes 12 km upstream and 18 km downstream in 3 hours each. What is the speed of the boat in still water?',
      options: { A: '4 km/hr', B: '5 km/hr', C: '6 km/hr', D: '7 km/hr' },
      correctAnswer: 'B',
      explanation: 'Upstream speed = 12/3 = 4 km/hr, Downstream = 18/3 = 6 km/hr. Boat speed = (6+4)/2 = 5 km/hr',
      difficulty: 'medium'
    },
    {
      id: '20',
      question: 'What percentage is 150 of 250?',
      options: { A: '50%', B: '55%', C: '60%', D: '65%' },
      correctAnswer: 'C',
      explanation: 'Percentage = (150/250) × 100 = 60%',
      difficulty: 'easy'
    }
  ];

  return baseQuestions;
}

export default MockTest;
