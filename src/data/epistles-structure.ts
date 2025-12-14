import KnowDoImage from "@/assets/know-do.png";
import StatusConditionImage from "@/assets/status-condition.png";
import IntroGloryPowerImage from "@/assets/intro-glory-power.png";
import IntroExampleFollowImage from "@/assets/intro-example-follow.png";
import IntroPromisesFaithImage from "@/assets/intro-promises-faith.png";

export interface Slide {
  type: string;
}

export interface HermeneuticsSlide extends Slide {
  type: 'hermeneutics';
  bookName: string;
  bookNameEn: string;
  knowSection: {
    chapters: string;
    percentage: number;
    themes: string[];
    powerSource?: string;
    powerSourceType?: 'promise' | 'example' | 'glory';
  };
  doSection: {
    chapters: string;
    percentage: number;
    themes: string[];
  };
  keyVerse?: {
    text: string;
    reference: string;
  };
  image?: string;
}

export interface IntroHermeneuticsSlide extends Slide {
  type: 'intro-hermeneutics';
  title: string;
  subtitle: string;
  description: string;
  image: string;
}

export interface ConclusionSlide extends Slide {
  type: 'conclusion';
  title: string;
  points: string[];
  verse?: {
    text: string;
    reference: string;
  };
}

export interface PracticalExampleSlide extends Slide {
  type: 'practical-example';
  title: string;
  scenario: string;
  knowContent: {
    title: string;
    points: string[];
    source?: string;
  };
  doContent: {
    title: string;
    points: string[];
  };
  verse?: {
    text: string;
    reference: string;
  };
}

export interface IntroductionSlide extends Slide {
  type: 'introduction';
  title: string;
  subtitle?: string;
  content: string[];
  image: string;
}

