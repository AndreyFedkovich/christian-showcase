import { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ShadowsChallenge } from '@/data/scroll-keeper';
import { Clock, Lightbulb, Send, Volume2, VolumeX } from 'lucide-react';

interface HallOfShadowsProps {
  challenge: ShadowsChallenge;
  timer: number;
  usedHints: number;
  onUseHint: () => void;
  onSubmitAnswer: (answer: string) => void;
}

export function HallOfShadows({ 
  challenge, 
  timer, 
  usedHints, 
  onUseHint, 
  onSubmitAnswer 
}: HallOfShadowsProps) {
  const [answer, setAnswer] = useState('');
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [showCursor, setShowCursor] = useState(true);
  const [showQuestion, setShowQuestion] = useState(false);
  const indexRef = useRef(0);

  // Character-by-character typing effect
  useEffect(() => {
    indexRef.current = 0;
    setDisplayedText('');
    setIsTyping(true);
    setShowQuestion(false);
    
    const typeInterval = setInterval(() => {
      if (indexRef.current < challenge.story.length) {
        setDisplayedText(challenge.story.slice(0, indexRef.current + 1));
        indexRef.current++;
      } else {
        clearInterval(typeInterval);
        setIsTyping(false);
        setTimeout(() => setShowQuestion(true), 500);
      }
    }, 25);

    return () => clearInterval(typeInterval);
  }, [challenge.story]);

  // Cursor blinking
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 530);
    return () => clearInterval(cursorInterval);
  }, []);

  const skipTyping = () => {
    if (isTyping) {
      indexRef.current = challenge.story.length;
      setDisplayedText(challenge.story);
      setIsTyping(false);
      setTimeout(() => setShowQuestion(true), 300);
    }
  };

  const handleSubmit = () => {
    if (answer.trim()) {
      onSubmitAnswer(answer);
      setAnswer('');
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-950 overflow-hidden">
      {/* Animated shadow background */}
      <div className="absolute inset-0">
        {/* Moving shadows */}
        <div className="absolute inset-0 opacity-20">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="absolute bg-gradient-to-b from-slate-700 to-transparent rounded-full blur-3xl animate-float-slow"
              style={{
                width: `${150 + Math.random() * 200}px`,
                height: `${200 + Math.random() * 300}px`,
                left: `${i * 12}%`,
                top: `${10 + (i % 3) * 30}%`,
                animationDelay: `${i * 0.5}s`,
                animationDuration: `${8 + i}s`
              }}
            />
          ))}
        </div>

        {/* Silhouette figures */}
        <div className="absolute bottom-0 left-0 right-0 h-32 flex items-end justify-around opacity-30">
          <div className="w-16 h-24 bg-slate-800 rounded-t-full" />
          <div className="w-12 h-32 bg-slate-800 rounded-t-lg" />
          <div className="w-20 h-20 bg-slate-800 rounded-t-full" />
          <div className="w-14 h-28 bg-slate-800 rounded-t-lg" />
          <div className="w-18 h-22 bg-slate-800 rounded-t-full" />
        </div>

        {/* Light circles on floor */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-48 bg-gradient-radial from-amber-500/10 to-transparent rounded-full blur-2xl" />
      </div>

      {/* Timer and Sound Toggle */}
      <div className="absolute top-4 right-4 z-50 flex items-center gap-2">
        <button
          className="flex items-center justify-center w-10 h-10 rounded-full bg-slate-800/50 border border-slate-600/50 backdrop-blur-sm hover:bg-slate-700/50 transition-colors"
        >
          <VolumeX className="w-5 h-5 text-slate-500" />
        </button>
        <div className={cn(
          "flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-sm",
          timer <= 10 ? "bg-red-900/50 border border-red-500/50" : "bg-slate-800/50 border border-slate-600/50"
        )}>
          <Clock className={cn("w-5 h-5", timer <= 10 ? "text-red-400 animate-pulse" : "text-amber-400")} />
          <span className={cn("text-xl font-mono font-bold", timer <= 10 ? "text-red-400" : "text-white")}>
            {timer}с
          </span>
        </div>
      </div>

      {/* Hall icon */}
      <div className="absolute top-4 left-4 z-50">
        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800/50 border border-slate-600/50 backdrop-blur-sm">
          <span className="text-2xl">🎭</span>
          <span className="text-slate-300 font-medium">Зал Теней</span>
        </div>
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-8">
        <div className="max-w-3xl w-full space-y-8">
          {/* Story container */}
          <div className="relative">
            {/* Decorative frame */}
            <div className="absolute -inset-4 border-2 border-slate-700/50 rounded-2xl" />
            <div className="absolute -inset-2 border border-slate-600/30 rounded-xl" />
            
            <div className="relative bg-slate-900/80 p-8 rounded-xl backdrop-blur-sm">
              {/* Story text */}
              <div 
                className="min-h-[150px] relative cursor-pointer" 
                onClick={skipTyping}
                title={isTyping ? "Нажмите, чтобы пропустить" : ""}
              >
                <p className="text-slate-200 text-lg md:text-xl leading-relaxed">
                  {displayedText}
                  {isTyping && (
                    <span 
                      className={cn(
                        "inline-block w-0.5 h-5 ml-1 bg-amber-400 transition-opacity duration-100",
                        showCursor ? "opacity-100" : "opacity-0"
                      )} 
                    />
                  )}
                </p>

                {/* Shadow overlay during reveal */}
                {isTyping && (
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent pointer-events-none" />
                )}
              </div>

              {/* Question */}
              {showQuestion && (
                <div className="mt-6 pt-6 border-t border-slate-700 animate-fade-in">
                  <p className="text-amber-400 text-xl md:text-2xl font-medium text-center">
                    {challenge.question}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Hints */}
          {challenge.hints && showQuestion && (
            <div className="space-y-3">
              {usedHints > 0 && (
                <div className="space-y-2">
                  {challenge.hints.slice(0, usedHints).map((hint, i) => (
                    <div 
                      key={i} 
                      className="flex items-center gap-2 text-slate-400 bg-slate-800/50 px-4 py-2 rounded-lg animate-fade-in"
                    >
                      <Lightbulb className="w-4 h-4 text-amber-400" />
                      <span>{hint}</span>
                    </div>
                  ))}
                </div>
              )}
              
              {usedHints < challenge.hints.length && (
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={onUseHint}
                  className="border-slate-600 text-slate-400 hover:bg-slate-800 hover:text-slate-300"
                >
                  <Lightbulb className="w-4 h-4 mr-2" />
                  Подсказка ({challenge.hints.length - usedHints} осталось)
                </Button>
              )}
            </div>
          )}

          {/* Answer input */}
          {showQuestion && (
            <div className="flex gap-4 animate-fade-in">
              <Input
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                placeholder="Ваш ответ..."
                className="flex-1 bg-slate-800/50 border-slate-600 text-white text-lg py-6 placeholder:text-slate-500"
                autoFocus
              />
              <Button 
                onClick={handleSubmit}
                disabled={!answer.trim()}
                size="lg"
                className="bg-amber-600 hover:bg-amber-700 text-white px-8"
              >
                <Send className="w-5 h-5" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
