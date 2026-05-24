import { cn } from "@/lib/utils";

interface ComparisonTableProps {
  title: string;
  headers: string[];
  rows: string[][];
  className?: string;
}

export const ComparisonTable = ({ title, headers, rows, className }: ComparisonTableProps) => {
  if (!headers || headers.length === 0 || !rows || rows.length === 0) return null;

  return (
    <div className={cn("overflow-hidden rounded-xl border border-border", className)}>
      <div className="bg-primary/10 px-4 py-2 border-b border-border">
        <h4 className="text-sm font-bold text-primary">{title}</h4>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr className="bg-muted/50">
              {headers.map((header, index) => (
                <th
                  key={index}
                  className={cn(
                    "px-3 py-2 text-left font-semibold border-b border-border",
                    index === 0 ? "bg-muted" : ""
                  )}
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rowIndex) => (
              <tr key={rowIndex} className="hover:bg-muted/30 transition-colors">
                {row.map((cell, cellIndex) => (
                  <td
                    key={cellIndex}
                    className={cn(
                      "px-3 py-2 border-b border-border",
                      cellIndex === 0 ? "font-medium bg-muted/20" : ""
                    )}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ComparisonTable;