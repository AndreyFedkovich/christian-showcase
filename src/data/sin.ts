import SinThumbnail from "@/assets/sin-thumbnail.png";
import { SeminarSlide, SeminarSection } from './seminar';

export const sinPresentationSlides: SeminarSlide[] = [
  {
    type: 'introduction',
    title: 'Грех',
    subtitle: 'Главная проблема человека',
    content: [
      'Грех — это не просто ошибка или слабость. Это восстание против святого Бога.',
      'Пока человек не осознает всю тяжесть своего греха, он не сможет оценить величие спасения.',
      'Этот раздел посвящён необходимости глубокого понимания и осознания главной проблемы человечества.'
    ],
    image: SinThumbnail
  }
];

export const sinPresentationSections: SeminarSection[] = [
  {
    id: 'intro',
    name: 'Введение',
    slides: sinPresentationSlides
  }
];
