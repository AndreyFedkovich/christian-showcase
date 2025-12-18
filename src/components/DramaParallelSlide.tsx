import { motion } from "framer-motion";
import { DramaParallelSlide as DramaParallelSlideType } from "@/data/redemption-drama";

interface DramaParallelSlideProps {
  slide: DramaParallelSlideType;
  direction: 'next' | 'prev';
}

const DramaParallelSlide = ({ slide, direction }: DramaParallelSlideProps) => {
  const getLeftGradient = () => {
    if (slide.left.tone === 'dark') {
      return 'from-slate-950 via-gray-900 to-slate-800';
    }
    return 'from-slate-800 via-slate-700 to-slate-600';
  };

  const getRightGradient = () => {
    if (slide.right.tone === 'light') {
      switch (slide.intensity) {
        case 'low':
          return 'from-indigo-900 via-indigo-800 to-indigo-700';
        case 'medium':
          return 'from-purple-900 via-purple-800 to-violet-700';
        case 'high':
          return 'from-amber-900 via-amber-800 to-orange-700';
        case 'climax':
          return 'from-amber-800 via-yellow-700 to-amber-600';
        default:
          return 'from-emerald-900 via-emerald-800 to-teal-700';
      }
    }
    return 'from-slate-700 via-slate-600 to-slate-500';
  };

  const getLeftAccent = () => {
    if (slide.left.tone === 'dark') {
      return 'border-red-500/40 text-red-400';
    }
    return 'border-slate-500/40 text-slate-300';
  };

  const getRightAccent = () => {
    if (slide.right.tone === 'light') {
      switch (slide.intensity) {
        case 'low':
          return 'border-indigo-400/40 text-indigo-300';
        case 'medium':
          return 'border-purple-400/40 text-purple-300';
        case 'high':
          return 'border-amber-400/40 text-amber-300';
        case 'climax':
          return 'border-yellow-400/50 text-yellow-300';
        default:
          return 'border-emerald-400/40 text-emerald-300';
      }
    }
    return 'border-slate-400/40 text-slate-300';
  };

  const getIntensityBadge = () => {
    switch (slide.intensity) {
      case 'low':
        return 'bg-indigo-500/20 text-indigo-300';
      case 'medium':
        return 'bg-purple-500/20 text-purple-300';
      case 'high':
        return 'bg-amber-500/20 text-amber-300';
      case 'climax':
        return 'bg-yellow-500/20 text-yellow-300';
      default:
        return 'bg-white/10 text-white/80';
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col relative overflow-hidden">
      {/* Header with act number and title */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="absolute top-0 left-0 right-0 z-20 bg-gradient-to-b from-black/80 to-transparent py-8 px-8"
      >
        <div className="max-w-7xl mx-auto flex items-center gap-4">
          <span className={`px-4 py-2 rounded-full ${getIntensityBadge()} font-sans text-sm uppercase tracking-widest`}>
            {slide.actNumber}
          </span>
          <h1 className="text-2xl md:text-4xl font-serif font-bold text-white">
            {slide.title}
          </h1>
        </div>
      </motion.div>

      {/* Two-column layout */}
      <div className="flex-1 flex flex-col md:flex-row">
        {/* Left side - Dark */}
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className={`flex-1 bg-gradient-to-br ${getLeftGradient()} flex flex-col justify-center px-8 md:px-12 py-20 md:py-12`}
        >
          {/* Label */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className={`border-l-4 ${getLeftAccent().split(' ')[0]} pl-4 mb-8`}
          >
            <h2 className={`text-xl md:text-2xl font-serif font-semibold ${getLeftAccent().split(' ')[1]}`}>
              {slide.left.label}
            </h2>
          </motion.div>

          {/* Content items */}
          <div className="space-y-4">
            {slide.left.content.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.5 + index * 0.15 }}
                className="flex items-start gap-3"
              >
                <span className="text-red-500/60 text-lg">•</span>
                <p className="text-lg md:text-xl text-white/80 font-serif">
                  {item}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Divider */}
        <div className="hidden md:block w-px bg-gradient-to-b from-transparent via-white/20 to-transparent" />
        <div className="md:hidden h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

        {/* Right side - Light */}
        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className={`flex-1 bg-gradient-to-br ${getRightGradient()} flex flex-col justify-center px-8 md:px-12 py-12`}
        >
          {/* Label */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className={`border-l-4 ${getRightAccent().split(' ')[0]} pl-4 mb-8`}
          >
            <h2 className={`text-xl md:text-2xl font-serif font-semibold ${getRightAccent().split(' ')[1]}`}>
              {slide.right.label}
            </h2>
          </motion.div>

          {/* Content items */}
          <div className="space-y-4">
            {slide.right.content.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.6 + index * 0.15 }}
                className="flex items-start gap-3"
              >
                <span className="text-amber-400/60 text-lg">✦</span>
                <p className="text-lg md:text-xl text-white/90 font-serif">
                  {item}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Conclusion - appears at bottom center */}
      {slide.conclusion && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="absolute bottom-0 left-0 right-0 z-20 bg-gradient-to-t from-black/90 via-black/60 to-transparent py-8 px-8"
        >
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-xl md:text-2xl font-serif font-semibold text-white">
              {slide.conclusion}
            </p>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default DramaParallelSlide;
