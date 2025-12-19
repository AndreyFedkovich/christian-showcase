import { useNavigate } from "react-router-dom";
import { useState, useMemo, useEffect, useRef, useCallback } from "react";
import PresentationCard from "@/components/PresentationCard";
import GameCard from "@/components/GameCard";
import FixedNavbar from "@/components/FixedNavbar";
import HeroSection from "@/components/HeroSection";
import { presentations } from "@/data/presentations";
import { games } from "@/data/games";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { BookOpen, Gamepad2, Search, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const Index = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("presentations");
  const contentRef = useRef<HTMLDivElement>(null);

  // Find hero presentation
  const heroPresentation = useMemo(() => 
    presentations.find(p => p.isHero), 
    []
  );

  // Track scroll position
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const threshold = window.innerHeight - 100;
      setIsScrolled(scrollY > threshold);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handlePresentationClick = (presentationId: string) => {
    navigate(`/presentation/${presentationId}`);
  };

  const handleGameClick = (gameId: string) => {
    navigate(`/game/${gameId}/play`);
  };

  const handleNavigate = useCallback((section: 'presentations' | 'games') => {
    setActiveTab(section);
    const contentSection = document.getElementById('content-section');
    if (contentSection) {
      contentSection.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  // Filter presentations (exclude hero from list)
  const filteredPresentations = useMemo(() => {
    const list = presentations.filter(p => !p.isHero);
    if (!searchQuery.trim()) return list;
    const query = searchQuery.toLowerCase();
    return list.filter(
      (p) =>
        p.title.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  // Filter games
  const filteredGames = useMemo(() => {
    if (!searchQuery.trim()) return games;
    const query = searchQuery.toLowerCase();
    return games.filter(
      (g) =>
        g.title.toLowerCase().includes(query) ||
        g.description.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  return (
    <div className="min-h-screen">
      {/* Fixed Navbar */}
      <FixedNavbar isScrolled={isScrolled} onNavigate={handleNavigate} />

      {/* Hero Section - 100vh */}
      {heroPresentation && (
        <HeroSection presentation={heroPresentation} />
      )}

      {/* Content Section */}
      <main 
        id="content-section" 
        ref={contentRef}
        className="min-h-screen gradient-warm"
      >
        <Tabs 
          value={activeTab} 
          onValueChange={setActiveTab}
          className="w-full"
        >
          <div className="sticky top-16 z-40 bg-background/95 backdrop-blur-md border-b border-border/50">
            <div className="max-w-6xl mx-auto px-6 py-4">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                {/* Tabs */}
                <TabsList className="bg-transparent h-auto p-0 flex gap-6 md:gap-8 w-full md:w-auto justify-center md:justify-start">
                  <TabsTrigger
                    value="presentations"
                    className="rounded-none border-b-2 border-transparent px-2 pb-3 pt-2 font-sans text-lg text-muted-foreground data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-primary data-[state=active]:shadow-none hover:text-primary/80 transition-colors"
                  >
                    <BookOpen className="w-5 h-5 mr-2" />
                    Презентации
                  </TabsTrigger>
                  <TabsTrigger
                    value="games"
                    className="rounded-none border-b-2 border-transparent px-2 pb-3 pt-2 font-sans text-lg text-muted-foreground data-[state=active]:border-violet-500 data-[state=active]:bg-transparent data-[state=active]:text-violet-700 data-[state=active]:shadow-none hover:text-violet-600 transition-colors"
                  >
                    <Gamepad2 className="w-5 h-5 mr-2" />
                    Игры
                  </TabsTrigger>
                </TabsList>

                {/* Search */}
                <div className="relative w-full md:w-[20rem]">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Поиск..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 h-11 bg-background border-border focus:border-primary focus:ring-primary/20 rounded-xl placeholder:text-muted-foreground/80 shadow-sm transition-all hover:bg-muted/50"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Content Area */}
          <div className="max-w-6xl mx-auto px-6 py-8">
            <TabsContent value="presentations" className="mt-0 focus-visible:outline-none">
              {filteredPresentations.length > 0 ? (
                <div className="space-y-6">
                  {filteredPresentations.map((presentation) => (
                    <PresentationCard
                      key={presentation.id}
                      presentation={presentation}
                      onClick={() => handlePresentationClick(presentation.id)}
                    />
                  ))}
                </div>
              ) : (
                <EmptyState type="presentation" />
              )}
            </TabsContent>

            <TabsContent value="games" className="mt-0 focus-visible:outline-none">
              {filteredGames.length > 0 ? (
                <div className="space-y-6">
                  {filteredGames.map((game) => (
                    <GameCard
                      key={game.id}
                      game={game}
                      onClick={() => handleGameClick(game.id)}
                    />
                  ))}
                </div>
              ) : (
                <EmptyState type="game" />
              )}
            </TabsContent>
          </div>
        </Tabs>

        {/* Footer */}
        <footer className="py-8 text-center text-muted-foreground font-sans text-sm border-t border-border/50">
          <p>Интерактивная Библия • 2025</p>
        </footer>
      </main>
    </div>
  );
};

// Empty state component
const EmptyState = ({ type }: { type: 'presentation' | 'game' }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    className="flex flex-col items-center justify-center py-20 text-center text-muted-foreground"
  >
    <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4 shadow-inner">
      <Sparkles className="w-8 h-8 text-muted-foreground/50" />
    </div>
    <h3 className="text-xl font-medium text-foreground mb-2">Ничего не найдено</h3>
    <p className="max-w-xs mx-auto text-balance">
      Попробуйте изменить поисковый запрос или выберите другую категорию.
    </p>
  </motion.div>
);

export default Index;
