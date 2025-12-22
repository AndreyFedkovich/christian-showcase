import { ArgumentSlide as ArgumentSlideType } from "@/data/god-exists";
import { ThumbsUp, ThumbsDown, Lightbulb, Quote } from "lucide-react";
import { motion } from "framer-motion";

interface ArgumentSlideProps {
  slide: ArgumentSlideType;
  direction?: 'next' | 'prev';
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.4, 0, 0.2, 1] as const
    }
  }
};

const ArgumentSlide = ({ slide }: ArgumentSlideProps) => {
  const isPro = slide.argumentType === 'pro';

  return (
    <div className={`absolute inset-0 flex items-center justify-center p-8 md:p-12 ${
      isPro 
        ? 'bg-gradient-to-br from-emerald-900 via-emerald-800 to-teal-900' 
        : 'bg-gradient-to-br from-rose-900 via-rose-800 to-red-900'
    }`}>
      {/* Decorative background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className={`absolute top-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl ${
          isPro ? 'bg-emerald-500/20' : 'bg-rose-500/20'
        }`} />
        <div className={`absolute bottom-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl ${
          isPro ? 'bg-teal-500/20' : 'bg-red-500/20'
        }`} />
      </div>

      <motion.div 
        className="relative max-w-5xl w-full space-y-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header */}
        <motion.div className="flex items-center gap-5" variants={itemVariants}>
          <div className={`w-20 h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center ${
            isPro ? 'bg-emerald-500/30' : 'bg-rose-500/30'
          }`}>
            {isPro ? (
              <ThumbsUp className="w-10 h-10 md:w-12 md:h-12 text-emerald-300" />
            ) : (
              <ThumbsDown className="w-10 h-10 md:w-12 md:h-12 text-rose-300" />
            )}
          </div>
          <div className={`inline-block px-5 py-2.5 rounded-full ${
            isPro ? 'bg-emerald-500/30' : 'bg-rose-500/30'
          }`}>
            <span className={`text-base md:text-lg font-sans font-bold uppercase tracking-wider ${
              isPro ? 'text-emerald-300' : 'text-rose-300'
            }`}>
              {isPro ? 'Аргумент ЗА' : 'Аргумент ПРОТИВ'}
            </span>
          </div>
        </motion.div>

        {/* Argument Name */}
        <motion.h2 
          className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight"
          variants={itemVariants}
        >
          {slide.name}
        </motion.h2>

        {/* Idea Section */}
        <motion.div 
          className={`relative p-10 md:p-12 rounded-2xl border ${
            isPro 
              ? 'bg-emerald-800/30 border-emerald-500/30' 
              : 'bg-rose-800/30 border-rose-500/30'
          }`}
          variants={itemVariants}
        >
          <div className="absolute -top-4 left-6">
            <div className={`px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-wider ${
              isPro ? 'bg-emerald-500 text-emerald-950' : 'bg-rose-500 text-rose-950'
            }`}>
              <div className="flex items-center gap-1.5">
                <Lightbulb className="w-4 h-4" />
                Идея
              </div>
            </div>
          </div>
          {(Array.isArray(slide.idea) ? slide.idea : [slide.idea]).map((idea, index) => (
              <p key={index} className="text-2xl md:text-3xl text-white/90 leading-relaxed mt-3 first:mt-0">
                {idea}
              </p>
          ))}
        </motion.div>

        {/* Summary Section */}
        <motion.div 
          className={`relative p-8 md:p-10 rounded-xl ${
            isPro ? 'bg-emerald-500/20' : 'bg-rose-500/20'
          }`}
          variants={itemVariants}
        >
          <div className="flex items-start gap-5">
            <Quote className={`w-10 h-10 md:w-12 md:h-12 flex-shrink-0 ${
              isPro ? 'text-emerald-400' : 'text-rose-400'
            }`} />
            <div>
              <p className={`text-base md:text-lg font-bold uppercase tracking-wider mb-3 ${
                isPro ? 'text-emerald-400' : 'text-rose-400'
              }`}>
                Коротко
              </p>
              <p className="text-3xl md:text-4xl font-semibold text-white italic">
                {slide.summary}
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ArgumentSlide;
