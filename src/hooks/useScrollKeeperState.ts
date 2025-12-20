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
  memoryKeys: number;
  maxMemoryKeys: number;
  currentHallIndex: number;
  hallOrder: HallType[];
  currentChallenge: Challenge | null;
  challengeIndex: number;
  challengesPerHall: number;
  keeperMood: KeeperMood;
  keeperMessage: string;
  isCorrect: boolean | null;
  usedHints: number;
  timer: number;
  isTimerRunning: boolean;
  isCheckingAnswer: boolean;
}

const DEFAULT_HALLS_ORDER: HallType[] = ['shadows', 'scriptorium', 'echo', 'gallery', 'treasury', 'voices', 'spiral'];
const CHALLENGES_PER_HALL = 2;
const KEYS_TO_WIN = 10;
const TIME_PER_CHALLENGE = 60;

export function useScrollKeeperState() {
  const [state, setState] = useState<ScrollKeeperState>({
    phase: 'team-setup',
    teamName: '',
    memoryKeys: 0,
    maxMemoryKeys: KEYS_TO_WIN,
    currentHallIndex: 0,
    hallOrder: DEFAULT_HALLS_ORDER,
    currentChallenge: null,
    challengeIndex: 0,
    challengesPerHall: CHALLENGES_PER_HALL,
    keeperMood: 'neutral',
    keeperMessage: '',
    isCorrect: null,
    usedHints: 0,
    timer: TIME_PER_CHALLENGE,
    isTimerRunning: false,
    isCheckingAnswer: false
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
    const incorrectMessages = keeperDialogues.incorrect;
    const randomMessage = incorrectMessages[Math.floor(Math.random() * incorrectMessages.length)];
    
    setState(prev => ({
      ...prev,
      phase: 'result',
      isCorrect: false,
      keeperMood: 'warning',
      keeperMessage: 'Время истекло. ' + randomMessage,
      isTimerRunning: false
    }));
  }, []);

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
    
    setState(prev => ({
      ...prev,
      phase: 'hall-intro',
      currentHallIndex: targetHallIndex,
      challengeIndex: 0,
      keeperMood: 'neutral',
      keeperMessage: targetHall?.keeperIntro || '',
      usedHints: 0
    }));
  }, []);

  const startHall = useCallback(() => {
    const currentHall = getCurrentHall();
    if (!currentHall) return;

    setState(prev => ({
      ...prev,
      phase: 'hall-intro',
      keeperMood: 'neutral',
      keeperMessage: currentHall.keeperIntro,
      challengeIndex: 0,
      usedHints: 0
    }));
  }, [getCurrentHall]);

  const startChallenge = useCallback(() => {
    const hallType = state.hallOrder[state.currentHallIndex];
    const hallChallenges = getChallengesForHall(hallType);
    
    if (hallChallenges.length === 0) {
      // No challenges for this hall, move to next
      proceedToNextHall();
      return;
    }

    const challengeIdx = state.challengeIndex % hallChallenges.length;
    const challenge = hallChallenges[challengeIdx];

    setState(prev => ({
      ...prev,
      phase: 'challenge',
      currentChallenge: challenge,
      isCorrect: null,
      timer: TIME_PER_CHALLENGE,
      isTimerRunning: true,
      usedHints: 0
    }));
  }, [state.hallOrder, state.currentHallIndex, state.challengeIndex, getChallengesForHall]);

  const submitAnswer = useCallback(async (answer: string) => {
    if (!state.currentChallenge) return;

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

    // Check if this is a fuzzy question (AI check)
    const isFuzzy = 'type' in state.currentChallenge && 
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
    
    const messages = isCorrect ? keeperDialogues.correct : keeperDialogues.incorrect;
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    const feedbackText = feedback ? `\n\n💡 ${feedback}` : '';

    // Calculate points based on hints used (for echo room)
    let pointsEarned = isCorrect ? 1 : 0;
    if (isCorrect && state.currentChallenge.hallType === 'echo') {
      const echoChallenge = state.currentChallenge;
      pointsEarned = Math.max(1, echoChallenge.maxPoints - state.usedHints);
    }

    setState(prev => ({
      ...prev,
      phase: 'result',
      isCorrect,
      memoryKeys: prev.memoryKeys + pointsEarned,
      keeperMood: isCorrect ? 'approving' : 'warning',
      keeperMessage: randomMessage + feedbackText,
      isTimerRunning: false,
      isCheckingAnswer: false
    }));
  }, [state.currentChallenge, state.usedHints]);

  const useHint = useCallback(() => {
    setState(prev => ({ ...prev, usedHints: prev.usedHints + 1 }));
  }, []);

  const proceedToNextHall = useCallback(() => {
    setState(prev => {
      const nextHallIndex = prev.currentHallIndex + 1;
      
      // Check if all halls completed
      if (nextHallIndex >= prev.hallOrder.length) {
        // Game finished - determine victory or defeat
        const isVictory = prev.memoryKeys >= prev.maxMemoryKeys / 2;
        return {
          ...prev,
          phase: isVictory ? 'victory' : 'defeat',
          keeperMood: isVictory ? 'approving' : 'thoughtful',
          keeperMessage: isVictory ? keeperDialogues.victory : keeperDialogues.defeat
        };
      }

      return {
        ...prev,
        currentHallIndex: nextHallIndex,
        phase: 'hall-intro',
        challengeIndex: 0,
        keeperMood: 'neutral',
        keeperMessage: keeperDialogues.hallComplete[Math.floor(Math.random() * keeperDialogues.hallComplete.length)]
      };
    });
  }, []);

  const proceedFromResult = useCallback(() => {
    setState(prev => {
      const nextChallengeIndex = prev.challengeIndex + 1;
      
      // Check if current hall is complete
      if (nextChallengeIndex >= prev.challengesPerHall) {
        return {
          ...prev,
          phase: 'hall-complete',
          keeperMood: 'approving',
          keeperMessage: keeperDialogues.hallComplete[Math.floor(Math.random() * keeperDialogues.hallComplete.length)]
        };
      }

      // Load next challenge directly
      const hallType = prev.hallOrder[prev.currentHallIndex];
      const hallChallenges = sampleChallenges.filter(c => c.hallType === hallType);
      const challengeIdx = nextChallengeIndex % hallChallenges.length;
      const nextChallenge = hallChallenges[challengeIdx];

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
      maxMemoryKeys: KEYS_TO_WIN,
      currentHallIndex: 0,
      hallOrder: DEFAULT_HALLS_ORDER,
      currentChallenge: null,
      challengeIndex: 0,
      challengesPerHall: CHALLENGES_PER_HALL,
      keeperMood: 'neutral',
      keeperMessage: '',
      isCorrect: null,
      usedHints: 0,
      timer: TIME_PER_CHALLENGE,
      isTimerRunning: false,
      isCheckingAnswer: false
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
    goToSetup
  };
}
