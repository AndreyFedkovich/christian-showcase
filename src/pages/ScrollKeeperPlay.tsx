import { useScrollKeeperState } from '@/hooks/useScrollKeeperState';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Key, BookOpen, Clock } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

export default function ScrollKeeperPlay() {
  const navigate = useNavigate();
  const {
    state,
    getCurrentHall,
    setTeamName,
    startGame,
    startHall,
    startChallenge,
    submitAnswer,
    useHint,
    proceedFromResult,
    proceedToNextHall,
    goToSetup
  } = useScrollKeeperState();

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

  const handleSubmitAnswer = () => {
    if (answerInput.trim()) {
      submitAnswer(answerInput);
      setAnswerInput('');
    }
  };

  const currentHall = getCurrentHall();

  // Render based on game phase
  const renderContent = () => {
    switch (state.phase) {
      case 'team-setup':
        return (
          <div className="flex flex-col items-center justify-center min-h-screen p-8 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
            <div className="max-w-md w-full space-y-8">
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
          <div className="flex flex-col items-center justify-center min-h-screen p-8 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-center">
            <div className="max-w-2xl space-y-8 animate-fade-in">
              <div className="text-8xl mb-8">🏛️</div>
              <h1 className="text-3xl md:text-4xl font-bold text-amber-400">
                Библиотека Вечности
              </h1>
              <div className="space-y-4 text-lg md:text-xl text-slate-300 leading-relaxed">
                <p>{state.keeperMessage}</p>
                <p className="text-slate-400">{state.teamName}, {keeperDialogues.prologue.warning}</p>
                <p className="text-amber-300 italic">{keeperDialogues.prologue.challenge}</p>
              </div>
              <Button 
                onClick={startHall}
                size="lg"
                className="mt-8 bg-amber-600 hover:bg-amber-700 text-white px-12 py-6 text-xl"
              >
                Войти в Библиотеку
              </Button>
            </div>
          </div>
        );

      case 'hall-intro':
        return (
          <div className="flex flex-col items-center justify-center min-h-screen p-8 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-center">
            <div className="max-w-2xl space-y-8 animate-fade-in">
              <div className="flex items-center justify-center gap-4 mb-4">
                <MemoryKeyCounter keys={state.memoryKeys} maxKeys={state.maxMemoryKeys} />
              </div>
              <div className="text-7xl mb-4">{currentHall?.icon}</div>
              <h2 className="text-2xl md:text-3xl font-bold text-amber-400">
                Зал {state.currentHallIndex + 1}: {currentHall?.name}
              </h2>
              <p className="text-lg text-slate-300 italic">
                "{state.keeperMessage}"
              </p>
              <p className="text-slate-400">{currentHall?.description}</p>
              <Button 
                onClick={startChallenge}
                size="lg"
                className="mt-8 bg-amber-600 hover:bg-amber-700 text-white px-12 py-6 text-xl"
              >
                Принять испытание
              </Button>
            </div>
          </div>
        );

      case 'challenge':
        return (
          <div className="flex flex-col items-center justify-center min-h-screen p-8 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
            <div className="max-w-3xl w-full space-y-8">
              <div className="flex items-center justify-between">
                <MemoryKeyCounter keys={state.memoryKeys} maxKeys={state.maxMemoryKeys} />
                <div className="flex items-center gap-2 text-2xl font-mono">
                  <Clock className={cn(
                    "w-6 h-6",
                    state.timer <= 10 ? "text-red-500 animate-pulse" : "text-amber-400"
                  )} />
                  <span className={cn(
                    state.timer <= 10 ? "text-red-500" : "text-white"
                  )}>
                    {state.timer}с
                  </span>
                </div>
              </div>

              <div className="bg-slate-800/50 p-8 rounded-xl border border-slate-700 space-y-6">
                <div className="flex items-center gap-3 text-amber-400">
                  <span className="text-3xl">{currentHall?.icon}</span>
                  <span className="text-lg font-medium">{currentHall?.name}</span>
                </div>

                {state.currentChallenge && (
                  <ChallengeDisplay 
                    challenge={state.currentChallenge} 
                    usedHints={state.usedHints}
                    onUseHint={useHint}
                  />
                )}

                <div className="flex gap-4 pt-4">
                  <Input
                    value={answerInput}
                    onChange={(e) => setAnswerInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSubmitAnswer()}
                    placeholder="Ваш ответ..."
                    className="flex-1 bg-slate-700 border-slate-600 text-white text-lg py-6"
                  />
                  <Button 
                    onClick={handleSubmitAnswer}
                    disabled={!answerInput.trim()}
                    className="bg-amber-600 hover:bg-amber-700 text-white px-8"
                  >
                    Ответить
                  </Button>
                </div>
              </div>
            </div>
          </div>
        );

      case 'result':
        return (
          <div className="flex flex-col items-center justify-center min-h-screen p-8 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-center">
            <div className="max-w-2xl space-y-8 animate-fade-in">
              <div className={cn(
                "text-8xl",
                state.isCorrect ? "animate-bounce" : ""
              )}>
                {state.isCorrect ? '✨' : '💨'}
              </div>
              <h2 className={cn(
                "text-3xl font-bold",
                state.isCorrect ? "text-emerald-400" : "text-rose-400"
              )}>
                {state.isCorrect ? 'Верно!' : 'Неверно'}
              </h2>
              <p className="text-xl text-slate-300 italic">
                "{state.keeperMessage}"
              </p>
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
              <p className="text-xl text-slate-300 italic">
                "{state.keeperMessage}"
              </p>
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
          <div className="flex flex-col items-center justify-center min-h-screen p-8 bg-gradient-to-b from-amber-950 via-slate-900 to-slate-950 text-center">
            <div className="max-w-2xl space-y-8 animate-fade-in">
              <div className="text-8xl animate-pulse">🏆</div>
              <h1 className="text-4xl font-bold text-amber-400">
                Победа!
              </h1>
              <p className="text-xl text-slate-300 italic">
                "{state.keeperMessage}"
              </p>
              <MemoryKeyCounter keys={state.memoryKeys} maxKeys={state.maxMemoryKeys} />
              <div className="flex gap-4 justify-center pt-8">
                <Button 
                  onClick={goToSetup}
                  variant="outline"
                  className="border-amber-600 text-amber-400 hover:bg-amber-900/30"
                >
                  Играть снова
                </Button>
                <Button 
                  onClick={handleExit}
                  className="bg-amber-600 hover:bg-amber-700 text-white"
                >
                  Выйти
                </Button>
              </div>
            </div>
          </div>
        );

      case 'defeat':
        return (
          <div className="flex flex-col items-center justify-center min-h-screen p-8 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-center">
            <div className="max-w-2xl space-y-8 animate-fade-in">
              <div className="text-8xl">📖</div>
              <h1 className="text-4xl font-bold text-slate-400">
                Испытание не пройдено
              </h1>
              <p className="text-xl text-slate-300 italic">
                "{state.keeperMessage}"
              </p>
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

// Import keeper dialogues for prologue
import { keeperDialogues } from '@/data/scroll-keeper';

// Memory Key Counter component
function MemoryKeyCounter({ keys, maxKeys }: { keys: number; maxKeys: number }) {
  return (
    <div className="flex items-center gap-3 bg-slate-800/50 px-4 py-2 rounded-full border border-amber-600/30">
      <Key className="w-5 h-5 text-amber-400" />
      <span className="text-amber-400 font-bold text-lg">{keys}</span>
      <span className="text-slate-500">/</span>
      <span className="text-slate-400">{maxKeys}</span>
      <span className="text-slate-500 text-sm">Ключей Памяти</span>
    </div>
  );
}

// Challenge Display component
import { Challenge } from '@/data/scroll-keeper';

function ChallengeDisplay({ 
  challenge, 
  usedHints, 
  onUseHint 
}: { 
  challenge: Challenge; 
  usedHints: number;
  onUseHint: () => void;
}) {
  switch (challenge.hallType) {
    case 'shadows':
      return (
        <div className="space-y-4">
          <p className="text-slate-300 text-lg leading-relaxed">{challenge.story}</p>
          <p className="text-amber-400 font-medium text-xl">{challenge.question}</p>
          {challenge.hints && usedHints < challenge.hints.length && (
            <Button 
              variant="outline" 
              size="sm"
              onClick={onUseHint}
              className="border-slate-600 text-slate-400"
            >
              Подсказка ({challenge.hints.length - usedHints} осталось)
            </Button>
          )}
          {challenge.hints && usedHints > 0 && (
            <div className="text-slate-400 text-sm space-y-1">
              {challenge.hints.slice(0, usedHints).map((hint, i) => (
                <p key={i}>💡 {hint}</p>
              ))}
            </div>
          )}
        </div>
      );

    case 'scriptorium':
      return (
        <div className="space-y-4">
          <blockquote className="text-slate-200 text-xl italic border-l-4 border-amber-600 pl-4">
            "{challenge.verse}"
          </blockquote>
          <p className="text-amber-400 font-medium">Из какой книги Библии этот стих?</p>
          {usedHints === 0 && (
            <Button 
              variant="outline" 
              size="sm"
              onClick={onUseHint}
              className="border-slate-600 text-slate-400"
            >
              Подсказка: Завет
            </Button>
          )}
          {usedHints >= 1 && (
            <p className="text-slate-400 text-sm">💡 Завет: {challenge.hints.testament}</p>
          )}
          {usedHints === 1 && (
            <Button 
              variant="outline" 
              size="sm"
              onClick={onUseHint}
              className="border-slate-600 text-slate-400"
            >
              Подсказка: Тип книги
            </Button>
          )}
          {usedHints >= 2 && (
            <p className="text-slate-400 text-sm">💡 Тип: {challenge.hints.bookType}</p>
          )}
        </div>
      );

    case 'echo':
      return (
        <div className="space-y-4">
          <p className="text-amber-400 font-medium text-xl">
            Угадайте по подсказкам (осталось очков: {Math.max(1, challenge.maxPoints - usedHints)})
          </p>
          <div className="space-y-2">
            {challenge.clues.slice(0, usedHints + 1).map((clue, i) => (
              <p key={i} className="text-slate-300">
                <span className="text-amber-500">{i + 1}.</span> {clue}
              </p>
            ))}
          </div>
          {usedHints < challenge.clues.length - 1 && (
            <Button 
              variant="outline" 
              size="sm"
              onClick={onUseHint}
              className="border-slate-600 text-slate-400"
            >
              Следующая подсказка (-1 очко)
            </Button>
          )}
        </div>
      );

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
      return null;
  }
}
