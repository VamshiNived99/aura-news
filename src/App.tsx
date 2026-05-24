import { useState, useEffect, lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { PageTransition } from "@/components/PageTransition";
import { MainLayout } from "@/components/MainLayout";
import { PermissionScreen } from "@/components/PermissionScreen";
import TestFeed from "@/pages/TestFeed";

// Retry dynamic imports once, then hard-reload so users never get stuck on a
// stale chunk hash (common cause of "Failed to fetch dynamically imported module").
const lazyWithRetry = <T extends { default: React.ComponentType<any> }>(
  factory: () => Promise<T>
) =>
  lazy(async () => {
    try {
      return await factory();
    } catch (err) {
      const key = "__chunk_reload__";
      if (!sessionStorage.getItem(key)) {
        sessionStorage.setItem(key, "1");
        window.location.reload();
        // Return a stub while the page reloads.
        return { default: () => null } as unknown as T;
      }
      throw err;
    }
  });

// Eager-load top-level entry routes for fast first paint
import Home from "./pages/Home";

// Lazy-load everything else to shrink initial bundle and speed up startup
const Onboarding = lazyWithRetry(() => import("./pages/Onboarding"));
const News = lazyWithRetry(() => import("./pages/News"));
const Tech = lazyWithRetry(() => import("./pages/Tech"));
const Jobs = lazyWithRetry(() => import("./pages/Jobs"));
const ExamPrepHome = lazyWithRetry(() => import("./pages/ExamPrepHome"));
const AIPrepHome = lazyWithRetry(() => import("./pages/AIPrepHome"));
const NCERTHome = lazyWithRetry(() => import("./pages/NCERTHome"));
const NCERTContent = lazyWithRetry(() => import("./pages/NCERTContent"));
const NCERTChapterViewer = lazyWithRetry(() => import("./pages/NCERTChapterViewer"));
const DailyMockTest = lazyWithRetry(() => import("./pages/DailyMockTest"));
const WeeklyLeaderboard = lazyWithRetry(() => import("./pages/WeeklyLeaderboard"));
const GovtExamsList = lazyWithRetry(() => import("./pages/GovtExamsList"));
const GovtExamDetails = lazyWithRetry(() => import("./pages/GovtExamDetails"));
const GovtExamTopic = lazyWithRetry(() => import("./pages/GovtExamTopic"));
const GovtExamContent = lazyWithRetry(() => import("./pages/GovtExamContent"));
const EngineeringBranches = lazyWithRetry(() => import("./pages/EngineeringBranches"));
const BranchYears = lazyWithRetry(() => import("./pages/BranchYears"));
const SemesterList = lazyWithRetry(() => import("./pages/SemesterList"));
const SubjectsList = lazyWithRetry(() => import("./pages/SubjectsList"));
const SubjectDetails = lazyWithRetry(() => import("./pages/SubjectDetails"));
const ChapterContent = lazyWithRetry(() => import("./pages/ChapterContent"));
const AptitudeHome = lazyWithRetry(() => import("./pages/AptitudeHome"));
const AptitudeCategory = lazyWithRetry(() => import("./pages/AptitudeCategory"));
const AptitudeTopic = lazyWithRetry(() => import("./pages/AptitudeTopic"));
const AptitudeContent = lazyWithRetry(() => import("./pages/AptitudeContent"));
const CompetitiveExamsHome = lazyWithRetry(() => import("./pages/CompetitiveExamsHome"));
const CompetitiveExamDetails = lazyWithRetry(() => import("./pages/CompetitiveExamDetails"));
const CompetitiveExamTopic = lazyWithRetry(() => import("./pages/CompetitiveExamTopic"));
const CompetitiveExamContent = lazyWithRetry(() => import("./pages/CompetitiveExamContent"));
const ProgrammingHome = lazyWithRetry(() => import("./pages/ProgrammingHome"));
const ProgrammingLanguageDetails = lazyWithRetry(() => import("./pages/ProgrammingLanguageDetails"));
const ProgrammingTopic = lazyWithRetry(() => import("./pages/ProgrammingTopic"));
const ProgrammingContent = lazyWithRetry(() => import("./pages/ProgrammingContent"));
const CodeCompiler = lazyWithRetry(() => import("./pages/CodeCompiler"));
const MockTest = lazyWithRetry(() => import("./pages/MockTest"));
const QuickMockTest = lazyWithRetry(() => import("./pages/QuickMockTest"));
const Profile = lazyWithRetry(() => import("./pages/Profile"));
const PrivacyPolicy = lazyWithRetry(() => import("./pages/PrivacyPolicy"));
const TermsOfService = lazyWithRetry(() => import("./pages/TermsOfService"));
const SavedArticles = lazyWithRetry(() => import("./pages/SavedArticles"));
const ExamPrep = lazyWithRetry(() => import("./pages/ExamPrep"));
const CurrentAffairs = lazyWithRetry(() => import("./pages/CurrentAffairs"));
const NotFound = lazyWithRetry(() => import("./pages/NotFound"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60_000,
      gcTime: 5 * 60_000,
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

const RouteFallback = () => (
  <div className="min-h-[60vh] flex items-center justify-center bg-background">
    <div className="animate-spin rounded-full h-8 w-8 border-2 border-primary/20 border-t-primary" />
  </div>
);

const AnimatedRoutes = () => {
  const location = useLocation();
  const [showPermissions, setShowPermissions] = useState(false);
  const [permissionsChecked, setPermissionsChecked] = useState(false);

  useEffect(() => {
    const permissionsShown = localStorage.getItem('permissionsShown');
    if (!permissionsShown) {
      setShowPermissions(true);
    }
    setPermissionsChecked(true);
  }, []);

  if (!permissionsChecked) {
    return null;
  }

  if (showPermissions) {
    return <PermissionScreen onComplete={() => setShowPermissions(false)} />;
  }
  
  return (
    <Routes location={location}>
      <Route path="/" element={<Navigate to="/home" replace />} />
      <Route path="/index" element={<Navigate to="/home" replace />} />
      <Route path="/index.html" element={<Navigate to="/home" replace />} />
      <Route path="/auth" element={<Navigate to="/home" replace />} />
      <Route path="/onboarding" element={<Suspense fallback={<RouteFallback />}><PageTransition><Onboarding /></PageTransition></Suspense>} />
      <Route
  path="/test-feed"
  element={<TestFeed />}
/>
      <Route path="/*" element={
        <MainLayout>
          <AnimatePresence mode="wait">
            <Suspense fallback={<RouteFallback />}>
              <Routes location={location} key={location.pathname}>
                <Route path="/home" element={<PageTransition><Home /></PageTransition>} />
                <Route path="/news" element={<PageTransition><News /></PageTransition>} />
                <Route path="/jobs" element={<PageTransition><Jobs /></PageTransition>} />
                <Route path="/tech" element={<PageTransition><Tech /></PageTransition>} />
                <Route path="/current-affairs" element={<PageTransition><CurrentAffairs /></PageTransition>} />
                <Route path="/daily-test" element={<PageTransition><DailyMockTest /></PageTransition>} />
                <Route path="/daily-test/weekly" element={<PageTransition><WeeklyLeaderboard /></PageTransition>} />
                <Route path="/profile" element={<PageTransition><Profile /></PageTransition>} />
                
                <Route path="/exam-prep" element={<PageTransition><ExamPrepHome /></PageTransition>} />
                <Route path="/exam-prep/ai-prep" element={<PageTransition><AIPrepHome /></PageTransition>} />
                <Route path="/exam-prep/ncert" element={<PageTransition><NCERTHome /></PageTransition>} />
                <Route path="/exam-prep/ncert/viewer" element={<PageTransition><NCERTChapterViewer /></PageTransition>} />
                <Route path="/exam-prep/ncert/content" element={<PageTransition><NCERTContent /></PageTransition>} />
                
                <Route path="/exam-prep/govt-exams" element={<PageTransition><GovtExamsList /></PageTransition>} />
                <Route path="/exam-prep/govt-exams/:examId" element={<PageTransition><GovtExamDetails /></PageTransition>} />
                <Route path="/exam-prep/govt-exams/:examId/:topicId" element={<PageTransition><GovtExamTopic /></PageTransition>} />
                <Route path="/exam-prep/govt-exams/:examId/:topicId/content" element={<PageTransition><GovtExamContent /></PageTransition>} />
                
                <Route path="/exam-prep/engineering" element={<PageTransition><EngineeringBranches /></PageTransition>} />
                <Route path="/exam-prep/engineering/:branchId" element={<PageTransition><BranchYears /></PageTransition>} />
                <Route path="/exam-prep/engineering/:branchId/:yearIndex" element={<PageTransition><SemesterList /></PageTransition>} />
                <Route path="/exam-prep/engineering/:branchId/:yearIndex/:semesterIndex" element={<PageTransition><SubjectsList /></PageTransition>} />
                <Route path="/exam-prep/engineering/:branchId/:yearIndex/:semesterIndex/:subjectIndex" element={<PageTransition><SubjectDetails /></PageTransition>} />
                <Route path="/exam-prep/engineering/:branchId/:yearIndex/:semesterIndex/:subjectIndex/content" element={<PageTransition><ChapterContent /></PageTransition>} />
                
                <Route path="/exam-prep/aptitude" element={<PageTransition><AptitudeHome /></PageTransition>} />
                <Route path="/exam-prep/aptitude/:categoryId" element={<PageTransition><AptitudeCategory /></PageTransition>} />
                <Route path="/exam-prep/aptitude/:categoryId/:topicId" element={<PageTransition><AptitudeTopic /></PageTransition>} />
                <Route path="/exam-prep/aptitude/:categoryId/:topicId/content" element={<PageTransition><AptitudeContent /></PageTransition>} />
                
                <Route path="/exam-prep/competitive" element={<PageTransition><CompetitiveExamsHome /></PageTransition>} />
                <Route path="/exam-prep/competitive/:examId" element={<PageTransition><CompetitiveExamDetails /></PageTransition>} />
                <Route path="/exam-prep/competitive/:examId/:topicId" element={<PageTransition><CompetitiveExamTopic /></PageTransition>} />
                <Route path="/exam-prep/competitive/:examId/:topicId/content" element={<PageTransition><CompetitiveExamContent /></PageTransition>} />
                
                <Route path="/exam-prep/programming" element={<PageTransition><ProgrammingHome /></PageTransition>} />
                <Route path="/exam-prep/programming/compiler" element={<PageTransition><CodeCompiler /></PageTransition>} />
                <Route path="/exam-prep/programming/:langId" element={<PageTransition><ProgrammingLanguageDetails /></PageTransition>} />
                <Route path="/exam-prep/programming/:langId/:topicId" element={<PageTransition><ProgrammingTopic /></PageTransition>} />
                <Route path="/exam-prep/programming/:langId/:topicId/content" element={<PageTransition><ProgrammingContent /></PageTransition>} />
                
                <Route path="/exam-prep/mock-test/quick" element={<PageTransition><QuickMockTest /></PageTransition>} />
                <Route path="/exam-prep/mock-test/:testId" element={<PageTransition><MockTest /></PageTransition>} />
                
                <Route path="/privacy-policy" element={<PageTransition><PrivacyPolicy /></PageTransition>} />
                <Route path="/terms-of-service" element={<PageTransition><TermsOfService /></PageTransition>} />
                <Route path="/saved-articles" element={<PageTransition><SavedArticles /></PageTransition>} />
                <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
              </Routes>
            </Suspense>
          </AnimatePresence>
        </MainLayout>
      } />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AnimatedRoutes />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
