import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { QuestionCategory, categoryLabels, categoryIcons } from "@/data/bible-questions";

interface TopicRevealProps {
  category: QuestionCategory;
  onContinue: () => void;
}

const TopicReveal = ({ category, onContinue }: TopicRevealProps) => {
  return (
    <div className="flex flex-col items-center gap-8 animate-fade-in">
      {/* Topic card */}
      <div className={cn(
        "flex flex-col items-center gap-4 p-10 rounded-3xl",
        "bg-gradient-to-br from-violet-600/20 via-purple-600/20 to-indigo-700/20",
        "border-2 border-accent/50"
      )}>
        {/* Icon */}
        <span className="text-7xl">{categoryIcons[category]}</span>

        {/* Label */}
        <h2 className="text-3xl md:text-4xl font-bold text-foreground">
          {categoryLabels[category]}
        </h2>
      </div>

      {/* Continue button */}
      <Button
        onClick={onContinue}
        size="lg"
        className="px-10 py-6 text-lg rounded-full gradient-gold hover:opacity-90 font-sans font-semibold transition-smooth hover:scale-105 shadow-premium"
      >
        Показать вопрос
      </Button>
    </div>
  );
};

export default TopicReveal;
