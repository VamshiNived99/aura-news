import { cn } from "@/lib/utils";
import { Lightbulb } from "lucide-react";

interface Mnemonic {
  topic: string;
  mnemonic: string;
  expansion: string;
}

interface MnemonicCardProps {
  mnemonics: Mnemonic[];
  className?: string;
}

export const MnemonicCard = ({ mnemonics, className }: MnemonicCardProps) => {
  if (!mnemonics || mnemonics.length === 0) return null;

  return (
    <div className={cn("space-y-3", className)}>
      {mnemonics.map((m, index) => (
        <div
          key={index}
          className="p-4 bg-gradient-to-r from-amber-500/10 to-orange-500/10 rounded-xl border border-amber-500/20"
        >
          <div className="flex items-start gap-3">
            <div className="p-2 bg-amber-500/20 rounded-lg">
              <Lightbulb className="w-4 h-4 text-amber-600" />
            </div>
            <div className="flex-1">
              <p className="text-xs text-muted-foreground mb-1">{m.topic}</p>
              <p className="font-bold text-base text-amber-700 dark:text-amber-400 mb-1">
                {m.mnemonic}
              </p>
              <p className="text-xs text-muted-foreground">{m.expansion}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MnemonicCard;