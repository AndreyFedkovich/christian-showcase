import { useScrollKeeperState } from '@/hooks/useScrollKeeperState';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Key, BookOpen, Clock, Settings2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { PrologueScene } from '@/components/game/scroll-keeper/PrologueScene';
import { HallTransition } from '@/components/game/scroll-keeper/HallTransition';
import { KeeperDialogue } from '@/components/game/scroll-keeper/KeeperDialogue';
import { VictoryScene } from '@/components/game/scroll-keeper/VictoryScene';
import { HallOfShadows, Scriptorium, EchoChamber, GalleryOfWitnesses, TreasuryOfRelics, HallOfVoices, TimeSpiral } from '@/components/game/scroll-keeper/halls';
import { Challenge, ShadowsChallenge, ScriptoriumChallenge, EchoChallenge, GalleryChallenge, TreasuryChallenge, VoicesChallenge, SpiralChallenge } from '@/data/scroll-keeper';

export default function ScrollKeeperPlay() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const {
    state,
    getCurrentHall,
    setTeamName,
    startGame,
    startHall,
    startFromHall,
    startChallenge,
    submitAnswer,
    useHint,
    proceedFromResult,
    proceedToNextHall,
    goToSetup
  } = useScrollKeeperState();

  // Handle startHall query param - auto-start game from selected hall
  useEffect(() => {
    const startHallParam = searchParams.get('startHall');
    if (startHallParam !== null && state.phase === 'team-setup') {
      const hallIndex = parseInt(startHallParam, 10);
      if (!isNaN(hallIndex) && hallIndex >= 0) {
        setTeamName('Искатели');
        document.documentElement.requestFullscreen().catch(() => {});
        startFromHall(hallIndex);
      }
    }
  }, [searchParams, state.phase, setTeamName, startFromHall]);

  const [teamNameInput, setTeamNameInput] = useState('');
  const [answerInput, setAnswerInput] = useState('');

  const handleStartGame = async () => {
    setTeamName(teamNameInput || 'Искатели');
    try {
      await document.documentElement.requestFullscreen();
    } catch (e) {
      console.log('Fullscreen not available');
    }
    startGame();
  };

  const handleExit = async () => {
    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen();
      }
    } catch (e) {
      console.log('Exit fullscreen error');
    }
    navigate('/');
  };

  const handleSubmitAnswer = (answer: string) => {
    if (answer.trim()) {
      submitAnswer(answer);
      setAnswerInput('');
    }
  };

  const currentHall = getCurrentHall();

  // Render specialized hall component
  const renderHallChallenge = () => {
    if (!state.currentChallenge || !currentHall) return null;

    switch (state.currentChallenge.hallType) {
      case 'shadows':
        return (
          <HallOfShadows
            challenge={state.currentChallenge as ShadowsChallenge}
            timer={state.timer}
            usedHints={state.usedHints}
            isChecking={state.isCheckingAnswer}
            onUseHint={useHint}
            onSubmitAnswer={handleSubmitAnswer}
          />
        );
      
      case 'scriptorium':
        return (
          <Scriptorium
            challenge={state.currentChallenge as ScriptoriumChallenge}
            timer={state.timer}
            usedHints={state.usedHints}
            isChecking={state.isCheckingAnswer}
            onUseHint={useHint}
            onSubmitAnswer={handleSubmitAnswer}
          />
        );
      
      case 'echo':
        return (
          <EchoChamber
            challenge={state.currentChallenge as EchoChallenge}
            timer={state.timer}
            usedHints={state.usedHints}
            isChecking={state.isCheckingAnswer}
            onUseHint={useHint}
            onSubmitAnswer={handleSubmitAnswer}
          />
        );
      
      case 'gallery':
        return (
          <GalleryOfWitnesses
            challenge={state.currentChallenge as GalleryChallenge}
            timer={state.timer}
            isChecking={state.isCheckingAnswer}
            onSubmitAnswer={handleSubmitAnswer}
          />
        );
      
      case 'treasury':
        return (
          <TreasuryOfRelics
            challenge={state.currentChallenge as TreasuryChallenge}
            timer={state.timer}
            isChecking={state.isCheckingAnswer}
            onSubmitAnswer={handleSubmitAnswer}
          />
        );
      
      case 'voices':
        return (
          <HallOfVoices
            challenge={state.currentChallenge as VoicesChallenge}
            isChecking={state.isCheckingAnswer}
            onAnswer={(answer, correct) => {
              submitAnswer(answer);
            }}
          />
        );
      
      case 'spiral':
        return (
          <TimeSpiral
            challenge={state.currentChallenge as SpiralChallenge}
            onAnswer={(answer, correct) => {
              submitAnswer(answer);
            }}
          />
        );

      // Default challenge display for halls not yet implemented
      default:
        return (
          <DefaultChallengeView
            challenge={state.currentChallenge}
            timer={state.timer}
            usedHints={state.usedHints}
            currentHall={currentHall}
            onUseHint={useHint}
            onSubmitAnswer={handleSubmitAnswer}
          />
        );
    }
  };

  // Render based on game phase
  const renderContent = () => {
    switch (state.phase) {
      case 'team-setup':
        return (
          <div className="flex flex-col items-center justify-center min-h-screen p-8 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
            <div className="max-w-md w-full space-y-8">
              {/* Header with settings */}
              <div className="flex justify-end">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => navigate('/game/scroll-keeper/halls')}
                  className="text-slate-400 hover:text-white hover:bg-slate-700"
                >
                  <Settings2 className="w-5 h-5" />
                </Button>
              </div>
              
              <div className="text-center space-y-4">
                <div className="text-6xl mb-4">📚</div>
                <h1 className="text-4xl font-bold text-amber-400">Хранитель Свитков</h1>
                <p className="text-slate-300 text-lg">Библиотека Вечности ждёт вас</p>
              </div>
              
              <div className="space-y-4 bg-slate-800/50 p-6 rounded-xl border border-slate-700">
                <div className="space-y-2">
                  <Label htmlFor="teamName" className="text-slate-300">Имя команды Искателей</Label>
                  <Input
                    id="teamName"
                    value={teamNameInput}
                    onChange={(e) => setTeamNameInput(e.target.value)}
                    placeholder="Искатели"
                    className="bg-slate-700 border-slate-600 text-white"
                  />
                </div>
                
                <div className="pt-4 space-y-3 text-sm text-slate-400">
                  <p className="flex items-center gap-2">
                    <Key className="w-4 h-4 text-amber-400" />
                    Соберите Ключи Памяти, отвечая на вопросы
                  </p>
                  <p className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-amber-400" />
                    Пройдите 7 залов Библиотеки Вечности
                  </p>
                  <p className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-amber-400" />
                    Время ограничено — думайте быстро!
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <Button 
                  variant="outline" 
                  onClick={() => navigate('/')}
                  className="flex-1 border-slate-600 text-slate-300 hover:bg-slate-700"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Назад
                </Button>
                <Button 
                  onClick={handleStartGame}
                  className="flex-1 bg-amber-600 hover:bg-amber-700 text-white"
                >
                  Начать квест
                </Button>
              </div>
            </div>
          </div>
        );

      case 'prologue':
        return (
          <PrologueScene
            teamName={state.teamName}
            onEnterLibrary={startHall}
          />
        );

      case 'hall-intro':
        return currentHall ? (
          <HallTransition
            hall={currentHall}
            hallNumber={state.currentHallIndex + 1}
            totalHalls={state.hallOrder.length}
            memoryKeys={state.memoryKeys}
            maxKeys={state.maxMemoryKeys}
            onStartChallenge={startChallenge}
          />
        ) : null;

      case 'challenge':
        return renderHallChallenge();

      case 'result':
        return (
          <div className="flex flex-col items-center justify-center min-h-screen p-8 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-center">
            <div className="max-w-2xl space-y-8 animate-fade-in">
              <div className={cn(
                "text-9xl drop-shadow-[0_0_40px_rgba(251,191,36,0.6)]",
                state.isCorrect ? "" : ""
              )}>
                {state.isCorrect ? '✨' : '💨'}
              </div>
              <h2 className={cn(
                "text-4xl md:text-5xl font-bold",
                state.isCorrect ? "text-emerald-400" : "text-rose-400"
              )}>
                {state.isCorrect ? 'Верно!' : 'Неверно'}
              </h2>
              
              <KeeperDialogue
                message={state.keeperMessage}
                mood={state.keeperMood}
              />
              
              <MemoryKeyCounter keys={state.memoryKeys} maxKeys={state.maxMemoryKeys} />
              <Button 
                onClick={proceedFromResult}
                size="lg"
                className="mt-8 bg-amber-600 hover:bg-amber-700 text-white px-12 py-6 text-xl"
              >
                Продолжить
              </Button>
            </div>
          </div>
        );

      case 'hall-complete':
        return (
          <div className="flex flex-col items-center justify-center min-h-screen p-8 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-center">
            <div className="max-w-2xl space-y-8 animate-fade-in">
              <div className="text-8xl">🚪</div>
              <h2 className="text-3xl font-bold text-amber-400">
                Зал пройден!
              </h2>
              
              <KeeperDialogue
                message={state.keeperMessage}
                mood="approving"
              />
              
              <MemoryKeyCounter keys={state.memoryKeys} maxKeys={state.maxMemoryKeys} />
              <Button 
                onClick={proceedToNextHall}
                size="lg"
                className="mt-8 bg-amber-600 hover:bg-amber-700 text-white px-12 py-6 text-xl"
              >
                Следующий зал
              </Button>
            </div>
          </div>
        );

      case 'victory':
        return (
          <VictoryScene
            teamName={state.teamName}
            memoryKeys={state.memoryKeys}
            maxKeys={state.maxMemoryKeys}
            onPlayAgain={goToSetup}
            onExit={handleExit}
          />
        );

      case 'defeat':
        return (
          <div className="flex flex-col items-center justify-center min-h-screen p-8 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-center">
            <div className="max-w-2xl space-y-8 animate-fade-in">
              <div className="text-8xl">📖</div>
              <h1 className="text-4xl font-bold text-slate-400">
                Испытание не пройдено
              </h1>
              
              <KeeperDialogue
                message={state.keeperMessage}
                mood="thoughtful"
              />
              
              <MemoryKeyCounter keys={state.memoryKeys} maxKeys={state.maxMemoryKeys} />
              <div className="flex gap-4 justify-center pt-8">
                <Button 
                  onClick={goToSetup}
                  variant="outline"
                  className="border-slate-600 text-slate-400 hover:bg-slate-800"
                >
                  Попробовать снова
                </Button>
                <Button 
                  onClick={handleExit}
                  className="bg-slate-700 hover:bg-slate-600 text-white"
                >
                  Выйти
                </Button>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen overflow-hidden">
      {renderContent()}
    </div>
  );
}

