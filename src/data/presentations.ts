import peterImg from "@/assets/peter.jpg";

export interface Presentation {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  slideCount: number;
  duration: string;
}

export const presentations: Presentation[] = [
  {
    id: "12-disciples",
    title: "12 Учеников Христа",
    description: "Погрузитесь в увлекательные истории людей, изменивших ход человеческой истории",
    thumbnail: peterImg,
    slideCount: 12,
    duration: "15-20 минут"
  }
];
