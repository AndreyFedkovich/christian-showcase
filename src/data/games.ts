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
    thumbnail: "", // Will be generated
    playerCount: "2 команды",
    duration: "15-30 минут"
  }
];
