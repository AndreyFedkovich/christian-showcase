import { cn } from "@/lib/utils";

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
    <div className="flex items-center justify-center gap-4 md:gap-8 py-4 px-6 bg-card/80 backdrop-blur-sm rounded-2xl shadow-card">
      {/* Team */}
      <div className="flex flex-col items-center gap-1">
        <span className="text-sm md:text-base font-sans text-muted-foreground truncate max-w-[100px] md:max-w-[150px]">
          {teamName}
        </span>
        <div className={cn(
          "text-4xl md:text-5xl font-bold transition-all duration-300",
          "text-emerald-600"
        )}>
          {teamScore}
        </div>
        {/* Progress dots */}
        <div className="flex gap-1 mt-1">
          {Array.from({ length: maxScore }).map((_, i) => (
            <div 
              key={i}
              className={cn(
                "w-2 h-2 rounded-full transition-all duration-300",
                i < teamScore ? "bg-emerald-500" : "bg-muted"
              )}
            />
          ))}
        </div>
      </div>

      {/* VS Divider */}
      <div className="flex flex-col items-center gap-1">
        <div className="text-2xl font-bold text-muted-foreground/50">VS</div>
      </div>

      {/* Opponent */}
      <div className="flex flex-col items-center gap-1">
        <span className="text-sm md:text-base font-sans text-muted-foreground truncate max-w-[100px] md:max-w-[150px]">
          {opponentName}
        </span>
        <div className={cn(
          "text-4xl md:text-5xl font-bold transition-all duration-300",
          "text-rose-600"
        )}>
          {opponentScore}
        </div>
        {/* Progress dots */}
        <div className="flex gap-1 mt-1">
          {Array.from({ length: maxScore }).map((_, i) => (
            <div 
              key={i}
              className={cn(
                "w-2 h-2 rounded-full transition-all duration-300",
                i < opponentScore ? "bg-rose-500" : "bg-muted"
              )}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default GameScoreboard;
