import bibleMasterImg from "@/assets/bible-master-thumbnail.jpg";
import scrollKeeperImg from "@/assets/scroll-keeper-thumbnail.jpg";

export interface Game {
  id: string;
  title: string;
  titleEn: string;
  description: string;
  descriptionEn: string;
  thumbnail: string;
  playerCount: string;
  playerCountEn: string;
  duration: string;
}

export const games: Game[] = [
  {
    id: "bible-master",
    title: "Мастер Библии",
    titleEn: "Bible Master",
    description: "Командная викторина по знанию Библии. Отвечайте на вопросы, зарабатывайте очки и станьте мастером!",
    descriptionEn: "Team quiz about Bible knowledge. Answer questions, earn points and become a master!",
    thumbnail: bibleMasterImg,
    playerCount: "2 команды",
    playerCountEn: "2 teams",
    duration: "15-30"
  },
  {
    id: "scroll-keeper",
    title: "Хранитель Свитков",
    titleEn: "Scroll Keeper",
    description: "Библейский квест в Библиотеке Вечности. Пройдите испытания Хранителя, соберите Ключи Памяти и восстановите Кодекс Живой Памяти!",
    descriptionEn: "Biblical quest in the Library of Eternity. Complete the Keeper's trials, collect Memory Keys and restore the Codex of Living Memory!",
    thumbnail: scrollKeeperImg,
    playerCount: "1-6 игроков",
    playerCountEn: "1-6 players",
    duration: "30-60"
  }
];
