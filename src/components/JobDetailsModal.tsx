import DOMPurify from "dompurify";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Calendar, Users, GraduationCap, Clock,
  ExternalLink, Loader2, Building2, FileText, AlertCircle,
  CheckCircle2, IndianRupee, UserCheck, X, Share2, BookmarkPlus,
  Award, ScrollText, ListChecks, Sparkles
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { useState, useRef, useEffect, useCallback } from "react";
import React from "react";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

/* ───────── Job details cache ───────── */
const detailsCache = new Map<string, JobData>();
export function getCachedJobDetails(url: string): JobData | null {
  return detailsCache.get(url) || null;
}
export function setCachedJobDetails(url: string, data: JobData) {
  detailsCache.set(url, data);
}

/* ───────── Text cleaning helpers ───────── */
const DOMAIN_PATTERNS = [
  /freejobalert\.com/gi,
  /www\.freejobalert\.com/gi,
  /sarkariresult\.com/gi,
  /sarkarijobs?\.\w+/gi,
  /employmentnews\.\w+/gi,
  /rojgar\.?\w*\.com/gi,
];
function stripDomains(text: string | null | undefined): string {
  if (!text) return "";
  let clean = text;
  for (const p of DOMAIN_PATTERNS) {
    clean = clean.replace(p, "");
  }
  return clean.replace(/\s{2,}/g, " ").trim();
}
function isValidField(val: string | null | undefined): boolean {
  if (!val) return false;
  const v = val.trim().toLowerCase();
  if (v.length < 3) return false;
  const empty = ["n/a", "na", "nil", "refer notification", "refer to notification", "as per norms", "as per rules", "loading", "loading...", "—", "-", "–", "not available", "not mentioned", "check notification"];
  return !empty.includes(v);
}

/* ───────── Premium Scrolling Ticker ───────── */
function TickerStrip({ salary, totalVacancy, daysLeft, qualification }: {
  salary?: string | null;
  totalVacancy?: number | null;
  daysLeft?: number | null;
  qualification?: string | null;
}) {
  const items: string[] = ["Govt Job"];
  if (salary && isValidField(salary)) items.push(`₹ ${stripDomains(salary)}`);
  if (totalVacancy) items.push(`${totalVacancy.toLocaleString()} Vacancies`);
  if (qualification && isValidField(qualification)) {
    const q = stripDomains(qualification);
    items.push(q.length > 30 ? q.slice(0, 30) + "…" : q);
  }
  if (daysLeft !== null && daysLeft !== undefined && daysLeft >= 0) {
    items.push(daysLeft === 0 ? "Last Day to Apply!" : `${daysLeft} Days Left`);
  }

  const tickerText = items.join("  •  ");
  const trackRef = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.5 }}
      className="mt-4 relative rounded-[22px] overflow-hidden"
      onTouchStart={() => setPaused(true)}
      onTouchEnd={() => setPaused(false)}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Gradient background + glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/40 via-teal-500/30 to-cyan-600/40 backdrop-blur-xl" />
      <div className="absolute inset-0 rounded-[22px] border border-emerald-400/25 shadow-[0_0_15px_rgba(52,211,153,0.15),inset_0_1px_0_rgba(255,255,255,0.1)]" />

      <div className="relative flex items-center h-9 px-3 gap-2">
        {/* Leading icon */}
        <span className="shrink-0 flex items-center justify-center w-5 h-5 rounded-full bg-emerald-400/25 border border-emerald-400/30">
          <IndianRupee className="w-3 h-3 text-emerald-300" />
        </span>

        {/* Scrolling track */}
        <div className="flex-1 overflow-hidden mask-x">
          <div
            ref={trackRef}
            className="flex whitespace-nowrap"
            style={{
              animation: `ticker-scroll 18s linear infinite`,
              animationPlayState: paused ? "paused" : "running",
            }}
          >
            <span className="text-[11px] font-semibold text-emerald-100/90 tracking-wide pr-16">
              {tickerText}
            </span>
            <span className="text-[11px] font-semibold text-emerald-100/90 tracking-wide pr-16">
              {tickerText}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

