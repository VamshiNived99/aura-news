import { cn } from "@/lib/utils";
import { CheckCircle } from "lucide-react";

interface QuickRevisionProps {
  points: string[];
  className?: string;
}

export const QuickRevision = ({ points, className }: QuickRevisionProps) => {
  if (!points || points.length === 0) return null;

  return (
    <div className={cn("p-4 bg-gradient-to-br from-primary/5 to-primary/10 rounded-xl border border-primary/20", className)}>
      <h4 className="font-bold text-sm mb-3 flex items-center gap-2">
        <span className="text-lg">⚡</span> Quick Revision Points
      </h4>
      <div className="grid gap-2">
        {points.map((point, index) => (
          <div
            key={index}
            className="flex items-start gap-2 p-2 bg-background/50 rounded-lg"
          >
            <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
            <span className="text-xs">{point}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuickRevision;