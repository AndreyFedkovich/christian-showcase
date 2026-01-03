// Last updated: 2025-12-28
import peterImg from "@/assets/peter.jpg";
import josephImg from "@/assets/joseph-thumbnail.png";
import knowDoImg from "@/assets/know-do.png";
import salvationImg from "@/assets/salvation-thumbnail.png";
import godExistsImg from "@/assets/god-exists-thumbnail.png";
import eternalCosmosImg from "@/assets/eternal-cosmos.png";
import homeChurchImg from "@/assets/home-church-thumbnail.png";
import kingsProphetsImg from "@/assets/kings-prophets-thumbnail.png";
import { seminar, seminarSections } from '@/data/seminar';
import { disciples } from '@/data/disciples';
import { epistlesStructure } from '@/data/epistles-structure';
import { redemptionDrama, redemptionSections } from '@/data/redemption-drama';
import { godExists, godExistsSections } from '@/data/god-exists';
import { eternalTemporal, eternalTemporalSections } from '@/data/eternal-temporal';
import { homeChurch, homeChurchSections } from '@/data/home-church';
import { church, churchSections } from '@/data/church';
import { kingsProphets } from '@/data/kings-prophets';
import { UniversalSlide } from '@/types/slides';

// Section interface for tabbed presentations
export interface Section {
  id: string;
  name: string;
  slides: UniversalSlide[];
}

export interface Presentation {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  slideCount: number;
  duration: string;
  isHero?: boolean;
  createdAt: string;
  slides: UniversalSlide[];
  layout: 'grid' | 'tabs';
  sections?: Section[];
}

export const presentations: Presentation[] = [
  {
    id: "kings-prophets",
    title: "Цари и пророки",
    description: "Хронология царей Израиля и Иуды с пророками (1010–586 до н.э.)",
    thumbnail: kingsProphetsImg,
    slideCount: kingsProphets.length,
    duration: "40-50 минут",
    createdAt: "28.12.2025",
    slides: kingsProphets as UniversalSlide[],
    layout: 'grid',
  },
  {
    id: "church",
    title: "Церковь",
    description: "Церковь как тело Христа — тайна, открытая в Новом Завете",
    thumbnail: homeChurchImg,
    slideCount: church.length,
    duration: "25-30 минут",
    createdAt: "03.01.2026",
    slides: church as UniversalSlide[],
    layout: 'tabs',
    sections: churchSections as Section[],
  },
  {
    id: "home-church",
    title: "Домашняя церковь",
    description: "Практика первых христиан: как собирались церкви по домам",
    thumbnail: homeChurchImg,
    slideCount: homeChurch.length,
    duration: "15-20 минут",
    createdAt: "03.01.2026",
    slides: homeChurch as UniversalSlide[],
    layout: 'tabs',
    sections: homeChurchSections as Section[],
  },
  {
    id: "salvation",
    title: "Драма Искупления",
    description: "Как развивается конфликт Греха и Спасения в евангельском повествовании",
    thumbnail: salvationImg,
    slideCount: redemptionDrama.length,
    duration: "35-40 минут",
    isHero: true,
    createdAt: "18.12.2025",
    slides: redemptionDrama as UniversalSlide[],
    layout: 'tabs',
    sections: redemptionSections as Section[],
  },
  {
    id: "god-exists",
    title: "Существует ли Бог?",
    description: "Философский диалог с искусственным интеллектом о логичности существования Творца",
    thumbnail: godExistsImg,
    slideCount: godExists.length,
    duration: "25-30 минут",
    createdAt: "16.12.2025",
    slides: godExists as UniversalSlide[],
    layout: 'tabs',
    sections: godExistsSections as Section[],
  },
  {
    id: "eternal-temporal",
    title: "Вечное и временное",
    description: "Как правильно жить в свете вечности — размышление над Псалмом 89",
    thumbnail: eternalCosmosImg,
    slideCount: eternalTemporal.length,
    duration: "25-30 минут",
    createdAt: "14.12.2025",
    slides: eternalTemporal as UniversalSlide[],
    layout: 'tabs',
    sections: eternalTemporalSections as Section[],
  },
  {
    id: "seminar",
    title: "Бог превращает зло в добро",
    description: "Божий план спасения никогда не может быть сорван",
    thumbnail: josephImg,
    slideCount: seminar.length,
    duration: "25-30 минут",
    createdAt: "07.12.2025",
    slides: seminar as UniversalSlide[],
    layout: 'tabs',
    sections: seminarSections as Section[],
  },
  {
    id: "epistles-structure",
    title: "Знать и Делать",
    description: "Структура посланий Нового Завета: доктрина и практическое применение",
    thumbnail: knowDoImg,
    slideCount: epistlesStructure.length,
    duration: "30-35 минут",
    createdAt: "01.12.2025",
    slides: epistlesStructure as UniversalSlide[],
    layout: 'grid',
  },
  {
    id: "disciples",
    title: "12 Учеников Христа",
    description: "Погрузитесь в увлекательные истории людей, изменивших ход человеческой истории",
    thumbnail: peterImg,
    slideCount: disciples.length,
    duration: "15-20 минут",
    createdAt: "15.11.2025",
    slides: disciples as UniversalSlide[],
    layout: 'grid',
  }
];