const ORG_DOMAIN_MAP: Record<string, string> = {
  UPSC: "upsc.gov.in", SSC: "ssc.nic.in", RRB: "rrbcdg.gov.in", IBPS: "ibps.in",
  SBI: "sbi.co.in", RBI: "rbi.org.in", LIC: "licindia.in", ONGC: "ongcindia.com",
  DRDO: "drdo.gov.in", ISRO: "isro.gov.in", SAIL: "sail.co.in", NTPC: "ntpc.co.in",
  BHEL: "bhel.com", HAL: "hal-india.co.in", BSNL: "bsnl.co.in", IOCL: "iocl.com",
  HPCL: "hindustanpetroleum.com", BPCL: "bharatpetroleum.in", GAIL: "gailonline.com",
  NHPC: "nhpcindia.com", PGCIL: "powergrid.in", NPCIL: "npcil.nic.in", AAI: "aai.aero",
  FCI: "fci.gov.in", RITES: "rites.com", IRCTC: "irctc.co.in", ECIL: "ecil.co.in",
  BEL: "bel-india.in", BARC: "barc.gov.in", NHAI: "nhai.gov.in", NMDC: "nmdc.co.in",
  MECON: "meconlimited.co.in", CBSE: "cbse.gov.in", KVS: "kvsangathan.nic.in",
  NVS: "navodaya.gov.in", POWERGRID: "powergrid.in",
};

function HeaderLogo({ org }: { org?: string | null }) {
  const [failed, setFailed] = useState(false);
  const key = org?.toUpperCase().trim();
  const domain = key ? ORG_DOMAIN_MAP[key] : null;
  if (!domain || failed) {
    return (
      <div className="w-16 h-16 rounded-[20px] bg-white/10 backdrop-blur-xl flex items-center justify-center shrink-0 border border-white/20 shadow-[0_0_30px_rgba(255,255,255,0.1)]">
        <Building2 className="w-7 h-7 text-white/90" />
      </div>
    );
  }
  return (
    <div className="w-16 h-16 rounded-[20px] bg-white shrink-0 border border-white/30 overflow-hidden flex items-center justify-center shadow-[0_0_30px_rgba(255,255,255,0.15)]">
      <img
        src={`https://logo.clearbit.com/${domain}`}
        alt={org || "logo"}
        className="w-full h-full object-contain p-2"
        onError={() => setFailed(true)}
      />
    </div>
  );
}

type ImportantDate = { label?: string | null; date?: string | null };
type VacancyRow = { postName?: string; total?: number | null; category?: string };
type LinkItem = { label?: string; url?: string };

type JobData = {
  title?: string;
  organization?: string;
  brief?: string | null;
  postName?: string | null;
  postDate?: string | null;
  lastDate?: string | null;
  totalVacancy?: number | null;
  importantDates?: ImportantDate[];
  ageLimit?: string | null;
  qualification?: string | null;
  salary?: string | null;
  applicationFee?: string | null;
  selectionProcess?: string | null;
  vacancyDetails?: VacancyRow[] | null;
  importantLinks?: LinkItem[];
  applyLink?: string | null;
  officialLink?: string | null;
  notificationLink?: string | null;
  sourceUrl?: string | null;
  html?: string | null;
  eligibility?: string | null;
  howToApply?: string | null;
  examPattern?: string | null;
};

type Props = {
  open: boolean;
  onClose: () => void;
  data: JobData | null;
  loading?: boolean;
  error?: string | null;
  onApply?: () => void;
  onNotificationClick?: (url: string) => void;
};

function sanitizeHtml(html: string | null) {
  if (!html) return "";
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: ['p', 'br', 'strong', 'b', 'em', 'i', 'u', 'ul', 'ol', 'li', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'table', 'thead', 'tbody', 'tr', 'th', 'td', 'a', 'span', 'div', 'dl', 'dt', 'dd', 'blockquote', 'pre', 'code', 'hr', 'sup', 'sub'],
    ALLOWED_ATTR: ['href', 'target', 'rel', 'colspan', 'rowspan'],
    ALLOW_DATA_ATTR: false,
  });
}

