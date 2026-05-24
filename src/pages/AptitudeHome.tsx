import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ChevronRight, Play, Zap } from "lucide-react";
import { aptitudeData } from "@/data/aptitude";

const AptitudeHome = () => {
  const navigate = useNavigate();

  const totalTopics = aptitudeData.reduce((acc, cat) => acc + cat.topics.length, 0);

  return (
    <div className="min-h-[100dvh] w-full bg-background pb-24">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border safe-area-top">
        <div className="flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 sm:py-3">
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8 sm:h-9 sm:w-9"
            onClick={() => navigate('/exam-prep')}
          >
            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          </Button>
          <div>
            <h1 className="text-base sm:text-lg font-bold">Aptitude</h1>
            <p className="text-[10px] sm:text-xs text-muted-foreground">Master reasoning & problem-solving</p>
          </div>
        </div>
      </header>

      {/* Quick Mock Test Card */}
      <div className="px-3 sm:px-4 py-3">
        <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base flex items-center gap-2">
                <Zap className="w-4 h-4 text-primary" />
                Quick Aptitude Test
              </CardTitle>
              <Badge variant="secondary" className="text-[10px]">AI Powered</Badge>
            </div>
            <CardDescription className="text-xs">Test your skills with AI-generated questions</CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              className="w-full"
              onClick={() => navigate('/exam-prep/mock-test/quick?type=aptitude&name=Aptitude%20Quick%20Test')}
            >
              <Play className="w-4 h-4 mr-2" />
              Start Quick Test
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Categories */}
      <div className="w-full px-3 sm:px-4 py-3 sm:py-4 space-y-3 sm:space-y-4">
        {aptitudeData.map((category) => (
          <Card
            key={category.id}
            className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden"
            onClick={() => navigate(`/exam-prep/aptitude/${category.id}`)}
          >
            <div className={`h-1.5 sm:h-2 bg-gradient-to-r ${category.gradient}`} />
            <CardHeader className="pb-2 sm:pb-3 pt-3 sm:pt-4 px-3 sm:px-4">
              <div className="flex items-start gap-3">
                <div className={`p-2 sm:p-3 rounded-xl bg-gradient-to-br ${category.gradient} shadow-lg text-xl sm:text-2xl`}>
                  {category.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <CardTitle className="text-base sm:text-lg mb-1">{category.name}</CardTitle>
                  <CardDescription className="text-xs sm:text-sm line-clamp-2">{category.description}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="px-3 sm:px-4 pb-3 sm:pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="text-[10px] sm:text-xs">
                    {category.topics.length} Topics
                  </Badge>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="h-7 text-xs"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/exam-prep/mock-test/quick?type=aptitude&category=${category.id}&name=${encodeURIComponent(category.name + ' Test')}`);
                    }}
                  >
                    <Play className="w-3 h-3 mr-1" />
                    Test
                  </Button>
                </div>
                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Stats */}
      <div className="w-full px-3 sm:px-4 mt-4 sm:mt-6">
        <h3 className="text-sm sm:text-base font-semibold mb-3">Overview</h3>
        <div className="grid grid-cols-3 gap-2 sm:gap-3">
          <Card className="text-center">
            <CardContent className="pt-3 sm:pt-4 pb-2 sm:pb-3 px-2">
              <div className="text-lg sm:text-2xl font-bold text-primary">{aptitudeData.length}</div>
              <div className="text-[10px] sm:text-xs text-muted-foreground">Categories</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-3 sm:pt-4 pb-2 sm:pb-3 px-2">
              <div className="text-lg sm:text-2xl font-bold text-primary">{totalTopics}</div>
              <div className="text-[10px] sm:text-xs text-muted-foreground">Topics</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-3 sm:pt-4 pb-2 sm:pb-3 px-2">
              <div className="text-lg sm:text-2xl font-bold text-primary">∞</div>
              <div className="text-[10px] sm:text-xs text-muted-foreground">Questions</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AptitudeHome;
