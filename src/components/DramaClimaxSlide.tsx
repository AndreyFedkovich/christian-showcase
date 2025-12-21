import { motion } from "framer-motion";
import { DramaClimaxSlide as DramaClimaxSlideType } from "@/data/redemption-drama";
import { useTypewriter } from "@/hooks/use-typewriter";
import { useState, useEffect } from "react";

interface DramaClimaxSlideProps {
  slide: DramaClimaxSlideType;
  direction: 'next' | 'prev';
}

const DramaClimaxSlide = ({ slide, direction }: DramaClimaxSlideProps) => {
  const [visibleStatements, setVisibleStatements] = useState(0);
  const [showCry, setShowCry] = useState(false);
  const [showFocus, setShowFocus] = useState(false);
  
  const { displayedText: significanceText, isComplete: significanceComplete } = useTypewriter({
    text: showFocus ? slide.focus.significance : '',
    speed: 30,
    enabled: showFocus
  });

  const isDarkness = slide.moment === 'darkness';

  useEffect(() => {
    // Reset state on slide change
    setVisibleStatements(0);
    setShowCry(false);
    setShowFocus(false);

    // Cascade statements
    const statementTimers = slide.statements.map((_, index) => {
      return setTimeout(() => {
        setVisibleStatements(index + 1);
      }, (index + 1) * 1500);
    });

    // Show cry after all statements
    const cryTimer = setTimeout(() => {
      setShowCry(true);
    }, (slide.statements.length + 1) * 1500);

    // Show focus after cry
    const focusTimer = setTimeout(() => {
      setShowFocus(true);
    }, (slide.statements.length + 2) * 1500);

    return () => {
      statementTimers.forEach(clearTimeout);
      clearTimeout(cryTimer);
      clearTimeout(focusTimer);
    };
  }, [slide]);

  const getBackground = () => {
    if (isDarkness) {
      return 'from-black via-red-950/30 to-black';
    }
    return 'from-amber-950 via-yellow-900/50 to-amber-950';
  };

  const getCryStyle = () => {
    if (isDarkness) {
      return 'text-amber-400 drop-shadow-[0_0_30px_rgba(251,191,36,0.5)]';
    }
    return 'text-amber-300 drop-shadow-[0_0_40px_rgba(252,211,77,0.8)]';
  };

  return (
    <div className={`min-h-screen w-full flex items-center justify-center bg-gradient-to-br ${getBackground()} relative overflow-hidden`}>
      {/* Darkness pulsing effect */}
      {isDarkness && (
        <>
          <motion.div
            className="absolute inset-0 bg-red-900/10"
            animate={{ opacity: [0.05, 0.2, 0.05] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
          {/* Veil tear effect - vertical light line */}
          {showCry && (
            <motion.div
              initial={{ scaleY: 0, opacity: 0 }}
              animate={{ scaleY: 1, opacity: 1 }}
              transition={{ duration: 1.5, ease: [0.4, 0, 0.2, 1] }}
              className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-transparent via-amber-400/80 to-transparent origin-top"
            />
          )}
        </>
      )}

      {/* Resurrection light burst */}
      {!isDarkness && showCry && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 3, opacity: [0, 0.8, 0.3] }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-amber-300/50 via-yellow-500/20 to-transparent"
        />
      )}

      <div className="relative z-10 w-full max-w-5xl px-8 py-12 text-center">
        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl font-serif font-bold text-white mb-20"
        >
          {slide.title}
        </motion.h1>

        {/* Statements - appear one by one */}
        <div className="space-y-8 mb-20">
          {slide.statements.map((statement, index) => (
            <motion.p
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ 
                opacity: visibleStatements > index ? 1 : 0, 
                y: visibleStatements > index ? 0 : 20 
              }}
              transition={{ 
                duration: isDarkness ? 1.2 : 0.6, 
                ease: "easeOut" 
              }}
              className={`text-2xl md:text-3xl font-serif ${isDarkness ? 'text-white/70' : 'text-white/90'} leading-relaxed`}
            >
              {statement}
            </motion.p>
          ))}
        </div>

        {/* Central cry */}
        {slide.cry && (
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ 
              scale: showCry ? 1 : 0.5, 
              opacity: showCry ? 1 : 0 
            }}
            transition={{ 
              duration: 1, 
              ease: [0.4, 0, 0.2, 1],
              type: "spring",
              stiffness: 100
            }}
            className="mb-20"
          >
            <span className={`text-6xl md:text-8xl font-serif font-bold ${getCryStyle()}`}>
              «{slide.cry}»
            </span>
          </motion.div>
        )}

        {/* Focus - significance with typewriter */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: showFocus ? 1 : 0, y: showFocus ? 0 : 30 }}
          transition={{ duration: 0.8 }}
          className="bg-white/5 backdrop-blur-sm rounded-xl p-10 border border-white/10"
        >
          {/* Scripture references */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {slide.focus.references.map((ref, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: showFocus ? 1 : 0, scale: showFocus ? 1 : 0.9 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="px-5 py-2 bg-accent/20 text-accent rounded-full text-base font-sans"
              >
                {ref}
              </motion.span>
            ))}
          </div>

          {/* Theological significance - typewriter */}
          <p className="text-xl md:text-2xl font-serif text-white/90 min-h-[3em]">
            {significanceText}
            {showFocus && !significanceComplete && (
              <span className="animate-pulse text-accent">|</span>
            )}
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default DramaClimaxSlide;
