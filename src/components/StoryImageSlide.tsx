import { motion } from "framer-motion";
import { StoryImageSlide as StoryImageSlideType } from "@/data/seminar";

interface StoryImageSlideProps {
  slide: StoryImageSlideType;
  direction: 'next' | 'prev';
}

const StoryImageSlide = ({ slide, direction }: StoryImageSlideProps) => {
  return (
    <div className="min-h-screen w-full relative overflow-hidden">
      {/* Full-screen background image with Ken Burns effect */}
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

      {/* Warm gradient overlay from bottom */}
      <div className="absolute inset-0 bg-gradient-to-t from-amber-950/95 via-amber-950/60 to-transparent" />

      {/* Content positioned at bottom */}
      <div className="absolute inset-0 flex flex-col justify-end z-10">
      <div className="w-full px-8 md:px-12 lg:px-16 pb-20">
          {/* Chapter badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center px-6 py-3 rounded-full bg-amber-500/30 border border-amber-400/30 backdrop-blur-sm mb-8"
          >
            <span className="text-lg md:text-xl font-sans font-medium text-amber-200 uppercase tracking-wider">
              {slide.chapter}
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="text-6xl md:text-7xl lg:text-8xl font-serif font-bold text-white mb-8 drop-shadow-2xl"
          >
            {slide.title}
          </motion.h1>

          {/* Subtitle */}
          {slide.subtitle && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-3xl md:text-4xl text-amber-200 font-serif italic mb-10"
            >
              {slide.subtitle}
            </motion.p>
          )}

          {/* Story content in blurred block */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="bg-black/30 backdrop-blur-md rounded-xl p-10 md:p-12 border border-white/10 max-w-3xl"
          >
            {slide.story.map((paragraph, index) => (
              <p 
                key={index} 
                className="text-2xl md:text-3xl text-amber-100 leading-relaxed mb-5 last:mb-0"
              >
                {paragraph}
              </p>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default StoryImageSlide;
