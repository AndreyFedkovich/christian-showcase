import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { GalleryChallenge } from '@/data/scroll-keeper';
import { Clock, Send, User, Quote } from 'lucide-react';

interface GalleryOfWitnessesProps {
  challenge: GalleryChallenge;
  timer: number;
  onSubmitAnswer: (answer: string) => void;
}

export function GalleryOfWitnesses({ 
  challenge, 
  timer, 
  onSubmitAnswer 
}: GalleryOfWitnessesProps) {
  const [answer, setAnswer] = useState('');
  const [monologueProgress, setMonologueProgress] = useState(0);
  const [showInput, setShowInput] = useState(false);

  // Animate monologue reveal
  useEffect(() => {
    const words = challenge.monologue.split(' ');
    const wordsPerChunk = 3;
    const totalChunks = Math.ceil(words.length / wordsPerChunk);
    
    if (monologueProgress < totalChunks) {
      const timer = setTimeout(() => {
        setMonologueProgress(prev => prev + 1);
      }, 120);
      return () => clearTimeout(timer);
    } else if (!showInput) {
      const timer = setTimeout(() => setShowInput(true), 800);
      return () => clearTimeout(timer);
    }
  }, [monologueProgress, challenge.monologue, showInput]);

  const displayedMonologue = () => {
    const words = challenge.monologue.split(' ');
    const wordsPerChunk = 3;
    const visibleWords = words.slice(0, monologueProgress * wordsPerChunk);
    return visibleWords.join(' ');
  };

  const handleSubmit = () => {
    if (answer.trim()) {
      onSubmitAnswer(answer);
      setAnswer('');
    }
  };

  return (
    <div className="fixed inset-0 bg-gradient-to-b from-slate-950 via-rose-950/20 to-slate-950 overflow-hidden">
      {/* Gallery background */}
      <div className="absolute inset-0">
        {/* Hanging portrait frames */}
        <div className="absolute top-0 left-0 right-0 flex justify-around px-8 pt-8">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="relative">
              {/* Frame rope */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-8 bg-gradient-to-b from-amber-600 to-amber-800" />
              {/* Frame */}
              <div 
                className={cn(
                  "w-20 h-28 md:w-28 md:h-40 mt-8 rounded-sm border-4 overflow-hidden",
                  i === 2 ? "border-amber-500 shadow-[0_0_30px_rgba(251,191,36,0.3)]" : "border-amber-800/50"
                )}
              >
                {/* Blurred portrait silhouette */}
                <div className={cn(
                  "w-full h-full flex items-center justify-center",
                  i === 2 
                    ? "bg-gradient-to-b from-rose-900/60 via-rose-800/40 to-slate-900/60 backdrop-blur-sm" 
                    : "bg-slate-800/50"
                )}>
                  <User className={cn(
                    "w-10 h-10 md:w-14 md:h-14",
                    i === 2 ? "text-rose-300/40 animate-pulse" : "text-slate-600/30"
                  )} />
                </div>
              </div>
              {/* Frame nameplate */}
              <div className={cn(
                "w-16 h-3 md:w-20 md:h-4 mx-auto mt-2 rounded-sm",
                i === 2 ? "bg-amber-600/50" : "bg-amber-900/30"
              )} />
            </div>
          ))}
        </div>

        {/* Dim ambient lights */}
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-32 h-32 bg-rose-500/10 rounded-full blur-3xl animate-pulse"
            style={{
              left: `${15 + i * 25}%`,
              top: `${30 + (i % 2) * 20}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${3 + i}s`
            }}
          />
        ))}

        {/* Floor reflection */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-900/80 via-slate-900/40 to-transparent" />
      </div>

      {/* Timer */}
      <div className="absolute top-4 right-4 z-50">
        <div className={cn(
          "flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-sm",
          timer <= 10 ? "bg-red-900/50 border border-red-500/50" : "bg-rose-900/50 border border-rose-500/50"
        )}>
          <Clock className={cn("w-5 h-5", timer <= 10 ? "text-red-400 animate-pulse" : "text-rose-300")} />
          <span className={cn("text-xl font-mono font-bold", timer <= 10 ? "text-red-400" : "text-rose-100")}>
            {timer}с
          </span>
        </div>
      </div>

      {/* Hall icon */}
      <div className="absolute top-4 left-4 z-50">
        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-rose-900/50 border border-rose-500/50 backdrop-blur-sm">
          <span className="text-2xl">🖼️</span>
          <span className="text-rose-200 font-medium">Галерея Свидетелей</span>
        </div>
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-8 pt-56">
        <div className="max-w-2xl w-full space-y-8">
          {/* Monologue container */}
          <div className="relative">
            {/* Glowing portrait frame (active) */}
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-24 h-32 md:w-32 md:h-44 rounded-lg border-4 border-amber-500/60 shadow-[0_0_40px_rgba(251,191,36,0.2)] overflow-hidden">
              <div className="w-full h-full bg-gradient-to-b from-rose-800/40 via-rose-900/30 to-slate-900/60 backdrop-blur-md flex items-center justify-center">
                <User className="w-12 h-12 md:w-16 md:h-16 text-rose-300/30" />
              </div>
              {/* Mystery glow */}
              <div className="absolute inset-0 bg-gradient-radial from-rose-500/10 to-transparent animate-pulse" />
            </div>

            {/* Speech bubble / Monologue box */}
            <div className="relative bg-slate-900/80 backdrop-blur-sm p-8 pt-40 md:pt-48 rounded-2xl border border-rose-500/30 shadow-xl">
              {/* Decorative quotes at top */}
              <div className="flex items-center justify-center h-[80px]">
                <span className="text-[7rem] md:text-[9rem] lg:text-[12rem] text-accent font-serif leading-none">“</span>
              </div>

              {/* Monologue text */}
              <div className="min-h-[120px] relative px-4">
                <p className="text-rose-100 text-lg md:text-xl leading-relaxed italic font-serif">
                  {displayedMonologue()}
                  {monologueProgress < Math.ceil(challenge.monologue.split(' ').length / 3) && (
                    <span className="inline-block w-2 h-5 ml-1 bg-rose-400 animate-blink" />
                  )}
                </p>
              </div>

              {/* Question prompt */}
              {showInput && (
                <div className="mt-6 pt-6 border-t border-rose-800/50 animate-fade-in">
                  <p className="text-rose-300 text-center text-lg font-medium">
                    Кто это говорит?
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Book reference hint */}
          {challenge.bookReference && showInput && (
            <div className="text-center text-rose-400/60 text-sm animate-fade-in">
              Подсказка: {challenge.bookReference}
            </div>
          )}

          {/* Answer input */}
          {showInput && (
            <div className="flex gap-4 animate-fade-in">
              <Input
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                placeholder="Имя свидетеля..."
                className="flex-1 bg-rose-950/50 border-rose-500/50 text-white text-lg py-6 placeholder:text-rose-300/50 focus:border-rose-400"
                autoFocus
              />
              <Button 
                onClick={handleSubmit}
                disabled={!answer.trim()}
                size="lg"
                className="bg-rose-600 hover:bg-rose-700 text-white px-8 shadow-[0_0_20px_rgba(244,63,94,0.3)]"
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
