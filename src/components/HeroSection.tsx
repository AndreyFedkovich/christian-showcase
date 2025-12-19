import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Play } from "lucide-react";
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
            style={{
              maskImage: 'linear-gradient(to bottom, black 0%, black 50%, transparent 85%)',
              WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 50%, transparent 85%)',
            }}
          >
            {currentSlide && (
              <SlideRenderer 
                slide={currentSlide} 
                direction={direction}
              />
            )}
          </motion.div>
        </AnimatePresence>

        {/* Gradient overlays for text readability */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Top vignette for navbar readability */}
          <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/50 to-transparent" />
          {/* Bottom fade for smooth transition to info panel */}
          <div className="absolute inset-x-0 bottom-0 h-[40%] bg-gradient-to-t from-black via-black/60 to-transparent" />
        </div>
      </div>

      {/* Content Overlay - Bottom */}
      <div className="absolute bottom-12 left-0 right-0 text-center px-6 z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
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

    </section>
  );
};

export default HeroSection;
