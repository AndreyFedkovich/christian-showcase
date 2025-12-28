// Данные для презентации "Цари и пророки"

// ====== Интерфейсы ======

export interface King {
  name: string;
  startYear: number;
  endYear: number;
  duration: string;
  kingdom: 'judah' | 'israel';
  character: 'good' | 'evil' | 'mixed';
  characteristic: string;
  keyEvent?: string;
  scriptures?: string[];
}

export interface Prophet {
  name: string;
  startYear: number;
  endYear: number;
  keyMessage: string;
  book?: string;
  relatedKings?: string[];
}

export interface TimelineEra {
  title: string;
  year: number;
  description: string;
  significance: string;
}

// Типы слайдов для презентации
export interface TimelineIntroSlide {
  type: 'timeline-intro';
  title: string;
  subtitle: string;
  period: string;
  description: string[];
}

export interface TimelineOverviewSlide {
  type: 'timeline-overview';
  title: string;
  legends: { label: string; color: string; description: string }[];
  note: string;
}

export interface TimelineSlide {
  type: 'timeline';
  title: string;
  startYear: number;
  endYear: number;
  kings: King[];
  prophets: Prophet[];
  era?: TimelineEra;
}

export interface KingProfileSlide {
  type: 'king-profile';
  king: King;
  details: string[];
  scriptures: { text: string; reference: string }[];
}

export interface ProphetProfileSlide {
  type: 'prophet-profile';
  prophet: Prophet;
  details: string[];
  keyVerse?: { text: string; reference: string };
}

export interface TimelineEraSlide {
  type: 'timeline-era';
  era: TimelineEra;
  causes: string[];
  consequences: string[];
}

export type KingsProphetsSlide = 
  | TimelineIntroSlide 
  | TimelineOverviewSlide 
  | TimelineSlide 
  | KingProfileSlide 
  | ProphetProfileSlide 
  | TimelineEraSlide;

// ====== Данные царей Иуды (Южное царство) ======

