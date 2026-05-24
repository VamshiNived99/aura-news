import { useMemo, useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { INDIAN_STATES } from "@/data/indianDistricts";
import { Search, MapPin, Locate, Check } from "lucide-react";

interface LocationPickerSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedState: string;
  selectedDistrict: string;
  onPick: (state: string, district: string, language: string) => void;
  onUseMyLocation: () => void;
}

export const LocationPickerSheet = ({
  open, onOpenChange, selectedState, selectedDistrict, onPick, onUseMyLocation,
}: LocationPickerSheetProps) => {
  const [tab, setTab] = useState<"state" | "district">("district");
  const [query, setQuery] = useState("");
  const [stateForDistricts, setStateForDistricts] = useState<string>(selectedState || "Telangana");

  const filteredStates = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return INDIAN_STATES;
    return INDIAN_STATES.filter(s => s.name.toLowerCase().includes(q));
  }, [query]);

  const activeState = INDIAN_STATES.find(s => s.name === stateForDistricts) || INDIAN_STATES[0];

  const filteredDistricts = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = activeState.districts;
    if (!q) return list;
    return list.filter(d => d.toLowerCase().includes(q));
  }, [query, activeState]);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="bottom"
        className="h-[78dvh] rounded-t-3xl border-white/[0.08] bg-black/90 backdrop-blur-2xl text-white p-0 overflow-hidden"
      >
        <SheetHeader className="px-5 pt-4 pb-2 text-left">
          <SheetTitle className="text-white text-base font-bold tracking-tight flex items-center gap-2">
            <MapPin className="w-4 h-4 text-primary" />
            Choose your location
          </SheetTitle>
          <p className="text-[11px] text-white/50">Hyperlocal reels for your district & state</p>
        </SheetHeader>

        {/* Tabs */}
        <div className="px-5">
          <div className="grid grid-cols-2 gap-1 p-1 rounded-2xl glass-card">
            {(["district","state"] as const).map(t => (
              <button
                key={t}
                onClick={() => { setTab(t); setQuery(""); }}
                className={`py-2 rounded-xl text-[12px] font-semibold transition-all ${
                  tab === t
                    ? "bg-primary/20 text-primary ring-1 ring-primary/40"
                    : "text-white/65"
                }`}
              >
                {t === "district" ? "District" : "State"}
              </button>
            ))}
          </div>
        </div>

        {/* Search */}
        <div className="px-5 pt-3">
          <div className="flex items-center gap-2 px-3 h-10 rounded-2xl bg-white/[0.05] border border-white/[0.06]">
            <Search className="w-4 h-4 text-white/45" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={tab === "state" ? "Search state…" : `Search district in ${activeState.name}…`}
              className="flex-1 bg-transparent outline-none text-[13px] placeholder:text-white/35"
            />
          </div>
        </div>

        {/* State chooser strip when on district tab */}
        {tab === "district" && (
          <div className="px-5 pt-3">
            <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
              {INDIAN_STATES.map(s => (
                <button
                  key={s.name}
                  onClick={() => setStateForDistricts(s.name)}
                  className={`shrink-0 px-3 py-1.5 rounded-full text-[11px] font-semibold transition-all whitespace-nowrap ${
                    stateForDistricts === s.name
                      ? "bg-primary/25 text-primary ring-1 ring-primary/40"
                      : "bg-white/[0.05] text-white/70 border border-white/[0.06]"
                  }`}
                >
                  {s.name}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* List */}
        <div className="flex-1 overflow-y-auto px-5 pt-3 pb-6 max-h-[44dvh]">
          {tab === "state" ? (
            <div className="grid grid-cols-2 gap-2">
              {filteredStates.map(s => {
                const isActive = selectedState === s.name && !selectedDistrict;
                return (
                  <button
                    key={s.name}
                    onClick={() => onPick(s.name, "", s.language)}
                    className={`flex items-center justify-between px-3 py-3 rounded-2xl text-left transition-all active:scale-[0.98] ${
                      isActive
                        ? "bg-primary/15 ring-1 ring-primary/40 text-primary"
                        : "bg-white/[0.04] border border-white/[0.06] text-white/85"
                    }`}
                  >
                    <span className="text-[12px] font-semibold leading-tight">{s.name}</span>
                    {isActive && <Check className="w-3.5 h-3.5 shrink-0" />}
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-2">
              {filteredDistricts.map(d => {
                const isActive = selectedDistrict.toLowerCase() === d.toLowerCase();
                return (
                  <button
                    key={d}
                    onClick={() => onPick(activeState.name, d, activeState.language)}
                    className={`flex items-center justify-between px-3 py-3 rounded-2xl text-left transition-all active:scale-[0.98] ${
                      isActive
                        ? "bg-primary/15 ring-1 ring-primary/40 text-primary"
                        : "bg-white/[0.04] border border-white/[0.06] text-white/85"
                    }`}
                  >
                    <span className="text-[12px] font-semibold leading-tight">{d}</span>
                    {isActive && <Check className="w-3.5 h-3.5 shrink-0" />}
                  </button>
                );
              })}
              {filteredDistricts.length === 0 && (
                <div className="col-span-2 text-center text-[12px] text-white/45 py-6">No districts found</div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-5 pb-[max(env(safe-area-inset-bottom),16px)] pt-2 border-t border-white/[0.05]">
          <button
            onClick={onUseMyLocation}
            className="w-full flex items-center justify-center gap-2 h-11 rounded-2xl bg-primary/15 ring-1 ring-primary/40 text-primary font-semibold text-[13px] active:scale-[0.98] transition-all"
          >
            <Locate className="w-4 h-4" />
            Auto-detect from my location
          </button>
        </div>
      </SheetContent>
    </Sheet>
  );
};