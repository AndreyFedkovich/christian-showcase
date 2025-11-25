import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";
import PresentationCard from "@/components/PresentationCard";
import { presentations } from "@/data/presentations";

const Index = () => {
  const navigate = useNavigate();

  const handlePresentationClick = (presentationId: string) => {
    navigate(`/presentation/${presentationId}`);
  };

  return (
    <div className="min-h-screen gradient-warm">
      {/* Hero Section */}
      <header className="relative py-20 px-6 text-center">
        <div className="absolute inset-0 gradient-overlay opacity-5" />
        <div className="relative max-w-4xl mx-auto space-y-6">
          <h1 className="text-6xl md:text-7xl font-bold text-foreground tracking-tight">
            Интерактивные Презентации
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground font-sans max-w-2xl mx-auto">
            Христианские истории, которые влияют на жизнь
          </p>
        </div>
      </header>

      {/* Presentations List */}
      <main className="max-w-6xl mx-auto px-6 pb-20">
        <div className="space-y-6">
          {presentations.map((presentation) => (
            <PresentationCard 
              key={presentation.id} 
              presentation={presentation}
              onClick={() => handlePresentationClick(presentation.id)}
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

export default Index;
