import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Play } from 'lucide-react';
import { halls } from '@/data/scroll-keeper';
import { HallCard } from '@/components/game/scroll-keeper/HallCard';
import { useEffect } from 'react';

export default function ScrollKeeperDetails() {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleStartQuest = () => {
    navigate('/game/scroll-keeper/play');
  };

  const handleHallClick = (hallIndex: number) => {
    // Navigate to play page with hall index as query param
    navigate(`/game/scroll-keeper/play?startHall=${hallIndex}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      {/* Hero Section */}
      <div className="relative py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <Button
            variant="ghost"
            onClick={() => navigate('/')}
            className="mb-8 text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Назад
          </Button>

          <div className="text-center space-y-6 mb-12">
            <div className="text-7xl mb-4">📚</div>
            <h1 className="text-5xl font-bold text-amber-400">
              Хранитель Свитков
            </h1>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Пройдите 7 залов Библиотеки Вечности и соберите Ключи Памяти. 
              Каждый зал хранит уникальные испытания.
            </p>
            <Button
              onClick={handleStartQuest}
              size="lg"
              className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-6 text-lg"
            >
              <Play className="w-5 h-5 mr-2" />
              Начать квест
            </Button>
          </div>
        </div>
      </div>

      {/* Halls Grid */}
      <div className="max-w-7xl mx-auto px-6 pb-16">
        <h2 className="text-2xl font-bold text-slate-200 mb-8 text-center">
          Залы Библиотеки
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
      </div>

      {/* Footer */}
      <footer className="py-8 text-center text-slate-500 text-sm border-t border-slate-800">
        <p>Библиотека Вечности ждёт вас</p>
      </footer>
    </div>
  );
}
