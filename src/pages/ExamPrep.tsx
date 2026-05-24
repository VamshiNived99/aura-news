import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Play, BookOpen, Clock, TrendingUp, CheckCircle, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface PrepShort {
  id: string;
  title: string;
  category: string;
  duration: string;
  views: string;
  thumbnail: string;
  difficulty: "easy" | "medium" | "hard";
  completed?: boolean;
}

const ExamPrep = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = ["all", "current-affairs", "history", "geography", "polity", "economy", "science", "maths"];

  const shorts: PrepShort[] = [
    {
      id: "1",
      title: "Top 10 Current Affairs - This Week",
      category: "current-affairs",
      duration: "3:45",
      views: "125K",
      thumbnail: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&auto=format&fit=crop",
      difficulty: "easy"
    },
    {
      id: "2",
      title: "Indian Constitution - Fundamental Rights Explained",
      category: "polity",
      duration: "5:20",
      views: "89K",
      thumbnail: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&auto=format&fit=crop",
      difficulty: "medium"
    },
    {
      id: "3",
      title: "Quick Revision: Major Rivers of India",
      category: "geography",
      duration: "2:30",
      views: "156K",
      thumbnail: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&auto=format&fit=crop",
      difficulty: "easy",
      completed: true
    },
    {
      id: "4",
      title: "Economic Survey 2024 - Key Highlights",
      category: "economy",
      duration: "6:15",
      views: "67K",
      thumbnail: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=800&auto=format&fit=crop",
      difficulty: "hard"
    },
    {
      id: "5",
      title: "Freedom Struggle Timeline - Must Know Dates",
      category: "history",
      duration: "4:50",
      views: "203K",
      thumbnail: "https://images.unsplash.com/photo-1604079628040-94301bb21b91?w=800&auto=format&fit=crop",
      difficulty: "medium"
    },
    {
      id: "6",
      title: "Space Missions 2024 - ISRO Achievements",
      category: "science",
      duration: "3:10",
      views: "178K",
      thumbnail: "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=800&auto=format&fit=crop",
      difficulty: "easy"
    },
    {
      id: "7",
      title: "Number System Tricks for Competitive Exams",
      category: "maths",
      duration: "5:45",
      views: "342K",
      thumbnail: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&auto=format&fit=crop",
      difficulty: "medium",
      completed: true
    },
    {
      id: "8",
      title: "World Organizations - Quick Facts",
      category: "current-affairs",
      duration: "4:20",
      views: "91K",
      thumbnail: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&auto=format&fit=crop",
      difficulty: "easy"
    }
  ];

  const filteredShorts = shorts.filter(short => 
    selectedCategory === "all" || short.category === selectedCategory
  );

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy": return "bg-green-500";
      case "medium": return "bg-yellow-500";
      case "hard": return "bg-red-500";
      default: return "bg-gray-500";
    }
  };

  return (
    <div className="min-h-[100dvh] w-full bg-background pb-24">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border safe-area-top">
        <div className="flex items-center justify-between px-3 sm:px-4 py-2 sm:py-3">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="h-8 w-8 sm:h-9 sm:w-9" onClick={() => navigate("/home")}>
              <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            </Button>
            <h1 className="text-base sm:text-lg font-bold">Exam Prep Shorts</h1>
          </div>
          <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
        </div>

        {/* Categories */}
        <div className="px-3 sm:px-4 pb-2 sm:pb-3 overflow-x-auto scrollbar-hide">
          <div className="flex gap-1.5 sm:gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className="capitalize whitespace-nowrap text-xs sm:text-sm h-7 sm:h-8 px-2 sm:px-3"
              >
                {category.replace("-", " ")}
              </Button>
            ))}
          </div>
        </div>
      </header>

      {/* Stats Bar */}
      <div className="bg-card border-b border-border">
        <div className="w-full px-3 sm:px-4 py-3 sm:py-4">
          <div className="grid grid-cols-3 gap-2 sm:gap-4 text-center">
            <div>
              <div className="text-xl sm:text-2xl font-bold text-primary">45</div>
              <div className="text-[10px] sm:text-xs text-muted-foreground">Completed</div>
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-bold text-primary">2.5h</div>
              <div className="text-[10px] sm:text-xs text-muted-foreground">Watch Time</div>
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-bold text-primary">12</div>
              <div className="text-[10px] sm:text-xs text-muted-foreground">Streak Days</div>
            </div>
          </div>
        </div>
      </div>

      {/* Shorts Grid */}
      <main className="w-full px-3 sm:px-4 py-3 sm:py-4">
        <div className="grid grid-cols-2 gap-4">
          {filteredShorts.map((short) => (
            <Card 
              key={short.id} 
              className="overflow-hidden hover:shadow-lg transition-all cursor-pointer group"
            >
              <div className="relative aspect-[9/16] overflow-hidden">
                <img
                  src={short.thumbnail}
                  alt={short.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
                
                {/* Play Button Overlay */}
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">
                    <Play className="w-6 h-6 text-primary-foreground ml-1" fill="currentColor" />
                  </div>
                </div>

                {/* Duration Badge */}
                <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {short.duration}
                </div>

                {/* Difficulty Indicator */}
                <div className={`absolute top-2 left-2 w-2 h-2 rounded-full ${getDifficultyColor(short.difficulty)}`} />

                {/* Completed Badge */}
                {short.completed && (
                  <div className="absolute top-2 right-2 bg-green-500 text-white rounded-full p-1">
                    <CheckCircle className="w-4 h-4" />
                  </div>
                )}
              </div>

              <CardContent className="p-3 space-y-2">
                <h3 className="font-semibold text-sm leading-tight line-clamp-2">
                  {short.title}
                </h3>
                
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <Badge variant="secondary" className="capitalize text-xs">
                    {short.category.replace("-", " ")}
                  </Badge>
                  <span className="flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" />
                    {short.views}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
};

export default ExamPrep;
