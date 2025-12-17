export interface Game {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  playerCount: string;
  duration: string;
}

export const games: Game[] = [
  {
    id: "bible-master",
    title: "Мастер Библии",
    description: "Командная викторина по знанию Библии. Отвечайте на вопросы, зарабатывайте очки и станьте мастером!",
    thumbnail: "",
    playerCount: "2 команды",
    duration: "15-30 минут"
  },
  {
    id: "scroll-keeper",
    title: "Хранитель Свитков",
    description: "Библейский квест в Библиотеке Вечности. Пройдите испытания Хранителя, соберите Ключи Памяти и восстановите Кодекс Живой Памяти!",
    thumbnail: "",
    playerCount: "1-6 игроков",
    duration: "30-60 минут"
  }
];
