import { useState, useCallback, useEffect } from 'react';
import { BibleQuestion, bibleQuestions, QuestionCategory, Difficulty } from '@/data/bible-questions';

const STORAGE_KEY = 'bible-questions-custom';

export const useQuestions = () => {
  const [customQuestions, setCustomQuestions] = useState<BibleQuestion[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Persist to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(customQuestions));
  }, [customQuestions]);

  // All questions: base + custom
  const allQuestions = [...bibleQuestions, ...customQuestions];

  const addQuestion = useCallback((question: BibleQuestion) => {
    setCustomQuestions(prev => [...prev, question]);
  }, []);

  const addQuestions = useCallback((questions: BibleQuestion[]) => {
    setCustomQuestions(prev => [...prev, ...questions]);
  }, []);

  const updateQuestion = useCallback((index: number, question: BibleQuestion) => {
    setCustomQuestions(prev => {
      const updated = [...prev];
      updated[index] = question;
      return updated;
    });
  }, []);

  const deleteQuestion = useCallback((index: number) => {
    setCustomQuestions(prev => prev.filter((_, i) => i !== index));
  }, []);

  const clearCustomQuestions = useCallback(() => {
    setCustomQuestions([]);
  }, []);

  const exportQuestions = useCallback(() => {
    const data = JSON.stringify(customQuestions, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'bible-questions-export.json';
    a.click();
    URL.revokeObjectURL(url);
  }, [customQuestions]);

  const importQuestions = useCallback((file: File): Promise<number> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const questions = JSON.parse(e.target?.result as string);
          if (Array.isArray(questions)) {
            setCustomQuestions(prev => [...prev, ...questions]);
            resolve(questions.length);
          } else {
            reject(new Error('Invalid format'));
          }
        } catch (err) {
          reject(err);
        }
      };
      reader.readAsText(file);
    });
  }, []);

  const getFilteredQuestions = useCallback((
    difficulty?: Difficulty,
    category?: QuestionCategory,
    source?: 'all' | 'base' | 'custom'
  ) => {
    let questions = allQuestions;
    
    if (source === 'base') {
      questions = bibleQuestions;
    } else if (source === 'custom') {
      questions = customQuestions;
    }
    
    return questions.filter(q => {
      if (difficulty && q.difficulty !== difficulty) return false;
      if (category && q.category !== category) return false;
      return true;
    });
  }, [allQuestions, customQuestions]);

  return {
    allQuestions,
    baseQuestions: bibleQuestions,
    customQuestions,
    addQuestion,
    addQuestions,
    updateQuestion,
    deleteQuestion,
    clearCustomQuestions,
    exportQuestions,
    importQuestions,
    getFilteredQuestions
  };
};
