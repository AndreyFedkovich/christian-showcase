// Данные для презентации "Цари и Пророки"
// Хронология от Давида до Вавилонского плена

import KingsProphetsChart1 from '@/assets/kings-prophets-chart-1.jpg';
import KingsProphetsChart2 from '@/assets/kings-prophets-chart-2.jpg';
import KingsProphetsChart3 from '@/assets/kings-prophets-chart-3.jpg';
import KingsProphetsChart4 from '@/assets/kings-prophets-chart-4.jpg';

// ==================== ТИПЫ ====================

export interface TimelineIntroSlide {
  type: 'timeline-intro';
  title: string;
  subtitle: string;
  timeline: {
    startYear: number;
    endYear: number;
  };
  kingdoms: {
    united: { start: number; end: number };
    northern: { start: number; end: number };
    southern: { start: number; end: number };
  };
}

export interface Ruler {
  name: string;
  reign: { start: number; end: number };
  years: number | string;
  character: 'good' | 'evil' | 'mixed';
  highlight: string;
  references: string[];
}

export interface Prophet {
  name: string;
  ministry: { start: number; end: number };
  focus: 'north' | 'south' | 'both' | 'nations';
  book?: string;
}

export interface TimelineDualSlide {
  type: 'timeline-dual';
  period: string;
  startYear: number;
  endYear: number;
  northernKingdom?: {
    label: string;
    capital: string;
    rulers: Ruler[];
  };
  southernKingdom: {
    label: string;
    capital: string;
    rulers: Ruler[];
  };
  prophets: Prophet[];
}

export interface KingProfileSlide {
  type: 'king-profile';
  name: string;
  title: string;
  kingdom: 'united' | 'north' | 'south';
  reign: { start: number; end: number };
  years: number | string;
  character: 'good' | 'evil' | 'mixed';
  keyFacts: string[];
  legacy: string;
  references: string[];
  prophets?: string[];
}

export interface ProphetProfileSlide {
  type: 'prophet-profile';
  name: string;
  ministry: { start: number; end: number };
  audience: 'north' | 'south' | 'both' | 'nations';
  keyMessage: string;
  contemporaryKings: string[];
  memorable: string;
  book?: string;
  references: string[];
}

export interface TimelineEventSlide {
  type: 'timeline-event';
  year: number;
  event: string;
  description: string[];
  significance: string;
  references: string[];
}

export interface TimelineChartSlide {
  type: 'timeline-chart';
  title: string;
  image: string;
  caption: string;
  period: string;
}

export type KingsProphetsSlide = 
  | TimelineIntroSlide 
  | TimelineDualSlide 
  | KingProfileSlide 
  | ProphetProfileSlide 
  | TimelineEventSlide
  | TimelineChartSlide;

// ==================== ДАННЫЕ ====================

