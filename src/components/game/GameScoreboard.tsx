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
    <div className="flex items-center justify-between w-full gap-6 md:gap-8 px-4 md:px-8">
      {/* Left zone - Team Trophies (emerald) */}
      <div className="flex-1 flex justify-end gap-1 md:gap-2">
        {Array.from({ length: maxScore }).map((_, i) => (
          <Trophy 
            key={i}
            className={cn(
              "w-8 h-8 md:w-12 md:h-12 transition-all duration-300",
              i < teamScore 
                ? "text-emerald-400 fill-emerald-400/30 drop-shadow-[0_0_8px_rgba(52,211,153,0.6)] animate-trophy-in" 
                : "text-slate-700/30"
            )}
          />
        ))}
      </div>

      {/* Central score panel */}
      <div className="flex items-center gap-3 md:gap-5 py-4 px-8 md:py-6 md:px-12 bg-gradient-to-br from-slate-800/95 via-slate-800/90 to-slate-900/95 backdrop-blur-md rounded-2xl border border-white/10 shadow-xl shrink-0">
        {/* Team */}
        <div className="flex flex-col items-center">
          <span className="text-sm md:text-xl text-white/60 truncate max-w-[90px] md:max-w-[120px]">
            {teamName}
          </span>
          <div className="text-4xl md:text-6xl font-bold text-emerald-400 drop-shadow-[0_0_10px_rgba(52,211,153,0.4)]">
            {teamScore}
          </div>
        </div>

        {/* VS */}
        <div className="text-base md:text-xl font-bold bg-gradient-to-b from-white/40 to-white/20 bg-clip-text text-transparent px-1">
          VS
        </div>

        {/* Opponent */}
        <div className="flex flex-col items-center">
          <span className="text-sm md:text-xl text-white/60 truncate max-w-[90px] md:max-w-[120px]">
            {opponentName}
          </span>
          <div className="text-4xl md:text-6xl font-bold text-rose-400 drop-shadow-[0_0_10px_rgba(251,113,133,0.4)]">
            {opponentScore}
          </div>
        </div>
      </div>

      {/* Right zone - Opponent Trophies (rose) */}
      <div className="flex-1 flex justify-start gap-1 md:gap-2">
        {Array.from({ length: maxScore }).map((_, i) => (
          <Trophy 
            key={i}
            className={cn(
              "w-8 h-8 md:w-12 md:h-12 transition-all duration-300",
              i < opponentScore 
                ? "text-rose-400 fill-rose-400/30 drop-shadow-[0_0_8px_rgba(251,113,133,0.6)] animate-trophy-in" 
                : "text-slate-700/30"
            )}
          />
        ))}
      </div>
    </div>
  );
};

export default GameScoreboard;
