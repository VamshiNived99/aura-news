import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { useNotifications } from "@/hooks/useNotifications";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, MapPin, Calendar, Users, Briefcase, IndianRupee, RefreshCw, Loader2, ExternalLink, Building2, Clock, ChevronRight, Flame, Sparkles, TrendingUp, Zap, Filter } from "lucide-react";
import { useNavigate } from "react-router-dom";
import JobDetailsModal from "@/components/JobDetailsModal";
import { getCachedJobDetails, setCachedJobDetails } from "@/components/JobDetailsModal";
import { motion, AnimatePresence } from "framer-motion";

const WORKER_URL = "https://aura-govt-jobs-proxy.veerla3399.workers.dev";
const DETAILS_PREFETCH = 15;

// Map common Indian govt organisations to their official domains for Clearbit logos.
const ORG_DOMAIN_MAP: Record<string, string> = {
  UPSC: "upsc.gov.in",
  SSC: "ssc.nic.in",
  RRB: "rrbcdg.gov.in",
  IBPS: "ibps.in",
  SBI: "sbi.co.in",
  RBI: "rbi.org.in",
  LIC: "licindia.in",
  ONGC: "ongcindia.com",
  DRDO: "drdo.gov.in",
  ISRO: "isro.gov.in",
  SAIL: "sail.co.in",
  NTPC: "ntpc.co.in",
  BHEL: "bhel.com",
  HAL: "hal-india.co.in",
  BSNL: "bsnl.co.in",
  IOCL: "iocl.com",
  HPCL: "hindustanpetroleum.com",
  BPCL: "bharatpetroleum.in",
  GAIL: "gailonline.com",
  NHPC: "nhpcindia.com",
  PGCIL: "powergrid.in",
  NPCIL: "npcil.nic.in",
  AAI: "aai.aero",
  FCI: "fci.gov.in",
  RITES: "rites.com",
  IRCTC: "irctc.co.in",
  ECIL: "ecil.co.in",
  BEL: "bel-india.in",
  BARC: "barc.gov.in",
  NHAI: "nhai.gov.in",
  NMDC: "nmdc.co.in",
  NFL: "nationalfertilizers.com",
  EIL: "engineersindia.com",
  MDL: "mazagondock.in",
  MECON: "meconlimited.co.in",
  CBSE: "cbse.gov.in",
  KVS: "kvsangathan.nic.in",
  NVS: "navodaya.gov.in",
  POWERGRID: "powergrid.in",
  HUDCO: "hudco.org",
};

function getOrgLogo(org?: string | null): string | null {
  if (!org) return null;
  const key = org.toUpperCase().trim();
  const domain = ORG_DOMAIN_MAP[key];
  if (!domain) return null;
  return `https://logo.clearbit.com/${domain}`;
}

// Stable colour tint per organisation/category for soft card backgrounds.
const TINTS = [
  "from-blue-500/15 via-blue-500/5 to-transparent",
  "from-emerald-500/15 via-emerald-500/5 to-transparent",
  "from-violet-500/15 via-violet-500/5 to-transparent",
  "from-amber-500/15 via-amber-500/5 to-transparent",
  "from-rose-500/15 via-rose-500/5 to-transparent",
  "from-cyan-500/15 via-cyan-500/5 to-transparent",
  "from-indigo-500/15 via-indigo-500/5 to-transparent",
  "from-teal-500/15 via-teal-500/5 to-transparent",
];
function getTint(seed?: string | null): string {
  if (!seed) return TINTS[0];
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  return TINTS[h % TINTS.length];
}

// Accent ring colour for the company avatar — paired with the card tint.
const RINGS = [
  "ring-blue-500/30",
  "ring-emerald-500/30",
  "ring-violet-500/30",
  "ring-amber-500/30",
  "ring-rose-500/30",
  "ring-cyan-500/30",
  "ring-indigo-500/30",
  "ring-teal-500/30",
];
function getRing(seed?: string | null): string {
  if (!seed) return RINGS[0];
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  return RINGS[h % RINGS.length];
}

function isRecent(date?: string): boolean {
  if (!date) return false;
  const parsed = new Date(date);
  if (isNaN(parsed.getTime())) return false;
  const diff = (Date.now() - parsed.getTime()) / (1000 * 60 * 60 * 24);
  return diff >= 0 && diff <= 3;
}

// Small avatar that gracefully falls back to an icon when the logo can't load.
function CompanyLogo({ org, className = "" }: { org?: string | null; className?: string }) {
  const [failed, setFailed] = useState(false);
  const url = getOrgLogo(org);
  const initial = (org || "G").trim().charAt(0).toUpperCase();
  if (!url || failed) {
    return (
      <div
        className={`flex items-center justify-center bg-gradient-to-br from-primary/20 to-primary/5 text-primary font-bold ${className}`}
      >
        <span className="text-lg leading-none">{initial}</span>
      </div>
    );
  }
  return (
    <div className={`overflow-hidden bg-white ${className}`}>
      <img
        src={url}
        alt={org || "logo"}
        loading="lazy"
        className="w-full h-full object-contain p-1"
        onError={() => setFailed(true)}
      />
    </div>
  );
}

type JobItem = {
  title?: string;
  raw?: string;
  date?: string;
  detailsUrl?: string;
  location?: string;
  vacancies?: number | null;
  categoryTag?: string;
  salary?: string | null;
  endDate?: string | null;
  totalVacancy?: number | null;
  organization?: string | null;
};

