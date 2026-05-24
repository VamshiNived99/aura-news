import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Code, Cpu, Zap, Building, Cog } from "lucide-react";

const EngineeringBranches = () => {
  const navigate = useNavigate();

  const branches = [
    {
      id: 'cse-aiml',
      name: 'CSE - AI & ML',
      regulation: 'R22',
      description: 'Computer Science with Artificial Intelligence and Machine Learning specialization',
      icon: Code,
      gradient: 'from-blue-500 to-purple-500',
      years: 4,
      subjects: 45
    },
    {
      id: 'cse',
      name: 'CSE',
      regulation: 'R22',
      description: 'Core Computer Science and Engineering curriculum',
      icon: Cpu,
      gradient: 'from-cyan-500 to-blue-500',
      years: 4,
      subjects: 42
    },
    {
      id: 'ece',
      name: 'ECE',
      regulation: 'R22',
      description: 'Electronics and Communication Engineering',
      icon: Zap,
      gradient: 'from-yellow-500 to-orange-500',
      years: 4,
      subjects: 40
    },
    {
      id: 'eee',
      name: 'EEE',
      regulation: 'R22',
      description: 'Electrical and Electronics Engineering',
      icon: Zap,
      gradient: 'from-green-500 to-teal-500',
      years: 4,
      subjects: 38
    },
    {
      id: 'civil',
      name: 'Civil',
      regulation: 'R22',
      description: 'Civil Engineering fundamentals and applications',
      icon: Building,
      gradient: 'from-gray-500 to-slate-500',
      years: 4,
      subjects: 36
    },
    {
      id: 'mechanical',
      name: 'Mechanical',
      regulation: 'R18',
      description: 'Mechanical Engineering core concepts',
      icon: Cog,
      gradient: 'from-red-500 to-pink-500',
      years: 4,
      subjects: 35
    }
  ];

  return (
    <div className="min-h-[100dvh] w-full bg-background pb-24">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="flex items-center gap-3 px-4 py-3">
          <Button variant="ghost" size="icon" onClick={() => navigate('/exam-prep')}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-lg font-bold">Engineering Branches</h1>
            <p className="text-xs text-muted-foreground">Choose your branch</p>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="w-full px-4 py-4 space-y-3">
        {branches.map(branch => {
          const Icon = branch.icon;
          return (
            <Card
              key={branch.id}
              className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              onClick={() => navigate(`/exam-prep/engineering/${branch.id}`)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${branch.gradient} shadow-lg`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <CardTitle className="text-xl">{branch.name}</CardTitle>
                      <Badge variant="outline" className="text-xs">
                        {branch.regulation}
                      </Badge>
                    </div>
                    <CardDescription>{branch.description}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex gap-3 text-sm text-muted-foreground">
                    <span>{branch.years} Years</span>
                    <span>•</span>
                    <span>{branch.subjects}+ Subjects</span>
                  </div>
                  <Button variant="ghost" size="sm" className="group">
                    <span>View Syllabus</span>
                    <span className="group-hover:translate-x-1 transition-transform ml-2">→</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default EngineeringBranches;
