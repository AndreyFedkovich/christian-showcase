import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

interface DramaSurveySlideProps {
  slide: {
    type: 'drama-survey';
    actNumber: string;
    title: string;
    subtitle?: string;
    questions: Array<{
      question: string;
      bibleRef?: string;
    }>;
    conclusion: {
      text: string;
      verse: {
        text: string;
        reference: string;
      };
    };
    intensity: 'low' | 'medium' | 'high' | 'climax';
  };
  direction: 'next' | 'prev';
}

const DramaSurveySlide = ({ slide, direction }: DramaSurveySlideProps) => {
  const [visibleQuestions, setVisibleQuestions] = useState(0);
  const [showConclusion, setShowConclusion] = useState(false);

  useEffect(() => {
    // Reset state when slide changes
    setVisibleQuestions(0);
    setShowConclusion(false);

    // Show questions one by one
    const questionInterval = setInterval(() => {
      setVisibleQuestions((prev) => {
        if (prev < slide.questions.length) {
          return prev + 1;
        }
        clearInterval(questionInterval);
        // Show conclusion after all questions
        setTimeout(() => setShowConclusion(true), 1500);
        return prev;
      });
    }, 2500);

    return () => clearInterval(questionInterval);
  }, [slide.questions.length]);

  const getIntensityStyles = () => {
    switch (slide.intensity) {
      case 'climax':
        return 'from-red-950 via-black to-red-950';
      case 'high':
        return 'from-red-900/80 via-black to-amber-900/60';
      case 'medium':
        return 'from-amber-900/50 via-black to-red-900/40';
      default:
        return 'from-slate-900 via-black to-slate-800';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: direction === 'next' ? 100 : -100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: direction === 'next' ? -100 : 100 }}
      transition={{ duration: 0.5 }}
      className={`min-h-screen bg-gradient-to-br ${getIntensityStyles()} flex flex-col items-center justify-center p-8 relative overflow-hidden`}
    >
      {/* Background pulse effect */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(239,68,68,0.1)_0%,_transparent_70%)] animate-pulse" />
      
      {/* Act number badge */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="absolute top-8 left-8"
      >
        <span className="text-red-400/80 text-sm font-medium tracking-widest uppercase">
          {slide.actNumber}
        </span>
      </motion.div>

      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3 }}
        className="text-4xl md:text-5xl font-bold text-white mb-2 text-center"
      >
        {slide.title}
      </motion.h1>
      
      {slide.subtitle && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-amber-300/80 text-lg mb-12 italic"
        >
          {slide.subtitle}
        </motion.p>
      )}

      {/* Questions container */}
      <div className="max-w-3xl w-full space-y-4 mb-8">
        <AnimatePresence mode="sync">
          {slide.questions.slice(0, visibleQuestions).map((q, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -50, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ 
                duration: 0.5,
                type: "spring",
                stiffness: 100
              }}
              className="relative"
            >
              <div className="bg-gradient-to-r from-red-900/40 to-transparent border-l-4 border-red-500 p-4 md:p-6 backdrop-blur-sm">
                <div className="flex items-start gap-4">
                  <span className="text-red-400 text-2xl font-bold opacity-50">
                    {index + 1}
                  </span>
                  <div className="flex-1">
                    <p className="text-white text-lg md:text-xl font-medium">
                      {q.question}
                    </p>
                    {q.bibleRef && (
                      <span className="text-amber-400/60 text-sm mt-2 inline-block">
                        {q.bibleRef}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Glow effect for newest question */}
              {index === visibleQuestions - 1 && (
                <motion.div
                  initial={{ opacity: 0.8 }}
                  animate={{ opacity: 0 }}
                  transition={{ duration: 2 }}
                  className="absolute inset-0 border-2 border-red-500/50 pointer-events-none"
                  style={{ boxShadow: '0 0 30px rgba(239, 68, 68, 0.3)' }}
                />
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Conclusion */}
      <AnimatePresence>
        {showConclusion && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, type: "spring" }}
            className="max-w-2xl text-center mt-8"
          >
            {/* Divider line */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.6 }}
              className="h-px bg-gradient-to-r from-transparent via-red-500 to-transparent mb-8"
            />
            
            {/* Conclusion text */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-2xl md:text-3xl font-bold text-white mb-6"
            >
              {slide.conclusion.text}
            </motion.p>
            
            {/* Bible verse */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="bg-black/40 border border-amber-500/30 p-6 rounded-lg"
            >
              <p className="text-amber-100 text-lg md:text-xl italic mb-3">
                «{slide.conclusion.verse.text}»
              </p>
              <span className="text-amber-400 font-medium">
                {slide.conclusion.verse.reference}
              </span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Progress indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
        {slide.questions.map((_, index) => (
          <motion.div
            key={index}
            initial={{ scale: 0 }}
            animate={{ 
              scale: index < visibleQuestions ? 1 : 0.5,
              backgroundColor: index < visibleQuestions ? 'rgb(239, 68, 68)' : 'rgb(100, 100, 100)'
            }}
            className="w-2 h-2 rounded-full"
          />
        ))}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ 
            scale: showConclusion ? 1 : 0.5,
            backgroundColor: showConclusion ? 'rgb(251, 191, 36)' : 'rgb(100, 100, 100)'
          }}
          className="w-2 h-2 rounded-full"
        />
      </div>
    </motion.div>
  );
};

export default DramaSurveySlide;
