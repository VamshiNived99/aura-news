import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-[100dvh] w-full items-center justify-center bg-background px-4">
      <div className="text-center">
        <h1 className="mb-2 text-6xl sm:text-8xl font-bold text-primary">404</h1>
        <p className="mb-6 text-base sm:text-xl text-muted-foreground">Oops! Page not found</p>
        <Button onClick={() => navigate("/home")} className="gap-2">
          <Home className="w-4 h-4" />
          Return to Home
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
