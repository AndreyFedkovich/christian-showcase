import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Play, ArrowLeft, Calendar } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import SlideCardRenderer from "@/components/SlideCardRenderer";
import { presentations, Section } from "@/data/presentations";
import { useEffect } from "react";
import { UniversalSlide } from "@/types/slides";

const PresentationDetails = () => {
  const { presentationId } = useParams();
  const navigate = useNavigate();
  
  const presentation = presentations.find(p => p.id === presentationId);
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (!presentation) {
      navigate("/");
    }
  }, [presentation, navigate]);

  if (!presentation) return null;

  const { slides, sections, layout } = presentation;
  const isHermeneutics = presentation.id === 'epistles-structure';
  
  const handleSlideClick = (slideIndex: number) => {
    navigate(`/presentation/${presentationId}/view?slide=${slideIndex}`);
  };

  const handleStartPresentation = () => {
    navigate(`/presentation/${presentationId}/view`);
  };

  const getGlobalIndex = (sectionIndex: number, slideIndex: number) => {
    if (!sections) return slideIndex;
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
          
          <div className="flex items-center justify-center gap-2 text-muted-foreground">
            <Calendar className="h-5 w-5" />
            <span className="font-sans text-lg">{presentation.createdAt}</span>
          </div>
          
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

      {/* Slides */}
      <main className="max-w-7xl mx-auto px-6 pb-20">
        {layout === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-[30px]">
            {(isHermeneutics ? slides.slice(1) : slides).map((slide, index) => {
              const actualIndex = isHermeneutics ? index + 1 : index;
              return (
                <SlideCardRenderer
                  key={`slide-${actualIndex}`} 
                  slide={slide as UniversalSlide}
                  slideNumber={actualIndex + 1}
                  onClick={() => handleSlideClick(actualIndex)}
                />
              );
            })}
          </div>
        ) : sections && sections.length > 0 ? (
          <Tabs defaultValue={sections[0].id} className="w-full mt-[30px]">
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
                    return (
                      <SlideCardRenderer
                        key={`slide-${globalIndex}`}
                        slide={slide as UniversalSlide}
                        slideNumber={globalIndex + 1}
                        onClick={() => handleSlideClick(globalIndex)}
                      />
                    );
                  })}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-[30px]">
            {slides.map((slide, index) => (
              <SlideCardRenderer
                key={`slide-${index}`} 
                slide={slide as UniversalSlide}
                slideNumber={index + 1}
                onClick={() => handleSlideClick(index)}
              />
            ))}
          </div>
        )}
      </main>

      <footer className="py-8 text-center text-muted-foreground font-sans text-sm">
        <p>Интерактивная Библия • 2025</p>
      </footer>
    </div>
  );
};

export default PresentationDetails;
