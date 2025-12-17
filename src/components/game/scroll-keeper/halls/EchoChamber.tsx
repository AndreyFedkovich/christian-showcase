import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { EchoChallenge } from '@/data/scroll-keeper';
import { Clock, Volume2, Send, Key, ChevronRight } from 'lucide-react';

interface EchoChamberProps {
  challenge: EchoChallenge;
  timer: number;
  usedHints: number;
  onUseHint: () => void;
  onSubmitAnswer: (answer: string) => void;
}

export function EchoChamber({ 
  challenge, 
  timer, 
  usedHints, 
  onUseHint, 
  onSubmitAnswer 
}: EchoChamberProps) {
  const [answer, setAnswer] = useState('');
  const currentPoints = Math.max(1, challenge.maxPoints - usedHints);

  const handleSubmit = () => {
    if (answer.trim()) {
      onSubmitAnswer(answer);
      setAnswer('');
    }
  };

  return (
    <div className="fixed inset-0 bg-gradient-to-b from-slate-950 via-purple-950/20 to-slate-950 overflow-hidden">
      {/* Echo wave effects */}
      <div className="absolute inset-0">
        {/* Concentric echo circles */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-purple-500/20"
              style={{
                width: `${200 + i * 150}px`,
                height: `${200 + i * 150}px`,
                animation: `pulse ${3 + i * 0.5}s ease-in-out infinite`,
                animationDelay: `${i * 0.3}s`
              }}
            />
          ))}
        </div>

        {/* Sound wave particles */}
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-purple-400/30 rounded-full animate-float-slow"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${4 + Math.random() * 4}s`
            }}
          />
        ))}

        {/* Mystery doors */}
        <div className="absolute bottom-20 left-0 right-0 flex justify-around px-8 opacity-30">
          {['⏳', '🌸', '⚔️', '👑'].map((symbol, i) => (
            <div 
              key={i}
              className={cn(
                "w-16 h-24 md:w-24 md:h-36 rounded-t-full flex items-center justify-center text-2xl md:text-3xl",
                i <= usedHints ? "bg-slate-800 border-2 border-slate-600" : "bg-purple-900/50 border-2 border-purple-500/30"
              )}
            >
              {symbol}
            </div>
          ))}
        </div>

        {/* Central spotlight */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-64 h-96 bg-gradient-to-b from-purple-500/10 via-transparent to-transparent blur-3xl" />
      </div>

      {/* Timer */}
      <div className="absolute top-4 right-4 z-50">
        <div className={cn(
          "flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-sm",
          timer <= 10 ? "bg-red-900/50 border border-red-500/50" : "bg-purple-900/50 border border-purple-500/50"
        )}>
          <Clock className={cn("w-5 h-5", timer <= 10 ? "text-red-400 animate-pulse" : "text-purple-400")} />
          <span className={cn("text-xl font-mono font-bold", timer <= 10 ? "text-red-400" : "text-purple-200")}>
            {timer}с
          </span>
        </div>
      </div>

      {/* Hall icon */}
      <div className="absolute top-4 left-4 z-50">
        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-purple-900/50 border border-purple-500/50 backdrop-blur-sm">
          <span className="text-2xl">🔊</span>
          <span className="text-purple-200 font-medium">Комната Эха</span>
        </div>
      </div>

      {/* Points indicator */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50">
        <div className="flex items-center gap-2 px-6 py-2 rounded-full bg-slate-900/80 border border-amber-500/50 backdrop-blur-sm">
          <Key className="w-5 h-5 text-amber-400" />
          <span className="text-amber-400 font-bold text-lg">{currentPoints}</span>
          <span className="text-slate-400 text-sm">очков за ответ</span>
        </div>
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-8">
        <div className="max-w-2xl w-full space-y-8">
          {/* Instructions */}
          <div className="text-center mb-4">
            <p className="text-purple-300 text-lg">
              Угадайте по подсказкам. Чем меньше подсказок — тем больше очков!
            </p>
          </div>

          {/* Clues container */}
          <div className="space-y-4">
            {challenge.clues.slice(0, usedHints + 1).map((clue, i) => (
              <div 
                key={i}
                className={cn(
                  "relative p-6 rounded-xl border backdrop-blur-sm animate-fade-in",
                  i === usedHints 
                    ? "bg-purple-900/40 border-purple-500/50 shadow-[0_0_30px_rgba(168,85,247,0.2)]" 
                    : "bg-slate-800/40 border-slate-600/50"
                )}
                style={{ animationDelay: `${i * 0.2}s` }}
              >
                {/* Echo number */}
                <div className={cn(
                  "absolute -left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold",
                  i === usedHints 
                    ? "bg-purple-600 text-white shadow-[0_0_15px_rgba(168,85,247,0.5)]" 
                    : "bg-slate-700 text-slate-400"
                )}>
                  {i + 1}
                </div>

                {/* Clue text */}
                <div className="flex items-center gap-3 ml-6">
                  <Volume2 className={cn(
                    "w-5 h-5 flex-shrink-0",
                    i === usedHints ? "text-purple-400 animate-pulse" : "text-slate-500"
                  )} />
                  <p className={cn(
                    "text-lg md:text-xl",
                    i === usedHints ? "text-purple-100" : "text-slate-400"
                  )}>
                    {clue}
                  </p>
                </div>

                {/* Echo effect line */}
                {i === usedHints && (
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 flex gap-1">
                    {Array.from({ length: 3 }).map((_, j) => (
                      <div 
                        key={j}
                        className="w-1 bg-purple-400 rounded-full animate-pulse"
                        style={{ 
                          height: `${12 + j * 6}px`,
                          animationDelay: `${j * 0.15}s`
                        }}
                      />
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Next clue button */}
          {usedHints < challenge.clues.length - 1 && (
            <div className="flex justify-center">
              <Button 
                variant="outline" 
                onClick={onUseHint}
                className="border-purple-500/50 text-purple-300 hover:bg-purple-900/50 hover:text-purple-200 group"
              >
                <ChevronRight className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-transform" />
                Следующая подсказка
                <span className="ml-2 text-purple-500">(-1 очко)</span>
              </Button>
            </div>
          )}

          {/* Answer input */}
          <div className="flex gap-4 pt-4">
            <Input
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
              placeholder="Ваш ответ..."
              className="flex-1 bg-purple-900/30 border-purple-500/50 text-white text-lg py-6 placeholder:text-purple-300/50 focus:border-purple-400"
              autoFocus
            />
            <Button 
              onClick={handleSubmit}
              disabled={!answer.trim()}
              size="lg"
              className="bg-purple-600 hover:bg-purple-700 text-white px-8 shadow-[0_0_20px_rgba(168,85,247,0.3)]"
            >
              <Send className="w-5 h-5" />
            </Button>
          </div>

          {/* Points breakdown */}
          <div className="flex justify-center gap-4 text-sm">
            {challenge.clues.map((_, i) => (
              <div 
                key={i}
                className={cn(
                  "px-3 py-1 rounded-full",
                  i <= usedHints 
                    ? "bg-slate-700/50 text-slate-500 line-through" 
                    : "bg-purple-900/30 text-purple-300 border border-purple-500/30"
                )}
              >
                {challenge.maxPoints - i} {i === 0 ? 'очка' : i < 4 ? 'очка' : 'очко'}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
