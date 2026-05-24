import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { TrendingUp, TrendingDown, Droplets } from "lucide-react";

interface LiveData {
  gold24k: { price: number; change: number; unit: string };
  gold22k: { price: number; change: number; unit: string };
  silver: { price: number; change: number; unit: string };
  weather: { temp: number; condition: string; city: string; humidity: number; icon: string };
  petrol: { price: number; city: string };
  diesel: { price: number; city: string };
  timestamp: string;
}

export const LiveDataWidgets = () => {
  const [liveData, setLiveData] = useState<LiveData | null>(null);
  const [loading, setLoading] = useState(true);
  const [userCity, setUserCity] = useState<string>("");

  useEffect(() => {
    fetchLiveData();
    const interval = setInterval(fetchLiveData, 30 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const fetchLiveData = async () => {
    try {
      let latitude = 28.6139;
      let longitude = 77.2090;
      let city = "Delhi";
      let state = "Delhi";

      if ('geolocation' in navigator) {
        try {
          const position = await new Promise<GeolocationPosition>((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject, { timeout: 5000 });
          });
          latitude = position.coords.latitude;
          longitude = position.coords.longitude;

          const geoResponse = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&accept-language=en`,
            { headers: { 'User-Agent': 'AuraApp/1.0' } }
          );
          if (geoResponse.ok) {
            const geoData = await geoResponse.json();
            city = geoData.address?.city || geoData.address?.town || geoData.address?.state_district || "India";
            state = geoData.address?.state || "India";
          }
        } catch (geoError) {
          console.log('Using default location');
        }
      }

      setUserCity(city);

      const { data, error } = await supabase.functions.invoke('fetch-live-data', {
        body: { latitude, longitude, city, state }
      });

      if (error) throw error;
      setLiveData(data);
    } catch (error) {
      console.error('Error fetching live data:', error);
      setLiveData({
        gold24k: { price: 79200, change: 0.12, unit: '₹/10g' },
        gold22k: { price: 72600, change: 0.15, unit: '₹/10g' },
        silver: { price: 960, change: 0.18, unit: '₹/10g' },
        weather: { temp: 28, condition: 'Clear', city: 'India', humidity: 65, icon: '☀️' },
        petrol: { price: 107.41, city: 'India' },
        diesel: { price: 95.65, city: 'India' },
        timestamp: new Date().toISOString()
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="grid grid-cols-2 gap-2 px-4 py-3 animate-pulse">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <Card key={i} className="bg-card/50">
            <CardContent className="p-3">
              <div className="h-4 bg-muted rounded w-16 mb-2" />
              <div className="h-6 bg-muted rounded w-20" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (!liveData) return null;

  return (
    <div className="px-4 py-3 space-y-3">
      {/* Weather Widget - Full Width */}
      <Card className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border-blue-500/20 overflow-hidden">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="text-4xl">{liveData.weather.icon}</span>
              <div>
                <div className="text-3xl font-bold">{liveData.weather.temp}°C</div>
                <div className="text-sm text-muted-foreground">{liveData.weather.condition}</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm font-medium">{liveData.weather.city}</div>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Droplets className="w-3 h-3" />
                {liveData.weather.humidity}%
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Gold 24K & 22K - 2 Column Grid */}
      <div className="grid grid-cols-2 gap-2">
        <Card className="bg-gradient-to-br from-yellow-500/20 to-amber-500/20 border-yellow-500/20">
          <CardContent className="p-3">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-lg">🥇</span>
              <span className="text-xs font-medium text-muted-foreground">Gold 24K</span>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-lg font-bold">₹{liveData.gold24k.price.toLocaleString('en-IN')}</span>
              <span className="text-[10px] text-muted-foreground">
                {(liveData.gold24k.unit || '₹/10g').replace('₹', '')}
              </span>
            </div>
            {liveData.gold24k.change !== 0 && (
              <div className={`flex items-center gap-1 text-xs ${liveData.gold24k.change > 0 ? 'text-green-500' : 'text-red-500'}`}>
                {liveData.gold24k.change > 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                {Math.abs(liveData.gold24k.change).toFixed(2)}%
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-yellow-400/20 to-orange-400/20 border-yellow-400/20">
          <CardContent className="p-3">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-lg">💛</span>
              <span className="text-xs font-medium text-muted-foreground">Gold 22K</span>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-lg font-bold">₹{liveData.gold22k.price.toLocaleString('en-IN')}</span>
              <span className="text-[10px] text-muted-foreground">
                {(liveData.gold22k.unit || '₹/10g').replace('₹', '')}
              </span>
            </div>
            {liveData.gold22k.change !== 0 && (
              <div className={`flex items-center gap-1 text-xs ${liveData.gold22k.change > 0 ? 'text-green-500' : 'text-red-500'}`}>
                {liveData.gold22k.change > 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                {Math.abs(liveData.gold22k.change).toFixed(2)}%
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Silver & Fuel - 3 Column Grid */}
      <div className="grid grid-cols-3 gap-2">
        <Card className="bg-gradient-to-br from-slate-400/20 to-slate-500/20 border-slate-400/20">
          <CardContent className="p-3">
            <div className="flex items-center gap-1 mb-1">
              <span className="text-sm">🥈</span>
              <span className="text-[10px] font-medium text-muted-foreground">Silver</span>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-base font-bold">₹{liveData.silver.price.toLocaleString('en-IN')}</span>
              <span className="text-[9px] text-muted-foreground">
                {(liveData.silver.unit || '₹/10g').replace('₹', '')}
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-500/20 to-red-500/20 border-orange-500/20">
          <CardContent className="p-3">
            <div className="flex items-center gap-1 mb-1">
              <span className="text-sm">⛽</span>
              <span className="text-[10px] font-medium text-muted-foreground">Petrol</span>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-base font-bold">₹{liveData.petrol.price.toFixed(2)}</span>
              <span className="text-[9px] text-muted-foreground">/L</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 border-green-500/20">
          <CardContent className="p-3">
            <div className="flex items-center gap-1 mb-1">
              <span className="text-sm">🛢️</span>
              <span className="text-[10px] font-medium text-muted-foreground">Diesel</span>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-base font-bold">₹{liveData.diesel.price.toFixed(2)}</span>
              <span className="text-[9px] text-muted-foreground">/L</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Location & Last Updated */}
      <div className="flex justify-between text-[10px] text-muted-foreground px-1">
        <span>📍 {liveData.petrol.city}</span>
        <span>Updated: {new Date(liveData.timestamp).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}</span>
      </div>
    </div>
  );
};
