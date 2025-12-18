import { useNavigate } from "react-router-dom";
import PresentationCard from "@/components/PresentationCard";
import GameCard from "@/components/GameCard";
import { presentations } from "@/data/presentations";
import { games } from "@/data/games";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Gamepad2 } from "lucide-react";
import { motion } from "framer-motion";

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
      <Tabs defaultValue="presentations" className="w-full">
        {/* Hero Section */}
        <header className="relative py-16 md:py-20 px-6 text-center overflow-hidden">
          <div className="absolute inset-0 gradient-overlay opacity-5" />
          
          {/* Декоративные частицы */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-amber-400/40 rounded-full"
                style={{
                  left: `${20 + i * 12}%`,
                  top: `${30 + (i % 3) * 20}%`,
                }}
                animate={{
                  y: [0, -20, 0],
                  opacity: [0.3, 0.7, 0.3],
                  scale: [1, 1.5, 1],
                }}
                transition={{
                  duration: 3 + i * 0.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.3,
                }}
              />
            ))}
          </div>

          <div className="relative max-w-full mx-auto space-y-6">
            {/* Иконка + Заголовок в одну линию */}
            <motion.div
              className="flex items-center justify-center gap-5 md:gap-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              {/* Премиальная иконка */}
              <div className="relative flex-shrink-0">
                {/* Внешнее свечение - пульсирующее */}
                <motion.div
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 md:w-44 md:h-44 bg-gradient-to-r from-amber-400/20 via-yellow-300/30 to-amber-400/20 blur-3xl rounded-full"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.5, 0.3],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
                
                {/* Лучи света */}
                <motion.div
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-36 h-36 md:w-48 md:h-48"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                  {[...Array(8)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute left-1/2 top-1/2 w-0.5 h-12 md:h-16 bg-gradient-to-t from-amber-400/30 to-transparent origin-bottom"
                      style={{ transform: `rotate(${i * 45}deg) translateX(-50%)` }}
                    />
                  ))}
                </motion.div>

                {/* Контейнер иконки */}
                <div className="relative w-20 h-20 md:w-28 md:h-28">
                  {/* Декоративное кольцо с градиентом */}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-amber-400 via-yellow-500 to-amber-600 p-[3px] shadow-2xl">
                    <div className="w-full h-full rounded-full bg-gradient-to-br from-amber-50 via-white to-amber-100 flex items-center justify-center shadow-inner">
                      <motion.img
                        src="/favicon.png"
                        alt="Интерактивная Библия"
                        className="w-12 h-12 md:w-16 md:h-16 object-contain drop-shadow-lg"
                        animate={{ 
                          scale: [1, 1.05, 1],
                        }}
                        transition={{
                          duration: 4,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Заголовок справа */}
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight bg-gradient-to-r from-amber-700 via-yellow-600 to-amber-700 bg-clip-text text-transparent drop-shadow-sm">
                Интерактивная Библия
              </h1>
            </motion.div>

            <motion.p
              className="text-xl md:text-2xl text-muted-foreground font-sans max-w-2xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              Раскрытие христианских истин, которые меняют жизнь
            </motion.p>

            {/* Табы в Hero Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mt-4 h-14 p-1 bg-card shadow-card">
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
            </motion.div>
          </div>
        </header>

        {/* Content */}
        <main className="max-w-6xl mx-auto px-6 pb-20">
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
        </main>
      </Tabs>

      {/* Footer */}
      <footer className="py-8 text-center text-muted-foreground font-sans text-sm">
        <p>Интерактивная Библия • 2025</p>
      </footer>
    </div>
  );
};

export default Index;
