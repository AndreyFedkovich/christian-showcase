import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { KeeperDialogue } from './KeeperDialogue';
import { Button } from '@/components/ui/button';
import { keeperDialogues } from '@/data/scroll-keeper';

interface PrologueSceneProps {
  teamName: string;
  onEnterLibrary: () => void;
}

type PrologueStage = 'cosmos' | 'portal' | 'vestibule' | 'dialogue';

export function PrologueScene({ teamName, onEnterLibrary }: PrologueSceneProps) {
  const [stage, setStage] = useState<PrologueStage>('cosmos');
  const [dialogueStep, setDialogueStep] = useState(0);
  const [showButton, setShowButton] = useState(false);

  // Stage progression
  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];

    if (stage === 'cosmos') {
      timers.push(setTimeout(() => setStage('portal'), 2000));
    } else if (stage === 'portal') {
      timers.push(setTimeout(() => setStage('vestibule'), 2500));
    } else if (stage === 'vestibule') {
      timers.push(setTimeout(() => setStage('dialogue'), 1500));
    }

    return () => timers.forEach(clearTimeout);
  }, [stage]);

  const dialogues = [
    keeperDialogues.prologue.welcome,
    `${teamName}, ${keeperDialogues.prologue.warning}`,
    keeperDialogues.prologue.challenge
  ];

  const handleDialogueComplete = () => {
    if (dialogueStep < dialogues.length - 1) {
      setTimeout(() => setDialogueStep(prev => prev + 1), 500);
    } else {
      setShowButton(true);
    }
  };

  return (
    <div className="fixed inset-0 overflow-hidden bg-black">
      {/* Cosmos background */}
      <div className={cn(
        "absolute inset-0 transition-opacity duration-1000",
        stage === 'cosmos' ? "opacity-100" : "opacity-0"
      )}>
        {/* Stars */}
        <div className="absolute inset-0">
          {Array.from({ length: 100 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                opacity: Math.random() * 0.8 + 0.2
              }}
            />
          ))}
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="text-slate-500 text-lg animate-pulse">
            Тьма космоса...
          </p>
        </div>
      </div>

      {/* Portal */}
      <div className={cn(
        "absolute inset-0 flex items-center justify-center transition-all duration-1000",
        stage === 'portal' ? "opacity-100 scale-100" : stage === 'cosmos' ? "opacity-0 scale-50" : "opacity-0 scale-150"
      )}>
        {/* Portal rings */}
        <div className="relative">
          <div className="absolute inset-0 w-64 h-64 md:w-96 md:h-96 -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2">
            <div className="absolute inset-0 rounded-full border-4 border-amber-500/50 animate-spin" style={{ animationDuration: '8s' }} />
            <div className="absolute inset-4 rounded-full border-2 border-amber-400/40 animate-spin" style={{ animationDuration: '6s', animationDirection: 'reverse' }} />
            <div className="absolute inset-8 rounded-full border border-amber-300/30 animate-spin" style={{ animationDuration: '4s' }} />
            <div className="absolute inset-0 rounded-full bg-gradient-radial from-amber-500/30 via-amber-900/20 to-transparent animate-pulse" />
          </div>
          {/* Floating letters */}
          <div className="absolute inset-0 w-80 h-80 md:w-[500px] md:h-[500px] -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2">
            {['א', 'Α', 'A', 'ב', 'Β', 'B', 'ג', 'Γ', 'C'].map((letter, i) => (
              <span
                key={i}
                className="absolute text-amber-400/60 text-2xl md:text-3xl animate-float"
                style={{
                  left: `${50 + 40 * Math.cos(i * 40 * Math.PI / 180)}%`,
                  top: `${50 + 40 * Math.sin(i * 40 * Math.PI / 180)}%`,
                  animationDelay: `${i * 0.2}s`,
                  transform: 'translate(-50%, -50%)'
                }}
              >
                {letter}
              </span>
            ))}
          </div>
          <div className="text-center text-amber-300 text-xl md:text-2xl animate-pulse">
            Портал открывается...
          </div>
        </div>
      </div>

      {/* Vestibule / Library entrance */}
      <div className={cn(
        "absolute inset-0 transition-all duration-1500",
        stage === 'vestibule' || stage === 'dialogue' ? "opacity-100" : "opacity-0"
      )}>
        {/* Library background */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-amber-950/20 to-slate-950" />
        
        {/* Pillars */}
        <div className="absolute left-4 md:left-16 top-0 bottom-0 w-8 md:w-16 bg-gradient-to-r from-amber-900/30 to-transparent" />
        <div className="absolute right-4 md:right-16 top-0 bottom-0 w-8 md:w-16 bg-gradient-to-l from-amber-900/30 to-transparent" />
        
        {/* Bookshelves silhouette */}
        <div className="absolute inset-x-20 top-0 h-32 opacity-30">
          <div className="flex justify-around h-full">
            {Array.from({ length: 20 }).map((_, i) => (
              <div
                key={i}
                className="w-3 md:w-4 bg-gradient-to-b from-amber-800 to-amber-900"
                style={{ height: `${60 + Math.random() * 40}%` }}
              />
            ))}
          </div>
        </div>

        {/* Dome with stars */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-48 md:w-[600px] md:h-64 rounded-b-full bg-gradient-to-b from-slate-900/80 to-transparent overflow-hidden">
          {Array.from({ length: 30 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-amber-300 rounded-full animate-twinkle"
              style={{
                left: `${10 + Math.random() * 80}%`,
                top: `${10 + Math.random() * 70}%`,
                animationDelay: `${Math.random() * 3}s`
              }}
            />
          ))}
        </div>

        {/* Floating letters in vestibule */}
        <div className="absolute inset-0 pointer-events-none">
          {['ש', 'λ', 'Ω', 'ד', 'ψ', 'צ'].map((letter, i) => (
            <span
              key={i}
              className="absolute text-amber-500/20 text-4xl md:text-6xl animate-float-slow"
              style={{
                left: `${15 + i * 15}%`,
                top: `${20 + (i % 3) * 20}%`,
                animationDelay: `${i * 0.5}s`
              }}
            >
              {letter}
            </span>
          ))}
        </div>

        {/* Library icon */}
        <div className={cn(
          "absolute top-1/4 left-1/2 -translate-x-1/2 transition-all duration-1000",
          stage === 'dialogue' ? "opacity-100 scale-100" : "opacity-0 scale-50"
        )}>
          <div className="text-8xl md:text-9xl animate-pulse drop-shadow-[0_0_30px_rgba(251,191,36,0.5)]">
            🏛️
          </div>
          <h1 className="text-center text-2xl md:text-4xl font-bold text-amber-400 mt-4 tracking-wider">
            Библиотека Вечности
          </h1>
        </div>
      </div>

      {/* Keeper dialogue */}
      {stage === 'dialogue' && (
        <div className="absolute bottom-8 md:bottom-16 left-4 right-4 md:left-1/2 md:-translate-x-1/2 md:max-w-2xl animate-fade-in">
          <KeeperDialogue
            message={dialogues[dialogueStep]}
            mood={dialogueStep === 2 ? 'strict' : 'neutral'}
            onComplete={handleDialogueComplete}
          />
          
          {showButton && (
            <div className="flex justify-center mt-6 animate-fade-in">
              <Button
                onClick={onEnterLibrary}
                size="lg"
                className="bg-amber-600 hover:bg-amber-700 text-white px-12 py-6 text-xl shadow-[0_0_30px_rgba(251,191,36,0.3)]"
              >
                Войти в Библиотеку
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
