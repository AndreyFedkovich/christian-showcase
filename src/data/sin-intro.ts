import SinThumbnail from "@/assets/sin-thumbnail.png";

type SinIntroSlide = any;

export const sinIntroSlides: SinIntroSlide[] = [
  {
    type: 'intro-image',
    title: 'Грех',
    subtitle: 'Главная проблема человека — необходимость глубокого осознания греха',
    content: [],
    image: SinThumbnail,
    imagePosition: 'center'
  },
  {
    type: 'scripture-dark',
    verses: [
      { reference: 'Римлянам 3:23', text: 'Потому что все согрешили и лишены славы Божией.' }
    ]
  },
  {
    type: 'reflection',
    title: 'Вступление',
    content: [
      'Грех — это не просто ошибка или слабость. Это восстание против святого Бога.',
      'Пока человек не осознает всю тяжесть своего греха, он не сможет оценить величие спасения.',
      'Этот раздел посвящён необходимости глубокого понимания и осознания главной проблемы человечества.'
    ]
  },
  {
    type: 'conclusion',
    title: 'Первый шаг',
    points: [
      'Осознать грех — первый шаг к спасению.'
    ]
  }
];
