import { motion } from "framer-motion";
import { CreationDaySlide as CreationDaySlideType } from "@/data/creation";

interface CreationDaySlideProps {
  slide: CreationDaySlideType;
  direction: 'next' | 'prev';
}

const CreationDaySlide = ({ slide, direction }: CreationDaySlideProps) => {
  const dayLabel = `Д Е Н Ь   ${slide.dayNumber}`;

  return (
    <div className={`min-h-screen w-full flex items-center justify-center bg-gradient-to-br ${slide.gradient} relative overflow-hidden`}>
      {/* Star field background */}
      <div className="absolute inset-0">
        {Array.from({ length: 80 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              width: Math.random() * 3 + 1,
              height: Math.random() * 3 + 1,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: 2 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent" />

      <div className="relative z-10 text-center px-8 max-w-5xl">
        {/* Giant day number */}
        <motion.div
          initial={{ scale: 3, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
          className="mb-6"
        >
          <span className="text-[10rem] md:text-[14rem] font-serif font-bold text-white/15 leading-none select-none">
            {slide.dayNumber}
          </span>
        </motion.div>

        {/* Day label */}
        <motion.div
          initial={{ opacity: 0, letterSpacing: '0.5em' }}
          animate={{ opacity: 1, letterSpacing: '0.3em' }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="-mt-32 mb-8"
        >
          <span className="text-3xl md:text-5xl font-sans font-light text-white/70 uppercase tracking-[0.3em]">
            {dayLabel}
          </span>
        </motion.div>

        {/* Day title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.8 }}
          className="text-6xl md:text-8xl font-serif font-bold text-white mb-10"
        >
          {slide.dayTitle}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="text-2xl md:text-3xl text-white/60 font-serif italic max-w-3xl mx-auto"
        >
          {slide.subtitle}
        </motion.p>

        {/* Decorative line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 1.5 }}
          className="mt-16 mx-auto w-48 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent"
        />
      </div>
    </div>
  );
};

export default CreationDaySlide;
