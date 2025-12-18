import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Difficulty, difficultyLabels, difficultyConfig } from "@/data/bible-questions";

interface DifficultyRevealProps {
  difficulty: Difficulty;
  onContinue: () => void;
}

const DifficultyReveal = ({ difficulty, onContinue }: DifficultyRevealProps) => {
  const config = difficultyConfig[difficulty];
  const label = difficultyLabels[difficulty];

  const colorClasses = {
    1: "from-emerald-500/20 to-green-500/20 border-emerald-500/50",
    2: "from-amber-500/20 to-orange-500/20 border-amber-500/50",
    3: "from-rose-500/20 to-red-500/20 border-rose-500/50"
  };

  const textColors = {
    1: "text-emerald-600",
    2: "text-amber-600",
    3: "text-rose-600"
  };

  return (
    <div className="flex flex-col items-center gap-8 animate-fade-in">
      {/* Difficulty card */}
      <div className={cn(
        "flex flex-col items-center gap-4 p-10 rounded-3xl",
        "bg-gradient-to-br border-2",
        colorClasses[difficulty]
      )}>
        {/* Stars */}
        <div className="flex gap-2">
          {Array.from({ length: difficulty }).map((_, i) => (
            <Star 
              key={i} 
              className={cn(
                "w-10 h-10 fill-current",
                textColors[difficulty]
              )} 
            />
          ))}
        </div>

        {/* Label */}
        <h2 className={cn(
          "text-4xl md:text-5xl font-bold",
          textColors[difficulty]
        )}>
          {label}
        </h2>

        {/* Info */}
        <div className="flex flex-col items-center gap-1 mt-2">
          <span className="text-lg font-sans text-muted-foreground">
            {config.questions} {config.questions === 1 ? 'вопрос' : config.questions === 3 ? 'вопроса' : 'вопроса'}
          </span>
          <span className="text-lg font-sans text-muted-foreground">
            {config.time} секунд на ответ
          </span>
        </div>
      </div>

      {/* Continue button */}
      <Button
        onClick={onContinue}
        size="lg"
        className="px-10 py-6 text-lg rounded-full gradient-gold hover:opacity-90 font-sans font-semibold transition-smooth hover:scale-105 shadow-premium"
      >
        Выбрать тему
      </Button>
    </div>
  );
};

export default DifficultyReveal;
