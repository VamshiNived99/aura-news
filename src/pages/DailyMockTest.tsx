import { useState, useEffect, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Trophy, Clock, Target, ChevronRight, Play, Share2, 
  CheckCircle, XCircle, ArrowLeft, BarChart3, Bookmark,
  Timer, Award, BookOpen, TrendingUp, Calendar, RotateCcw,
  FileText, Zap, Brain
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";

interface Question {
  id: string;
  question: string;
  options: { A: string; B: string; C: string; D: string };
  correctAnswer: string;
  explanation: string;
  topic: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

interface TestResult {
  id: string;
  testId: string;
  testName: string;
  date: string;
  score: number;
  correctAnswers: number;
  totalQuestions: number;
  accuracy: number;
  timeTaken: number;
  answers: Record<string, string>;
  questionIds: string[];
}

interface DailyTest {
  id: string;
  name: string;
  date: string;
  questionCount: number;
  duration: number;
  category: string;
  difficulty: string;
  questionIds: string[];
}

// Comprehensive question bank
const QUESTION_BANK: Question[] = [
  // General Knowledge
  { id: 'gk_001', question: 'Which is the largest continent by area?', options: { A: 'Asia', B: 'Africa', C: 'North America', D: 'Europe' }, correctAnswer: 'A', explanation: 'Asia is the largest continent, covering about 44.58 million km².', topic: 'Geography', difficulty: 'easy' },
  { id: 'gk_002', question: 'What is the capital of Australia?', options: { A: 'Sydney', B: 'Canberra', C: 'Melbourne', D: 'Perth' }, correctAnswer: 'B', explanation: 'Canberra is the capital city of Australia.', topic: 'Geography', difficulty: 'easy' },
  { id: 'gk_003', question: 'Which planet is known as the Red Planet?', options: { A: 'Venus', B: 'Mars', C: 'Jupiter', D: 'Saturn' }, correctAnswer: 'B', explanation: 'Mars is called the Red Planet due to iron oxide on its surface.', topic: 'Science', difficulty: 'easy' },
  { id: 'gk_004', question: 'Who wrote "Romeo and Juliet"?', options: { A: 'Charles Dickens', B: 'William Shakespeare', C: 'Jane Austen', D: 'Mark Twain' }, correctAnswer: 'B', explanation: 'William Shakespeare wrote Romeo and Juliet around 1594-1596.', topic: 'Literature', difficulty: 'easy' },
  { id: 'gk_005', question: 'What is the chemical symbol for gold?', options: { A: 'Au', B: 'Ag', C: 'Fe', D: 'Cu' }, correctAnswer: 'A', explanation: 'Au comes from the Latin word "Aurum" meaning gold.', topic: 'Chemistry', difficulty: 'easy' },
  { id: 'gk_006', question: 'Which is the longest river in the world?', options: { A: 'Amazon', B: 'Nile', C: 'Yangtze', D: 'Mississippi' }, correctAnswer: 'B', explanation: 'The Nile River is approximately 6,650 km long.', topic: 'Geography', difficulty: 'medium' },
  { id: 'gk_007', question: 'Who invented the telephone?', options: { A: 'Thomas Edison', B: 'Alexander Graham Bell', C: 'Nikola Tesla', D: 'Guglielmo Marconi' }, correctAnswer: 'B', explanation: 'Alexander Graham Bell invented the telephone in 1876.', topic: 'History', difficulty: 'easy' },
  { id: 'gk_008', question: 'What is the currency of Japan?', options: { A: 'Won', B: 'Yuan', C: 'Yen', D: 'Rupee' }, correctAnswer: 'C', explanation: 'The Japanese Yen (¥) has been official since 1871.', topic: 'General', difficulty: 'easy' },
  { id: 'gk_009', question: 'Which country has the largest population?', options: { A: 'India', B: 'China', C: 'USA', D: 'Indonesia' }, correctAnswer: 'A', explanation: 'India surpassed China in 2023 to become the most populous country.', topic: 'Geography', difficulty: 'medium' },
  { id: 'gk_010', question: 'What is the tallest mountain in the world?', options: { A: 'K2', B: 'Mount Everest', C: 'Kangchenjunga', D: 'Lhotse' }, correctAnswer: 'B', explanation: 'Mount Everest at 8,848.86 meters is the tallest mountain.', topic: 'Geography', difficulty: 'easy' },
  
  // Current Affairs
  { id: 'ca_001', question: 'Which country hosted the G20 Summit in 2023?', options: { A: 'India', B: 'China', C: 'USA', D: 'Brazil' }, correctAnswer: 'A', explanation: 'India hosted the G20 Summit in New Delhi in September 2023.', topic: 'Current Affairs', difficulty: 'medium' },
  { id: 'ca_002', question: 'Who is the current Secretary-General of the UN?', options: { A: 'António Guterres', B: 'Ban Ki-moon', C: 'Kofi Annan', D: 'Jens Stoltenberg' }, correctAnswer: 'A', explanation: 'António Guterres has been serving since January 2017.', topic: 'Current Affairs', difficulty: 'medium' },
  { id: 'ca_003', question: 'Which Indian mission explored Moon\'s south pole?', options: { A: 'Chandrayaan-3', B: 'Mangalyaan', C: 'Aditya-L1', D: 'Gaganyaan' }, correctAnswer: 'A', explanation: 'Chandrayaan-3 successfully landed on Moon in August 2023.', topic: 'Current Affairs', difficulty: 'easy' },
  { id: 'ca_004', question: 'What is India\'s target year for carbon neutrality?', options: { A: '2070', B: '2050', C: '2030', D: '2060' }, correctAnswer: 'A', explanation: 'India announced net-zero by 2070 at COP26.', topic: 'Current Affairs', difficulty: 'hard' },
  { id: 'ca_005', question: 'Which state has highest literacy rate in India?', options: { A: 'Kerala', B: 'Mizoram', C: 'Goa', D: 'Tripura' }, correctAnswer: 'A', explanation: 'Kerala has approximately 96.2% literacy rate.', topic: 'Current Affairs', difficulty: 'medium' },
  
  // Science
  { id: 'sc_001', question: 'What is the powerhouse of the cell?', options: { A: 'Nucleus', B: 'Mitochondria', C: 'Ribosome', D: 'Cell membrane' }, correctAnswer: 'B', explanation: 'Mitochondria produce ATP through cellular respiration.', topic: 'Biology', difficulty: 'easy' },
  { id: 'sc_002', question: 'Which gas is most abundant in Earth\'s atmosphere?', options: { A: 'Oxygen', B: 'Nitrogen', C: 'Carbon dioxide', D: 'Argon' }, correctAnswer: 'B', explanation: 'Nitrogen makes up about 78% of Earth\'s atmosphere.', topic: 'Science', difficulty: 'easy' },
  { id: 'sc_003', question: 'What is the speed of light in vacuum?', options: { A: '3×10⁸ m/s', B: '3×10⁶ m/s', C: '3×10¹⁰ m/s', D: '3×10⁴ m/s' }, correctAnswer: 'A', explanation: 'Speed of light is approximately 3×10⁸ m/s.', topic: 'Physics', difficulty: 'medium' },
  { id: 'sc_004', question: 'Who proposed the theory of relativity?', options: { A: 'Isaac Newton', B: 'Albert Einstein', C: 'Galileo Galilei', D: 'Stephen Hawking' }, correctAnswer: 'B', explanation: 'Einstein published relativity theories in 1905 and 1915.', topic: 'Physics', difficulty: 'easy' },
  { id: 'sc_005', question: 'What is the chemical formula for water?', options: { A: 'H₂O', B: 'CO₂', C: 'O₂', D: 'H₂O₂' }, correctAnswer: 'A', explanation: 'Water is two hydrogen atoms bonded to one oxygen atom.', topic: 'Chemistry', difficulty: 'easy' },
  
  // Mathematics
  { id: 'ma_001', question: 'What is the value of Pi (π) up to two decimals?', options: { A: '3.14', B: '3.16', C: '3.12', D: '3.18' }, correctAnswer: 'A', explanation: 'Pi (π) is approximately 3.14159...', topic: 'Mathematics', difficulty: 'easy' },
  { id: 'ma_002', question: 'What is the square root of 144?', options: { A: '11', B: '12', C: '13', D: '14' }, correctAnswer: 'B', explanation: '√144 = 12 because 12 × 12 = 144.', topic: 'Mathematics', difficulty: 'easy' },
  { id: 'ma_003', question: 'How many degrees in a circle?', options: { A: '180', B: '270', C: '360', D: '90' }, correctAnswer: 'C', explanation: 'A complete circle contains 360 degrees.', topic: 'Mathematics', difficulty: 'easy' },
  { id: 'ma_004', question: 'What is 15% of 200?', options: { A: '25', B: '30', C: '35', D: '20' }, correctAnswer: 'B', explanation: '15% of 200 = (15/100) × 200 = 30.', topic: 'Mathematics', difficulty: 'easy' },
  { id: 'ma_005', question: 'What is the next prime after 7?', options: { A: '9', B: '11', C: '13', D: '17' }, correctAnswer: 'B', explanation: '11 is prime (divisible only by 1 and 11).', topic: 'Mathematics', difficulty: 'easy' },
  
  // History
  { id: 'hi_001', question: 'When did India gain independence?', options: { A: '1947', B: '1948', C: '1946', D: '1950' }, correctAnswer: 'A', explanation: 'India gained independence on August 15, 1947.', topic: 'History', difficulty: 'easy' },
  { id: 'hi_002', question: 'Who was first President of India?', options: { A: 'Jawaharlal Nehru', B: 'Dr. Rajendra Prasad', C: 'Sardar Patel', D: 'B.R. Ambedkar' }, correctAnswer: 'B', explanation: 'Dr. Rajendra Prasad served from 1950 to 1962.', topic: 'History', difficulty: 'easy' },
  { id: 'hi_003', question: 'When did World War II end?', options: { A: '1944', B: '1945', C: '1946', D: '1943' }, correctAnswer: 'B', explanation: 'WWII ended in 1945 with Germany and Japan surrendering.', topic: 'History', difficulty: 'medium' },
  { id: 'hi_004', question: 'Who discovered America?', options: { A: 'Vasco da Gama', B: 'Christopher Columbus', C: 'Amerigo Vespucci', D: 'Ferdinand Magellan' }, correctAnswer: 'B', explanation: 'Columbus reached Americas in 1492.', topic: 'History', difficulty: 'easy' },
  { id: 'hi_005', question: 'Who is called Iron Man of India?', options: { A: 'Jawaharlal Nehru', B: 'Sardar Vallabhbhai Patel', C: 'Subhas Chandra Bose', D: 'Mahatma Gandhi' }, correctAnswer: 'B', explanation: 'Sardar Patel unified India after independence.', topic: 'History', difficulty: 'easy' },
  
  // Reasoning
  { id: 'apt_001', question: 'If A = 1, B = 2, then CAT = ?', options: { A: '24', B: '25', C: '23', D: '26' }, correctAnswer: 'A', explanation: 'C=3, A=1, T=20. So CAT = 3+1+20 = 24.', topic: 'Reasoning', difficulty: 'easy' },
  { id: 'apt_002', question: 'Find odd one: 2, 5, 10, 17, 28, 37', options: { A: '10', B: '17', C: '28', D: '37' }, correctAnswer: 'C', explanation: 'Pattern: n² + 1. 5² + 1 = 26, not 28.', topic: 'Reasoning', difficulty: 'medium' },
  { id: 'apt_003', question: 'Complete: 1, 4, 9, 16, ?', options: { A: '20', B: '25', C: '30', D: '36' }, correctAnswer: 'B', explanation: 'Perfect squares: 1², 2², 3², 4², 5² = 25.', topic: 'Reasoning', difficulty: 'easy' },
  { id: 'apt_004', question: 'Find next: 2, 6, 12, 20, 30, ?', options: { A: '40', B: '42', C: '44', D: '46' }, correctAnswer: 'B', explanation: 'Pattern: n(n+1). 6×7 = 42.', topic: 'Reasoning', difficulty: 'medium' },
  { id: 'apt_005', question: 'If + means ÷, - means ×, what is 8 + 4 - 2?', options: { A: '4', B: '6', C: '2', D: '8' }, correctAnswer: 'A', explanation: '8 ÷ 4 × 2 = 2 × 2 = 4.', topic: 'Reasoning', difficulty: 'medium' },
  
  // English
  { id: 'en_001', question: 'Choose correct: He ___ to school daily.', options: { A: 'go', B: 'goes', C: 'going', D: 'gone' }, correctAnswer: 'B', explanation: 'Third person singular uses "goes".', topic: 'Grammar', difficulty: 'easy' },
  { id: 'en_002', question: 'Synonym of "Beautiful":', options: { A: 'Ugly', B: 'Gorgeous', C: 'Plain', D: 'Simple' }, correctAnswer: 'B', explanation: 'Gorgeous means very beautiful.', topic: 'Vocabulary', difficulty: 'easy' },
  { id: 'en_003', question: 'Antonym of "Ancient":', options: { A: 'Old', B: 'Antique', C: 'Modern', D: 'Historic' }, correctAnswer: 'C', explanation: 'Modern is opposite of ancient.', topic: 'Vocabulary', difficulty: 'easy' },
  { id: 'en_004', question: 'Plural of "Child":', options: { A: 'Childs', B: 'Children', C: 'Childrens', D: 'Childes' }, correctAnswer: 'B', explanation: 'Irregular plural: child → children.', topic: 'Grammar', difficulty: 'easy' },
  { id: 'en_005', question: 'Past tense of "Eat":', options: { A: 'Eated', B: 'Ate', C: 'Eaten', D: 'Eating' }, correctAnswer: 'B', explanation: 'Irregular verb: eat → ate → eaten.', topic: 'Grammar', difficulty: 'easy' },
  
  // Polity
  { id: 'pol_001', question: 'How many articles in Indian Constitution?', options: { A: '395', B: '448', C: '450', D: '470' }, correctAnswer: 'B', explanation: 'Currently 448 articles (originally 395).', topic: 'Polity', difficulty: 'medium' },
  { id: 'pol_002', question: 'Who is called Father of Constitution?', options: { A: 'Gandhi', B: 'Nehru', C: 'Ambedkar', D: 'Patel' }, correctAnswer: 'C', explanation: 'Dr. B.R. Ambedkar chaired Drafting Committee.', topic: 'Polity', difficulty: 'easy' },
  { id: 'pol_003', question: 'Minimum age to vote in India?', options: { A: '21', B: '18', C: '25', D: '16' }, correctAnswer: 'B', explanation: '18 years is minimum voting age since 1989.', topic: 'Polity', difficulty: 'easy' },
  { id: 'pol_004', question: 'India\'s Parliament has how many houses?', options: { A: '1', B: '2', C: '3', D: '4' }, correctAnswer: 'B', explanation: 'Lok Sabha (lower) and Rajya Sabha (upper).', topic: 'Polity', difficulty: 'easy' },
  { id: 'pol_005', question: 'RBI is headquartered in:', options: { A: 'Delhi', B: 'Mumbai', C: 'Kolkata', D: 'Chennai' }, correctAnswer: 'B', explanation: 'Reserve Bank of India is in Mumbai.', topic: 'Economics', difficulty: 'easy' },
];

// Generate daily tests
const generateDailyTests = (): DailyTest[] => {
  const tests: DailyTest[] = [];
  const categories = [
    { name: 'General Knowledge', prefixes: ['gk_'] },
    { name: 'Current Affairs', prefixes: ['ca_'] },
    { name: 'Science', prefixes: ['sc_'] },
    { name: 'Mathematics', prefixes: ['ma_'] },
    { name: 'History', prefixes: ['hi_'] },
    { name: 'Reasoning', prefixes: ['apt_'] },
  ];
  
  const usedIds = new Set<string>();
  
  categories.forEach((cat, i) => {
    const available = QUESTION_BANK.filter(q => 
      cat.prefixes.some(p => q.id.startsWith(p)) && !usedIds.has(q.id)
    );
    const selected = available.sort(() => Math.random() - 0.5).slice(0, 10);
    selected.forEach(q => usedIds.add(q.id));
    
    tests.push({
      id: `test_${i + 1}`,
      name: `Daily Test ${i + 1}: ${cat.name}`,
      date: new Date().toISOString().split('T')[0],
      questionCount: selected.length,
      duration: 600,
      category: cat.name,
      difficulty: 'Mixed',
      questionIds: selected.map(q => q.id)
    });
  });
  
  return tests;
};

const STORAGE_KEY = 'aura_test_results';

const DailyMockTest = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [activeTab, setActiveTab] = useState<'tests' | 'analysis'>('tests');
  const [dailyTests] = useState<DailyTest[]>(generateDailyTests());
  const [selectedTest, setSelectedTest] = useState<DailyTest | null>(null);
  const [testActive, setTestActive] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [timeLeft, setTimeLeft] = useState(600);
  const [testResult, setTestResult] = useState<TestResult | null>(null);
  const [showSolutions, setShowSolutions] = useState(false);
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [marked, setMarked] = useState<Set<string>>(new Set());

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) setTestResults(JSON.parse(saved));
  }, []);

  useEffect(() => {
    if (!testActive || timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) { handleSubmit(); return 0; }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [testActive, timeLeft]);

  const questions = useMemo(() => {
    if (!selectedTest) return [];
    return selectedTest.questionIds.map(id => QUESTION_BANK.find(q => q.id === id)).filter(Boolean) as Question[];
  }, [selectedTest]);

  const currentQ = questions[currentIndex];

  const formatTime = (s: number) => `${Math.floor(s/60).toString().padStart(2,'0')}:${(s%60).toString().padStart(2,'0')}`;

  const startTest = (test: DailyTest) => {
    setSelectedTest(test);
    setTestActive(true);
    setTimeLeft(test.duration);
    setCurrentIndex(0);
    setAnswers({});
    setMarked(new Set());
  };

  const handleSubmit = () => {
    if (!selectedTest) return;
    let correct = 0;
    questions.forEach(q => { if (answers[q.id] === q.correctAnswer) correct++; });
    
    const result: TestResult = {
      id: `r_${Date.now()}`,
      testId: selectedTest.id,
      testName: selectedTest.name,
      date: new Date().toISOString(),
      score: correct * 4,
      correctAnswers: correct,
      totalQuestions: questions.length,
      accuracy: Math.round((correct / questions.length) * 100),
      timeTaken: selectedTest.duration - timeLeft,
      answers,
      questionIds: selectedTest.questionIds
    };
    
    setTestResult(result);
    setTestActive(false);
    const updated = [...testResults, result];
    setTestResults(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    toast({ title: 'Test Submitted!', description: `Score: ${result.score}/${questions.length * 4}` });
  };

  const reset = () => {
    setSelectedTest(null);
    setTestResult(null);
    setShowSolutions(false);
    setTestActive(false);
  };

  // Active Test
  if (testActive && currentQ) {
    return (
      <div className="min-h-[100dvh] w-full bg-background flex flex-col">
        <header className="sticky top-0 z-50 bg-background border-b border-border px-4 py-3">
          <div className="flex items-center justify-between">
            <Button variant="ghost" size="sm" onClick={() => confirm('Exit?') && reset()}>
              <ArrowLeft className="w-4 h-4 mr-1" /> Exit
            </Button>
            <div className={`px-4 py-2 rounded-full font-mono text-lg font-bold ${timeLeft < 60 ? 'bg-destructive/10 text-destructive animate-pulse' : 'bg-primary/10 text-primary'}`}>
              <Timer className="w-5 h-5 inline mr-2" />
              {formatTime(timeLeft)}
            </div>
            <Button size="sm" onClick={handleSubmit}>Submit</Button>
          </div>
          <Progress value={(Object.keys(answers).length / questions.length) * 100} className="mt-2 h-1.5" />
        </header>

        <div className="px-4 py-2 overflow-x-auto border-b border-border">
          <div className="flex gap-2">
            {questions.map((q, i) => (
              <button key={q.id} onClick={() => setCurrentIndex(i)}
                className={`w-9 h-9 rounded-lg text-sm font-medium ${
                  i === currentIndex ? 'bg-primary text-primary-foreground' :
                  marked.has(q.id) ? 'bg-yellow-500/20 text-yellow-700' :
                  answers[q.id] ? 'bg-green-500/20 text-green-700' : 'bg-secondary'
                }`}>{i + 1}</button>
            ))}
          </div>
        </div>

        <main className="flex-1 px-4 py-4 overflow-y-auto">
          <AnimatePresence mode="wait">
            <motion.div key={currentQ.id} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
              <Card>
                <CardContent className="pt-5">
                  <div className="flex gap-2 mb-3">
                    <Badge variant="outline">{currentQ.topic}</Badge>
                    <Badge className={currentQ.difficulty === 'easy' ? 'bg-green-500/20' : currentQ.difficulty === 'medium' ? 'bg-yellow-500/20' : 'bg-red-500/20'}>{currentQ.difficulty}</Badge>
                  </div>
                  <p className="text-base font-medium">Q{currentIndex + 1}. {currentQ.question}</p>
                </CardContent>
              </Card>

              <RadioGroup value={answers[currentQ.id] || ''} onValueChange={v => setAnswers(p => ({ ...p, [currentQ.id]: v }))} className="space-y-3">
                {Object.entries(currentQ.options).map(([k, v]) => (
                  <Label key={k} htmlFor={`o-${k}`} className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer ${answers[currentQ.id] === k ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'}`}>
                    <RadioGroupItem value={k} id={`o-${k}`} />
                    <span className="font-semibold text-primary">{k}.</span>
                    <span>{v}</span>
                  </Label>
                ))}
              </RadioGroup>
            </motion.div>
          </AnimatePresence>
        </main>

        <div className="px-4 py-4 border-t flex gap-3">
          <Button variant="outline" className="flex-1" disabled={currentIndex === 0} onClick={() => setCurrentIndex(p => p - 1)}>Previous</Button>
          {currentIndex < questions.length - 1 ? (
            <Button className="flex-1" onClick={() => setCurrentIndex(p => p + 1)}>Next</Button>
          ) : (
            <Button className="flex-1 bg-green-600 hover:bg-green-700" onClick={handleSubmit}>Submit</Button>
          )}
        </div>
      </div>
    );
  }

  // Result
  if (testResult) {
    const rQuestions = testResult.questionIds.map(id => QUESTION_BANK.find(q => q.id === id)).filter(Boolean) as Question[];
    return (
      <div className="min-h-[100dvh] w-full bg-background pb-24">
        <header className="sticky top-0 z-50 bg-background border-b border-border px-4 py-3">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={reset}><ArrowLeft className="w-5 h-5" /></Button>
            <h1 className="font-bold text-lg">Test Results</h1>
          </div>
        </header>

        <main className="px-4 py-6 space-y-6">
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
            <Card className="overflow-hidden">
              <div className={`p-6 text-center ${testResult.accuracy >= 70 ? 'bg-gradient-to-br from-green-500 to-emerald-600' : testResult.accuracy >= 40 ? 'bg-gradient-to-br from-yellow-500 to-orange-500' : 'bg-gradient-to-br from-red-500 to-rose-600'} text-white`}>
                <Trophy className="w-12 h-12 mx-auto mb-3" />
                <p className="text-5xl font-bold">{testResult.score}/{testResult.totalQuestions * 4}</p>
              </div>
              <CardContent className="p-4">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div><p className="text-2xl font-bold text-green-600">{testResult.accuracy}%</p><p className="text-xs text-muted-foreground">Accuracy</p></div>
                  <div><p className="text-2xl font-bold text-blue-600">{formatTime(testResult.timeTaken)}</p><p className="text-xs text-muted-foreground">Time</p></div>
                  <div><p className="text-2xl font-bold text-primary">{testResult.correctAnswers}/{testResult.totalQuestions}</p><p className="text-xs text-muted-foreground">Correct</p></div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <div className="flex gap-3">
            <Button onClick={() => setShowSolutions(!showSolutions)} className="flex-1"><BookOpen className="w-4 h-4 mr-2" />{showSolutions ? 'Hide' : 'View'} Solutions</Button>
            <Button variant="outline" onClick={reset}><RotateCcw className="w-4 h-4 mr-2" />Done</Button>
          </div>

          {showSolutions && (
            <div className="space-y-4">
              {rQuestions.map((q, i) => {
                const ua = testResult.answers[q.id];
                const ok = ua === q.correctAnswer;
                return (
                  <Card key={q.id} className={`border-l-4 ${ok ? 'border-l-green-500' : ua ? 'border-l-red-500' : 'border-l-gray-400'}`}>
                    <CardContent className="pt-4">
                      <div className="flex justify-between mb-2">
                        <Badge variant="secondary">Q{i + 1}</Badge>
                        <Badge className={ok ? 'bg-green-500' : ua ? 'bg-red-500' : 'bg-gray-500'}>{ok ? 'Correct' : ua ? 'Wrong' : 'Skipped'}</Badge>
                      </div>
                      <p className="font-medium mb-3 text-sm">{q.question}</p>
                      <div className="space-y-1.5 mb-3">
                        {Object.entries(q.options).map(([k, v]) => (
                          <div key={k} className={`p-2 rounded text-sm ${q.correctAnswer === k ? 'bg-green-500/10 border border-green-500/30' : ua === k ? 'bg-red-500/10 border border-red-500/30' : 'bg-secondary/50'}`}>
                            <span className="font-medium">{k}.</span> {v}
                            {q.correctAnswer === k && <CheckCircle className="w-4 h-4 inline ml-2 text-green-500" />}
                            {ua === k && ua !== q.correctAnswer && <XCircle className="w-4 h-4 inline ml-2 text-red-500" />}
                          </div>
                        ))}
                      </div>
                      <div className="p-3 bg-primary/5 rounded-lg"><p className="text-sm"><strong>💡</strong> {q.explanation}</p></div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </main>
      </div>
    );
  }

  // Home
  return (
    <div className="min-h-[100dvh] w-full bg-background pb-24">
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="flex items-center gap-3 px-4 py-3">
          <Button variant="ghost" size="icon" onClick={() => navigate('/home')}><ArrowLeft className="w-5 h-5" /></Button>
          <div className="flex-1">
            <h1 className="text-lg font-bold flex items-center gap-2"><Target className="w-5 h-5 text-primary" />Daily Mock Tests</h1>
            <p className="text-xs text-muted-foreground">Practice daily, improve constantly</p>
          </div>
        </div>
        <Tabs value={activeTab} onValueChange={v => setActiveTab(v as any)} className="px-4 pb-2">
          <TabsList className="w-full grid grid-cols-2">
            <TabsTrigger value="tests"><FileText className="w-4 h-4 mr-2" />Tests</TabsTrigger>
            <TabsTrigger value="analysis"><BarChart3 className="w-4 h-4 mr-2" />Analysis</TabsTrigger>
          </TabsList>
        </Tabs>
      </header>

      <main className="px-4 py-4 space-y-4">
        {activeTab === 'tests' ? (
          <>
            <div className="grid grid-cols-3 gap-3">
              <Card className="p-3 text-center"><div className="text-2xl font-bold text-primary">{testResults.length}</div><div className="text-xs text-muted-foreground">Completed</div></Card>
              <Card className="p-3 text-center"><div className="text-2xl font-bold text-green-600">{testResults.length ? Math.round(testResults.reduce((a, b) => a + b.accuracy, 0) / testResults.length) : 0}%</div><div className="text-xs text-muted-foreground">Avg Accuracy</div></Card>
              <Card className="p-3 text-center"><div className="text-2xl font-bold text-blue-600">{dailyTests.length}</div><div className="text-xs text-muted-foreground">Available</div></Card>
            </div>

            <h2 className="font-semibold text-lg flex items-center gap-2"><Zap className="w-5 h-5 text-yellow-500" />Today's Tests</h2>
            {dailyTests.map((test, i) => {
              const done = testResults.some(r => r.testId === test.id);
              const prev = testResults.find(r => r.testId === test.id);
              return (
                <motion.div key={test.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                  <Card className={done ? 'border-green-500/30' : ''}>
                    <CardContent className="p-4">
                      <div className="flex items-start gap-4">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-md ${done ? 'bg-green-500/20' : 'bg-gradient-to-br from-primary to-primary/70'}`}>
                          {done ? <CheckCircle className="w-6 h-6 text-green-600" /> : <Brain className="w-6 h-6 text-primary-foreground" />}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold">{test.name}</h3>
                          <div className="flex flex-wrap gap-2 mt-1">
                            <Badge variant="outline" className="text-xs">{test.questionCount} Qs</Badge>
                            <Badge variant="outline" className="text-xs">{test.duration / 60} mins</Badge>
                          </div>
                          {prev && <div className="mt-2 text-sm text-green-600 font-medium">Score: {prev.score}/{prev.totalQuestions * 4} ({prev.accuracy}%)</div>}
                        </div>
                        <Button size="sm" onClick={() => startTest(test)} variant={done ? "outline" : "default"}>
                          {done ? 'Retry' : 'Start'}<ChevronRight className="w-4 h-4 ml-1" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </>
        ) : (
          <div className="space-y-4">
            <h2 className="font-semibold text-lg flex items-center gap-2"><TrendingUp className="w-5 h-5 text-primary" />Performance</h2>
            {testResults.length === 0 ? (
              <Card className="p-8 text-center"><BarChart3 className="w-12 h-12 mx-auto text-muted-foreground mb-3" /><h3 className="font-semibold mb-1">No Tests Yet</h3><p className="text-sm text-muted-foreground">Complete tests to see analysis</p></Card>
            ) : (
              <>
                <Card className="p-4"><div className="grid grid-cols-2 gap-4">
                  <div><p className="text-sm text-muted-foreground">Total Tests</p><p className="text-2xl font-bold">{testResults.length}</p></div>
                  <div><p className="text-sm text-muted-foreground">Best Score</p><p className="text-2xl font-bold text-green-600">{Math.max(...testResults.map(r => r.accuracy))}%</p></div>
                  <div><p className="text-sm text-muted-foreground">Total Questions</p><p className="text-2xl font-bold">{testResults.reduce((a, b) => a + b.totalQuestions, 0)}</p></div>
                  <div><p className="text-sm text-muted-foreground">Correct Answers</p><p className="text-2xl font-bold text-primary">{testResults.reduce((a, b) => a + b.correctAnswers, 0)}</p></div>
                </div></Card>
                <h3 className="font-semibold">Recent</h3>
                {testResults.slice().reverse().map(r => (
                  <Card key={r.id} className="p-4"><div className="flex items-center justify-between">
                    <div><h4 className="font-medium">{r.testName}</h4><p className="text-xs text-muted-foreground">{new Date(r.date).toLocaleDateString()}</p></div>
                    <div className="text-right"><p className={`text-lg font-bold ${r.accuracy >= 70 ? 'text-green-600' : r.accuracy >= 40 ? 'text-yellow-600' : 'text-red-600'}`}>{r.accuracy}%</p><p className="text-xs text-muted-foreground">{r.score}/{r.totalQuestions * 4}</p></div>
                  </div></Card>
                ))}
              </>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default DailyMockTest;
