import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { KeeperDialogue } from './KeeperDialogue';
import { Key, BookOpen, Sparkles, Crown } from 'lucide-react';

interface VictorySceneProps {
  teamName: string;
  memoryKeys: number;
  maxKeys: number;
  onPlayAgain: () => void;
  onExit: () => void;
}

type Phase = 'approach' | 'heart-reveal' | 'heart-glow' | 'keys-absorb' | 'speech' | 'finale';

export const VictoryScene: React.FC<VictorySceneProps> = ({
  teamName,
  memoryKeys,
  maxKeys,
  onPlayAgain,
  onExit
}) => {
  const [phase, setPhase] = useState<Phase>('approach');
  const [absorbedKeys, setAbsorbedKeys] = useState(0);
  const [showButtons, setShowButtons] = useState(false);

  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];

    // Phase transitions
    timers.push(setTimeout(() => setPhase('heart-reveal'), 1500));
    timers.push(setTimeout(() => setPhase('heart-glow'), 3500));
    timers.push(setTimeout(() => setPhase('keys-absorb'), 5000));
    
    // Animate keys absorption
    for (let i = 1; i <= memoryKeys; i++) {
      timers.push(setTimeout(() => setAbsorbedKeys(i), 5000 + i * 400));
    }
    
    timers.push(setTimeout(() => setPhase('speech'), 5000 + memoryKeys * 400 + 1000));
    timers.push(setTimeout(() => setPhase('finale'), 5000 + memoryKeys * 400 + 4000));
    timers.push(setTimeout(() => setShowButtons(true), 5000 + memoryKeys * 400 + 6000));

    return () => timers.forEach(clearTimeout);
  }, [memoryKeys]);

  const victoryPercentage = Math.round((memoryKeys / maxKeys) * 100);
  const rank = victoryPercentage >= 90 ? 'Великий Хранитель' : 
               victoryPercentage >= 70 ? 'Мастер Свитков' : 
               victoryPercentage >= 50 ? 'Хранитель Памяти' : 'Искатель Истины';

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-amber-950/20 to-slate-950 relative overflow-hidden">
      {/* Stars background */}
      <div className="absolute inset-0">
        {Array.from({ length: 50 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-amber-200/60 animate-twinkle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`
            }}
          />
        ))}
      </div>

      {/* Ancient library columns */}
      <div className="absolute inset-x-0 bottom-0 h-full pointer-events-none">
        <div className="absolute left-[10%] bottom-0 w-16 h-[80%] bg-gradient-to-t from-amber-900/30 to-transparent rounded-t-lg" />
        <div className="absolute right-[10%] bottom-0 w-16 h-[80%] bg-gradient-to-t from-amber-900/30 to-transparent rounded-t-lg" />
        <div className="absolute left-[25%] bottom-0 w-12 h-[70%] bg-gradient-to-t from-amber-900/20 to-transparent rounded-t-lg" />
        <div className="absolute right-[25%] bottom-0 w-12 h-[70%] bg-gradient-to-t from-amber-900/20 to-transparent rounded-t-lg" />
      </div>

      {/* Approaching corridor effect */}
      {phase === 'approach' && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center animate-fade-in">
            <p className="text-amber-400/80 text-2xl tracking-widest uppercase">
              Приближаясь к Сердцу Библиотеки...
            </p>
          </div>
        </div>
      )}

      {/* Heart of the Library */}
      {phase !== 'approach' && (
        <div className="absolute inset-0 flex items-center justify-center">
          {/* Outer glow rings */}
          <div className={`absolute transition-all duration-1000 ${
            phase === 'heart-glow' || phase === 'keys-absorb' || phase === 'speech' || phase === 'finale' 
              ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
          }`}>
            {[1, 2, 3, 4].map((ring) => (
              <div
                key={ring}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-amber-400/20"
                style={{
                  width: `${150 + ring * 80}px`,
                  height: `${150 + ring * 80}px`,
                  animation: `ping ${3 + ring * 0.5}s cubic-bezier(0, 0, 0.2, 1) infinite`,
                  animationDelay: `${ring * 0.3}s`
                }}
              />
            ))}
          </div>

          {/* The Heart - glowing book/crystal */}
          <div className="relative transition-all duration-1000 opacity-100 scale-100">
            {/* Core glow */}
            <div className={`absolute inset-0 rounded-full transition-all duration-1000 ${
              phase === 'heart-glow' || phase === 'keys-absorb' || phase === 'speech' || phase === 'finale'
                ? 'bg-amber-500/40 blur-3xl scale-150' : 'bg-amber-500/20 blur-2xl'
            }`} />
            
            {/* Heart container */}
            <div className={`
              relative w-48 h-48 rounded-full 
              bg-gradient-to-br from-amber-400 via-amber-500 to-amber-700
              flex items-center justify-center
              shadow-2xl shadow-amber-500/50
              transition-all duration-500
              ${phase === 'heart-glow' || phase === 'keys-absorb' ? 'animate-pulse' : ''}
            `}>
              {/* Inner crystal pattern */}
              <div className="absolute inset-4 rounded-full bg-gradient-to-br from-amber-200 via-amber-300 to-amber-500 opacity-80" />
              <div className="absolute inset-8 rounded-full bg-gradient-to-br from-white via-amber-100 to-amber-300 opacity-60" />
              
              {/* Central icon */}
              <BookOpen className="relative w-20 h-20 text-amber-900" />

              {/* Sparkle particles around heart */}
              {Array.from({ length: 12 }).map((_, i) => (
                <Sparkles
                  key={i}
                  className="absolute w-5 h-5 text-amber-300 animate-float"
                  style={{
                    top: `${50 + Math.sin(i * 30 * Math.PI / 180) * 60}%`,
                    left: `${50 + Math.cos(i * 30 * Math.PI / 180) * 60}%`,
                    transform: 'translate(-50%, -50%)',
                    animationDelay: `${i * 0.1}s`
                  }}
                />
              ))}
            </div>
          </div>

          {/* Floating keys being absorbed */}
          {(phase === 'keys-absorb' || phase === 'speech' || phase === 'finale') && (
            <div className="absolute inset-0 pointer-events-none">
              {Array.from({ length: memoryKeys }).map((_, i) => (
                <div
                  key={i}
                  className={`absolute transition-all duration-700 ${
                    i < absorbedKeys ? 'opacity-0 scale-0' : 'opacity-100'
                  }`}
                  style={{
                    top: '50%',
                    left: '50%',
                    transform: `translate(-50%, -50%) rotate(${i * (360 / memoryKeys)}deg) translateY(-${120 + (i % 3) * 20}px)`,
                    transitionDelay: `${i * 100}ms`
                  }}
                >
                  <Key className="w-10 h-10 text-amber-400 drop-shadow-lg" />
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Keeper's Speech + Buttons */}
      {(phase === 'speech' || phase === 'finale') && (
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="max-w-3xl mx-auto space-y-6">
            <KeeperDialogue
              message={`${teamName}, вы доказали свою достойность. ${memoryKeys} Ключей Памяти вернулись в Сердце Библиотеки. Знания, которые могли быть утрачены навеки, теперь сохранены благодаря вам. Библиотека Вечности благодарит вас и дарует вам звание: ${rank}.`}
              mood="approving"
            />
            
            {/* Action buttons inside dialogue block */}
            {showButtons && (
              <div className="flex justify-center gap-4 animate-fade-in pt-4">
                <Button
                  onClick={onPlayAgain}
                  variant="outline"
                  size="lg"
                  className="border-amber-500/50 text-amber-400 hover:bg-amber-900/30 px-10 text-lg"
                >
                  Играть снова
                </Button>
                <Button
                  onClick={onExit}
                  size="lg"
                  className="bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white px-10 text-lg"
                >
                  Выйти
                </Button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Finale - Stats and buttons */}
    </div>
  );
};
