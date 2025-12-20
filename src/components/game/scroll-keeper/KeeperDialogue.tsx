import { useEffect, useState, useRef } from 'react';
import { cn } from '@/lib/utils';
import { KeeperMood } from '@/data/scroll-keeper';

interface KeeperDialogueProps {
  message: string;
  mood?: KeeperMood;
  typingSpeed?: number;
  onComplete?: () => void;
  className?: string;
}

const moodEmojis: Record<KeeperMood, string> = {
  neutral: '📖',
  strict: '⚖️',
  approving: '✨',
  thoughtful: '🤔',
  warning: '⚠️'
};

const moodColors: Record<KeeperMood, string> = {
  neutral: 'from-amber-500/20 to-amber-600/10',
  strict: 'from-slate-500/20 to-slate-600/10',
  approving: 'from-emerald-500/20 to-emerald-600/10',
  thoughtful: 'from-blue-500/20 to-blue-600/10',
  warning: 'from-rose-500/20 to-rose-600/10'
};

const moodTextColors: Record<KeeperMood, string> = {
  neutral: 'text-amber-200',
  strict: 'text-slate-300',
  approving: 'text-emerald-200',
  thoughtful: 'text-blue-200',
  warning: 'text-rose-200'
};

export function KeeperDialogue({ 
  message, 
  mood = 'neutral', 
  typingSpeed = 30,
  onComplete,
  className 
}: KeeperDialogueProps) {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [showCursor, setShowCursor] = useState(true);
  const indexRef = useRef(0);
  const messageRef = useRef(message);

  // Reset when message changes
  useEffect(() => {
    if (message !== messageRef.current) {
      messageRef.current = message;
      indexRef.current = 0;
      setDisplayedText('');
      setIsTyping(true);
    }
  }, [message]);

  // Typewriter effect
  useEffect(() => {
    if (!isTyping) return;

    const timer = setInterval(() => {
      if (indexRef.current < message.length) {
        setDisplayedText(message.slice(0, indexRef.current + 1));
        indexRef.current++;
      } else {
        setIsTyping(false);
        clearInterval(timer);
        onComplete?.();
      }
    }, typingSpeed);

    return () => clearInterval(timer);
  }, [message, typingSpeed, isTyping, onComplete]);

  // Cursor blink
  useEffect(() => {
    const cursorTimer = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 530);
    return () => clearInterval(cursorTimer);
  }, []);

  // Skip animation on click
  const handleClick = () => {
    if (isTyping) {
      setDisplayedText(message);
      indexRef.current = message.length;
      setIsTyping(false);
      onComplete?.();
    }
  };

  return (
    <div 
      className={cn(
        "relative p-8 md:p-10 rounded-2xl cursor-pointer transition-all duration-500",
        "bg-gradient-to-br border border-amber-600/30 backdrop-blur-sm",
        moodColors[mood],
        className
      )}
      onClick={handleClick}
    >
      {/* Keeper indicator */}
      <div className="flex items-center gap-4 mb-6">
        <div className={cn(
          "w-16 h-16 rounded-full flex items-center justify-center text-4xl",
          "bg-slate-900/50 border-2 border-amber-600/50",
          "drop-shadow-[0_0_15px_rgba(251,191,36,0.4)]"
        )}>
          {moodEmojis[mood]}
        </div>
        <div>
          <p className="text-amber-400 font-semibold text-lg tracking-wide uppercase">
            Хранитель
          </p>
          <p className="text-slate-500 text-sm">The Keeper</p>
        </div>
      </div>

      {/* Message text */}
      <p className={cn(
        "text-2xl md:text-3xl leading-relaxed italic",
        moodTextColors[mood]
      )}>
        «{displayedText}
        <span className={cn(
          "inline-block w-0.5 h-6 ml-0.5 -mb-0.5 bg-amber-400",
          showCursor && isTyping ? "opacity-100" : "opacity-0"
        )} />
        {!isTyping && '»'}
      </p>

      {/* Skip hint */}
      {isTyping && (
        <p className="absolute bottom-3 right-5 text-slate-600 text-sm">
          Нажмите, чтобы пропустить
        </p>
      )}

      {/* Decorative corners */}
      <div className="absolute top-0 left-0 w-10 h-10 border-t-2 border-l-2 border-amber-600/40 rounded-tl-2xl" />
      <div className="absolute top-0 right-0 w-10 h-10 border-t-2 border-r-2 border-amber-600/40 rounded-tr-2xl" />
      <div className="absolute bottom-0 left-0 w-10 h-10 border-b-2 border-l-2 border-amber-600/40 rounded-bl-2xl" />
      <div className="absolute bottom-0 right-0 w-10 h-10 border-b-2 border-r-2 border-amber-600/40 rounded-br-2xl" />
    </div>
  );
}
