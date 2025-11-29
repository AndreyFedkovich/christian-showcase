import peterImg from "@/assets/peter.jpg";
import josephImg from "@/assets/joseph-thumbnail.png";
import knowDoImg from "@/assets/know-do-thumbnail.jpeg";
import { josephStory } from '@/data/joseph-story';
import { disciples } from '@/data/disciples';
import { epistlesStructure } from '@/data/epistles-structure';

export interface Presentation {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  slideCount: number;
  duration: string;
  type: 'disciples' | 'seminar' | 'hermeneutics';
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
  },
  {
    id: "epistles-structure",
    title: "Знать и Делать",
    description: "Структура посланий Нового Завета: доктрина и практическое применение",
    thumbnail: knowDoImg,
    slideCount: epistlesStructure.length - 1,
    duration: "30-35 минут",
    type: 'hermeneutics'
  }
];
