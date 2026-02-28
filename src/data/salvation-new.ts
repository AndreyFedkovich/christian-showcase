import SalvationThumbnail from "@/assets/salvation-thumbnail.png";
import { SeminarSlide, SeminarSection } from './seminar';

export const salvationWaySlides: SeminarSlide[] = [
  {
    type: 'introduction',
    title: 'Спасение',
    subtitle: 'Христос — Спаситель и Царь',
    content: [
      'Иисус Христос — единственный путь примирения с Богом.',
      'Он не просто Спаситель — Он Царь, Которому принадлежит вся власть на небе и на земле.',
      'Принять Его — значит отдать Ему всю свою жизнь и преклониться перед Его величием.'
    ],
    image: SalvationThumbnail
  }
];

export const salvationWaySections: SeminarSection[] = [
  {
    id: 'intro',
    name: 'Введение',
    slides: salvationWaySlides
  }
];
