import { useState, useEffect, useRef } from 'react';

interface UseTypewriterOptions {
  text: string;
  speed?: number;
  delay?: number;
  enabled?: boolean;
}

export function useTypewriter({ text, speed = 30, delay = 0, enabled = true }: UseTypewriterOptions) {
  const [displayedText, setDisplayedText] = useState(enabled ? '' : text);
  const [isComplete, setIsComplete] = useState(!enabled);
  const intervalRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!enabled) {
      setDisplayedText(text);
      setIsComplete(true);
      return;
    }

    setDisplayedText('');
    setIsComplete(false);
    
    timeoutRef.current = setTimeout(() => {
      let currentIndex = 0;
      intervalRef.current = setInterval(() => {
        if (currentIndex < text.length) {
          setDisplayedText(text.slice(0, currentIndex + 1));
          currentIndex++;
        } else {
          if (intervalRef.current) clearInterval(intervalRef.current);
          setIsComplete(true);
        }
      }, speed);
    }, delay);
    
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [text, speed, delay, enabled]);

  return { displayedText, isComplete };
}
