import { motion } from "framer-motion";
import { DramaScriptureSlide as DramaScriptureSlideType } from "@/data/redemption-drama";

interface DramaScriptureSlideProps {
  slide: DramaScriptureSlideType;
  direction: 'next' | 'prev';
}

const DramaScriptureSlide = ({ slide, direction }: DramaScriptureSlideProps) => {
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
        return 'text-indigo-400';
      case 'medium':
        return 'text-purple-400';
      case 'high':
        return 'text-rose-400';
      case 'climax':
        return 'text-red-500';
      default:
        return 'text-accent';
    }
  };

  const getQuoteColor = () => {
    switch (slide.intensity) {
      case 'low':
        return 'text-indigo-400/50';
      case 'medium':
        return 'text-purple-400/50';
      case 'high':
        return 'text-rose-400/50';
      case 'climax':
        return 'text-red-500/60';
      default:
        return 'text-accent/50';
    }
  };

  const getBadgeStyle = () => {
    switch (slide.intensity) {
      case 'low':
        return 'bg-indigo-500/20 text-indigo-300';
      case 'medium':
        return 'bg-purple-500/20 text-purple-300';
      case 'high':
        return 'bg-rose-500/20 text-rose-300';
      case 'climax':
        return 'bg-red-600/20 text-red-300';
      default:
        return 'bg-white/10 text-white/80';
    }
  };

  return (
    <div className={`min-h-screen w-full flex items-center justify-center bg-gradient-to-br ${getGradient()} relative overflow-hidden`}>
      {/* Atmospheric overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/5 via-transparent to-transparent" />

      {/* Climax pulsing effect */}
      {slide.intensity === 'climax' && (
        <motion.div
          className="absolute inset-0 bg-red-900/15"
          animate={{ opacity: [0.1, 0.25, 0.1] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
      )}

      <div className="relative z-10 w-full max-w-4xl px-8 py-12">
        {/* Act number */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <span className={`inline-block px-4 py-2 rounded-full ${getBadgeStyle()} font-sans text-sm uppercase tracking-widest`}>
            {slide.actNumber}
          </span>
        </motion.div>

        {/* Large decorative quote mark */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center mb-4"
        >
          <span className={`text-[10rem] md:text-[14rem] font-serif leading-none ${getQuoteColor()}`}>
            "
          </span>
        </motion.div>

        {/* Verses - appear sequentially */}
        <div className="space-y-6 -mt-24 relative z-10">
          {slide.verses.map((verse, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 + index * 0.3 }}
              className="text-center"
            >
              {verse.number && (
                <span className={`${getAccentColor()} font-sans text-sm mr-2`}>
                  {verse.number}
                </span>
              )}
              <span className="text-2xl md:text-4xl font-serif text-white leading-relaxed">
                {verse.text}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Reference */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 + slide.verses.length * 0.3 }}
          className="text-center mt-10"
        >
          <span className={`${getAccentColor()} font-sans text-lg uppercase tracking-wider`}>
            — {slide.reference}
          </span>
        </motion.div>

        {/* Context */}
        {slide.context && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 + slide.verses.length * 0.3 }}
            className="mt-12 text-center"
          >
            <p className="text-lg md:text-xl text-white/60 font-serif italic max-w-2xl mx-auto">
              {slide.context}
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default DramaScriptureSlide;
