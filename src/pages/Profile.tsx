import { useState, useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Bell,
  Moon,
  Globe,
  Shield,
  ArrowLeft,
  ChevronRight,
  Trash2,
  Share2,
  Star,
  Newspaper,
  Briefcase,
  Bookmark,
  CheckCircle,
  Info,
  MapPin,
  Pencil,
  Sparkles,
  Eye,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const STORAGE_KEYS = {
  PROFILE: "aura_user_profile",
  SETTINGS: "aura_user_settings",
  STATS: "aura_stats",
};

interface UserProfile {
  name: string;
  email: string;
  location: string;
  avatar: string;
  tagline?: string;
}

interface UserSettings {
  notifications: { news: boolean; jobs: boolean };
  language: string;
}

const Profile = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { theme, setTheme } = useTheme();

  const [profile, setProfile] = useState<UserProfile>({
    name: "AURA User",
    email: "",
    location: "India",
    avatar: "A",
    tagline: "Curious mind • Daily reader",
  });

  const [settings, setSettings] = useState<UserSettings>({
    notifications: { news: true, jobs: true },
    language: "English",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState<UserProfile>(profile);
  const [savedCount, setSavedCount] = useState(0);
  const [stats, setStats] = useState({ articlesRead: 0, jobsViewed: 0 });

  useEffect(() => {
    const savedProfile = localStorage.getItem(STORAGE_KEYS.PROFILE);
    const savedSettings = localStorage.getItem(STORAGE_KEYS.SETTINGS);
    const savedStats = localStorage.getItem(STORAGE_KEYS.STATS);

    if (savedProfile) {
      const parsed = JSON.parse(savedProfile);
      setProfile(parsed);
      setEditedProfile(parsed);
    }
    if (savedSettings) setSettings(JSON.parse(savedSettings));
    if (savedStats) setStats(JSON.parse(savedStats));

    try {
      const list = JSON.parse(localStorage.getItem("savedArticles") || "[]");
      setSavedCount(Array.isArray(list) ? list.length : 0);
    } catch {
      setSavedCount(0);
    }
  }, []);

  const weeklyInsight = useMemo(() => {
    if (stats.articlesRead > 0) return `${stats.articlesRead} articles read this week`;
    return "Start reading to track your weekly insights";
  }, [stats.articlesRead]);

  const handleSaveProfile = () => {
    const updated = { ...editedProfile, avatar: editedProfile.name.charAt(0).toUpperCase() };
    setProfile(updated);
    localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(updated));
    setIsEditing(false);
    toast({ title: "Profile saved" });
  };

  const updateNotification = (key: keyof UserSettings["notifications"], value: boolean) => {
    const newSettings = { ...settings, notifications: { ...settings.notifications, [key]: value } };
    setSettings(newSettings);
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(newSettings));
  };

  const clearAppData = () => {
    if (confirm("Clear all app data? This cannot be undone.")) {
      Object.values(STORAGE_KEYS).forEach((k) => localStorage.removeItem(k));
      localStorage.removeItem("permissionsShown");
      localStorage.removeItem("savedArticles");
      toast({ title: "All data cleared" });
      window.location.reload();
    }
  };

  const shareApp = () => {
    const text = `📱 AURA - News & Jobs at your fingertips!\n\nDownload: https://aura-news-prep.lovable.app`;
    if (navigator.share) {
      navigator.share({ title: "AURA", text, url: "https://aura-news-prep.lovable.app" });
    } else {
      navigator.clipboard.writeText(text);
      toast({ title: "Copied to clipboard" });
    }
  };

  const SectionLabel = ({ children }: { children: React.ReactNode }) => (
    <p className="px-1 mb-2 text-[10px] font-bold tracking-[0.18em] text-muted-foreground/60 uppercase">
      {children}
    </p>
  );

  const GlassCard = ({ children, className }: { children: React.ReactNode; className?: string }) => (
    <div
      className={cn(
        "rounded-2xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-xl",
        "shadow-[0_1px_0_0_rgba(255,255,255,0.04)_inset,0_8px_32px_-12px_rgba(0,0,0,0.5)]",
        className,
      )}
    >
      {children}
    </div>
  );

  const Row = ({
    icon: Icon,
    label,
    desc,
    onClick,
    right,
    danger,
    showChevron = true,
  }: {
    icon: React.ElementType;
    label: string;
    desc?: string;
    onClick?: () => void;
    right?: React.ReactNode;
    danger?: boolean;
    showChevron?: boolean;
  }) => (
    <motion.button
      whileTap={{ scale: 0.985 }}
      onClick={onClick}
      className={cn(
        "w-full flex items-center gap-3 px-4 py-3.5 text-left transition-colors",
        "hover:bg-white/[0.03] active:bg-white/[0.05]",
        danger && "text-destructive",
      )}
    >
      <div
        className={cn(
          "w-9 h-9 rounded-xl flex items-center justify-center shrink-0",
          danger ? "bg-destructive/10" : "bg-white/[0.04] border border-white/[0.05]",
        )}
      >
        <Icon className={cn("w-[17px] h-[17px]", danger ? "text-destructive" : "text-foreground/80")} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[14px] font-medium leading-tight">{label}</p>
        {desc && <p className="text-[11.5px] text-muted-foreground/70 mt-0.5">{desc}</p>}
      </div>
      {right}
      {showChevron && !right && (
        <ChevronRight className="w-4 h-4 text-muted-foreground/40 shrink-0" />
      )}
    </motion.button>
  );

  const Divider = () => <div className="h-px mx-4 bg-white/[0.04]" />;

  return (
    <div className="min-h-[100dvh] w-full bg-background pb-32 relative overflow-hidden">
      {/* Ambient background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-32 -left-20 w-[420px] h-[420px] rounded-full bg-primary/[0.08] blur-[120px]" />
        <div className="absolute top-40 -right-24 w-[360px] h-[360px] rounded-full bg-purple-500/[0.06] blur-[120px]" />
      </div>

      {/* Floating header */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-background/40 border-b border-white/[0.04]">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="rounded-full" onClick={() => navigate(-1)}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="text-base font-semibold tracking-tight">Profile</h1>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full"
            onClick={() => {
              setEditedProfile(profile);
              setIsEditing((v) => !v);
            }}
          >
            <Pencil className="w-4 h-4" />
          </Button>
        </div>
      </header>

      <main className="w-full px-4 pt-5 space-y-6">
        {/* HERO */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <GlassCard className="relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.10] via-transparent to-purple-500/[0.06]" />
            <div className="absolute -top-16 -right-10 w-48 h-48 rounded-full bg-primary/[0.12] blur-3xl" />

            <div className="relative p-5">
              <div className="flex items-start gap-4">
                {/* Avatar with glow pulse */}
                <div className="relative shrink-0">
                  <motion.div
                    className="absolute inset-0 rounded-full bg-primary/40 blur-xl"
                    animate={{ opacity: [0.35, 0.65, 0.35], scale: [0.95, 1.08, 0.95] }}
                    transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
                  />
                  <div className="relative w-[72px] h-[72px] rounded-full bg-gradient-to-br from-primary via-primary/80 to-purple-500 p-[2px] shadow-[0_8px_30px_-6px_hsl(var(--primary)/0.45)]">
                    <div className="w-full h-full rounded-full bg-background flex items-center justify-center text-[28px] font-bold text-primary">
                      {profile.avatar || profile.name.charAt(0).toUpperCase()}
                    </div>
                  </div>
                </div>

                <div className="flex-1 min-w-0 pt-1">
                  <h2 className="text-[19px] font-bold tracking-tight truncate">{profile.name}</h2>
                  <p className="text-[12.5px] text-muted-foreground/80 truncate mt-0.5">
                    {profile.tagline || "Curious mind • Daily reader"}
                  </p>
                  <div className="flex items-center gap-1.5 mt-2 text-[11.5px] text-muted-foreground/70">
                    <MapPin className="w-3 h-3" />
                    <span className="truncate">{profile.location}</span>
                  </div>
                </div>
              </div>

              {/* Insight pill */}
              <div className="mt-4 flex items-center gap-2 px-3 py-2 rounded-xl bg-white/[0.03] border border-white/[0.05]">
                <Sparkles className="w-3.5 h-3.5 text-primary shrink-0" />
                <p className="text-[11.5px] text-foreground/80 truncate">{weeklyInsight}</p>
              </div>

              <Button
                onClick={() => {
                  setEditedProfile(profile);
                  setIsEditing(true);
                }}
                className="w-full mt-4 h-10 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] border border-white/[0.08] text-foreground font-medium text-[13px] backdrop-blur-md"
              >
                <Pencil className="w-3.5 h-3.5 mr-2" />
                Edit Profile
              </Button>
            </div>
          </GlassCard>
        </motion.div>

        {/* EDIT FORM */}
        {isEditing && (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
            <GlassCard className="p-4 space-y-3 border-primary/30">
              <div className="space-y-1.5">
                <Label className="text-[11px] uppercase tracking-wider text-muted-foreground">Name</Label>
                <Input
                  value={editedProfile.name}
                  onChange={(e) => setEditedProfile({ ...editedProfile, name: e.target.value })}
                  className="bg-white/[0.03] border-white/[0.06] h-10"
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-[11px] uppercase tracking-wider text-muted-foreground">Email</Label>
                <Input
                  type="email"
                  value={editedProfile.email}
                  onChange={(e) => setEditedProfile({ ...editedProfile, email: e.target.value })}
                  className="bg-white/[0.03] border-white/[0.06] h-10"
                  placeholder="your@email.com"
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-[11px] uppercase tracking-wider text-muted-foreground">Location</Label>
                <Input
                  value={editedProfile.location}
                  onChange={(e) => setEditedProfile({ ...editedProfile, location: e.target.value })}
                  className="bg-white/[0.03] border-white/[0.06] h-10"
                />
              </div>
              <div className="flex gap-2 pt-1">
                <Button onClick={handleSaveProfile} className="flex-1 h-10 rounded-xl">
                  <CheckCircle className="w-4 h-4 mr-1.5" />
                  Save
                </Button>
                <Button variant="ghost" onClick={() => setIsEditing(false)} className="h-10 rounded-xl">
                  Cancel
                </Button>
              </div>
            </GlassCard>
          </motion.div>
        )}

        {/* STATS */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="grid grid-cols-3 gap-2.5"
        >
          {[
            { icon: Newspaper, label: "Read", value: stats.articlesRead, tint: "text-primary" },
            { icon: Briefcase, label: "Jobs", value: stats.jobsViewed, tint: "text-purple-400" },
            { icon: Bookmark, label: "Saved", value: savedCount, tint: "text-amber-400" },
          ].map((s) => (
            <motion.div key={s.label} whileTap={{ scale: 0.96 }}>
              <GlassCard className="p-3 flex flex-col items-center justify-center gap-1 aspect-[1.15]">
                <s.icon className={cn("w-4 h-4 mb-0.5", s.tint)} />
                <span className="text-[18px] font-bold tracking-tight tabular-nums">{s.value}</span>
                <span className="text-[10px] uppercase tracking-wider text-muted-foreground/70">
                  {s.label}
                </span>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>

        {/* NOTIFICATIONS */}
        <section>
          <SectionLabel>Notifications</SectionLabel>
          <GlassCard>
            <Row
              icon={Newspaper}
              label="Local News"
              desc="Breaking news alerts"
              showChevron={false}
              right={
                <Switch
                  checked={settings.notifications.news}
                  onCheckedChange={(c) => updateNotification("news", c)}
                />
              }
            />
            <Divider />
            <Row
              icon={Briefcase}
              label="Job Alerts"
              desc="New government job postings"
              showChevron={false}
              right={
                <Switch
                  checked={settings.notifications.jobs}
                  onCheckedChange={(c) => updateNotification("jobs", c)}
                />
              }
            />
          </GlassCard>
        </section>

        {/* PREFERENCES */}
        <section>
          <SectionLabel>Preferences</SectionLabel>
          <GlassCard>
            <Row
              icon={Moon}
              label="Dark Mode"
              desc={theme === "dark" ? "Currently on" : "Currently off"}
              showChevron={false}
              right={
                <Switch
                  checked={theme === "dark"}
                  onCheckedChange={(c) => setTheme(c ? "dark" : "light")}
                />
              }
            />
            <Divider />
            <Row
              icon={Globe}
              label="Language"
              desc="App language"
              showChevron={false}
              right={
                <span className="text-[12px] text-muted-foreground/80 px-2.5 py-1 rounded-full bg-white/[0.04]">
                  English
                </span>
              }
            />
          </GlassCard>
        </section>

        {/* LIBRARY */}
        <section>
          <SectionLabel>Library</SectionLabel>
          <GlassCard>
            <Row
              icon={Bookmark}
              label="Saved Articles"
              desc={`${savedCount} item${savedCount === 1 ? "" : "s"}`}
              onClick={() => navigate("/saved-articles")}
            />
          </GlassCard>
        </section>

        {/* SUPPORT */}
        <section>
          <SectionLabel>Support</SectionLabel>
          <GlassCard>
            <Row icon={Share2} label="Share App" desc="Tell your friends" onClick={shareApp} />
            <Divider />
            <Row icon={Star} label="Rate Us" desc="Leave a review" onClick={() => toast({ title: "Coming soon" })} />
          </GlassCard>
        </section>

        {/* ABOUT */}
        <section>
          <SectionLabel>About</SectionLabel>
          <GlassCard>
            <Row icon={Shield} label="Privacy Policy" onClick={() => navigate("/privacy-policy")} />
            <Divider />
            <Row icon={Info} label="Terms of Service" onClick={() => navigate("/terms-of-service")} />
            <Divider />
            <Row icon={Eye} label="App Version" desc="AURA v1.0.0" showChevron={false} />
          </GlassCard>
        </section>

        {/* DANGER */}
        <section>
          <GlassCard className="border-destructive/15">
            <Row icon={Trash2} label="Clear App Data" desc="Reset everything" danger onClick={clearAppData} />
          </GlassCard>
        </section>

        <div className="text-center pt-2 pb-4 space-y-1">
          <p className="text-[11px] text-muted-foreground/60">Made with ❤️ in India</p>
        </div>
      </main>
    </div>
  );
};

export default Profile;
