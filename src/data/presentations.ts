// Last updated: 2025-12-27
import peterImg from "@/assets/peter.jpg";
import josephImg from "@/assets/joseph-thumbnail.png";
import knowDoImg from "@/assets/know-do.png";
import salvationImg from "@/assets/salvation-thumbnail.png";
import godExistsImg from "@/assets/god-exists-thumbnail.png";
import eternalCosmosImg from "@/assets/eternal-cosmos.png";
import homeChurchImg from "@/assets/home-church-thumbnail.png";
import kingsProphetsImg from "@/assets/kings-prophets-thumbnail.png";
import { seminar } from '@/data/seminar';
import { disciples } from '@/data/disciples';
import { epistlesStructure } from '@/data/epistles-structure';
import { redemptionDrama } from '@/data/redemption-drama';
import { godExists } from '@/data/god-exists';
import { eternalTemporal } from '@/data/eternal-temporal';
import { homeChurch } from '@/data/home-church';
import { kingsProphets } from '@/data/kings-prophets';

export interface Presentation {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  slideCount: number;
  duration: string;
  type: 'disciples' | 'seminar' | 'hermeneutics' | 'god-exists' | 'drama' | 'eternal-temporal' | 'home-church' | 'kings-prophets';
  isHero?: boolean;
  createdAt: string;
}

export const presentations: Presentation[] = [
  {
    id: "kings-prophets",
    title: "Цари и пророки",
    description: "Хронология царей Израиля и Иуды с пророками (1010–586 до н.э.)",
    thumbnail: kingsProphetsImg,
    slideCount: kingsProphets.length,
    duration: "40-50 минут",
    type: 'kings-prophets',
    createdAt: "28.12.2025"
  },
  {
    id: "home-church",
    title: "Домашняя церковь",
    description: "Церковь как тело Христа — тайна, открытая в Новом Завете",
    thumbnail: homeChurchImg,
    slideCount: homeChurch.length,
    duration: "30-35 минут",
    type: 'home-church',
    createdAt: "27.12.2025"
  },
  {
    id: "salvation",
    title: "Драма Искупления",
    description: "Как развивается конфликт Греха и Спасения в евангельском повествовании",
    thumbnail: salvationImg,
    slideCount: redemptionDrama.length,
    duration: "35-40 минут",
    type: 'drama',
    isHero: true,
    createdAt: "18.12.2025"
  },
  {
    id: "god-exists",
    title: "Существует ли Бог?",
    description: "Философский диалог с искусственным интеллектом о логичности существования Творца",
    thumbnail: godExistsImg,
    slideCount: godExists.length,
    duration: "25-30 минут",
    type: 'god-exists',
    createdAt: "16.12.2025"
  },
  {
    id: "eternal-temporal",
    title: "Вечное и временное",
    description: "Как правильно жить в свете вечности — размышление над Псалмом 89",
    thumbnail: eternalCosmosImg,
    slideCount: eternalTemporal.length,
    duration: "25-30 минут",
    type: 'eternal-temporal',
    createdAt: "14.12.2025"
  },
  {
    id: "seminar",
    title: "Бог превращает зло в добро",
    description: "Божий план спасения никогда не может быть сорван",
    thumbnail: josephImg,
    slideCount: seminar.length,
    duration: "25-30 минут",
    type: 'seminar',
    createdAt: "07.12.2025"
  },
  {
    id: "epistles-structure",
    title: "Знать и Делать",
    description: "Структура посланий Нового Завета: доктрина и практическое применение",
    thumbnail: knowDoImg,
    slideCount: epistlesStructure.length,
    duration: "30-35 минут",
    type: 'hermeneutics',
    createdAt: "01.12.2025"
  },
  {
    id: "disciples",
    title: "12 Учеников Христа",
    description: "Погрузитесь в увлекательные истории людей, изменивших ход человеческой истории",
    thumbnail: peterImg,
    slideCount: disciples.length,
    duration: "15-20 минут",
    type: 'disciples',
    createdAt: "15.11.2025"
  }
];
