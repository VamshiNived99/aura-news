import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Trophy, Crown, Medal, Award, Gift, Star, Flame, Target } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { motion } from "framer-motion";

interface WeeklyScore {
  rank: number;
  userId: string;
  totalScore: number;
  totalTime: number;
  daysAttempted: number;
  isPremium: boolean;
  badges: string[];
}

interface SponsoredReward {
  title: string;
  description: string;
  sponsorName: string;
}

const WeeklyLeaderboard = () => {
  const navigate = useNavigate();
  const [userId] = useState(() => localStorage.getItem('aura_user_id') || '');
  const [leaderboard, setLeaderboard] = useState<WeeklyScore[]>([]);
  const [loading, setLoading] = useState(true);
  const [reward, setReward] = useState<SponsoredReward | null>(null);
  const [weekDates, setWeekDates] = useState({ start: '', end: '' });

  useEffect(() => {
    calculateWeekDates();
    fetchWeeklyLeaderboard();
    fetchSponsoredReward();
  }, []);

  const calculateWeekDates = () => {
    const now = new Date();
    const dayOfWeek = now.getDay();
    const startDate = new Date(now);
    startDate.setDate(now.getDate() - dayOfWeek);
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + 6);

    setWeekDates({
      start: startDate.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }),
      end: endDate.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })
    });
  };

  const fetchWeeklyLeaderboard = async () => {
    setLoading(true);
    try {
      const now = new Date();
      const dayOfWeek = now.getDay();
      const startDate = new Date(now);
      startDate.setDate(now.getDate() - dayOfWeek);
      const startDateStr = startDate.toISOString().split('T')[0];

      const { data } = await supabase
        .from('daily_test_scores')
        .select('*')
        .gte('date', startDateStr);

      if (data) {
        // Aggregate scores by user
        const userScores: Record<string, { totalScore: number; totalTime: number; days: Set<string>; isPremium: boolean }> = {};
        
        data.forEach(score => {
          if (!userScores[score.user_id]) {
            userScores[score.user_id] = { totalScore: 0, totalTime: 0, days: new Set(), isPremium: score.is_premium };
          }
          userScores[score.user_id].totalScore += score.score;
          userScores[score.user_id].totalTime += score.time_taken;
          userScores[score.user_id].days.add(score.date);
        });

        // Convert to array and sort
        const sortedScores = Object.entries(userScores)
          .map(([id, data]) => ({
            userId: id,
            totalScore: data.totalScore,
            totalTime: data.totalTime,
            daysAttempted: data.days.size,
            isPremium: data.isPremium
          }))
          .sort((a, b) => {
            if (b.totalScore !== a.totalScore) return b.totalScore - a.totalScore;
            return a.totalTime - b.totalTime;
          })
          .slice(0, 10)
          .map((score, index) => ({
            ...score,
            rank: index + 1,
            badges: getBadges(index + 1, score.daysAttempted)
          }));

        setLeaderboard(sortedScores);
      }
    } catch (error) {
      console.error('Error fetching weekly leaderboard:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchSponsoredReward = async () => {
    try {
      const now = new Date();
      const dayOfWeek = now.getDay();
      const startDate = new Date(now);
      startDate.setDate(now.getDate() - dayOfWeek);
      const startDateStr = startDate.toISOString().split('T')[0];

      const { data } = await supabase
        .from('sponsored_rewards')
        .select('*')
        .eq('is_active', true)
        .eq('week_start', startDateStr)
        .maybeSingle();

      if (data) {
        setReward({
          title: data.title,
          description: data.description || '',
          sponsorName: data.sponsor_name || ''
        });
      }
    } catch (error) {
      console.error('Error fetching reward:', error);
    }
  };

  const getBadges = (rank: number, daysAttempted: number): string[] => {
    const badges: string[] = [];
    if (rank === 1) badges.push('🏆 Weekly Champion');
    if (rank === 2 || rank === 3) badges.push('🥈 Top Performer');
    if (daysAttempted >= 5) badges.push('🔥 Consistent Learner');
    return badges;
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return <Crown className="w-6 h-6 text-yellow-500" />;
      case 2: return <Medal className="w-6 h-6 text-gray-400" />;
      case 3: return <Award className="w-6 h-6 text-amber-600" />;
      default: return <span className="text-lg font-bold text-muted-foreground">#{rank}</span>;
    }
  };

  const getRankBg = (rank: number) => {
    switch (rank) {
      case 1: return 'bg-gradient-to-r from-yellow-500/20 to-amber-500/20 border-yellow-500/30';
      case 2: return 'bg-gradient-to-r from-gray-400/20 to-slate-400/20 border-gray-400/30';
      case 3: return 'bg-gradient-to-r from-amber-600/20 to-orange-600/20 border-amber-600/30';
      default: return 'bg-muted/50';
    }
  };

  return (
    <div className="min-h-[100dvh] w-full bg-background pb-24">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
        <div className="flex items-center gap-3 px-4 py-3">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => navigate(-1)}
            className="text-white hover:bg-white/20"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex-1">
            <h1 className="text-lg font-bold flex items-center gap-2">
              <Trophy className="w-5 h-5" />
              Weekly Leaderboard
            </h1>
            <p className="text-sm opacity-90">{weekDates.start} - {weekDates.end}</p>
          </div>
        </div>
      </header>

      <main className="px-4 py-4 space-y-4">
        {/* Sponsored Reward */}
        {reward && (
          <Card className="overflow-hidden border-2 border-dashed border-primary/30 bg-gradient-to-br from-primary/5 to-primary/10">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                  <Gift className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <Badge variant="secondary" className="mb-1 text-[10px]">🎁 This Week's Reward</Badge>
                  <h3 className="font-semibold">{reward.title}</h3>
                  <p className="text-sm text-muted-foreground">{reward.description}</p>
                  {reward.sponsorName && (
                    <p className="text-xs text-muted-foreground mt-1">Sponsored by {reward.sponsorName}</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Legend */}
        <div className="flex flex-wrap gap-2 text-xs">
          <Badge variant="secondary" className="gap-1">
            <Crown className="w-3 h-3 text-yellow-500" />
            Champion
          </Badge>
          <Badge variant="secondary" className="gap-1">
            <Flame className="w-3 h-3 text-orange-500" />
            5+ days
          </Badge>
          <Badge variant="secondary" className="gap-1">
            <Star className="w-3 h-3 text-yellow-500" />
            Premium
          </Badge>
        </div>

        {/* Leaderboard */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Top 10 This Week</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {loading ? (
              <div className="space-y-3">
                {[1, 2, 3, 4, 5].map(i => (
                  <div key={i} className="h-16 bg-muted/50 rounded-lg animate-pulse" />
                ))}
              </div>
            ) : leaderboard.length === 0 ? (
              <div className="text-center py-8">
                <Target className="w-12 h-12 mx-auto text-muted-foreground mb-3" />
                <p className="text-muted-foreground">No scores yet this week</p>
                <p className="text-sm text-muted-foreground">Be the first to take the test!</p>
              </div>
            ) : (
              leaderboard.map((score, index) => (
                <motion.div
                  key={score.userId}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={`flex items-center gap-3 p-3 rounded-lg border ${getRankBg(score.rank)} ${
                    score.userId === userId ? 'ring-2 ring-primary' : ''
                  }`}
                >
                  <div className="w-10 h-10 rounded-full bg-background flex items-center justify-center">
                    {getRankIcon(score.rank)}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="font-semibold">
                        {score.userId === userId ? 'You' : `Player ${score.rank}`}
                      </p>
                      {score.isPremium && score.rank <= 3 && (
                        <Badge className="text-[10px] bg-gradient-to-r from-yellow-500 to-amber-500 text-white">
                          💎 Top Scorer
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span>{score.daysAttempted} days</span>
                      <span>•</span>
                      <span>{formatTime(score.totalTime)}</span>
                    </div>
                    {score.badges.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-1">
                        {score.badges.map((badge, i) => (
                          <Badge key={i} variant="outline" className="text-[10px] px-1.5 py-0">
                            {badge}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  <div className="text-right">
                    <p className="text-lg font-bold text-primary">{score.totalScore}</p>
                    <p className="text-[10px] text-muted-foreground">points</p>
                  </div>
                </motion.div>
              ))
            )}
          </CardContent>
        </Card>

        {/* Your Position */}
        {userId && !leaderboard.find(s => s.userId === userId) && (
          <Card className="border-primary/20">
            <CardContent className="p-4 text-center">
              <p className="text-sm text-muted-foreground">You haven't taken any tests this week</p>
              <Button 
                className="mt-3"
                onClick={() => navigate('/daily-test')}
              >
                Take Today's Test
              </Button>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
};

export default WeeklyLeaderboard;