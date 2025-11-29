import { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { ChevronLeft, ChevronRight, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProfileSlide from "@/components/ProfileSlide";
import StorySlide from "@/components/StorySlide";
import ReflectionSlide from "@/components/ReflectionSlide";
import ConclusionSlide from "@/components/ConclusionSlide";
import ScriptureSlide from "@/components/ScriptureSlide";
import ScriptureDarkSlide from "@/components/ScriptureDarkSlide";
import IntroSlide from "@/components/IntroSlide";
import HermeneuticsSlide from "@/components/HermeneuticsSlide";
import IntroHermeneuticsSlide from "@/components/IntroHermeneuticsSlide";
import { disciples } from "@/data/disciples";
import { josephStory } from "@/data/joseph-story";
import { epistlesStructure } from "@/data/epistles-structure";
import { presentations } from "@/data/presentations";

const Presentation = () => {
  const { presentationId } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  // Get initial slide from query params
  const initialSlide = parseInt(searchParams.get('slide') || '0');
  
  // Find the presentation
  const presentation = presentations.find(p => p.id === presentationId);
  
  // If presentation not found, redirect to home
  useEffect(() => {
    if (!presentation) {
      navigate("/");
    }
  }, [presentation, navigate]);

  const [currentSlide, setCurrentSlide] = useState(initialSlide);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [direction, setDirection] = useState<'next' | 'prev'>('next');
  const [isAnimating, setIsAnimating] = useState(false);
  const [showIntro, setShowIntro] = useState(initialSlide === 0);
  
  if (!presentation) return null;

  // Load slides based on presentation type
  const slides = presentation.type === 'disciples' 
    ? disciples 
    : presentation.type === 'hermeneutics'
    ? epistlesStructure
    : josephStory;
  const totalSlides = slides.length;

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
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
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
      setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
      setIsAnimating(false);
    }, 300);
  };

  const exitPresentation = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    }
    navigate(`/presentation/${presentationId}`);
  };

  return (
    <div 
      className="h-screen w-screen bg-background overflow-hidden"
      onClick={nextSlide}
    >
      {/* Navigation Controls */}
      <div className="absolute top-6 left-6 right-6 z-50 flex justify-between items-center pointer-events-none">
        <div className="flex gap-3 pointer-events-auto">
          <Button
            variant="secondary"
            onClick={(e) => {
              e.stopPropagation();
              exitPresentation();
            }}
            className="rounded-full shadow-card hover:shadow-premium transition-smooth font-sans gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="hidden sm:inline">К слайдам</span>
          </Button>
        </div>
        
        <div className="flex items-center gap-3 pointer-events-auto">
          {!showIntro && (
            <div className="px-4 py-2 bg-secondary/80 backdrop-blur-sm rounded-full font-sans font-medium text-sm">
              {currentSlide + 1} / {totalSlides}
            </div>
          )}
          <div className="px-4 py-2 bg-secondary/80 backdrop-blur-sm rounded-full font-sans text-sm hidden md:block">
            {presentation.title}
          </div>
        </div>
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
            disabled={currentSlide === totalSlides - 1}
            className="rounded-full shadow-card hover:shadow-premium transition-smooth pointer-events-auto"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
      )}

      {/* Slide Content */}
      {showIntro ? (
        presentation.type === 'hermeneutics' && epistlesStructure[0].type === 'intro-hermeneutics' ? (
          <IntroHermeneuticsSlide 
            slide={epistlesStructure[0] as any}
            onStart={startPresentation}
          />
        ) : (
          <IntroSlide 
            onStart={startPresentation}
            title={presentation.title}
            subtitle="Интерактивная презентация"
            description={presentation.description}
          />
        )
      ) : presentation.type === 'disciples' ? (
        <ProfileSlide
          disciple={disciples[currentSlide]} 
          direction={direction}
          key={currentSlide}
        />
      ) : presentation.type === 'hermeneutics' ? (
        <HermeneuticsSlide 
          slide={epistlesStructure[currentSlide] as any}
          direction={direction}
          key={currentSlide}
        />
      ) : (
        <>
          {josephStory[currentSlide].type === 'scripture' && (
            <ScriptureSlide 
              slide={josephStory[currentSlide] as any}
              direction={direction}
              key={currentSlide}
            />
          )}
          {josephStory[currentSlide].type === 'scripture-dark' && (
            <ScriptureDarkSlide 
              slide={josephStory[currentSlide] as any}
              direction={direction}
              key={currentSlide}
            />
          )}
          {josephStory[currentSlide].type === 'story' && (
            <StorySlide 
              slide={josephStory[currentSlide] as any}
              direction={direction}
              key={currentSlide}
            />
          )}
          {josephStory[currentSlide].type === 'reflection' && (
            <ReflectionSlide 
              slide={josephStory[currentSlide] as any}
              direction={direction}
              key={currentSlide}
            />
          )}
          {josephStory[currentSlide].type === 'conclusion' && (
            <ConclusionSlide 
              slide={josephStory[currentSlide] as any}
              direction={direction}
              key={currentSlide}
            />
          )}
        </>
      )}

      {/* Progress Indicator */}
      {!showIntro && (
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-muted">
          <div 
            className="h-full gradient-gold transition-all duration-300"
            style={{ width: `${((currentSlide + 1) / totalSlides) * 100}%` }}
          />
        </div>
      )}
    </div>
  );
};

export default Presentation;
