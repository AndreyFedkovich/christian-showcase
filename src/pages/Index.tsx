import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";
import DiscipleCard from "@/components/DiscipleCard";
import { disciples } from "@/data/disciples";

const Index = () => {
  const navigate = useNavigate();

  const handleStartPresentation = () => {
    navigate("/presentation");
  };

  const handleDiscipleClick = (index: number) => {
    navigate(`/presentation?slide=${index}`);
  };

  return (
    <div className="min-h-screen gradient-warm">
      {/* Hero Section */}
      <header className="relative py-20 px-6 text-center">
        <div className="absolute inset-0 gradient-overlay opacity-5" />
        <div className="relative max-w-4xl mx-auto space-y-6">
          <h1 className="text-6xl md:text-7xl font-bold text-foreground tracking-tight">
            12 Учеников Христа
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground font-sans max-w-2xl mx-auto">
            Погрузитесь в увлекательные истории людей, изменивших ход человеческой истории
          </p>
          <Button 
            size="lg"
            onClick={handleStartPresentation}
            className="gradient-gold hover:opacity-90 text-lg px-8 py-6 rounded-full shadow-premium transition-smooth hover:scale-105 font-sans font-semibold"
          >
            <Play className="mr-2 h-5 w-5" />
            Начать презентацию
          </Button>
        </div>
      </header>

      {/* Disciples Grid */}
      <main className="max-w-7xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {disciples.map((disciple, index) => (
            <DiscipleCard 
              key={disciple.id} 
              disciple={disciple}
              onClick={() => handleDiscipleClick(index)}
            />
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="py-8 text-center text-muted-foreground font-sans text-sm">
        <p>Интерактивная презентация • 2024</p>
      </footer>
    </div>
  );
};

export default Index;