const STATES = [
  { key: "all", label: "All India" },
  { key: "AP", label: "Andhra Pradesh" },
  { key: "ASSAM", label: "Assam" },
  { key: "BIHAR", label: "Bihar" },
  { key: "CHHATTISGARH", label: "Chhattisgarh" },
  { key: "DELHI", label: "Delhi" },
  { key: "GUJARAT", label: "Gujarat" },
  { key: "HP", label: "Himachal Pradesh" },
  { key: "HARYANA", label: "Haryana" },
  { key: "JHARKHAND", label: "Jharkhand" },
  { key: "KARNATAKA", label: "Karnataka" },
  { key: "KERALA", label: "Kerala" },
  { key: "MAHARASHTRA", label: "Maharashtra" },
  { key: "MP", label: "Madhya Pradesh" },
  { key: "ODISHA", label: "Odisha" },
  { key: "PUNJAB", label: "Punjab" },
  { key: "RAJASTHAN", label: "Rajasthan" },
  { key: "TN", label: "Tamil Nadu" },
  { key: "TELANGANA", label: "Telangana" },
  { key: "UTTARAKHAND", label: "Uttarakhand" },
  { key: "UP", label: "Uttar Pradesh" },
  { key: "WB", label: "West Bengal" },
];

const CATEGORIES = [
  { key: "All", label: "All Categories", icon: "📋" },
  { key: "Banking", label: "Banking", icon: "🏦" },
  { key: "Teaching", label: "Teaching", icon: "📚" },
  { key: "Engineering", label: "Engineering", icon: "⚙️" },
  { key: "Railway", label: "Railway", icon: "🚂" },
  { key: "Police/Defence", label: "Police/Defence", icon: "🛡️" },
];

// Helper to check if a job is expired
function isJobExpired(endDate: string | null | undefined): boolean {
  if (!endDate) return false; // Don't filter jobs without dates
  
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  // Try parsing various date formats like "15 Dec 2025", "2025-12-10", "Dec 15, 2025"
  const parsed = new Date(endDate);
  if (!isNaN(parsed.getTime())) {
    return parsed < today;
  }
  
  // Try manual parsing for formats like "15 Dec 2025" or "15-12-2025"
  const monthNames = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];
  const cleanDate = endDate.toLowerCase().replace(/[,]/g, "").trim();
  
  // Pattern: "15 Dec 2025" or "15 December 2025"
  const match1 = cleanDate.match(/(\d{1,2})\s+([a-z]+)\s+(\d{4})/);
  if (match1) {
    const day = parseInt(match1[1]);
    const monthIdx = monthNames.findIndex(m => match1[2].startsWith(m));
    const year = parseInt(match1[3]);
    if (monthIdx !== -1) {
      const date = new Date(year, monthIdx, day);
      return date < today;
    }
  }
  
  // Pattern: "Dec 15, 2025"
  const match2 = cleanDate.match(/([a-z]+)\s+(\d{1,2})\s+(\d{4})/);
  if (match2) {
    const monthIdx = monthNames.findIndex(m => match2[1].startsWith(m));
    const day = parseInt(match2[2]);
    const year = parseInt(match2[3]);
    if (monthIdx !== -1) {
      const date = new Date(year, monthIdx, day);
      return date < today;
    }
  }
  
  return false;
}

