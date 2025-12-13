import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Trophy, Home, RotateCcw, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface VictoryScreenProps {
  winner: 'team' | 'opponent';
  teamName: string;
  opponentName: string;
  teamScore: number;
  opponentScore: number;
  onPlayAgain: () => void;
  onGoHome: () => void;
}

const VictoryScreen = ({
  winner,
  teamName,
  opponentName,
  teamScore,
  opponentScore,
  onPlayAgain,
  onGoHome
}: VictoryScreenProps) => {
  const [showConfetti, setShowConfetti] = useState(false);
  const winnerName = winner === 'team' ? teamName : opponentName;

  useEffect(() => {
    setShowConfetti(true);
    const timer = setTimeout(() => setShowConfetti(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-background/95 backdrop-blur-sm z-50">
      {/* Confetti effect */}
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {Array.from({ length: 50 }).map((_, i) => (
            <div
              key={i}
              className={cn(
                "absolute w-3 h-3 rounded-full",
                i % 4 === 0 && "bg-amber-400",
                i % 4 === 1 && "bg-violet-500",
                i % 4 === 2 && "bg-emerald-500",
                i % 4 === 3 && "bg-rose-500"
              )}
              style={{
                left: `${Math.random() * 100}%`,
                top: `-5%`,
                animation: `fall ${2 + Math.random() * 3}s linear forwards`,
                animationDelay: `${Math.random() * 2}s`
              }}
            />
          ))}
        </div>
      )}

      <div className="flex flex-col items-center gap-8 p-8 max-w-lg mx-auto text-center animate-fade-in">
        {/* Trophy icon */}
        <div className={cn(
          "relative w-32 h-32 rounded-full flex items-center justify-center",
          "bg-gradient-to-br from-amber-400 via-yellow-500 to-amber-600",
          "shadow-[0_0_60px_rgba(251,191,36,0.5)]"
        )}>
          <Trophy className="w-20 h-20 text-white" />
          <Sparkles className="absolute -top-2 -right-2 w-8 h-8 text-amber-300 animate-pulse" />
          <Sparkles className="absolute -bottom-2 -left-2 w-6 h-6 text-amber-300 animate-pulse" />
        </div>

        {/* Winner announcement */}
        <div className="space-y-2">
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 bg-clip-text text-transparent">
            ПОБЕДА!
          </h1>
          <p className="text-2xl md:text-3xl font-serif text-foreground">
            {winnerName}
          </p>
        </div>

        {/* Final score */}
        <div className="flex items-center gap-8 text-3xl font-bold py-6 px-10 bg-card rounded-2xl shadow-card">
          <div className="flex flex-col items-center">
            <span className="text-sm font-sans text-muted-foreground mb-1">{teamName}</span>
            <span className={cn(
              winner === 'team' ? "text-amber-500" : "text-muted-foreground"
            )}>
              {teamScore}
            </span>
          </div>
          <span className="text-muted-foreground/50">:</span>
          <div className="flex flex-col items-center">
            <span className="text-sm font-sans text-muted-foreground mb-1">{opponentName}</span>
            <span className={cn(
              winner === 'opponent' ? "text-amber-500" : "text-muted-foreground"
            )}>
              {opponentScore}
            </span>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          <Button
            onClick={onPlayAgain}
            size="lg"
            className="px-8 py-6 text-lg rounded-full bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white font-sans font-semibold transition-smooth hover:scale-105"
          >
            <RotateCcw className="mr-2 w-5 h-5" />
            Играть снова
          </Button>
          <Button
            onClick={onGoHome}
            variant="outline"
            size="lg"
            className="px-8 py-6 text-lg rounded-full font-sans font-semibold transition-smooth hover:scale-105"
          >
            <Home className="mr-2 w-5 h-5" />
            На главную
          </Button>
        </div>
      </div>

      {/* CSS for confetti animation */}
      <style>{`
        @keyframes fall {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default VictoryScreen;
