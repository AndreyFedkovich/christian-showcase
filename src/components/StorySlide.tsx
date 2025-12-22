import { StorySlide as StorySlideType } from "@/data/seminar";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";

interface StorySlideProps {
  slide: StorySlideType;
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

const imageVariants: Variants = {
  hidden: { opacity: 0, scale: 1.05 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.7, ease: [0.4, 0, 0.2, 1] }
  }
};

const StorySlide = ({ slide, direction = 'next' }: StorySlideProps) => {
  // Variant with image
  if (slide.image) {
    return (
      <motion.div 
        className="absolute inset-0 gradient-warm flex items-center justify-center p-8"
        key={slide.title + slide.chapter}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <div className="max-w-7xl w-full">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Image Section */}
            <motion.div className="relative group" variants={imageVariants}>
              <div className="absolute -inset-1 bg-gradient-to-r from-primary via-accent to-primary opacity-30 blur-2xl group-hover:opacity-50 transition-smooth rounded-2xl" />
              <div className="relative aspect-[3/4] overflow-hidden rounded-2xl shadow-premium">
                <img 
                  src={slide.image} 
                  alt={slide.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>

            {/* Content Section */}
            <div className="space-y-9 space-x-3">
              {/* Chapter Badge */}
              <motion.div 
                className="inline-block px-6 py-2 bg-primary/20 backdrop-blur-sm rounded-full"
                variants={itemVariants}
              >
                <span className="text-xl font-sans font-medium text-primary uppercase tracking-wider">
                  {slide.chapter}
                </span>
              </motion.div>

              {/* Title */}
              <motion.h2 
                className="text-5xl md:text-6xl font-bold text-foreground leading-tight mb-2"
                variants={itemVariants}
              >
                {slide.title}
              </motion.h2>

              {slide.subtitle && (
                <motion.p 
                  className="text-4xl text-accent font-semibold italic"
                  variants={itemVariants}
                >
                  {slide.subtitle}
                </motion.p>
              )}

              {/* Story */}
              <div className="relative space-y-7 overflow-y-hidden pr-4 custom-scrollbar">
                {slide.story.map((paragraph, index) => (
                  <motion.p
                    key={index}
                    className="text-2xl md:text-4xl text-muted-foreground leading-relaxed font-sans"
                    variants={itemVariants}
                  >
                    {paragraph}
                  </motion.p>
                ))}
              </div>

              {/* Decorative element */}
              <motion.div 
                className="flex items-center gap-2 opacity-30"
                variants={itemVariants}
              >
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-primary to-transparent" />
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  // Variant without image (current design)
  return (
    <motion.div 
      className="absolute inset-0 gradient-warm flex items-center justify-center p-8"
      key={slide.title + slide.chapter}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <div className="max-w-4xl w-full space-y-9">
        {/* Chapter Badge */}
        <motion.div 
          className="inline-block px-6 py-2 bg-primary/20 backdrop-blur-sm rounded-full"
          variants={itemVariants}
        >
          <span className="text-xl font-sans font-medium text-primary uppercase tracking-wider">
            {slide.chapter}
          </span>
        </motion.div>

        {/* Title */}
        <motion.h2 
          className="text-5xl md:text-6xl font-bold text-foreground leading-tight"
          variants={itemVariants}
        >
          {slide.title}
        </motion.h2>

        {slide.subtitle && (
          <motion.p 
            className="text-4xl text-accent font-semibold italic"
            variants={itemVariants}
          >
            {slide.subtitle}
          </motion.p>
        )}

        {/* Story */}
        <div className="relative space-y-7 overflow-y-hidden pr-4 custom-scrollbar">
          {slide.story.map((paragraph, index) => (
            <motion.p
              key={index}
              className="text-2xl md:text-4xl text-muted-foreground leading-relaxed font-sans"
              variants={itemVariants}
            >
              {paragraph}
            </motion.p>
          ))}
        </div>

        {/* Quote */}
        {slide.quote && (
          <motion.blockquote 
            className="border-l-4 border-accent pl-6 py-2 italic text-lg text-muted-foreground"
            variants={itemVariants}
          >
            "{slide.quote}"
          </motion.blockquote>
        )}

        {/* Decorative element */}
        <motion.div 
          className="flex items-center gap-2 opacity-30"
          variants={itemVariants}
        >
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-primary to-transparent" />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default StorySlide;