// Days remaining helper
function daysUntil(date?: string | null): number | null {
  if (!date) return null;
  const parsed = new Date(date);
  if (isNaN(parsed.getTime())) return null;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  parsed.setHours(0, 0, 0, 0);
  return Math.round((parsed.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
}

/* ───────── Skeleton Loading ───────── */
function DetailsSkeleton() {
  return (
    <motion.div
      key="skeleton"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-5 py-4"
    >
      {/* Highlight grid skeleton */}
      <div className="grid grid-cols-2 gap-3">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="rounded-[20px] p-4 bg-white/[0.04] border border-white/[0.06] animate-pulse">
            <div className="h-3 w-16 bg-white/10 rounded-full mb-3" />
            <div className="h-5 w-24 bg-white/[0.08] rounded-lg" />
          </div>
        ))}
      </div>
      {/* Section skeletons */}
      {[1, 2, 3].map(i => (
        <div key={`s${i}`} className="space-y-3 animate-pulse">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-white/[0.06]" />
            <div className="h-4 w-32 bg-white/[0.08] rounded-lg" />
          </div>
          <div className="rounded-[20px] bg-white/[0.03] border border-white/[0.06] p-4 space-y-2">
            <div className="h-3 w-full bg-white/[0.06] rounded" />
            <div className="h-3 w-4/5 bg-white/[0.05] rounded" />
            <div className="h-3 w-3/5 bg-white/[0.04] rounded" />
          </div>
        </div>
      ))}
    </motion.div>
  );
}

