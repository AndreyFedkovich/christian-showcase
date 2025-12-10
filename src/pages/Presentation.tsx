import { useEffect, useState, useRef, useCallback } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { ChevronLeft, ChevronRight, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProfileSlide from "@/components/ProfileSlide";
import StorySlide from "@/components/StorySlide";
import ReflectionSlide from "@/components/ReflectionSlide";
import ConclusionSlide from "@/components/ConclusionSlide";
import ScriptureDarkSlide from "@/components/ScriptureDarkSlide";
import IntroSlide from "@/components/IntroSlide";
import HermeneuticsSlide from "@/components/HermeneuticsSlide";
import IntroHermeneuticsSlide from "@/components/IntroHermeneuticsSlide";
import IntroductionSlide from "@/components/IntroductionSlide";
import PracticalExampleSlide from "@/components/PracticalExampleSlide";
import DialogueQuestionSlide from "@/components/DialogueQuestionSlide";
import DialogueAnswerSlide from "@/components/DialogueAnswerSlide";
import ArgumentSlide from "@/components/ArgumentSlide";
import { disciples } from "@/data/disciples";
import { seminar } from "@/data/seminar";
import { salvation } from "@/data/salvation";
import { epistlesStructure } from "@/data/epistles-structure";
import { godExists } from "@/data/god-exists";
import { presentations } from "@/data/presentations";

const Presentation = () => {
  const { presentationId } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [wakeLock, setWakeLock] = useState<WakeLockSentinel | null>(null);

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
  const [showIntro, setShowIntro] = useState(initialSlide === 0);
  
  // Use refs for animation state and debounce
  const isAnimatingRef = useRef(false);
  const lastClickRef = useRef<number>(0);
  
  if (!presentation) return null;

  // Load slides based on presentation type
  const slides = presentation.type === 'disciples' 
    ? disciples 
    : presentation.type === 'hermeneutics'
    ? epistlesStructure
    : presentation.type === 'god-exists'
    ? godExists
    : presentationId === 'salvation'
    ? salvation
    : seminar;
  const totalSlides = slides.length;

  // Wake Lock API to prevent screen from turning off
  useEffect(() => {
    const requestWakeLock = async () => {
      try {
        if ('wakeLock' in navigator) {
          const lock = await navigator.wakeLock.request('screen');
          setWakeLock(lock);
          console.log('Wake Lock активирован');

          lock.addEventListener('release', () => {
            console.log('Wake Lock освобождён');
            setWakeLock(null);
          });
        }
      } catch (err) {
        console.log('Wake Lock не удалось активировать:', err);
      }
    };

    const handleVisibilityChange = async () => {
      if (document.visibilityState === 'visible' && !wakeLock) {
        await requestWakeLock();
      }
    };

    void requestWakeLock();
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      if (wakeLock) {
        void wakeLock.release();
      }
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [wakeLock]);

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

    void enterFullscreen();

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

  const startPresentation = useCallback(() => {
    setShowIntro(false);
    // For hermeneutics presentations, skip the intro slide at index 0
    setCurrentSlide(presentation?.type === 'hermeneutics' ? 1 : 0);
  }, [presentation?.type]);

  const nextSlide = useCallback(() => {
    if (isAnimatingRef.current) return;
    if (showIntro) {
      startPresentation();
      return;
    }
    
    setDirection('next');
    setCurrentSlide((prev) => {
      if (presentation?.type === 'hermeneutics') {
        const lastIndex = totalSlides - 1;
        return prev >= lastIndex ? lastIndex : prev + 1;
      }
      return (prev + 1) % totalSlides;
    });
    
    isAnimatingRef.current = true;
    setTimeout(() => {
      isAnimatingRef.current = false;
    }, 300);
  }, [showIntro, startPresentation, presentation?.type, totalSlides]);

  const prevSlide = useCallback(() => {
    if (isAnimatingRef.current || showIntro) return;
    const firstSlideIndex = presentation?.type === 'hermeneutics' ? 1 : 0;
    if (currentSlide === firstSlideIndex) {
      setShowIntro(true);
      setCurrentSlide(-1);
      return;
    }
    
    setDirection('prev');
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
    
    isAnimatingRef.current = true;
    setTimeout(() => {
      isAnimatingRef.current = false;
    }, 300);
  }, [showIntro, presentation?.type, currentSlide, totalSlides]);

  const exitPresentation = useCallback(() => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    }
    navigate(`/presentation/${presentationId}`);
  }, [navigate, presentationId]);

  const handleContainerClick = useCallback(() => {
    const now = Date.now();
    if (now - lastClickRef.current < 350) return;
    lastClickRef.current = now;
    nextSlide();
  }, [nextSlide]);

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
  }, [nextSlide, prevSlide, exitPresentation]);

  // Render God Exists slides
  const renderGodExistsSlide = () => {
    const slide = godExists[currentSlide];
    switch (slide.type) {
      case 'introduction':
        return <IntroductionSlide slide={slide as any} direction={direction} key={currentSlide} />;
      case 'dialogue-question':
        return <DialogueQuestionSlide slide={slide} direction={direction} key={currentSlide} />;
      case 'dialogue-answer':
        return <DialogueAnswerSlide slide={slide} direction={direction} key={currentSlide} />;
      case 'argument':
        return <ArgumentSlide slide={slide} direction={direction} key={currentSlide} />;
      case 'reflection':
        return <ReflectionSlide slide={slide as any} direction={direction} key={currentSlide} />;
      case 'conclusion':
        return <ConclusionSlide slide={slide as any} direction={direction} key={currentSlide} />;
      default:
        return null;
    }
  };

  // Render seminar slides (for seminar and salvation)
  const renderSeminarSlide = () => {
    const slidesData = presentationId === 'salvation' ? salvation : seminar;
    const slide = slidesData[currentSlide];
    switch (slide.type) {
      case 'introduction':
        return <IntroductionSlide slide={slide as any} direction={direction} key={currentSlide} />;
      case 'scripture-dark':
        return <ScriptureDarkSlide slide={slide as any} direction={direction} key={currentSlide} />;
      case 'story':
        return <StorySlide slide={slide as any} direction={direction} key={currentSlide} />;
      case 'reflection':
        return <ReflectionSlide slide={slide as any} direction={direction} key={currentSlide} />;
      case 'conclusion':
        return <ConclusionSlide slide={slide as any} direction={direction} key={currentSlide} />;
      default:
        return null;
    }
  };

  return (
    <div 
      className="h-screen w-screen bg-background overflow-hidden"
      onClick={handleContainerClick}
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
              {presentation.type === 'hermeneutics' ? currentSlide : currentSlide + 1} / {presentation.type === 'hermeneutics' ? totalSlides - 1 : totalSlides}
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
            disabled={currentSlide === (presentation.type === 'hermeneutics' ? 1 : 0)}
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
          slideNumber={currentSlide + 1}
          direction={direction}
          key={currentSlide}
        />
      ) : presentation.type === 'hermeneutics' ? (
        <>
          {epistlesStructure[currentSlide].type === 'introduction' && (
            <IntroductionSlide 
              slide={epistlesStructure[currentSlide] as any}
              direction={direction}
              key={currentSlide}
            />
          )}
          {epistlesStructure[currentSlide].type === 'hermeneutics' && (
            <HermeneuticsSlide 
              slide={epistlesStructure[currentSlide] as any}
              direction={direction}
              key={currentSlide}
            />
          )}
          {epistlesStructure[currentSlide].type === 'practical-example' && (
            <PracticalExampleSlide 
              slide={epistlesStructure[currentSlide] as any}
              direction={direction}
              key={currentSlide}
            />
          )}
          {epistlesStructure[currentSlide].type === 'conclusion' && (
            <ConclusionSlide 
              slide={epistlesStructure[currentSlide] as any}
              direction={direction}
              key={currentSlide}
            />
          )}
        </>
      ) : presentation.type === 'god-exists' ? (
        renderGodExistsSlide()
      ) : (
        renderSeminarSlide()
      )}

      {/* Progress Indicator */}
      {!showIntro && (
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-muted">
          <div 
            className="h-full gradient-gold transition-all duration-300"
            style={{ 
              width: presentation.type === 'hermeneutics' 
                ? `${(currentSlide / (totalSlides - 1)) * 100}%` 
                : `${((currentSlide + 1) / totalSlides) * 100}%` 
            }}
          />
        </div>
      )}
    </div>
  );
};

export default Presentation;
