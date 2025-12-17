import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Hall } from '@/data/scroll-keeper';
import { KeeperDialogue } from './KeeperDialogue';
import { Button } from '@/components/ui/button';
import { Key } from 'lucide-react';

interface HallTransitionProps {
  hall: Hall;
  hallNumber: number;
  totalHalls: number;
  memoryKeys: number;
  maxKeys: number;
  onStartChallenge: () => void;
}

type TransitionStage = 'door' | 'corridor' | 'reveal' | 'dialogue';

const hallBackgrounds: Record<string, string> = {
  shadows: 'from-slate-950 via-slate-900 to-slate-950',
  scriptorium: 'from-amber-950 via-amber-900/50 to-slate-950',
  echo: 'from-slate-950 via-purple-950/30 to-slate-950',
  gallery: 'from-slate-950 via-rose-950/20 to-slate-950',
  treasury: 'from-slate-950 via-yellow-950/30 to-slate-950',
  voices: 'from-slate-950 via-blue-950/30 to-slate-950',
  spiral: 'from-slate-950 via-emerald-950/20 to-slate-950'
};

const hallAccentColors: Record<string, string> = {
  shadows: 'border-slate-600/50 shadow-slate-500/30',
  scriptorium: 'border-amber-600/50 shadow-amber-500/30',
  echo: 'border-purple-600/50 shadow-purple-500/30',
  gallery: 'border-rose-600/50 shadow-rose-500/30',
  treasury: 'border-yellow-600/50 shadow-yellow-500/30',
  voices: 'border-blue-600/50 shadow-blue-500/30',
  spiral: 'border-emerald-600/50 shadow-emerald-500/30'
};

export function HallTransition({ 
  hall, 
  hallNumber, 
  totalHalls,
  memoryKeys,
  maxKeys,
  onStartChallenge 
}: HallTransitionProps) {
  const [stage, setStage] = useState<TransitionStage>('door');
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];

    if (stage === 'door') {
      timers.push(setTimeout(() => setStage('corridor'), 1500));
    } else if (stage === 'corridor') {
      timers.push(setTimeout(() => setStage('reveal'), 1500));
    } else if (stage === 'reveal') {
      timers.push(setTimeout(() => setStage('dialogue'), 1000));
    }

    return () => timers.forEach(clearTimeout);
  }, [stage]);

  return (
    <div className={cn(
      "fixed inset-0 overflow-hidden transition-all duration-1000",
      "bg-gradient-to-b",
      hallBackgrounds[hall.type]
    )}>
      {/* Memory Keys counter */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50">
        <div className="flex items-center gap-3 bg-slate-900/80 px-4 py-2 rounded-full border border-amber-600/30 backdrop-blur-sm">
          <Key className="w-5 h-5 text-amber-400" />
          <span className="text-amber-400 font-bold text-lg">{memoryKeys}</span>
          <span className="text-slate-500">/</span>
          <span className="text-slate-400">{maxKeys}</span>
        </div>
      </div>

      {/* Door opening animation */}
      <div className={cn(
        "absolute inset-0 flex items-center justify-center transition-all duration-1000",
        stage !== 'door' && "opacity-0 scale-110"
      )}>
        {/* Door frame */}
        <div className="relative w-48 md:w-64 h-72 md:h-96">
          {/* Left door */}
          <div className={cn(
            "absolute left-0 top-0 w-1/2 h-full bg-gradient-to-r from-amber-900 to-amber-800 border-2 border-amber-600/50 transition-transform duration-1000 origin-left",
            stage !== 'door' && "-rotate-y-90"
          )}>
            <div className="absolute right-2 top-1/2 w-3 h-8 bg-amber-500 rounded-full" />
          </div>
          {/* Right door */}
          <div className={cn(
            "absolute right-0 top-0 w-1/2 h-full bg-gradient-to-l from-amber-900 to-amber-800 border-2 border-amber-600/50 transition-transform duration-1000 origin-right",
            stage !== 'door' && "rotate-y-90"
          )}>
            <div className="absolute left-2 top-1/2 w-3 h-8 bg-amber-500 rounded-full" />
          </div>
          {/* Door glow */}
          <div className="absolute inset-0 bg-gradient-radial from-amber-500/20 to-transparent animate-pulse" />
        </div>
        <p className="absolute bottom-1/4 text-amber-400/60 text-lg animate-pulse">
          Дверь открывается...
        </p>
      </div>

      {/* Corridor animation */}
      <div className={cn(
        "absolute inset-0 flex items-center justify-center transition-all duration-1000",
        stage === 'corridor' ? "opacity-100" : "opacity-0"
      )}>
        {/* Perspective corridor */}
        <div className="relative w-full h-full" style={{ perspective: '1000px' }}>
          <div className="absolute inset-0 flex items-center justify-center">
            {/* Corridor walls receding */}
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className={cn(
                  "absolute border-2 rounded-lg",
                  hallAccentColors[hall.type]
                )}
                style={{
                  width: `${80 - i * 15}%`,
                  height: `${80 - i * 15}%`,
                  opacity: 1 - i * 0.15,
                  transform: `translateZ(${-i * 100}px)`,
                  animation: `corridor-fly ${1.5}s ease-out forwards`,
                  animationDelay: `${i * 0.1}s`
                }}
              />
            ))}
          </div>
        </div>
        <p className="absolute bottom-1/4 text-slate-400 text-lg">
          Вы входите в зал...
        </p>
      </div>

      {/* Hall reveal */}
      <div className={cn(
        "absolute inset-0 flex flex-col items-center justify-center transition-all duration-1000",
        stage === 'reveal' || stage === 'dialogue' ? "opacity-100" : "opacity-0 scale-90"
      )}>
        {/* Hall number badge */}
        <div className={cn(
          "mb-4 px-4 py-1 rounded-full text-sm font-medium",
          "bg-slate-800/80 border border-amber-600/30 text-amber-400"
        )}>
          Зал {hallNumber} из {totalHalls}
        </div>

        {/* Hall icon */}
        <div className={cn(
          "text-7xl md:text-8xl mb-6 transition-all duration-500",
          stage === 'dialogue' ? "animate-bounce" : "animate-pulse"
        )}>
          {hall.icon}
        </div>

        {/* Hall name */}
        <h2 className="text-3xl md:text-4xl font-bold text-amber-400 mb-4 text-center">
          {hall.name}
        </h2>

        {/* Hall description */}
        <p className="text-slate-400 text-center max-w-md px-4 mb-8">
          {hall.description}
        </p>
      </div>

      {/* Keeper dialogue */}
      {stage === 'dialogue' && (
        <div className="absolute bottom-8 md:bottom-16 left-4 right-4 md:left-1/2 md:-translate-x-1/2 md:max-w-2xl animate-fade-in">
          <KeeperDialogue
            message={hall.keeperIntro}
            mood="strict"
            onComplete={() => setShowButton(true)}
          />
          
          {showButton && (
            <div className="flex justify-center mt-6 animate-fade-in">
              <Button
                onClick={onStartChallenge}
                size="lg"
                className={cn(
                  "px-12 py-6 text-xl text-white",
                  "bg-amber-600 hover:bg-amber-700",
                  "shadow-[0_0_30px_rgba(251,191,36,0.3)]"
                )}
              >
                Принять испытание
              </Button>
            </div>
          )}
        </div>
      )}

      {/* Ambient particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-amber-400/30 rounded-full animate-float-slow"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 5}s`
            }}
          />
        ))}
      </div>
    </div>
  );
}
