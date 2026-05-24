import "https://deno.land/x/xhr@0.1.0/mod.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const GOOGLE_HOSTS = /(^|\.)(news|consent|accounts)\.google\.com$/i;

function isGoogleNews(url: string): boolean {
  try {
    const u = new URL(url);
    return GOOGLE_HOSTS.test(u.hostname);
  } catch { return false; }
}

function extractFromBase64Id(url: string): string | null {
  try {
    const m = url.match(/\/articles\/([A-Za-z0-9_-]+)/);
    if (!m) return null;
    let b64 = m[1].replace(/-/g, "+").replace(/_/g, "/");
    while (b64.length % 4) b64 += "=";
    const bytes = Uint8Array.from(atob(b64), c => c.charCodeAt(0));
    const text = new TextDecoder("utf-8", { fatal: false }).decode(bytes);
    const httpMatch = text.match(/https?:\/\/[^\s\x00-\x1f"'<>]+/);
    if (httpMatch) {
      const clean = httpMatch[0].replace(/[^\x20-\x7e].*$/, "");
      if (!isGoogleNews(clean)) return clean;
    }
  } catch (_) {}
  return null;
}

async function fetchAndExtract(url: string): Promise<string | null> {
  try {
    const res = await fetch(url, {
      redirect: "follow",
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36",
        "Accept": "text/html,application/xhtml+xml",
        "Accept-Language": "en-US,en;q=0.9",
      },
    });
    if (res.url && !isGoogleNews(res.url)) return res.url;
    const html = await res.text();
    // data-n-au or canonical link
    const patterns = [
      /<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["']/i,
      /data-n-au=["']([^"']+)["']/i,
      /<meta[^>]+property=["']og:url["'][^>]+content=["']([^"']+)["']/i,
      /<a[^>]+jsname=["'][^"']+["'][^>]+href=["'](https?:\/\/[^"']+)["']/i,
      /<a[^>]+href=["'](https?:\/\/(?!(?:[a-z0-9-]+\.)*google\.[^/]+)[^"']+)["']/i,
    ];
    for (const p of patterns) {
      const m = html.match(p);
      if (m && !isGoogleNews(m[1])) return m[1];
    }
  } catch (_) {}
  return null;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  try {
    const { url } = await req.json();
    if (!url || typeof url !== "string") {
      return new Response(JSON.stringify({ error: "url required" }), {
        status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    if (!isGoogleNews(url)) {
      return new Response(JSON.stringify({ url, resolved: false }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    const fromId = extractFromBase64Id(url);
    if (fromId) {
      return new Response(JSON.stringify({ url: fromId, resolved: true, method: "id" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    const fromHtml = await fetchAndExtract(url);
    if (fromHtml) {
      return new Response(JSON.stringify({ url: fromHtml, resolved: true, method: "html" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    return new Response(JSON.stringify({ url, resolved: false }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: String(e) }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});