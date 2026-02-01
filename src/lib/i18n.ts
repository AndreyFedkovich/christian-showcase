export type Language = 'ru' | 'en';

export const translations = {
  ru: {
    // Navigation
    siteName: "Интерактивная Библия",
    
    // Categories
    seminars: "Семинары",
    bibleStudy: "Изучение Библии",
    games: "Игры",
    
    // Actions
    openPresentation: "Открыть презентацию",
    startGame: "Начать игру",
    searchPlaceholder: "Поиск...",
    
    // Stats
    slides: "слайдов",
    teams: "команды",
    players: "игроков",
    minutes: "минут",
    
    // Empty state
    nothingFound: "Ничего не найдено",
    tryDifferentSearch: "Попробуйте изменить поисковый запрос",
    
    // Footer
    footer: "Интерактивная Библия • 2025",
    
    // User menu
    guest: "Гость",
    logout: "Выйти",
    
    // Presentation details
    backToList: "К списку",
    startPresentation: "Начать просмотр",
    sections: "разделов",
  },
  en: {
    // Navigation
    siteName: "Interactive Bible",
    
    // Categories
    seminars: "Seminars",
    bibleStudy: "Bible Study",
    games: "Games",
    
    // Actions
    openPresentation: "Open Presentation",
    startGame: "Start Game",
    searchPlaceholder: "Search...",
    
    // Stats
    slides: "slides",
    teams: "teams",
    players: "players",
    minutes: "minutes",
    
    // Empty state
    nothingFound: "Nothing found",
    tryDifferentSearch: "Try a different search query",
    
    // Footer
    footer: "Interactive Bible • 2025",
    
    // User menu
    guest: "Guest",
    logout: "Logout",
    
    // Presentation details
    backToList: "Back to list",
    startPresentation: "Start watching",
    sections: "sections",
  }
} as const;

export type TranslationKey = keyof typeof translations.ru;
