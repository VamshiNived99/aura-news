import { useNavigate, useSearchParams } from "react-router-dom";
import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Bookmark,
  BookmarkCheck,
  ExternalLink,
  Loader2,
  RefreshCw,
  AlertTriangle,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import { toggleBookmark, isBookmarked, addRecentlyViewed, SavedChapter } from "@/data/ncert";
import { toast } from "sonner";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

// Pin the worker to the exact version of pdfjs-dist react-pdf is using.
pdfjs.GlobalWorkerOptions.workerSrc = `https://cdn.jsdelivr.net/npm/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const PROJECT_ID = import.meta.env.VITE_SUPABASE_PROJECT_ID as string;
const PROXY_URL = `https://${PROJECT_ID}.supabase.co/functions/v1/ncert-pdf-proxy`;
const ANON_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string;

const NCERTChapterViewer = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const pdfUrl = searchParams.get("pdf") || "";
  const title = searchParams.get("title") || "Chapter";
  const subject = searchParams.get("subject") || "";
  const classNum = parseInt(searchParams.get("class") || "0", 10);
  const subjectId = searchParams.get("subjectId") || "";

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [numPages, setNumPages] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [reloadKey, setReloadKey] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);
  const [pdfBlob, setPdfBlob] = useState<Blob | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const chapterData: SavedChapter = {
    classNum,
    subjectId,
    subjectName: subject,
    chapterTitle: title,
    pdfUrl,
    timestamp: Date.now(),
  };

  // Fetch the PDF as a blob via our proxy. Falls back to public CORS proxies if needed.
  useEffect(() => {
    if (!pdfUrl) {
      navigate(-1);
      return;
    }

    setBookmarked(isBookmarked(pdfUrl));
    addRecentlyViewed(chapterData);

    let cancelled = false;
    setLoading(true);
    setError(false);
    setPdfBlob(null);
    setNumPages(0);

    const sources = [
      `${PROXY_URL}?url=${encodeURIComponent(pdfUrl)}`,
      `https://api.allorigins.win/raw?url=${encodeURIComponent(pdfUrl)}`,
      `https://corsproxy.io/?${encodeURIComponent(pdfUrl)}`,
    ];

    const fetchHeaders: Record<string, string> = {};
    // Only attach auth headers to our own edge function.
    const fetchPdf = async () => {
      for (let i = 0; i < sources.length; i++) {
        const src = sources[i];
        try {
          const headers: Record<string, string> =
            i === 0
              ? { apikey: ANON_KEY, Authorization: `Bearer ${ANON_KEY}` }
              : fetchHeaders;
          const res = await fetch(src, { headers, mode: "cors" });
          if (!res.ok) throw new Error(`status ${res.status}`);
          const ct = res.headers.get("content-type") || "";
          // Our edge function returns JSON when it falls back; treat as failure.
          if (ct.includes("application/json")) throw new Error("proxy_fallback_json");
          const buf = await res.arrayBuffer();
          // Sanity check: PDF files start with %PDF
          const head = new Uint8Array(buf.slice(0, 4));
          const sig = String.fromCharCode(...head);
          if (sig !== "%PDF") throw new Error("not_a_pdf");
          if (cancelled) return;
          setPdfBlob(new Blob([buf], { type: "application/pdf" }));
          return;
        } catch (err) {
          console.warn(`PDF source ${i} failed`, err);
        }
      }
      if (!cancelled) {
        setLoading(false);
        setError(true);
      }
    };

    fetchPdf();
    return () => {
      cancelled = true;
    };
  }, [pdfUrl, reloadKey, navigate]);

  useEffect(() => {
    if (!containerRef.current) return;
    const el = containerRef.current;
    const update = () => setContainerWidth(el.clientWidth);
    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const handleBookmark = useCallback(() => {
    const added = toggleBookmark(chapterData);
    setBookmarked(added);
    toast.success(added ? "Chapter bookmarked" : "Bookmark removed");
  }, [chapterData]);

  const handleLoadSuccess = useCallback(({ numPages: pages }: { numPages: number }) => {
    setNumPages(pages);
    setLoading(false);
    setError(false);
  }, []);

  const handleLoadError = useCallback((err: Error) => {
    console.error("PDF render error:", err);
    setLoading(false);
    setError(true);
  }, []);

  const handleRetry = useCallback(() => {
    setReloadKey((k) => k + 1);
  }, []);

  const pageWidth = useMemo(() => {
    if (!containerWidth) return 0;
    const base = Math.max(containerWidth - 16, 280);
    return Math.floor(base * zoom);
  }, [containerWidth, zoom]);

  const documentFile = useMemo(() => pdfBlob, [pdfBlob]);

  return (
    <div className="min-h-[100dvh] w-full bg-background flex flex-col">
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border safe-area-top">
        <div className="flex items-center gap-2 px-3 py-2">
          <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0" onClick={() => navigate(-1)}>
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div className="flex-1 min-w-0">
            <h1 className="text-sm font-bold truncate">{title}</h1>
            <p className="text-[10px] text-muted-foreground truncate">
              {subject} • Class {classNum} • Source: NCERT (ncert.nic.in)
            </p>
          </div>
          <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0" onClick={handleBookmark} title="Bookmark chapter">
            {bookmarked ? <BookmarkCheck className="w-4 h-4 text-primary" /> : <Bookmark className="w-4 h-4" />}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 shrink-0"
            onClick={() => window.open(pdfUrl, "_blank", "noopener,noreferrer")}
            title="Open in browser"
          >
            <ExternalLink className="w-4 h-4" />
          </Button>
        </div>
        <div className="flex items-center justify-between gap-2 px-3 py-1.5 border-t border-border text-[10px] text-muted-foreground">
          <span>
            {loading
              ? "Loading PDF…"
              : error
                ? "Preview unavailable"
                : `${numPages} pages • Zoom ${Math.round(zoom * 100)}%`}
          </span>
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7"
              onClick={() => setZoom((c) => Math.max(0.75, c - 0.15))}
              disabled={!numPages}
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7"
              onClick={() => setZoom((c) => Math.min(2.2, c + 0.15))}
              disabled={!numPages}
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </Button>
          </div>
        </div>
      </header>

      <div ref={containerRef} className="flex-1 overflow-auto bg-muted/30 relative">
        {loading && !error && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-background/80 backdrop-blur-sm z-10">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
            <p className="text-sm text-muted-foreground">Loading chapter PDF…</p>
            <p className="text-[10px] text-muted-foreground">Streaming directly from official NCERT source</p>
          </div>
        )}

        {error ? (
          <div className="flex flex-col items-center justify-center h-full gap-4 p-6 text-center">
            <AlertTriangle className="w-12 h-12 text-destructive" />
            <div>
              <p className="text-sm font-medium mb-1">Unable to load chapter in app</p>
              <p className="text-xs text-muted-foreground max-w-xs">
                The NCERT PDF could not be rendered inside the app right now. You can retry or open the official
                file in your browser.
              </p>
            </div>
            <div className="flex flex-col gap-2 w-full max-w-xs">
              <Button onClick={() => window.open(pdfUrl, "_blank", "noopener,noreferrer")} className="w-full">
                <ExternalLink className="w-4 h-4 mr-2" /> Open in Browser
              </Button>
              <Button variant="outline" onClick={handleRetry} className="w-full">
                <RefreshCw className="w-4 h-4 mr-2" /> Retry
              </Button>
            </div>
          </div>
        ) : (
          documentFile && (
            <div className="min-h-full px-2 py-4">
              <div className="mx-auto flex w-fit flex-col gap-3">
                <Document
                  key={reloadKey}
                  file={documentFile}
                  loading=""
                  error=""
                  noData=""
                  onLoadSuccess={handleLoadSuccess}
                  onLoadError={handleLoadError}
                  onSourceError={handleLoadError}
                >
                  {Array.from({ length: numPages }, (_, i) => (
                    <Page
                      key={`page_${i + 1}`}
                      pageNumber={i + 1}
                      width={pageWidth || undefined}
                      renderTextLayer={false}
                      renderAnnotationLayer={false}
                      className="overflow-hidden rounded-lg border border-border bg-background shadow-sm"
                      loading={<div className="h-24 rounded-lg border border-border bg-background/60" />}
                    />
                  ))}
                </Document>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default NCERTChapterViewer;
