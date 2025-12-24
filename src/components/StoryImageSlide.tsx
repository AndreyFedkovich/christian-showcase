import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { StoryImageSlide as StoryImageSlideType } from "@/data/seminar";

interface StoryImageSlideProps {
  slide: StoryImageSlideType;
  direction: 'next' | 'prev';
}

const StoryImageSlide = ({ slide, direction }: StoryImageSlideProps) => {
  const [crawlComplete, setCrawlComplete] = useState(false);

  // Auto-complete after 25 seconds (when text has mostly passed)
  useEffect(() => {
    const timer = setTimeout(() => {
      setCrawlComplete(true);
    }, 25000);
    return () => clearTimeout(timer);
  }, []);

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
      <div className="absolute inset-0 bg-gradient-to-t from-amber-950/95 via-amber-950/70 to-amber-950/30" />

      {/* Content container */}
      <div className="absolute inset-0 z-10">
        <AnimatePresence mode="wait">
          {!crawlComplete ? (
            /* During crawl - content at bottom with crawl */
            <motion.div
              key="crawling"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="absolute inset-0 flex flex-col justify-end"
            >
              <div className="w-full px-6 md:px-10 lg:px-16 pb-8">
                {/* Chapter badge */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="inline-flex items-center px-6 py-3 rounded-full bg-amber-500/30 border border-amber-400/30 backdrop-blur-sm mb-6"
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
                  className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-white mb-6 drop-shadow-2xl"
                >
                  {slide.title}
                </motion.h1>

                {/* Subtitle */}
                {slide.subtitle && (
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="text-2xl md:text-3xl text-amber-200 font-serif italic mb-6"
                  >
                    {slide.subtitle}
                  </motion.p>
                )}

                {/* Star Wars Crawl story content */}
                <div className="star-wars-crawl crawl-fade w-full overflow-x-hidden">
                  <div key={slide.title} className="crawl-content px-[20rem]">
                    {slide.story.map((paragraph, index) => (
                      <p 
                        key={index} 
                        className="text-4xl md:text-5xl lg:text-6xl text-amber-100 font-serif leading-relaxed mb-10 whitespace-normal break-words"
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            /* After crawl - content at bottom */
            <motion.div
              key="complete"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="absolute bottom-24 left-6 right-6 md:left-10 md:right-10 lg:left-16 lg:right-16"
            >
              {/* Chapter badge */}
              <div className="inline-flex items-center px-6 py-3 rounded-full bg-amber-500/30 border border-amber-400/30 backdrop-blur-sm mb-6">
                <span className="text-lg md:text-xl font-sans font-medium text-amber-200 uppercase tracking-wider">
                  {slide.chapter}
                </span>
              </div>

              {/* Title */}
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-white mb-6 drop-shadow-2xl">
                {slide.title}
              </h1>

              {/* Subtitle */}
              {slide.subtitle && (
                <p className="text-2xl md:text-3xl text-amber-200 font-serif italic">
                  {slide.subtitle}
                </p>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default StoryImageSlide;
