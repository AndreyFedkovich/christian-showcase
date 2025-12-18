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
      {/* Hero Section with Tabs */}
      <header className="relative py-8 md:py-12 px-6 overflow-hidden">
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

        <div className="relative max-w-4xl mx-auto space-y-6">
          {/* Заголовок с иконкой слева */}
          <motion.div
            className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Компактная иконка */}
            <div className="relative flex-shrink-0">
              {/* Свечение */}
              <motion.div
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 md:w-32 md:h-32 bg-gradient-to-r from-amber-400/20 via-yellow-300/30 to-amber-400/20 blur-2xl rounded-full"
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
              
              {/* Контейнер иконки */}
              <div className="relative w-16 h-16 md:w-20 md:h-20">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-amber-400 via-yellow-500 to-amber-600 p-[2px] shadow-xl">
                  <div className="w-full h-full rounded-full bg-gradient-to-br from-amber-50 via-white to-amber-100 flex items-center justify-center shadow-inner">
                    <motion.img
                      src="/favicon.png"
                      alt="Интерактивная Библия"
                      className="w-10 h-10 md:w-12 md:h-12 object-contain drop-shadow-md"
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                  </div>
                </div>
                
                {/* Внешнее кольцо */}
                <motion.div
                  className="absolute -inset-1.5 rounded-full border border-amber-400/30"
                  animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.5, 0.2, 0.5],
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </div>
            </div>

            {/* Текст */}
            <div className="text-center md:text-left">
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight bg-gradient-to-r from-amber-700 via-yellow-600 to-amber-700 bg-clip-text text-transparent">
                Интерактивная Библия
              </h1>
              <p className="text-base md:text-lg text-muted-foreground font-sans mt-1 md:mt-2">
                Раскрытие христианских истин, которые меняют жизнь
              </p>
            </div>
          </motion.div>

          {/* Вкладки в Hero секции */}
          <Tabs defaultValue="presentations" className="w-full">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <TabsList className="grid w-full max-w-sm mx-auto grid-cols-2 h-12 p-1 bg-card shadow-card">
                <TabsTrigger 
                  value="presentations" 
                  className="flex items-center gap-2 text-sm font-sans data-[state=active]:gradient-gold data-[state=active]:text-primary-foreground rounded-lg h-10"
                >
                  <BookOpen className="w-4 h-4" />
                  Презентации
                </TabsTrigger>
                <TabsTrigger 
                  value="games" 
                  className="flex items-center gap-2 text-sm font-sans data-[state=active]:bg-gradient-to-r data-[state=active]:from-violet-600 data-[state=active]:to-purple-600 data-[state=active]:text-white rounded-lg h-10"
                >
                  <Gamepad2 className="w-4 h-4" />
                  Игры
                </TabsTrigger>
              </TabsList>
            </motion.div>

            {/* Контент вкладок */}
            <main className="max-w-6xl mx-auto pt-8">
              <TabsContent value="presentations" className="mt-0">
                <div className="space-y-6">
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
                <div className="space-y-6">
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
        </div>
      </header>

      {/* Footer */}
      <footer className="py-8 text-center text-muted-foreground font-sans text-sm">
        <p>Интерактивная Библия • 2025</p>
      </footer>
    </div>
  );
};

export default Index;
