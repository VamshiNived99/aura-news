import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { 
  ArrowLeft, BookOpen, CheckCircle, Lightbulb, AlertCircle, 
  Play, Clock, Target, Trophy, ChevronRight, XCircle, Timer,
  ArrowRight, RotateCcw, Share2, RefreshCw
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { getTopicContent, generateGenericContent } from "@/data/ncertContent";

interface DiagramElement {
  id: string;
  text: string;
  level: number;
  connections: string[];
}

interface Diagram {
  title: string;
  type: string;
  elements: DiagramElement[];
  description?: string;
}

interface Example {
  title: string;
  problem: string;
  solution: string;
  answer: string;
}

interface Formula {
  name: string;
  expression: string;
  description: string;
}

type PracticeQuestion = {
  question: string;
  options?: string[] | { A: string; B: string; C: string; D: string };
  answer?: string;
  correctAnswer?: string;
  explanation?: string;
  type?: string;
  difficulty?: string;
};

interface ContentSection {
  heading: string;
  content: string;
  keyPoints?: string[];
  diagram?: string | Diagram;
  example?: string;
  examples?: Example[];
  formula?: string;
}

interface ContentData {
  title: string;
  introduction: string;
  sections: ContentSection[];
  summary: string;
  keyFormulas?: string[];
  formulas?: Formula[];
  importantDates?: string[];
  flowchart?: string;
  mainDiagram?: Diagram;
  practiceQuestions?: PracticeQuestion[];
  tips?: string[];
}

interface MockQuestion {
  id: string;
  question: string;
  options: { A: string; B: string; C: string; D: string };
  correctAnswer: string;
  explanation: string;
}

interface MockTestResult {
  score: number;
  total: number;
  accuracy: number;
  timeTaken: number;
  answers: Record<string, string>;
}

const NCERTContent = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const { board, className, subject, chapter } = location.state || {};
  
  const [content, setContent] = useState<ContentData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [revealedAnswers, setRevealedAnswers] = useState<Set<number>>(new Set());
  const [activeTab, setActiveTab] = useState('content');
  
  // Mock Test State
  const [mockQuestions, setMockQuestions] = useState<MockQuestion[]>([]);
  const [mockTestActive, setMockTestActive] = useState(false);
  const [currentMockIndex, setCurrentMockIndex] = useState(0);
  const [mockAnswers, setMockAnswers] = useState<Record<string, string>>({});
  const [mockTimeLeft, setMockTimeLeft] = useState(300);
  const [mockResult, setMockResult] = useState<MockTestResult | null>(null);
  const [showMockSolutions, setShowMockSolutions] = useState(false);
  const [loadingMock, setLoadingMock] = useState(false);

  useEffect(() => {
    if (!chapter) {
      navigate(-1);
      return;
    }
    fetchContent();
  }, [chapter]);

  useEffect(() => {
    if (!mockTestActive || mockTimeLeft <= 0) return;
    
    const timer = setInterval(() => {
      setMockTimeLeft(prev => {
        if (prev <= 1) {
          submitMockTest();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [mockTestActive, mockTimeLeft]);

  const getOfflineContent = (): ContentData => {
    const topicContent =
      (chapter && getTopicContent(chapter, subject)) ||
      generateGenericContent(chapter || "Topic", subject || "NCERT");

    return {
      title: topicContent.title,
      introduction: topicContent.introduction,
      sections: topicContent.sections.map((s) => ({
        heading: s.heading,
        content: s.content,
        keyPoints: s.keyPoints,
        examples: s.examples,
      })),
      summary: topicContent.summary,
      formulas: topicContent.formulas,
      tips: topicContent.tips,
      practiceQuestions: topicContent.practiceQuestions.map((q) => ({
        question: q.question,
        options: q.options,
        correctAnswer: q.correctAnswer,
        explanation: q.explanation,
        type: q.difficulty,
        difficulty: q.difficulty,
      })),
    };
  };

  const fetchContent = async () => {
    setLoading(true);
    setError(null);

    try {
      // Free, offline-first content (no AI credits required)
      setContent(getOfflineContent());
    } catch (err: any) {
      console.error("Error loading offline content:", err);
      setError("Failed to load content.");
    } finally {
      setLoading(false);
    }
  };

  const toggleAnswer = (index: number) => {
    const newRevealed = new Set(revealedAnswers);
    if (newRevealed.has(index)) {
      newRevealed.delete(index);
    } else {
      newRevealed.add(index);
    }
    setRevealedAnswers(newRevealed);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const generateMockTest = async () => {
    setLoadingMock(true);
    try {
      const offline = getOfflineContent();
      const bank = offline.practiceQuestions || [];

      const offlineQuestions: MockQuestion[] = bank.slice(0, 10).map((q, idx) => ({
        id: String(idx + 1),
        question: q.question,
        options: (q.options as any) || { A: "", B: "", C: "", D: "" },
        correctAnswer: q.correctAnswer || "A",
        explanation: q.explanation || "",
      }));

      const questionsToUse =
        offlineQuestions.length === 10
          ? offlineQuestions
          : generateFallbackQuestions(chapter, subject);

      setMockQuestions(questionsToUse);
      setMockTestActive(true);
      setMockTimeLeft(300);
      setMockAnswers({});
      setCurrentMockIndex(0);
      setMockResult(null);
      setShowMockSolutions(false);

      toast({ title: "Offline quiz ready", description: "High-quality questions loaded for free." });
    } catch (err) {
      console.error("Error generating offline mock test:", err);
      const fallbackQuestions = generateFallbackQuestions(chapter, subject);
      setMockQuestions(fallbackQuestions);
      setMockTestActive(true);
      setMockTimeLeft(300);
      setMockAnswers({});
      setCurrentMockIndex(0);
      setMockResult(null);
      setShowMockSolutions(false);
      toast({ title: "Using offline questions", description: "Loaded default questions." });
    } finally {
      setLoadingMock(false);
    }
  };

  const generateFallbackQuestions = (topic: string, subj: string): MockQuestion[] => {
    const generic = generateGenericContent(topic, subj);
    return generic.practiceQuestions.slice(0, 10).map((q, idx) => ({
      id: String(idx + 1),
      question: q.question,
      options: q.options,
      correctAnswer: q.correctAnswer,
      explanation: q.explanation,
    }));
  };

  const submitMockTest = () => {
    let correct = 0;
    mockQuestions.forEach(q => {
      if (mockAnswers[q.id] === q.correctAnswer) correct++;
    });

    const result: MockTestResult = {
      score: correct * 4,
      total: mockQuestions.length * 4,
      accuracy: Math.round((correct / mockQuestions.length) * 100),
      timeTaken: 300 - mockTimeLeft,
      answers: mockAnswers
    };

    setMockResult(result);
    setMockTestActive(false);
  };

  const getOptionValue = (options: PracticeQuestion['options'], key: string): string => {
    if (!options) return '';
    if (Array.isArray(options)) {
      const index = key.charCodeAt(0) - 65;
      return options[index] || '';
    }
    return (options as any)[key] || '';
  };

  if (!chapter) {
    return null;
  }

  // Mock Test Active View
  if (mockTestActive && mockQuestions.length > 0) {
    const currentQ = mockQuestions[currentMockIndex];
    
    return (
      <div className="min-h-[100dvh] w-full bg-background flex flex-col">
        <header className="sticky top-0 z-50 bg-background border-b border-border px-4 py-3">
          <div className="flex items-center justify-between">
            <Button variant="ghost" size="sm" onClick={() => {
              if (confirm('Exit test? Progress will be lost.')) {
                setMockTestActive(false);
              }
            }}>
              <ArrowLeft className="w-4 h-4 mr-1" />
              Exit
            </Button>
            <div className={`flex items-center gap-2 px-4 py-2 rounded-full font-mono text-lg font-bold ${
              mockTimeLeft < 60 ? 'bg-red-500/10 text-red-500 animate-pulse' : 'bg-primary/10 text-primary'
            }`}>
              <Timer className="w-5 h-5" />
              {formatTime(mockTimeLeft)}
            </div>
            <Button size="sm" onClick={submitMockTest}>Submit</Button>
          </div>
          <Progress value={(Object.keys(mockAnswers).length / mockQuestions.length) * 100} className="mt-2 h-1" />
        </header>

        <div className="px-4 py-2 overflow-x-auto">
          <div className="flex gap-2 min-w-max">
            {mockQuestions.map((q, idx) => (
              <button
                key={q.id}
                onClick={() => setCurrentMockIndex(idx)}
                className={`w-8 h-8 rounded-lg text-sm font-medium transition-all ${
                  idx === currentMockIndex 
                    ? 'bg-primary text-primary-foreground' 
                    : mockAnswers[q.id]
                      ? 'bg-green-500/20 text-green-700 dark:text-green-400'
                      : 'bg-secondary text-muted-foreground'
                }`}
              >
                {idx + 1}
              </button>
            ))}
          </div>
        </div>

        <main className="flex-1 px-4 py-4 overflow-y-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQ.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              <Card>
                <CardContent className="pt-6">
                  <p className="text-lg font-medium leading-relaxed">
                    Q{currentMockIndex + 1}. {currentQ.question}
                  </p>
                </CardContent>
              </Card>

              <RadioGroup
                value={mockAnswers[currentQ.id] || ''}
                onValueChange={(value) => setMockAnswers(prev => ({ ...prev, [currentQ.id]: value }))}
                className="space-y-3"
              >
                {Object.entries(currentQ.options).map(([key, value]) => (
                  <Label
                    key={key}
                    htmlFor={`mock-option-${key}`}
                    className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                      mockAnswers[currentQ.id] === key
                        ? 'border-primary bg-primary/5'
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <RadioGroupItem value={key} id={`mock-option-${key}`} />
                    <span className="font-semibold text-primary mr-2">{key}.</span>
                    <span className="flex-1">{value}</span>
                  </Label>
                ))}
              </RadioGroup>
            </motion.div>
          </AnimatePresence>
        </main>

        <div className="px-4 py-4 border-t border-border flex gap-3">
          <Button
            variant="outline"
            className="flex-1"
            disabled={currentMockIndex === 0}
            onClick={() => setCurrentMockIndex(prev => prev - 1)}
          >
            Previous
          </Button>
          {currentMockIndex < mockQuestions.length - 1 ? (
            <Button className="flex-1" onClick={() => setCurrentMockIndex(prev => prev + 1)}>
              Next
            </Button>
          ) : (
            <Button className="flex-1" onClick={submitMockTest}>
              Submit Test
            </Button>
          )}
        </div>
      </div>
    );
  }

  // Mock Test Result View
  if (mockResult) {
    return (
      <div className="min-h-[100dvh] w-full bg-background pb-24">
        <header className="sticky top-0 z-50 bg-background border-b border-border px-4 py-3">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={() => setMockResult(null)}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="font-bold text-lg">Mock Test Results</h1>
          </div>
        </header>

        <main className="px-4 py-6 space-y-6">
          <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
            <Card className="overflow-hidden">
              <div className="bg-gradient-to-br from-primary to-primary/70 text-primary-foreground p-6 text-center">
                <Trophy className="w-12 h-12 mx-auto mb-2" />
                <p className="text-4xl font-bold">{mockResult.score}/{mockResult.total}</p>
                <p className="text-sm opacity-90">Score</p>
              </div>
              <CardContent className="p-4">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-xl font-bold text-green-600">{mockResult.accuracy}%</p>
                    <p className="text-xs text-muted-foreground">Accuracy</p>
                  </div>
                  <div>
                    <p className="text-xl font-bold text-blue-600">{formatTime(mockResult.timeTaken)}</p>
                    <p className="text-xs text-muted-foreground">Time</p>
                  </div>
                  <div>
                    <p className="text-xl font-bold text-primary">
                      {Object.values(mockResult.answers).filter((a, i) => a === mockQuestions[i]?.correctAnswer).length}/{mockQuestions.length}
                    </p>
                    <p className="text-xs text-muted-foreground">Correct</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <div className="flex gap-3">
            <Button onClick={() => setShowMockSolutions(true)} className="flex-1">
              <BookOpen className="w-4 h-4 mr-2" />
              View Solutions
            </Button>
            <Button variant="outline" onClick={() => {
              setMockResult(null);
              generateMockTest();
            }}>
              <RotateCcw className="w-4 h-4 mr-2" />
              Retry
            </Button>
          </div>

          {showMockSolutions && (
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Solutions</h3>
              {mockQuestions.map((q, idx) => {
                const userAnswer = mockResult.answers[q.id];
                const isCorrect = userAnswer === q.correctAnswer;
                
                return (
                  <Card key={q.id} className={isCorrect ? 'border-green-500/30' : userAnswer ? 'border-red-500/30' : 'border-gray-500/30'}>
                    <CardContent className="pt-4">
                      <div className="flex items-start justify-between mb-2">
                        <Badge variant="secondary">Q{idx + 1}</Badge>
                        <Badge className={isCorrect ? 'bg-green-500' : userAnswer ? 'bg-red-500' : 'bg-gray-500'}>
                          {isCorrect ? 'Correct' : userAnswer ? 'Incorrect' : 'Skipped'}
                        </Badge>
                      </div>
                      <p className="font-medium mb-3">{q.question}</p>
                      <div className="space-y-2 mb-3">
                        {Object.entries(q.options).map(([key, value]) => (
                          <div
                            key={key}
                            className={`p-2 rounded text-sm ${
                              q.correctAnswer === key
                                ? 'bg-green-500/10 border border-green-500/30'
                                : userAnswer === key
                                  ? 'bg-red-500/10 border border-red-500/30'
                                  : 'bg-secondary/50'
                            }`}
                          >
                            <span className="font-medium">{key}.</span> {value}
                            {q.correctAnswer === key && <CheckCircle className="w-4 h-4 inline ml-2 text-green-500" />}
                            {userAnswer === key && userAnswer !== q.correctAnswer && <XCircle className="w-4 h-4 inline ml-2 text-red-500" />}
                          </div>
                        ))}
                      </div>
                      <div className="p-3 bg-primary/5 rounded-lg">
                        <p className="text-sm"><strong>Explanation:</strong> {q.explanation}</p>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}

          <Button variant="outline" className="w-full" onClick={() => {
            setMockResult(null);
            setMockQuestions([]);
          }}>
            Back to Content
          </Button>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-[100dvh] w-full bg-background pb-24">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="flex items-center gap-3 px-4 py-3">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex-1 min-w-0">
            <h1 className="text-sm font-bold truncate">{chapter}</h1>
            <p className="text-xs text-muted-foreground truncate">
              {subject} • {className} • {board}
            </p>
          </div>
          <Button variant="ghost" size="icon" onClick={fetchContent} disabled={loading}>
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </Button>
        </div>
        
        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="px-4 pb-2">
          <TabsList className="w-full">
            <TabsTrigger value="content" className="flex-1">
              <BookOpen className="w-4 h-4 mr-1" />
              Content
            </TabsTrigger>
            <TabsTrigger value="quiz" className="flex-1">
              <Target className="w-4 h-4 mr-1" />
              Quiz
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </header>

      <main className="w-full px-4 py-4 space-y-4">
        {loading && (
          <div className="space-y-4">
            <Card>
              <CardContent className="pt-6 space-y-4">
                <div className="flex items-center gap-3">
                  <Skeleton className="w-10 h-10 rounded-full" />
                  <div className="space-y-2 flex-1">
                    <Skeleton className="h-4 w-1/3" />
                    <Skeleton className="h-3 w-2/3" />
                  </div>
                </div>
                <div className="text-center py-8">
                  <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full mx-auto mb-4" />
                  <p className="text-muted-foreground">Generating comprehensive content...</p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {error && (
          <Card className="border-destructive/50">
            <CardContent className="pt-6 text-center">
              <AlertCircle className="w-12 h-12 mx-auto text-destructive mb-4" />
              <p className="text-destructive font-medium">{error}</p>
              <Button onClick={fetchContent} className="mt-4">
                Try Again
              </Button>
            </CardContent>
          </Card>
        )}

        {content && !loading && activeTab === 'content' && (
          <>
            {/* Title & Introduction */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <Card className="border-primary/20">
                <CardHeader>
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center shadow-lg">
                      <BookOpen className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-xl">{content.title}</CardTitle>
                      <div className="flex gap-2 mt-2">
                        <Badge variant="secondary">{subject}</Badge>
                        <Badge variant="outline">{className}</Badge>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    {content.introduction}
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Key Formulas */}
            {content.keyFormulas && content.keyFormulas.length > 0 && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                <Card className="bg-amber-500/5 border-amber-500/20">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base flex items-center gap-2">
                      <span className="text-xl">📐</span>
                      Key Formulas
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {content.keyFormulas.map((formula, i) => (
                        <div key={i} className="p-3 bg-background rounded-lg border font-mono text-sm">
                          {formula}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Content Sections */}
            {content.sections?.map((section, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">
                        {index + 1}
                      </span>
                      {section.heading}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="leading-relaxed">{section.content}</p>
                    
                    {/* Example */}
                    {section.example && (
                      <div className="p-4 bg-blue-500/5 rounded-lg border border-blue-500/20">
                        <h4 className="font-semibold text-blue-700 dark:text-blue-400 flex items-center gap-2 mb-2">
                          <span>📝</span> Example
                        </h4>
                        <p className="text-sm">{section.example}</p>
                      </div>
                    )}

                    {/* Formula */}
                    {section.formula && (
                      <div className="p-4 bg-purple-500/5 rounded-lg border border-purple-500/20">
                        <h4 className="font-semibold text-purple-700 dark:text-purple-400 flex items-center gap-2 mb-2">
                          <span>🔢</span> Formula
                        </h4>
                        <p className="font-mono text-sm">{section.formula}</p>
                      </div>
                    )}

                    {/* Diagram Description */}
                    {section.diagram && (
                      <div className="p-4 bg-green-500/5 rounded-lg border border-green-500/20">
                        <h4 className="font-semibold text-green-700 dark:text-green-400 flex items-center gap-2 mb-2">
                          <span>📊</span> Diagram
                        </h4>
                        <p className="text-sm">
                          {typeof section.diagram === "string"
                            ? section.diagram
                            : section.diagram.description || section.diagram.title}
                        </p>
                      </div>
                    )}
                    
                    {/* Key Points */}
                    {section.keyPoints && section.keyPoints.length > 0 && (
                      <div className="bg-primary/5 rounded-lg p-4 space-y-2">
                        <h4 className="text-sm font-semibold text-primary flex items-center gap-2">
                          <Lightbulb className="w-4 h-4" />
                          Key Points to Remember
                        </h4>
                        <ul className="space-y-2">
                          {section.keyPoints.map((point, i) => (
                            <li key={i} className="text-sm flex items-start gap-2">
                              <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                              <span>{point}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}

            {/* Summary */}
            {content.summary && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <Card className="border-primary/30 bg-primary/5">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base flex items-center gap-2">
                      <span className="text-xl">📋</span>
                      Summary
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="leading-relaxed">{content.summary}</p>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Practice Questions */}
            {content.practiceQuestions && content.practiceQuestions.length > 0 && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base flex items-center gap-2">
                      <span className="text-xl">❓</span>
                      Practice Questions
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {content.practiceQuestions.map((q, index) => (
                      <div key={index} className="p-4 bg-secondary/50 rounded-lg space-y-3">
                        <p className="font-medium">
                          Q{index + 1}. {q.question}
                        </p>
                        
                        {q.options && (
                          <div className="grid grid-cols-1 gap-2 ml-4">
                            {(Array.isArray(q.options) ? q.options : Object.entries(q.options)).map((opt, i) => (
                              <div key={i} className="text-sm text-muted-foreground p-2 bg-background rounded">
                                {Array.isArray(q.options) 
                                  ? `${String.fromCharCode(65 + i)}. ${opt}`
                                  : `${(opt as [string, string])[0]}. ${(opt as [string, string])[1]}`
                                }
                              </div>
                            ))}
                          </div>
                        )}
                        
                        {(q.answer || q.correctAnswer) && (
                          <div>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-xs"
                              onClick={() => toggleAnswer(index)}
                            >
                              {revealedAnswers.has(index) ? 'Hide Answer' : 'Show Answer'}
                            </Button>
                            {revealedAnswers.has(index) && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                className="mt-2 p-3 bg-green-500/10 rounded text-sm"
                              >
                                <strong className="text-green-700 dark:text-green-400">Answer:</strong> {q.answer || q.correctAnswer}
                                {q.explanation && (
                                  <p className="mt-2 text-muted-foreground">{q.explanation}</p>
                                )}
                              </motion.div>
                            )}
                          </div>
                        )}
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </>
        )}

        {/* Quiz Tab */}
        {activeTab === 'quiz' && !loading && (
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-primary" />
                  Concept Mock Test
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Test your understanding of "{chapter}" with a quick 10-question quiz.
                </p>
                
                <div className="grid grid-cols-3 gap-3">
                  <div className="text-center p-3 bg-secondary/50 rounded-lg">
                    <p className="text-xl font-bold text-primary">10</p>
                    <p className="text-xs text-muted-foreground">Questions</p>
                  </div>
                  <div className="text-center p-3 bg-secondary/50 rounded-lg">
                    <p className="text-xl font-bold text-primary">5 min</p>
                    <p className="text-xs text-muted-foreground">Duration</p>
                  </div>
                  <div className="text-center p-3 bg-secondary/50 rounded-lg">
                    <p className="text-xl font-bold text-primary">+4/-0</p>
                    <p className="text-xs text-muted-foreground">Marking</p>
                  </div>
                </div>

                <Button 
                  onClick={generateMockTest} 
                  disabled={loadingMock}
                  className="w-full"
                  size="lg"
                >
                  {loadingMock ? (
                    <>
                      <div className="animate-spin w-4 h-4 border-2 border-current border-t-transparent rounded-full mr-2" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 mr-2" />
                      Start Mock Test
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-secondary/30">
              <CardContent className="pt-6">
                <div className="flex items-start gap-3">
                  <Lightbulb className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-medium mb-1">Pro Tips</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Read the content thoroughly before attempting the quiz</li>
                      <li>• Questions are based on key concepts from this chapter</li>
                      <li>• Review solutions to understand your mistakes</li>
                      <li>• Retake the test to improve your score</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </main>
    </div>
  );
};

export default NCERTContent;
