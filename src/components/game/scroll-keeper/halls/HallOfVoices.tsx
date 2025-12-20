import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { VoicesChallenge } from '@/data/scroll-keeper';
import { Quote, Mic, Volume2 } from 'lucide-react';

interface HallOfVoicesProps {
  challenge: VoicesChallenge;
  onAnswer: (answer: string, correct: boolean) => void;
}

export const HallOfVoices: React.FC<HallOfVoicesProps> = ({ challenge, onAnswer }) => {
  const [answer, setAnswer] = useState('');
  const [showQuote, setShowQuote] = useState(false);
  const [showContext, setShowContext] = useState(false);
  const [soundWaves, setSoundWaves] = useState<number[]>([]);

  useEffect(() => {
    // Animate quote appearance
    const timer = setTimeout(() => setShowQuote(true), 500);
    
    // Generate random sound wave heights
    const waveInterval = setInterval(() => {
      setSoundWaves(Array.from({ length: 20 }, () => Math.random() * 100));
    }, 150);

    return () => {
      clearTimeout(timer);
      clearInterval(waveInterval);
    };
  }, []);

  const handleSubmit = () => {
    if (!answer.trim()) return;
    const isCorrect = answer.toLowerCase().includes(challenge.speaker.toLowerCase());
    onAnswer(answer, isCorrect);
  };

  const requestContext = () => {
    if (challenge.context && !showContext) {
      setShowContext(true);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-950 to-slate-950 relative overflow-hidden">
      {/* Animated background - sound visualization */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Central microphone glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-purple-500/10 blur-3xl animate-pulse" />
        
        {/* Sound wave bars - left side */}
        <div className="absolute left-8 top-1/2 -translate-y-1/2 flex items-center gap-1.5">
          {soundWaves.slice(0, 10).map((height, i) => (
            <div
              key={`left-${i}`}
              className="w-1.5 bg-gradient-to-t from-purple-500/60 to-indigo-400/60 rounded-full transition-all duration-150"
              style={{ height: `${24 + height * 0.8}px` }}
            />
          ))}
        </div>
        
        {/* Sound wave bars - right side */}
        <div className="absolute right-8 top-1/2 -translate-y-1/2 flex items-center gap-1.5">
          {soundWaves.slice(10, 20).map((height, i) => (
            <div
              key={`right-${i}`}
              className="w-1.5 bg-gradient-to-t from-purple-500/60 to-indigo-400/60 rounded-full transition-all duration-150"
              style={{ height: `${24 + height * 0.8}px` }}
            />
          ))}
        </div>

        {/* Floating voice particles */}
        {Array.from({ length: 15 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-3 h-3 rounded-full bg-purple-400/30 animate-float"
            style={{
              left: `${10 + Math.random() * 80}%`,
              top: `${10 + Math.random() * 80}%`,
              animationDelay: `${i * 0.3}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          />
        ))}

        {/* Circular sound rings */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          {[1, 2, 3].map((ring) => (
            <div
              key={ring}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-purple-500/20"
              style={{
                width: `${200 + ring * 150}px`,
                height: `${200 + ring * 150}px`,
                animation: `ping ${2 + ring * 0.5}s cubic-bezier(0, 0, 0.2, 1) infinite`,
                animationDelay: `${ring * 0.3}s`
              }}
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-8">
        {/* Hall title */}
        <div className="absolute top-8 left-1/2 -translate-x-1/2 flex items-center gap-3">
          <Volume2 className="w-7 h-7 text-purple-400" />
          <h2 className="text-2xl font-light text-purple-300/80 tracking-wider">ПАЛАТА ГОЛОСОВ</h2>
          <Volume2 className="w-7 h-7 text-purple-400" />
        </div>

        {/* Quote display */}
        <div className="max-w-4xl w-full">
          {/* Central microphone icon */}
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="absolute inset-0 bg-purple-500/30 blur-xl rounded-full scale-150" />
              <div className="relative w-24 h-24 rounded-full bg-gradient-to-br from-purple-600 to-indigo-700 flex items-center justify-center border border-purple-400/30 shadow-2xl">
                <Mic className="w-12 h-12 text-purple-200" />
              </div>
            </div>
          </div>

          {/* The quote */}
          <div 
            className={`transition-all duration-1000 ${showQuote ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          >
            <div className="relative bg-gradient-to-br from-slate-900/80 to-purple-950/80 backdrop-blur-sm rounded-2xl p-10 border border-purple-500/20 shadow-2xl">
              {/* Quote marks */}
              <Quote className="absolute -top-5 -left-5 w-12 h-12 text-purple-400/50" />
              <Quote className="absolute -bottom-5 -right-5 w-12 h-12 text-purple-400/50 rotate-180" />
              
              {/* Quote text with typewriter effect appearance */}
              <p className="text-3xl md:text-4xl text-center text-white/90 font-serif italic leading-relaxed px-8">
                «{challenge.quote}»
              </p>

              {/* Book reference if available */}
              {challenge.bookReference && (
                <p className="text-center text-purple-400/60 mt-6 text-base tracking-wider">
                  — {challenge.bookReference}
                </p>
              )}
            </div>

            {/* Context hint */}
            {challenge.context && (
              <div className="mt-6 text-center">
                {showContext ? (
                  <p className="text-purple-300/70 text-lg italic animate-fade-in">
                    Контекст: {challenge.context}
                  </p>
                ) : (
                  <Button
                    variant="ghost"
                    size="lg"
                    onClick={requestContext}
                    className="text-purple-400/60 hover:text-purple-300 hover:bg-purple-500/10 text-lg"
                  >
                    Показать контекст
                  </Button>
                )}
              </div>
            )}
          </div>

          {/* Question */}
          <div className={`mt-8 text-center transition-all duration-700 delay-500 ${showQuote ? 'opacity-100' : 'opacity-0'}`}>
            <p className="text-2xl text-purple-200/80 mb-6">Кто произнёс эти слова?</p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-lg mx-auto">
              <Input
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder="Имя говорящего..."
                className="bg-slate-900/60 border-purple-500/30 text-white text-xl py-7 placeholder:text-purple-300/40 focus:border-purple-400"
                onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
              />
              <Button
                onClick={handleSubmit}
                disabled={!answer.trim()}
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white px-10 text-lg whitespace-nowrap"
              >
                Ответить
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
