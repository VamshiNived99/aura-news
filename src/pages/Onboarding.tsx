import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { MapPin, Bell, Newspaper } from "lucide-react";

interface OnboardingSlide {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const slides: OnboardingSlide[] = [
  {
    icon: <MapPin className="w-16 h-16 text-primary" />,
    title: "Local news tailored for you",
    description: "Get news from your state and city, curated just for you",
  },
  {
    icon: <Newspaper className="w-16 h-16 text-primary" />,
    title: "Shorts for exam prep",
    description: "AI-powered study notes and MCQs for government exams",
  },
  {
    icon: <Bell className="w-16 h-16 text-primary" />,
    title: "Jobs & notifications",
    description: "Never miss important job notifications and updates",
  },
];

const Onboarding = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [locationPermission, setLocationPermission] = useState<"pending" | "granted" | "denied">("pending");
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      // Show permission request
      requestLocationPermission();
    }
  };

  const handleSkip = () => {
    navigate("/home");
  };

  const requestLocationPermission = async () => {
    // In a real app, use geolocation API
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocationPermission("granted");
          toast({
            title: "Location enabled",
            description: "You'll now see local news tailored for your area",
          });
          setTimeout(() => navigate("/home"), 1000);
        },
        (error) => {
          setLocationPermission("denied");
          // Show state selection modal
        }
      );
    } else {
      setLocationPermission("denied");
    }
  };

  const handleAllowLocation = () => {
    requestLocationPermission();
  };

  const handleManualState = () => {
    // In real app, open state selection modal
    toast({
      title: "State selection",
      description: "Opening state selection...",
    });
    setTimeout(() => navigate("/home"), 500);
  };

  if (locationPermission === "pending" && currentSlide === slides.length) {
    return (
      <div className="min-h-[100dvh] w-full flex items-center justify-center p-6 bg-background">
        <div className="w-full max-w-md animate-scale-in">
          <div className="bg-card rounded-2xl p-8 shadow-lg border border-border text-center space-y-6">
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
              <MapPin className="w-10 h-10 text-primary" />
            </div>
            
            <div>
              <h2 className="text-2xl font-semibold mb-3">
                Give permission to see local news
              </h2>
              <p className="text-muted-foreground">
                Allow AURA to access your location so we can show news and job alerts for your state. 
                You can change this anytime in Settings.
              </p>
            </div>

            <div className="space-y-3">
              <Button
                onClick={handleAllowLocation}
                className="w-full h-12 rounded-xl font-semibold shadow-accent"
                aria-label="Allow location access"
              >
                Allow location
              </Button>
              
              <Button
                onClick={handleManualState}
                variant="outline"
                className="w-full h-12 rounded-xl font-semibold"
                aria-label="Choose state manually"
              >
                Choose state manually
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[100dvh] w-full flex flex-col items-center justify-between p-6 bg-gradient-to-b from-background to-secondary/20">
      <div className="w-full max-w-md flex-1 flex flex-col justify-center">
        <div className="text-center space-y-8 animate-fade-in">
          <div className="flex justify-center">
            {slides[currentSlide].icon}
          </div>
          
          <div className="space-y-3">
            <h1 className="text-3xl font-bold">
              {slides[currentSlide].title}
            </h1>
            <p className="text-muted-foreground text-lg">
              {slides[currentSlide].description}
            </p>
          </div>

          <div className="flex justify-center gap-2 pt-4">
            {slides.map((_, index) => (
              <div
                key={index}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentSlide
                    ? "w-8 bg-primary"
                    : "w-2 bg-border"
                }`}
                aria-label={`Slide ${index + 1} of ${slides.length}`}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="w-full max-w-md space-y-3 pb-6">
        <Button
          onClick={handleNext}
          className="w-full h-12 rounded-xl font-semibold shadow-accent"
          aria-label={currentSlide < slides.length - 1 ? "Next slide" : "Continue to permissions"}
        >
          {currentSlide < slides.length - 1 ? "Continue" : "Get Started"}
        </Button>
        
        <button
          onClick={handleSkip}
          className="w-full text-muted-foreground hover:text-foreground transition-colors text-sm"
          aria-label="Skip onboarding"
        >
          Skip
        </button>
      </div>
    </div>
  );
};

export default Onboarding;