export const epistlesStructure: (IntroHermeneuticsSlide | IntroductionSlide | HermeneuticsSlide | PracticalExampleSlide | ConclusionSlide)[] = [
  {
    type: 'intro-hermeneutics',
    title: 'Знать и Делать',
    subtitle: 'Структура посланий НЗ',
    description: 'Первая половина посланий Павла, Иоанна, Петра говорит: вот что Бог сделал во Христе, вот как Он спас тебя. Вторая половина посланий — вот что ты должен делать в ответ.',
    image: KnowDoImage
  },
  {
    type: 'introduction',
    title: 'Принцип "Знать и Делать"',
    subtitle: 'Как устроены послания НЗ',
    content: [
      'Послания апостолов имеют особую структуру: сначала излагается кто есть Бог, что Он сделал для нас во Христе, какое положение мы занимаем благодаря искуплению.',
      'Только после этого апостолы переходят к практическим наставлениям — как жить в ответ на эту великую истину, какие поступки соответствуют нашему новому статусу во Христе.',
    ],
    image: KnowDoImage
  },
  {
    type: 'introduction',
    title: 'Поступать достойно',
    subtitle: 'Знание своего статуса',
    content: [
      'Можно выделить несколько принципов знания и поступков.',
      'Первый принцип "сначала понимать свой статус — затем приводить свою жизнь в соответствующее состояние"'
    ],
    image: StatusConditionImage
  },
  {
    type: 'introduction',
    title: 'Созерцание славы Божией',
    subtitle: 'Сила для жизни',
    content: [
      'Другой принцип "созерцать славу Божию — затем находить в этом силу для своей жизни"'
    ],
    image: IntroGloryPowerImage
  },
  {
    type: 'introduction',
    title: 'Пример',
    subtitle: 'Следование примеру',
    content: [
      'Еще один принцип "видеть пример — затем затем следовать этому примеру"'
    ],
    image: IntroExampleFollowImage
  },
  {
    type: 'introduction',
    title: 'Пример',
    subtitle: 'Следование примеру',
    content: [
      'Эти принципы пронизывают все послания и являются ключом к правильному пониманию христианской жизни.'
    ],
    image: StatusConditionImage
  },
  {
    type: 'introduction',
    title: 'Обещания',
    subtitle: 'Жизнь верой',
    content: [
      'Заключительный принцип "знать обещания — затем верой прилагать все усилия" также пронизывает все послания и является ключом к правильному пониманию христианской жизни.'
    ],
    image: IntroPromisesFaithImage
  },
  {
    type: 'hermeneutics',
    bookName: 'Римлянам',
    bookNameEn: 'Romans',
    knowSection: {
      chapters: 'Гл. 1-11',
      percentage: 69,
      themes: [
        'Оправдание по вере, а не делами',
        'Дух усыновления, а не рабства и страха',
        'Все содействует ко благу',
        'Обещание прославления тела',
        'Предустановление по избранию',
        'Избрание Израиля'
      ],
      powerSource: 'Пример',
      powerSourceType: 'example'
    },
    doSection: {
      chapters: 'Гл. 12-16',
      percentage: 31,
      themes: [
        'Преобразовываться обновлением ума',
        'Жить по духу, а не по плоти; убивать грех',
        'Считать другого более достойным чести',
        'Жизнь в теле Христа',
        'Отношение к властям',
        'Взаимоотношения в церкви, отношение к немощным в вере'
      ]
    },
    keyVerse: {
      text: 'Итак умоляю вас, братия, милосердием Божиим, представьте тела ваши в жертву живую, святую, благоугодную Богу',
      reference: 'Римлянам 12:1'
    }
  },
  {
    type: 'hermeneutics',
    bookName: '1 Коринфянам',
    bookNameEn: '1 Corinthians',
    knowSection: {
      chapters: 'Гл. 1-4',
      percentage: 25,
      themes: [
        'Единство во Христе',
        'Мудрость Божья - не много вас мудрых по плоти',
        'Дух Божий, а не дух мира',
        'Все что мы имеем - мы получили',
        'Строительство из драгоценных камней'
      ],
      powerSource: 'Созерцание славы',
      powerSourceType: 'glory'
    },
    doSection: {
      chapters: 'Гл. 5-16',
      percentage: 75,
      themes: [
        'Решение проблем церкви',
        'Остановите похоть - убегайте от искушений, убегайте от идолослужения',
        'Духовные дары',
        'Любовь и порядок',
        'Воскресение - преуспевать в деле Господа'
      ]
    },
    keyVerse: {
      text: 'Но я скоро приду к вам, если угодно будет Господу, и испытаю не слова возгордившихся, а силу',
      reference: '1-е Коринфянам 4:19'
    }
  },
  {
    type: 'hermeneutics',
    bookName: '2 Коринфянам',
    bookNameEn: '2 Corinthians',
    knowSection: {
      chapters: 'Гл. 1-7',
      percentage: 54,
      themes: [
        'Утешение в скорбях',
        'Новый завет',
        'Служение примирения'
      ],
      powerSource: 'Обещания',
      powerSourceType: 'promise'
    },
    doSection: {
      chapters: 'Гл. 8-13',
      percentage: 46,
      themes: [
        'Щедрость в даянии',
        'Духовная война',
        'Защита апостольства'
      ]
    },
    keyVerse: {
      text: 'Итак умоляю вас, братия, милосердием Божиим, представьте тела ваши в жертву живую, святую, благоугодную Богу',
      reference: 'Римлянам 12:1'
    }
  },
  {
    type: 'hermeneutics',
    bookName: 'Галатам',
    bookNameEn: 'Galatians',
    knowSection: {
      chapters: 'Гл. 1-4',
      percentage: 67,
      themes: [
        'Евангелие благодати',
        'Оправдание верой',
        'Свобода во Христе'
      ]
    },
    doSection: {
      chapters: 'Гл. 5-6',
      percentage: 33,
      themes: [
        'Хождение в Духе',
        'Плод Духа',
        'Практика свободы'
      ]
    },
    keyVerse: {
      text: 'К свободе призваны вы, братия, только бы свобода ваша не была поводом к угождению плоти',
      reference: 'Галатам 5:13'
    }
  },
  {
    type: 'hermeneutics',
    bookName: 'Ефесянам',
    bookNameEn: 'Ephesians',
    knowSection: {
      chapters: 'Гл. 1-3',
      percentage: 50,
      themes: [
        'Благословения во Христе',
        'Спасение по благодати',
        'Тайна Христа'
      ]
    },
    doSection: {
      chapters: 'Гл. 4-6',
      percentage: 50,
      themes: [
        'Единство церкви',
        'Новая жизнь',
        'Духовное вооружение'
      ]
    },
    keyVerse: {
      text: 'Итак подражайте Богу, как чада возлюбленные, и живите в любви',
      reference: 'Ефесянам 5:1-2'
    }
  },
  {
    type: 'hermeneutics',
    bookName: 'Филиппийцам',
    bookNameEn: 'Philippians',
    knowSection: {
      chapters: 'Гл. 1-2',
      percentage: 50,
      themes: [
        'Радость во Христе',
        'Смирение Христа',
        'Пример служения'
      ]
    },
    doSection: {
      chapters: 'Гл. 3-4',
      percentage: 50,
      themes: [
        'Стремление к цели',
        'Радость и мир',
        'Благодарность'
      ]
    },
    keyVerse: {
      text: 'Радуйтесь всегда в Господе; и еще говорю: радуйтесь!',
      reference: 'Филиппийцам 4:4'
    }
  },
  {
    type: 'hermeneutics',
    bookName: 'Колоссянам',
    bookNameEn: 'Colossians',
    knowSection: {
      chapters: 'Гл. 1-2',
      percentage: 50,
      themes: [
        'Превосходство Христа',
        'Полнота в Нем',
        'Тайна Евангелия'
      ]
    },
    doSection: {
      chapters: 'Гл. 3-4',
      percentage: 50,
      themes: [
        'Новая жизнь',
        'Отношения в семье',
        'Мудрость в общении'
      ]
    },
    keyVerse: {
      text: 'Итак умоляю вас, братия, милосердием Божиим, представьте тела ваши в жертву живую, святую, благоугодную Богу',
      reference: 'Римлянам 12:1'
    }
  },
  {
    type: 'hermeneutics',
    bookName: '1 Фессалоникийцам',
    bookNameEn: '1 Thessalonians',
    knowSection: {
      chapters: 'Гл. 1-3',
      percentage: 60,
      themes: [
        'Пример веры',
        'Служение Павла',
        'Утешение верующих'
      ]
    },
    doSection: {
      chapters: 'Гл. 4-5',
      percentage: 40,
      themes: [
        'Святость жизни',
        'Пришествие Христа',
        'Жизнь в свете'
      ]
    },
    keyVerse: {
      text: 'Итак умоляю вас, братия, милосердием Божиим, представьте тела ваши в жертву живую, святую, благоугодную Богу',
      reference: 'Римлянам 12:1'
    }
  },
  {
    type: 'hermeneutics',
    bookName: '2 Фессалоникийцам',
    bookNameEn: '2 Thessalonians',
    knowSection: {
      chapters: 'Гл. 1-2',
      percentage: 67,
      themes: [
        'Воздаяние Божье',
        'День Господень',
        'Человек греха'
      ]
    },
    doSection: {
      chapters: 'Гл. 3',
      percentage: 33,
      themes: [
        'Молитва и труд',
        'Дисциплина в церкви'
      ]
    },
    keyVerse: {
      text: 'Итак умоляю вас, братия, милосердием Божиим, представьте тела ваши в жертву живую, святую, благоугодную Богу',
      reference: 'Римлянам 12:1'
    }
  },
  {
    type: 'hermeneutics',
    bookName: '1 Тимофею',
    bookNameEn: '1 Timothy',
    knowSection: {
      chapters: 'Гл. 1',
      percentage: 17,
      themes: [
        'Истинное учение',
        'Благодать Христа'
      ]
    },
    doSection: {
      chapters: 'Гл. 2-6',
      percentage: 83,
      themes: [
        'Молитва и поклонение',
        'Служители церкви',
        'Наставления пастору',
        'Богатство и благочестие'
      ]
    },
    keyVerse: {
      text: 'Итак умоляю вас, братия, милосердием Божиим, представьте тела ваши в жертву живую, святую, благоугодную Богу',
      reference: 'Римлянам 12:1'
    }
  },
  {
    type: 'hermeneutics',
    bookName: '2 Тимофею',
    bookNameEn: '2 Timothy',
    knowSection: {
      chapters: 'Гл. 1-2',
      percentage: 50,
      themes: [
        'Дар Божий',
        'Верность Христу',
        'Образец здравого учения'
      ]
    },
    doSection: {
      chapters: 'Гл. 3-4',
      percentage: 50,
      themes: [
        'Трудные времена',
        'Проповедь Слова',
        'Венец правды'
      ]
    },
    keyVerse: {
      text: 'Итак умоляю вас, братия, милосердием Божиим, представьте тела ваши в жертву живую, святую, благоугодную Богу',
      reference: 'Римлянам 12:1'
    }
  },
  {
    type: 'hermeneutics',
    bookName: 'Титу',
    bookNameEn: 'Titus',
    knowSection: {
      chapters: 'Гл. 1',
      percentage: 33,
      themes: [
        'Назначение пресвитеров',
        'Здравое учение'
      ]
    },
    doSection: {
      chapters: 'Гл. 2-3',
      percentage: 67,
      themes: [
        'Наставления разным группам',
        'Добрые дела',
        'Благочестивая жизнь'
      ]
    },
    keyVerse: {
      text: 'Итак умоляю вас, братия, милосердием Божиим, представьте тела ваши в жертву живую, святую, благоугодную Богу',
      reference: 'Римлянам 12:1'
    }
  },
  {
    type: 'hermeneutics',
    bookName: 'Евреям',
    bookNameEn: 'Hebrews',
    knowSection: {
      chapters: 'Гл. 1-10',
      percentage: 77,
      themes: [
        'Превосходство Христа',
        'Новое священство',
        'Новый завет',
        'Совершенная жертва'
      ]
    },
    doSection: {
      chapters: 'Гл. 11-13',
      percentage: 23,
      themes: [
        'Примеры веры',
        'Устремление к цели',
        'Практика христианской жизни'
      ]
    },
    keyVerse: {
      text: 'Вера же есть осуществление ожидаемого и уверенность в невидимом',
      reference: 'Евреям 11:1'
    }
  },
  {
    type: 'hermeneutics',
    bookName: '1 Петра',
    bookNameEn: '1 Peter',
    knowSection: {
      chapters: 'Гл. 1-2',
      percentage: 40,
      themes: [
        'Живая надежда',
        'Святой народ',
        'Избранные Богом'
      ]
    },
    doSection: {
      chapters: 'Гл. 3-5',
      percentage: 60,
      themes: [
        'Отношения в семье',
        'Страдания за Христа',
        'Служение и смирение'
      ]
    },
    keyVerse: {
      text: 'Итак умоляю вас, братия, милосердием Божиим, представьте тела ваши в жертву живую, святую, благоугодную Богу',
      reference: 'Римлянам 12:1'
    }
  },
  {
    type: 'hermeneutics',
    bookName: '2 Петра',
    bookNameEn: '2 Peter',
    knowSection: {
      chapters: 'Гл. 1',
      percentage: 33,
      themes: [
        'Божественная сила',
        'Надежное пророчество'
      ]
    },
    doSection: {
      chapters: 'Гл. 2-3',
      percentage: 67,
      themes: [
        'Лжеучители',
        'День Господень',
        'Святая жизнь'
      ]
    },
    keyVerse: {
      text: 'Итак умоляю вас, братия, милосердием Божиим, представьте тела ваши в жертву живую, святую, благоугодную Богу',
      reference: 'Римлянам 12:1'
    }
  },
  {
    type: 'practical-example',
    title: 'Прощение в отношениях',
    scenario: 'Кто-то обидел вас или предал ваше доверие',
    knowContent: {
      title: 'ЗНАТЬ',
      points: [
        'Бог простил вас во Христе, несмотря на все ваши грехи',
        'Христос умер за грешников, когда мы были ещё врагами Богу',
        'Мы прощены не за наши заслуги, но по благодати'
      ],
      source: 'Ефесянам 4:32; Римлянам 5:8'
    },
    doContent: {
      title: 'ДЕЛАТЬ',
      points: [
        'Прощать других, как Христос простил вас',
        'Не держать обиду и не мстить',
        'Молиться за обидчика и желать ему добра'
      ]
    },
    verse: {
      text: 'Будьте друг ко другу добры, сострадательны, прощайте друг друга, как и Бог во Христе простил вас',
      reference: 'Ефесянам 4:32'
    }
  },
  {
    type: 'practical-example',
    title: 'Борьба с тревогой',
    scenario: 'Вы переживаете о будущем, работе, здоровье или финансах',
    knowContent: {
      title: 'ЗНАТЬ',
      points: [
        'Бог заботится о вас и знает все ваши нужды',
        'Бог даёт мир, который превосходит всякое понимание',
        'Ничто не отлучит вас от любви Божией во Христе Иисусе'
      ],
      source: '1 Петра 5:7; Филиппийцам 4:6-7; Римлянам 8:38-39'
    },
    doContent: {
      title: 'ДЕЛАТЬ',
      points: [
        'Возложить все заботы на Бога в молитве',
        'Благодарить Бога за то, что уже имеете',
        'Сосредоточиться на Божьих обетованиях, а не на обстоятельствах'
      ]
    },
    verse: {
      text: 'Все заботы ваши возложите на Него, ибо Он печется о вас',
      reference: '1 Петра 5:7'
    }
  },
  {
    type: 'practical-example',
    title: 'Служение другим',
    scenario: 'Вы устали, перегружены, хочется думать только о себе',
    knowContent: {
      title: 'ЗНАТЬ',
      points: [
        'Христос не пришёл, чтобы Ему служили, но чтобы послужить',
        'Христос смирил Себя, приняв образ раба',
        'Любовь Христа побуждает нас жить не для себя'
      ],
      source: 'Марка 10:45; Филиппийцам 2:5-8; 2 Коринфянам 5:14-15'
    },
    doContent: {
      title: 'ДЕЛАТЬ',
      points: [
        'Искать возможности служить другим',
        'Ставить нужды других выше своих собственных',
        'Делать добро без ожидания награды или признания'
      ]
    },
    verse: {
      text: 'Ничего не делайте по любопрению или по тщеславию, но по смиренномудрию почитайте один другого высшим себя',
      reference: 'Филиппийцам 2:3'
    }
  },
  {
    type: 'conclusion',
    title: 'Знать и Делать',
    points: [
      'Библейская вера — это не просто набор фактов, а живые отношения с Богом, которые преображают нашу жизнь',
      'Послания учат нас сначала понять, ЧТО Бог сделал для нас во Христе (доктрина), а затем — КАК нам жить в ответ (практика)',
      'Знание без действия мертво (Иак. 2:17). Действие без знания опасно и может увести в сторону',
      'Баланс "знать и делать" — это ключ к зрелой христианской жизни: глубокое понимание истины ведёт к правильным поступкам'
    ],
    verse: {
      text: 'Будьте же исполнители слова, а не слышатели только, обманывающие самих себя',
      reference: 'Иакова 1:22'
    }
  }
];
