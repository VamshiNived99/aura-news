import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, range",
  "Access-Control-Expose-Headers": "accept-ranges, content-length, content-range, content-type, etag, last-modified, cache-control",
};

const allowedHost = "ncert.nic.in";
const allowedPrefix = "/textbook/pdf/";

function jsonResponse(body: Record<string, unknown>, status: number) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      ...corsHeaders,
      "Content-Type": "application/json",
    },
  });
}

function isAllowedNcertPdf(rawUrl: string) {
  try {
    const url = new URL(rawUrl);
    return (
      url.protocol === "https:" &&
      url.hostname === allowedHost &&
      url.pathname.startsWith(allowedPrefix) &&
      url.pathname.endsWith(".pdf")
    );
  } catch {
    return false;
  }
}

// Try multiple upstream strategies — NCERT's WAF resets a lot of connections,
// so we attempt direct fetch with browser-like headers, then fall back to
// public read-through proxies that can reach NCERT reliably.
async function fetchPdfWithFallback(pdfUrl: string, range: string | null): Promise<Response> {
  const browserHeaders = (extra: Record<string, string> = {}) =>
    new Headers({
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36",
      Accept: "application/pdf,application/octet-stream;q=0.9,*/*;q=0.8",
      "Accept-Language": "en-US,en;q=0.9",
      "Accept-Encoding": "identity",
      Referer: "https://ncert.nic.in/textbook.php",
      Connection: "keep-alive",
      ...(range ? { Range: range } : {}),
      ...extra,
    });

  const candidates = [
    { label: "direct", url: pdfUrl, headers: browserHeaders() },
    {
      label: "isr-cdn",
      url: `https://images.weserv.nl/?url=${encodeURIComponent(pdfUrl.replace(/^https?:\/\//, ""))}`,
      headers: browserHeaders(),
    },
    {
      label: "allorigins",
      url: `https://api.allorigins.win/raw?url=${encodeURIComponent(pdfUrl)}`,
      headers: browserHeaders(),
    },
    {
      label: "corsproxy",
      url: `https://corsproxy.io/?${encodeURIComponent(pdfUrl)}`,
      headers: browserHeaders(),
    },
  ];

  let lastError: unknown = null;

  for (const candidate of candidates) {
    for (let attempt = 0; attempt < 2; attempt++) {
      try {
        const upstream = await fetch(candidate.url, {
          method: "GET",
          headers: candidate.headers,
          redirect: "follow",
        });

        const contentType = upstream.headers.get("content-type") || "";
        const okStatus = upstream.ok || upstream.status === 206;

        // Some proxies return 200 with HTML when origin fails — reject those.
        const looksLikePdf =
          contentType.includes("pdf") ||
          contentType.includes("octet-stream") ||
          contentType === "" ||
          contentType.startsWith("application/");

        if (okStatus && looksLikePdf) {
          console.log(`NCERT proxy hit via ${candidate.label} (status ${upstream.status})`);
          return upstream;
        }

        lastError = new Error(
          `Upstream ${candidate.label} returned status ${upstream.status} ct=${contentType}`,
        );
      } catch (err) {
        lastError = err;
        console.warn(`NCERT proxy ${candidate.label} attempt ${attempt + 1} failed:`, err);
      }
      // small backoff between retries
      await new Promise((r) => setTimeout(r, 250));
    }
  }

  throw lastError ?? new Error("All NCERT fetch strategies failed");
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== "GET" && req.method !== "HEAD") {
    return jsonResponse({ error: "Method not allowed" }, 405);
  }

  const requestUrl = new URL(req.url);
  const pdfUrl = requestUrl.searchParams.get("url");

  if (!pdfUrl) {
    return jsonResponse({ error: "Missing url parameter" }, 400);
  }

  if (!isAllowedNcertPdf(pdfUrl)) {
    return jsonResponse({ error: "Only official NCERT PDF URLs are allowed" }, 400);
  }

  try {
    const range = req.headers.get("range");
    const upstream = await fetchPdfWithFallback(pdfUrl, range);

    const responseHeaders = new Headers(corsHeaders);

    [
      "content-type",
      "content-length",
      "content-range",
      "accept-ranges",
      "etag",
      "last-modified",
    ].forEach((headerName) => {
      const value = upstream.headers.get(headerName);
      if (value) responseHeaders.set(headerName, value);
    });

    if (!responseHeaders.get("content-type")) {
      responseHeaders.set("Content-Type", "application/pdf");
    }
    responseHeaders.set("Content-Disposition", "inline");
    responseHeaders.set(
      "Cache-Control",
      "public, max-age=86400, stale-while-revalidate=604800",
    );

    return new Response(req.method === "HEAD" ? null : upstream.body, {
      status: upstream.status,
      headers: responseHeaders,
    });
  } catch (error) {
    console.error("NCERT PDF proxy error:", error);
    // Always return 200 with a fallback flag so the client can render a useful UI
    return jsonResponse(
      {
        ok: false,
        error: "PDF_SERVICE_UNAVAILABLE",
        fallback: true,
        message:
          error instanceof Error ? error.message : "Failed to fetch PDF from NCERT",
        requested_url: pdfUrl,
      },
      200,
    );
  }
});
