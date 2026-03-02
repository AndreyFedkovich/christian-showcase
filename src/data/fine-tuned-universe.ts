import FineTunedUniverseThumbnail from "@/assets/fine-tuned-universe-thumbnail.png";
import { SeminarSlide, SeminarSection } from './seminar';

export const fineTunedUniverseSlides: SeminarSlide[] = [
  {
    type: 'introduction',
    title: 'Вселенная точно настроена',
    subtitle: 'Факты тонкой настройки Вселенной',
    content: [
      'Луна создаёт приливы и отливы, без которых жизнь в океанах была бы невозможна.',
      'Размер Луны в 400 раз меньше Солнца, а расстояние до Земли в 400 раз меньше расстояния до Солнца — идеальное совпадение, которое не может быть случайностью.',
      'Множество констант Вселенной настроены с невероятной точностью — и каждая из них указывает на разумный замысел.'
    ],
    image: FineTunedUniverseThumbnail
  }
];

export const fineTunedUniverseSections: SeminarSection[] = [
  {
    id: 'intro',
    name: 'Введение',
    slides: fineTunedUniverseSlides
  }
];
