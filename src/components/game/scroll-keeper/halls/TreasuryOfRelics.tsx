import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { TreasuryChallenge } from '@/data/scroll-keeper';
import { Clock, Send, Sparkles, HelpCircle } from 'lucide-react';

interface TreasuryOfRelicsProps {
  challenge: TreasuryChallenge;
  timer: number;
  onSubmitAnswer: (answer: string) => void;
}

export function TreasuryOfRelics({ 
  challenge, 
  timer, 
  onSubmitAnswer 
}: TreasuryOfRelicsProps) {
  const [answer, setAnswer] = useState('');
  const [revealProgress, setRevealProgress] = useState(0);
  const [showInput, setShowInput] = useState(false);

  // Animate description reveal
  useEffect(() => {
    const sentences = challenge.description.split('. ');
    
    if (revealProgress < sentences.length) {
      const timer = setTimeout(() => {
        setRevealProgress(prev => prev + 1);
      }, 1500);
      return () => clearTimeout(timer);
    } else if (!showInput) {
      const timer = setTimeout(() => setShowInput(true), 500);
      return () => clearTimeout(timer);
    }
  }, [revealProgress, challenge.description, showInput]);

  const handleSubmit = () => {
    if (answer.trim()) {
      onSubmitAnswer(answer);
      setAnswer('');
    }
  };

  const sentences = challenge.description.split('. ');

  return (
    <div className="fixed inset-0 bg-gradient-to-b from-slate-950 via-yellow-950/20 to-slate-950 overflow-hidden">
      {/* Treasury background */}
      <div className="absolute inset-0">
        {/* Display cases / vitrines */}
        <div className="absolute inset-0 flex items-center justify-center">
          {/* Background cases */}
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-28 h-36 md:w-36 md:h-48 rounded-lg border-2 border-yellow-800/30 bg-slate-900/30 backdrop-blur-sm"
              style={{
                left: `${10 + i * 15}%`,
                top: `${20 + (i % 2) * 40}%`,
                transform: `rotate(${-5 + i * 2}deg)`,
                opacity: 0.4
              }}
            >
              <div className="w-full h-full flex items-center justify-center">
                <HelpCircle className="w-10 h-10 text-yellow-900/30" />
              </div>
            </div>
          ))}
        </div>

        {/* Golden dust particles */}
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-yellow-400/40 rounded-full animate-float-slow"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 5}s`
            }}
          />
        ))}

        {/* Ambient golden glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl animate-pulse" />
      </div>

      {/* Timer */}
      <div className="absolute top-4 right-4 z-50">
        <div className={cn(
          "flex items-center gap-2 px-5 py-3 rounded-full backdrop-blur-sm",
          timer <= 10 ? "bg-red-900/50 border border-red-500/50" : "bg-yellow-900/50 border border-yellow-600/50"
        )}>
          <Clock className={cn("w-6 h-6", timer <= 10 ? "text-red-400 animate-pulse" : "text-yellow-400")} />
          <span className={cn("text-2xl font-mono font-bold", timer <= 10 ? "text-red-400" : "text-yellow-200")}>
            {timer}с
          </span>
        </div>
      </div>

      {/* Hall icon */}
      <div className="absolute top-4 left-4 z-50">
        <div className="flex items-center gap-3 px-5 py-3 rounded-full bg-yellow-900/50 border border-yellow-600/50 backdrop-blur-sm">
          <span className="text-3xl">⚱️</span>
          <span className="text-yellow-200 font-semibold text-lg">Сокровищница</span>
        </div>
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-8">
        <div className="max-w-2xl w-full space-y-8">
          {/* Central display case */}
          <div className="relative mx-auto w-72 h-88 md:w-88 md:h-104">
            {/* Glass case frame */}
            <div className="absolute inset-0 border-4 border-yellow-600/60 rounded-xl bg-gradient-to-b from-slate-900/60 via-slate-800/40 to-slate-900/60 backdrop-blur-md shadow-[0_0_60px_rgba(234,179,8,0.2)]">
              {/* Top reflection */}
              <div className="absolute top-0 left-0 right-0 h-12 bg-gradient-to-b from-yellow-400/10 to-transparent rounded-t-xl" />
              
              {/* Mystery artifact silhouette */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className={cn(
                  "relative transition-all duration-1000",
                  showInput ? "opacity-60" : "opacity-30"
                )}>
                  {/* Glowing artifact placeholder */}
                  <div className="w-28 h-36 md:w-36 md:h-44 bg-gradient-to-b from-yellow-500/20 via-yellow-600/10 to-transparent rounded-lg blur-sm animate-pulse" />
                  <Sparkles className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-18 h-18 md:w-24 md:h-24 text-yellow-400/40" />
                </div>
              </div>

              {/* Glass shine effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-white/5 rounded-xl pointer-events-none" />
            </div>

            {/* Pedestal */}
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-52 md:w-60 h-8 bg-gradient-to-b from-yellow-800 to-yellow-900 rounded-lg shadow-lg">
              <div className="absolute inset-x-2 top-1 h-2 bg-yellow-600/30 rounded" />
            </div>

            {/* Spotlight */}
            <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-32 h-32 bg-gradient-radial from-yellow-400/20 to-transparent blur-2xl" />
          </div>

          {/* Description clues */}
          <div className="space-y-4 mt-8">
            {sentences.slice(0, revealProgress).map((sentence, i) => (
              <div 
                key={i}
                className="bg-slate-900/60 backdrop-blur-sm px-8 py-5 rounded-xl border border-yellow-600/30 animate-fade-in"
                style={{ animationDelay: `${i * 0.2}s` }}
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-yellow-600/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-yellow-400 font-bold text-lg">{i + 1}</span>
                  </div>
                  <p className="text-yellow-100 text-xl leading-relaxed">
                    {sentence}{i < sentences.length - 1 ? '.' : ''}
                  </p>
                </div>
              </div>
            ))}

            {/* Loading next clue */}
            {revealProgress < sentences.length && (
              <div className="flex items-center justify-center gap-3 py-4 text-yellow-400/60">
                <div className="w-3 h-3 bg-yellow-400 rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
                <div className="w-3 h-3 bg-yellow-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                <div className="w-3 h-3 bg-yellow-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
              </div>
            )}
          </div>

          {/* Question prompt */}
          {showInput && (
            <div className="text-center animate-fade-in">
              <p className="text-yellow-300 text-2xl font-medium">
                Что это за предмет?
              </p>
            </div>
          )}

          {/* Related events hint */}
          {challenge.relatedEvents && showInput && (
            <div className="flex flex-wrap justify-center gap-3 animate-fade-in">
              {challenge.relatedEvents.map((event, i) => (
                <span 
                  key={i}
                  className="px-4 py-2 rounded-full bg-yellow-900/40 border border-yellow-600/30 text-yellow-300/70 text-base"
                >
                  {event}
                </span>
              ))}
            </div>
          )}

          {/* Answer input */}
          {showInput && (
            <div className="flex gap-4 animate-fade-in">
              <Input
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                placeholder="Название предмета..."
                className="flex-1 bg-yellow-950/50 border-yellow-600/50 text-white text-xl py-8 placeholder:text-yellow-300/50 focus:border-yellow-500"
                autoFocus
              />
              <Button 
                onClick={handleSubmit}
                disabled={!answer.trim()}
                size="lg"
                className="bg-yellow-600 hover:bg-yellow-700 text-white px-10 shadow-[0_0_20px_rgba(234,179,8,0.3)]"
              >
                <Send className="w-6 h-6" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
