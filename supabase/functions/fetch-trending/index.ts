import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface TrendingArticle {
  id: string;
  title: string;
  description: string;
  category: string;
  trendScore: number;
  timestamp: string;
  image: string;
  url: string;
  source: string;
  pubDate?: string; // Raw publication date for sorting
}

// Parse RSS XML to extract articles
function parseRSS(xml: string): any[] {
  const articles: any[] = [];
  
  const itemRegex = /<item>([\s\S]*?)<\/item>/g;
  let match;
  
  while ((match = itemRegex.exec(xml)) !== null) {
    const itemContent = match[1];
    
    const title = extractTag(itemContent, 'title');
    const link = extractTag(itemContent, 'link');
    const pubDate = extractTag(itemContent, 'pubDate');
    const description = extractTag(itemContent, 'description');
    const source = extractTag(itemContent, 'source');
    
    if (title && link) {
      articles.push({
        title: cleanHtml(title),
        link,
        pubDate,
        description: cleanHtml(description),
        source: cleanHtml(source) || 'Google News',
      });
    }
  }
  
  return articles;
}

function extractTag(content: string, tag: string): string {
  const cdataRegex = new RegExp(`<${tag}[^>]*><!\\[CDATA\\[([\\s\\S]*?)\\]\\]><\\/${tag}>`, 'i');
  const simpleRegex = new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, 'i');
  
  let match = content.match(cdataRegex);
  if (match) return match[1].trim();
  
  match = content.match(simpleRegex);
  if (match) return match[1].trim();
  
  return '';
}