export const kingsOfJudah: King[] = [
  {
    name: 'Давид',
    startYear: 1010,
    endYear: 970,
    duration: '40 лет',
    kingdom: 'judah',
    character: 'good',
    characteristic: 'Человек по сердцу Бога',
    keyEvent: 'Объединил Израиль, взял Иерусалим, получил обетование о вечном царстве',
    scriptures: ['2 Цар. 5-24', '1 Пар. 11-29']
  },
  {
    name: 'Соломон',
    startYear: 970,
    endYear: 930,
    duration: '40 лет',
    kingdom: 'judah',
    character: 'mixed',
    characteristic: 'Мудрейший царь, построил Храм',
    keyEvent: 'Построил Храм Господень, но в старости уклонился к идолам',
    scriptures: ['3 Цар. 1-11', '2 Пар. 1-9']
  },
  {
    name: 'Ровоам',
    startYear: 930,
    endYear: 913,
    duration: '17 лет',
    kingdom: 'judah',
    character: 'evil',
    characteristic: 'Разделение царства',
    keyEvent: 'Отверг совет старейшин, царство разделилось',
    scriptures: ['3 Цар. 12', '2 Пар. 10-12']
  },
  {
    name: 'Авия',
    startYear: 913,
    endYear: 910,
    duration: '3 года',
    kingdom: 'judah',
    character: 'mixed',
    characteristic: 'Воззвал к Богу в битве',
    keyEvent: 'Победил Иеровоама, уповая на Господа',
    scriptures: ['2 Пар. 13']
  },
  {
    name: 'Аса',
    startYear: 910,
    endYear: 869,
    duration: '41 год',
    kingdom: 'judah',
    character: 'good',
    characteristic: 'Уничтожил идолов, восстановил жертвенник',
    keyEvent: 'Великая реформа, но в конце понадеялся на Сирию',
    scriptures: ['3 Цар. 15', '2 Пар. 14-16']
  },
  {
    name: 'Иосафат',
    startYear: 872,
    endYear: 848,
    duration: '25 лет',
    kingdom: 'judah',
    character: 'good',
    characteristic: 'Сильная армия, учил народ Закону',
    keyEvent: 'Послал левитов учить народ, но породнился с Ахавом',
    scriptures: ['3 Цар. 22', '2 Пар. 17-20']
  },
  {
    name: 'Иорам',
    startYear: 853,
    endYear: 841,
    duration: '8 лет',
    kingdom: 'judah',
    character: 'evil',
    characteristic: 'Женился на дочери Ахава, убил братьев',
    keyEvent: 'Ввёл культ Ваала в Иудее',
    scriptures: ['2 Пар. 21']
  },
  {
    name: 'Охозия',
    startYear: 841,
    endYear: 841,
    duration: '1 год',
    kingdom: 'judah',
    character: 'evil',
    characteristic: 'Друг Иорама Израильского',
    keyEvent: 'Убит Ииуем вместе с Иорамом',
    scriptures: ['2 Пар. 22']
  },
  {
    name: 'Гофолия',
    startYear: 841,
    endYear: 835,
    duration: '6 лет',
    kingdom: 'judah',
    character: 'evil',
    characteristic: 'Царица-узурпатор, убила внуков',
    keyEvent: 'Пыталась истребить царский род, осквернила храм',
    scriptures: ['2 Пар. 22-23']
  },
  {
    name: 'Иоас',
    startYear: 835,
    endYear: 796,
    duration: '40 лет',
    kingdom: 'judah',
    character: 'mixed',
    characteristic: 'Восстановил храм',
    keyEvent: 'Добрый при Иодае, отступил после его смерти',
    scriptures: ['2 Пар. 24']
  },
  {
    name: 'Амасия',
    startYear: 796,
    endYear: 767,
    duration: '29 лет',
    kingdom: 'judah',
    character: 'mixed',
    characteristic: 'Добрый, но не полностью',
    keyEvent: 'Победил Едом, но поклонился их богам',
    scriptures: ['2 Пар. 25']
  },
  {
    name: 'Озия (Азария)',
    startYear: 792,
    endYear: 740,
    duration: '52 года',
    kingdom: 'judah',
    character: 'good',
    characteristic: 'Могущественный, но поражён проказой',
    keyEvent: 'Укрепил Иуду, но вошёл в храм кадить — поражён проказой',
    scriptures: ['2 Пар. 26']
  },
  {
    name: 'Иоафам',
    startYear: 750,
    endYear: 735,
    duration: '16 лет',
    kingdom: 'judah',
    character: 'good',
    characteristic: 'Строитель, укрепил Иуду',
    keyEvent: 'Построил верхние ворота храма',
    scriptures: ['2 Пар. 27']
  },
  {
    name: 'Ахаз',
    startYear: 735,
    endYear: 715,
    duration: '16 лет',
    kingdom: 'judah',
    character: 'evil',
    characteristic: 'Принёс сына в жертву, закрыл храм',
    keyEvent: 'Призвал Ассирию на помощь, поклонялся богам Сирии',
    scriptures: ['2 Пар. 28']
  },
  {
    name: 'Езекия',
    startYear: 715,
    endYear: 686,
    duration: '29 лет',
    kingdom: 'judah',
    character: 'good',
    characteristic: 'Великий реформатор, очистил храм',
    keyEvent: 'Праздновал Пасху, Бог защитил от Сеннахирима',
    scriptures: ['2 Пар. 29-32', 'Ис. 36-39']
  },
  {
    name: 'Манассия',
    startYear: 697,
    endYear: 642,
    duration: '55 лет',
    kingdom: 'judah',
    character: 'evil',
    characteristic: 'Самый нечестивый, но покаялся',
    keyEvent: 'Восстановил идолов, но в плену покаялся',
    scriptures: ['2 Пар. 33']
  },
  {
    name: 'Амон',
    startYear: 642,
    endYear: 640,
    duration: '2 года',
    kingdom: 'judah',
    character: 'evil',
    characteristic: 'Злой царь',
    keyEvent: 'Убит своими слугами',
    scriptures: ['2 Пар. 33']
  },
  {
    name: 'Иосия',
    startYear: 640,
    endYear: 609,
    duration: '31 год',
    kingdom: 'judah',
    character: 'good',
    characteristic: 'Великий реформатор, нашёл книгу Закона',
    keyEvent: 'Величайшая реформа, обновил завет с Богом',
    scriptures: ['2 Пар. 34-35']
  },
  {
    name: 'Иоахаз',
    startYear: 609,
    endYear: 609,
    duration: '3 месяца',
    kingdom: 'judah',
    character: 'evil',
    characteristic: 'Уведён в Египет',
    keyEvent: 'Фараон Нехао увёл его в Египет',
    scriptures: ['2 Пар. 36']
  },
  {
    name: 'Иоаким',
    startYear: 609,
    endYear: 598,
    duration: '11 лет',
    kingdom: 'judah',
    character: 'evil',
    characteristic: 'Марионетка, сжёг пророчество',
    keyEvent: 'Сжёг свиток Иеремии',
    scriptures: ['2 Пар. 36', 'Иер. 36']
  },
  {
    name: 'Иехония',
    startYear: 598,
    endYear: 597,
    duration: '3 месяца',
    kingdom: 'judah',
    character: 'evil',
    characteristic: 'Уведён в Вавилон',
    keyEvent: 'Первое переселение в Вавилон',
    scriptures: ['2 Пар. 36']
  },
  {
    name: 'Седекия',
    startYear: 597,
    endYear: 586,
    duration: '11 лет',
    kingdom: 'judah',
    character: 'evil',
    characteristic: 'Последний царь Иуды',
    keyEvent: 'Иерусалим разрушен, храм сожжён',
    scriptures: ['2 Пар. 36', 'Иер. 52']
  }
];

