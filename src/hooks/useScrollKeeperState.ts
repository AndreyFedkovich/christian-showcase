import { useState, useCallback, useRef, useEffect } from 'react';
import { 
  GamePhase, 
  HallType, 
  KeeperMood, 
  Challenge, 
  Hall,
  halls, 
  sampleChallenges,
  keeperDialogues 
} from '@/data/scroll-keeper';
import { checkAnswerWithAI } from '@/lib/ai-service';

export interface ScrollKeeperState {
  phase: GamePhase;
  teamName: string;
  memoryKeys: number;           // Бонусные ключи (за правильные ответы)
  seekerScore: number;          // Очки Искателей
  keeperScore: number;          // Очки Хранителя
  currentHallIndex: number;
  hallOrder: HallType[];
  currentChallenge: Challenge | null;
  challengeIndex: number;       // Текущий вопрос в зале
  totalChallengesInHall: number; // Всего вопросов в текущем зале
  keeperMood: KeeperMood;
  keeperMessage: string;
  isCorrect: boolean | null;
  usedHints: number;
  timer: number;
  isTimerRunning: boolean;
  isCheckingAnswer: boolean;
  hallClosed: boolean;          // Зал закрыт из-за неправильного ответа
}

const DEFAULT_HALLS_ORDER: HallType[] = ['shadows', 'scriptorium', 'echo', 'gallery', 'treasury', 'voices', 'spiral'];
const TIME_PER_CHALLENGE = 60;

// Подсчитать общее количество вопросов во всех залах
export function getTotalQuestionsCount(): number {
  return DEFAULT_HALLS_ORDER.reduce((total, hallType) => {
    return total + sampleChallenges.filter(c => c.hallType === hallType).length;
  }, 0);
}