// Memory Key Counter component
function MemoryKeyCounter({ keys, maxKeys }: { keys: number; maxKeys: number }) {
  return (
    <div className="flex items-center gap-3 bg-slate-800/50 px-6 py-3 rounded-full border-2 border-amber-600/30 shadow-lg backdrop-blur-sm">
      <Key className="w-7 h-7 text-amber-400 drop-shadow-[0_0_10px_rgba(251,191,36,0.4)]" />
      <span className="text-amber-400 font-bold text-2xl">{keys}</span>
      <span className="text-slate-500 text-xl">/</span>
      <span className="text-slate-400 text-xl">{maxKeys}</span>
      <span className="text-slate-500 text-base">Ключей Памяти</span>
    </div>
  );
}

// Default Challenge View for halls not yet implemented
import { Hall } from '@/data/scroll-keeper';
import { Input as InputField } from '@/components/ui/input';
import { Send, Lightbulb } from 'lucide-react';

interface DefaultChallengeViewProps {
  challenge: Challenge;
  timer: number;
  usedHints: number;
  currentHall: Hall;
  onUseHint: () => void;
  onSubmitAnswer: (answer: string) => void;
}

function DefaultChallengeView({ 
  challenge, 
  timer, 
  usedHints,
  currentHall,
  onUseHint,
  onSubmitAnswer 
}: DefaultChallengeViewProps) {
  const [answer, setAnswer] = useState('');

  const handleSubmit = () => {
    if (answer.trim()) {
      onSubmitAnswer(answer);
      setAnswer('');
    }
  };

  const renderChallengeContent = () => {
    switch (challenge.hallType) {
      case 'gallery':
        return (
          <div className="space-y-4">
            <div className="bg-slate-900/50 p-6 rounded-lg border border-slate-700">
              <p className="text-slate-200 text-lg italic leading-relaxed">
                "{challenge.monologue}"
              </p>
            </div>
            <p className="text-amber-400 font-medium">Кто это говорит?</p>
          </div>
        );

      case 'treasury':
        return (
          <div className="space-y-4">
            <p className="text-slate-300 text-lg leading-relaxed">{challenge.description}</p>
            <p className="text-amber-400 font-medium">Что это за предмет?</p>
          </div>
        );

      case 'voices':
        return (
          <div className="space-y-4">
            <blockquote className="text-slate-200 text-2xl italic text-center py-4">
              «{challenge.quote}»
            </blockquote>
            <p className="text-amber-400 font-medium text-center">Кто это сказал?</p>
          </div>
        );

      case 'spiral':
        return (
          <div className="space-y-4">
            <p className="text-amber-400 font-medium">Расположите события в хронологическом порядке (через запятую):</p>
            <div className="grid grid-cols-2 gap-4">
              {challenge.events.map((event) => (
                <div key={event.id} className="bg-slate-900/50 p-4 rounded-lg border border-slate-700">
                  <span className="text-amber-500 font-bold">{event.id}.</span>
                  <span className="text-slate-300 ml-2">{event.name}</span>
                  <p className="text-slate-500 text-sm mt-1">{event.era}</p>
                </div>
              ))}
            </div>
            <p className="text-slate-400 text-sm">Пример ответа: 1,2,3,4</p>
          </div>
        );

      default:
        return <p className="text-slate-400">Неизвестный тип испытания</p>;
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      <div className="max-w-3xl w-full space-y-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800/50 border border-slate-600/50">
            <span className="text-2xl">{currentHall.icon}</span>
            <span className="text-slate-300 font-medium">{currentHall.name}</span>
          </div>
          <div className={cn(
            "flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-sm",
            timer <= 10 ? "bg-red-900/50 border border-red-500/50" : "bg-slate-800/50 border border-slate-600/50"
          )}>
            <Clock className={cn("w-5 h-5", timer <= 10 ? "text-red-400 animate-pulse" : "text-amber-400")} />
            <span className={cn("text-xl font-mono font-bold", timer <= 10 ? "text-red-400" : "text-white")}>
              {timer}с
            </span>
          </div>
        </div>

        <div className="bg-slate-800/50 p-8 rounded-xl border border-slate-700 space-y-6">
          {renderChallengeContent()}
        </div>

        <div className="flex gap-4">
          <InputField
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
            placeholder="Ваш ответ..."
            className="flex-1 bg-slate-800/50 border-slate-600 text-white text-lg py-6 placeholder:text-slate-500"
            autoFocus
          />
          <Button 
            onClick={handleSubmit}
            disabled={!answer.trim()}
            size="lg"
            className="bg-amber-600 hover:bg-amber-700 text-white px-8"
          >
            <Send className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