// ====== Данные царей Израиля (Северное царство) ======

export const kingsOfIsrael: King[] = [
  {
    name: 'Иеровоам I',
    startYear: 930,
    endYear: 909,
    duration: '22 года',
    kingdom: 'israel',
    character: 'evil',
    characteristic: 'Поставил золотых тельцов',
    keyEvent: 'Установил культ в Вефиле и Дане',
    scriptures: ['3 Цар. 12-14']
  },
  {
    name: 'Надав',
    startYear: 909,
    endYear: 908,
    duration: '2 года',
    kingdom: 'israel',
    character: 'evil',
    characteristic: 'Продолжал грехи отца',
    keyEvent: 'Убит Ваасой',
    scriptures: ['3 Цар. 15']
  },
  {
    name: 'Вааса',
    startYear: 908,
    endYear: 886,
    duration: '24 года',
    kingdom: 'israel',
    character: 'evil',
    characteristic: 'Истребил дом Иеровоама',
    keyEvent: 'Новая династия, но продолжил идолопоклонство',
    scriptures: ['3 Цар. 15-16']
  },
  {
    name: 'Ила',
    startYear: 886,
    endYear: 885,
    duration: '2 года',
    kingdom: 'israel',
    character: 'evil',
    characteristic: 'Продолжал идолопоклонство',
    keyEvent: 'Убит Замврием во время пьянства',
    scriptures: ['3 Цар. 16']
  },
  {
    name: 'Замврий',
    startYear: 885,
    endYear: 885,
    duration: '7 дней',
    kingdom: 'israel',
    character: 'evil',
    characteristic: 'Заговорщик',
    keyEvent: 'Сжёг себя во дворце',
    scriptures: ['3 Цар. 16']
  },
  {
    name: 'Амврий',
    startYear: 885,
    endYear: 874,
    duration: '12 лет',
    kingdom: 'israel',
    character: 'evil',
    characteristic: 'Построил Самарию',
    keyEvent: 'Основал новую столицу — Самарию',
    scriptures: ['3 Цар. 16']
  },
  {
    name: 'Ахав',
    startYear: 874,
    endYear: 853,
    duration: '22 года',
    kingdom: 'israel',
    character: 'evil',
    characteristic: 'Женился на Иезавели, поклонялся Ваалу',
    keyEvent: 'Противостояние с Илией на горе Кармил',
    scriptures: ['3 Цар. 16-22']
  },
  {
    name: 'Охозия Израильский',
    startYear: 853,
    endYear: 852,
    duration: '2 года',
    kingdom: 'israel',
    character: 'evil',
    characteristic: 'Продолжал грехи отца',
    keyEvent: 'Обратился к Веельзевулу',
    scriptures: ['3 Цар. 22', '4 Цар. 1']
  },
  {
    name: 'Иорам Израильский',
    startYear: 852,
    endYear: 841,
    duration: '12 лет',
    kingdom: 'israel',
    character: 'evil',
    characteristic: 'Менее злой, чем родители',
    keyEvent: 'Убит Ииуем',
    scriptures: ['4 Цар. 3-9']
  },
  {
    name: 'Ииуй',
    startYear: 841,
    endYear: 814,
    duration: '28 лет',
    kingdom: 'israel',
    character: 'mixed',
    characteristic: 'Истребил дом Ахава и жрецов Ваала',
    keyEvent: 'Помазан Елисеем, уничтожил культ Ваала',
    scriptures: ['4 Цар. 9-10']
  },
  {
    name: 'Иоахаз Израильский',
    startYear: 814,
    endYear: 798,
    duration: '17 лет',
    kingdom: 'israel',
    character: 'evil',
    characteristic: 'Злой, но признал Елисея',
    keyEvent: 'Ослаблен Сирией',
    scriptures: ['4 Цар. 13']
  },
  {
    name: 'Иоас Израильский',
    startYear: 798,
    endYear: 782,
    duration: '16 лет',
    kingdom: 'israel',
    character: 'evil',
    characteristic: 'Плакал у Елисея',
    keyEvent: 'Победил Сирию трижды',
    scriptures: ['4 Цар. 13-14']
  },
  {
    name: 'Иеровоам II',
    startYear: 793,
    endYear: 753,
    duration: '41 год',
    kingdom: 'israel',
    character: 'evil',
    characteristic: 'Экономическое процветание',
    keyEvent: 'Расширил границы, но духовный упадок',
    scriptures: ['4 Цар. 14', 'Ам. 7']
  },
  {
    name: 'Захария',
    startYear: 753,
    endYear: 752,
    duration: '6 месяцев',
    kingdom: 'israel',
    character: 'evil',
    characteristic: 'Конец династии Ииуя',
    keyEvent: 'Убит Шаллумом',
    scriptures: ['4 Цар. 15']
  },
  {
    name: 'Шаллум',
    startYear: 752,
    endYear: 752,
    duration: '1 месяц',
    kingdom: 'israel',
    character: 'evil',
    characteristic: 'Заговорщик',
    keyEvent: 'Убит Менаимом',
    scriptures: ['4 Цар. 15']
  },
  {
    name: 'Менаим',
    startYear: 752,
    endYear: 742,
    duration: '10 лет',
    kingdom: 'israel',
    character: 'evil',
    characteristic: 'Жестокий тиран',
    keyEvent: 'Платил дань Ассирии',
    scriptures: ['4 Цар. 15']
  },
  {
    name: 'Факия',
    startYear: 742,
    endYear: 740,
    duration: '2 года',
    kingdom: 'israel',
    character: 'evil',
    characteristic: 'Продолжал идолопоклонство',
    keyEvent: 'Убит Факеем',
    scriptures: ['4 Цар. 15']
  },
  {
    name: 'Факей',
    startYear: 740,
    endYear: 732,
    duration: '8 лет',
    kingdom: 'israel',
    character: 'evil',
    characteristic: 'Много уведено в плен',
    keyEvent: 'Первое переселение в Ассирию',
    scriptures: ['4 Цар. 15']
  },
  {
    name: 'Осия',
    startYear: 732,
    endYear: 722,
    duration: '9 лет',
    kingdom: 'israel',
    character: 'evil',
    characteristic: 'Последний царь Израиля',
    keyEvent: 'Падение Самарии (722 до н.э.)',
    scriptures: ['4 Цар. 17']
  }
];

