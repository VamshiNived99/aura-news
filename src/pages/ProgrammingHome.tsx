import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Code, Play } from "lucide-react";
import { programmingLanguages } from "@/data/programmingLanguages";

const ProgrammingHome = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-[100dvh] w-full bg-background pb-24">
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="flex items-center gap-3 px-4 py-3">
          <Button variant="ghost" size="icon" onClick={() => navigate('/exam-prep')}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-lg font-bold">Programming Languages</h1>
            <p className="text-xs text-muted-foreground">Learn to code with examples</p>
          </div>
        </div>
      </header>

      {/* Compiler CTA */}
      <div className="px-4 py-4">
        <Card className="bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20 cursor-pointer" onClick={() => navigate('/exam-prep/programming/compiler')}>
          <CardContent className="flex items-center gap-4 py-4">
            <div className="p-3 rounded-xl bg-primary text-primary-foreground">
              <Play className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold">Code Compiler</h3>
              <p className="text-xs text-muted-foreground">Write and run code in multiple languages</p>
            </div>
            <span className="text-xl">→</span>
          </CardContent>
        </Card>
      </div>

      <div className="w-full px-4 space-y-3">
        <h2 className="text-base font-semibold">Choose a Language</h2>
        <div className="grid grid-cols-2 gap-3">
          {programmingLanguages.map(lang => (
            <Card key={lang.id} className="cursor-pointer hover:shadow-lg transition-all" onClick={() => navigate(`/exam-prep/programming/${lang.id}`)}>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">{lang.icon}</span>
                  <span className="font-semibold text-sm">{lang.name}</span>
                </div>
                <Badge variant={lang.difficulty === 'beginner' ? 'default' : lang.difficulty === 'intermediate' ? 'secondary' : 'destructive'} className="text-[10px]">
                  {lang.difficulty}
                </Badge>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProgrammingHome;
