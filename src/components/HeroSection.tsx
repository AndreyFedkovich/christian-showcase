import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Presentation } from "@/data/presentations";
import SlideRenderer from "@/components/SlideRenderer";
import { redemptionDrama } from "@/data/redemption-drama";
import { UniversalSlide } from "@/types/slides";

interface HeroSectionProps {
  presentation: Presentation;
}

// Map presentation id to slides data
const getSlidesForPresentation = (presentationId: string): UniversalSlide[] => {
  switch (presentationId) {
    case 'salvation':
      return redemptionDrama as UniversalSlide[];
    default:
      return [];
  }
};

const HeroSection = ({ presentation }: HeroSectionProps) => {
  const navigate = useNavigate();
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [direction, setDirection] = useState<'next' | 'prev'>('next');
  
  const slides = getSlidesForPresentation(presentation.id);
  const currentSlide = slides[currentSlideIndex];

  // Auto-advance slides
  useEffect(() => {
    if (slides.length === 0) return;
    
    const interval = setInterval(() => {
      setDirection('next');
      setCurrentSlideIndex((prev) => (prev + 1) % slides.length);
    }, 7000); // 7 seconds per slide
    
    return () => clearInterval(interval);
  }, [slides.length]);

  const handleOpenPresentation = useCallback(() => {
    navigate(`/presentation/${presentation.id}`);
  }, [navigate, presentation.id]);

  const scrollToContent = useCallback(() => {
    const contentSection = document.getElementById('content-section');
    if (contentSection) {
      contentSection.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  if (slides.length === 0) {
    return null;
  }

  return (
    <section className="relative h-screen w-full bg-black overflow-hidden">
      {/* Slide Container - Full screen */}
      <div className="absolute inset-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlideIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="w-full h-full"
          >
            {currentSlide && (
              <SlideRenderer 
                slide={currentSlide} 
                direction={direction}
              />
            )}
          </motion.div>
        </AnimatePresence>

        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/50 pointer-events-none" />
      </div>

      {/* Content Overlay - Bottom */}
      <div className="absolute bottom-24 left-0 right-0 text-center px-6 z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <p className="text-sm uppercase tracking-widest text-white/50 mb-3">
            Избранная презентация
          </p>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            {presentation.title}
          </h2>
          <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto mb-8">
            {presentation.description}
          </p>
          <Button 
            onClick={handleOpenPresentation}
            size="lg"
            className="bg-white text-black hover:bg-white/90 font-semibold px-8 py-6 text-lg rounded-full gap-2"
          >
            <Play className="w-5 h-5" />
            Открыть презентацию
          </Button>
        </motion.div>
      </div>

      {/* Slide Progress Indicators */}
      <div className="absolute bottom-24 right-6 z-10 hidden md:flex flex-col gap-2">
        {slides.slice(0, 10).map((_, index) => (
          <div
            key={index}
            className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
              index === currentSlideIndex % 10
                ? "bg-white scale-125"
                : "bg-white/30"
            }`}
          />
        ))}
      </div>

      {/* Scroll Indicator */}
      <motion.button
        onClick={scrollToContent}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-white/50 hover:text-white/80 transition-colors cursor-pointer"
        animate={{
          y: [0, 8, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <span className="text-xs uppercase tracking-wider">Scroll</span>
        <ChevronDown className="w-5 h-5" />
      </motion.button>
    </section>
  );
};

export default HeroSection;
