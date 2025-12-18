import { motion } from "framer-motion";
import { DramaActSlide as DramaActSlideType } from "@/data/redemption-drama";
import { useTypewriter } from "@/hooks/use-typewriter";

interface DramaActSlideProps {
  slide: DramaActSlideType;
  direction: 'next' | 'prev';
}

const DramaActSlide = ({ slide, direction }: DramaActSlideProps) => {
  const { displayedText: actNameText, isComplete: actNameComplete } = useTypewriter({ text: slide.actName, speed: 80 });

  const getGradient = () => {
    switch (slide.actNumber) {
      case 'Вступление':
        return 'from-slate-950 via-indigo-950 to-slate-900';
      case 'Акт I':
        return 'from-slate-950 via-violet-950 to-purple-950';
      case 'Акт II':
        return 'from-slate-950 via-purple-950 to-rose-950';
      case 'Акт III':
        return 'from-slate-950 via-rose-950 to-red-950';
      case 'Финал':
        return 'from-slate-950 via-amber-950 to-yellow-950';
      default:
        return 'from-slate-950 via-slate-900 to-slate-800';
    }
  };

  const getAccentColor = () => {
    switch (slide.actNumber) {
      case 'Вступление':
        return 'text-indigo-400';
      case 'Акт I':
        return 'text-violet-400';
      case 'Акт II':
        return 'text-purple-400';
      case 'Акт III':
        return 'text-rose-400';
      case 'Финал':
        return 'text-amber-400';
      default:
        return 'text-accent';
    }
  };

  return (
    <div className={`min-h-screen w-full flex items-center justify-center bg-gradient-to-br ${getGradient()} relative overflow-hidden`}>
      {/* Atmospheric background elements */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/5 via-transparent to-transparent" />
      
      {/* Curtain effect lines */}
      <div className="absolute inset-y-0 left-0 w-px bg-gradient-to-b from-transparent via-white/20 to-transparent" />
      <div className="absolute inset-y-0 right-0 w-px bg-gradient-to-b from-transparent via-white/20 to-transparent" />
      
      <div className="relative z-10 text-center px-8 max-w-4xl">
        {/* Act number */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
          className="mb-8"
        >
          <span className={`text-6xl md:text-8xl font-serif font-bold ${getAccentColor()} tracking-wider`}>
            {slide.actNumber}
          </span>
        </motion.div>

        {/* Act name - typewriter effect */}
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="text-4xl md:text-6xl font-serif font-bold text-white mb-6 min-h-[1.5em]"
        >
          {actNameText}
          {!actNameComplete && (
            <span className="animate-pulse">|</span>
          )}
        </motion.h1>

        {/* Subtitle */}
        {slide.subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: actNameComplete ? 1 : 0, y: actNameComplete ? 0 : 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl md:text-2xl text-white/60 font-sans mb-12"
          >
            {slide.subtitle}
          </motion.p>
        )}

        {/* Verse epigraph */}
        {slide.verse && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: actNameComplete ? 1 : 0, y: actNameComplete ? 0 : 30 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-16 border-t border-white/10 pt-8"
          >
            <p className="text-lg md:text-xl text-white/80 italic font-serif mb-3">
              «{slide.verse.text}»
            </p>
            <p className={`text-sm ${getAccentColor()} font-sans uppercase tracking-widest`}>
              {slide.verse.reference}
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default DramaActSlide;
