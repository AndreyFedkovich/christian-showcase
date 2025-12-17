import { useRef, useState, useCallback } from 'react';

export const useTypewriterSound = () => {
  const audioContextRef = useRef<AudioContext | null>(null);
  const [soundEnabled, setSoundEnabled] = useState(true);

  const playTick = useCallback(() => {
    if (!soundEnabled) return;
    
    // Create AudioContext on first call (lazy initialization)
    if (!audioContextRef.current) {
      audioContextRef.current = new AudioContext();
    }
    
    const ctx = audioContextRef.current;
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();
    
    oscillator.type = 'sine';
    oscillator.frequency.value = 800 + Math.random() * 200; // Slight variation
    
    gainNode.gain.setValueAtTime(0.08, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.015);
    
    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);
    
    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + 0.015);
  }, [soundEnabled]);

  return { playTick, soundEnabled, setSoundEnabled };
};
