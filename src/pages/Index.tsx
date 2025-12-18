import { useNavigate } from "react-router-dom";
import PresentationCard from "@/components/PresentationCard";
import GameCard from "@/components/GameCard";
import { presentations } from "@/data/presentations";
import { games } from "@/data/games";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Gamepad2 } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  const handlePresentationClick = (presentationId: string) => {
    navigate(`/presentation/${presentationId}`);
  };

  const handleGameClick = (gameId: string) => {
    navigate(`/game/${gameId}/play`);
  };

  return (
    <div className="min-h-screen gradient-warm">
      {/* Hero Section */}
      <header className="relative py-20 px-6 text-center">
        <div className="absolute inset-0 gradient-overlay opacity-5" />
        <div className="relative max-w-4xl mx-auto space-y-6">
          <h1 className="text-6xl md:text-7xl font-bold text-foreground tracking-tight">
            Интерактивная Библия
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground font-sans max-w-2xl mx-auto">
            Раскрытие христианских истин, которые меняют жизнь
          </p>
        </div>
      </header>

      {/* Content with Tabs */}
      <main className="max-w-6xl mx-auto px-6 pb-20">
        <Tabs defaultValue="presentations" className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8 h-14 p-1 bg-card shadow-card">
            <TabsTrigger 
              value="presentations" 
              className="flex items-center gap-2 text-base font-sans data-[state=active]:gradient-gold data-[state=active]:text-primary-foreground rounded-lg h-12"
            >
              <BookOpen className="w-5 h-5" />
              Презентации
            </TabsTrigger>
            <TabsTrigger 
              value="games" 
              className="flex items-center gap-2 text-base font-sans data-[state=active]:bg-gradient-to-r data-[state=active]:from-violet-600 data-[state=active]:to-purple-600 data-[state=active]:text-white rounded-lg h-12"
            >
              <Gamepad2 className="w-5 h-5" />
              Игры
            </TabsTrigger>
          </TabsList>

          <TabsContent value="presentations" className="mt-0">
            <div className="space-y-6 mt-[30px]">
              {presentations.map((presentation) => (
                <PresentationCard 
                  key={presentation.id} 
                  presentation={presentation}
                  onClick={() => handlePresentationClick(presentation.id)}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="games" className="mt-0">
            <div className="space-y-6 mt-[30px]">
              {games.map((game) => (
                <GameCard 
                  key={game.id} 
                  game={game}
                  onClick={() => handleGameClick(game.id)}
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>

      {/* Footer */}
      <footer className="py-8 text-center text-muted-foreground font-sans text-sm">
        <p>Интерактивная Библия • 2025</p>
      </footer>
    </div>
  );
};

export default Index;
