import { cn } from "@/lib/utils";

interface DiagramStep {
  id: string;
  text: string;
  next?: string[];
}

interface FlowchartDiagramProps {
  title: string;
  type: "flowchart" | "process" | "hierarchy" | "comparison" | "cycle";
  steps: DiagramStep[];
  className?: string;
}

export const FlowchartDiagram = ({ title, type, steps, className }: FlowchartDiagramProps) => {
  if (!steps || steps.length === 0) return null;

  const getNodeColor = (index: number) => {
    const colors = [
      "bg-primary/10 border-primary/30 text-primary",
      "bg-blue-500/10 border-blue-500/30 text-blue-600",
      "bg-green-500/10 border-green-500/30 text-green-600",
      "bg-amber-500/10 border-amber-500/30 text-amber-600",
      "bg-purple-500/10 border-purple-500/30 text-purple-600",
      "bg-pink-500/10 border-pink-500/30 text-pink-600",
    ];
    return colors[index % colors.length];
  };

  if (type === "cycle") {
    return (
      <div className={cn("p-4 bg-muted/30 rounded-xl", className)}>
        <h4 className="text-sm font-semibold mb-4 text-center">{title}</h4>
        <div className="flex flex-wrap justify-center items-center gap-2">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center gap-2">
              <div className={cn("px-3 py-2 rounded-lg border-2 text-xs font-medium text-center min-w-[80px]", getNodeColor(index))}>
                {step.text}
              </div>
              {index < steps.length - 1 && (
                <span className="text-muted-foreground text-lg">→</span>
              )}
              {index === steps.length - 1 && steps.length > 1 && (
                <span className="text-muted-foreground text-lg">↻</span>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (type === "hierarchy") {
    // Group steps by level (based on connections)
    const levels: DiagramStep[][] = [];
    const visited = new Set<string>();
    
    // Find root nodes (not referenced by any next array)
    const allNextIds = new Set(steps.flatMap(s => s.next || []));
    const roots = steps.filter(s => !allNextIds.has(s.id));
    
    if (roots.length === 0 && steps.length > 0) {
      roots.push(steps[0]);
    }
    
    let currentLevel = roots;
    while (currentLevel.length > 0) {
      levels.push(currentLevel);
      currentLevel.forEach(s => visited.add(s.id));
      
      const nextIds = currentLevel.flatMap(s => s.next || []);
      currentLevel = steps.filter(s => nextIds.includes(s.id) && !visited.has(s.id));
    }

    return (
      <div className={cn("p-4 bg-muted/30 rounded-xl", className)}>
        <h4 className="text-sm font-semibold mb-4 text-center">{title}</h4>
        <div className="flex flex-col items-center gap-4">
          {levels.map((level, levelIndex) => (
            <div key={levelIndex} className="flex flex-col items-center gap-2 w-full">
              <div className="flex flex-wrap justify-center gap-3">
                {level.map((step, stepIndex) => (
                  <div
                    key={step.id}
                    className={cn("px-4 py-2 rounded-lg border-2 text-xs font-medium text-center", getNodeColor(levelIndex))}
                  >
                    {step.text}
                  </div>
                ))}
              </div>
              {levelIndex < levels.length - 1 && (
                <div className="text-muted-foreground text-lg">↓</div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Default flowchart/process view
  return (
    <div className={cn("p-4 bg-muted/30 rounded-xl", className)}>
      <h4 className="text-sm font-semibold mb-4 text-center">{title}</h4>
      <div className="flex flex-col items-center gap-2">
        {steps.map((step, index) => (
          <div key={step.id} className="flex flex-col items-center">
            <div className={cn(
              "px-4 py-3 rounded-lg border-2 text-xs font-medium text-center w-full max-w-[200px]",
              getNodeColor(index)
            )}>
              <span className="font-bold mr-1">{index + 1}.</span>
              {step.text}
            </div>
            {index < steps.length - 1 && (
              <div className="h-6 w-0.5 bg-muted-foreground/30 my-1" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FlowchartDiagram;