import { cn } from "@/lib/utils";

interface GameTimerProps {
  timeRemaining: number;
  totalTime: number;
  isActive: boolean;
}

const GameTimer = ({ timeRemaining, totalTime, isActive }: GameTimerProps) => {
  const percentage = (timeRemaining / totalTime) * 100;
  const circumference = 2 * Math.PI * 45; // radius = 45
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  const isCritical = timeRemaining <= 5;
  const isWarning = timeRemaining <= 10 && !isCritical;

  return (
    <div className="relative w-28 h-28 md:w-36 md:h-36">
      {/* Background circle */}
      <svg className="w-full h-full transform -rotate-90">
        <circle
          cx="50%"
          cy="50%"
          r="45%"
          fill="none"
          stroke="currentColor"
          strokeWidth="8"
          className="text-muted/30"
        />
        {/* Progress circle */}
        <circle
          cx="50%"
          cy="50%"
          r="45%"
          fill="none"
          stroke="currentColor"
          strokeWidth="8"
          strokeLinecap="round"
          className={cn(
            "transition-all duration-1000",
            isCritical ? "text-rose-500" : isWarning ? "text-amber-500" : "text-emerald-500"
          )}
          style={{
            strokeDasharray: circumference,
            strokeDashoffset: strokeDashoffset
          }}
        />
      </svg>

      {/* Time text */}
      <div className={cn(
        "absolute inset-0 flex items-center justify-center",
        "text-3xl md:text-4xl font-bold",
        isCritical && isActive && "animate-pulse",
        isCritical ? "text-rose-500" : isWarning ? "text-amber-500" : "text-foreground"
      )}>
        {timeRemaining}
      </div>

      {/* Pulse effect when critical */}
      {isCritical && isActive && (
        <div className="absolute inset-0 rounded-full bg-rose-500/20 animate-ping" />
      )}
    </div>
  );
};

export default GameTimer;
