import { useNavigate } from "react-router-dom";
import { useState, useMemo, useEffect, useRef } from "react";
import FixedNavbar from "@/components/FixedNavbar";
import HeroSection from "@/components/HeroSection";
import ContentRow from "@/components/ContentRow";
import CompactCard from "@/components/CompactCard";
import { presentations } from "@/data/presentations";
import { collections } from "@/data/collections";
import { games } from "@/data/games";
import { useLanguage } from "@/contexts/LanguageContext";
import { Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import Footer from "@/components/Footer";

const Index = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const { language, t } = useLanguage();

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

  const handleCollectionClick = (collectionId: string) => {
    navigate(`/collection/${collectionId}`);
  };

  const handleGameClick = (gameId: string) => {
    navigate(`/game/${gameId}`);
  };

  // Group presentations by category
  // IDs of presentations that belong to a collection
  const collectedIds = useMemo(() => 
    new Set(collections.flatMap(c => c.presentationIds)),
    []
  );

  const seminarItems = useMemo(() => {
    const standaloneSeminars = presentations.filter(
      p => p.category === 'seminar' && !collectedIds.has(p.id)
    );
    const seminarCollections = collections.filter(c => c.category === 'seminar');
    
    // Build a combined list: collections first, then standalone
    const items = [
      ...seminarCollections.map(c => ({
        id: c.id,
        type: 'collection' as const,
        title: c.title,
        titleEn: c.titleEn,
        thumbnail: c.thumbnail,
        duration: c.duration,
      })),
      ...standaloneSeminars.map(p => ({
        id: p.id,
        type: 'presentation' as const,
        title: p.title,
        titleEn: p.titleEn,
        thumbnail: p.thumbnail,
        duration: p.duration,
      })),
    ];

    if (!searchQuery.trim()) return items;
    const query = searchQuery.toLowerCase();
    return items.filter(item => 
      item.title.toLowerCase().includes(query) || 
      item.titleEn.toLowerCase().includes(query)
    );
  }, [searchQuery, collectedIds]);

  const bibleStudyPresentations = useMemo(() => {
    const bibleStudy = presentations.filter(p => p.category === 'bible-study');
    if (!searchQuery.trim()) return bibleStudy;
    const query = searchQuery.toLowerCase();
    return bibleStudy.filter(p => 
      p.title.toLowerCase().includes(query) || 
      p.titleEn.toLowerCase().includes(query) ||
      p.description.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  // Filter games
  const filteredGames = useMemo(() => {
    if (!searchQuery.trim()) return games;
    const query = searchQuery.toLowerCase();
    return games.filter(g =>
      g.title.toLowerCase().includes(query) ||
      g.titleEn.toLowerCase().includes(query) ||
      g.description.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  const getTitle = (item: { title: string; titleEn: string }) => 
    language === 'en' ? item.titleEn : item.title;

  const getSubtitle = (duration: string) => 
    `${duration} ${t('minutes')}`;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Fixed Navbar */}
      <FixedNavbar 
        isScrolled={isScrolled} 
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* Hero Section - 100vh */}
      {heroPresentation && (
        <HeroSection presentation={heroPresentation} />
      )}

      {/* Content Section with horizontal rows */}
      <main className="min-h-screen gradient-warm pt-8 pb-16">
        <div className="max-w-7xl mx-auto">
        {/* Seminars Row */}
        {seminarItems.length > 0 && (
          <ContentRow title={t('seminars')}>
            {seminarItems.map((item) => (
              <CompactCard
                key={item.id}
                title={getTitle(item)}
                thumbnail={item.thumbnail}
                subtitle={getSubtitle(item.duration)}
                onClick={() => item.type === 'collection' 
                  ? handleCollectionClick(item.id) 
                  : handlePresentationClick(item.id)
                }
              />
            ))}
          </ContentRow>
        )}

        {/* Bible Study Row */}
        {bibleStudyPresentations.length > 0 && (
          <ContentRow title={t('bibleStudy')}>
            {bibleStudyPresentations.map((presentation) => (
              <CompactCard
                key={presentation.id}
                title={getTitle(presentation)}
                thumbnail={presentation.thumbnail}
                subtitle={getSubtitle(presentation.duration)}
                onClick={() => handlePresentationClick(presentation.id)}
              />
            ))}
          </ContentRow>
        )}

        {/* Games Row */}
        {filteredGames.length > 0 && (
          <ContentRow title={t('games')}>
            {filteredGames.map((game) => (
              <CompactCard
                key={game.id}
                title={getTitle(game)}
                thumbnail={game.thumbnail}
                subtitle={language === 'en' ? game.playerCountEn : game.playerCount}
                onClick={() => handleGameClick(game.id)}
              />
            ))}
          </ContentRow>
        )}

        {/* Empty state when no results */}
        {seminarItems.length === 0 && bibleStudyPresentations.length === 0 && filteredGames.length === 0 && (
          <EmptyState />
        )}
        </div>
      </main>

      {/* Footer */}
      <div className="max-w-7xl mx-auto w-full">
        <Footer />
      </div>
    </div>
  );
};

// Empty state component
const EmptyState = () => {
  const { t } = useLanguage();
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center py-20 text-center text-muted-foreground"
    >
      <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4 shadow-inner">
        <Sparkles className="w-8 h-8 text-muted-foreground/50" />
      </div>
      <h3 className="text-xl font-medium text-foreground mb-2">{t('nothingFound')}</h3>
      <p className="max-w-xs mx-auto text-balance">
        {t('tryDifferentSearch')}
      </p>
    </motion.div>
  );
};

export default Index;
