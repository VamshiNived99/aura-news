import { cn } from "@/lib/utils";
import { FileText, Zap, CheckCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Example {
  title: string;
  problem: string;
  approach?: string;
  solution: string;
  answer?: string;
  shortcut?: string;
}

interface WorkedExampleProps {
  examples: Example[];
  className?: string;
}

export const WorkedExample = ({ examples, className }: WorkedExampleProps) => {
  if (!examples || examples.length === 0) return null;

  return (
    <div className={cn("space-y-4", className)}>
      {examples.map((example, index) => (
        <div
          key={index}
          className="rounded-xl border border-border overflow-hidden bg-card"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 px-4 py-2 border-b border-border flex items-center gap-2">
            <FileText className="w-4 h-4 text-green-600" />
            <span className="font-semibold text-sm">{example.title || `Example ${index + 1}`}</span>
          </div>
          
          {/* Problem */}
          <div className="p-4 border-b border-border bg-muted/20">
            <p className="text-xs text-muted-foreground mb-1">Problem:</p>
            <p className="text-sm font-medium">{example.problem}</p>
          </div>
          
          {/* Approach */}
          {example.approach && (
            <div className="px-4 py-3 border-b border-border bg-amber-500/5">
              <p className="text-xs text-amber-600 font-medium mb-1">💡 Approach:</p>
              <p className="text-xs">{example.approach}</p>
            </div>
          )}
          
          {/* Solution */}
          <div className="p-4 border-b border-border">
            <p className="text-xs text-muted-foreground mb-2">Solution:</p>
            <div className="bg-muted/30 rounded-lg p-3">
              <p className="text-xs whitespace-pre-line leading-relaxed">{example.solution}</p>
            </div>
          </div>
          
          {/* Answer & Shortcut */}
          <div className="px-4 py-3 flex flex-wrap items-center gap-3">
            {example.answer && (
              <Badge className="bg-green-500/20 text-green-700 border-green-500/30 hover:bg-green-500/30">
                <CheckCircle className="w-3 h-3 mr-1" />
                Answer: {example.answer}
              </Badge>
            )}
            {example.shortcut && (
              <Badge variant="outline" className="text-amber-600 border-amber-500/30">
                <Zap className="w-3 h-3 mr-1" />
                Shortcut: {example.shortcut}
              </Badge>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default WorkedExample;