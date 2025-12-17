import { Button } from "@/components/ui/button";
import { Trophy, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface RoundTransitionProps {
  roundNumber: number;
  teamScore: number;
  opponentScore: number;
  teamName: string;
  opponentName: string;
  roundComplete?: boolean;
  onStartRound: () => void;
}

const RoundTransition = ({ 
  roundNumber, 
  teamScore, 
  opponentScore,
  teamName,
  opponentName,
  roundComplete,
  onStartRound 
}: RoundTransitionProps) => {
  return (
    <div className="flex flex-col items-center gap-10 md:gap-12 animate-fade-in">
      {/* Round indicator */}
      <div className={cn(
        "flex flex-col items-center gap-3",
        "p-10 md:p-12 rounded-2xl",
        "bg-gradient-to-br from-violet-600/20 via-purple-600/20 to-indigo-700/20",
        "border-2 border-accent/30"
      )}>
        <span className="text-xl md:text-2xl font-sans text-muted-foreground uppercase tracking-wider">
          {roundComplete ? "Раунд завершён" : "Приготовьтесь"}
        </span>
        <h2 className="text-6xl md:text-7xl font-bold text-white">
          Раунд {roundNumber}
        </h2>
      </div>

      {/* Current score */}
      <div className="flex items-center gap-8 md:gap-12 text-4xl md:text-5xl font-bold">
        <div className="flex flex-col items-center">
          <span className="text-base md:text-lg font-sans text-muted-foreground mb-2">{teamName}</span>
          <span className="text-emerald-500">{teamScore}</span>
        </div>
        <span className="text-muted-foreground">:</span>
        <div className="flex flex-col items-center">
          <span className="text-base md:text-lg font-sans text-muted-foreground mb-2">{opponentName}</span>
          <span className="text-rose-500">{opponentScore}</span>
        </div>
      </div>

      {/* Message */}
      {roundComplete && (
        <div className="flex items-center gap-2 text-accent text-lg">
          <Trophy className="w-6 h-6" />
          <span className="font-sans">+1 очко для {teamName}!</span>
        </div>
      )}

      {/* Start button */}
      <Button
        onClick={onStartRound}
        size="lg"
        className="px-12 py-7 text-xl rounded-full bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white font-sans font-semibold transition-smooth hover:scale-105 shadow-premium"
      >
        {roundComplete ? "Следующий раунд" : "Начать раунд"}
        <ArrowRight className="ml-2 w-6 h-6" />
      </Button>
    </div>
  );
};

export default RoundTransition;
