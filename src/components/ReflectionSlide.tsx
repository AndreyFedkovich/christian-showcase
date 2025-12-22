import { ReflectionSlide as ReflectionSlideType } from "@/data/seminar";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";

interface ReflectionSlideProps {
  slide: ReflectionSlideType;
  direction?: 'next' | 'prev';
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1
    }
  },
  exit: { 
    opacity: 0,
    transition: { duration: 0.2 }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] }
  }
};

const iconVariants: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] }
  }
};

const ReflectionSlide = ({ slide, direction = 'next' }: ReflectionSlideProps) => {
  return (
    <motion.div 
      className="absolute inset-0 gradient-overlay flex items-center justify-center p-8"
      key={slide.question}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <div className="max-w-3xl w-full text-center space-y-12">
        {/* Icon */}
        <motion.div className="flex justify-center" variants={iconVariants}>
          <div className="w-24 h-24 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
            <svg 
              className="w-12 h-12 text-white" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
              />
            </svg>
          </div>
        </motion.div>

        {/* Subtitle */}
        {slide.subtitle && (
          <motion.div 
            className="inline-block px-6 py-2 bg-white/10 backdrop-blur-sm rounded-full"
            variants={itemVariants}
          >
            <span className="text-2xl font-sans font-medium text-white uppercase tracking-wider">
              {slide.subtitle}
            </span>
          </motion.div>
        )}

        {/* Question */}
        <motion.h2 
          className="text-4xl md:text-5xl font-bold text-white md:leading-[4rem] leading-[4rem] px-4"
          variants={itemVariants}
        >
          {slide.question}
        </motion.h2>

        {/* Decorative line */}
        <motion.div className="flex justify-center" variants={itemVariants}>
          <div className="w-64 h-[2px] bg-gradient-to-r from-transparent via-white/40 to-transparent"></div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ReflectionSlide;
