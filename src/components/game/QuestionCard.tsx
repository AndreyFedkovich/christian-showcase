import { Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { 
  BibleQuestion, 
  categoryLabels, 
  categoryIcons,
  Difficulty 
} from "@/data/bible-questions";

interface QuestionCardProps {
  question: BibleQuestion;
  questionNumber: number;
  totalQuestions: number;
}

const QuestionCard = ({ question, questionNumber, totalQuestions }: QuestionCardProps) => {
  const renderStars = (difficulty: Difficulty) => {
    return Array.from({ length: difficulty }).map((_, i) => (
      <Star key={i} className="w-4 h-4 fill-accent text-accent" />
    ));
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className={cn(
        "bg-card rounded-2xl p-6 md:p-8 shadow-card",
        "border border-border/50",
        "animate-fade-in"
      )}>
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          {/* Category badge */}
          <div className="flex items-center gap-2 px-3 py-1.5 bg-muted rounded-full">
            <span>{categoryIcons[question.category]}</span>
            <span className="text-sm font-sans text-muted-foreground">
              {categoryLabels[question.category]}
            </span>
          </div>

          {/* Difficulty stars */}
          <div className="flex items-center gap-1">
            {renderStars(question.difficulty)}
          </div>
        </div>

        {/* Progress indicator */}
        <div className="flex items-center gap-2 mb-4">
          <span className="text-sm font-sans text-muted-foreground">
            Вопрос {questionNumber} из {totalQuestions}
          </span>
          <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
            <div 
              className="h-full bg-accent transition-all duration-300 rounded-full"
              style={{ width: `${(questionNumber / totalQuestions) * 100}%` }}
            />
          </div>
        </div>

        {/* Question text */}
        <div className="min-h-[100px] flex items-center justify-center">
          <h2 className="text-xl md:text-2xl font-serif text-center text-foreground leading-relaxed">
            {question.question}
          </h2>
        </div>

        {/* Reference (optional) */}
        {question.reference && (
          <div className="mt-4 text-center">
            <span className="text-sm font-sans text-muted-foreground/60">
              📖 {question.reference}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuestionCard;
