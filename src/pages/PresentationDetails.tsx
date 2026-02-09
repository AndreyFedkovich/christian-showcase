import { useNavigate, useParams, useSearchParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Play, ArrowLeft } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import SlideCardRenderer from "@/components/SlideCardRenderer";
import { presentations, Section } from "@/data/presentations";
import { collections } from "@/data/collections";
import { useEffect } from "react";
import { UniversalSlide } from "@/types/slides";
import { useLanguage } from "@/contexts/LanguageContext";
import Footer from "@/components/Footer";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";

const PresentationDetails = () => {
  const { presentationId } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { language, t } = useLanguage();
  
  const fromCollectionId = searchParams.get("from");
  const fromCollection = fromCollectionId 
    ? collections.find(c => c.id === fromCollectionId) 
    : null;
  
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
  
  // Localized content
  const title = language === 'en' && presentation.titleEn ? presentation.titleEn : presentation.title;
  const description = language === 'en' && presentation.descriptionEn ? presentation.descriptionEn : presentation.description;
  
  // Calculate metadata
  const sectionsCount = sections ? sections.length : slides.length;
  const metadataLabel = sections ? t('sections') : t('slides');
  
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
    <div className="min-h-screen flex flex-col gradient-warm">
      {/* Hero Section */}
      <header className="relative py-12 px-6">
        <div className="absolute inset-0 gradient-overlay opacity-5" />
        <div className="relative max-w-7xl mx-auto">
          {fromCollection ? (
            <Breadcrumb className="mb-8">
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">
                      {t('home')}
                    </Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link 
                      to={`/collection/${fromCollection.id}`} 
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {language === 'en' && fromCollection.titleEn ? fromCollection.titleEn : fromCollection.title}
                    </Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>{title}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          ) : (
            <Button
              variant="ghost"
              onClick={() => navigate("/")}
              className="mb-8 gap-2 font-sans text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" />
              {t('backToList')}
            </Button>
          )}
          
          {/* Split layout container */}
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
            {/* Left: Content */}
            <div className="flex-1 text-left space-y-4">
              <h1 className="text-4xl lg:text-5xl font-bold text-foreground tracking-tight">
                {title}
              </h1>
              <p className="text-primary/80 font-medium text-lg">
                {sectionsCount} {metadataLabel} • {presentation.duration} {t('minutes')}
              </p>
              <p className="text-lg text-muted-foreground font-sans leading-relaxed max-w-xl">
                {description}
              </p>
              <Button 
                size="lg"
                onClick={handleStartPresentation}
                className="gradient-gold hover:opacity-90 text-lg px-8 py-6 rounded-full shadow-premium transition-smooth hover:scale-105 font-sans font-semibold mt-4"
              >
                <Play className="mr-2 h-5 w-5 fill-current" />
                {t('startPresentation')}
              </Button>
            </div>
            
            {/* Right: Thumbnail */}
            <div className="w-full lg:w-[45%] aspect-video rounded-xl overflow-hidden shadow-2xl ring-1 ring-white/10">
              <img 
                src={presentation.thumbnail} 
                alt={title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
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

      <Footer />
    </div>
  );
};

export default PresentationDetails;
