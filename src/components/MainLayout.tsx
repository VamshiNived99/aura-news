import { ReactNode } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Home as HomeIcon, MapPin, Briefcase, Newspaper, User } from "lucide-react";
import { motion, PanInfo } from "framer-motion";

interface MainLayoutProps {
  children: ReactNode;
}

export const MainLayout = ({ children }: MainLayoutProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const tabs = [
    { id: "home", label: "Home", icon: HomeIcon, path: "/home" },
    { id: "local", label: "Local", icon: MapPin, path: "/news" },
    { id: "jobs", label: "Jobs", icon: Briefcase, path: "/jobs" },
    { id: "current-affairs", label: "Affairs", icon: Newspaper, path: "/current-affairs" },
    // { id: "prep", label: "Prep", icon: BookOpen, path: "/exam-prep" }, // Phase 2: Exam prep section
  ];

  // Check active state for nested paths
  const isNewsActive = location.pathname.startsWith('/news');
  const isCurrentAffairsActive = location.pathname.startsWith('/current-affairs');
  const isProfileActive = location.pathname.startsWith('/profile');

  const handleDragEnd = (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const swipeThreshold = 50;
    const currentIndex = tabs.findIndex(tab => tab.path === location.pathname);
    
    if (currentIndex === -1) return;

    if (info.offset.x < -swipeThreshold && currentIndex < tabs.length - 1) {
      navigate(tabs[currentIndex + 1].path);
    } else if (info.offset.x > swipeThreshold && currentIndex > 0) {
      navigate(tabs[currentIndex - 1].path);
    }
  };

  return (
    <div className="min-h-[100dvh] w-full bg-background pb-20">
      {/* Floating Profile Button (top-right) */}
      <button
        onClick={() => navigate('/profile')}
        className={`fixed top-3 right-3 z-[60] w-10 h-10 rounded-full flex items-center justify-center transition-all active:scale-95 glass-card ${
          isProfileActive
            ? 'text-primary aura-glow-pulse'
            : 'text-foreground/80 hover:text-primary'
        }`}
        aria-label="Profile"
        aria-current={isProfileActive ? 'page' : undefined}
      >
        <User className="w-[18px] h-[18px]" strokeWidth={isProfileActive ? 2.4 : 1.8} />
      </button>

      <motion.div 
        className="w-full h-full"
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.2}
        onDragEnd={handleDragEnd}
      >
        {children}
      </motion.div>

      <nav className="fixed bottom-0 left-0 right-0 z-50 px-4 pb-3 safe-area-bottom pointer-events-none">
        <div className="pointer-events-auto flex items-center justify-around px-2 py-2.5 rounded-[28px] glass-panel shadow-[0_12px_40px_rgba(0,0,0,0.55)]">
          {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = tab.id === 'local'
                ? isNewsActive
                : tab.id === 'current-affairs'
                ? isCurrentAffairsActive
                : location.pathname === tab.path;

              return (
                <button
                  key={tab.id}
                  onClick={() => navigate(tab.path)}
                  className="relative flex flex-col items-center gap-1 px-4 py-2 rounded-2xl transition-all active:scale-95"
                  aria-label={tab.label}
                  aria-current={isActive ? "page" : undefined}
                >
                  {isActive && (
                    <motion.div
                      layoutId="navGlow"
                      className="absolute inset-0 rounded-2xl bg-primary/15 shadow-[0_0_22px_hsl(185_95%_55%/0.45)] ring-1 ring-primary/30"
                      transition={{ type: "spring", stiffness: 420, damping: 32 }}
                    />
                  )}
                  <Icon
                    className={`w-5 h-5 relative z-10 transition-all duration-200 ${
                      isActive ? "text-primary drop-shadow-[0_0_8px_hsl(185_95%_55%/0.7)]" : "text-muted-foreground/60"
                    }`}
                    strokeWidth={isActive ? 2.5 : 1.5}
                  />
                  <span className={`text-[10px] font-medium relative z-10 transition-colors duration-200 ${
                    isActive ? "text-primary" : "text-muted-foreground/60"
                  }`}>{tab.label}</span>
                </button>
              );
            })}
        </div>
      </nav>
    </div>
  );
};