const Jobs = () => {
  const navigate = useNavigate();
  const { notifyNewJobs, notifyExpiringJobs } = useNotifications();
  const [jobs, setJobs] = useState<JobItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [stateKey, setStateKey] = useState("all");

  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState<any>(null);
  const [modalLoading, setModalLoading] = useState(false);
  const [modalError, setModalError] = useState<string | null>(null);
  const [selectedJobUrl, setSelectedJobUrl] = useState<string | null>(null);
  // Ads removed - direct actions now

  // Pending actions after ad closes
  const [pendingDetailsJob, setPendingDetailsJob] = useState<JobItem | null>(null);
  const [pendingApplyUrl, setPendingApplyUrl] = useState<string | null>(null);
  const [pendingApplyOfficialLink, setPendingApplyOfficialLink] = useState<string | null>(null);

  const categoryToQuery = (cat: string) => {
    if (!cat || cat === "All") return "govt";
    const map: Record<string, string> = {
      Banking: "bank",
      Teaching: "teaching",
      Railway: "railway",
      "Police/Defence": "police",
      Engineering: "engineering",
    };
    return map[cat] || "govt";
  };

  // Category keywords for client-side filtering when both state + category selected
  const CATEGORY_KEYWORDS: Record<string, string[]> = {
    Banking: ["bank", "banking", "ibps", "sbi", "rbi", "nabard", "sebi", "lic", "clerk", "po ", "probationary"],
    Teaching: ["teacher", "teaching", "tgt", "pgt", "lecturer", "professor", "kvs", "nvs", "ctet", "faculty", "education"],
    Railway: ["railway", "rrb", "ntpc", "rail", "loco pilot", "station master", "irctc"],
    "Police/Defence": ["police", "defence", "defense", "army", "navy", "airforce", "air force", "crpf", "bsf", "cisf", "itbp", "ssb", "constable", "sub inspector", "military", "nda", "cds"],
    Engineering: ["engineer", "engineering", "technical", "je ", "junior engineer", "ae ", "assistant engineer", "iti"],
  };

  // Extract organization from title
  function extractOrganization(title: string | null) {
    if (!title) return null;
    const orgPatterns = [
      /^(UPSC|SSC|RRB|IBPS|SBI|RBI|LIC|ONGC|DRDO|ISRO|SAIL|NTPC|BHEL|HAL|BSNL|IOCL|HPCL|BPCL|GAIL|NHPC|PGCIL|NPCIL|AAI|FCI|RITES|IRCTC|ECIL|BEL|BARC|NHAI|NMDC|NFL|EIL|MDL|GRSE|GSL|HSL|BDL|MIDHANI|BEML|CPCL|CPCL|RCFL|HUDCO|NHIDCL|CBSE|KVS|NVS|IB|OICL|POWERGRID)[^\s]*/i,
      /^([A-Z]{2,10})\s/,
    ];
    for (const p of orgPatterns) {
      const m = title.match(p);
      if (m) return m[1].toUpperCase();
    }
    return null;
  }

  // Extract vacancy from title
  function extractVacancyFromTitle(title: string | null) {
    if (!title) return null;
    const patterns = [
      /(\d{1,6})\s*(?:posts?|vacancies?|seats?)/i,
      /Apply\s+(?:Online\s+)?for\s+(\d{1,6})/i,
      /Recruitment\s+(?:\d{4}\s+)?(?:for\s+)?(\d{1,6})/i,
    ];
    for (const p of patterns) {
      const m = title.match(p);
      if (m) return parseInt(m[1], 10);
    }
    return null;
  }

  async function loadList() {
    setLoading(true);
    setError("");
    setJobs([]);

    try {
      const hasState = stateKey && stateKey !== "all";
      const hasCategory = category && category !== "All";
      
      // Build queries: prioritize state if selected, else use category
      const q = hasState ? stateKey : categoryToQuery(category);
      
      // Fetch from primary query
      const fetchPromises: Promise<Response>[] = [
        fetch(`${WORKER_URL}/api/scrape?q=${encodeURIComponent(q)}`)
      ];
      
      // If both state + category selected, also fetch category endpoint for merging
      if (hasState && hasCategory) {
        fetchPromises.push(
          fetch(`${WORKER_URL}/api/scrape?q=${encodeURIComponent(categoryToQuery(category))}`)
        );
      }
      
      const responses = await Promise.all(fetchPromises);
      const allRawItems: any[] = [];
      
      for (const res of responses) {
        const txt = await res.text();
        if (!res.ok) {
          let msg = txt;
          try { msg = JSON.parse(txt).error || msg; } catch {}
          throw new Error(msg || `Worker error ${res.status}`);
        }
        const data = JSON.parse(txt);
        allRawItems.push(...(data.items || []));
      }
      
      // Deduplicate by detailsUrl
      const seenDetailUrls = new Set<string>();
      const dedupedItems = allRawItems.filter(it => {
        if (!it.detailsUrl || seenDetailUrls.has(it.detailsUrl)) return false;
        seenDetailUrls.add(it.detailsUrl);
        return true;
      });

      let items: JobItem[] = dedupedItems.map((it: any) => {
        const title = it.title || it.raw || "Untitled";
        return {
          title,
          raw: it.raw || "",
          date: it.date || "",
          detailsUrl: it.detailsUrl,
          location: hasState
            ? STATES.find(s => s.key === stateKey)?.label || "Local" 
            : "All India",
          vacancies: null,
          categoryTag: hasCategory ? category : "Govt",
          salary: null,
          endDate: null,
          totalVacancy: extractVacancyFromTitle(title),
          organization: extractOrganization(title),
        };
      });
      
      // Client-side category filtering when both state + category are selected
      if (hasState && hasCategory) {
        const keywords = CATEGORY_KEYWORDS[category] || [];
        if (keywords.length > 0) {
          items = items.filter(job => {
            const text = ((job.title || "") + " " + (job.raw || "")).toLowerCase();
            return keywords.some(kw => text.includes(kw));
          });
        }
      }

      setJobs(items);
      
      // Send notifications for new jobs
      notifyNewJobs(items.map(j => ({ title: j.title || '', url: j.detailsUrl })));

      // Prefetch details for first N items (in background)
      if (DETAILS_PREFETCH > 0 && items.length > 0) {
        const toFetch = items.slice(0, DETAILS_PREFETCH);
        Promise.all(toFetch.map(async (it) => {
          try {
            const r = await fetch(`${WORKER_URL}/api/scrapeDetail?url=${encodeURIComponent(it.detailsUrl || "")}`);
            if (!r.ok) return null;
            const parsed = await r.json();
            return { 
              url: it.detailsUrl, 
              totalVacancy: parsed.totalVacancy, 
              salary: parsed.salary, 
              endDate: parsed.lastDate || parsed.postDate,
              organization: parsed.organization
            };
          } catch {
            return null;
          }
        })).then(results => {
          setJobs((prev) => {
            const updated = prev.map((j) => {
              const found = results.find((r) => r && r.url === j.detailsUrl);
              if (found) {
                return {
                  ...j,
                  totalVacancy: found.totalVacancy ?? j.totalVacancy,
                  salary: found.salary ?? j.salary,
                  endDate: found.endDate ?? j.endDate,
                  organization: found.organization ?? j.organization,
                };
              }
              return j;
            });
            // Alert users about jobs expiring within 3 days
            notifyExpiringJobs(
              updated.map(j => ({ title: j.title || '', endDate: j.endDate, url: j.detailsUrl }))
            );
            return updated;
          });
        });
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message || String(err));
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadList();
  }, [category, stateKey]);

  // Filter out expired jobs and apply search filter
  const filtered = jobs.filter((j) => {
    // Filter expired jobs first
    if (isJobExpired(j.endDate)) return false;
    
    // Then apply search filter
    const s = search.trim().toLowerCase();
    if (s && !((j.title || "").toLowerCase().includes(s) || (j.raw || "").toLowerCase().includes(s))) {
      return false;
    }
    return true;
  });
  // Open details directly (no ads)
  function openDetails(item: JobItem) {
    if (!item.detailsUrl) return;
    actuallyOpenDetails(item);
  }

  // Actually open the details modal - uses AI-powered scraper for rich details
  async function actuallyOpenDetails(item: JobItem) {
    if (!item.detailsUrl) return;
    
    // Check cache first
    const cached = getCachedJobDetails(item.detailsUrl);
    if (cached) {
      setModalOpen(true);
      setModalData(cached);
      setModalLoading(false);
      setModalError(null);
      setSelectedJobUrl(item.detailsUrl);
      return;
    }

    setModalOpen(true);
    setModalLoading(true);
    setModalData(null);
    setModalError(null);
    setSelectedJobUrl(item.detailsUrl);

    try {
      // Try AI-powered edge function first for rich, structured details
      let parsed: any = null;
      
      try {
        const aiResponse = await fetch(
          `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/scrape-job-details`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'apikey': import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
              'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
            },
            body: JSON.stringify({ url: item.detailsUrl }),
          }
        );
        
        if (aiResponse.ok) {
          parsed = await aiResponse.json();
          if (parsed.error) parsed = null;
        }
      } catch (e) {
        console.warn('AI scraper failed, falling back to worker:', e);
      }

      // Fallback to basic worker scraper
      if (!parsed) {
        const r = await fetch(`${WORKER_URL}/api/scrapeDetail?url=${encodeURIComponent(item.detailsUrl)}`);
        if (!r.ok) {
          const txt = await r.text();
          let msg = txt;
          try { msg = JSON.parse(txt).error || msg; } catch {}
          throw new Error(msg || `Worker ${r.status}`);
        }
        parsed = await r.json();
      }

      setModalData({
        ...parsed,
      });
      // Cache the result
      setCachedJobDetails(item.detailsUrl, parsed);

      // Update card fields
      setJobs((prev) =>
        prev.map((j) =>
          j.detailsUrl === item.detailsUrl
            ? {
                ...j,
                totalVacancy: parsed.totalVacancy ?? j.totalVacancy,
                salary: parsed.salary ?? j.salary,
                endDate: parsed.lastDate ?? j.endDate,
                organization: parsed.organization ?? j.organization,
              }
            : j
        )
      );
    } catch (err: any) {
      console.error(err);
      setModalError("details_unavailable");
    } finally {
      setModalLoading(false);
    }
  }

  // Apply directly (no ads)
  function applyNow(detailsUrl: string | undefined, officialLink?: string | null) {
    if (!detailsUrl && !officialLink) return;
    actuallyApply(detailsUrl || null, officialLink);
  }

  // Actually apply (called after ad closes)
  async function actuallyApply(detailsUrl: string | null, officialLink?: string | null) {
    if (officialLink) {
      window.open(officialLink, "_blank");
      return;
    }
    if (!detailsUrl) return;
    // Fetch official link from worker
    try {
      const r = await fetch(`${WORKER_URL}/api/getApplyLink?url=${encodeURIComponent(detailsUrl)}`);
      if (r.ok) {
        const data = await r.json();
        if (data.officialLink) {
          window.open(data.officialLink, "_blank");
          return;
        }
      }
    } catch {}
    // Fallback - should not happen with improved worker
    window.open(detailsUrl, "_blank");
  }

  // Top 5 carousel auto-scroll
  const top5Ref = useRef<HTMLDivElement | null>(null);
  const top5 = filtered.slice(0, 5);
  const latestStrip = filtered.slice(5, 15);
  const restList = filtered.slice(5);

  // Active (centered) card index for focus/scaling effect
  const [activeTop5, setActiveTop5] = useState(0);

  // Track scroll to determine which card is centered
  useEffect(() => {
    const el = top5Ref.current;
    if (!el || !top5.length) return;
    const onScroll = () => {
      const center = el.scrollLeft + el.clientWidth / 2;
      let bestIdx = 0;
      let bestDist = Infinity;
      Array.from(el.children).forEach((c, i) => {
        const child = c as HTMLElement;
        const mid = child.offsetLeft + child.offsetWidth / 2;
        const d = Math.abs(mid - center);
        if (d < bestDist) { bestDist = d; bestIdx = i; }
      });
      setActiveTop5(bestIdx);
    };
    onScroll();
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, [top5.length]);

  useEffect(() => {
    if (!top5.length) return;
    const el = top5Ref.current;
    if (!el) return;
    let idx = 0;
    const t = setInterval(() => {
      const child = el.children[idx] as HTMLElement | undefined;
      if (!child) { idx = 0; return; }
      el.scrollTo({ left: child.offsetLeft - 16, behavior: "smooth" });
      idx = (idx + 1) % top5.length;
    }, 4000);
    return () => clearInterval(t);
  }, [top5.length]);

  // Category gradient backgrounds for hero/top cards
  const HERO_GRADIENTS = [
    "from-indigo-600 via-purple-600 to-fuchsia-600",
    "from-cyan-500 via-blue-600 to-indigo-700",
    "from-emerald-500 via-teal-600 to-cyan-700",
    "from-rose-500 via-pink-600 to-purple-700",
    "from-amber-500 via-orange-600 to-rose-600",
  ];
  const heroGradient = (seed?: string | null, i = 0) => {
    if (seed) {
      let h = 0;
      for (let k = 0; k < seed.length; k++) h = (h * 31 + seed.charCodeAt(k)) >>> 0;
      return HERO_GRADIENTS[h % HERO_GRADIENTS.length];
    }
    return HERO_GRADIENTS[i % HERO_GRADIENTS.length];
  };

  return (
    <div className="relative min-h-[100dvh] w-full bg-[hsl(225_25%_6%)] dark:bg-[hsl(225_25%_5%)] text-foreground pb-24 overflow-hidden">
      {/* Ambient neon glows */}
      <div className="pointer-events-none fixed inset-0 -z-0 overflow-hidden">
        <div className="absolute -top-32 -left-20 w-[380px] h-[380px] rounded-full bg-violet-600/25 blur-[140px]" />
        <div className="absolute top-40 -right-24 w-[320px] h-[320px] rounded-full bg-cyan-500/20 blur-[140px]" />
        <div className="absolute top-[55%] left-1/4 w-[280px] h-[280px] rounded-full bg-fuchsia-500/15 blur-[140px]" />
        <div className="absolute bottom-0 right-1/3 w-[260px] h-[260px] rounded-full bg-teal-400/10 blur-[140px]" />
      </div>

      {/* Header */}
      <header className="relative z-40 sticky top-0 bg-[hsl(225_25%_6%)]/70 backdrop-blur-2xl border-b border-white/5">
        <div className="flex items-center justify-between px-4 pt-4 pb-3">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={() => navigate("/home")} className="shrink-0 text-white/80 hover:text-white hover:bg-white/10 rounded-full">
              ←
            </Button>
            <div>
              <h1 className="text-[20px] font-extrabold tracking-tight bg-gradient-to-r from-cyan-300 via-violet-300 to-fuchsia-300 bg-clip-text text-transparent">
                Govt Jobs
              </h1>
              <p className="text-[11px] text-white/50 font-medium">Premium recruitment hub</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-white/10 border border-white/10 text-white/90 backdrop-blur-md">
              {filtered.length}
            </span>
            <Button variant="ghost" size="icon" onClick={loadList} disabled={loading} className="text-white/80 hover:text-white hover:bg-white/10 rounded-full">
              <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
            </Button>
          </div>
        </div>

        {/* Floating search */}
        <div className="px-4 pb-3">
          <div className="relative group">
            <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-cyan-500/40 via-violet-500/40 to-fuchsia-500/40 opacity-60 blur-md group-focus-within:opacity-90 transition-opacity" />
            <div className="relative flex items-center bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-[0_8px_30px_-10px_rgba(0,0,0,0.6)]">
              <Search className="absolute left-4 w-4 h-4 text-white/50" />
              <Input
                placeholder="Search jobs, organisations…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-11 h-12 bg-transparent border-0 text-white placeholder:text-white/40 focus-visible:ring-0"
              />
            </div>
          </div>
        </div>

        {/* Filter chips */}
        <div className="px-4 pb-3 flex gap-2 overflow-x-auto scrollbar-hide">
          <Select value={stateKey} onValueChange={setStateKey}>
            <SelectTrigger className="h-9 w-auto min-w-[130px] gap-1.5 px-3 rounded-full bg-white/5 hover:bg-white/10 backdrop-blur-md border border-white/10 text-white/90 text-[12px] font-semibold">
              <MapPin className="w-3.5 h-3.5 text-cyan-300" />
              <SelectValue placeholder="State" />
            </SelectTrigger>
            <SelectContent>
              {STATES.map((s) => (
                <SelectItem key={s.key} value={s.key}>{s.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="h-9 w-auto min-w-[140px] gap-1.5 px-3 rounded-full bg-white/5 hover:bg-white/10 backdrop-blur-md border border-white/10 text-white/90 text-[12px] font-semibold">
              <Filter className="w-3.5 h-3.5 text-violet-300" />
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {CATEGORIES.map((c) => (
                <SelectItem key={c.key} value={c.key}>
                  <span className="mr-2">{c.icon}</span>
                  {c.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </header>

      {/* Content */}
      <main className="relative z-10 w-full pt-3">
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mx-4 bg-rose-500/10 border border-rose-400/30 rounded-2xl p-4 mb-4 backdrop-blur-md"
          >
            <p className="text-rose-300 text-sm font-medium">{error}</p>
            <Button variant="outline" size="sm" className="mt-2" onClick={loadList}>
              Retry
            </Button>
          </motion.div>
        )}

        {loading && (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="relative">
              <Loader2 className="w-12 h-12 animate-spin text-cyan-300" />
              <div className="absolute inset-0 w-12 h-12 rounded-full border-4 border-violet-500/20" />
            </div>
            <span className="mt-4 text-white/60 font-medium">Loading latest jobs…</span>
          </div>
        )}

        {!loading && filtered.length === 0 && !error && (
          <div className="text-center py-16 px-4">
            <div className="w-20 h-20 mx-auto mb-4 bg-white/5 border border-white/10 backdrop-blur-md rounded-full flex items-center justify-center">
              <Briefcase className="w-10 h-10 text-white/40" />
            </div>
            <p className="text-white/80 font-semibold">No jobs found</p>
            <p className="text-sm text-white/50 mt-1">Try changing filters or search</p>
          </div>
        )}

        <AnimatePresence>
          {!loading && filtered.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-7"
            >
              {/* === SECTION 1: TOP 5 CAROUSEL === */}
              {top5.length > 0 && (
                <section>
                  <div className="flex items-end justify-between px-4 mb-3">
                    <div>
                      <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-cyan-300/90">
                        <Sparkles className="w-3 h-3" /> Featured
                      </div>
                      <h2 className="text-[18px] font-extrabold text-white tracking-tight">Top 5 Jobs</h2>
                    </div>
                    <span className="text-[10px] text-white/50 font-semibold uppercase tracking-wider">Swipe →</span>
                  </div>

                  <div
                    ref={top5Ref}
                    className="flex gap-3 overflow-x-auto scrollbar-hide snap-x snap-mandatory px-[12vw] pb-6 pt-2"
                    style={{ scrollPaddingLeft: "12vw" }}
                  >
                    {top5.map((job, i) => {
                      const isActive = i === activeTop5;
                      const distance = Math.abs(i - activeTop5);
                      // Badge: first item Trending, recent New, last Urgent
                      const showTrending = i === 0;
                      const showNew = !showTrending && isRecent(job.date);
                      const showUrgent = !showTrending && !showNew && i === top5.length - 1;
                      return (
                        <motion.div
                          key={`top5-${job.detailsUrl || i}`}
                          initial={{ opacity: 0, y: 16 }}
                          animate={{
                            opacity: distance === 0 ? 1 : distance === 1 ? 0.85 : 0.65,
                            scale: distance === 0 ? 1 : distance === 1 ? 0.92 : 0.88,
                            y: 0,
                          }}
                          transition={{ type: "spring", stiffness: 260, damping: 24 }}
                          whileTap={{ scale: isActive ? 0.97 : 0.9 }}
                          onClick={() => openDetails(job)}
                          className="snap-center shrink-0 w-[78vw] max-w-[320px] cursor-pointer"
                        >
                          <div
                            className={`relative h-[300px] rounded-[26px] overflow-hidden transition-all duration-300 ${
                              isActive
                                ? "shadow-[0_24px_60px_-12px_rgba(124,58,237,0.55)] ring-1 ring-white/20"
                                : "shadow-[0_12px_30px_-14px_rgba(0,0,0,0.6)] ring-1 ring-white/10"
                            }`}
                          >
                            {/* Outer glow for active card */}
                            {isActive && (
                              <div className="pointer-events-none absolute -inset-1 rounded-[28px] bg-gradient-to-r from-cyan-400/40 via-violet-500/40 to-fuchsia-500/40 blur-xl opacity-70 -z-10" />
                            )}
                            {/* Clean 2-color gradient backdrop */}
                            <div className={`absolute inset-0 bg-gradient-to-br ${heroGradient(job.organization, i)}`} />
                            {/* Subtle inner highlight */}
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.22),transparent_60%)]" />
                            {/* Dark overlay for text readability (~28%) */}
                            <div className="absolute inset-0 bg-black/25" />
                            {/* Bottom fade for CTA contrast */}
                            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/70 to-transparent" />
                            {/* Inner ring */}
                            <div className="absolute inset-0 rounded-[26px] ring-1 ring-inset ring-white/15" />

                            <div className="relative h-full p-5 flex flex-col">
                              {/* Top row: rank + badge */}
                              <div className="flex items-center justify-between">
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-black/45 backdrop-blur-md border border-white/15 text-[10px] font-bold text-white">
                                  #{i + 1}
                                </span>
                                <div className="h-5 flex items-center">
                                  {showTrending && (
                                    <span className="inline-flex items-center gap-1 px-2 h-5 rounded-full bg-amber-400 text-amber-950 text-[9px] font-extrabold uppercase tracking-wider">
                                      <Flame className="w-2.5 h-2.5" /> Trending
                                    </span>
                                  )}
                                  {showNew && (
                                    <span className="inline-flex items-center gap-1 px-2 h-5 rounded-full bg-emerald-400 text-emerald-950 text-[9px] font-extrabold uppercase tracking-wider">
                                      <Zap className="w-2.5 h-2.5" /> New
                                    </span>
                                  )}
                                  {showUrgent && (
                                    <span className="inline-flex items-center gap-1 px-2 h-5 rounded-full bg-rose-500 text-white text-[9px] font-extrabold uppercase tracking-wider">
                                      <Clock className="w-2.5 h-2.5" /> Urgent
                                    </span>
                                  )}
                                </div>
                              </div>

                              {/* Logo + org */}
                              <div className="mt-4 flex items-center gap-3">
                                <div className="relative">
                                  {isActive && (
                                    <div className="absolute -inset-1 rounded-full bg-white/50 blur-md" />
                                  )}
                                  <CompanyLogo
                                    org={job.organization}
                                    className="relative w-12 h-12 rounded-full border-2 border-white/80 shadow-xl"
                                  />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-white/90 truncate">
                                    {job.organization || "Government"}
                                  </div>
                                  <div className="flex items-center gap-1 text-[11px] text-white/75 mt-0.5">
                                    <MapPin className="w-3 h-3 shrink-0" />
                                    <span className="truncate">{job.location || "All India"}</span>
                                  </div>
                                </div>
                              </div>

                              {/* Title — fixed 2 lines */}
                              <h3 className="mt-4 font-extrabold text-white text-[15.5px] leading-snug line-clamp-2 tracking-tight min-h-[42px]">
                                {job.title}
                              </h3>

                              {/* Tags */}
                              <div className="mt-3 flex flex-wrap gap-1.5">
                                {job.totalVacancy && (
                                  <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-[10.5px] font-bold text-white">
                                    <Users className="w-3 h-3" /> {job.totalVacancy.toLocaleString()} Posts
                                  </span>
                                )}
                                <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-[10.5px] font-bold text-white">
                                 {job.salary ? (
                                   <><IndianRupee className="w-3 h-3" /> {job.salary}</>
                                 ) : (
                                   <><Briefcase className="w-3 h-3" /> Govt Job</>
                                 )}
                                </span>
                              </div>

                              {/* CTA — fixed 48px, full width */}
                              <Button
                                onClick={(e) => { e.stopPropagation(); applyNow(job.detailsUrl); }}
                                className="mt-auto w-full h-12 rounded-2xl bg-white text-black hover:bg-white/95 font-extrabold text-[13.5px] shadow-[0_10px_28px_-6px_rgba(255,255,255,0.55)] ring-1 ring-white/40"
                              >
                                <ExternalLink className="w-4 h-4 mr-1.5" /> Apply Now
                              </Button>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                  {/* Pagination dots */}
                  {top5.length > 1 && (
                    <div className="flex justify-center gap-1.5 -mt-3">
                      {top5.map((_, i) => (
                        <span
                          key={`dot-${i}`}
                          className={`h-1.5 rounded-full transition-all ${
                            i === activeTop5 ? "w-6 bg-white" : "w-1.5 bg-white/30"
                          }`}
                        />
                      ))}
                    </div>
                  )}
                </section>
              )}

              {/* === SECTION 2: LATEST JOBS HORIZONTAL === */}
              {latestStrip.length > 0 && (
                <section>
                  <div className="flex items-end justify-between px-4 mb-3">
                    <div>
                      <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-violet-300/90">
                        <TrendingUp className="w-3 h-3" /> Fresh
                      </div>
                      <h2 className="text-[16px] font-extrabold text-white tracking-tight">Latest Jobs</h2>
                    </div>
                  </div>
                  <div className="flex gap-3 overflow-x-auto scrollbar-hide snap-x px-4 pb-2">
                    {latestStrip.map((job, i) => (
                      <motion.button
                        key={`latest-${job.detailsUrl || i}`}
                        initial={{ opacity: 0, x: 16 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.04 }}
                        whileTap={{ scale: 0.96 }}
                        onClick={() => openDetails(job)}
                        className="snap-start shrink-0 w-[180px] text-left"
                      >
                        <div className="relative h-[160px] rounded-2xl overflow-hidden bg-white/5 backdrop-blur-xl border border-white/10 p-3 flex flex-col shadow-[0_10px_30px_-12px_rgba(0,0,0,0.6)] hover:border-cyan-400/40 hover:shadow-[0_12px_30px_-10px_rgba(34,211,238,0.35)] transition-all">
                          <div className={`absolute inset-0 bg-gradient-to-br ${getTint(job.organization || job.categoryTag)} opacity-80`} />
                          <div className="relative flex items-center justify-between mb-2">
                            <CompanyLogo
                              org={job.organization}
                              className="w-9 h-9 rounded-full border border-white/20 ring-1 ring-white/10"
                            />
                            {isRecent(job.date) && (
                              <span className="px-1.5 py-0.5 rounded-full bg-emerald-400/20 text-emerald-300 text-[9px] font-bold border border-emerald-400/30">NEW</span>
                            )}
                          </div>
                          <div className="relative text-[10px] font-bold uppercase tracking-wider text-cyan-300/90">
                            {job.organization || "Govt"}
                          </div>
                          <h4 className="relative mt-1 font-bold text-white text-[12.5px] leading-snug line-clamp-3 tracking-tight">
                            {job.title}
                          </h4>
                          <div className="relative mt-auto flex items-center gap-1 text-[10px] text-white/60 font-semibold">
                            <Clock className="w-3 h-3" />
                            <span className="truncate">{job.endDate || job.date || "Open"}</span>
                          </div>
                        </div>
                      </motion.button>
                    ))}
                  </div>
                </section>
              )}

              {/* === SECTION 3: ALL JOBS LIST === */}
              <section className="px-4">
                <div className="flex items-end justify-between mb-3">
                  <div>
                    <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-fuchsia-300/90">
                      <Briefcase className="w-3 h-3" /> All Listings
                    </div>
                    <h2 className="text-[16px] font-extrabold text-white tracking-tight">Browse All Jobs</h2>
                  </div>
                  <span className="text-[11px] text-white/50 font-semibold">{restList.length} more</span>
                </div>

                <div className="space-y-3">
                  {restList.map((job, idx) => (
                    <motion.div
                      key={job.detailsUrl || idx}
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: Math.min(idx * 0.025, 0.35) }}
                      whileTap={{ scale: 0.985 }}
                    >
                      <div className="relative overflow-hidden rounded-[22px] border border-white/10 bg-white/5 backdrop-blur-xl shadow-[0_10px_30px_-14px_rgba(0,0,0,0.6)] hover:border-cyan-400/40 hover:shadow-[0_14px_36px_-14px_rgba(34,211,238,0.35)] transition-all duration-300">
                        {/* Gradient wash */}
                        <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${getTint(job.organization || job.categoryTag)} opacity-70`} />
                        <div className="pointer-events-none absolute -top-12 -right-12 w-32 h-32 rounded-full bg-violet-500/15 blur-3xl" />

                        <div className="relative p-4">
                          <div className="flex items-start gap-3">
                            <div className="relative shrink-0">
                              <div className="absolute -inset-0.5 rounded-full bg-gradient-to-br from-cyan-400/40 to-fuchsia-400/40 blur-sm" />
                              <CompanyLogo
                                org={job.organization}
                                className={`relative w-12 h-12 rounded-full border border-white/20 ring-2 ring-offset-2 ring-offset-transparent shadow-md ${getRing(job.organization || job.categoryTag)}`}
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center flex-wrap gap-1.5 mb-1">
                                <span className="text-[10.5px] font-bold uppercase tracking-wider text-cyan-300/90">
                                  {job.organization || job.categoryTag || "Govt"}
                                </span>
                                {isRecent(job.date) && (
                                  <span className="px-1.5 py-0.5 rounded-full text-[9px] bg-emerald-400/20 text-emerald-300 border border-emerald-400/30 font-bold">
                                    NEW
                                  </span>
                                )}
                                {job.totalVacancy && job.totalVacancy >= 500 && (
                                  <span className="px-1.5 py-0.5 rounded-full text-[9px] bg-rose-400/20 text-rose-300 border border-rose-400/30 font-bold flex items-center gap-0.5">
                                    <Flame className="w-2.5 h-2.5" /> HOT
                                  </span>
                                )}
                                {job.endDate && (
                                  <span className="px-1.5 py-0.5 rounded-full text-[9px] bg-amber-400/20 text-amber-300 border border-amber-400/30 font-bold">
                                    URGENT
                                  </span>
                                )}
                              </div>
                              <h3 className="font-bold text-[15.5px] leading-snug line-clamp-2 text-white tracking-tight">
                                {job.title}
                              </h3>
                            </div>
                          </div>

                          {/* Tag chips */}
                          <div className="mt-3 flex flex-wrap gap-1.5">
                            {job.totalVacancy && (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/8 border border-white/10 text-[10.5px] font-semibold text-white/85">
                                <Users className="w-3 h-3 text-cyan-300" />
                                {job.totalVacancy.toLocaleString()} Posts
                              </span>
                            )}
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/8 border border-white/10 text-[10.5px] font-semibold text-white/85">
                              {job.salary ? (
                                <><IndianRupee className="w-3 h-3 text-emerald-300" /> {job.salary}</>
                              ) : (
                                <><Briefcase className="w-3 h-3 text-emerald-300" /> Govt Job</>
                              )}
                            </span>
                            {job.endDate && (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/8 border border-white/10 text-[10.5px] font-semibold text-white/85">
                                <Clock className="w-3 h-3 text-amber-300" />
                                {job.endDate}
                              </span>
                            )}
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/8 border border-white/10 text-[10.5px] font-semibold text-white/85">
                              <MapPin className="w-3 h-3 text-violet-300" />
                              {job.location || "All India"}
                            </span>
                          </div>

                          {/* CTAs */}
                          <div className="mt-3 flex items-stretch gap-2">
                            <Button
                              variant="outline"
                              className="flex-1 h-10 rounded-xl text-[13px] font-semibold border-white/15 bg-white/5 text-white/90 hover:bg-white/10 hover:text-white"
                              onClick={() => openDetails(job)}
                            >
                              Details
                              <ChevronRight className="w-4 h-4 ml-0.5" />
                            </Button>
                            <Button
                              className="flex-1 h-10 rounded-xl text-[13px] font-extrabold text-white bg-gradient-to-r from-cyan-500 via-violet-500 to-fuchsia-500 hover:opacity-95 shadow-[0_8px_24px_-8px_rgba(139,92,246,0.6)]"
                              onClick={() => applyNow(job.detailsUrl)}
                            >
                              <ExternalLink className="w-4 h-4 mr-1.5" />
                              Apply
                            </Button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </section>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Details Modal */}
      <JobDetailsModal
        open={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setModalData(null);
          setModalError(null);
        }}
        data={modalData}
        loading={modalLoading}
        error={modalError}
        onApply={() => {
          // Close modal first, then show ad
          setModalOpen(false);
          const link = modalData?.officialLink || modalData?.applyLink;
          applyNow(selectedJobUrl || undefined, link);
        }}
        onNotificationClick={(url) => {
          // Close modal first, then show ad before opening notification
          setModalOpen(false);
          applyNow(undefined, url);
        }}
      />

    </div>
  );
};

export default Jobs;
