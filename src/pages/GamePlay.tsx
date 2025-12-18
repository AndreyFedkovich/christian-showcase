import { useNavigate, useParams } from "react-router-dom";
import { useGameState } from "@/hooks/useGameState";
import { Difficulty, QuestionCategory, categoryLabels, categoryIcons, difficultyConfig } from "@/data/bible-questions";
import GameScoreboard from "@/components/game/bible-master/GameScoreboard";
import SpinWheel from "@/components/game/bible-master/SpinWheel";
import DifficultyReveal from "@/components/game/bible-master/DifficultyReveal";
import TopicReveal from "@/components/game/bible-master/TopicReveal";
import QuestionCard from "@/components/game/bible-master/QuestionCard";
import GameTimer from "@/components/game/bible-master/GameTimer";
import AnswerInput from "@/components/game/bible-master/AnswerInput";
import AnswerResult from "@/components/game/bible-master/AnswerResult";
import RoundTransition from "@/components/game/bible-master/RoundTransition";
import VictoryScreen from "@/components/game/bible-master/VictoryScreen";
import TeamSetup from "@/components/game/bible-master/TeamSetup";

const difficultyItems = [
  { value: 1 as Difficulty, label: 'Легкий', icon: '⭐' },
  { value: 2 as Difficulty, label: 'Средний', icon: '⭐⭐' },
  { value: 3 as Difficulty, label: 'Сложный', icon: '⭐⭐⭐' }
];

const GamePlay = () => {
  const navigate = useNavigate();
  const {
    state,
    setTeamNames,
    startGame,
    startDifficultySelection,
    setDifficulty,
    startTopicSelection,
    setTopic,
    showQuestion,
    submitAnswer,
    processResult,
    startNextRound,
    resetGame,
    goToSetup
  } = useGameState();

  const topicItems = state.availableCategories.map(cat => ({
    value: cat,
    label: categoryLabels[cat],
    icon: categoryIcons[cat]
  }));

  const handleTeamSetup = (teamName: string, opponentName: string) => {
    setTeamNames(teamName, opponentName);
    startGame();
  };

  const handleGoHome = () => {
    navigate('/');
  };

  const { gameId } = useParams();
  
  // Team setup phase
  if (state.gamePhase === 'team-setup') {
    return <TeamSetup onStart={handleTeamSetup} gameId={gameId || 'bible-master'} />;
  }

  // Victory phase
  if (state.gamePhase === 'victory' && state.winner) {
    return (
      <VictoryScreen
        winner={state.winner}
        teamName={state.teamName}
        opponentName={state.opponentName}
        teamScore={state.teamScore}
        opponentScore={state.opponentScore}
        onPlayAgain={resetGame}
        onGoHome={handleGoHome}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-violet-950 to-slate-900 flex flex-col overflow-hidden">
      {/* Header with scoreboard */}
      <header className="p-4 md:p-6">
        <GameScoreboard
          teamName={state.teamName}
          opponentName={state.opponentName}
          teamScore={state.teamScore}
          opponentScore={state.opponentScore}
        />
      </header>

      {/* Main game area */}
      <main className="flex-1 flex items-center justify-center p-6">
        {/* Round start / complete */}
        {(state.gamePhase === 'round-start' || state.gamePhase === 'round-complete') && (
          <RoundTransition
            roundNumber={state.currentRound}
            teamScore={state.teamScore}
            opponentScore={state.opponentScore}
            teamName={state.teamName}
            opponentName={state.opponentName}
            roundComplete={state.gamePhase === 'round-complete'}
            onStartRound={state.gamePhase === 'round-complete' ? startNextRound : startDifficultySelection}
          />
        )}

        {/* Spinning difficulty */}
        {state.gamePhase === 'spinning-difficulty' && (
          <SpinWheel
            items={difficultyItems}
            spinning={true}
            onComplete={setDifficulty}
          />
        )}

        {/* Show difficulty */}
        {state.gamePhase === 'show-difficulty' && state.roundDifficulty && (
          <DifficultyReveal
            difficulty={state.roundDifficulty}
            onContinue={startTopicSelection}
          />
        )}

        {/* Spinning topic */}
        {state.gamePhase === 'spinning-topic' && topicItems.length > 0 && (
          <SpinWheel
            items={topicItems}
            spinning={true}
            onComplete={setTopic}
          />
        )}

        {/* Show topic */}
        {state.gamePhase === 'show-topic' && state.currentCategory && (
          <TopicReveal
            category={state.currentCategory}
            onContinue={showQuestion}
          />
        )}

        {/* Question phase */}
        {(state.gamePhase === 'question' || state.gamePhase === 'checking') && state.currentQuestion && (
          <div className="w-full max-w-2xl flex flex-col items-center gap-8">
            <GameTimer
              timeRemaining={state.timeRemaining}
              totalTime={state.roundDifficulty ? difficultyConfig[state.roundDifficulty].time : 15}
              isActive={state.timerActive}
            />
            <QuestionCard
              question={state.currentQuestion}
              questionNumber={state.questionsAnswered + 1}
              totalQuestions={state.questionsInRound}
            />
            <AnswerInput
              onSubmit={submitAnswer}
              disabled={state.gamePhase === 'checking'}
            />
          </div>
        )}

        {/* Result phase */}
        {(state.gamePhase === 'result-correct' || state.gamePhase === 'result-incorrect') && state.currentQuestion && (
          <AnswerResult
            isCorrect={state.gamePhase === 'result-correct'}
            correctAnswer={state.currentQuestion.correctAnswer}
            teamName={state.teamName}
            opponentName={state.opponentName}
            onContinue={processResult}
          />
        )}
      </main>

      {/* Round info */}
      <footer className="p-4 text-center">
        <span className="text-sm font-sans text-white/50">
          Раунд {state.currentRound}
        </span>
      </footer>
    </div>
  );
};

export default GamePlay;
