// Utility functions for social sharing

const APP_DESCRIPTION = "AURA - Your daily dose of news, jobs & exam prep. Stay informed with trending stories, government job alerts, and comprehensive study materials.";
const APP_URL = "https://aura-pulse-news.lovable.app";

export interface ShareContent {
  title: string;
  text: string;
  url: string;
}

export const createShareContent = (articleTitle: string, articleUrl: string): ShareContent => {
  return {
    title: articleTitle,
    text: `${articleTitle}\n\n📱 Get more updates on AURA App - ${APP_DESCRIPTION}\n\nDownload: ${APP_URL}`,
    url: articleUrl
  };
};

export const createJobShareContent = (jobTitle: string, jobUrl: string): ShareContent => {
  return {
    title: `Job Alert: ${jobTitle}`,
    text: `🔔 New Job Alert!\n\n${jobTitle}\n\n📱 Get instant job notifications on AURA App - Your gateway to government jobs & career opportunities.\n\nDownload: ${APP_URL}`,
    url: jobUrl
  };
};

export const shareContent = async (content: ShareContent): Promise<boolean> => {
  try {
    // Try native share API first (works on mobile and some browsers)
    if (navigator.share) {
      await navigator.share({
        title: content.title,
        text: content.text,
        url: content.url
      });
      return true;
    }
    
    // Fallback: copy to clipboard
    const fullText = `${content.text}\n\n${content.url}`;
    await navigator.clipboard.writeText(fullText);
    return true;
  } catch (error: any) {
    if (error?.name === 'AbortError') {
      // User cancelled, not an error
      return false;
    }
    
    // Try clipboard as final fallback
    try {
      const fullText = `${content.text}\n\n${content.url}`;
      await navigator.clipboard.writeText(fullText);
      return true;
    } catch {
      return false;
    }
  }
};

// Social platform specific share URLs
export const getWhatsAppShareUrl = (text: string, url: string): string => {
  return `https://wa.me/?text=${encodeURIComponent(`${text}\n\n${url}`)}`;
};

export const getTelegramShareUrl = (text: string, url: string): string => {
  return `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`;
};

export const getTwitterShareUrl = (text: string, url: string): string => {
  return `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
};

export const getFacebookShareUrl = (url: string): string => {
  return `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
};

export const getLinkedInShareUrl = (title: string, url: string): string => {
  return `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
};

export const getEmailShareUrl = (subject: string, body: string): string => {
  return `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
};