export default function JobDetailsModal({
  open,
  onClose,
  data,
  loading,
  error,
  onApply,
  onNotificationClick,
}: Props) {
  // Clean all text fields
  const cleanData = data ? {
    ...data,
    title: stripDomains(data.title),
    brief: stripDomains(data.brief),
    organization: stripDomains(data.organization),
    salary: stripDomains(data.salary),
    ageLimit: stripDomains(data.ageLimit),
    qualification: stripDomains(data.qualification),
    eligibility: stripDomains(data.eligibility),
    applicationFee: stripDomains(data.applicationFee),
    selectionProcess: stripDomains(data.selectionProcess),
    howToApply: stripDomains(data.howToApply),
    examPattern: stripDomains(data.examPattern),
  } : null;

  const hasDetails = cleanData && (
    cleanData.totalVacancy ||
    isValidField(cleanData.salary) ||
    isValidField(cleanData.qualification) ||
    isValidField(cleanData.ageLimit) ||
    (cleanData.vacancyDetails && cleanData.vacancyDetails.length > 0) ||
    (cleanData.importantDates && cleanData.importantDates.filter(d => isValidField(d.date)).length > 0)
  );

  const daysLeft = daysUntil(cleanData?.lastDate);

  // Build highlight cards dynamically - only show fields with valid data
  const highlightCards: { icon: React.ReactNode; label: string; value: string; tone: "default" | "primary" | "urgent" | "success" }[] = [];
  if (cleanData?.totalVacancy) {
    highlightCards.push({ icon: <Users className="w-4 h-4" />, label: "Total Vacancies", value: cleanData.totalVacancy.toLocaleString(), tone: "primary" });
  }
  const lastDateStr = cleanData?.lastDate || cleanData?.importantDates?.find(d => isValidField(d.date))?.date;
  if (isValidField(lastDateStr)) {
    highlightCards.push({ icon: <Clock className="w-4 h-4" />, label: "Last Date", value: lastDateStr!, tone: daysLeft !== null && daysLeft <= 7 ? "urgent" : "default" });
  }
  if (isValidField(cleanData?.salary)) {
    highlightCards.push({ icon: <IndianRupee className="w-4 h-4" />, label: "Salary", value: cleanData!.salary!, tone: "success" });
  }
  if (isValidField(cleanData?.ageLimit)) {
    highlightCards.push({ icon: <UserCheck className="w-4 h-4" />, label: "Age Limit", value: cleanData!.ageLimit!, tone: "default" });
  }

  async function handleShare() {
    try {
      const shareData = {
        title: cleanData?.title || "Government Job",
        text: `${cleanData?.title}${cleanData?.organization ? ` — ${cleanData.organization}` : ""}`,
        url: cleanData?.applyLink || cleanData?.officialLink || window.location.href,
      };
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(`${shareData.text}\n${shareData.url}`);
        toast.success("Link copied to clipboard");
      }
    } catch {
      // user cancelled
    }
  }

  return (
    <Sheet open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <SheetContent
        side="bottom"
        className="h-[100dvh] w-full p-0 gap-0 border-0 rounded-none flex flex-col overflow-hidden sm:max-w-2xl sm:mx-auto sm:rounded-t-3xl sm:h-[95dvh]"
      >
        <VisuallyHidden><SheetTitle>Job Details</SheetTitle></VisuallyHidden>
        {/* HERO HEADER */}
        <div className="relative shrink-0 overflow-hidden">
          {/* Gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#0d2847] via-[#0f1b3d] to-[#1a0e2e]" />
          {/* Ambient glow orbs */}
          <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-cyan-500/20 blur-[100px]" />
          <div className="absolute -bottom-20 -left-16 w-56 h-56 rounded-full bg-purple-500/20 blur-[100px]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-full bg-teal-400/10 blur-[80px]" />

          {/* Top bar */}
          <div className="relative flex items-center justify-between px-4 pt-4 pb-1 safe-area-top z-10">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              className="h-10 w-10 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-xl border border-white/10 flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5" />
            </motion.button>
            <div className="flex items-center gap-2">
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={handleShare}
                className="h-10 w-10 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-xl border border-white/10 flex items-center justify-center transition-colors"
              >
                <Share2 className="w-4 h-4" />
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => toast.success("Saved for later")}
                className="h-10 w-10 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-xl border border-white/10 flex items-center justify-center transition-colors"
              >
                <BookmarkPlus className="w-4 h-4" />
              </motion.button>
            </div>
          </div>

          {/* Floating glass card */}
          <div className="relative px-4 pt-3 pb-6 z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-[22px] bg-white/[0.07] backdrop-blur-2xl border border-white/[0.12] p-5 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)]"
            >
              <div className="flex items-start gap-4">
                <HeaderLogo org={data?.organization} />
                <div className="flex-1 min-w-0">
                  {cleanData?.organization && isValidField(cleanData.organization) && (
                    <p className="text-[11px] font-semibold text-cyan-300/80 uppercase tracking-[0.15em] mb-1.5">
                      {cleanData.organization}
                    </p>
                  )}
                  <h1 className="text-[17px] sm:text-lg font-bold leading-snug line-clamp-2 text-white">
                    {cleanData?.title || ""}
                  </h1>
                </div>
              </div>

              {/* Quick chips row */}
              {!loading && cleanData && (
                <TickerStrip
                  salary={cleanData.salary}
                  totalVacancy={cleanData.totalVacancy}
                  daysLeft={daysLeft}
                  qualification={cleanData.qualification}
                />
              )}
            </motion.div>
          </div>
        </div>

        {/* BODY */}
        <ScrollArea className="flex-1 min-h-0 bg-[#0a0e1a]">
          <div className="px-4 py-6 pb-8">
            <AnimatePresence mode="wait">
              {loading && (
                <DetailsSkeleton />
              )}

              {error && (
                <motion.div
                  key="error"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center py-16"
                >
                  <div className="w-16 h-16 mx-auto rounded-full bg-destructive/10 flex items-center justify-center mb-4">
                    <AlertCircle className="w-8 h-8 text-destructive" />
                  </div>
                  <div className="text-base font-semibold mb-2 text-white">Details currently updating</div>
                  <p className="text-sm text-white/50 max-w-xs mx-auto">We're working on fetching the latest information. Please try again shortly.</p>
                </motion.div>
              )}

              {!loading && !error && cleanData && (
                <motion.div
                  key="content"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6 text-white"
                >
                  {/* KEY HIGHLIGHTS GRID */}
                  {highlightCards.length > 0 && (
                    <div className={`grid gap-3 ${highlightCards.length === 1 ? 'grid-cols-1' : 'grid-cols-2'}`}>
                      {highlightCards.map((card, i) => (
                        <HighlightCard key={i} icon={card.icon} label={card.label} value={card.value} tone={card.tone} />
                      ))}
                    </div>
                  )}

                  {/* OVERVIEW */}
                  {isValidField(cleanData.brief) && cleanData.brief!.length > 30 && (
                    <Section title="Overview" icon={<ScrollText className="w-4 h-4" />}>
                      <p className="text-sm text-white/70 leading-relaxed">{cleanData.brief}</p>
                    </Section>
                  )}

                  {/* QUALIFICATION */}
                  {isValidField(cleanData.qualification) && (
                    <Section title="Educational Qualification" icon={<GraduationCap className="w-4 h-4" />}>
                      <div className="rounded-[20px] bg-white/[0.05] backdrop-blur-xl p-4 border border-white/[0.08]">
                        <p className="text-sm text-white/75 leading-relaxed whitespace-pre-line">
                          {cleanData.qualification}
                        </p>
                      </div>
                    </Section>
                  )}

                  {/* ELIGIBILITY */}
                  {isValidField(cleanData.eligibility) && (
                    <Section title="Eligibility Criteria" icon={<UserCheck className="w-4 h-4" />}>
                      <div className="rounded-[20px] bg-white/[0.05] backdrop-blur-xl p-4 border border-white/[0.08]">
                        <p className="text-sm text-white/75 leading-relaxed whitespace-pre-line">
                          {cleanData.eligibility}
                        </p>
                      </div>
                    </Section>
                  )}

                  {/* APPLICATION FEE */}
                  {isValidField(cleanData.applicationFee) && (
                    <Section title="Application Fee" icon={<IndianRupee className="w-4 h-4" />}>
                      <div className="rounded-[20px] bg-gradient-to-br from-amber-500/10 to-orange-500/5 backdrop-blur-xl p-4 border border-amber-400/15">
                        <p className="text-sm text-white/75 leading-relaxed whitespace-pre-line">
                          {cleanData.applicationFee}
                        </p>
                      </div>
                    </Section>
                  )}

                  {/* VACANCY BREAKDOWN */}
                  {cleanData.vacancyDetails && cleanData.vacancyDetails.length > 0 && (
                    <Section title="Vacancy Breakdown" icon={<ListChecks className="w-4 h-4" />}>
                      <div className="rounded-[20px] overflow-hidden border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl">
                        <table className="w-full text-sm">
                          <thead className="bg-white/[0.06]">
                            <tr>
                              <th className="text-left py-3 px-4 font-semibold text-xs uppercase tracking-wider text-white/50">
                                Post Name
                              </th>
                              <th className="text-right py-3 px-4 font-semibold text-xs uppercase tracking-wider text-white/50">
                                Vacancies
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {cleanData.vacancyDetails.slice(0, 30).map((row, i) => (
                              <tr key={i} className="border-t border-white/[0.06]">
                                <td className="py-3 px-4 text-white/80">{row.postName || "—"}</td>
                                <td className="py-3 px-4 text-right font-bold text-cyan-400">
                                  {row.total?.toLocaleString() ?? "—"}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </Section>
                  )}

                  {/* IMPORTANT DATES TIMELINE */}
                  {cleanData.importantDates && cleanData.importantDates.filter(d => isValidField(d.date)).length > 0 && (
                    <Section title="Important Dates" icon={<Calendar className="w-4 h-4" />}>
                      <div className="relative pl-6">
                        <div className="absolute left-[9px] top-3 bottom-3 w-[2px] bg-gradient-to-b from-cyan-400/40 via-purple-400/30 to-transparent rounded-full" />
                        <div className="space-y-4">
                          {cleanData.importantDates.filter(d => isValidField(d.date)).map((d, i) => (
                            <motion.div
                              key={i}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: i * 0.08 }}
                              className="relative"
                            >
                              <div className="absolute -left-[18px] top-3.5 w-3 h-3 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.6)] border-2 border-[#0a0e1a]" />
                              <div className="flex items-center justify-between gap-3 rounded-[16px] bg-white/[0.05] backdrop-blur-xl px-4 py-3 border border-white/[0.08]">
                                <span className="text-sm text-white/70 font-medium">{d.label || "Date"}</span>
                                <span className="text-xs font-bold text-cyan-300 bg-cyan-400/10 px-2.5 py-1 rounded-full border border-cyan-400/20 shrink-0">
                                  {d.date || "—"}
                                </span>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </Section>
                  )}

                  {/* SELECTION PROCESS */}
                  {isValidField(cleanData.selectionProcess) && (
                    <Section title="Selection Process" icon={<CheckCircle2 className="w-4 h-4" />}>
                      <div className="rounded-[20px] bg-gradient-to-br from-emerald-500/10 to-teal-500/5 backdrop-blur-xl p-4 border border-emerald-400/15">
                        <p className="text-sm text-white/75 leading-relaxed whitespace-pre-line">
                          {cleanData.selectionProcess}
                        </p>
                      </div>
                    </Section>
                  )}

                  {/* EXAM PATTERN */}
                  {isValidField(cleanData.examPattern) && (
                    <Section title="Exam Pattern" icon={<Award className="w-4 h-4" />}>
                      <div className="rounded-[20px] bg-gradient-to-br from-blue-500/10 to-indigo-500/5 backdrop-blur-xl p-4 border border-blue-400/15">
                        <p className="text-sm text-white/75 leading-relaxed whitespace-pre-line">
                          {cleanData.examPattern}
                        </p>
                      </div>
                    </Section>
                  )}

                  {/* HOW TO APPLY */}
                  {isValidField(cleanData.howToApply) && (
                    <Section title="How To Apply" icon={<FileText className="w-4 h-4" />}>
                      <div className="rounded-[20px] bg-gradient-to-br from-purple-500/10 to-pink-500/5 backdrop-blur-xl p-4 border border-purple-400/15">
                        <p className="text-sm text-white/75 leading-relaxed whitespace-pre-line">
                          {cleanData.howToApply}
                        </p>
                      </div>
                    </Section>
                  )}

                  {/* FALLBACK HTML */}
                  {!hasDetails && cleanData.html && (
                    <Section title="Full Notification Details" icon={<FileText className="w-4 h-4" />}>
                      <div
                        className="prose prose-sm max-w-none prose-invert text-sm rounded-[20px] bg-white/[0.04] backdrop-blur-xl p-4 border border-white/[0.08] [&_table]:w-full [&_table]:border-collapse [&_td]:border [&_td]:border-white/10 [&_td]:p-2 [&_th]:border [&_th]:border-white/10 [&_th]:p-2 [&_th]:bg-white/[0.05]"
                        dangerouslySetInnerHTML={{ __html: sanitizeHtml(cleanData.html) }}
                      />
                    </Section>
                  )}

                  {/* Disclaimer */}
                  <div className="text-center pt-2 pb-4">
                    <p className="text-[11px] text-white/30">
                      Always verify details from the official notification before applying.
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </ScrollArea>

        {/* STICKY ACTION BAR */}
        <div className="shrink-0 border-t border-white/[0.08] bg-[#0a0e1a]/95 backdrop-blur-2xl px-4 py-3.5 pb-[max(0.875rem,env(safe-area-inset-bottom))]">
          <div className="flex items-center gap-3">
            {cleanData?.notificationLink && (
              <motion.button
                whileTap={{ scale: 0.96 }}
                onClick={() => onNotificationClick?.(cleanData.notificationLink!)}
                className="flex-1 h-[52px] rounded-[16px] font-semibold text-sm text-white/90 border border-white/15 bg-white/[0.06] backdrop-blur-xl flex items-center justify-center gap-2 hover:bg-white/[0.1] transition-colors"
              >
                <FileText className="w-4 h-4" />
                Notification
              </motion.button>
            )}
            <motion.button
              whileTap={{ scale: 0.96 }}
              onClick={onApply}
              disabled={loading}
              className="flex-[2] h-[52px] rounded-[16px] font-bold text-sm text-white bg-gradient-to-r from-cyan-500 to-blue-600 shadow-[0_8px_30px_-6px_rgba(6,182,212,0.5)] flex items-center justify-center gap-2 hover:shadow-[0_8px_40px_-4px_rgba(6,182,212,0.6)] transition-shadow disabled:opacity-50"
            >
              <ExternalLink className="w-4 h-4" />
              Apply Now
            </motion.button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

// HIGHLIGHT CARD
function HighlightCard({
  icon,
  label,
  value,
  tone = "default",
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  tone?: "default" | "primary" | "urgent" | "success";
}) {
  const toneStyles = {
    default: "bg-white/[0.05] border-white/[0.08]",
    primary: "bg-gradient-to-br from-cyan-500/15 to-blue-500/5 border-cyan-400/20",
    urgent: "bg-gradient-to-br from-red-500/15 to-orange-500/5 border-red-400/20",
    success: "bg-gradient-to-br from-emerald-500/15 to-teal-500/5 border-emerald-400/20",
  } as const;

  const iconColor = {
    default: "text-white/50",
    primary: "text-cyan-400",
    urgent: "text-red-500",
    success: "text-emerald-400",
  } as const;

  return (
    <motion.div
      whileTap={{ scale: 0.97 }}
      className={`rounded-[20px] p-4 border backdrop-blur-xl ${toneStyles[tone]}`}
    >
      <div className={`flex items-center gap-1.5 text-[10px] font-semibold mb-2 ${iconColor[tone]}`}>
        {icon}
        <span className="uppercase tracking-widest">{label}</span>
      </div>
      <div className="font-bold text-[15px] text-white leading-tight line-clamp-2">
        {value}
      </div>
    </motion.div>
  );
}

// SECTION
function Section({
  title,
  icon,
  children,
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <h4 className="font-bold text-sm mb-3.5 flex items-center gap-2.5 text-white/90">
        <span className="w-8 h-8 rounded-xl bg-cyan-400/10 text-cyan-400 flex items-center justify-center">
          {icon}
        </span>
        {title}
      </h4>
      {children}
    </motion.div>
  );
}
