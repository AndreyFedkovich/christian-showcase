import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";

interface AnswerInputProps {
  onSubmit: (answer: string) => void;
  disabled?: boolean;
}

const AnswerInput = ({ onSubmit, disabled }: AnswerInputProps) => {
  const [answer, setAnswer] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!disabled && inputRef.current) {
      inputRef.current.focus();
    }
  }, [disabled]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (answer.trim() && !disabled) {
      onSubmit(answer.trim());
      setAnswer("");
    }
  };

  return (
    <form 
      onSubmit={handleSubmit}
      className="w-full max-w-xl mx-auto"
    >
      <div className="flex gap-3">
        <Input
          ref={inputRef}
          type="text"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="Введите ваш ответ..."
          disabled={disabled}
          className="flex-1 h-14 text-lg px-6 rounded-full border-2 border-border focus:border-accent bg-card"
        />
        <Button
          type="submit"
          disabled={disabled || !answer.trim()}
          size="lg"
          className="h-14 px-8 rounded-full gradient-gold hover:opacity-90 transition-smooth"
        >
          <Send className="w-5 h-5" />
        </Button>
      </div>
    </form>
  );
};

export default AnswerInput;
