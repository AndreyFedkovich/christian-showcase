import { supabase } from '@/integrations/supabase/client';
import { BibleQuestion, QuestionCategory, Difficulty } from '@/data/bible-questions';

interface CheckAnswerParams {
  question: string;
  correctAnswer: string;
  userAnswer: string;
  acceptableKeywords?: string[];
}

interface CheckAnswerResult {
  isCorrect: boolean;
  feedback: string;
}

interface GenerateQuestionsParams {
  category: QuestionCategory;
  difficulty: Difficulty;
  count?: number;
}

export const checkAnswerWithAI = async (params: CheckAnswerParams): Promise<CheckAnswerResult> => {
  const { data, error } = await supabase.functions.invoke('check-answer', { 
    body: params 
  });
  
  if (error) {
    console.error('AI check-answer error:', error);
    throw error;
  }
  
  return data as CheckAnswerResult;
};

export const generateQuestionsWithAI = async (params: GenerateQuestionsParams): Promise<BibleQuestion[]> => {
  const { data, error } = await supabase.functions.invoke('generate-questions', { 
    body: params 
  });
  
  if (error) {
    console.error('AI generate-questions error:', error);
    throw error;
  }
  
  return data.questions as BibleQuestion[];
};