// ====== Данные пророков ======

export const prophets: Prophet[] = [
  {
    name: 'Ахия',
    startYear: 934,
    endYear: 909,
    keyMessage: 'Пророчество о разделении царства',
    relatedKings: ['Соломон', 'Иеровоам I']
  },
  {
    name: 'Илия',
    startYear: 875,
    endYear: 848,
    keyMessage: 'Противостояние Ваалу, «Господь — Бог!»',
    relatedKings: ['Ахав', 'Охозия Израильский']
  },
  {
    name: 'Елисей',
    startYear: 848,
    endYear: 797,
    keyMessage: 'Чудеса милости, преемник Илии',
    relatedKings: ['Иорам Израильский', 'Ииуй', 'Иоас Израильский']
  },
  {
    name: 'Авдий',
    startYear: 855,
    endYear: 840,
    keyMessage: 'Суд над Едомом за предательство брата',
    book: 'Авдий'
  },
  {
    name: 'Иоиль',
    startYear: 835,
    endYear: 796,
    keyMessage: 'День Господень, излияние Духа',
    book: 'Иоиль'
  },
  {
    name: 'Иона',
    startYear: 793,
    endYear: 753,
    keyMessage: 'Божья милость к язычникам',
    book: 'Иона',
    relatedKings: ['Иеровоам II']
  },
  {
    name: 'Амос',
    startYear: 760,
    endYear: 750,
    keyMessage: 'Социальная справедливость, суд над Израилем',
    book: 'Амос',
    relatedKings: ['Иеровоам II', 'Озия']
  },
  {
    name: 'Осия',
    startYear: 753,
    endYear: 715,
    keyMessage: 'Верность Бога неверному народу',
    book: 'Осия',
    relatedKings: ['Иеровоам II', 'Озия', 'Езекия']
  },
  {
    name: 'Михей',
    startYear: 742,
    endYear: 687,
    keyMessage: 'Действовать справедливо, любить милосердие',
    book: 'Михей',
    relatedKings: ['Иоафам', 'Ахаз', 'Езекия']
  },
  {
    name: 'Исаия',
    startYear: 740,
    endYear: 681,
    keyMessage: 'Святость Бога, Мессия-Раб',
    book: 'Исаия',
    relatedKings: ['Озия', 'Иоафам', 'Ахаз', 'Езекия']
  },
  {
    name: 'Наум',
    startYear: 663,
    endYear: 654,
    keyMessage: 'Падение Ниневии',
    book: 'Наум'
  },
  {
    name: 'Софония',
    startYear: 640,
    endYear: 621,
    keyMessage: 'День Господень близок',
    book: 'Софония',
    relatedKings: ['Иосия']
  },
  {
    name: 'Олдама',
    startYear: 632,
    endYear: 632,
    keyMessage: 'Пророчица, подтвердила книгу Закона',
    relatedKings: ['Иосия']
  },
  {
    name: 'Иеремия',
    startYear: 627,
    endYear: 586,
    keyMessage: 'Плачущий пророк, новый завет',
    book: 'Иеремия',
    relatedKings: ['Иосия', 'Иоаким', 'Седекия']
  },
  {
    name: 'Аввакум',
    startYear: 612,
    endYear: 589,
    keyMessage: 'Праведный верою жив будет',
    book: 'Аввакум'
  }
];

