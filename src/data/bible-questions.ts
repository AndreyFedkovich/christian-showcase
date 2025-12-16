export type QuestionCategory = 
  | 'old-testament' 
  | 'new-testament' 
  | 'parables' 
  | 'miracles' 
  | 'prophets' 
  | 'epistles';

export type QuestionType = 'exact' | 'fuzzy';
export type Difficulty = 1 | 2 | 3;

export interface BibleQuestion {
  question: string;
  type: QuestionType;
  difficulty: Difficulty;
  category: QuestionCategory;
  correctAnswer: string;
  acceptableKeywords?: string[];
  reference?: string;
}

export const categoryLabels: Record<QuestionCategory, string> = {
  'old-testament': 'Ветхий Завет',
  'new-testament': 'Новый Завет',
  'parables': 'Притчи Иисуса',
  'miracles': 'Чудеса',
  'prophets': 'Пророки',
  'epistles': 'Послания'
};

export const categoryIcons: Record<QuestionCategory, string> = {
  'old-testament': '📜',
  'new-testament': '✝️',
  'parables': '🌾',
  'miracles': '✨',
  'prophets': '🔥',
  'epistles': '✉️'
};

export const difficultyLabels: Record<Difficulty, string> = {
  1: 'Легкий',
  2: 'Средний',
  3: 'Сложный'
};

export const difficultyConfig: Record<Difficulty, { questions: number; time: number; stars: number }> = {
  1: { questions: 3, time: 15, stars: 1 },
  2: { questions: 2, time: 25, stars: 2 },
  3: { questions: 1, time: 40, stars: 3 }
};

