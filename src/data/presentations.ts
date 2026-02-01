// Last updated: 2025-12-28
import peterImg from "@/assets/peter.jpg";
import josephImg from "@/assets/joseph-thumbnail.png";
import knowDoImg from "@/assets/know-do.png";
import salvationImg from "@/assets/salvation-thumbnail.png";
import godExistsImg from "@/assets/god-exists-thumbnail.png";
import eternalCosmosImg from "@/assets/eternal-cosmos.png";
import homeChurchImg from "@/assets/home-church-thumbnail.png";
import churchImg from "@/assets/home-church-growth.png";
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
  titleEn: string;
  description: string;
  descriptionEn: string;
  thumbnail: string;
  slideCount: number;
  duration: string;
  isHero?: boolean;
  createdAt: string;
  slides: UniversalSlide[];
  layout: 'grid' | 'tabs';
  sections?: Section[];
  category: 'seminar' | 'bible-study';
}

export const presentations: Presentation[] = [
  {
    id: "kings-prophets",
    title: "Цари и пророки",
    titleEn: "Kings and Prophets",
    description: "Хронология царей Израиля и Иуды с пророками (1010–586 до н.э.)",
    descriptionEn: "Chronology of the kings of Israel and Judah with prophets (1010–586 BC)",
    thumbnail: kingsProphetsImg,
    slideCount: kingsProphets.length,
    duration: "40-50",
    createdAt: "28.12.2025",
    slides: kingsProphets as UniversalSlide[],
    layout: 'grid',
    category: 'bible-study',
  },
  {
    id: "church",
    title: "Церковь",
    titleEn: "The Church",
    description: "Церковь как тело Христа — тайна, открытая в Новом Завете",
    descriptionEn: "The Church as the body of Christ — a mystery revealed in the New Testament",
    thumbnail: churchImg,
    slideCount: church.length,
    duration: "25-30",
    createdAt: "03.01.2026",
    slides: church as UniversalSlide[],
    layout: 'tabs',
    sections: churchSections as Section[],
    category: 'bible-study',
  },
  {
    id: "home-church",
    title: "Домашняя церковь",
    titleEn: "House Church",
    description: "Практика первых христиан: как собирались церкви по домам",
    descriptionEn: "Practice of early Christians: how churches gathered in homes",
    thumbnail: homeChurchImg,
    slideCount: homeChurch.length,
    duration: "15-20",
    createdAt: "03.01.2026",
    slides: homeChurch as UniversalSlide[],
    layout: 'tabs',
    sections: homeChurchSections as Section[],
    category: 'bible-study',
  },
  {
    id: "salvation",
    title: "Драма Искупления",
    titleEn: "Drama of Redemption",
    description: "Как развивается конфликт Греха и Спасения в евангельском повествовании",
    descriptionEn: "How the conflict of Sin and Salvation unfolds in the Gospel narrative",
    thumbnail: salvationImg,
    slideCount: redemptionDrama.length,
    duration: "35-40",
    isHero: true,
    createdAt: "18.12.2025",
    slides: redemptionDrama as UniversalSlide[],
    layout: 'tabs',
    sections: redemptionSections as Section[],
    category: 'seminar',
  },
  {
    id: "god-exists",
    title: "Существует ли Бог?",
    titleEn: "Does God Exist?",
    description: "Философский диалог с искусственным интеллектом о логичности существования Творца",
    descriptionEn: "A philosophical dialogue with AI about the logic of the Creator's existence",
    thumbnail: godExistsImg,
    slideCount: godExists.length,
    duration: "25-30",
    createdAt: "16.12.2025",
    slides: godExists as UniversalSlide[],
    layout: 'tabs',
    sections: godExistsSections as Section[],
    category: 'seminar',
  },
  {
    id: "eternal-temporal",
    title: "Вечное и временное",
    titleEn: "Eternal and Temporal",
    description: "Как правильно жить в свете вечности — размышление над Псалмом 89",
    descriptionEn: "How to live rightly in the light of eternity — meditation on Psalm 89",
    thumbnail: eternalCosmosImg,
    slideCount: eternalTemporal.length,
    duration: "25-30",
    createdAt: "14.12.2025",
    slides: eternalTemporal as UniversalSlide[],
    layout: 'tabs',
    sections: eternalTemporalSections as Section[],
    category: 'seminar',
  },
  {
    id: "seminar",
    title: "Бог превращает зло в добро",
    titleEn: "God Turns Evil Into Good",
    description: "Божий план спасения никогда не может быть сорван",
    descriptionEn: "God's plan of salvation can never be thwarted",
    thumbnail: josephImg,
    slideCount: seminar.length,
    duration: "25-30",
    createdAt: "07.12.2025",
    slides: seminar as UniversalSlide[],
    layout: 'tabs',
    sections: seminarSections as Section[],
    category: 'seminar',
  },
  {
    id: "epistles-structure",
    title: "Знать и Делать",
    titleEn: "Know and Do",
    description: "Структура посланий Нового Завета: доктрина и практическое применение",
    descriptionEn: "Structure of New Testament epistles: doctrine and practical application",
    thumbnail: knowDoImg,
    slideCount: epistlesStructure.length,
    duration: "30-35",
    createdAt: "01.12.2025",
    slides: epistlesStructure as UniversalSlide[],
    layout: 'grid',
    category: 'bible-study',
  },
  {
    id: "disciples",
    title: "12 Учеников Христа",
    titleEn: "12 Disciples of Christ",
    description: "Погрузитесь в увлекательные истории людей, изменивших ход человеческой истории",
    descriptionEn: "Dive into the fascinating stories of people who changed the course of human history",
    thumbnail: peterImg,
    slideCount: disciples.length,
    duration: "15-20",
    createdAt: "15.11.2025",
    slides: disciples as UniversalSlide[],
    layout: 'grid',
    category: 'bible-study',
  }
];
