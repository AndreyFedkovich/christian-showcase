import { useState, useCallback, useRef, useEffect } from 'react';
import { 
  BibleQuestion, 
  QuestionCategory, 
  Difficulty, 
  difficultyConfig,
  getRandomQuestion,
  getCategoriesForDifficulty
} from '@/data/bible-questions';

export type GamePhase = 
  | 'team-setup'
  | 'round-start'
  | 'spinning-difficulty'
  | 'show-difficulty'
  | 'spinning-topic'
  | 'show-topic'
  | 'question'
  | 'checking'
  | 'result-correct'
  | 'result-incorrect'
  | 'round-complete'
  | 'victory';

export interface GameState {
  teamScore: number;
  opponentScore: number;
  currentRound: number;
  roundDifficulty: Difficulty | null;
  questionsInRound: number;
  questionsAnswered: number;
  correctAnswersInRound: number;
  currentCategory: QuestionCategory | null;
  currentQuestion: BibleQuestion | null;
  timeRemaining: number;
  timerActive: boolean;
  gamePhase: GamePhase;
  teamName: string;
  opponentName: string;
  winner: 'team' | 'opponent' | null;
  usedQuestions: string[];
  availableCategories: QuestionCategory[];
}

const WINNING_SCORE = 10;

const initialState: GameState = {
  teamScore: 0,
  opponentScore: 0,
  currentRound: 1,
  roundDifficulty: null,
  questionsInRound: 0,
  questionsAnswered: 0,
  correctAnswersInRound: 0,
  currentCategory: null,
  currentQuestion: null,
  timeRemaining: 0,
  timerActive: false,
  gamePhase: 'team-setup',
  teamName: 'Команда',
  opponentName: 'Противник',
  winner: null,
  usedQuestions: [],
  availableCategories: []
};

