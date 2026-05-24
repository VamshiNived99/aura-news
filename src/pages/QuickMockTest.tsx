import { useState, useEffect, useCallback } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { ArrowLeft, Clock, CheckCircle, XCircle, Trophy, RotateCcw, ChevronLeft, ChevronRight, Flag, Loader2 } from "lucide-react";
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

const QuickMockTest = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  const category = searchParams.get('category') || 'General';
  const topic = searchParams.get('topic') || 'Mixed';
  const questionsCount = parseInt(searchParams.get('questions') || '10');
  const duration = parseInt(searchParams.get('duration') || '15');
  const returnPath = searchParams.get('return') || '/exam-prep';

  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [flagged, setFlagged] = useState<Set<string>>(new Set());
  const [timeLeft, setTimeLeft] = useState(duration * 60);
  const [isLoading, setIsLoading] = useState(true);
  const [testStarted, setTestStarted] = useState(false);
  const [testEnded, setTestEnded] = useState(false);
  const [result, setResult] = useState<MockTestResult | null>(null);
  const [showReview, setShowReview] = useState(false);

  // Generate questions using AI
  useEffect(() => {
    const generateQuestions = async () => {
      setIsLoading(true);
      try {
        const { data, error } = await supabase.functions.invoke('generate-mock-questions', {
          body: { category, topic, count: questionsCount }
        });

        if (error) throw error;
        
        if (data?.questions && Array.isArray(data.questions)) {
          setQuestions(data.questions);
        } else {
          // Fallback to default questions
          setQuestions(getDefaultQuestions(questionsCount));
        }
      } catch (error) {
        console.error('Error generating questions:', error);
        toast({ title: "Using cached questions", description: "Could not generate new questions" });
        setQuestions(getDefaultQuestions(questionsCount));
      } finally {
        setIsLoading(false);
      }
    };

    generateQuestions();
  }, [category, topic, questionsCount]);

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
      if (newSet.has(questionId)) newSet.delete(questionId);
      else newSet.add(questionId);
      return newSet;
    });
  };

  const handleSubmit = useCallback(() => {
    if (testEnded) return;
    
    const timeTaken = (duration * 60) - timeLeft;
    let correct = 0, incorrect = 0, skipped = 0;

    questions.forEach(q => {
      if (!answers[q.id]) skipped++;
      else if (answers[q.id] === q.correctAnswer) correct++;
      else incorrect++;
    });

    const score = correct * 4 - incorrect;
    const percentage = Math.round((correct / questions.length) * 100);

    setResult({
      totalQuestions: questions.length,
      attempted: questions.length - skipped,
      correct, incorrect, skipped,
      score: Math.max(0, score),
      percentage, timeTaken, answers
    });
    setTestEnded(true);
  }, [testEnded, duration, timeLeft, questions, answers]);

  if (isLoading) {
    return (
      <div className="min-h-[100dvh] flex items-center justify-center bg-background">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto mb-4" />
          <p className="text-muted-foreground">Generating questions...</p>
          <p className="text-xs text-muted-foreground mt-1">{category} - {topic}</p>
        </div>
      </div>
    );
  }

  // Start Screen
  if (!testStarted && !testEnded) {
    return (
      <div className="min-h-[100dvh] w-full bg-background pb-24">
        <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
          <div className="flex items-center gap-3 px-4 py-3">
            <Button variant="ghost" size="icon" onClick={() => navigate(returnPath)}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="text-lg font-bold">Quick Mock Test</h1>
          </div>
        </header>

        <div className="px-4 py-8 max-w-lg mx-auto">
          <Card className="mb-6">
            <CardHeader className="text-center pb-4">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                <Trophy className="w-10 h-10 text-primary" />
              </div>
              <CardTitle className="text-xl">{topic}</CardTitle>
              <p className="text-sm text-muted-foreground">{category}</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="p-4 bg-muted/50 rounded-lg">
                  <p className="text-2xl font-bold text-primary">{questions.length}</p>
                  <p className="text-sm text-muted-foreground">Questions</p>
                </div>
                <div className="p-4 bg-muted/50 rounded-lg">
                  <p className="text-2xl font-bold text-primary">{duration} min</p>
                  <p className="text-sm text-muted-foreground">Duration</p>
                </div>
              </div>

              <div className="space-y-2 text-sm">
                <h4 className="font-semibold">Marking Scheme:</h4>
                <ul className="space-y-1 text-muted-foreground">
                  <li>• Correct answer: +4 marks</li>
                  <li>• Wrong answer: -1 mark</li>
                  <li>• Unattempted: 0 marks</li>
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
            <Button variant="ghost" size="icon" onClick={() => navigate(returnPath)}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="text-lg font-bold">Test Result</h1>
          </div>
        </header>

        {!showReview ? (
          <div className="px-4 py-6 max-w-lg mx-auto space-y-6">
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
              <Button variant="outline" onClick={() => setShowReview(true)}>
                <CheckCircle className="w-4 h-4 mr-2" /> Review
              </Button>
              <Button onClick={() => navigate(returnPath)}>
                <RotateCcw className="w-4 h-4 mr-2" /> Done
              </Button>
            </div>
          </div>
        ) : (
          <div className="px-4 py-4 space-y-4 pb-24">
            <Button variant="outline" size="sm" onClick={() => setShowReview(false)}>
              <ArrowLeft className="w-4 h-4 mr-2" /> Back
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
                      <div key={key} className={`p-2 rounded-lg text-sm ${
                        key === q.correctAnswer ? 'bg-green-500/20 border border-green-500' 
                        : userAnswer === key ? 'bg-red-500/20 border border-red-500' : 'bg-muted/50'
                      }`}>
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

  // Active Test
  const currentQuestion = questions[currentIndex];
  const progress = ((currentIndex + 1) / questions.length) * 100;

  return (
    <div className="min-h-[100dvh] w-full bg-background flex flex-col">
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="flex items-center justify-between px-4 py-2">
          <span className="text-sm font-medium">Q {currentIndex + 1}/{questions.length}</span>
          <div className={`flex items-center gap-2 px-3 py-1 rounded-full ${timeLeft < 60 ? 'bg-red-500/20 text-red-600' : 'bg-primary/10 text-primary'}`}>
            <Clock className="w-4 h-4" />
            <span className="font-mono font-bold">{formatTime(timeLeft)}</span>
          </div>
        </div>
        <Progress value={progress} className="h-1 rounded-none" />
      </header>

      <div className="flex-1 px-4 py-4 overflow-y-auto pb-32">
        <Card className="mb-4">
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              <Badge variant={currentQuestion.difficulty === 'easy' ? 'secondary' : currentQuestion.difficulty === 'medium' ? 'default' : 'destructive'}>
                {currentQuestion.difficulty}
              </Badge>
              <Button variant={flagged.has(currentQuestion.id) ? "default" : "ghost"} size="sm" onClick={() => toggleFlag(currentQuestion.id)}>
                <Flag className={`w-4 h-4 ${flagged.has(currentQuestion.id) ? 'fill-current' : ''}`} />
              </Button>
            </div>
            <p className="text-base leading-relaxed mt-3">{currentQuestion.question}</p>
          </CardHeader>
          <CardContent>
            <RadioGroup value={answers[currentQuestion.id] || ''} onValueChange={(value) => handleAnswer(currentQuestion.id, value)} className="space-y-3">
              {Object.entries(currentQuestion.options).map(([key, value]) => (
                <div key={key} className={`flex items-center space-x-3 p-3 rounded-lg border transition-colors ${answers[currentQuestion.id] === key ? 'border-primary bg-primary/5' : 'border-border hover:bg-muted/50'}`}>
                  <RadioGroupItem value={key} id={`opt-${key}`} />
                  <Label htmlFor={`opt-${key}`} className="flex-1 cursor-pointer text-sm">
                    <span className="font-semibold mr-2">{key}.</span>{value}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="grid grid-cols-10 gap-1.5">
          {questions.map((q, idx) => (
            <button key={q.id} onClick={() => setCurrentIndex(idx)}
              className={`w-7 h-7 rounded text-xs font-medium ${idx === currentIndex ? 'bg-primary text-primary-foreground' : answers[q.id] ? 'bg-green-500 text-white' : 'bg-muted'}`}>
              {idx + 1}
            </button>
          ))}
        </div>
      </div>

      <div className="fixed bottom-16 left-0 right-0 bg-background border-t border-border p-3">
        <div className="flex items-center gap-3 max-w-lg mx-auto">
          <Button variant="outline" size="sm" disabled={currentIndex === 0} onClick={() => setCurrentIndex(prev => prev - 1)} className="flex-1">
            <ChevronLeft className="w-4 h-4 mr-1" /> Prev
          </Button>
          {currentIndex === questions.length - 1 ? (
            <Button size="sm" className="flex-1 bg-green-600 hover:bg-green-700" onClick={handleSubmit}>Submit</Button>
          ) : (
            <Button size="sm" onClick={() => setCurrentIndex(prev => prev + 1)} className="flex-1">
              Next <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

function getDefaultQuestions(count: number): Question[] {
  const allQuestions: Question[] = [
    { id: '1', question: 'If the cost price of an article is ₹500 and it is sold at 20% profit, what is the selling price?', options: { A: '₹550', B: '₹600', C: '₹580', D: '₹620' }, correctAnswer: 'B', explanation: 'SP = CP + Profit = 500 + 100 = ₹600', difficulty: 'easy' },
    { id: '2', question: 'A train 200m long passes a platform 100m long in 15 seconds. Speed of train?', options: { A: '72 km/hr', B: '60 km/hr', C: '54 km/hr', D: '48 km/hr' }, correctAnswer: 'A', explanation: 'Speed = 300/15 = 20 m/s = 72 km/hr', difficulty: 'medium' },
    { id: '3', question: 'If A:B = 2:3 and B:C = 4:5, then A:B:C is:', options: { A: '8:12:15', B: '2:3:5', C: '8:15:12', D: '2:5:3' }, correctAnswer: 'A', explanation: 'A:B:C = 8:12:15', difficulty: 'medium' },
    { id: '4', question: 'Next in series: 2, 6, 12, 20, 30, ?', options: { A: '40', B: '42', C: '44', D: '46' }, correctAnswer: 'B', explanation: 'Differences: 4,6,8,10,12. Next = 30+12 = 42', difficulty: 'easy' },
    { id: '5', question: 'CI on ₹8000 at 5% for 2 years is:', options: { A: '₹800', B: '₹820', C: '₹840', D: '₹860' }, correctAnswer: 'B', explanation: 'CI = 8000(1.05)² - 8000 = ₹820', difficulty: 'medium' },
    { id: '6', question: 'A does work in 10 days, B in 15 days. Together?', options: { A: '5 days', B: '6 days', C: '7 days', D: '8 days' }, correctAnswer: 'B', explanation: '1/10 + 1/15 = 1/6. So 6 days.', difficulty: 'easy' },
    { id: '7', question: 'Average of first 50 natural numbers?', options: { A: '25', B: '25.5', C: '26', D: '26.5' }, correctAnswer: 'B', explanation: '(n+1)/2 = 51/2 = 25.5', difficulty: 'easy' },
    { id: '8', question: 'HCF=12, LCM=360, one number=60. Other?', options: { A: '72', B: '84', C: '48', D: '96' }, correctAnswer: 'A', explanation: 'x = 12×360/60 = 72', difficulty: 'medium' },
    { id: '9', question: '5 people seated in row. Ways?', options: { A: '60', B: '100', C: '120', D: '150' }, correctAnswer: 'C', explanation: '5! = 120', difficulty: 'easy' },
    { id: '10', question: 'Sum of angles in hexagon?', options: { A: '540°', B: '720°', C: '900°', D: '1080°' }, correctAnswer: 'B', explanation: '(6-2)×180 = 720°', difficulty: 'easy' },
    { id: '11', question: 'If 3x+2y=12 and 2x+3y=13, x+y=?', options: { A: '4', B: '5', C: '6', D: '7' }, correctAnswer: 'B', explanation: 'Adding: 5x+5y=25, so x+y=5', difficulty: 'medium' },
    { id: '12', question: 'Radius increased by 50%, area increase?', options: { A: '100%', B: '125%', C: '150%', D: '225%' }, correctAnswer: 'B', explanation: '(1.5)² = 2.25, increase = 125%', difficulty: 'medium' },
    { id: '13', question: 'What is 150 as percentage of 250?', options: { A: '50%', B: '55%', C: '60%', D: '65%' }, correctAnswer: 'C', explanation: '(150/250)×100 = 60%', difficulty: 'easy' },
    { id: '14', question: 'Boat: 12km upstream, 18km downstream in 3hrs each. Boat speed?', options: { A: '4 km/hr', B: '5 km/hr', C: '6 km/hr', D: '7 km/hr' }, correctAnswer: 'B', explanation: '(4+6)/2 = 5 km/hr', difficulty: 'medium' },
    { id: '15', question: 'Man walks 5km E, turns left 3km, left 5km. Distance from start?', options: { A: '3 km', B: '5 km', C: '8 km', D: '13 km' }, correctAnswer: 'A', explanation: 'He is 3km North of start.', difficulty: 'easy' }
  ];
  
  return allQuestions.slice(0, Math.min(count, allQuestions.length));
}

export default QuickMockTest;
