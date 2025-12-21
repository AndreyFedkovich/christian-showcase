import { useNavigate } from "react-router-dom";
import { useState, useMemo, useEffect, useRef, useCallback } from "react";
import PresentationCard from "@/components/PresentationCard";
import GameCard from "@/components/GameCard";
import FixedNavbar from "@/components/FixedNavbar";
import HeroSection from "@/components/HeroSection";
import { presentations } from "@/data/presentations";
import { games } from "@/data/games";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { Sparkles } from "lucide-react";
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
    const list = presentations;
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
      <FixedNavbar 
        isScrolled={isScrolled} 
        onNavigate={handleNavigate}
        activeTab={activeTab}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

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
          {/* Content Area */}
          <div className="max-w-6xl mx-auto px-6 py-8 pt-24">
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
