import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Play, ArrowLeft } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import ProfileCard from "@/components/ProfileCard";
import SeminarSlideCard from "@/components/SeminarSlideCard";
import HermeneuticsSlideCard from "@/components/HermeneuticsSlideCard";
import PracticalExampleSlideCard from "@/components/PracticalExampleSlideCard";
import IntroductionSlideCard from "@/components/IntroductionSlideCard";
import { disciples } from "@/data/disciples";
import { seminar, seminarSections, SeminarIntroductionSlide } from "@/data/seminar";
import { epistlesStructure, IntroductionSlide as IntroductionSlideType } from "@/data/epistles-structure";
import { salvation, salvationSections } from "@/data/salvation";
import { presentations } from "@/data/presentations";
import { useEffect } from "react";

const PresentationDetails = () => {
  const { presentationId } = useParams();
  const navigate = useNavigate();
  
  const presentation = presentations.find(p => p.id === presentationId);
  
  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // If presentation not found, redirect to home
  useEffect(() => {
    if (!presentation) {
      navigate("/");
    }
  }, [presentation, navigate]);

  if (!presentation) return null;

  // Load slides based on presentation type
  const slides = presentation.type === 'disciples' 
    ? disciples 
    : presentation.type === 'hermeneutics'
    ? epistlesStructure
    : presentationId === 'salvation'
    ? salvation
    : seminar;
  
  // Load sections for seminar-type presentations
  const sections = presentationId === 'salvation' ? salvationSections : seminarSections;
  
  const handleSlideClick = (slideIndex: number) => {
    navigate(`/presentation/${presentationId}/view?slide=${slideIndex}`);
  };

  const handleStartPresentation = () => {
    navigate(`/presentation/${presentationId}/view`);
  };

  // Calculate global index for seminar slides
  const getGlobalIndex = (sectionIndex: number, slideIndex: number) => {
    let globalIndex = 0;
    for (let i = 0; i < sectionIndex; i++) {
      globalIndex += sections[i].slides.length;
    }
    return globalIndex + slideIndex;
  };

  return (
    <div className="min-h-screen gradient-warm">
      {/* Hero Section */}
      <header className="relative py-16 px-6 text-center">
        <div className="absolute inset-0 gradient-overlay opacity-5" />
        <div className="relative max-w-5xl mx-auto space-y-6">
          <Button
            variant="secondary"
            onClick={() => navigate("/")}
            className="mb-4 gap-2 font-sans"
          >
            <ArrowLeft className="h-4 w-4" />
            К списку презентаций
          </Button>
          
          <h1 className="text-5xl md:text-6xl font-bold text-foreground tracking-tight">
            {presentation.title}
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground font-sans max-w-2xl mx-auto">
            {presentation.description}
          </p>
          
          <Button 
            size="lg"
            onClick={handleStartPresentation}
            className="gradient-gold hover:opacity-90 text-lg px-8 py-6 rounded-full shadow-premium transition-smooth hover:scale-105 font-sans font-semibold mt-6"
          >
            <Play className="mr-2 h-6 w-6" />
            Начать презентацию
          </Button>
        </div>
      </header>

      {/* Slides Grid */}
      <main className="max-w-7xl mx-auto px-6 pb-20">
        {presentation.type === 'disciples' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-[30px]">
            {disciples.map((disciple, index) => (
              <ProfileCard
                key={`disciple-${index}`} 
                disciple={disciple}
                slideNumber={index + 1}
                onClick={() => handleSlideClick(index)}
              />
            ))}
          </div>
        ) : presentation.type === 'hermeneutics' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-[30px]">
            {epistlesStructure.slice(1).map((slide, index) => {
              const slideNumber = index + 2;
              return slide.type === 'introduction' ? (
                <IntroductionSlideCard 
                  key={`hermeneutics-${index}`} 
                  slide={slide as IntroductionSlideType}
                  slideNumber={slideNumber}
                  onClick={() => handleSlideClick(index + 1)}
                />
              ) : slide.type === 'conclusion' ? (
                <SeminarSlideCard 
                  key={`hermeneutics-${index}`} 
                  slide={slide as any}
                  slideNumber={slideNumber}
                  onClick={() => handleSlideClick(index + 1)}
                />
              ) : slide.type === 'practical-example' ? (
                <PracticalExampleSlideCard 
                  key={`hermeneutics-${index}`} 
                  slide={slide as any}
                  slideNumber={slideNumber}
                  onClick={() => handleSlideClick(index + 1)}
                />
              ) : (
                <HermeneuticsSlideCard 
                  key={`hermeneutics-${index}`} 
                  slide={slide as any}
                  slideNumber={slideNumber}
                  onClick={() => handleSlideClick(index + 1)}
                />
              );
            })}
          </div>
        ) : (
          <Tabs defaultValue={sections[0]?.id} className="w-full mt-[30px]">
            <TabsList className="mb-6 flex-wrap h-auto gap-2 bg-muted/50 p-2">
              {sections.map(section => (
                <TabsTrigger 
                  key={section.id} 
                  value={section.id}
                  className="px-6 py-3 text-base font-medium"
                >
                  {section.name}
                </TabsTrigger>
              ))}
            </TabsList>
            
            {sections.map((section, sectionIndex) => (
              <TabsContent key={section.id} value={section.id}>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {section.slides.map((slide, slideIndex) => {
                    const globalIndex = getGlobalIndex(sectionIndex, slideIndex);
                    const slideNumber = globalIndex + 1;
                    
                    return slide.type === 'introduction' ? (
                      <IntroductionSlideCard
                        key={`slide-${globalIndex}`}
                        slide={slide as SeminarIntroductionSlide}
                        slideNumber={slideNumber}
                        onClick={() => handleSlideClick(globalIndex)}
                      />
                    ) : (
                      <SeminarSlideCard
                        key={`slide-${globalIndex}`}
                        slide={slide}
                        slideNumber={slideNumber}
                        onClick={() => handleSlideClick(globalIndex)}
                      />
                    );
                  })}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        )}
      </main>

      {/* Footer */}
      <footer className="py-8 text-center text-muted-foreground font-sans text-sm">
        <p>Интерактивная презентация • 2025</p>
      </footer>
    </div>
  );
};

export default PresentationDetails;
