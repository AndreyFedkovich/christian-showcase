import { motion } from "framer-motion";
import { GodExistsClimaxSlide as GodExistsClimaxSlideType } from "@/data/god-exists";
import { useState, useEffect } from "react";

interface GodExistsClimaxSlideProps {
  slide: GodExistsClimaxSlideType;
  direction: 'next' | 'prev';
}

const GodExistsClimaxSlide = ({ slide, direction }: GodExistsClimaxSlideProps) => {
  const [visibleStatements, setVisibleStatements] = useState(0);
  const [showConclusion, setShowConclusion] = useState(false);
  const [showVerse, setShowVerse] = useState(false);

  useEffect(() => {
    // Reset state on slide change
    setVisibleStatements(0);
    setShowConclusion(false);
    setShowVerse(false);

    // Cascade statements
    const statementTimers = slide.statements.map((_, index) => {
      return setTimeout(() => {
        setVisibleStatements(index + 1);
      }, (index + 1) * 1200);
    });

    // Show conclusion after all statements
    const conclusionTimer = setTimeout(() => {
      setShowConclusion(true);
    }, (slide.statements.length + 1) * 1200);

    // Show verse after conclusion
    const verseTimer = setTimeout(() => {
      setShowVerse(true);
    }, (slide.statements.length + 2) * 1200);

    return () => {
      statementTimers.forEach(clearTimeout);
      clearTimeout(conclusionTimer);
      clearTimeout(verseTimer);
    };
  }, [slide]);

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-slate-950 via-indigo-950/50 to-slate-950 relative overflow-hidden">
      {/* Background glow effects */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-t from-amber-500/5 via-transparent to-transparent"
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
      
      {/* Light burst when conclusion appears */}
      {showConclusion && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 3, opacity: [0, 0.7, 0.2] }}
          transition={{ duration: 2.5, ease: "easeOut" }}
          className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-amber-400/40 via-amber-500/10 to-transparent"
        />
      )}

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-amber-400/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [-20, 20, -20],
              opacity: [0.2, 0.6, 0.2],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 w-full max-w-5xl px-8 py-12 text-center">
        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-4xl md:text-6xl font-serif font-bold text-white mb-16 drop-shadow-lg"
        >
          {slide.title}
        </motion.h1>

        {/* Statements - appear one by one */}
        <div className="space-y-6 mb-16">
          {slide.statements.map((statement, index) => (
            <motion.p
              key={index}
              initial={{ opacity: 0, x: -30 }}
              animate={{ 
                opacity: visibleStatements > index ? 1 : 0, 
                x: visibleStatements > index ? 0 : -30 
              }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-2xl md:text-3xl font-serif text-white/80 leading-relaxed"
            >
              {statement}
            </motion.p>
          ))}
        </div>

        {/* Central conclusion */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ 
            scale: showConclusion ? 1 : 0.5, 
            opacity: showConclusion ? 1 : 0 
          }}
          transition={{ 
            duration: 1.2, 
            ease: [0.4, 0, 0.2, 1],
            type: "spring",
            stiffness: 80
          }}
          className="mb-16 py-8 px-6 bg-gradient-to-r from-amber-500/10 via-amber-400/20 to-amber-500/10 rounded-2xl border border-amber-400/30"
        >
          <span className="text-3xl md:text-5xl font-serif font-bold text-amber-300 drop-shadow-[0_0_40px_rgba(252,211,77,0.6)] leading-tight block">
            {slide.conclusion}
          </span>
        </motion.div>

        {/* Scripture verse */}
        {slide.verse && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: showVerse ? 1 : 0, y: showVerse ? 0 : 30 }}
            transition={{ duration: 0.8 }}
            className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10"
          >
            <p className="text-2xl md:text-3xl font-serif text-white/80 italic mb-4">
              «{slide.verse.text}»
            </p>
            <span className="text-amber-400/90 font-sans text-base">
              — {slide.verse.reference}
            </span>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default GodExistsClimaxSlide;
