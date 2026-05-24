import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  BookOpen, Code, Brain, ArrowLeft, Sparkles, 
  GraduationCap, Building2, Calculator, ChevronRight 
} from "lucide-react";
import { motion } from "framer-motion";

const ExamPrepHome = () => {
  const navigate = useNavigate();

  const sections = [
    {
      id: 'ncert',
      title: 'NCERT Books',
      description: 'Classes 6–12 (NCERT)',
      icon: GraduationCap,
      gradient: 'from-emerald-500 to-teal-600',
      route: '/exam-prep/ncert',
      badge: 'UPDATED',
      stats: '7 Classes • 30+ Subjects'
    },
    {
      id: 'ai-prep',
      title: 'AI Preparation',
      description: 'AI/ML concepts & interview prep',
      icon: Sparkles,
      gradient: 'from-pink-500 to-rose-600',
      route: '/exam-prep/ai-prep',
      badge: 'HOT',
      stats: 'ML • DL • NLP • CV'
    },
    {
      id: 'govt-exams',
      title: 'Government Exams',
      description: 'UPSC, SSC, RRB, Banking & more',
      icon: Building2,
      gradient: 'from-blue-500 to-cyan-600',
      route: '/exam-prep/govt-exams',
      stats: '15+ Exams Covered'
    },
    {
      id: 'engineering',
      title: 'Engineering',
      description: 'CSE, ECE, EEE, Civil, Mechanical',
      icon: Code,
      gradient: 'from-purple-500 to-indigo-600',
      route: '/exam-prep/engineering',
      stats: '5 Branches • 4 Years'
    },
    {
      id: 'competitive',
      title: 'Competitive Exams',
      description: 'JEE, NEET, GATE, CAT & more',
      icon: Brain,
      gradient: 'from-green-500 to-emerald-600',
      route: '/exam-prep/competitive',
      stats: '10+ Major Exams'
    },
    {
      id: 'aptitude',
      title: 'Aptitude',
      description: 'Quantitative, Logical, Verbal',
      icon: Calculator,
      gradient: 'from-orange-500 to-amber-600',
      route: '/exam-prep/aptitude',
      stats: '100+ Topics'
    },
    {
      id: 'programming',
      title: 'Programming',
      description: 'Python, Java, C++, JS & Compiler',
      icon: Code,
      gradient: 'from-indigo-500 to-violet-600',
      route: '/exam-prep/programming',
      stats: '8 Languages'
    }
  ];

  return (
    <div className="min-h-[100dvh] w-full bg-background pb-24">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-gradient-to-r from-primary/10 to-primary/5 backdrop-blur-sm border-b border-border">
        <div className="flex items-center gap-3 px-4 py-4">
          <Button variant="ghost" size="icon" onClick={() => navigate('/home')} className="shrink-0">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex-1">
            <h1 className="text-xl font-bold">Exam Preparation</h1>
            <p className="text-xs text-muted-foreground">Choose your learning path</p>
          </div>
          <BookOpen className="w-6 h-6 text-primary" />
        </div>
      </header>

      {/* Stats Bar */}
      <div className="px-4 py-4 bg-card border-b border-border">
        <div className="grid grid-cols-3 gap-3 text-center">
          <div className="p-3 rounded-xl bg-primary/5">
            <p className="text-2xl font-bold text-primary">50+</p>
            <p className="text-xs text-muted-foreground">Exams</p>
          </div>
          <div className="p-3 rounded-xl bg-green-500/5">
            <p className="text-2xl font-bold text-green-600">1K+</p>
            <p className="text-xs text-muted-foreground">Questions</p>
          </div>
          <div className="p-3 rounded-xl bg-blue-500/5">
            <p className="text-2xl font-bold text-blue-600">100+</p>
            <p className="text-xs text-muted-foreground">Tests</p>
          </div>
        </div>
      </div>

      {/* Sections Grid */}
      <div className="px-4 py-4 space-y-3">
        {sections.map((section, index) => {
          const Icon = section.icon;
          return (
            <motion.div
              key={section.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <button
                onClick={() => navigate(section.route)}
                className="w-full p-4 rounded-2xl bg-card border border-border hover:border-primary/30 hover:shadow-lg transition-all duration-300 text-left group"
              >
                <div className="flex items-center gap-4">
                  {/* Icon */}
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${section.gradient} flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-base">{section.title}</h3>
                      {section.badge && (
                        <Badge className="text-[10px] px-1.5 py-0 bg-gradient-to-r from-pink-500 to-rose-500 text-white border-0">
                          {section.badge}
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-1">{section.description}</p>
                    <p className="text-xs text-primary mt-1">{section.stats}</p>
                  </div>
                  
                  {/* Arrow */}
                  <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </div>
              </button>
            </motion.div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="px-4 py-4">
        <h3 className="text-sm font-semibold mb-3 text-muted-foreground">Quick Actions</h3>
        <div className="grid grid-cols-2 gap-3">
          <Button 
            variant="outline" 
            className="h-auto py-4 flex-col gap-2"
            onClick={() => navigate('/exam-prep/mock-test/quick?category=General&topic=Mixed&questions=10&duration=15&return=/exam-prep')}
          >
            <Brain className="w-5 h-5 text-primary" />
            <span className="text-xs">Quick Test</span>
          </Button>
          <Button 
            variant="outline" 
            className="h-auto py-4 flex-col gap-2"
            onClick={() => navigate('/exam-prep/programming/compiler')}
          >
            <Code className="w-5 h-5 text-green-600" />
            <span className="text-xs">Code Compiler</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ExamPrepHome;
