import { useState } from "react";
import { motion } from "framer-motion";
import { StoryImageSlide as StoryImageSlideType } from "@/data/seminar";

interface StoryImageSlideProps {
  slide: StoryImageSlideType;
  direction: 'next' | 'prev';
}

const StoryImageSlide = ({ slide, direction }: StoryImageSlideProps) => {
  const [crawlComplete, setCrawlComplete] = useState(false);

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
      <div className="absolute inset-0 bg-gradient-to-t from-amber-950/95 via-amber-950/70 to-amber-950/30" />

      {/* Content positioned at bottom */}
      <div className="absolute inset-0 flex flex-col justify-end z-10">
        <div className="w-full px-6 md:px-10 lg:px-16 pb-8">
          {/* Chapter badge - moves down after crawl completes */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ 
              opacity: 1, 
              y: crawlComplete ? 120 : 0,
              scale: crawlComplete ? 1.1 : 1
            }}
            transition={{ 
              duration: crawlComplete ? 1.2 : 0.6, 
              delay: crawlComplete ? 0 : 0.2,
              ease: "easeInOut"
            }}
            className="inline-flex items-center px-6 py-3 rounded-full bg-amber-500/30 border border-amber-400/30 backdrop-blur-sm mb-6"
          >
            <span className="text-lg md:text-xl font-sans font-medium text-amber-200 uppercase tracking-wider">
              {slide.chapter}
            </span>
          </motion.div>

          {/* Title - moves down after crawl completes */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ 
              opacity: 1, 
              y: crawlComplete ? 140 : 0
            }}
            transition={{ 
              duration: crawlComplete ? 1.2 : 0.7, 
              delay: crawlComplete ? 0.1 : 0.4,
              ease: "easeInOut"
            }}
            className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-white mb-6 drop-shadow-2xl"
          >
            {slide.title}
          </motion.h1>

          {/* Subtitle - moves down after crawl completes */}
          {slide.subtitle && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ 
                opacity: 1, 
                y: crawlComplete ? 160 : 0
              }}
              transition={{ 
                duration: crawlComplete ? 1.2 : 0.6, 
                delay: crawlComplete ? 0.2 : 0.5,
                ease: "easeInOut"
              }}
              className="text-2xl md:text-3xl text-amber-200 font-serif italic mb-6"
            >
              {slide.subtitle}
            </motion.p>
          )}

          {/* Star Wars Crawl story content - full width, larger font */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: crawlComplete ? 0 : 1 }}
            transition={{ duration: 0.8, delay: crawlComplete ? 0 : 0.6 }}
            className="star-wars-crawl crawl-fade w-full"
          >
            <div 
              className="crawl-content px-4"
              onAnimationEnd={() => setCrawlComplete(true)}
            >
              {slide.story.map((paragraph, index) => (
                <p 
                  key={index} 
                  className="text-4xl md:text-5xl lg:text-6xl text-amber-100 font-serif leading-relaxed mb-10"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default StoryImageSlide;
