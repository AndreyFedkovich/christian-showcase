import { cn } from "@/lib/utils";
import { Trophy } from "lucide-react";

interface GameScoreboardProps {
  teamName: string;
  opponentName: string;
  teamScore: number;
  opponentScore: number;
  maxScore?: number;
}

const GameScoreboard = ({ 
  teamName, 
  opponentName, 
  teamScore, 
  opponentScore,
  maxScore = 10
}: GameScoreboardProps) => {
  return (
    <div className="flex items-center justify-center gap-4 md:gap-8 py-4 px-6 md:py-5 md:px-8 bg-gradient-to-br from-slate-800/90 via-slate-800/80 to-slate-900/90 backdrop-blur-md rounded-2xl border border-white/10 shadow-xl">
      {/* Team */}
      <div className="flex flex-col items-center gap-1">
        <span className="text-sm md:text-base font-sans text-white/70 truncate max-w-[100px] md:max-w-[150px]">
          {teamName}
        </span>
        <div className={cn(
          "text-4xl md:text-5xl font-bold transition-all duration-300",
          "text-emerald-400 drop-shadow-[0_0_10px_rgba(52,211,153,0.4)]"
        )}>
          {teamScore}
        </div>
        {/* Trophy icons */}
        <div className="flex gap-1 mt-2">
          {Array.from({ length: maxScore }).map((_, i) => (
            <Trophy 
              key={i}
              className={cn(
                "w-4 h-4 md:w-5 md:h-5 transition-all duration-300",
                i < teamScore 
                  ? "text-emerald-400 fill-emerald-400/30 drop-shadow-[0_0_3px_rgba(52,211,153,0.5)]" 
                  : "text-slate-600/40"
              )}
            />
          ))}
        </div>
      </div>

      {/* VS Divider */}
      <div className="flex flex-col items-center justify-center px-2 md:px-4">
        <div className="text-xl md:text-2xl font-bold bg-gradient-to-b from-white/40 to-white/20 bg-clip-text text-transparent">
          VS
        </div>
      </div>

      {/* Opponent */}
      <div className="flex flex-col items-center gap-1">
        <span className="text-sm md:text-base font-sans text-white/70 truncate max-w-[100px] md:max-w-[150px]">
          {opponentName}
        </span>
        <div className={cn(
          "text-4xl md:text-5xl font-bold transition-all duration-300",
          "text-rose-400 drop-shadow-[0_0_10px_rgba(251,113,133,0.4)]"
        )}>
          {opponentScore}
        </div>
        {/* Trophy icons */}
        <div className="flex gap-1 mt-2">
          {Array.from({ length: maxScore }).map((_, i) => (
            <Trophy 
              key={i}
              className={cn(
                "w-4 h-4 md:w-5 md:h-5 transition-all duration-300",
                i < opponentScore 
                  ? "text-rose-400 fill-rose-400/30 drop-shadow-[0_0_3px_rgba(251,113,133,0.5)]" 
                  : "text-slate-600/40"
              )}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default GameScoreboard;
