import { motion } from "framer-motion";
import { IntroImageSlide as IntroImageSlideType } from "@/data/seminar";

interface IntroImageSlideProps {
  slide: IntroImageSlideType;
  direction: 'next' | 'prev';
}

const IntroImageSlide = ({ slide, direction }: IntroImageSlideProps) => {
  // Determine image position style
  const getImagePositionStyle = () => {
    switch (slide.imagePosition) {
      case 'top':
        return { objectPosition: '50% 0%' };
      case 'top-center':
        return { objectPosition: '50% 25%' };
      case 'bottom':
        return { objectPosition: '50% 100%' };
      default:
        return { objectPosition: '50% 50%' };
    }
  };

  return (
    <div className="min-h-screen w-full relative">
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
          style={getImagePositionStyle()}
        />
      </motion.div>

      {/* Warm gradient overlay from bottom */}
      <div className="absolute inset-0 bg-gradient-to-t from-amber-950/65 via-amber-950/40 to-amber-950/10" />

      {/* Content container */}
      <div className="absolute inset-0 z-10 flex flex-col justify-end">
        <div className="w-full px-6 md:px-10 lg:px-16 pb-16 md:pb-24">
          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-white mb-8 drop-shadow-2xl"
          >
            {slide.title}
          </motion.h1>

          {/* Subtitle */}
          {slide.subtitle && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-4xl md:text-5xl text-amber-200 font-serif italic mb-16"
            >
              {slide.subtitle}
            </motion.p>
          )}

          {/* Content paragraphs */}
          <div className="max-w-4xl">
            {slide.content.map((paragraph, index) => (
              <motion.p
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 + index * 0.2 }}
                className="text-3xl md:text-4xl text-amber-100/90 font-serif leading-relaxed mb-4"
              >
                {paragraph}
              </motion.p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntroImageSlide;