function cleanHtml(text: string): string {
  if (!text) return '';
  
  // First decode HTML entities
  let cleaned = text
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .replace(/&#x27;/g, "'")
    .replace(/&#x2F;/g, '/');
  
  // Then strip all HTML tags (multiple passes for nested content)
  cleaned = cleaned
    .replace(/<[^>]*>/g, ' ')
    .replace(/<[^>]*>/g, ' ');
  
  // Clean up extra whitespace
  cleaned = cleaned
    .replace(/\s+/g, ' ')
    .trim();
  
  // Limit length for description
  if (cleaned.length > 200) {
    cleaned = cleaned.substring(0, 200) + '...';
  }
  
  return cleaned;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body = await req.json().catch(() => ({}));
    const { page = 1, seenUrls = [] } = body;
    console.log('Fetching trending news, page:', page);

    let articles: TrendingArticle[] = [];
    const seenSet = new Set(Array.isArray(seenUrls) ? seenUrls.slice(0, 100) : []);
    
    // Search queries to get trending news variety
    const searchQueries = [
      'India trending today',
      'breaking news India',
      'latest news India',
      'India headlines today',
      'trending India news',
    ];
    
    const queryIndex = (page - 1) % searchQueries.length;
    const searchQuery = searchQueries[queryIndex];
    
    // Fetch from Google News RSS (completely free, unlimited)
    try {
      // First try top headlines
      const topUrl = `https://news.google.com/rss?hl=en-IN&gl=IN&ceid=IN:en`;
      console.log(`[Google News RSS] Fetching top headlines`);
      
      const topResponse = await fetch(topUrl, {
        headers: { 'User-Agent': 'Mozilla/5.0 (compatible; NewsApp/1.0)' }
      });
      
      if (topResponse.ok) {
        const xml = await topResponse.text();
        const items = parseRSS(xml);
        console.log(`[Google News RSS] Got ${items.length} top headlines`);
        
        const baseScore = 10 - (page - 1) * 0.5;
        
        articles = items
          .filter(item => !seenSet.has(item.link))
          .slice(0, 15)
          .map((item, index) => ({
            id: `gn-top-${page}-${Date.now()}-${index}`,
            title: item.title,
            description: item.description || item.title,
            category: categorizeArticle(item.title),
            trendScore: Math.round((baseScore - (index * 0.3)) * 10) / 10,
            timestamp: formatTimeAgo(item.pubDate),
            image: getImageForArticle(item.title, index),
            url: item.link,
            source: item.source,
            pubDate: item.pubDate, // Store raw date for sorting
          }));
      }
    } catch (err) {
      console.error('[Google News Top] Error:', err);
    }
    
    // Get more from search if needed
    if (articles.length < 10) {
      try {
        const searchUrl = `https://news.google.com/rss/search?q=${encodeURIComponent(searchQuery)}&hl=en-IN&gl=IN&ceid=IN:en`;
        console.log(`[Google News Search] Query: ${searchQuery}`);
        
        const searchResponse = await fetch(searchUrl, {
          headers: { 'User-Agent': 'Mozilla/5.0 (compatible; NewsApp/1.0)' }
        });
        
        if (searchResponse.ok) {
          const xml = await searchResponse.text();
          const items = parseRSS(xml);
          console.log(`[Google News Search] Got ${items.length} items`);
          
          const existingUrls = new Set(articles.map(a => a.url));
          const baseScore = 8 - (page - 1) * 0.5;
          
          const newArticles = items
            .filter(item => !seenSet.has(item.link) && !existingUrls.has(item.link))
            .slice(0, 15)
            .map((item, index) => ({
              id: `gn-search-${page}-${Date.now()}-${index}`,
              title: item.title,
              description: item.description || item.title,
              category: categorizeArticle(item.title),
              trendScore: Math.round((baseScore - (index * 0.3)) * 10) / 10,
              timestamp: formatTimeAgo(item.pubDate),
              image: getImageForArticle(item.title, index + articles.length),
              url: item.link,
              source: item.source,
              pubDate: item.pubDate, // Store raw date for sorting
            }));
          
          articles = [...articles, ...newArticles];
        }
      } catch (err) {
        console.error('[Google News Search] Error:', err);
      }
    }

    // Final deduplication
    const uniqueArticles = articles.filter((article, index, self) => 
      index === self.findIndex(a => a.url === article.url)
    );

    // Sort by pubDate (latest first)
    uniqueArticles.sort((a, b) => {
      const dateA = a.pubDate ? new Date(a.pubDate).getTime() : 0;
      const dateB = b.pubDate ? new Date(b.pubDate).getTime() : 0;
      return dateB - dateA; // Descending order (newest first)
    });

    console.log('Final unique articles:', uniqueArticles.length);

    const hasMore = page < 10 && uniqueArticles.length > 0;

    return new Response(JSON.stringify({ 
      articles: uniqueArticles,
      hasMore,
      page
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error fetching trending:', error);
    return new Response(JSON.stringify({ 
      articles: [],
      hasMore: false,
      error: 'Failed to fetch trending news'
    }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

function formatTimeAgo(dateString: string): string {
  if (!dateString) return 'Recently';
  
  try {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHrs = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);
    
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHrs < 24) return `${diffHrs}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString('en-IN', { month: 'short', day: 'numeric' });
  } catch {
    return 'Recently';
  }
}

function categorizeArticle(title: string): string {
  const text = title.toLowerCase();
  
  if (text.includes('cricket') || text.includes('sport') || text.includes('match') || text.includes('ipl') || text.includes('football')) return 'Sports';
  if (text.includes('election') || text.includes('minister') || text.includes('government') || text.includes('bjp') || text.includes('congress') || text.includes('modi')) return 'Politics';
  if (text.includes('economy') || text.includes('market') || text.includes('stock') || text.includes('rupee') || text.includes('rbi') || text.includes('sensex')) return 'Economy';
  if (text.includes('tech') || text.includes('ai') || text.includes('digital') || text.includes('startup') || text.includes('google') || text.includes('apple')) return 'Technology';
  if (text.includes('isro') || text.includes('space') || text.includes('science') || text.includes('nasa')) return 'Science';
  if (text.includes('film') || text.includes('bollywood') || text.includes('movie') || text.includes('actor') || text.includes('actress')) return 'Entertainment';
  if (text.includes('education') || text.includes('exam') || text.includes('student')) return 'Education';
  if (text.includes('health') || text.includes('hospital') || text.includes('medical')) return 'Health';
  
  return 'General';
}

function getImageForArticle(title: string, index: number): string {
  const category = categorizeArticle(title);
  
  const categoryImages: Record<string, string[]> = {
    'Sports': [
      'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=400',
      'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=400',
    ],
    'Politics': [
      'https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=400',
      'https://images.unsplash.com/photo-1555848962-6e79363ec58f?w=400',
    ],
    'Economy': [
      'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400',
      'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=400',
    ],
    'Technology': [
      'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400',
      'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400',
    ],
    'Science': [
      'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=400',
      'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400',
    ],
    'Entertainment': [
      'https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?w=400',
      'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=400',
    ],
    'Education': [
      'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400',
    ],
    'Health': [
      'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=400',
    ],
    'General': [
      'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=400',
      'https://images.unsplash.com/photo-1495020689067-958852a7765e?w=400',
    ],
  };
  
  const images = categoryImages[category] || categoryImages['General'];
  return images[index % images.length];
}