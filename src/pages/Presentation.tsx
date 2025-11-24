import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ChevronLeft, ChevronRight, X, Grid3x3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import DiscipleSlide from "@/components/DiscipleSlide";
import IntroSlide from "@/components/IntroSlide";
import { disciples } from "@/data/disciples";

const Presentation = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const initialSlide = parseInt(searchParams.get("slide") || "-1"); // -1 for intro slide
  const [currentSlide, setCurrentSlide] = useState(initialSlide);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [direction, setDirection] = useState<'next' | 'prev'>('next');
  const [isAnimating, setIsAnimating] = useState(false);
  const [showIntro, setShowIntro] = useState(initialSlide === -1);

  // Fullscreen management
  useEffect(() => {
    const enterFullscreen = async () => {
      try {
        await document.documentElement.requestFullscreen();
        setIsFullscreen(true);
      } catch (err) {
        console.log("Fullscreen not supported or denied");
      }
    };

    enterFullscreen();

    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      if (document.fullscreenElement) {
        document.exitFullscreen();
      }
    };
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " ") {
        e.preventDefault();
        nextSlide();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        prevSlide();
      } else if (e.key === "Escape") {
        exitPresentation();
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [currentSlide]);

  const startPresentation = () => {
    setShowIntro(false);
    setCurrentSlide(0);
  };

  const nextSlide = () => {
    if (isAnimating) return;
    if (showIntro) {
      startPresentation();
      return;
    }
    setDirection('next');
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentSlide((prev) => (prev + 1) % disciples.length);
      setIsAnimating(false);
    }, 300);
  };

  const prevSlide = () => {
    if (isAnimating || showIntro) return;
    if (currentSlide === 0) {
      setShowIntro(true);
      setCurrentSlide(-1);
      return;
    }
    setDirection('prev');
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentSlide((prev) => (prev - 1 + disciples.length) % disciples.length);
      setIsAnimating(false);
    }, 300);
  };

  const exitPresentation = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    }
    navigate("/");
  };

  return (
    <div 
      className="h-screen w-screen bg-background overflow-hidden"
      onClick={nextSlide}
    >
      {/* Navigation Controls */}
      <div className="absolute top-6 left-6 right-6 z-50 flex justify-between items-center pointer-events-none">
        <div className="flex gap-2 pointer-events-auto">
          <Button
            variant="secondary"
            size="icon"
            onClick={(e) => {
              e.stopPropagation();
              exitPresentation();
            }}
            className="rounded-full shadow-card hover:shadow-premium transition-smooth"
          >
            <Grid3x3 className="h-4 w-4" />
          </Button>
          <Button
            variant="secondary"
            size="icon"
            onClick={(e) => {
              e.stopPropagation();
              exitPresentation();
            }}
            className="rounded-full shadow-card hover:shadow-premium transition-smooth"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        
        {!showIntro && (
          <div className="pointer-events-auto px-4 py-2 bg-secondary/80 backdrop-blur-sm rounded-full font-sans font-medium text-sm">
            {currentSlide + 1} / {disciples.length}
          </div>
        )}
      </div>

      {/* Arrow Controls */}
      {!showIntro && (
        <div className="absolute bottom-6 left-6 right-6 z-50 flex justify-between pointer-events-none">
          <Button
            variant="secondary"
            size="icon"
            onClick={(e) => {
              e.stopPropagation();
              prevSlide();
            }}
            disabled={currentSlide === 0}
            className="rounded-full shadow-card hover:shadow-premium transition-smooth pointer-events-auto"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          
          <Button
            variant="secondary"
            size="icon"
            onClick={(e) => {
              e.stopPropagation();
              nextSlide();
            }}
            disabled={currentSlide === disciples.length - 1}
            className="rounded-full shadow-card hover:shadow-premium transition-smooth pointer-events-auto"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
      )}

      {/* Slide Content */}
      {showIntro ? (
        <IntroSlide onStart={startPresentation} />
      ) : (
        <DiscipleSlide 
          disciple={disciples[currentSlide]} 
          direction={direction}
          key={currentSlide}
        />
      )}

      {/* Progress Indicator */}
      {!showIntro && (
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-muted">
          <div 
            className="h-full gradient-gold transition-all duration-300"
            style={{ width: `${((currentSlide + 1) / disciples.length) * 100}%` }}
          />
        </div>
      )}
    </div>
  );
};

export default Presentation;
