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
    <div className="flex flex-col items-center gap-8 animate-fade-in">
      {/* Round indicator */}
      <div className={cn(
        "flex flex-col items-center gap-2",
        "p-8 rounded-2xl",
        "bg-gradient-to-br from-violet-600/20 via-purple-600/20 to-indigo-700/20",
        "border-2 border-accent/30"
      )}>
        <span className="text-lg font-sans text-muted-foreground uppercase tracking-wider">
          {roundComplete ? "Раунд завершён" : "Приготовьтесь"}
        </span>
        <h2 className="text-5xl md:text-6xl font-bold text-foreground">
          Раунд {roundNumber}
        </h2>
      </div>

      {/* Current score */}
      <div className="flex items-center gap-6 text-2xl font-bold">
        <div className="flex flex-col items-center">
          <span className="text-sm font-sans text-muted-foreground mb-1">{teamName}</span>
          <span className="text-emerald-600">{teamScore}</span>
        </div>
        <span className="text-muted-foreground">:</span>
        <div className="flex flex-col items-center">
          <span className="text-sm font-sans text-muted-foreground mb-1">{opponentName}</span>
          <span className="text-rose-600">{opponentScore}</span>
        </div>
      </div>

      {/* Message */}
      {roundComplete && (
        <div className="flex items-center gap-2 text-accent">
          <Trophy className="w-5 h-5" />
          <span className="font-sans">+1 очко для {teamName}!</span>
        </div>
      )}

      {/* Start button */}
      <Button
        onClick={onStartRound}
        size="lg"
        className="px-10 py-6 text-lg rounded-full bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white font-sans font-semibold transition-smooth hover:scale-105 shadow-premium"
      >
        {roundComplete ? "Следующий раунд" : "Начать раунд"}
        <ArrowRight className="ml-2 w-5 h-5" />
      </Button>
    </div>
  );
};

export default RoundTransition;