export const bibleQuestions: BibleQuestion[] = [
  // Легкие вопросы (difficulty: 1)
  {
    question: "Сколько учеников было у Иисуса Христа?",
    type: "exact",
    difficulty: 1,
    category: "new-testament",
    correctAnswer: "12",
    reference: "Матфея 10:1-4"
  },
  {
    question: "Кто построил ковчег по повелению Бога?",
    type: "exact",
    difficulty: 1,
    category: "old-testament",
    correctAnswer: "Ной",
    reference: "Бытие 6:13-22"
  },
  {
    question: "В каком городе родился Иисус Христос?",
    type: "exact",
    difficulty: 1,
    category: "new-testament",
    correctAnswer: "Вифлеем",
    reference: "Матфея 2:1"
  },
  {
    question: "Кто был первым человеком, созданным Богом?",
    type: "exact",
    difficulty: 1,
    category: "old-testament",
    correctAnswer: "Адам",
    reference: "Бытие 2:7"
  },
  {
    question: "Сколько дней Бог создавал мир?",
    type: "exact",
    difficulty: 1,
    category: "old-testament",
    correctAnswer: "6",
    reference: "Бытие 1"
  },
  {
    question: "Кто крестил Иисуса в реке Иордан?",
    type: "exact",
    difficulty: 1,
    category: "new-testament",
    correctAnswer: "Иоанн Креститель",
    reference: "Матфея 3:13-17"
  },
  {
    question: "Какой плод съели Адам и Ева в саду Эдемском?",
    type: "fuzzy",
    difficulty: 1,
    category: "old-testament",
    correctAnswer: "Запретный плод",
    acceptableKeywords: ["плод", "познания", "добра и злп", "запретный"],
    reference: "Бытие 3:6"
  },
  {
    question: "Кто предал Иисуса за 30 серебренников?",
    type: "exact",
    difficulty: 1,
    category: "new-testament",
    correctAnswer: "Иуда",
    acceptableKeywords: ["иуда", "искариот"],
    reference: "Матфея 26:14-16"
  },
  {
    question: "Какое животное говорило в истории Валаама?",
    type: "exact",
    difficulty: 1,
    category: "old-testament",
    correctAnswer: "Ослица",
    reference: "Числа 22:28"
  },
  {
    question: "Кто был известен своей необычайной силой?",
    type: "exact",
    difficulty: 1,
    category: "old-testament",
    correctAnswer: "Самсон",
    reference: "Судей 14-16"
  },
  // Средние вопросы (difficulty: 2)
  {
    question: "Какая книга идёт сразу после Бытия в Библии?",
    type: "exact",
    difficulty: 2,
    category: "old-testament",
    correctAnswer: "Исход",
    reference: "Исход 1:1"
  },
  {
    question: "Кто был брошен в львиный ров?",
    type: "exact",
    difficulty: 2,
    category: "prophets",
    correctAnswer: "Даниил",
    reference: "Даниил 6"
  },
  {
    question: "Назовите одну из притч Иисуса о чем-то потерянном",
    type: "fuzzy",
    difficulty: 2,
    category: "parables",
    correctAnswer: "Притча о блудном сыне",
    acceptableKeywords: ["блудный сын", "потерянная овца", "потерянная драхма", "монета"],
    reference: "Луки 15"
  },
  {
    question: "Кто написал большинство посланий в Новом Завете?",
    type: "exact",
    difficulty: 2,
    category: "epistles",
    correctAnswer: "Апостол Павел",
    acceptableKeywords: ["Павел"],
    reference: "Послания"
  },
  {
    question: "Сколько книг в Новом Завете?",
    type: "exact",
    difficulty: 2,
    category: "new-testament",
    correctAnswer: "27",
    reference: "Новый Завет"
  },
  {
    question: "Какое чудо Иисус совершил первым?",
    type: "exact",
    difficulty: 2,
    category: "miracles",
    correctAnswer: "Превращение воды в вино",
    acceptableKeywords: ["вода", "вино", "Кана"],
    reference: "Иоанна 2:1-11"
  },
  {
    question: "Кто из пророков был вознесён на небо живым на огненной колеснице?",
    type: "exact",
    difficulty: 2,
    category: "prophets",
    correctAnswer: "Илия",
    acceptableKeywords: ["илия", "илья"],
    reference: "4 Царств 2:11"
  },
  {
    question: "Какой царь известен своей мудростью?",
    type: "exact",
    difficulty: 2,
    category: "old-testament",
    correctAnswer: "Соломон",
    reference: "3 Царств 3:12"
  },
  {
    question: "Сколько хлебов умножил Иисус, чтобы накормить 5000 человек?",
    type: "exact",
    difficulty: 2,
    category: "miracles",
    correctAnswer: "5",
    reference: "Матфея 14:17-21"
  },
  {
    question: "Кому Иисус сказал: «Отныне будешь ловить человеков»?",
    type: "exact",
    difficulty: 2,
    category: "new-testament",
    correctAnswer: "Петр",
    acceptableKeywords: ["Симон", "Пётр"],
    reference: "Луки 5:10"
  },
  // Сложные вопросы (difficulty: 3)
  {
    question: "Объясните смысл притчи о блудном сыне своими словами",
    type: "fuzzy",
    difficulty: 3,
    category: "parables",
    correctAnswer: "Притча о безусловной любви Отца и покаянии грешника",
    acceptableKeywords: ["покаяние", "прощение", "любовь отца", "возвращение", "милость"],
    reference: "Луки 15:11-32"
  },
  {
    question: "Кто был отцом Мелхиседека согласно Библии?",
    type: "fuzzy",
    difficulty: 3,
    category: "old-testament",
    correctAnswer: "Не указано",
    acceptableKeywords: ["неизвестно", "не указан", "без родословия"],
    reference: "Евреям 7:3"
  },
  {
    question: "Назовите все плоды Духа из послания Галатам",
    type: "fuzzy",
    difficulty: 3,
    category: "epistles",
    correctAnswer: "Любовь, радость, мир, долготерпение, благость, милосердие, вера, кротость, воздержание",
    acceptableKeywords: ["любовь", "радость", "мир", "долготерпение", "благость", "милосердие", "вера", "кротость", "воздержание"],
    reference: "Галатам 5:22-23"
  },
  {
    question: "Что означает имя «Иммануил»?",
    type: "exact",
    difficulty: 3,
    category: "prophets",
    correctAnswer: "С нами Бог",
    acceptableKeywords: ["с нами бог", "бог с нами"],
    reference: "Исаия 7:14, Матфея 1:23"
  },
  {
    question: "Какой пророк был проглочен большой рыбой?",
    type: "exact",
    difficulty: 3,
    category: "prophets",
    correctAnswer: "Иона",
    reference: "Иона 1:17"
  },
  {
    question: "Сколько казней послал Бог на Египет?",
    type: "exact",
    difficulty: 3,
    category: "old-testament",
    correctAnswer: "10",
    reference: "Исход 7-12"
  },
  {
    question: "Кто из учеников Иисуса усомнился в Его воскресении и потребовал доказательств?",
    type: "exact",
    difficulty: 3,
    category: "new-testament",
    correctAnswer: "Фома",
    reference: "Иоанна 20:24-29"
  },
  {
    question: "Какой стих часто называют «Евангелием в миниатюре»?",
    type: "exact",
    difficulty: 3,
    category: "new-testament",
    correctAnswer: "Иоанна 3:16",
    acceptableKeywords: ["Ин 3:16", "Иоанн 3:16"],
    reference: "Иоанна 3:16"
  },
  {
    question: "Назовите три искушения, которым сатана подверг Иисуса в пустыне",
    type: "fuzzy",
    difficulty: 3,
    category: "new-testament",
    correctAnswer: "Превратить камни в хлеб, броситься с крыши храма, поклониться сатане за власть над миром",
    acceptableKeywords: ["хлеб", "камни", "храм", "поклониться", "царства мира", "власть"],
    reference: "Матфея 4:1-11"
  },
  {
    question: "Кто написал книгу Откровение?",
    type: "exact",
    difficulty: 3,
    category: "new-testament",
    correctAnswer: "Апостол Иоанн",
    acceptableKeywords: ["Иоанн"],
    reference: "Откровение 1:1"
  }
];

// Helper function to get questions by difficulty and category
export const getQuestionsByFilter = (
  difficulty?: Difficulty,
  category?: QuestionCategory
): BibleQuestion[] => {
  return bibleQuestions.filter(q => {
    if (difficulty && q.difficulty !== difficulty) return false;
    if (category && q.category !== category) return false;
    return true;
  });
};

// Get random question
export const getRandomQuestion = (
  difficulty: Difficulty,
  category: QuestionCategory,
  excludeQuestions: string[] = []
): BibleQuestion | null => {
  const filtered = bibleQuestions.filter(
    q => q.difficulty === difficulty && 
         q.category === category && 
         !excludeQuestions.includes(q.question)
  );
  if (filtered.length === 0) return null;
  return filtered[Math.floor(Math.random() * filtered.length)];
};

// Get all categories that have questions for a given difficulty
export const getCategoriesForDifficulty = (difficulty: Difficulty): QuestionCategory[] => {
  const categories = new Set<QuestionCategory>();
  bibleQuestions
    .filter(q => q.difficulty === difficulty)
    .forEach(q => categories.add(q.category));
  return Array.from(categories);
};