export function useScrollKeeperState() {
  const [state, setState] = useState<ScrollKeeperState>({
    phase: 'team-setup',
    teamName: '',
    memoryKeys: 0,
    seekerScore: 0,
    keeperScore: 0,
    currentHallIndex: 0,
    hallOrder: DEFAULT_HALLS_ORDER,
    currentChallenge: null,
    challengeIndex: 0,
    totalChallengesInHall: 0,
    keeperMood: 'neutral',
    keeperMessage: '',
    isCorrect: null,
    usedHints: 0,
    timer: TIME_PER_CHALLENGE,
    isTimerRunning: false,
    isCheckingAnswer: false,
    hallClosed: false
  });

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Timer effect
  useEffect(() => {
    if (state.isTimerRunning && state.timer > 0) {
      timerRef.current = setTimeout(() => {
        setState(prev => ({ ...prev, timer: prev.timer - 1 }));
      }, 1000);
    } else if (state.timer === 0 && state.isTimerRunning) {
      // Time's up - treat as incorrect
      handleTimeUp();
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [state.isTimerRunning, state.timer]);

  const handleTimeUp = useCallback(() => {
    const currentHallType = state.hallOrder[state.currentHallIndex];
    const isShadowsHall = currentHallType === 'shadows';
    
    // Хранитель получает очко за неправильный ответ
    const keeperMessages = [
      'Время истекло. Ещё одно очко в мою пользу.',
      'Тик-так... Время вышло. Я записываю это на свой счёт.',
      'Время — мой союзник. Ещё одна победа для Хранителя.'
    ];
    const randomMessage = keeperMessages[Math.floor(Math.random() * keeperMessages.length)];
    
    setState(prev => ({
      ...prev,
      phase: 'result',
      isCorrect: false,
      keeperScore: prev.keeperScore + 1,
      keeperMood: 'warning',
      keeperMessage: randomMessage,
      isTimerRunning: false,
      hallClosed: !isShadowsHall // Закрываем зал если это не Зал Теней
    }));
  }, [state.hallOrder, state.currentHallIndex]);

  const getCurrentHall = useCallback((): Hall | null => {
    const hallType = state.hallOrder[state.currentHallIndex];
    return halls.find(h => h.type === hallType) || null;
  }, [state.hallOrder, state.currentHallIndex]);

  const getChallengesForHall = useCallback((hallType: HallType): Challenge[] => {
    return sampleChallenges.filter(c => c.hallType === hallType);
  }, []);

  const setTeamName = useCallback((name: string) => {
    setState(prev => ({ ...prev, teamName: name }));
  }, []);

  const startGame = useCallback(() => {
    setState(prev => ({
      ...prev,
      phase: 'prologue',
      keeperMood: 'neutral',
      keeperMessage: keeperDialogues.prologue.welcome
    }));
  }, []);

  const startFromHall = useCallback((hallIndex: number) => {
    const targetHallIndex = Math.min(hallIndex, DEFAULT_HALLS_ORDER.length - 1);
    const targetHallType = DEFAULT_HALLS_ORDER[targetHallIndex];
    const targetHall = halls.find(h => h.type === targetHallType);
    const hallChallenges = sampleChallenges.filter(c => c.hallType === targetHallType);
    
    setState(prev => ({
      ...prev,
      phase: 'hall-intro',
      currentHallIndex: targetHallIndex,
      challengeIndex: 0,
      totalChallengesInHall: hallChallenges.length,
      keeperMood: 'neutral',
      keeperMessage: targetHall?.keeperIntro || '',
      usedHints: 0,
      hallClosed: false
    }));
  }, []);

  const startHall = useCallback(() => {
    const currentHall = getCurrentHall();
    if (!currentHall) return;

    const hallChallenges = getChallengesForHall(currentHall.type);

    setState(prev => ({
      ...prev,
      phase: 'hall-intro',
      keeperMood: 'neutral',
      keeperMessage: currentHall.keeperIntro,
      challengeIndex: 0,
      totalChallengesInHall: hallChallenges.length,
      usedHints: 0,
      hallClosed: false
    }));
  }, [getCurrentHall, getChallengesForHall]);

  const startChallenge = useCallback(() => {
    const hallType = state.hallOrder[state.currentHallIndex];
    const hallChallenges = getChallengesForHall(hallType);
    
    if (hallChallenges.length === 0) {
      // No challenges for this hall, move to next
      proceedToNextHall();
      return;
    }

    const challengeIdx = state.challengeIndex;
    if (challengeIdx >= hallChallenges.length) {
      // Все вопросы в зале пройдены
      proceedToNextHall();
      return;
    }
    
    const challenge = hallChallenges[challengeIdx];

    setState(prev => ({
      ...prev,
      phase: 'challenge',
      currentChallenge: challenge,
      totalChallengesInHall: hallChallenges.length,
      isCorrect: null,
      timer: TIME_PER_CHALLENGE,
      isTimerRunning: true,
      usedHints: 0
    }));
  }, [state.hallOrder, state.currentHallIndex, state.challengeIndex, getChallengesForHall]);

  const submitAnswer = useCallback(async (answer: string) => {
    if (!state.currentChallenge) return;

    const currentHallType = state.hallOrder[state.currentHallIndex];
    const isShadowsHall = currentHallType === 'shadows';
    const isScriptoriumHall = currentHallType === 'scriptorium';
    const hallStaysOpen = isShadowsHall || isScriptoriumHall;

    // Stop timer and set checking state
    setState(prev => ({ ...prev, isTimerRunning: false, isCheckingAnswer: true }));

    let correctAnswer = '';
    let isCorrect = false;
    let feedback = '';
    
    // Extract correct answer based on challenge type
    switch (state.currentChallenge.hallType) {
      case 'shadows':
        correctAnswer = state.currentChallenge.answer;
        break;
      case 'scriptorium':
        correctAnswer = state.currentChallenge.book;
        break;
      case 'echo':
        correctAnswer = state.currentChallenge.answer;
        break;
      case 'gallery':
        correctAnswer = state.currentChallenge.character;
        break;
      case 'treasury':
        correctAnswer = state.currentChallenge.item;
        break;
      case 'voices':
        correctAnswer = state.currentChallenge.speaker;
        break;
      case 'spiral':
        // For spiral, answer should be comma-separated order
        correctAnswer = state.currentChallenge.correctOrder.join(',');
        break;
    }

    // Check if this is a fuzzy question (AI check) - all halls except spiral
    const isFuzzy = state.currentChallenge.hallType !== 'spiral' &&
                    'type' in state.currentChallenge && 
                    state.currentChallenge.type === 'fuzzy';

    if (isFuzzy) {
      // AI check for fuzzy questions
      try {
        const acceptableKeywords = 'acceptableKeywords' in state.currentChallenge 
          ? state.currentChallenge.acceptableKeywords 
          : [];
        
        const result = await checkAnswerWithAI({
          question: 'question' in state.currentChallenge ? state.currentChallenge.question : '',
          correctAnswer: correctAnswer,
          userAnswer: answer,
          acceptableKeywords: acceptableKeywords || []
        });
        isCorrect = result.isCorrect;
        feedback = result.feedback || '';
      } catch (error) {
        console.error('AI check failed, using exact match:', error);
        // Fallback to exact match
        isCorrect = answer.toLowerCase().trim() === correctAnswer.toLowerCase().trim();
      }
    } else {
      // Simple comparison (case-insensitive, trimmed)
      isCorrect = answer.toLowerCase().trim() === correctAnswer.toLowerCase().trim();
    }
    
    // Выбираем сообщение
    let message = '';
    if (isCorrect) {
      const correctMessages = keeperDialogues.correct;
      message = correctMessages[Math.floor(Math.random() * correctMessages.length)];
    } else {
      const incorrectMessages = [
        'Ошибка. Это очко записано на мой счёт.',
        'Неверно. Хранитель ведёт счёт.',
        'Тени сгущаются... Ещё одно очко мне.',
        'Увы, знания ускользают от вас. Моя победа.'
      ];
      message = incorrectMessages[Math.floor(Math.random() * incorrectMessages.length)];
      
      // Если зал закрывается (не Зал Теней и не Скрипторий)
      if (!hallStaysOpen) {
        message += ' Этот зал закрывается.';
      }
    }
    
    const feedbackText = feedback ? `\n\n💡 ${feedback}` : '';

    // Calculate bonus points (memory keys) for echo room
    let bonusPoints = isCorrect ? 1 : 0;
    if (isCorrect && state.currentChallenge.hallType === 'echo') {
      const echoChallenge = state.currentChallenge;
      bonusPoints = Math.max(1, echoChallenge.maxPoints - state.usedHints);
    }

    setState(prev => ({
      ...prev,
      phase: 'result',
      isCorrect,
      seekerScore: isCorrect ? prev.seekerScore + 1 : prev.seekerScore,
      keeperScore: isCorrect ? prev.keeperScore : prev.keeperScore + 1,
      memoryKeys: prev.memoryKeys + bonusPoints, // Бонусные ключи
      keeperMood: isCorrect ? 'approving' : 'warning',
      keeperMessage: message + feedbackText,
      isTimerRunning: false,
      isCheckingAnswer: false,
      hallClosed: !isCorrect && !hallStaysOpen // Закрываем зал если неправильно и не особый зал
    }));
  }, [state.currentChallenge, state.usedHints, state.hallOrder, state.currentHallIndex]);

  const useHint = useCallback(() => {
    setState(prev => ({ ...prev, usedHints: prev.usedHints + 1 }));
  }, []);

  const proceedToNextHall = useCallback(() => {
    setState(prev => {
      const nextHallIndex = prev.currentHallIndex + 1;
      
      // Check if all halls completed
      if (nextHallIndex >= prev.hallOrder.length) {
        // Game finished - determine victory or defeat based on scores
        const isVictory = prev.seekerScore > prev.keeperScore;
        const isTie = prev.seekerScore === prev.keeperScore;
        
        let finalMessage = '';
        if (isVictory) {
          const diff = prev.seekerScore - prev.keeperScore;
          if (diff >= 10) {
            finalMessage = `Невероятно! Вы превзошли меня на ${diff} очков. Такого не было веками. Вы — истинные Хранители Знаний!`;
          } else if (diff >= 5) {
            finalMessage = `Впечатляюще. Разница в ${diff} очков в вашу пользу. Библиотека в надёжных руках.`;
          } else {
            finalMessage = `Вы победили с минимальным перевесом в ${diff} очка. Но победа есть победа. До новой встречи.`;
          }
        } else if (isTie) {
          finalMessage = 'Ничья. Редкий исход. Мы оба заслуживаем уважения. Возвращайтесь, чтобы решить судьбу.';
        } else {
          const diff = prev.keeperScore - prev.seekerScore;
          finalMessage = `Хранитель побеждает. Мой счёт выше на ${diff}. Знания требуют большего усердия. Возвращайтесь.`;
        }
        
        return {
          ...prev,
          phase: isVictory ? 'victory' : (isTie ? 'defeat' : 'defeat'),
          keeperMood: isVictory ? 'approving' : 'thoughtful',
          keeperMessage: finalMessage
        };
      }

      const nextHallType = prev.hallOrder[nextHallIndex];
      const nextHallChallenges = sampleChallenges.filter(c => c.hallType === nextHallType);
      const nextHall = halls.find(h => h.type === nextHallType);

      return {
        ...prev,
        currentHallIndex: nextHallIndex,
        phase: 'hall-intro',
        challengeIndex: 0,
        totalChallengesInHall: nextHallChallenges.length,
        keeperMood: 'neutral',
        keeperMessage: nextHall?.keeperIntro || keeperDialogues.hallComplete[Math.floor(Math.random() * keeperDialogues.hallComplete.length)],
        hallClosed: false
      };
    });
  }, []);

  const proceedFromResult = useCallback(() => {
    setState(prev => {
      // Если зал закрыт (неправильный ответ не в Зале Теней) — переход к следующему залу
      if (prev.hallClosed) {
        return {
          ...prev,
          phase: 'hall-complete',
          keeperMood: 'warning',
          keeperMessage: 'Зал закрыт. Двигаемся дальше.'
        };
      }
      
      const nextChallengeIndex = prev.challengeIndex + 1;
      const hallType = prev.hallOrder[prev.currentHallIndex];
      const hallChallenges = sampleChallenges.filter(c => c.hallType === hallType);
      
      // Check if current hall is complete (all questions answered)
      if (nextChallengeIndex >= hallChallenges.length) {
        return {
          ...prev,
          phase: 'hall-complete',
          keeperMood: 'approving',
          keeperMessage: keeperDialogues.hallComplete[Math.floor(Math.random() * keeperDialogues.hallComplete.length)]
        };
      }

      // Load next challenge directly
      const nextChallenge = hallChallenges[nextChallengeIndex];

      // Start next challenge in same hall
      return {
        ...prev,
        challengeIndex: nextChallengeIndex,
        phase: 'challenge',
        currentChallenge: nextChallenge,
        isCorrect: null,
        timer: TIME_PER_CHALLENGE,
        isTimerRunning: true,
        usedHints: 0
      };
    });
  }, []);

  const resetGame = useCallback(() => {
    setState({
      phase: 'team-setup',
      teamName: '',
      memoryKeys: 0,
      seekerScore: 0,
      keeperScore: 0,
      currentHallIndex: 0,
      hallOrder: DEFAULT_HALLS_ORDER,
      currentChallenge: null,
      challengeIndex: 0,
      totalChallengesInHall: 0,
      keeperMood: 'neutral',
      keeperMessage: '',
      isCorrect: null,
      usedHints: 0,
      timer: TIME_PER_CHALLENGE,
      isTimerRunning: false,
      isCheckingAnswer: false,
      hallClosed: false
    });
  }, []);

  const goToSetup = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    resetGame();
  }, [resetGame]);

  return {
    state,
    getCurrentHall,
    getChallengesForHall,
    setTeamName,
    startGame,
    startFromHall,
    startHall,
    startChallenge,
    submitAnswer,
    useHint,
    proceedFromResult,
    proceedToNextHall,
    resetGame,
    goToSetup,
    getTotalQuestionsCount
  };
}
