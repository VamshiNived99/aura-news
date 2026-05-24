import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/home", { replace: true });
  }, [navigate]);

  return (
    <div className="flex min-h-[100dvh] w-full items-center justify-center bg-background">
      <div className="text-center px-4">
        <h1 className="mb-4 text-2xl sm:text-4xl font-bold">Loading...</h1>
      </div>
    </div>
  );
};

export default Index;
