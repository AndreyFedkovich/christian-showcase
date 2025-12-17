import { useRef, useState, useCallback } from 'react';

export const useTypewriterSound = () => {
  const audioContextRef = useRef<AudioContext | null>(null);
  const noiseBufferRef = useRef<AudioBuffer | null>(null);
  const [soundEnabled, setSoundEnabled] = useState(true);

  const initAudio = useCallback(() => {
    if (audioContextRef.current) return;

    const ctx = new AudioContext();

    // Генерируем короткий шумовый буфер (0.08 c)
    const duration = 0.08;
    const buffer = ctx.createBuffer(1, duration * ctx.sampleRate, ctx.sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < data.length; i++) {
      data[i] = (Math.random() * 2 - 1); // белый шум
    }

    audioContextRef.current = ctx;
    noiseBufferRef.current = buffer;
  }, []);

  const playTick = useCallback(() => {
    if (!soundEnabled) return;

    if (!audioContextRef.current || !noiseBufferRef.current) {
      initAudio();
    }

    const ctx = audioContextRef.current!;
    const buffer = noiseBufferRef.current!;

    const source = ctx.createBufferSource();
    source.buffer = buffer;

    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.value = 2500 + Math.random() * 1500; // чуть рандома
    filter.Q.value = 4;

    const gain = ctx.createGain();
    const now = ctx.currentTime;

    // Огибающая: очень быстрый удар + быстрое затухание
    gain.gain.cancelScheduledValues(now);
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.4, now + 0.002);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.06);

    source.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    source.start(now);
    source.stop(now + 0.07);
  }, [soundEnabled, initAudio]);

  return { playTick, soundEnabled, setSoundEnabled };
};
