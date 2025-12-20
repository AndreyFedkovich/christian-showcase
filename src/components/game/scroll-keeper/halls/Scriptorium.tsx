import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScriptoriumChallenge } from '@/data/scroll-keeper';
import { Clock, BookOpen, Lightbulb, Send, Scroll, Loader2 } from 'lucide-react';

interface ScriptoriumProps {
  challenge: ScriptoriumChallenge;
  timer: number;
  usedHints: number;
  isChecking?: boolean;
  onUseHint: () => void;
  onSubmitAnswer: (answer: string) => void;
}

export function Scriptorium({ 
  challenge, 
  timer, 
  usedHints,
  isChecking,
  onUseHint, 
  onSubmitAnswer 
}: ScriptoriumProps) {
  const [answer, setAnswer] = useState('');

  const handleSubmit = () => {
    if (answer.trim()) {
      onSubmitAnswer(answer);
      setAnswer('');
    }
  };

  return (
    <div className="fixed inset-0 bg-gradient-to-b from-amber-950 via-amber-900/30 to-slate-950 overflow-hidden">
      {/* Ambient candle light effects */}
      <div className="absolute inset-0">
        {/* Candle glows */}
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-32 h-32 bg-amber-500/20 rounded-full blur-3xl animate-pulse"
            style={{
              left: `${10 + i * 15}%`,
              top: `${10 + (i % 2) * 20}%`,
              animationDelay: `${i * 0.3}s`,
              animationDuration: `${2 + Math.random()}s`
            }}
          />
        ))}

        {/* Smoke/dust particles */}
        <div className="absolute inset-0 opacity-30">
          {Array.from({ length: 15 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-amber-200 rounded-full animate-float-slow"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${6 + Math.random() * 4}s`
              }}
            />
          ))}
        </div>

        {/* Bookshelf silhouettes */}
        <div className="absolute left-0 top-0 bottom-0 w-24 opacity-40">
          <div className="h-full flex flex-col justify-around p-2">
            {Array.from({ length: 12 }).map((_, i) => (
              <div 
                key={i} 
                className="h-6 bg-gradient-to-r from-amber-900 to-amber-800 rounded-r"
                style={{ width: `${60 + Math.random() * 40}%` }}
              />
            ))}
          </div>
        </div>
        <div className="absolute right-0 top-0 bottom-0 w-24 opacity-40">
          <div className="h-full flex flex-col justify-around p-2">
            {Array.from({ length: 12 }).map((_, i) => (
              <div 
                key={i} 
                className="h-6 bg-gradient-to-l from-amber-900 to-amber-800 rounded-l ml-auto"
                style={{ width: `${60 + Math.random() * 40}%` }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Timer */}
      <div className="absolute top-4 right-4 z-50">
        <div className={cn(
          "flex items-center gap-2 px-5 py-3 rounded-full backdrop-blur-sm",
          timer <= 10 ? "bg-red-900/50 border border-red-500/50" : "bg-amber-900/50 border border-amber-600/50"
        )}>
          <Clock className={cn("w-6 h-6", timer <= 10 ? "text-red-400 animate-pulse" : "text-amber-400")} />
          <span className={cn("text-2xl font-mono font-bold", timer <= 10 ? "text-red-400" : "text-amber-200")}>
            {timer}с
          </span>
        </div>
      </div>

      {/* Hall icon */}
      <div className="absolute top-4 left-4 z-50">
        <div className="flex items-center gap-3 px-5 py-3 rounded-full bg-amber-900/50 border border-amber-600/50 backdrop-blur-sm">
          <span className="text-3xl">📜</span>
          <span className="text-amber-200 font-semibold text-lg">Скрипторий</span>
        </div>
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-8">
        <div className="max-w-3xl w-full space-y-8">
          {/* Parchment/Scroll container */}
          <div className="relative">
            {/* Scroll ends */}
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-[calc(100%+2rem)] h-8 bg-gradient-to-b from-amber-800 to-amber-900 rounded-t-lg shadow-lg" />
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-[calc(100%+2rem)] h-8 bg-gradient-to-t from-amber-800 to-amber-900 rounded-b-lg shadow-lg" />
            
            {/* Scroll rods */}
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-[calc(100%+4rem)] h-4 bg-amber-700 rounded-full shadow-md">
              <div className="absolute left-2 top-1/2 -translate-y-1/2 w-3 h-3 bg-amber-600 rounded-full" />
              <div className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 bg-amber-600 rounded-full" />
            </div>
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-[calc(100%+4rem)] h-4 bg-amber-700 rounded-full shadow-md">
              <div className="absolute left-2 top-1/2 -translate-y-1/2 w-3 h-3 bg-amber-600 rounded-full" />
              <div className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 bg-amber-600 rounded-full" />
            </div>
            
            {/* Parchment body */}
            <div className="relative bg-gradient-to-b from-amber-100 via-amber-50 to-amber-100 p-10 md:p-14 shadow-2xl">
              {/* Parchment texture */}
              <div className="absolute inset-0 opacity-20 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIj48ZmlsdGVyIGlkPSJub2lzZSI+PGZlVHVyYnVsZW5jZSB0eXBlPSJmcmFjdGFsTm9pc2UiIGJhc2VGcmVxdWVuY3k9IjAuOCIgbnVtT2N0YXZlcz0iNCIgc3RpdGNoVGlsZXM9InN0aXRjaCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbHRlcj0idXJsKCNub2lzZSkiIG9wYWNpdHk9IjAuNSIvPjwvc3ZnPg==')]" />
              
              {/* Verse icon */}
              <div className="flex justify-center mb-6">
                <Scroll className="w-12 h-12 text-amber-700 opacity-50" />
              </div>

              {/* Verse text */}
              <blockquote className="text-amber-950 text-2xl md:text-3xl leading-relaxed font-serif text-center italic">
                «{challenge.verse}»
              </blockquote>

              {/* Decorative line */}
              <div className="flex items-center justify-center gap-4 my-8">
                <div className="flex-1 h-px bg-amber-700/30" />
                <BookOpen className="w-6 h-6 text-amber-700/50" />
                <div className="flex-1 h-px bg-amber-700/30" />
              </div>

              {/* Question */}
              <p className="text-amber-800 text-xl md:text-2xl font-medium text-center">
                Из какой книги Библии этот стих?
              </p>
            </div>
          </div>

          {/* Hints section */}
          <div className="space-y-3">
            {usedHints >= 1 && (
              <div className="flex items-center gap-3 text-amber-200 bg-amber-900/50 px-5 py-4 rounded-lg border border-amber-600/30 animate-fade-in">
                <Lightbulb className="w-6 h-6 text-amber-400" />
                <span className="text-lg">Завет: <strong>{challenge.hints.testament}</strong></span>
              </div>
            )}
            
            {usedHints >= 2 && (
              <div className="flex items-center gap-3 text-amber-200 bg-amber-900/50 px-5 py-4 rounded-lg border border-amber-600/30 animate-fade-in">
                <BookOpen className="w-6 h-6 text-amber-400" />
                <span className="text-lg">Тип книги: <strong>{challenge.hints.bookType}</strong></span>
              </div>
            )}

            {usedHints < 2 && (
              <div className="flex gap-2">
                {usedHints === 0 && (
                  <Button 
                    variant="outline" 
                    size="lg"
                    onClick={onUseHint}
                    className="border-amber-600/50 text-amber-300 hover:bg-amber-900/50 hover:text-amber-200 text-base"
                  >
                    <Lightbulb className="w-5 h-5 mr-2" />
                    Подсказка: Завет
                  </Button>
                )}
                {usedHints === 1 && (
                  <Button 
                    variant="outline" 
                    size="lg"
                    onClick={onUseHint}
                    className="border-amber-600/50 text-amber-300 hover:bg-amber-900/50 hover:text-amber-200 text-base"
                  >
                    <BookOpen className="w-5 h-5 mr-2" />
                    Подсказка: Тип книги
                  </Button>
                )}
              </div>
            )}
          </div>

          {/* Answer input */}
          <div className="flex gap-4">
            <Input
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
              placeholder="Название книги..."
              className="flex-1 bg-amber-900/50 border-amber-600/50 text-white md:text-xl py-8 placeholder:text-amber-300/50"
              autoFocus
            />
            <Button 
              onClick={handleSubmit}
              disabled={!answer.trim()}
              size="xl"
              className="bg-amber-600 hover:bg-amber-700 text-white px-10 py-6"
            >
              {isChecking ? <Loader2 className="w-6 h-6 animate-spin" /> : <Send className="w-6 h-6" />}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
