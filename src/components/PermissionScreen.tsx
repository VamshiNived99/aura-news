import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Bell, MapPin, Shield, ChevronRight, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface PermissionScreenProps {
  onComplete: () => void;
}

export const PermissionScreen = ({ onComplete }: PermissionScreenProps) => {
  const [notificationGranted, setNotificationGranted] = useState<boolean | null>(null);
  const [locationGranted, setLocationGranted] = useState<boolean | null>(null);
  const [step, setStep] = useState<'intro' | 'notification' | 'location' | 'complete'>('intro');

  useEffect(() => {
    // Check if permissions were already granted
    const checkExistingPermissions = async () => {
      // Check notification permission
      if ('Notification' in window) {
        if (Notification.permission === 'granted') {
          setNotificationGranted(true);
        } else if (Notification.permission === 'denied') {
          setNotificationGranted(false);
        }
      }

      // Check if we have cached location permission
      const cachedLocation = localStorage.getItem('locationPermissionGranted');
      if (cachedLocation === 'true') {
        setLocationGranted(true);
      }
    };

    checkExistingPermissions();
  }, []);

  const requestNotificationPermission = async () => {
    if (!('Notification' in window)) {
      setNotificationGranted(false);
      setStep('location');
      return;
    }

    try {
      const permission = await Notification.requestPermission();
      setNotificationGranted(permission === 'granted');
      setStep('location');
    } catch (error) {
      console.error('Notification permission error:', error);
      setNotificationGranted(false);
      setStep('location');
    }
  };

  const requestLocationPermission = async () => {
    if (!('geolocation' in navigator)) {
      setLocationGranted(false);
      setStep('complete');
      return;
    }

    try {
      await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, { timeout: 10000 });
      });
      setLocationGranted(true);
      localStorage.setItem('locationPermissionGranted', 'true');
    } catch (error) {
      console.error('Location permission error:', error);
      setLocationGranted(false);
    }
    setStep('complete');
  };

  const skipNotification = () => {
    setNotificationGranted(false);
    setStep('location');
  };

  const skipLocation = () => {
    setLocationGranted(false);
    setStep('complete');
  };

  const handleComplete = () => {
    localStorage.setItem('permissionsShown', 'true');
    onComplete();
  };

  return (
    <div className="min-h-[100dvh] w-full bg-background flex flex-col items-center justify-center p-6">
      <AnimatePresence mode="wait">
        {step === 'intro' && (
          <motion.div
            key="intro"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="w-full max-w-md text-center space-y-8"
          >
            <div className="space-y-4">
              <div className="w-20 h-20 mx-auto bg-gradient-to-br from-primary to-primary/60 rounded-3xl flex items-center justify-center shadow-2xl">
                <Shield className="w-10 h-10 text-primary-foreground" />
              </div>
              <h1 className="text-2xl font-bold">Welcome to AURA</h1>
              <p className="text-muted-foreground">
                To give you the best experience, we need a few permissions
              </p>
            </div>

            <div className="space-y-3">
              <Card className="text-left">
                <CardContent className="p-4 flex items-center gap-4">
                  <div className="p-2 rounded-xl bg-blue-500/10">
                    <Bell className="w-5 h-5 text-blue-500" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-sm">Notifications</p>
                    <p className="text-xs text-muted-foreground">Get alerts for breaking news & new jobs</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="text-left">
                <CardContent className="p-4 flex items-center gap-4">
                  <div className="p-2 rounded-xl bg-green-500/10">
                    <MapPin className="w-5 h-5 text-green-500" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-sm">Location</p>
                    <p className="text-xs text-muted-foreground">Local news & weather in your language</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Button 
              className="w-full" 
              size="lg"
              onClick={() => setStep('notification')}
            >
              Continue
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </motion.div>
        )}

        {step === 'notification' && (
          <motion.div
            key="notification"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="w-full max-w-md text-center space-y-8"
          >
            <div className="space-y-4">
              <div className="w-20 h-20 mx-auto bg-gradient-to-br from-blue-500 to-blue-600 rounded-3xl flex items-center justify-center shadow-2xl">
                <Bell className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-2xl font-bold">Stay Updated</h1>
              <p className="text-muted-foreground">
                Enable notifications to get alerts for breaking news, new government jobs, and important updates
              </p>
            </div>

            <div className="space-y-3">
              <Button 
                className="w-full" 
                size="lg"
                onClick={requestNotificationPermission}
              >
                <Bell className="w-4 h-4 mr-2" />
                Enable Notifications
              </Button>
              <Button 
                variant="ghost" 
                className="w-full"
                onClick={skipNotification}
              >
                Not Now
              </Button>
            </div>
          </motion.div>
        )}

        {step === 'location' && (
          <motion.div
            key="location"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="w-full max-w-md text-center space-y-8"
          >
            <div className="space-y-4">
              <div className="w-20 h-20 mx-auto bg-gradient-to-br from-green-500 to-green-600 rounded-3xl flex items-center justify-center shadow-2xl">
                <MapPin className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-2xl font-bold">Local Content</h1>
              <p className="text-muted-foreground">
                Allow location access to get news in your local language and accurate weather & fuel prices for your city
              </p>
            </div>

            <div className="space-y-3">
              <Button 
                className="w-full" 
                size="lg"
                onClick={requestLocationPermission}
              >
                <MapPin className="w-4 h-4 mr-2" />
                Enable Location
              </Button>
              <Button 
                variant="ghost" 
                className="w-full"
                onClick={skipLocation}
              >
                Not Now
              </Button>
            </div>
          </motion.div>
        )}

        {step === 'complete' && (
          <motion.div
            key="complete"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="w-full max-w-md text-center space-y-8"
          >
            <div className="space-y-4">
              <div className="w-20 h-20 mx-auto bg-gradient-to-br from-primary to-primary/60 rounded-3xl flex items-center justify-center shadow-2xl">
                <Check className="w-10 h-10 text-primary-foreground" />
              </div>
              <h1 className="text-2xl font-bold">You're All Set!</h1>
              <p className="text-muted-foreground">
                {notificationGranted && locationGranted 
                  ? "All permissions granted. Enjoy personalized news!"
                  : notificationGranted 
                  ? "Notifications enabled. You can enable location later in settings."
                  : locationGranted
                  ? "Location enabled. You can enable notifications later in settings."
                  : "You can enable permissions anytime from your device settings."
                }
              </p>
            </div>

            <div className="space-y-3">
              {(notificationGranted || locationGranted) && (
                <div className="flex justify-center gap-4">
                  {notificationGranted && (
                    <div className="flex items-center gap-2 text-sm text-green-500">
                      <Check className="w-4 h-4" />
                      Notifications
                    </div>
                  )}
                  {locationGranted && (
                    <div className="flex items-center gap-2 text-sm text-green-500">
                      <Check className="w-4 h-4" />
                      Location
                    </div>
                  )}
                </div>
              )}
            </div>

            <Button 
              className="w-full" 
              size="lg"
              onClick={handleComplete}
            >
              Get Started
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PermissionScreen;
