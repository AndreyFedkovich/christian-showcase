import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Play } from 'lucide-react';
import { games } from '@/data/games';
import { halls } from '@/data/scroll-keeper';
import { HallCard } from '@/components/game/scroll-keeper/HallCard';
import { useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import Footer from '@/components/Footer';

export default function GameDetails() {
  const { gameId } = useParams();
  const navigate = useNavigate();
  const { language, t } = useLanguage();

  const game = games.find(g => g.id === gameId);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!game) {
    navigate('/');
    return null;
  }

  const title = language === 'en' ? game.titleEn : game.title;
  const description = language === 'en' ? game.descriptionEn : game.description;
  const playerCount = language === 'en' ? game.playerCountEn : game.playerCount;

  const handleStartGame = () => {
    navigate(`/game/${gameId}/play`);
  };

  const handleHallClick = (hallIndex: number) => {
    navigate(`/game/scroll-keeper/play?startHall=${hallIndex}`);
  };

  const isScrollKeeper = gameId === 'scroll-keeper';
  const ctaText = isScrollKeeper ? t('startQuest') : t('startGame');

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <div className="flex-1">
        {/* Hero Section - Split Layout */}
        <header className="relative py-12 px-6">
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-muted/50" />
          
          <div className="relative max-w-7xl mx-auto">
            {/* Back button */}
            <Button
              variant="ghost"
              onClick={() => navigate('/')}
              className="mb-8 text-muted-foreground hover:text-foreground hover:bg-muted"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              {t('backToList')}
            </Button>

            {/* Split layout container */}
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
              {/* Left: Content */}
              <div className="flex-1 text-left space-y-4">
                <h1 className="text-4xl lg:text-5xl font-bold text-foreground leading-tight">
                  {title}
                </h1>
                
                {/* Metadata */}
                <p className="text-primary/80 font-medium">
                  {playerCount} • {game.duration} {t('minutes')}
                </p>
                
                {/* Description */}
                <p className="text-lg text-muted-foreground leading-relaxed max-w-xl">
                  {description}
                </p>
                
                {/* CTA Button */}
                <Button
                  onClick={handleStartGame}
                  size="lg"
                  className="gradient-gold text-primary-foreground px-8 py-6 text-lg shadow-lg hover:shadow-xl transition-all"
                >
                  <Play className="mr-2 h-5 w-5 fill-current" />
                  {ctaText}
                </Button>
              </div>

              {/* Right: Thumbnail */}
              <div className="w-full lg:w-[45%] aspect-video rounded-xl overflow-hidden shadow-2xl ring-1 ring-white/10">
                <img
                  src={game.thumbnail}
                  alt={title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </header>

        {/* Scroll Keeper: Halls Grid */}
        {isScrollKeeper && (
          <section className="max-w-7xl mx-auto px-6 pb-16">
            <h2 className="text-2xl font-bold text-foreground mb-8 mt-8">
              {t('libraryHalls')}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {halls.map((hall, index) => (
                <HallCard
                  key={hall.type}
                  hall={hall}
                  hallNumber={index + 1}
                  onClick={() => handleHallClick(index)}
                />
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

