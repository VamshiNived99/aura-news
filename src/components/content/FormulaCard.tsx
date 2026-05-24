import { cn } from "@/lib/utils";
import { Calculator, Info } from "lucide-react";

interface Formula {
  name: string;
  expression: string;
  description?: string;
  derivation?: string;
  example?: string;
}

interface FormulaCardProps {
  formulas: Formula[];
  className?: string;
}

export const FormulaCard = ({ formulas, className }: FormulaCardProps) => {
  if (!formulas || formulas.length === 0) return null;

  return (
    <div className={cn("grid gap-3", className)}>
      {formulas.map((formula, index) => (
        <div
          key={index}
          className="p-4 bg-gradient-to-r from-blue-500/5 to-indigo-500/10 rounded-xl border border-blue-500/20"
        >
          <div className="flex items-start gap-3">
            <div className="p-2 bg-blue-500/20 rounded-lg flex-shrink-0">
              <Calculator className="w-4 h-4 text-blue-600" />
            </div>
            <div className="flex-1 min-w-0">
              <h5 className="font-semibold text-sm mb-2">{formula.name}</h5>
              <div className="bg-background/80 rounded-lg px-3 py-2 mb-2 overflow-x-auto">
                <code className="text-primary font-mono text-sm whitespace-nowrap">
                  {formula.expression}
                </code>
              </div>
              {formula.description && (
                <p className="text-xs text-muted-foreground mb-2">{formula.description}</p>
              )}
              {formula.derivation && (
                <div className="flex items-start gap-1 text-xs text-blue-600 dark:text-blue-400">
                  <Info className="w-3 h-3 mt-0.5 flex-shrink-0" />
                  <span>{formula.derivation}</span>
                </div>
              )}
              {formula.example && (
                <div className="mt-2 p-2 bg-muted/50 rounded-lg">
                  <p className="text-xs"><span className="font-medium">Example:</span> {formula.example}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FormulaCard;