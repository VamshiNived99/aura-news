-- Create daily_test_scores table for storing user test attempts
CREATE TABLE public.daily_test_scores (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id TEXT NOT NULL,
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  score INTEGER NOT NULL DEFAULT 0,
  total_questions INTEGER NOT NULL DEFAULT 15,
  correct_answers INTEGER NOT NULL DEFAULT 0,
  time_taken INTEGER NOT NULL DEFAULT 0, -- in seconds
  accuracy DECIMAL(5,2) NOT NULL DEFAULT 0,
  is_premium BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create weekly_badges table for tracking earned badges
CREATE TABLE public.weekly_badges (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id TEXT NOT NULL,
  week_start DATE NOT NULL,
  badge_type TEXT NOT NULL, -- 'champion', 'top_performer', 'consistent_learner'
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, week_start, badge_type)
);

-- Create sponsored_rewards table for configurable rewards
CREATE TABLE public.sponsored_rewards (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  sponsor_name TEXT,
  is_active BOOLEAN NOT NULL DEFAULT true,
  week_start DATE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create indexes for performance
CREATE INDEX idx_daily_scores_date ON public.daily_test_scores(date);
CREATE INDEX idx_daily_scores_user ON public.daily_test_scores(user_id);
CREATE INDEX idx_daily_scores_date_score ON public.daily_test_scores(date, score DESC);
CREATE INDEX idx_weekly_badges_user ON public.weekly_badges(user_id);

-- Enable RLS
ALTER TABLE public.daily_test_scores ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.weekly_badges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sponsored_rewards ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access (no auth required for leaderboard display)
CREATE POLICY "Anyone can view daily scores" 
ON public.daily_test_scores FOR SELECT USING (true);

CREATE POLICY "Anyone can insert their scores" 
ON public.daily_test_scores FOR INSERT WITH CHECK (true);

CREATE POLICY "Anyone can view badges" 
ON public.weekly_badges FOR SELECT USING (true);

CREATE POLICY "Anyone can view rewards" 
ON public.sponsored_rewards FOR SELECT USING (true);