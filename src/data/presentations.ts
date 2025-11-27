import peterImg from "@/assets/peter.jpg";
import josephImg from "@/assets/joseph-thumbnail.png";
import { josephStory } from '@/data/joseph-story';
import { disciples } from '@/data/disciples';

export interface Presentation {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  slideCount: number;
  duration: string;
  type: 'disciples' | 'seminar';
}

export const presentations: Presentation[] = [
  {
    id: "12-disciples",
    title: "12 Учеников Христа",
    description: "Погрузитесь в увлекательные истории людей, изменивших ход человеческой истории",
    thumbnail: peterImg,
    slideCount: disciples.length,
    duration: "15-20 минут",
    type: 'disciples'
  },
  {
    id: "joseph-story",
    title: "Бог превращает зло в добро",
    description: "Божий план спасения никогда не может быть сорван",
    thumbnail: josephImg,
    slideCount: josephStory.length,
    duration: "20-25 минут",
    type: 'seminar'
  }
];
