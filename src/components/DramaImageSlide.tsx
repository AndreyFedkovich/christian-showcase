import { motion } from "framer-motion";
import { DramaImageSlide as DramaImageSlideType } from "@/data/redemption-drama";

interface DramaImageSlideProps {
  slide: DramaImageSlideType;
  direction: 'next' | 'prev';
}

const DramaImageSlide = ({ slide, direction }: DramaImageSlideProps) => {
  const getOverlayGradient = () => {
    switch (slide.intensity) {
      case 'low':
        return 'from-indigo-950/90 via-indigo-950/60 to-transparent';
      case 'medium':
        return 'from-purple-950/90 via-purple-950/60 to-transparent';
      case 'high':
        return 'from-rose-950/90 via-rose-950/60 to-transparent';
      case 'climax':
        return 'from-black/95 via-red-950/70 to-transparent';
      default:
        return 'from-slate-950/90 via-slate-950/60 to-transparent';
    }
  };

  const getAccentColor = () => {
    switch (slide.intensity) {
      case 'low':
        return 'text-indigo-300';
      case 'medium':
        return 'text-purple-300';
      case 'high':
        return 'text-rose-300';
      case 'climax':
        return 'text-red-400';
      default:
        return 'text-accent';
    }
  };

  const getBadgeStyle = () => {
    switch (slide.intensity) {
      case 'low':
        return 'bg-indigo-500/30 text-indigo-200 border-indigo-400/30';
      case 'medium':
        return 'bg-purple-500/30 text-purple-200 border-purple-400/30';
      case 'high':
        return 'bg-rose-500/30 text-rose-200 border-rose-400/30';
      case 'climax':
        return 'bg-red-600/30 text-red-200 border-red-400/30';
      default:
        return 'bg-white/20 text-white border-white/30';
    }
  };

  return (
    <div className="min-h-screen w-full relative overflow-hidden">
      {/* Full-screen background image */}
      <motion.div
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="absolute inset-0"
      >
        <img
          src={slide.image}
          alt={slide.title}
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* Gradient overlay from bottom */}
      <div className={`absolute inset-0 bg-gradient-to-t ${getOverlayGradient()}`} />

      {/* Climax pulsing effect */}
      {slide.intensity === 'climax' && (
        <motion.div
          className="absolute inset-0 bg-red-900/20"
          animate={{ opacity: [0.1, 0.25, 0.1] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        />
      )}

      {/* Content positioned at bottom */}
      <div className="absolute inset-0 flex flex-col justify-end z-10">
        <div className="w-full max-w-5xl mx-auto px-8 pb-16">
          {/* Act number badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className={`inline-flex items-center px-4 py-2 rounded-full border backdrop-blur-sm mb-6 ${getBadgeStyle()}`}
          >
            <span className="text-sm font-sans font-medium uppercase tracking-wider">
              {slide.actNumber}
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="text-4xl md:text-6xl font-serif font-bold text-white mb-6 drop-shadow-2xl"
          >
            {slide.title}
          </motion.h1>

          {/* Caption */}
          {slide.caption && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-lg md:text-xl text-white/80 font-serif italic max-w-3xl mb-8"
            >
              {slide.caption}
            </motion.p>
          )}

          {/* Verse quote */}
          {slide.verse && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="bg-black/30 backdrop-blur-md rounded-xl p-6 border border-white/10 max-w-2xl"
            >
              <p className={`text-xl md:text-2xl font-serif ${getAccentColor()} mb-3`}>
                «{slide.verse.text}»
              </p>
              <span className="text-white/60 font-sans text-sm uppercase tracking-wider">
                — {slide.verse.reference}
              </span>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DramaImageSlide;
