import { ConclusionSlide as ConclusionSlideType } from "@/data/seminar";
import { Check } from "lucide-react";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";

interface ConclusionSlideProps {
  slide: ConclusionSlideType;
  direction?: 'next' | 'prev';
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1
    }
  },
  exit: { 
    opacity: 0,
    transition: { duration: 0.2 }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] }
  }
};

const pointVariants: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] }
  }
};

const ConclusionSlide = ({ slide, direction = 'next' }: ConclusionSlideProps) => {
  return (
    <motion.div 
      className="absolute inset-0 gradient-warm flex items-center justify-center p-8"
      key={slide.title}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <div className="max-w-4xl w-full space-y-10">
        {/* Header */}
        <motion.div className="text-center space-y-4" variants={itemVariants}>
          <div className="inline-block px-6 py-2 bg-primary/20 backdrop-blur-sm rounded-full">
            <span className="text-sm font-sans font-medium text-primary uppercase tracking-wider">
              Главный вывод
            </span>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold text-foreground">
            {slide.title}
          </h2>
        </motion.div>

        {/* Points */}
        <div className="space-y-6">
          {slide.points.map((point, index) => (
            <motion.div 
              key={index}
              className="flex items-start gap-4 p-6 bg-card/50 backdrop-blur-sm rounded-lg border border-border/50 hover:border-primary/50 transition-smooth hover:-translate-y-1 shadow-card hover:shadow-premium"
              variants={pointVariants}
            >
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center mt-1">
                <Check className="w-5 h-5 text-primary" />
              </div>
              <p className="text-2xl text-foreground font-sans leading-relaxed flex-1">
                {point}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Verse */}
        {slide.verse && (
          <motion.div 
            className="relative mt-12 p-8 bg-gradient-to-br from-primary/10 to-accent/10 backdrop-blur-sm rounded-lg border border-primary/20"
            variants={itemVariants}
          >
            <blockquote className="text-xl md:text-2xl text-foreground italic leading-relaxed mb-4">
              «{slide.verse.text}»
            </blockquote>
            <cite className="text-xl text-muted-foreground font-sans uppercase tracking-wider not-italic">
              — {slide.verse.reference}
            </cite>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default ConclusionSlide;