// ====== Ключевые эпохи ======

export const eras: TimelineEra[] = [
  {
    title: 'Объединённое царство',
    year: 1010,
    description: 'Давид объединяет все колена Израиля',
    significance: 'Золотой век Израиля под Давидом и Соломоном'
  },
  {
    title: 'Разделение царства',
    year: 930,
    description: 'Царство разделяется на Северное (Израиль) и Южное (Иуда)',
    significance: 'Начало упадка из-за отступничества'
  },
  {
    title: 'Падение Самарии',
    year: 722,
    description: 'Ассирия уничтожает Северное царство',
    significance: '10 колен уведены в плен, рассеяны среди народов'
  },
  {
    title: 'Падение Иерусалима',
    year: 586,
    description: 'Вавилон разрушает Иерусалим и Храм',
    significance: 'Начало Вавилонского плена, но надежда на восстановление'
  }
];

// ====== Слайды презентации ======

export const kingsProphets: KingsProphetsSlide[] = [
  // Вступление
  {
    type: 'timeline-intro',
    title: 'Цари и пророки',
    subtitle: 'Хронология царей Израиля и Иуды',
    period: '1010–586 до н.э.',
    description: [
      'От объединённого царства Давида до падения Иерусалима',
      'Параллельная история двух царств и служение пророков',
      '~425 лет истории народа Божьего'
    ]
  },

  // Обзор и легенда
  {
    type: 'timeline-overview',
    title: 'Как читать временную шкалу',
    legends: [
      { label: 'Иуда', color: 'blue', description: 'Южное царство, 2 колена, столица — Иерусалим' },
      { label: 'Израиль', color: 'orange', description: 'Северное царство, 10 колен, столица — Самария' },
      { label: 'Добрый царь', color: 'green', description: 'Делал угодное в очах Господа' },
      { label: 'Злой царь', color: 'red', description: 'Делал неугодное в очах Господа' },
      { label: 'Пророк', color: 'purple', description: 'Служитель Божий, возвещающий волю Господа' }
    ],
    note: 'Все даты приблизительные. Некоторые цари правили совместно (соправление).'
  },

  // Эпоха: Объединённое царство
  {
    type: 'timeline-era',
    era: eras[0],
    causes: [
      'Народ просил царя, как у других народов',
      'Саул отвергнут за непослушание',
      'Давид помазан как царь по сердцу Бога'
    ],
    consequences: [
      'Иерусалим становится столицей',
      'Ковчег перенесён в Иерусалим',
      'Обетование о вечном царстве Давида'
    ]
  },

  // Давид
  {
    type: 'king-profile',
    king: kingsOfJudah[0],
    details: [
      'Пастух из Вифлеема, помазанный Самуилом',
      'Победил Голиафа верой в Бога',
      'Объединил все 12 колен, сделал Иерусалим столицей',
      'Написал многие псалмы, прославляющие Бога',
      'Получил обетование о вечной династии (2 Цар. 7)'
    ],
    scriptures: [
      { text: 'Нашёл Я мужа по сердцу Моему, Давида, который исполнит все хотения Мои.', reference: 'Деян. 13:22' },
      { text: 'Утвердится дом твой и царство твоё навеки.', reference: '2 Цар. 7:16' }
    ]
  },

  // Соломон
  {
    type: 'king-profile',
    king: kingsOfJudah[1],
    details: [
      'Попросил у Бога мудрость, а не богатство',
      'Построил величественный Храм в Иерусалиме',
      'Автор Притчей, Екклесиаста, Песни Песней',
      'В старости сердце уклонилось к чужим богам',
      'Бог сказал, что разделит царство после него'
    ],
    scriptures: [
      { text: 'Я дал тебе сердце мудрое и разумное, так что подобного тебе не было прежде тебя.', reference: '3 Цар. 3:12' },
      { text: 'За то, что ты не сохранил завета Моего... Я отторгну от тебя царство.', reference: '3 Цар. 11:11' }
    ]
  },

  // Эпоха: Разделение царства
  {
    type: 'timeline-era',
    era: eras[1],
    causes: [
      'Соломон ввёл тяжёлые налоги и повинности',
      'Сердце Соломона уклонилось к идолам',
      'Ровоам отверг совет старейшин'
    ],
    consequences: [
      '10 колен отделились под властью Иеровоама',
      '2 колена (Иуда и Вениамин) остались с Ровоамом',
      'Иеровоам установил золотых тельцов в Вефиле и Дане'
    ]
  },

  // Timeline: 930-850
  // For BC dates: include if endYear <= periodStart AND startYear >= periodEnd
  {
    type: 'timeline',
    title: 'Разделённое царство (930–850 до н.э.)',
    startYear: 930,
    endYear: 850,
    kings: [
      ...kingsOfJudah.filter(k => k.endYear <= 930 && k.startYear >= 850),
      ...kingsOfIsrael.filter(k => k.endYear <= 930 && k.startYear >= 850)
    ],
    prophets: prophets.filter(p => p.endYear <= 930 && p.startYear >= 850)
  },

  // Илия
  {
    type: 'prophet-profile',
    prophet: prophets.find(p => p.name === 'Илия')!,
    details: [
      'Явился внезапно, как молния',
      'Закрыл небо на 3,5 года',
      'Противостоял 450 пророкам Ваала на горе Кармил',
      'Вознесён на небо на огненной колеснице',
      'Вернётся перед великим днём Господним (Мал. 4:5)'
    ],
    keyVerse: {
      text: 'Господь есть Бог, Господь есть Бог!',
      reference: '3 Цар. 18:39'
    }
  },

  // Timeline: 850-750
  // For BC dates: include if endYear <= periodStart AND startYear >= periodEnd
  {
    type: 'timeline',
    title: 'Эпоха пророков (850–750 до н.э.)',
    startYear: 850,
    endYear: 750,
    kings: [
      ...kingsOfJudah.filter(k => k.endYear <= 850 && k.startYear >= 750),
      ...kingsOfIsrael.filter(k => k.endYear <= 850 && k.startYear >= 750)
    ],
    prophets: prophets.filter(p => p.endYear <= 850 && p.startYear >= 750)
  },

  // Елисей
  {
    type: 'prophet-profile',
    prophet: prophets.find(p => p.name === 'Елисей')!,
    details: [
      'Получил двойную порцию духа Илии',
      'Совершил множество чудес милости',
      'Исцелил Неемана Сириянина от проказы',
      'Служил при 6 царях Израиля',
      'Даже его кости воскресили мёртвого'
    ],
    keyVerse: {
      text: 'Дух, который в Илии, почивает на Елисее.',
      reference: '4 Цар. 2:15'
    }
  },

  // Timeline: 750-722
  // For BC dates: include if endYear <= periodStart AND startYear >= periodEnd
  {
    type: 'timeline',
    title: 'Закат Израиля (750–722 до н.э.)',
    startYear: 750,
    endYear: 722,
    kings: [
      ...kingsOfJudah.filter(k => k.endYear <= 750 && k.startYear >= 722),
      ...kingsOfIsrael.filter(k => k.endYear <= 750 && k.startYear >= 722)
    ],
    prophets: prophets.filter(p => p.endYear <= 750 && p.startYear >= 722)
  },

  // Эпоха: Падение Самарии
  {
    type: 'timeline-era',
    era: eras[2],
    causes: [
      '200 лет непрерывного идолопоклонства',
      'Все 19 царей были злыми',
      'Отвергли предупреждения пророков'
    ],
    consequences: [
      'Ассирия переселила народ в другие земли',
      '10 колен рассеяны, смешаны с язычниками',
      'Только Иуда остаётся как народ Божий'
    ]
  },

  // Исаия
  {
    type: 'prophet-profile',
    prophet: prophets.find(p => p.name === 'Исаия')!,
    details: [
      'Видел Господа на престоле высоком',
      'Служил при 4 царях Иуды около 60 лет',
      'Пророчествовал о Мессии-Рабе подробнее всех',
      'Предсказал непорочное зачатие (7:14)',
      'Описал страдания Христа за 700 лет (гл. 53)'
    ],
    keyVerse: {
      text: 'Свят, свят, свят Господь Саваоф! Вся земля полна славы Его!',
      reference: 'Ис. 6:3'
    }
  },

  // Езекия
  {
    type: 'king-profile',
    king: kingsOfJudah.find(k => k.name === 'Езекия')!,
    details: [
      'Один из величайших царей Иуды',
      'Очистил и освятил Храм в первый месяц царствования',
      'Праздновал Пасху со всем Израилем',
      'Разрушил медного змея, которому поклонялись',
      'Бог защитил Иерусалим от Сеннахирима (185 000 убито)'
    ],
    scriptures: [
      { text: 'На Господа, Бога Израилева, уповал он.', reference: '4 Цар. 18:5' },
      { text: 'За этот город Я буду стоять, чтобы спасти его.', reference: '4 Цар. 19:34' }
    ]
  },

  // Timeline: 722-640
  // For BC dates: include if endYear <= periodStart AND startYear >= periodEnd
  {
    type: 'timeline',
    title: 'Иуда один (722–640 до н.э.)',
    startYear: 722,
    endYear: 640,
    kings: kingsOfJudah.filter(k => k.endYear <= 722 && k.startYear >= 640),
    prophets: prophets.filter(p => p.endYear <= 722 && p.startYear >= 640)
  },

  // Иосия
  {
    type: 'king-profile',
    king: kingsOfJudah.find(k => k.name === 'Иосия')!,
    details: [
      'Стал царём в 8 лет',
      'В 16 лет начал искать Бога',
      'В 20 лет начал очищать Иуду от идолов',
      'В 26 лет нашёл книгу Закона в Храме',
      'Провёл величайшую реформу, обновил завет с Богом'
    ],
    scriptures: [
      { text: 'Не было до него царя, подобного ему, который обратился бы к Господу всем сердцем своим.', reference: '4 Цар. 23:25' }
    ]
  },

  // Иеремия
  {
    type: 'prophet-profile',
    prophet: prophets.find(p => p.name === 'Иеремия')!,
    details: [
      'Призван пророчествовать ещё во чреве матери',
      'Служил 40 лет, предупреждая о разрушении',
      'Назван «плачущим пророком»',
      'Пророчествовал о Новом Завете (31:31-34)',
      'Видел падение Иерусалима'
    ],
    keyVerse: {
      text: 'Вот наступают дни... когда Я заключу с домом Израиля новый завет.',
      reference: 'Иер. 31:31'
    }
  },

  // Timeline: 640-586
  // For BC dates: startYear >= endYear (e.g., 640 >= 586)
  // Include if: endYear <= periodStart (ended not before period start) AND startYear >= periodEnd (started not after period end)
  {
    type: 'timeline',
    title: 'Последние годы Иуды (640–586 до н.э.)',
    startYear: 640,
    endYear: 586,
    kings: kingsOfJudah.filter(k => k.endYear <= 640 && k.startYear >= 586),
    prophets: prophets.filter(p => p.endYear <= 640 && p.startYear >= 586)
  },

  // Эпоха: Падение Иерусалима
  {
    type: 'timeline-era',
    era: eras[3],
    causes: [
      'Поколение после Иосии вернулось к идолопоклонству',
      'Иоаким сжёг свиток пророчества Иеремии',
      'Седекия восстал против Вавилона'
    ],
    consequences: [
      'Храм Соломона сожжён',
      'Народ уведён в Вавилонский плен на 70 лет',
      'Но Бог обещал восстановление (Иер. 29:10)'
    ]
  },

  // Заключение — полная временная шкала
  {
    type: 'timeline',
    title: 'Полная хронология (1010–586 до н.э.)',
    startYear: 1010,
    endYear: 586,
    kings: [...kingsOfJudah, ...kingsOfIsrael],
    prophets: prophets
  }
];

// Экспорт количества слайдов
export const kingsProphetsLength = kingsProphets.length;
