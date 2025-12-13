import { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface SpinWheelProps<T> {
  items: { value: T; label: string; icon?: string }[];
  onComplete: (value: T) => void;
  spinning: boolean;
  duration?: number;
  className?: string;
}

function SpinWheel<T>({ 
  items, 
  onComplete, 
  spinning, 
  duration = 3000,
  className 
}: SpinWheelProps<T>) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (spinning && !isSpinning) {
      setIsSpinning(true);
      
      // Random target index
      const targetIndex = Math.floor(Math.random() * items.length);
      
      // Spinning animation - starts fast, slows down
      let speed = 50;
      let elapsed = 0;
      let currentIdx = 0;

      const spin = () => {
        currentIdx = (currentIdx + 1) % items.length;
        setCurrentIndex(currentIdx);
        
        elapsed += speed;
        
        if (elapsed < duration * 0.6) {
          // Fast phase
          speed = 50;
        } else if (elapsed < duration * 0.8) {
          // Slowing down
          speed = 100 + (elapsed - duration * 0.6) / 10;
        } else if (elapsed < duration) {
          // Final slow phase
          speed = 200 + (elapsed - duration * 0.8) / 5;
        } else {
          // Stop at target
          setCurrentIndex(targetIndex);
          setIsSpinning(false);
          onComplete(items[targetIndex].value);
          return;
        }

        intervalRef.current = setTimeout(spin, speed);
      };

      spin();
    }

    return () => {
      if (intervalRef.current) clearTimeout(intervalRef.current);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [spinning, items, duration, onComplete, isSpinning]);

  const currentItem = items[currentIndex];

  return (
    <div className={cn(
      "relative flex flex-col items-center justify-center",
      className
    )}>
      {/* Wheel container */}
      <div className={cn(
        "relative w-64 h-64 md:w-80 md:h-80 rounded-full",
        "bg-gradient-to-br from-violet-600/20 via-purple-600/20 to-indigo-700/20",
        "border-4 border-accent/50",
        "flex items-center justify-center",
        "shadow-[0_0_60px_rgba(139,92,246,0.3)]",
        isSpinning && "animate-pulse"
      )}>
        {/* Glow effect */}
        <div className={cn(
          "absolute inset-0 rounded-full",
          "bg-gradient-to-br from-violet-500/10 to-purple-500/10",
          isSpinning && "animate-spin-slow"
        )} />
        
        {/* Center content */}
        <div className={cn(
          "z-10 flex flex-col items-center gap-3 p-8 text-center",
          "transition-all duration-150",
          isSpinning && "scale-105"
        )}>
          {currentItem?.icon && (
            <span className="text-5xl md:text-6xl">{currentItem.icon}</span>
          )}
          <span className={cn(
            "text-2xl md:text-3xl font-bold text-foreground",
            "transition-all duration-150"
          )}>
            {currentItem?.label}
          </span>
        </div>
      </div>

      {/* Indicator arrow */}
      <div className="absolute -top-2 left-1/2 -translate-x-1/2">
        <div className="w-0 h-0 border-l-8 border-r-8 border-t-12 border-l-transparent border-r-transparent border-t-accent" 
          style={{ borderTopWidth: '20px' }}
        />
      </div>
    </div>
  );
}

export default SpinWheel;
