// Last updated: 2025-12-19
import peterImg from "@/assets/peter.jpg";
import josephImg from "@/assets/joseph-thumbnail.png";
import knowDoImg from "@/assets/know-do.png";
import salvationImg from "@/assets/salvation-thumbnail.png";
import godExistsImg from "@/assets/god-exists-thumbnail.png";
import { seminar } from '@/data/seminar';
import { disciples } from '@/data/disciples';
import { epistlesStructure } from '@/data/epistles-structure';
import { redemptionDrama } from '@/data/redemption-drama';
import { godExists } from '@/data/god-exists';

export interface Presentation {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  slideCount: number;
  duration: string;
  type: 'disciples' | 'seminar' | 'hermeneutics' | 'god-exists' | 'drama';
  isHero?: boolean;
}

export const presentations: Presentation[] = [
  {
    id: "god-exists",
    title: "Существует ли Бог?",
    description: "Философский диалог с искусственным интеллектом о логичности существования Творца",
    thumbnail: godExistsImg,
    slideCount: godExists.length,
    duration: "25-30 минут",
    type: 'god-exists'
  },
  {
    id: "seminar",
    title: "Бог превращает зло в добро",
    description: "Божий план спасения никогда не может быть сорван",
    thumbnail: josephImg,
    slideCount: seminar.length,
    duration: "25-30 минут",
    type: 'seminar'
  },
  {
    id: "salvation",
    title: "Драма Искупления",
    description: "Как развивается конфликт Греха и Спасения в евангельском повествовании",
    thumbnail: salvationImg,
    slideCount: redemptionDrama.length,
    duration: "35-40 минут",
    type: 'drama',
    isHero: true
  },
  {
    id: "epistles-structure",
    title: "Знать и Делать",
    description: "Структура посланий Нового Завета: доктрина и практическое применение",
    thumbnail: knowDoImg,
    slideCount: epistlesStructure.length,
    duration: "30-35 минут",
    type: 'hermeneutics'
  },
  {
    id: "disciples",
    title: "12 Учеников Христа",
    description: "Погрузитесь в увлекательные истории людей, изменивших ход человеческой истории",
    thumbnail: peterImg,
    slideCount: disciples.length,
    duration: "15-20 минут",
    type: 'disciples'
  }
];
