import { CheckCircle2, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface AnswerResultProps {
  isCorrect: boolean;
  correctAnswer: string;
  teamName: string;
  opponentName: string;
  onContinue: () => void;
}

const AnswerResult = ({ 
  isCorrect, 
  correctAnswer, 
  teamName,
  opponentName,
  onContinue 
}: AnswerResultProps) => {
  return (
    <div className={cn(
      "flex flex-col items-center gap-6 p-8 rounded-2xl",
      "animate-fade-in",
      isCorrect 
        ? "bg-emerald-500/10 border-2 border-emerald-500/30" 
        : "bg-rose-500/10 border-2 border-rose-500/30"
    )}>
      {/* Icon */}
      <div className={cn(
        "w-24 h-24 rounded-full flex items-center justify-center",
        isCorrect ? "bg-emerald-500/20" : "bg-rose-500/20"
      )}>
        {isCorrect ? (
          <CheckCircle2 className="w-16 h-16 text-emerald-500" />
        ) : (
          <XCircle className="w-16 h-16 text-rose-500" />
        )}
      </div>

      {/* Message */}
      <div className="text-center space-y-2">
        <h3 className={cn(
          "text-3xl md:text-4xl font-bold",
          isCorrect ? "text-emerald-600" : "text-rose-600"
        )}>
          {isCorrect ? "Верно!" : "Неверно!"}
        </h3>
        
        {!isCorrect && (
          <p className="text-lg text-muted-foreground font-sans">
            Правильный ответ: <span className="font-semibold text-foreground">{correctAnswer}</span>
          </p>
        )}

        <p className={cn(
          "text-base font-sans mt-4",
          isCorrect ? "text-emerald-600" : "text-rose-600"
        )}>
          {isCorrect 
            ? "Отлично! Продолжайте в том же духе!" 
            : `+1 очко для "${opponentName}"`
          }
        </p>
      </div>

      {/* Continue button */}
      <Button
        onClick={onContinue}
        size="lg"
        className={cn(
          "mt-4 px-8 rounded-full font-sans font-semibold transition-smooth hover:scale-105",
          isCorrect 
            ? "bg-emerald-600 hover:bg-emerald-700 text-white" 
            : "bg-rose-600 hover:bg-rose-700 text-white"
        )}
      >
        Продолжить
      </Button>
    </div>
  );
};

export default AnswerResult;
