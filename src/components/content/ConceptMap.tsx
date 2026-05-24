import { cn } from "@/lib/utils";

interface ConceptNode {
  id: string;
  label: string;
  type: "main" | "sub" | "detail";
  parent?: string;
}

interface ConceptMapProps {
  title: string;
  nodes: ConceptNode[];
  className?: string;
}

export const ConceptMap = ({ title, nodes, className }: ConceptMapProps) => {
  if (!nodes || nodes.length === 0) return null;

  const mainNodes = nodes.filter(n => n.type === "main");
  const subNodes = nodes.filter(n => n.type === "sub");
  const detailNodes = nodes.filter(n => n.type === "detail");

  const getNodesByParent = (parentId: string) => {
    return [...subNodes, ...detailNodes].filter(n => n.parent === parentId);
  };

  return (
    <div className={cn("p-4 bg-gradient-to-br from-primary/5 to-primary/10 rounded-xl border border-primary/20", className)}>
      <h4 className="text-sm font-bold mb-4 text-center text-primary">{title}</h4>
      
      <div className="flex flex-col items-center gap-4">
        {/* Main nodes */}
        {mainNodes.map(main => (
          <div key={main.id} className="flex flex-col items-center gap-3 w-full">
            <div className="px-6 py-3 bg-primary text-primary-foreground rounded-xl font-semibold text-sm shadow-lg">
              {main.label}
            </div>
            
            {/* Sub nodes connected to this main node */}
            <div className="flex flex-wrap justify-center gap-2 max-w-full">
              {getNodesByParent(main.id).map((sub, index) => (
                <div key={sub.id} className="flex flex-col items-center">
                  <div className="h-4 w-0.5 bg-primary/30" />
                  <div className={cn(
                    "px-3 py-2 rounded-lg text-xs font-medium border-2",
                    sub.type === "sub" 
                      ? "bg-secondary/50 border-secondary text-secondary-foreground" 
                      : "bg-muted border-border text-muted-foreground"
                  )}>
                    {sub.label}
                  </div>
                  
                  {/* Detail nodes */}
                  {sub.type === "sub" && getNodesByParent(sub.id).length > 0 && (
                    <div className="flex flex-wrap justify-center gap-1 mt-2">
                      {getNodesByParent(sub.id).map(detail => (
                        <div key={detail.id} className="px-2 py-1 bg-muted/50 rounded text-[10px] border border-border/50">
                          {detail.label}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
        
        {/* If no main nodes, show flat structure */}
        {mainNodes.length === 0 && (
          <div className="flex flex-wrap justify-center gap-3">
            {nodes.map((node, index) => (
              <div
                key={node.id}
                className={cn(
                  "px-4 py-2 rounded-lg text-xs font-medium",
                  index === 0 ? "bg-primary text-primary-foreground" : "bg-muted border border-border"
                )}
              >
                {node.label}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ConceptMap;