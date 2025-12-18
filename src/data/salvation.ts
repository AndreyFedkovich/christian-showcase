import SalvationThumbnail from "@/assets/salvation-thumbnail.png";
import { SeminarSlide, SeminarSection, SeminarIntroductionSlide } from './seminar';

// Слайды раздела "Грех"
export const sinSlides: SeminarSlide[] = [
  {
    type: 'introduction',
    title: 'Анатомия Искупления',
    subtitle: 'Раздел 1: Грех',
    content: [
      'Чтобы понять Божье спасение, нужно сначала понять проблему греха.',
      'Этот раздел раскрывает, как грех отделил человечество от Бога.'
    ],
    image: SalvationThumbnail
  }
];

// Слайды раздела "Спасение"
export const salvationSlides: SeminarSlide[] = [
  {
    type: 'introduction',
    title: 'Анатомия Искупления',
    subtitle: 'Раздел 2: Спасение',
    content: [
      'Бог не оставил нас в безнадёжности.',
      'Через Иисуса Христа Он открыл путь примирения и вечной жизни.'
    ],
    image: SalvationThumbnail
  }
];

// Массив секций/вкладок
export const salvationSections: SeminarSection[] = [
  {
    id: 'sin',
    name: 'Грех',
    slides: sinSlides
  },
  {
    id: 'salvation',
    name: 'Спасение',
    slides: salvationSlides
  }
];

// Все слайды для режима презентации (объединённые)
export const salvation: SeminarSlide[] = [
  ...sinSlides,
  ...salvationSlides
];

// Экспорт типа для использования в других файлах
export type { SeminarSlide, SeminarSection, SeminarIntroductionSlide };
