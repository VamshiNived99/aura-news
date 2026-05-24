import { useCallback, useEffect, useRef } from 'react';

interface NotificationOptions {
  title: string;
  body: string;
  icon?: string;
  tag?: string;
  data?: any;
  onClick?: () => void;
}

export const useNotifications = () => {
  const isSupported = typeof window !== 'undefined' && 'Notification' in window;
  const permission = isSupported ? Notification.permission : 'denied';
  const lastJobCheckRef = useRef<string[]>([]);
  const lastNewsCheckRef = useRef<string[]>([]);
  const notifiedExpiringRef = useRef<Set<string>>(new Set());

  const requestPermission = useCallback(async (): Promise<boolean> => {
    if (!isSupported) return false;
    try {
      const result = await Notification.requestPermission();
      return result === 'granted';
    } catch (error) {
      console.error('Failed to request notification permission:', error);
      return false;
    }
  }, [isSupported]);

  const sendNotification = useCallback(({
    title, body, icon = '/app-icon.png', tag, data, onClick
  }: NotificationOptions) => {
    if (!isSupported || permission !== 'granted') {
      console.log('Notifications not available or not permitted');
      return null;
    }
    try {
      const notification = new Notification(title, { body, icon, tag, data });
      if (onClick) {
        notification.onclick = () => {
          window.focus();
          onClick();
          notification.close();
        };
      }
      return notification;
    } catch (error) {
      console.error('Failed to send notification:', error);
      return null;
    }
  }, [isSupported, permission]);

  // Notify about new jobs - checks for new jobs and sends notifications
  const notifyNewJobs = useCallback((jobs: { title: string; url?: string }[]) => {
    if (!jobs.length) return;
    const jobTitles = jobs.map(j => j.title);
    const prevTitles = lastJobCheckRef.current;

    if (prevTitles.length > 0) {
      const newJobs = jobs.filter(j => !prevTitles.includes(j.title));
      if (newJobs.length > 0) {
        if (newJobs.length === 1) {
          sendNotification({
            title: '🎯 New Government Job',
            body: newJobs[0].title,
            tag: 'new-job',
            onClick: () => { window.location.href = '/jobs'; }
          });
        } else {
          sendNotification({
            title: `🎯 ${newJobs.length} New Jobs Available`,
            body: newJobs.slice(0, 2).map(j => j.title).join(' • '),
            tag: 'new-jobs',
            onClick: () => { window.location.href = '/jobs'; }
          });
        }
      }
    }
    lastJobCheckRef.current = jobTitles;
  }, [sendNotification]);

  // Parse a variety of date formats to a Date or null
  const parseEndDate = (raw: string | null | undefined): Date | null => {
    if (!raw) return null;
    const direct = new Date(raw);
    if (!isNaN(direct.getTime())) return direct;
    const months = ['jan','feb','mar','apr','may','jun','jul','aug','sep','oct','nov','dec'];
    const clean = raw.toLowerCase().replace(/,/g, '').trim();
    const m1 = clean.match(/(\d{1,2})\s+([a-z]+)\s+(\d{4})/);
    if (m1) {
      const idx = months.findIndex(m => m1[2].startsWith(m));
      if (idx >= 0) return new Date(parseInt(m1[3]), idx, parseInt(m1[1]));
    }
    const m2 = clean.match(/([a-z]+)\s+(\d{1,2})\s+(\d{4})/);
    if (m2) {
      const idx = months.findIndex(m => m2[1].startsWith(m));
      if (idx >= 0) return new Date(parseInt(m2[3]), idx, parseInt(m2[2]));
    }
    return null;
  };

  // Notify users about jobs expiring within 3 days
  const notifyExpiringJobs = useCallback((jobs: { title: string; endDate?: string | null; url?: string }[]) => {
    if (!jobs.length) return;
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    const threeDaysMs = 3 * 24 * 60 * 60 * 1000;

    const expiring = jobs.filter(j => {
      const end = parseEndDate(j.endDate);
      if (!end) return false;
      const diff = end.getTime() - now.getTime();
      return diff >= 0 && diff <= threeDaysMs;
    });

    // Avoid re-notifying within the same session
    const newExpiring = expiring.filter(j => {
      const key = `${j.title}|${j.endDate}`;
      if (notifiedExpiringRef.current.has(key)) return false;
      notifiedExpiringRef.current.add(key);
      return true;
    });

    if (newExpiring.length === 0) return;

    if (newExpiring.length === 1) {
      const j = newExpiring[0];
      sendNotification({
        title: '⏰ Job Closing Soon',
        body: `${j.title} — closes ${j.endDate}`,
        tag: 'expiring-job',
        onClick: () => { window.location.href = '/jobs'; }
      });
    } else {
      sendNotification({
        title: `⏰ ${newExpiring.length} Jobs Closing in 3 Days`,
        body: newExpiring.slice(0, 2).map(j => j.title).join(' • '),
        tag: 'expiring-jobs',
        onClick: () => { window.location.href = '/jobs'; }
      });
    }
  }, [sendNotification]);

  // Notify breaking/important news — sends a notification per item (capped)
  const notifyBreakingNews = useCallback((articles: { title: string; category?: string; source?: string }[]) => {
    if (!articles.length) return;
    const titles = articles.map(a => a.title);
    const prevTitles = lastNewsCheckRef.current;

    if (prevTitles.length > 0) {
      const importantKeywords = [
        'breaking', 'urgent', 'war', 'attack', 'earthquake', 'flood', 'cyclone',
        'election result', 'emergency', 'blast', 'terror', 'killed', 'dead',
        'breaking news', 'alert', 'missile', 'explosion', 'crisis', 'died',
        'murder', 'fire', 'accident', 'arrested', 'verdict', 'resign',
        'ceasefire', 'strike', 'protest', 'shutdown', 'curfew', 'evacuate',
        'ब्रेकिंग', 'तत్కాల', 'అత్యవసర', 'యుద్ధం', 'భూకంపం',
      ];

      const newArticles = articles.filter(a => !prevTitles.includes(a.title));
      const importantNews = newArticles.filter(a => {
        const lower = a.title.toLowerCase();
        return importantKeywords.some(kw => lower.includes(kw));
      });

      if (importantNews.length > 0) {
        importantNews.slice(0, 3).forEach((article, i) => {
          setTimeout(() => {
            sendNotification({
              title: '🔴 Breaking News',
              body: article.title,
              tag: `breaking-news-${Date.now()}-${i}`,
              onClick: () => { window.location.href = '/home'; }
            });
          }, i * 1500);
        });
      }
    }
    lastNewsCheckRef.current = titles;
  }, [sendNotification]);

  // Auto-request permission on mount
  useEffect(() => {
    if (isSupported && permission === 'default') {
      const timer = setTimeout(() => requestPermission(), 5000);
      return () => clearTimeout(timer);
    }
  }, [isSupported, permission, requestPermission]);

  return {
    isSupported,
    permission,
    requestPermission,
    sendNotification,
    notifyNewJobs,
    notifyExpiringJobs,
    notifyBreakingNews,
  };
};