export const useGameState = () => {
  const [state, setState] = useState<GameState>(initialState);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Clear timer on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  // Timer logic
  useEffect(() => {
    if (state.timerActive && state.timeRemaining > 0) {
      timerRef.current = setInterval(() => {
        setState(prev => {
          if (prev.timeRemaining <= 1) {
            // Time's up - wrong answer
            return {
              ...prev,
              timeRemaining: 0,
              timerActive: false,
              gamePhase: 'result-incorrect'
            };
          }
          return { ...prev, timeRemaining: prev.timeRemaining - 1 };
        });
      }, 1000);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [state.timerActive, state.timeRemaining]);

  const setTeamNames = useCallback((teamName: string, opponentName: string) => {
    setState(prev => ({
      ...prev,
      teamName: teamName || 'Команда',
      opponentName: opponentName || 'Противник'
    }));
  }, []);

  const startGame = useCallback(() => {
    setState(prev => ({
      ...prev,
      gamePhase: 'round-start'
    }));
  }, []);

  const startDifficultySelection = useCallback(() => {
    setState(prev => ({
      ...prev,
      gamePhase: 'spinning-difficulty'
    }));
  }, []);

  const setDifficulty = useCallback((difficulty: Difficulty) => {
    const config = difficultyConfig[difficulty];
    const categories = getCategoriesForDifficulty(difficulty);
    
    setState(prev => ({
      ...prev,
      roundDifficulty: difficulty,
      questionsInRound: config.questions,
      questionsAnswered: 0,
      correctAnswersInRound: 0,
      gamePhase: 'show-difficulty',
      availableCategories: categories
    }));
  }, []);

  const startTopicSelection = useCallback(() => {
    setState(prev => ({
      ...prev,
      gamePhase: 'spinning-topic'
    }));
  }, []);

  const setTopic = useCallback((category: QuestionCategory) => {
    setState(prev => {
      const question = getRandomQuestion(
        prev.roundDifficulty!,
        category,
        prev.usedQuestions
      );

      if (!question) {
        // No more questions in this category, try another
        const otherCategories = prev.availableCategories.filter(c => c !== category);
        for (const cat of otherCategories) {
          const q = getRandomQuestion(prev.roundDifficulty!, cat, prev.usedQuestions);
          if (q) {
            return {
              ...prev,
              currentCategory: cat,
              currentQuestion: q,
              gamePhase: 'show-topic',
              usedQuestions: [...prev.usedQuestions, q.question]
            };
          }
        }
        // No questions available at all - end round
        return { ...prev, gamePhase: 'round-complete' };
      }

      return {
        ...prev,
        currentCategory: category,
        currentQuestion: question,
        gamePhase: 'show-topic',
        usedQuestions: [...prev.usedQuestions, question.question]
      };
    });
  }, []);

  const showQuestion = useCallback(() => {
    setState(prev => {
      const time = prev.roundDifficulty ? difficultyConfig[prev.roundDifficulty].time : 15;
      return {
        ...prev,
        gamePhase: 'question',
        timeRemaining: time,
        timerActive: true
      };
    });
  }, []);

  const submitAnswer = useCallback((answer: string) => {
    setState(prev => ({
      ...prev,
      timerActive: false,
      gamePhase: 'checking'
    }));

    // Check answer
    setState(prev => {
      if (!prev.currentQuestion) return prev;

      const q = prev.currentQuestion;
      let isCorrect = false;

      if (q.type === 'exact') {
        const normalizedAnswer = answer.toLowerCase().trim();
        const normalizedCorrect = q.correctAnswer.toLowerCase().trim();
        isCorrect = normalizedAnswer === normalizedCorrect;
        
        // Also check acceptable keywords
        if (!isCorrect && q.acceptableKeywords) {
          isCorrect = q.acceptableKeywords.some(
            keyword => normalizedAnswer.includes(keyword.toLowerCase())
          );
        }
      } else {
        // For fuzzy questions, check keywords
        if (q.acceptableKeywords) {
          const normalizedAnswer = answer.toLowerCase();
          const matchedKeywords = q.acceptableKeywords.filter(
            keyword => normalizedAnswer.includes(keyword.toLowerCase())
          );
          isCorrect = matchedKeywords.length >= Math.min(2, q.acceptableKeywords.length);
        }
      }

      return {
        ...prev,
        gamePhase: isCorrect ? 'result-correct' : 'result-incorrect'
      };
    });
  }, []);

  const processResult = useCallback(() => {
    setState(prev => {
      const isCorrect = prev.gamePhase === 'result-correct';
      
      if (!isCorrect) {
        // Wrong answer - opponent gets a point
        const newOpponentScore = prev.opponentScore + 1;
        
        if (newOpponentScore >= WINNING_SCORE) {
          return {
            ...prev,
            opponentScore: newOpponentScore,
            winner: 'opponent',
            gamePhase: 'victory'
          };
        }
        
        // Move to next round
        return {
          ...prev,
          opponentScore: newOpponentScore,
          currentRound: prev.currentRound + 1,
          roundDifficulty: null,
          currentCategory: null,
          currentQuestion: null,
          gamePhase: 'round-start'
        };
      }

      // Correct answer
      const newQuestionsAnswered = prev.questionsAnswered + 1;
      const newCorrectAnswers = prev.correctAnswersInRound + 1;

      // Check if round is complete
      if (newQuestionsAnswered >= prev.questionsInRound) {
        // All questions answered correctly - team gets a point
        const newTeamScore = prev.teamScore + 1;

        if (newTeamScore >= WINNING_SCORE) {
          return {
            ...prev,
            teamScore: newTeamScore,
            questionsAnswered: newQuestionsAnswered,
            correctAnswersInRound: newCorrectAnswers,
            winner: 'team',
            gamePhase: 'victory'
          };
        }

        // Move to next round
        return {
          ...prev,
          teamScore: newTeamScore,
          questionsAnswered: newQuestionsAnswered,
          correctAnswersInRound: newCorrectAnswers,
          gamePhase: 'round-complete'
        };
      }

      // More questions in this round - pick next topic
      return {
        ...prev,
        questionsAnswered: newQuestionsAnswered,
        correctAnswersInRound: newCorrectAnswers,
        currentCategory: null,
        currentQuestion: null,
        gamePhase: 'spinning-topic'
      };
    });
  }, []);

  const startNextRound = useCallback(() => {
    setState(prev => ({
      ...prev,
      currentRound: prev.currentRound + 1,
      roundDifficulty: null,
      currentCategory: null,
      currentQuestion: null,
      questionsAnswered: 0,
      correctAnswersInRound: 0,
      gamePhase: 'round-start'
    }));
  }, []);

  const resetGame = useCallback(() => {
    setState({
      ...initialState,
      teamName: state.teamName,
      opponentName: state.opponentName
    });
  }, [state.teamName, state.opponentName]);

  const goToSetup = useCallback(() => {
    setState(initialState);
  }, []);

  return {
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
  };
};
