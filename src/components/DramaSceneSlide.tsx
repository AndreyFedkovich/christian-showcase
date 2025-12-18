import { motion } from "framer-motion";
import { DramaSceneSlide as DramaSceneSlideType } from "@/data/redemption-drama";
import { useTypewriter } from "@/hooks/use-typewriter";
import { Zap, Flame, Skull, Sparkles } from "lucide-react";

interface DramaSceneSlideProps {
  slide: DramaSceneSlideType;
  direction: 'next' | 'prev';
}

const DramaSceneSlide = ({ slide, direction }: DramaSceneSlideProps) => {
  const { displayedText: thesisText, isComplete: thesisComplete } = useTypewriter({ text: slide.thesis, speed: 40 });

  const getGradient = () => {
    switch (slide.intensity) {
      case 'low':
        return 'from-slate-950 via-indigo-950 to-slate-900';
      case 'medium':
        return 'from-slate-950 via-purple-950 to-violet-950';
      case 'high':
        return 'from-slate-950 via-rose-950 to-red-950';
      case 'climax':
        return 'from-black via-red-950 to-black';
      default:
        return 'from-slate-950 via-slate-900 to-slate-800';
    }
  };

  const getAccentColor = () => {
    switch (slide.intensity) {
      case 'low':
        return 'bg-indigo-500/80 text-indigo-100';
      case 'medium':
        return 'bg-purple-500/80 text-purple-100';
      case 'high':
        return 'bg-rose-500/80 text-rose-100';
      case 'climax':
        return 'bg-red-600/80 text-red-100';
      default:
        return 'bg-accent/80 text-accent-foreground';
    }
  };

  const getDynamicIcon = () => {
    switch (slide.intensity) {
      case 'low':
        return <Sparkles className="w-4 h-4" />;
      case 'medium':
        return <Zap className="w-4 h-4" />;
      case 'high':
        return <Flame className="w-4 h-4" />;
      case 'climax':
        return <Skull className="w-4 h-4" />;
      default:
        return <Zap className="w-4 h-4" />;
    }
  };

  const getBorderColor = () => {
    switch (slide.intensity) {
      case 'low':
        return 'border-indigo-500/30';
      case 'medium':
        return 'border-purple-500/30';
      case 'high':
        return 'border-rose-500/30';
      case 'climax':
        return 'border-red-500/50';
      default:
        return 'border-white/20';
    }
  };

  return (
    <div className={`min-h-screen w-full flex items-center justify-center bg-gradient-to-br ${getGradient()} relative overflow-hidden`}>
      {/* Atmospheric overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/5 via-transparent to-transparent" />
      
      {/* Climax pulsing effect */}
      {slide.intensity === 'climax' && (
        <motion.div
          className="absolute inset-0 bg-red-900/20"
          animate={{ opacity: [0.1, 0.3, 0.1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      )}

      <div className="relative z-10 w-full max-w-5xl px-8 py-12">
        {/* Header: Act number + Scene title */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <span className="text-white/40 font-sans text-sm uppercase tracking-widest">
            {slide.actNumber}
          </span>
          <h1 className="text-3xl md:text-5xl font-serif font-bold text-white mt-2">
            {slide.sceneTitle}
          </h1>
        </motion.div>

        {/* Dynamic badge */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${getAccentColor()} mb-8`}
        >
          {getDynamicIcon()}
          <span className="text-sm font-sans font-medium">{slide.dynamic}</span>
        </motion.div>

        {/* Plot description */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-10 space-y-4"
        >
          {slide.plot.map((paragraph, index) => (
            <motion.p
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.4 + index * 0.15 }}
              className="text-lg md:text-xl text-white/80 font-serif leading-relaxed"
            >
              {paragraph}
            </motion.p>
          ))}
        </motion.div>

        {/* Thesis - typewriter effect */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className={`border-l-4 ${getBorderColor()} pl-6 py-4 mb-10`}
        >
          <p className="text-xl md:text-2xl font-serif font-semibold text-white min-h-[2em]">
            {thesisText}
            {!thesisComplete && (
              <span className="animate-pulse text-accent">|</span>
            )}
          </p>
        </motion.div>

        {/* Focus for deepening - appears after thesis completes */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: thesisComplete ? 1 : 0, y: thesisComplete ? 0 : 20 }}
          transition={{ duration: 0.6 }}
          className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10"
        >
          <h3 className="text-sm font-sans uppercase tracking-widest text-white/50 mb-4">
            Фокус для углубления
          </h3>
          
          {/* Scripture references */}
          <div className="flex flex-wrap gap-2 mb-4">
            {slide.focus.references.map((ref, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: thesisComplete ? 1 : 0, scale: thesisComplete ? 1 : 0.9 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="px-3 py-1 bg-accent/20 text-accent rounded-full text-sm font-sans"
              >
                {ref}
              </motion.span>
            ))}
          </div>

          {/* Explanation */}
          {slide.focus.explanation && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: thesisComplete ? 1 : 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-white/70 font-serif italic"
            >
              {slide.focus.explanation}
            </motion.p>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default DramaSceneSlide;