export const kingsProphets: KingsProphetsSlide[] = [
  // ===== СЛАЙД 1: ВВЕДЕНИЕ =====
  {
    type: 'timeline-intro',
    title: 'Цари и Пророки',
    subtitle: 'От Давида до Вавилонского плена',
    timeline: {
      startYear: 1010,
      endYear: 586
    },
    kingdoms: {
      united: { start: 1010, end: 930 },
      northern: { start: 930, end: 722 },
      southern: { start: 930, end: 586 }
    }
  },

  // ===== СЛАЙД 2: ОБЪЕДИНЁННОЕ ЦАРСТВО =====
  {
    type: 'timeline-event',
    year: 1010,
    event: 'Объединённое Царство',
    description: [
      'Давид объединяет все 12 колен Израиля под одним царством',
      'Иерусалим становится столицей и духовным центром',
      'Бог заключает завет с Давидом о вечном царстве'
    ],
    significance: 'Период единства народа Божьего — золотой век Израиля',
    references: ['2 Цар. 5:1-5', '2 Цар. 7:12-16', '1 Пар. 17:11-14']
  },

  // ===== СЛАЙД 3: ДАВИД =====
  {
    type: 'king-profile',
    name: 'Давид',
    title: 'Царь объединённого Израиля',
    kingdom: 'united',
    reign: { start: 1010, end: 970 },
    years: 40,
    character: 'good',
    keyFacts: [
      'Пастух, ставший царём',
      'Победитель Голиафа',
      'Автор большинства Псалмов',
      'Завоевал Иерусалим',
      'Согрешил с Вирсавией, но покаялся'
    ],
    legacy: '«Муж по сердцу Божьему» — прообраз грядущего Мессии',
    references: ['1 Цар. 16-31', '2 Цар. 1-24', '1 Пар. 11-29'],
    prophets: ['Нафан', 'Гад']
  },

  // ===== СЛАЙД 4: СОЛОМОН =====
  {
    type: 'king-profile',
    name: 'Соломон',
    title: 'Царь объединённого Израиля',
    kingdom: 'united',
    reign: { start: 970, end: 930 },
    years: 40,
    character: 'mixed',
    keyFacts: [
      'Попросил у Бога мудрости',
      'Построил Первый Храм',
      'Написал Притчи, Екклесиаст, Песнь Песней',
      '700 жён и 300 наложниц',
      'В конце жизни сердце отвратилось от Бога'
    ],
    legacy: 'Мудрейший царь, но чьё сердце развратили жёны-язычницы',
    references: ['3 Цар. 1-11', '2 Пар. 1-9'],
    prophets: ['Ахия Силомлянин']
  },

  // ===== СЛАЙД 5: РАЗДЕЛЕНИЕ ЦАРСТВА =====
  {
    type: 'timeline-event',
    year: 930,
    event: 'Разделение Царства',
    description: [
      'Ровоам отказывается облегчить бремя народа',
      '10 северных колен отделяются под руководством Иеровоама',
      'Царство делится на Израиль (север) и Иудею (юг)'
    ],
    significance: 'Грех Соломона приводит к расколу — народ Божий разделён',
    references: ['3 Цар. 12:1-24', '2 Пар. 10:1-19']
  },

  // ===== СЛАЙД 6: ДИАГРАММА 1 =====
  {
    type: 'timeline-chart',
    title: 'Хронология царей',
    image: KingsProphetsChart1,
    caption: 'Параллельная хронология Северного и Южного царств',
    period: '930-850 до н.э.'
  },

  // ===== СЛАЙД 7: РАННИЙ ПЕРИОД (930-850) =====
  {
    type: 'timeline-dual',
    period: '930-850 до н.э.',
    startYear: 930,
    endYear: 850,
    northernKingdom: {
      label: 'Израиль (10 колен)',
      capital: 'Самария',
      rulers: [
        {
          name: 'Иеровоам I',
          reign: { start: 930, end: 909 },
          years: 22,
          character: 'evil',
          highlight: 'Установил золотых тельцов в Вефиле и Дане',
          references: ['3 Цар. 11:26-14:20']
        },
        {
          name: 'Надав',
          reign: { start: 909, end: 908 },
          years: 2,
          character: 'evil',
          highlight: 'Убит заговорщиком Ваасой',
          references: ['3 Цар. 15:25-31']
        },
        {
          name: 'Вааса',
          reign: { start: 908, end: 886 },
          years: 24,
          character: 'evil',
          highlight: 'Истребил дом Иеровоама',
          references: ['3 Цар. 15:27-16:7']
        },
        {
          name: 'Ила',
          reign: { start: 886, end: 885 },
          years: 2,
          character: 'evil',
          highlight: 'Убит пьяным своим слугой Замврием',
          references: ['3 Цар. 16:8-14']
        },
        {
          name: 'Замврий',
          reign: { start: 885, end: 885 },
          years: '7 дней',
          character: 'evil',
          highlight: 'Сжёг себя во дворце',
          references: ['3 Цар. 16:15-20']
        },
        {
          name: 'Амврий',
          reign: { start: 885, end: 874 },
          years: 12,
          character: 'evil',
          highlight: 'Построил Самарию — новую столицу',
          references: ['3 Цар. 16:21-28']
        },
        {
          name: 'Ахав',
          reign: { start: 874, end: 853 },
          years: 22,
          character: 'evil',
          highlight: 'Женился на Иезавели, ввёл культ Ваала',
          references: ['3 Цар. 16:29-22:40']
        }
      ]
    },
    southernKingdom: {
      label: 'Иудея (2 колена)',
      capital: 'Иерусалим',
      rulers: [
        {
          name: 'Ровоам',
          reign: { start: 930, end: 913 },
          years: 17,
          character: 'evil',
          highlight: 'Отказ облегчить бремя привёл к расколу',
          references: ['3 Цар. 12:1-24', '2 Пар. 10-12']
        },
        {
          name: 'Авия',
          reign: { start: 913, end: 910 },
          years: 3,
          character: 'mixed',
          highlight: 'Победил Иеровоама с Божьей помощью',
          references: ['3 Цар. 15:1-8', '2 Пар. 13']
        },
        {
          name: 'Аса',
          reign: { start: 910, end: 869 },
          years: 41,
          character: 'good',
          highlight: 'Реформатор, убрал идолов, но не уничтожил высоты',
          references: ['3 Цар. 15:9-24', '2 Пар. 14-16']
        },
        {
          name: 'Иосафат',
          reign: { start: 872, end: 848 },
          years: 25,
          character: 'good',
          highlight: 'Учил народ Закону, но породнился с Ахавом',
          references: ['3 Цар. 22:41-50', '2 Пар. 17-20']
        }
      ]
    },
    prophets: [
      { name: 'Ахия', ministry: { start: 930, end: 909 }, focus: 'north' },
      { name: 'Илия', ministry: { start: 875, end: 848 }, focus: 'north' }
    ]
  },

  // ===== СЛАЙД 8: ИЛИЯ =====
  {
    type: 'prophet-profile',
    name: 'Илия',
    ministry: { start: 875, end: 848 },
    audience: 'north',
    keyMessage: 'Господь — Бог, а не Ваал. Израиль должен выбрать, кому служить.',
    contemporaryKings: ['Ахав', 'Охозия'],
    memorable: 'Огонь с неба на горе Кармил, вознесён на небо в огненной колеснице',
    references: ['3 Цар. 17-19', '3 Цар. 21', '4 Цар. 1-2']
  },

  // ===== СЛАЙД 9: ДИАГРАММА 2 =====
  {
    type: 'timeline-chart',
    title: 'Период пророков',
    image: KingsProphetsChart2,
    caption: 'Эпоха великих пророков Илии и Елисея',
    period: '850-800 до н.э.'
  },

  // ===== СЛАЙД 10: СРЕДНИЙ ПЕРИОД (850-750) =====
  {
    type: 'timeline-dual',
    period: '850-750 до н.э.',
    startYear: 850,
    endYear: 750,
    northernKingdom: {
      label: 'Израиль',
      capital: 'Самария',
      rulers: [
        {
          name: 'Охозия',
          reign: { start: 853, end: 852 },
          years: 2,
          character: 'evil',
          highlight: 'Искал помощи у Веельзевула',
          references: ['3 Цар. 22:51-53', '4 Цар. 1']
        },
        {
          name: 'Иорам',
          reign: { start: 852, end: 841 },
          years: 12,
          character: 'evil',
          highlight: 'Убит Ииуем',
          references: ['4 Цар. 3:1-9:26']
        },
        {
          name: 'Ииуй',
          reign: { start: 841, end: 814 },
          years: 28,
          character: 'mixed',
          highlight: 'Истребил дом Ахава и пророков Ваала',
          references: ['4 Цар. 9-10']
        },
        {
          name: 'Иоахаз',
          reign: { start: 814, end: 798 },
          years: 17,
          character: 'evil',
          highlight: 'Израиль ослаблен Сирией',
          references: ['4 Цар. 13:1-9']
        },
        {
          name: 'Иоас',
          reign: { start: 798, end: 782 },
          years: 16,
          character: 'mixed',
          highlight: 'Трижды победил Сирию по слову Елисея',
          references: ['4 Цар. 13:10-25']
        },
        {
          name: 'Иеровоам II',
          reign: { start: 793, end: 753 },
          years: 41,
          character: 'evil',
          highlight: 'Экономическое процветание, но духовный упадок',
          references: ['4 Цар. 14:23-29']
        }
      ]
    },
    southernKingdom: {
      label: 'Иудея',
      capital: 'Иерусалим',
      rulers: [
        {
          name: 'Иорам',
          reign: { start: 853, end: 841 },
          years: 8,
          character: 'evil',
          highlight: 'Женился на дочери Ахава',
          references: ['4 Цар. 8:16-24', '2 Пар. 21']
        },
        {
          name: 'Охозия',
          reign: { start: 841, end: 841 },
          years: 1,
          character: 'evil',
          highlight: 'Убит Ииуем вместе с Иорамом',
          references: ['4 Цар. 8:25-29', '2 Пар. 22:1-9']
        },
        {
          name: 'Гофолия',
          reign: { start: 841, end: 835 },
          years: 6,
          character: 'evil',
          highlight: 'Узурпаторша, пыталась истребить царский род',
          references: ['4 Цар. 11', '2 Пар. 22:10-23:21']
        },
        {
          name: 'Иоас',
          reign: { start: 835, end: 796 },
          years: 40,
          character: 'mixed',
          highlight: 'Восстановил Храм, но отступил после смерти Иодая',
          references: ['4 Цар. 12', '2 Пар. 24']
        },
        {
          name: 'Амасия',
          reign: { start: 796, end: 767 },
          years: 29,
          character: 'mixed',
          highlight: 'Победил Едом, но поклонился их богам',
          references: ['4 Цар. 14:1-22', '2 Пар. 25']
        },
        {
          name: 'Озия/Азария',
          reign: { start: 792, end: 740 },
          years: 52,
          character: 'good',
          highlight: 'Великий царь, но поражён проказой за гордость',
          references: ['4 Цар. 15:1-7', '2 Пар. 26']
        }
      ]
    },
    prophets: [
      { name: 'Елисей', ministry: { start: 848, end: 797 }, focus: 'north' },
      { name: 'Иона', ministry: { start: 793, end: 753 }, focus: 'nations', book: 'Иона' },
      { name: 'Амос', ministry: { start: 760, end: 750 }, focus: 'north', book: 'Амос' },
      { name: 'Осия', ministry: { start: 753, end: 715 }, focus: 'north', book: 'Осия' }
    ]
  },

  // ===== СЛАЙД 11: ЕЛИСЕЙ =====
  {
    type: 'prophet-profile',
    name: 'Елисей',
    ministry: { start: 848, end: 797 },
    audience: 'north',
    keyMessage: 'Бог творит чудеса через Своих слуг и заботится о верных.',
    contemporaryKings: ['Иорам', 'Ииуй', 'Иоахаз', 'Иоас'],
    memorable: 'Получил двойную долю духа Илии, совершил множество чудес',
    references: ['4 Цар. 2-13']
  },

  // ===== СЛАЙД 12: ДИАГРАММА 3 =====
  {
    type: 'timeline-chart',
    title: 'Закат Северного царства',
    image: KingsProphetsChart3,
    caption: 'Последние цари Израиля и падение Самарии',
    period: '750-722 до н.э.'
  },

  // ===== СЛАЙД 13: ПОЗДНИЙ ИЗРАИЛЬ (750-722) =====
  {
    type: 'timeline-dual',
    period: '750-722 до н.э.',
    startYear: 750,
    endYear: 722,
    northernKingdom: {
      label: 'Израиль',
      capital: 'Самария',
      rulers: [
        {
          name: 'Захария',
          reign: { start: 753, end: 752 },
          years: '6 мес.',
          character: 'evil',
          highlight: 'Убит заговорщиком',
          references: ['4 Цар. 15:8-12']
        },
        {
          name: 'Шаллум',
          reign: { start: 752, end: 752 },
          years: '1 мес.',
          character: 'evil',
          highlight: 'Самое короткое царствование',
          references: ['4 Цар. 15:13-15']
        },
        {
          name: 'Менаим',
          reign: { start: 752, end: 742 },
          years: 10,
          character: 'evil',
          highlight: 'Платил дань Ассирии',
          references: ['4 Цар. 15:16-22']
        },
        {
          name: 'Факия',
          reign: { start: 742, end: 740 },
          years: 2,
          character: 'evil',
          highlight: 'Убит своим военачальником',
          references: ['4 Цар. 15:23-26']
        },
        {
          name: 'Факей',
          reign: { start: 740, end: 732 },
          years: 8,
          character: 'evil',
          highlight: 'Союз с Сирией против Иудеи',
          references: ['4 Цар. 15:27-31']
        },
        {
          name: 'Осия',
          reign: { start: 732, end: 722 },
          years: 9,
          character: 'evil',
          highlight: 'Последний царь — Ассирийский плен',
          references: ['4 Цар. 17:1-6']
        }
      ]
    },
    southernKingdom: {
      label: 'Иудея',
      capital: 'Иерусалим',
      rulers: [
        {
          name: 'Иоафам',
          reign: { start: 750, end: 735 },
          years: 16,
          character: 'good',
          highlight: 'Верный царь, но не убрал высоты',
          references: ['4 Цар. 15:32-38', '2 Пар. 27']
        },
        {
          name: 'Ахаз',
          reign: { start: 735, end: 715 },
          years: 16,
          character: 'evil',
          highlight: 'Принёс сына в жертву, призвал Ассирию',
          references: ['4 Цар. 16', '2 Пар. 28']
        }
      ]
    },
    prophets: [
      { name: 'Исаия', ministry: { start: 740, end: 681 }, focus: 'south', book: 'Исаия' },
      { name: 'Михей', ministry: { start: 742, end: 687 }, focus: 'both', book: 'Михей' }
    ]
  },

  // ===== СЛАЙД 14: ПАДЕНИЕ САМАРИИ =====
  {
    type: 'timeline-event',
    year: 722,
    event: 'Падение Самарии',
    description: [
      'Ассирия осаждает Самарию три года',
      'Северное царство уничтожено навсегда',
      '10 колен уведены в плен и рассеяны среди народов',
      'В опустевшую землю поселены чужеземцы'
    ],
    significance: 'Суд Божий за 200 лет идолопоклонства — народ потерял землю обетованную',
    references: ['4 Цар. 17:5-23', '4 Цар. 18:9-12']
  },

  // ===== СЛАЙД 15: ИСАИЯ =====
  {
    type: 'prophet-profile',
    name: 'Исаия',
    ministry: { start: 740, end: 681 },
    audience: 'south',
    keyMessage: 'Грядёт Мессия — Страдающий Раб, Который понесёт грехи многих.',
    contemporaryKings: ['Озия', 'Иоафам', 'Ахаз', 'Езекия', 'Манассия'],
    memorable: 'Пророк-евангелист: предсказал рождение от Девы, страдания и славу Христа',
    book: 'Исаия',
    references: ['Ис. 1-66', '4 Цар. 19-20']
  },

  // ===== СЛАЙД 16: ЕЗЕКИЯ =====
  {
    type: 'king-profile',
    name: 'Езекия',
    title: 'Царь Иудеи',
    kingdom: 'south',
    reign: { start: 715, end: 686 },
    years: 29,
    character: 'good',
    keyFacts: [
      'Величайший реформатор после Давида',
      'Уничтожил высоты и медного змея',
      'Очистил Храм и восстановил Пасху',
      'Чудесно избавлен от Ассирии (185 000 убито ангелом)',
      'Исцелён от смертельной болезни, получил 15 лет жизни'
    ],
    legacy: '«Уповал на Господа... и не отступал от Него» — эталон веры',
    references: ['4 Цар. 18-20', '2 Пар. 29-32', 'Ис. 36-39'],
    prophets: ['Исаия', 'Михей']
  },

  // ===== СЛАЙД 17: ДИАГРАММА 4 =====
  {
    type: 'timeline-chart',
    title: 'Последние дни Иудеи',
    image: KingsProphetsChart4,
    caption: 'От Манассии до Вавилонского плена',
    period: '686-586 до н.э.'
  },

  // ===== СЛАЙД 18: ПОЗДНЯЯ ИУДЕЯ (686-586) =====
  {
    type: 'timeline-dual',
    period: '686-586 до н.э.',
    startYear: 686,
    endYear: 586,
    southernKingdom: {
      label: 'Иудея',
      capital: 'Иерусалим',
      rulers: [
        {
          name: 'Манассия',
          reign: { start: 697, end: 642 },
          years: 55,
          character: 'evil',
          highlight: 'Самый злой царь, но покаялся в плену',
          references: ['4 Цар. 21:1-18', '2 Пар. 33:1-20']
        },
        {
          name: 'Амон',
          reign: { start: 642, end: 640 },
          years: 2,
          character: 'evil',
          highlight: 'Убит своими слугами',
          references: ['4 Цар. 21:19-26', '2 Пар. 33:21-25']
        },
        {
          name: 'Иосия',
          reign: { start: 640, end: 609 },
          years: 31,
          character: 'good',
          highlight: 'Нашёл книгу Закона, великая реформа',
          references: ['4 Цар. 22-23', '2 Пар. 34-35']
        },
        {
          name: 'Иоахаз',
          reign: { start: 609, end: 609 },
          years: '3 мес.',
          character: 'evil',
          highlight: 'Уведён в Египет',
          references: ['4 Цар. 23:31-34', '2 Пар. 36:1-4']
        },
        {
          name: 'Иоаким',
          reign: { start: 609, end: 598 },
          years: 11,
          character: 'evil',
          highlight: 'Сжёг свиток Иеремии',
          references: ['4 Цар. 23:34-24:7', '2 Пар. 36:5-8']
        },
        {
          name: 'Иехония',
          reign: { start: 598, end: 597 },
          years: '3 мес.',
          character: 'evil',
          highlight: 'Первое переселение в Вавилон',
          references: ['4 Цар. 24:8-17', '2 Пар. 36:9-10']
        },
        {
          name: 'Седекия',
          reign: { start: 597, end: 586 },
          years: 11,
          character: 'evil',
          highlight: 'Последний царь — разрушение Иерусалима',
          references: ['4 Цар. 24:18-25:21', '2 Пар. 36:11-21']
        }
      ]
    },
    prophets: [
      { name: 'Наум', ministry: { start: 663, end: 612 }, focus: 'nations', book: 'Наум' },
      { name: 'Софония', ministry: { start: 640, end: 621 }, focus: 'south', book: 'Софония' },
      { name: 'Иеремия', ministry: { start: 627, end: 586 }, focus: 'south', book: 'Иеремия' },
      { name: 'Аввакум', ministry: { start: 612, end: 589 }, focus: 'south', book: 'Аввакум' }
    ]
  },

  // ===== СЛАЙД 19: ИОСИЯ =====
  {
    type: 'king-profile',
    name: 'Иосия',
    title: 'Царь Иудеи',
    kingdom: 'south',
    reign: { start: 640, end: 609 },
    years: 31,
    character: 'good',
    keyFacts: [
      'Стал царём в 8 лет',
      'В 16 лет начал искать Бога',
      'В 26 лет нашли книгу Закона в Храме',
      'Провёл величайшую реформу в истории',
      'Уничтожил все высоты и жертвенники Ваала'
    ],
    legacy: '«Подобного ему не было царя прежде него» — последняя надежда Иудеи',
    references: ['4 Цар. 22-23', '2 Пар. 34-35'],
    prophets: ['Софония', 'Иеремия', 'Олдама']
  },

  // ===== СЛАЙД 20: ИЕРЕМИЯ =====
  {
    type: 'prophet-profile',
    name: 'Иеремия',
    ministry: { start: 627, end: 586 },
    audience: 'south',
    keyMessage: 'Вавилон придёт — покоритесь, ибо это суд Божий. Но Бог заключит Новый Завет.',
    contemporaryKings: ['Иосия', 'Иоахаз', 'Иоаким', 'Иехония', 'Седекия'],
    memorable: '«Плачущий пророк» — предупреждал 40 лет, но его не слушали',
    book: 'Иеремия, Плач Иеремии',
    references: ['Иер. 1-52', 'Плач 1-5']
  },

  // ===== СЛАЙД 21: ПАДЕНИЕ ИЕРУСАЛИМА =====
  {
    type: 'timeline-event',
    year: 586,
    event: 'Падение Иерусалима',
    description: [
      'Навуходоносор осаждает город 18 месяцев',
      'Стены пробиты, Седекия ослеплён',
      'Храм Соломона сожжён дотла',
      'Народ уведён в Вавилонский плен'
    ],
    significance: 'Казалось, всё потеряно — но Бог сохранил остаток для исполнения обещаний',
    references: ['4 Цар. 25:1-21', '2 Пар. 36:15-21', 'Иер. 39', 'Иер. 52']
  },

  // ===== СЛАЙД 22: ИТОГИ =====
  {
    type: 'timeline-event',
    year: 586,
    event: 'Уроки истории',
    description: [
      'Северное царство: 19 царей — ВСЕ злые — 208 лет до плена',
      'Южное царство: 20 царей — 8 добрых — 344 года до плена',
      'Добрые цари продлевали жизнь народа',
      'Пророки звали к покаянию — народ не слушал'
    ],
    significance: 'Бог долготерпелив, но справедлив. Грех ведёт к суду, покаяние — к милости.',
    references: ['4 Цар. 17:7-23', '2 Пар. 36:15-16', 'Неем. 9:26-31']
  }
];

// ==================== СЕКЦИИ ====================

export interface KingsProphetsSection {
  id: string;
  title: string;
  slides: KingsProphetsSlide[];
}

export const kingsProphetsSections: KingsProphetsSection[] = [
  { id: 'intro', title: 'Введение', slides: [] },
  { id: 'united', title: 'Объединённое царство', slides: [] },
  { id: 'division', title: 'Разделение', slides: [] },
  { id: 'north-fall', title: 'Падение Севера', slides: [] },
  { id: 'south-fall', title: 'Падение Юга', slides: [] }
];

// Заполняем секции слайдами
kingsProphetsSections[0].slides = kingsProphets.slice(0, 1);   // Введение
kingsProphetsSections[1].slides = kingsProphets.slice(1, 5);   // Объединённое царство
kingsProphetsSections[2].slides = kingsProphets.slice(5, 12);  // Разделение и ранний период
kingsProphetsSections[3].slides = kingsProphets.slice(12, 16); // Падение Севера
kingsProphetsSections[4].slides = kingsProphets.slice(16);     // Падение Юга
