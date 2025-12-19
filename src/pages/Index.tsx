import { useNavigate } from "react-router-dom";
import { useState, useMemo } from "react";
import PresentationCard from "@/components/PresentationCard";
import GameCard from "@/components/GameCard";
import { presentations } from "@/data/presentations";
import { games } from "@/data/games";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { BookOpen, Gamepad2, Search, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const Index = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const handlePresentationClick = (presentationId: string) => {
    navigate(`/presentation/${presentationId}`);
  };

  const handleGameClick = (gameId: string) => {
    navigate(`/game/${gameId}/play`);
  };

  // Логика фильтрации презентаций
  const filteredPresentations = useMemo(() => {
    if (!searchQuery.trim()) return presentations;
    const query = searchQuery.toLowerCase();
    return presentations.filter(
        (p) =>
            p.title.toLowerCase().includes(query) ||
            p.description.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  // Логика фильтрации игр
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
      <div className="min-h-screen gradient-warm">
        <Tabs defaultValue="presentations" className="w-full flex flex-col min-h-screen">
          {/* Hero Section */}
          <header className="relative pt-12 md:pt-16 pb-0 px-6 text-center overflow-hidden flex-shrink-0">
            <div className="absolute inset-0 gradient-overlay opacity-5" />

            {/* Декоративные частицы */}
            {/*<div className="absolute inset-0 overflow-hidden pointer-events-none">
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
            </div>*/}

            <div className="relative max-w-full mx-auto space-y-12">
              {/* Иконка + Тексты */}
              <motion.div
                  className="flex items-center justify-center gap-6 md:gap-10"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, ease: "easeOut" }}
              >
                {/* Премиальная иконка */}
                <div className="relative flex-shrink-0">
                  <motion.div
                      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 md:w-44 md:h-44 bg-gradient-to-r from-amber-400/20 via-yellow-300/30 to-amber-400/20 blur-3xl rounded-full"
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.5, 0.3],
                      }}
                      transition={{
                        duration: 3,
                        repeat: 1,
                        ease: "easeInOut",
                      }}
                  />

                  {/*<motion.div
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
                  </motion.div>*/}

                  <div className="relative w-20 h-20 md:w-28 md:h-28">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-amber-400 via-yellow-500 to-amber-600 p-[3px] shadow-2xl">
                      <div className="w-full h-full rounded-full bg-gradient-to-br from-amber-50 via-white to-amber-100 flex items-center justify-center shadow-inner">
                        <motion.img
                            src="/favicon.png"
                            alt="Интерактивная Библия"
                            className="w-12 h-12 md:w-16 md:h-14 object-contain drop-shadow-lg"
                            animate={{
                              scale: [1, 1.05, 1],
                            }}
                            transition={{
                              duration: 4,
                              repeat: 1,
                              ease: "easeInOut",
                            }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="text-left">
                  <h1 className="text-4xl md:text-5xl lg:text-6xl h-[4.1rem] font-bold tracking-tight bg-gradient-to-r from-amber-700 via-yellow-600 to-amber-700 bg-clip-text text-transparent drop-shadow-sm">
                    Интерактивная Библия
                  </h1>
                  <p className="text-xl md:text-2xl text-muted-foreground font-sans leading-relaxed mt-2 md:mt-3">
                    Раскрытие христианских истин, которые меняют жизнь
                  </p>
                </div>
              </motion.div>

              {/* Панель навигации и поиска */}
              <motion.div
                  className="mt-12 md:mt-16 w-full border-b border-amber-200/30 backdrop-blur-[2px]"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
              >
                <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 pb-0 md:px-6">

                  {/* Табы слева - прозрачный стиль */}
                  <TabsList className="bg-transparent h-auto p-0 flex gap-6 md:gap-8 w-full md:w-auto justify-center md:justify-start">
                    <TabsTrigger
                        value="presentations"
                        className="rounded-none border-b-2 border-transparent px-2 pb-3 pt-2 font-sans text-lg text-muted-foreground data-[state=active]:border-amber-500 data-[state=active]:bg-transparent data-[state=active]:text-amber-700 data-[state=active]:shadow-none hover:text-amber-600 transition-colors"
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

                  {/* Поиск справа */}
                  <div className="relative w-full md:w-[20rem] mb-4 md:mb-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-amber-800/90" />
                      <Input
                          type="text"
                          placeholder="Поиск..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="pl-10 h-12 bg-white/80 backdrop-blur-md border-amber-200/50
                               focus:border-amber-400 focus:ring-amber-400/20 rounded-xl
                               placeholder:text-muted-foreground/80 shadow-sm transition-all
                               hover:bg-white/90"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </header>

          {/* Content Area */}
          <main className="flex-1 max-w-6xl mx-auto px-6 py-8 w-full">
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
          </main>
        </Tabs>

        {/* Footer */}
        <footer className="py-8 text-center text-muted-foreground font-sans text-sm border-t border-amber-100">
          <p>Интерактивная Библия • 2025</p>
        </footer>
      </div>
  );
};

// Компонент для отображения пустого результата
const EmptyState = ({ type }: { type: 'presentation' | 'game' }) => (
    <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center py-20 text-center text-muted-foreground"
    >
      <div className="w-16 h-16 bg-amber-50 rounded-full flex items-center justify-center mb-4 shadow-inner">
        <Sparkles className="w-8 h-8 text-amber-300" />
      </div>
      <h3 className="text-xl font-medium text-amber-900 mb-2">Ничего не найдено</h3>
      <p className="max-w-xs mx-auto text-balance">
        Попробуйте изменить поисковый запрос или выберите другую категорию.
      </p>
    </motion.div>
);

export default Index;
