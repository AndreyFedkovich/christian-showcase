import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Play, ArrowLeft } from "lucide-react";
import DiscipleCard from "@/components/DiscipleCard";
import { disciples } from "@/data/disciples";
import { presentations } from "@/data/presentations";
import { useEffect } from "react";

const PresentationDetails = () => {
  const { presentationId } = useParams();
  const navigate = useNavigate();
  
  const presentation = presentations.find(p => p.id === presentationId);
  
  // If presentation not found, redirect to home
  useEffect(() => {
    if (!presentation) {
      navigate("/");
    }
  }, [presentation, navigate]);

  if (!presentation) return null;

  // Load slides based on presentation ID
  let slides = disciples; // For now, only 12-disciples presentation exists
  
  const handleSlideClick = (slideIndex: number) => {
    navigate(`/presentation/${presentationId}/view?slide=${slideIndex}`);
  };

  const handleStartPresentation = () => {
    navigate(`/presentation/${presentationId}/view`);
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-[30px]">
          {slides.map((slide, index) => (
            <DiscipleCard 
              key={slide.id} 
              disciple={slide}
              onClick={() => handleSlideClick(index)}
            />
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="py-8 text-center text-muted-foreground font-sans text-sm">
        <p>Интерактивная презентация • 2025</p>
      </footer>
    </div>
  );
};

export default PresentationDetails;
