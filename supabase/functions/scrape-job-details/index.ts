import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { url } = await req.json();
    if (!url) {
      return new Response(JSON.stringify({ error: 'URL is required' }), {
        status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    console.log('[scrape-job] Fetching:', url);

    // Fetch the page HTML
    const pageResponse = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.6099.230 Mobile Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'en-IN,en;q=0.9,hi;q=0.8',
        'Accept-Encoding': 'gzip, deflate',
        'Cache-Control': 'no-cache',
      },
      redirect: 'follow',
    });

    if (!pageResponse.ok) {
      throw new Error(`Failed to fetch page: ${pageResponse.status}`);
    }

    const html = await pageResponse.text();
    
    // Extract text content - remove scripts, styles, nav, footer
    const cleanedHtml = html
      .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
      .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
      .replace(/<nav[^>]*>[\s\S]*?<\/nav>/gi, '')
      .replace(/<footer[^>]*>[\s\S]*?<\/footer>/gi, '')
      .replace(/<header[^>]*>[\s\S]*?<\/header>/gi, '')
      .replace(/<!--[\s\S]*?-->/g, '');

    // Extract text from main content area
    const bodyMatch = cleanedHtml.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
    const bodyHtml = bodyMatch ? bodyMatch[1] : cleanedHtml;
    
    // Strip tags but preserve table structure
    const textContent = bodyHtml
      .replace(/<br\s*\/?>/gi, '\n')
      .replace(/<\/p>/gi, '\n\n')
      .replace(/<\/li>/gi, '\n')
      .replace(/<\/tr>/gi, '\n')
      .replace(/<\/td>/gi, ' | ')
      .replace(/<\/th>/gi, ' | ')
      .replace(/<[^>]+>/g, '')
      .replace(/&nbsp;/g, ' ')
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace(/\n{3,}/g, '\n\n')
      .replace(/\s+/g, ' ')
      .trim()
      .substring(0, 8000); // Limit for AI processing

    // Extract links for apply/notification
    const linkMatches = [...html.matchAll(/<a[^>]+href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi)];
    const importantLinks: { label: string; url: string }[] = [];
    let applyLink = '';
    let officialLink = '';
    let notificationLink = '';

    for (const m of linkMatches) {
      const href = m[1];
      const text = m[2].replace(/<[^>]+>/g, '').trim().toLowerCase();
      
      if (!href || href.startsWith('#') || href.startsWith('javascript:')) continue;
      
      // Find apply links
      if (text.includes('apply online') || text.includes('apply now') || text.includes('apply here')) {
        if (href.match(/\.(gov\.in|nic\.in|nta\.ac|ssc\.nic|ibps\.in)/i)) {
          applyLink = href;
          officialLink = href;
        } else if (!applyLink) {
          applyLink = href;
        }
      }
      
      // Find notification/PDF links
      if (text.includes('notification') || text.includes('official notification') || text.includes('download pdf')) {
        if (href.endsWith('.pdf') || href.match(/\.(gov\.in|nic\.in)/i)) {
          notificationLink = href;
        }
      }
      
      // Official website links
      if (text.includes('official website') || text.includes('official site')) {
        officialLink = href;
      }
    }

    // Use AI to extract structured details
    const GEMINI_API_KEY = Deno.env.get('GEMINI_API_KEY');
    
    if (!GEMINI_API_KEY) {
      // Return basic parsed data without AI
      return new Response(JSON.stringify({
        title: extractTitle(html),
        html: bodyHtml.substring(0, 5000),
        applyLink, officialLink, notificationLink,
        importantLinks,
        sourceUrl: url,
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const prompt = `Extract structured job recruitment details from this webpage content. Return a JSON object with these fields:

{
  "title": "Full job title/post name",
  "organization": "Recruiting organization name (e.g., UPSC, SSC, SBI)",
  "brief": "1-2 sentence summary of the recruitment",
  "postName": "Specific post name(s)",
  "totalVacancy": number or null,
  "lastDate": "Last date to apply (format: DD Mon YYYY)",
  "ageLimit": "Age limit details",
  "qualification": "Educational qualification required",
  "salary": "Salary/Pay scale details",
  "applicationFee": "Application fee details (General/OBC/SC/ST breakdown if available)",
  "selectionProcess": "Selection process steps",
  "vacancyDetails": [{"postName": "Post 1", "total": 100}, ...] or null,
  "importantDates": [{"label": "Start Date", "date": "01 Apr 2025"}, {"label": "Last Date", "date": "30 Apr 2025"}],
  "eligibility": "Additional eligibility criteria if any",
  "howToApply": "Step by step application process",
  "examPattern": "Exam pattern/syllabus brief if mentioned"
}

Only include fields that have actual data in the content. Return valid JSON only, no markdown.

Content:
${textContent}`;

    const geminiResponse = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            temperature: 0.1,
            maxOutputTokens: 4000,
            responseMimeType: 'application/json',
          },
        }),
      }
    );

    if (!geminiResponse.ok) {
      console.error('[scrape-job] Gemini error:', geminiResponse.status);
      return new Response(JSON.stringify({
        title: extractTitle(html),
        html: bodyHtml.substring(0, 5000),
        applyLink, officialLink, notificationLink,
        sourceUrl: url,
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const geminiData = await geminiResponse.json();
    const aiText = geminiData?.candidates?.[0]?.content?.parts?.[0]?.text || '{}';
    
    let structured: Record<string, any> = {};
    try {
      const cleaned = aiText.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      structured = JSON.parse(cleaned);
    } catch (e) {
      console.error('[scrape-job] JSON parse error, attempting repair:', e);
      // Try to repair truncated JSON
      try {
        let repaired = aiText.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
        // Close any unclosed strings and objects
        const openBraces = (repaired.match(/{/g) || []).length;
        const closeBraces = (repaired.match(/}/g) || []).length;
        if (openBraces > closeBraces) {
          // Truncate to last complete field
          const lastComma = repaired.lastIndexOf(',');
          if (lastComma > 0) repaired = repaired.substring(0, lastComma);
          repaired += '}';
        }
        structured = JSON.parse(repaired);
      } catch {
        structured = {};
      }
    }

    const result = {
      ...structured,
      applyLink: applyLink || structured.applyLink,
      officialLink: officialLink || structured.officialLink,
      notificationLink: notificationLink || structured.notificationLink,
      importantLinks: importantLinks.length > 0 ? importantLinks : undefined,
      sourceUrl: url,
    };

    console.log('[scrape-job] Extracted:', JSON.stringify(result).substring(0, 200));

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('[scrape-job] Error:', error);
    return new Response(JSON.stringify({ 
      error: error instanceof Error ? error.message : 'Failed to scrape job details' 
    }), {
      status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

function extractTitle(html: string): string {
  const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
  if (titleMatch) return titleMatch[1].trim();
  const h1Match = html.match(/<h1[^>]*>([^<]+)<\/h1>/i);
  if (h1Match) return h1Match[1].trim();
  return 'Job Details';
}
