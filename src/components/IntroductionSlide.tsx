import { motion } from "framer-motion";
import type { Variants } from "framer-motion";

// Flexible interface that works with both IntroductionSlide from epistles and SeminarIntroductionSlide
interface IntroductionSlideData {
  type: 'introduction';
  title: string;
  subtitle?: string;
  content: string[];
  image: string;
}

interface IntroductionSlideProps {
  slide: IntroductionSlideData;
  direction: 'next' | 'prev';
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
  hidden: { opacity: 0, x: -30 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] }
  }
};

const imageVariants: Variants = {
  hidden: { opacity: 0, x: 50 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.7, ease: [0.4, 0, 0.2, 1], delay: 0.2 }
  }
};

const IntroductionSlide = ({ slide, direction }: IntroductionSlideProps) => {
  return (
    <motion.div 
      className="w-full h-screen gradient-warm flex items-center justify-center p-8"
      key={slide.title}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <div className="max-w-[100rem] w-full grid grid-cols-1 lg:grid-cols-7 gap-12 items-center">
        {/* Левая часть - изображение (4 колонки из 7) */}
        <motion.div 
          className="lg:col-span-4"
          variants={imageVariants}
        >
          <div className="aspect-[5/4] h-[700px] overflow-hidden rounded-2xl shadow-premium">
            <img 
              src={slide.image} 
              alt={slide.title}
              className="w-full h-full object-cover"
            />
          </div>
        </motion.div>

        {/* Правая часть - текст (3 колонки из 7) */}
        <div className="lg:col-span-3 space-y-9">
          <div className="space-y-9">
            <motion.h1
                className="text-5xl md:text-6xl font-bold text-foreground tracking-tight"
                variants={itemVariants}
            >
              {slide.title}
            </motion.h1>
            {slide.subtitle && (
                <motion.p
                    className="text-4xl text-accent font-sans font-semibold leading-[3rem]"
                    variants={itemVariants}
                >
                  {slide.subtitle}
                </motion.p>
            )}
          </div>

          <div className="space-y-7">
            {slide.content.map((paragraph, index) => (
                <motion.p
                    key={index}
                    className="text-2xl md:text-4xl text-muted-foreground font-sans md:leading-[2.7rem]"
                    variants={itemVariants}
                >
                  {paragraph}
                </motion.p>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default IntroductionSlide;
