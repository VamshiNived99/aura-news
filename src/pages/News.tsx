import { useState, useEffect, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { ReelsView } from "@/components/ReelsView";
import { supabase } from "@/integrations/supabase/client";
import { getCachedNews, setCachedNews } from "@/lib/newsCache";
import { LocationPickerSheet } from "@/components/LocationPickerSheet";
import { INDIAN_STATES, findStateByName, findStateForDistrict } from "@/data/indianDistricts";
import { Loader2, User, Globe2, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface NewsArticle {
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  source: { name: string };
  category: string;
  language?: string;
}

type Scope = "state" | "district";

const LANGUAGE_OPTIONS: { code: string; label: string; native: string }[] = [
  { code: "hi", label: "Hindi", native: "हिन्दी" },
  { code: "en", label: "English", native: "English" },
  { code: "te", label: "Telugu", native: "తెలుగు" },
  { code: "ta", label: "Tamil", native: "தமிழ்" },
  { code: "kn", label: "Kannada", native: "ಕನ್ನಡ" },
  { code: "ml", label: "Malayalam", native: "മലയാളം" },
  { code: "mr", label: "Marathi", native: "मराठी" },
  { code: "bn", label: "Bengali", native: "বাংলা" },
  { code: "gu", label: "Gujarati", native: "ગુજરાતી" },
];

// When a user picks a language that doesn't match their detected state's
// native language, we route the feed to a region where that language is
// actually native. This produces real regional news in the chosen language
// instead of translated content from an unrelated state.
const LANGUAGE_NATIVE_REGIONS: Record<string, { state: string; cities: string[] }> = {
  te: { state: "Telangana", cities: ["Hyderabad", "Warangal", "Vijayawada", "Visakhapatnam"] },
  ta: { state: "Tamil Nadu", cities: ["Chennai", "Coimbatore", "Madurai"] },
  kn: { state: "Karnataka", cities: ["Bengaluru", "Mysuru", "Mangaluru"] },
  ml: { state: "Kerala", cities: ["Thiruvananthapuram", "Kochi", "Kozhikode"] },
  mr: { state: "Maharashtra", cities: ["Mumbai", "Pune", "Nagpur"] },
  bn: { state: "West Bengal", cities: ["Kolkata", "Howrah", "Siliguri"] },
  gu: { state: "Gujarat", cities: ["Ahmedabad", "Surat", "Vadodara"] },
  pa: { state: "Punjab", cities: ["Ludhiana", "Amritsar", "Jalandhar"] },
  hi: { state: "", cities: [] }, // Hindi belt — keep national/Hindi feed
  en: { state: "", cities: [] },
};

// Nearby-district clusters — when hyperlocal feed runs dry, broaden to
// neighboring districts so the local reel never goes empty.
const DISTRICT_CLUSTERS: Record<string, string[]> = {
  // Telangana
  "sangareddy": ["Hyderabad", "Medak", "Siddipet", "Rangareddy"],
  "medak": ["Sangareddy", "Siddipet", "Hyderabad"],
  "siddipet": ["Medak", "Karimnagar", "Hyderabad"],
  "rangareddy": ["Hyderabad", "Sangareddy", "Mahbubnagar"],
  "hyderabad": ["Rangareddy", "Medak", "Sangareddy", "Secunderabad"],
  "warangal": ["Hanamkonda", "Karimnagar", "Khammam"],
  "karimnagar": ["Peddapalli", "Warangal", "Siddipet"],
  "khammam": ["Warangal", "Suryapet", "Nalgonda"],
  "nalgonda": ["Suryapet", "Khammam", "Hyderabad"],
  "nizamabad": ["Karimnagar", "Adilabad", "Medak"],
  // Andhra Pradesh
  "visakhapatnam": ["Vizianagaram", "Srikakulam", "Kakinada"],
  "vijayawada": ["Guntur", "Eluru", "Krishna"],
  "guntur": ["Vijayawada", "Ongole", "Prakasam"],
  "tirupati": ["Chittoor", "Nellore", "Kadapa"],
  // Tamil Nadu
  "chennai": ["Kanchipuram", "Tiruvallur", "Chengalpattu"],
  "coimbatore": ["Tiruppur", "Erode", "Salem"],
  "madurai": ["Dindigul", "Theni", "Sivagangai"],
  // Karnataka
  "bengaluru": ["Bangalore Rural", "Tumkur", "Ramanagara", "Mysuru"],
  "mysuru": ["Mandya", "Chamarajanagar", "Bengaluru"],
  "mangaluru": ["Udupi", "Kasaragod"],
  // Kerala
  "thiruvananthapuram": ["Kollam", "Pathanamthitta"],
  "kochi": ["Ernakulam", "Alappuzha", "Thrissur"],
  "kozhikode": ["Malappuram", "Wayanad", "Kannur"],
  // Maharashtra
  "mumbai": ["Thane", "Navi Mumbai", "Palghar", "Raigad"],
  "pune": ["Pimpri-Chinchwad", "Satara", "Ahmednagar"],
  "nagpur": ["Wardha", "Bhandara", "Chandrapur"],
  // West Bengal
  "kolkata": ["Howrah", "North 24 Parganas", "South 24 Parganas"],
  // Gujarat
  "ahmedabad": ["Gandhinagar", "Kheda", "Mehsana"],
  "surat": ["Navsari", "Bharuch", "Tapi"],
  // Delhi NCR
  "new delhi": ["Gurugram", "Noida", "Ghaziabad", "Faridabad"],
  "gurugram": ["New Delhi", "Faridabad", "Noida"],
  "noida": ["New Delhi", "Ghaziabad", "Gurugram"],
};

function nearbyDistricts(state: string, district: string): string[] {
  const key = (district || "").toLowerCase().trim();
  if (DISTRICT_CLUSTERS[key]) return DISTRICT_CLUSTERS[key];
  // Generic fallback: pick other major districts from the same state.
  const info = findStateByName(state);
  if (!info) return [];
  return info.districts.filter(d => d.toLowerCase() !== key).slice(0, 4);
}

// State → default reading language (mirrors INDIAN_STATES `language` field
// but we keep this small map for fast city lookups).
const CITY_LANGUAGE_MAP: Record<string, string> = {
  hyderabad: "te", warangal: "te", vijayawada: "te", visakhapatnam: "te", tirupati: "te", guntur: "te",
  bengaluru: "kn", bangalore: "kn", mysuru: "kn", mangaluru: "kn", hubli: "kn",
  chennai: "ta", coimbatore: "ta", madurai: "ta", salem: "ta",
  kochi: "ml", thiruvananthapuram: "ml", kozhikode: "ml",
  mumbai: "mr", pune: "mr", nagpur: "mr", nashik: "mr",
  kolkata: "bn", howrah: "bn",
  ahmedabad: "gu", surat: "gu", vadodara: "gu", rajkot: "gu",
  delhi: "hi", "new delhi": "hi", noida: "hi", gurugram: "hi",
  lucknow: "hi", kanpur: "hi", jaipur: "hi", bhopal: "hi", indore: "hi", patna: "hi",
};

function languageFromAddress(state: string, city: string, district: string): string {
  const stateInfo = findStateByName(state);
  if (stateInfo) return stateInfo.language;
  const districtInfo = findStateForDistrict(district || city);
  if (districtInfo) return districtInfo.language;
  const cityKey = (city || "").toLowerCase();
  if (CITY_LANGUAGE_MAP[cityKey]) return CITY_LANGUAGE_MAP[cityKey];
  return "hi";
}

// Detect the user's native language for their detected state.
function nativeLanguageForState(state: string): string {
  const info = findStateByName(state);
  return info?.language || "hi";
}

// Build a Google-News-friendly query for the chosen scope.
function buildQuery(scope: Scope, state: string, district: string, city: string, cycle = 0): string {
  const place = district || city;
  if (scope === "district") {
    if (!place) return state || "";
    // Hyperlocal: rotate keyword sets so each page surfaces a different
    // slice of district life instead of repeating the same query.
    const SETS = [
      `(news OR latest OR update OR breaking OR today OR live)`,
      `(traffic OR weather OR rain OR flood OR "power cut" OR metro OR roads)`,
      `(crime OR accident OR police OR fire OR rescue OR court)`,
      `(jobs OR recruitment OR education OR school OR college OR exam OR admission)`,
      `(politics OR municipal OR corporation OR mayor OR collector OR development)`,
      `(festival OR event OR temple OR market OR culture OR sports)`,
    ];
    return `"${place}" ${SETS[((cycle % SETS.length) + SETS.length) % SETS.length]}`;
  }
  // State scope: statewide updates, politics, weather.
  if (!state) return place || "";
  const STATE_SETS = [
    `(news OR latest OR update OR today)`,
    `(politics OR government OR minister OR assembly)`,
    `(weather OR rain OR economy OR business OR jobs)`,
    `(crime OR accident OR police OR court)`,
    `(festival OR culture OR sports OR education)`,
  ];
  return `${state} ${STATE_SETS[((cycle % STATE_SETS.length) + STATE_SETS.length) % STATE_SETS.length]}`;
}

// Build the query at the current fallback level. Returns the query string.
// Levels:
//   0 = hyperlocal district
//   1 = nearby-district cluster (combined OR)
//   2 = state-wide
//   3 = trending state ("<State> latest news")
//   4 = regional language trending (no place — language top stories)
//   5 = national language top headlines (empty query)
function buildFallbackQuery(
  level: number,
  scope: Scope,
  state: string,
  district: string,
  city: string,
  cycle = 0,
): string {
  const place = district || city;
  // DISTRICT ladder — stay hyperlocal as long as possible, only fall back
  // to state-wide if local results truly run out.
  if (scope === "district" && place) {
    if (level <= 0) return buildQuery("district", state, district, city, cycle);
    if (level === 1) {
      // District + nearby towns/mandals combined (still hyperlocal).
      const cluster = nearbyDistricts(state, place);
      const places = [place, ...cluster].filter(Boolean).slice(0, 5);
      return `(${places.map(p => `"${p}"`).join(" OR ")}) (news OR local OR latest)`;
    }
    if (level === 2) {
      // Nearby cluster only (without main district, to surface different items).
      const cluster = nearbyDistricts(state, place).slice(0, 4);
      if (cluster.length) {
        return `(${cluster.map(p => `"${p}"`).join(" OR ")}) (news OR local)`;
      }
      return buildQuery("state", state, "", "", cycle);
    }
    if (level === 3) return buildQuery("state", state, "", "", cycle);
    if (level === 4) return `${state || "India"} regional news`;
    return ""; // national language top
  }
  // STATE ladder — statewide angles, never drilling down into one district.
  if (level <= 0) return buildQuery("state", state, "", "", cycle);
  if (level === 1) return `${state || "India"} ${cycle % 2 ? "politics OR government" : "news OR latest"}`;
  if (level === 2) return `${state || "India"} (economy OR weather OR business OR sports)`;
  if (level === 3) return `${state || "India"} latest news`;
  if (level === 4) return `India trending news`;
  return "";
}

const News = () => {
  const navigate = useNavigate();

  // Location state
  const [userState, setUserState] = useState<string>("");
  const [userDistrict, setUserDistrict] = useState<string>("");
  const [userCity, setUserCity] = useState<string>("");
  const [language, setLanguage] = useState<string>("hi");
  const [detecting, setDetecting] = useState<boolean>(true);
  const [pickerOpen, setPickerOpen] = useState<boolean>(false);

  // Scope tabs — default to district on first visit when we know one,
  // so users land directly on hyperlocal news.
  const [scope, setScope] = useState<Scope>("state");

  // Feed state
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [nextPageToken, setNextPageToken] = useState<string>("");
  const [seenUrls, setSeenUrls] = useState<Set<string>>(new Set());
  // Tracks how far we've fallen back when the primary feed runs dry,
  // so the user keeps scrolling forever (district → state → trending).
  const [fallbackLevel, setFallbackLevel] = useState<number>(0);
  // Cycle counter — bumped every time we exhaust the full fallback ladder,
  // so the feed loops back to district level with a fresh keyword set
  // (infinite scroll without dead-ends).
  const [cycleCount, setCycleCount] = useState<number>(0);

  const stateLabel = userState || "India";
  const districtLabel = userDistrict || userCity || "District";
  const currentLang = LANGUAGE_OPTIONS.find(l => l.code === language) || LANGUAGE_OPTIONS[0];

  // ---------- Load saved location ----------
  const loadSavedLocation = useCallback((): boolean => {
    const s = localStorage.getItem("aura_user_state") || "";
    const d = localStorage.getItem("aura_user_district") || "";
    const c = localStorage.getItem("aura_user_city") || "";
    const l = localStorage.getItem("aura_local_language") || "";
    if (s || d || c) {
      setUserState(s); setUserDistrict(d); setUserCity(c);
      setLanguage(l || languageFromAddress(s, c, d));
      return true;
    }
    return false;
  }, []);

  // ---------- Auto-detect via geolocation (accurate district mapping) ----------
  const reverseGeocode = async (lat: number, lon: number) => {
    // zoom=12 gives city/town/suburb level; we then fall back through fields
    // for the most accurate district.
    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&accept-language=en&zoom=12&addressdetails=1`,
      { headers: { "User-Agent": "AuraApp/1.0" } }
    );
    return res.json();
  };

  const applyDetected = (data: any, opts: { silent?: boolean } = {}) => {
    const addr = data?.address || {};
    const state = String(addr.state || addr.state_district || "");
    let district = String(
      addr.state_district || addr.county || addr.city_district || addr.suburb || ""
    ).replace(/\s+district$/i, "").trim();
    const city = String(
      addr.city || addr.town || addr.village || addr.municipality || addr.suburb || ""
    ).trim();
    // If district missing, try to map city → known district in our dataset
    if (!district && city) {
      const stateInfo = findStateByName(state);
      if (stateInfo) {
        const match = stateInfo.districts.find(
          d => d.toLowerCase() === city.toLowerCase() || city.toLowerCase().includes(d.toLowerCase())
        );
        if (match) district = match;
      }
    }
    const lang = languageFromAddress(state, city, district);
    if (state) { setUserState(state); localStorage.setItem("aura_user_state", state); }
    if (district) { setUserDistrict(district); localStorage.setItem("aura_user_district", district); }
    if (city) { setUserCity(city); localStorage.setItem("aura_user_city", city); }
    if (!opts.silent || !localStorage.getItem("aura_local_language")) {
      setLanguage(lang);
      localStorage.setItem("aura_local_language", lang);
    }
    localStorage.setItem("aura_location_ts", String(Date.now()));
  };

  const detectLocation = useCallback((force = false) => {
    const hadSaved = loadSavedLocation();
    if (!force && hadSaved) {
      setDetecting(false);
      // Background refresh if stale (>3h)
      const ts = Number(localStorage.getItem("aura_location_ts") || 0);
      if (Date.now() - ts > 3 * 60 * 60 * 1000 && navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (pos) => {
            try {
              const data = await reverseGeocode(pos.coords.latitude, pos.coords.longitude);
              applyDetected(data, { silent: true });
            } catch {}
          },
          () => {},
          { enableHighAccuracy: false, timeout: 8000, maximumAge: 3 * 60 * 60 * 1000 }
        );
      }
      return;
    }
    setDetecting(true);
    if (!navigator.geolocation) { setDetecting(false); return; }
    let attempts = 0;
    const tryDetect = () => {
      attempts++;
      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          try {
            const data = await reverseGeocode(pos.coords.latitude, pos.coords.longitude);
            applyDetected(data);
          } catch (e) {
            console.error("[News] reverse geocode failed", e);
          } finally {
            setDetecting(false);
          }
        },
        (err) => {
          console.warn("[News] geolocation attempt failed:", err.message);
          if (attempts < 2) { setTimeout(tryDetect, 1500); return; }
          // Final fallback: keep saved or default
          setDetecting(false);
        },
        { enableHighAccuracy: attempts === 1, timeout: 9000, maximumAge: 600000 }
      );
    };
    tryDetect();
  }, [loadSavedLocation]);

  useEffect(() => { detectLocation(false); /* eslint-disable-next-line */ }, []);

  // Auto-switch to district scope the first time we know the user's district.
  useEffect(() => {
    if (!(userDistrict || userCity)) return;
    const seen = localStorage.getItem("aura_scope_initialized");
    if (seen) return;
    setScope("district");
    localStorage.setItem("aura_scope_initialized", "1");
  }, [userDistrict, userCity]);

  // ---------- Cache key ----------
  const cacheKey = useMemo(() => {
    return `local_${scope}_${language}_${(userState || "x").toLowerCase()}_${(userDistrict || userCity || "x").toLowerCase()}`;
  }, [scope, language, userState, userDistrict, userCity]);

  // Cross-scope dedup keys — articles surfaced in the State feed are
  // remembered so the District feed never repeats them (and vice versa).
  // Scoped to the user's region so different locations stay independent.
  const crossScopeKey = useMemo(() => {
    const loc = (userState || "x").toLowerCase() + "_" + (userDistrict || userCity || "x").toLowerCase();
    return { state: `xseen_state_${loc}`, district: `xseen_district_${loc}` };
  }, [userState, userDistrict, userCity]);

  const loadXSeen = (k: string): Set<string> => {
    try {
      const raw = sessionStorage.getItem(k);
      if (!raw) return new Set();
      return new Set(JSON.parse(raw));
    } catch { return new Set(); }
  };
  const saveXSeen = (k: string, set: Set<string>) => {
    try {
      // Cap at 300 to keep storage small.
      const arr = Array.from(set).slice(-300);
      sessionStorage.setItem(k, JSON.stringify(arr));
    } catch {}
  };

  // ---------- Fetch feed ----------
  const fetchFeed = useCallback(async (isInitial: boolean, pageToken = "") => {
    if (isInitial) setLoading(true); else setLoadingMore(true);
    try {
      // SMART LANGUAGE + REGION ROUTING:
      // If the user picked a language that isn't native to their detected
      // state, swap the query's location to a state where that language IS
      // native. e.g. Telangana user picks Marathi → fetch Maharashtra news.
      const nativeLangHere = nativeLanguageForState(userState);
      const useNativeRegion =
        language !== "en" &&
        language !== "hi" &&
        language !== nativeLangHere &&
        !!LANGUAGE_NATIVE_REGIONS[language]?.state;
      const effState = useNativeRegion ? LANGUAGE_NATIVE_REGIONS[language].state : userState;
      const effCity = useNativeRegion ? (LANGUAGE_NATIVE_REGIONS[language].cities[0] || "") : userCity;
      const effDistrict = useNativeRegion ? "" : userDistrict;

      // Progressive fallback: district → nearby cluster → state →
      // trending state → regional language → national language top.
      const baseScope: Scope = useNativeRegion ? "state" : scope;
      const query = buildFallbackQuery(fallbackLevel, baseScope, effState, effDistrict, effCity, cycleCount);
      // Freshness: strict 24h for the first 2 fallback levels, soften to 48h
      // for nearby/state, then 72h only at the deepest national fallback.
      const maxAgeHours = fallbackLevel <= 1 ? 24 : fallbackLevel <= 3 ? 48 : 72;
      const { data, error } = await supabase.functions.invoke("fetch-news", {
        body: { language, nextPage: pageToken, query, maxAgeHours },
      });
      if (error) throw error;
      const incoming: NewsArticle[] = data?.articles || [];
      // Cross-scope dedup: when on District, drop anything already seen in
      // State, and vice versa — this is what makes the two feeds feel
      // genuinely different.
      const otherKey = scope === "district" ? crossScopeKey.state : crossScopeKey.district;
      const ownKey   = scope === "district" ? crossScopeKey.district : crossScopeKey.state;
      const otherSeen = loadXSeen(otherKey);

      // STRICT district relevance filter — at hyperlocal levels (0,1) the
      // article MUST mention the district or a nearby town/mandal in its
      // title or description. Google News / news APIs match anywhere in
      // the body, so without this filter a "Sangareddy" query can return
      // generic Telangana stories that merely list the district in
      // passing. This is what was making the two tabs feel identical.
      const districtPlace = (effDistrict || effCity || "").trim();
      const isHyperlocal =
        baseScope === "district" && !!districtPlace && fallbackLevel <= 1;
      const relevanceTerms: string[] = [];
      if (isHyperlocal) {
        relevanceTerms.push(districtPlace);
        const nb = nearbyDistricts(effState, districtPlace);
        nb.slice(0, 4).forEach(n => relevanceTerms.push(n));
      }
      const mentionsPlace = (a: NewsArticle) => {
        if (!isHyperlocal) return true;
        const hay = `${a.title || ""} ${a.description || ""} ${(a as any).summary || ""}`.toLowerCase();
        return relevanceTerms.some(t => t && hay.includes(t.toLowerCase()));
      };

      // STATE-scope filter — must be genuinely statewide. Require the state
      // name OR the state capital / a major-city marker in the headline or
      // lead. We deliberately DON'T accept just any district mention, because
      // that would let pure hyperlocal stories (e.g. one Sangareddy item)
      // bleed into the State feed and make it feel identical to District.
      const isStateLevel = baseScope === "state" && !!effState && fallbackLevel <= 2;
      const stateInfo = findStateByName(effState);
      // First listed district is treated as the state's primary metro.
      const stateMetros = stateInfo ? stateInfo.districts.slice(0, 3) : [];
      const stateGovTerms = [
        effState,
        `${effState} govt`,
        `${effState} government`,
        ...stateMetros,
        ...(stateInfo ? [`${stateInfo.language} news`] : []),
      ].filter(Boolean);
      const mentionsState = (a: NewsArticle) => {
        if (!isStateLevel) return true;
        const title = (a.title || "").toLowerCase();
        const desc  = (a.description || "").toLowerCase();
        const lead  = desc.slice(0, 220);
        // Strong signal: state name in title or lead.
        if (title.includes(effState.toLowerCase())) return true;
        if (lead.includes(effState.toLowerCase())) return true;
        // Or a major metro mentioned in the title (statewide significance).
        if (stateMetros.some(m => title.includes(m.toLowerCase()))) return true;
        // Otherwise reject — keeps state feed truly statewide.
        return stateGovTerms.some(t => title.includes(t.toLowerCase()));
      };

      // RANKING — articles mentioning the target place in the TITLE rank
      // first, then lead, then body. This is the cheap "AI-curated" feel:
      // the user immediately sees the most location-relevant item.
      const rankTerm = baseScope === "district"
        ? (districtPlace || "").toLowerCase()
        : (effState || "").toLowerCase();
      const rankNearby = baseScope === "district"
        ? nearbyDistricts(effState, districtPlace).slice(0, 4).map(s => s.toLowerCase())
        : stateMetros.map(s => s.toLowerCase());
      const scoreArticle = (a: NewsArticle): number => {
        const title = (a.title || "").toLowerCase();
        const desc  = (a.description || "").toLowerCase();
        let s = 0;
        if (rankTerm && title.includes(rankTerm)) s += 100;
        if (rankTerm && desc.slice(0, 220).includes(rankTerm)) s += 40;
        if (rankTerm && desc.includes(rankTerm)) s += 15;
        for (const n of rankNearby) {
          if (!n) continue;
          if (title.includes(n)) s += 25;
          else if (desc.includes(n)) s += 8;
        }
        // Freshness micro-boost (hours-old, max +20).
        const ageH = Math.max(0, (Date.now() - new Date(a.publishedAt).getTime()) / 3600_000);
        s += Math.max(0, 20 - Math.min(20, ageH));
        return s;
      };

      const fresh = incoming.filter(
        a =>
          !seenUrls.has(a.url) &&
          !otherSeen.has(a.url) &&
          mentionsPlace(a) &&
          mentionsState(a),
      ).sort((a, b) => scoreArticle(b) - scoreArticle(a));
      if (fresh.length > 0) {
        const nextSeen = new Set(seenUrls);
        fresh.forEach(a => nextSeen.add(a.url));
        setSeenUrls(nextSeen);
        // Record into this scope's cross-scope set.
        const ownSeen = loadXSeen(ownKey);
        fresh.forEach(a => ownSeen.add(a.url));
        saveXSeen(ownKey, ownSeen);
        if (isInitial) {
          setArticles(fresh);
          setCachedNews(cacheKey, fresh, data?.nextPage || "");
        } else {
          setArticles(prev => {
            const merged = [...prev, ...fresh];
            setCachedNews(cacheKey, merged, data?.nextPage || "");
            return merged;
          });
        }
        if (data?.nextPage) {
          setNextPageToken(data.nextPage);
          setHasMore(true);
        } else {
          setNextPageToken("");
          // Loop forever: after the deepest level, reset to district with a
          // new cycle so user keeps getting fresh hyperlocal news.
          if (fallbackLevel >= 5) {
            setFallbackLevel(0);
            setCycleCount((c) => c + 1);
          } else {
            setFallbackLevel((l) => l + 1);
          }
          setHasMore(true);
        }
      } else {
        // Nothing new at this level — escalate, or loop back at the top.
        if (fallbackLevel >= 5) {
          setFallbackLevel(0);
          setCycleCount((c) => c + 1);
          setNextPageToken("");
          setHasMore(true);
        } else {
          setFallbackLevel((l) => l + 1);
          setNextPageToken("");
          setHasMore(true);
        }
      }
    } catch (e) {
      console.error("[News] fetch error", e);
      // Network/error — escalate or loop back so we keep trying.
      if (fallbackLevel >= 5) {
        setFallbackLevel(0);
        setCycleCount((c) => c + 1);
      } else {
        setFallbackLevel((l) => l + 1);
      }
      setHasMore(true);
    } finally {
      setLoading(false); setLoadingMore(false);
    }
  }, [scope, language, userState, userDistrict, userCity, seenUrls, cacheKey, fallbackLevel, cycleCount, crossScopeKey]);

  // ---------- Refetch on scope/location/language change ----------
  useEffect(() => {
    if (detecting) return;
    // Try cache first for instant paint
    const cached = getCachedNews(cacheKey);
    if (cached && cached.articles.length > 0) {
      setArticles(cached.articles);
      setNextPageToken(cached.nextPageToken);
      setSeenUrls(new Set(cached.articles.map(a => a.url)));
      setHasMore(!!cached.nextPageToken);
      setLoading(false);
      return;
    }
    setArticles([]); setNextPageToken(""); setSeenUrls(new Set()); setHasMore(true); setFallbackLevel(0); setCycleCount(0);
    fetchFeed(true, "");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scope, language, userState, userDistrict, userCity, detecting]);

  const loadMore = useCallback(() => {
    if (!loadingMore && hasMore && nextPageToken) fetchFeed(false, nextPageToken);
  }, [loadingMore, hasMore, nextPageToken, fetchFeed]);

  // ---------- Manual location change ----------
  const handlePick = (state: string, district: string, lang: string) => {
    setUserState(state); localStorage.setItem("aura_user_state", state);
    setUserDistrict(district); localStorage.setItem("aura_user_district", district);
    if (district) {
      setUserCity(district); localStorage.setItem("aura_user_city", district);
    }
    setLanguage(lang); localStorage.setItem("aura_local_language", lang);
    setScope(district ? "district" : "state");
    setPickerOpen(false);
  };

  const handleUseMyLocation = () => {
    setPickerOpen(false);
    localStorage.removeItem("aura_user_state");
    localStorage.removeItem("aura_user_district");
    localStorage.removeItem("aura_user_city");
    localStorage.removeItem("aura_local_language");
    detectLocation(true);
    setScope("district");
  };

  const handleLanguageChange = (code: string) => {
    setLanguage(code);
    localStorage.setItem("aura_local_language", code);
  };

  // Auto-escalate: whenever fallbackLevel changes (after an empty/exhausted
  // batch), fetch the next broader batch. Fires for both initial-empty and
  // mid-scroll exhaustion so the user NEVER sees a dead-end.
  useEffect(() => {
    if (detecting) return;
    if (fallbackLevel === 0 && cycleCount === 0) return;
    if (loadingMore || loading) return;
    if (!hasMore) return;
    const isInitial = articles.length === 0;
    fetchFeed(isInitial, "");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fallbackLevel, cycleCount]);

  return (
    <div className="min-h-[100dvh] w-full bg-black relative">
      {/* Cinematic top fade */}
      <div className="fixed top-0 left-0 right-0 h-28 z-[50] pointer-events-none bg-gradient-to-b from-black/70 via-black/25 to-transparent" />

      {/* Floating cinematic header — mirrors Home's India|World pattern */}
      <header className="fixed top-0 left-0 right-0 z-[55] pointer-events-none">
        <div
          className="relative flex items-center justify-between gap-2 px-3 pb-2"
          style={{ paddingTop: "max(env(safe-area-inset-top, 8px), 10px)" }}
        >
          {/* TOP-LEFT — language switcher (compact glass) */}
          <div className="pointer-events-auto">
            <Popover>
              <PopoverTrigger asChild>
                <motion.button
                  whileTap={{ scale: 0.92 }}
                  className="flex items-center gap-1.5 h-8 pl-2 pr-2.5 rounded-full bg-white/[0.08] backdrop-blur-xl border border-white/[0.12] text-white shadow-[0_4px_14px_rgba(0,0,0,0.35),0_0_10px_-4px_hsl(var(--primary)/0.45)]"
                  aria-label="Change language"
                >
                  <Globe2 className="w-[13px] h-[13px] text-primary" />
                  <span className="text-[11.5px] font-semibold tracking-tight">{currentLang.native}</span>
                </motion.button>
              </PopoverTrigger>
              <PopoverContent
                align="start"
                side="bottom"
                sideOffset={8}
                className="w-48 p-1 bg-black/85 backdrop-blur-2xl border-white/10 text-white rounded-2xl shadow-2xl"
              >
                <div className="max-h-72 overflow-y-auto">
                  {LANGUAGE_OPTIONS.map(l => (
                    <button
                      key={l.code}
                      onClick={() => handleLanguageChange(l.code)}
                      className="w-full flex items-center justify-between px-2.5 py-2 rounded-xl text-[12px] hover:bg-white/10 transition-colors"
                    >
                      <span className="flex flex-col items-start leading-tight">
                        <span className="font-semibold">{l.native}</span>
                        <span className="text-[10px] text-white/45">{l.label}</span>
                      </span>
                      {l.code === language && <Check className="w-3.5 h-3.5 text-primary" />}
                    </button>
                  ))}
                </div>
              </PopoverContent>
            </Popover>
          </div>

          {/* CENTER — segmented State | District (matches Home India|World) */}
          <div
            className="pointer-events-auto absolute left-1/2 -translate-x-1/2 max-w-[calc(100vw-140px)]"
            style={{ top: "max(env(safe-area-inset-top, 8px), 10px)" }}
          >
            <div className="relative flex bg-white/[0.08] backdrop-blur-xl rounded-full p-0.5 border border-white/[0.1] shadow-lg overflow-hidden">
              {(["state", "district"] as const).map((s) => {
                const active = scope === s;
                const label =
                  s === "state"
                    ? (detecting && !userState ? "Locating…" : stateLabel)
                    : (detecting && !userDistrict && !userCity ? "…" : districtLabel);
                return (
                  <button
                    key={s}
                    onClick={() => {
                      if (s === "district" && !userDistrict && !userCity) {
                        setPickerOpen(true);
                        return;
                      }
                      setScope(s);
                    }}
                    onDoubleClick={() => setPickerOpen(true)}
                    className={`relative px-3 py-1.5 rounded-full text-[11px] font-semibold tracking-tight transition-colors duration-200 max-w-[96px] truncate ${
                      active ? "text-white" : "text-white/55 hover:text-white/80"
                    }`}
                  >
                    {active && (
                      <motion.span
                        layoutId="local-scope-pill"
                        className="absolute inset-0 rounded-full bg-white/20 shadow-[0_0_14px_-2px_hsl(var(--primary)/0.55)] ring-1 ring-primary/25"
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      />
                    )}
                    <span className="relative">{label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* TOP-RIGHT — profile */}
          <button
            onClick={() => navigate("/profile")}
            className="pointer-events-auto w-8 h-8 rounded-full bg-white/[0.08] backdrop-blur-xl border border-white/[0.12] flex items-center justify-center text-white/85 shadow-lg active:scale-90 transition-transform"
            aria-label="Profile"
          >
            {detecting
              ? <Loader2 className="w-[14px] h-[14px] animate-spin text-white/70" />
              : <User className="w-[15px] h-[15px]" />}
          </button>
        </div>
      </header>

      {/* Context badge — reinforces feed identity (Statewide / District / Nearby) */}
      <div
        className="fixed left-1/2 -translate-x-1/2 z-[54] pointer-events-none"
        style={{ top: "calc(max(env(safe-area-inset-top, 8px), 10px) + 44px)" }}
      >
        <div className="px-2.5 py-[3px] rounded-full bg-black/40 backdrop-blur-md border border-white/[0.08] text-[9.5px] font-semibold tracking-[0.08em] uppercase text-white/75">
          {scope === "district"
            ? (fallbackLevel >= 3 ? "Around You" : fallbackLevel >= 1 ? "Nearby" : "Hyperlocal")
            : (fallbackLevel >= 3 ? "National" : "Statewide")}
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={cacheKey}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="w-full h-full"
        >
          <ReelsView
            articles={articles}
            loading={loading || loadingMore}
            onLoadMore={loadMore}
            hasMore={hasMore}
            language={language}
            fullHeight={true}
            onArticleView={() => {}}
            variant="local"
            locationLabel={scope === "district" ? districtLabel : stateLabel}
          />
        </motion.div>
      </AnimatePresence>

      {/* Silent loader while we escalate fallbacks — never dead-end. */}
      {articles.length === 0 && !detecting && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none px-6">
          <div className="flex flex-col items-center gap-3">
            <Loader2 className="w-6 h-6 text-primary animate-spin" />
            <p className="text-[12px] text-white/60 tracking-tight">Finding nearby updates…</p>
          </div>
        </div>
      )}

      <LocationPickerSheet
        open={pickerOpen}
        onOpenChange={setPickerOpen}
        selectedState={userState}
        selectedDistrict={userDistrict}
        onPick={handlePick}
        onUseMyLocation={handleUseMyLocation}
      />
    </div>
  );
};

export default News;