import SalvationThumbnail from "@/assets/salvation-thumbnail.png";
import BaptismImage from "@/assets/baptism.png";
import CrucifixionImage from "@/assets/crucifixion.png";
import EmptyTombImage from "@/assets/empty-tomb.png";
import ResurrectionImage from "@/assets/resurrection.jpeg";

// ============= ИНТЕРФЕЙСЫ СЛАЙДОВ ДРАМЫ =============

export type DramaIntensity = 'low' | 'medium' | 'high' | 'climax';

// Основной слайд для сцен драмы
export interface DramaSceneSlide {
  type: 'drama-scene';
  actNumber: string;           // "Акт I" или "Вступление"
  sceneTitle: string;          // "Статус-кво: Состояние мира"
  dynamic: string;             // "Статика и безнадёжность" — бейдж
  plot: string[];              // Описание сюжета
  thesis: string;              // Тезис — ПЕЧАТАЕТСЯ ДИНАМИЧЕСКИ
  focus: {
    references: string[];      // ["Ин. 1:4-5, 9-11", "Мф. 3:2"]
    explanation?: string;      // Опциональное пояснение
  };
  intensity: DramaIntensity;
  image?: string;
}

// Титульный слайд для начала акта
export interface DramaActSlide {
  type: 'drama-act';
  actNumber: string;           // "Акт I" | "Вступление" | "Финал"
  actName: string;             // "Вторжение" | "Эскалация" | "Кульминация"
  subtitle?: string;           // Опциональный подзаголовок
  verse?: {
    text: string;
    reference: string;
  };
}

// Специальный слайд для кульминации (Крест, Воскресение)
export interface DramaClimaxSlide {
  type: 'drama-climax';
  title: string;               // "Распятие: Суд и Оправдание"
  moment: 'darkness' | 'resurrection';
  statements: string[];        // Ключевые утверждения (появляются по очереди)
  cry?: string;                // Центральный возглас ("Совершилось!")
  focus: {
    references: string[];
    significance: string;      // Богословское значение — печатается динамически
  };
}

// Слайд с фокусом на изображении
export interface DramaImageSlide {
  type: 'drama-image';
  actNumber: string;           // "Акт I"
  title: string;               // Короткий заголовок
  image: string;               // Изображение — центральный элемент
  caption?: string;            // Подпись к изображению
  verse?: {
    text: string;
    reference: string;
  };
  intensity: DramaIntensity;
}

// Слайд с фокусом на тексте Писания
export interface DramaScriptureSlide {
  type: 'drama-scripture';
  actNumber: string;
  verses: {
    number?: string;
    text: string;
  }[];
  reference: string;
  context?: string;            // Краткий контекст
  intensity: DramaIntensity;
}

// Слайд с двумя колонками для сравнения
export interface DramaParallelSlide {
  type: 'drama-parallel';
  actNumber: string;
  title: string;
  left: {
    label: string;             // "Адам" | "Грех" | "Закон"
    content: string[];
    tone: 'dark' | 'neutral';
  };
  right: {
    label: string;             // "Христос" | "Благодать" | "Евангелие"
    content: string[];
    tone: 'light' | 'neutral';
  };
  conclusion?: string;
  intensity: DramaIntensity;
}

export type RedemptionDramaSlide = DramaSceneSlide | DramaActSlide | DramaClimaxSlide | DramaImageSlide | DramaScriptureSlide | DramaParallelSlide;

// ============= СЕКЦИЯ: ВСТУПЛЕНИЕ =============

export const introSlides: RedemptionDramaSlide[] = [
  {
    type: 'drama-act',
    actNumber: 'Вступление',
    actName: 'Сцена и Контекст',
    subtitle: 'Драма Искупления',
    verse: {
      text: 'И свет во тьме светит, и тьма не объяла его.',
      reference: 'Ин. 1:5'
    }
  },
  {
    type: 'drama-scene',
    actNumber: 'Вступление',
    sceneTitle: 'Статус-кво: Состояние мира',
    dynamic: 'Статика и безнадёжность',
    plot: [
      'Мир лежит во тьме. Грех — это не просто проступок, а состояние отчуждения.',
      'Молчание небес прерывается. Иоанн Креститель готовит путь.'
    ],
    thesis: 'Спасение начинается с осознания диагноза.',
    focus: {
      references: ['Ин. 1:4-5, 9-11', 'Мф. 3:2'],
      explanation: 'Свет пришёл к своим, и свои не приняли. Призыв к покаянию — смене мышления.'
    },
    intensity: 'low'
  }
];

// ============= СЕКЦИЯ: АКТ I — ВТОРЖЕНИЕ =============

export const act1Slides: RedemptionDramaSlide[] = [
  {
    type: 'drama-act',
    actNumber: 'Акт I',
    actName: 'Вторжение',
    subtitle: 'Начало служения',
    verse: {
      text: 'Вот Агнец Божий, Который берёт на Себя грех мира.',
      reference: 'Ин. 1:29'
    }
  },
  {
    type: 'drama-scene',
    actNumber: 'Акт I',
    sceneTitle: 'Прологи и родословные',
    dynamic: 'История греха и обетование спасения',
    plot: [
      'Родословия: Иисус вписан в грешную, сломанную историю Израиля — Давид, Вирсавия, язычницы.',
      '«Он спасёт народ Свой от грехов их» — тема спасения заявлена с первого стиха о рождении.'
    ],
    thesis: 'Вектор всей истории — Агнец Божий, берущий на Себя грех мира.',
    focus: {
      references: ['Мф. 1:1-17', 'Лк. 3:23-38', 'Ин. 1:1-18', 'Мк. 1:1'],
      explanation: 'Мф. 1:21 — спасение от грехов; Ин. 1:29 — Агнец Божий.'
    },
    intensity: 'low'
  },
  {
    type: 'drama-scene',
    actNumber: 'Акт I',
    sceneTitle: 'Рождение Иисуса: свет в тьме',
    dynamic: 'Божье вторжение в падший мир',
    plot: [
      'Песнь Захарии: «дать народу Его познание спасения в прощении грехов».',
      'Рождение Спасителя в бедности и унижении — Бог входит в реальную человеческую сломленность.'
    ],
    thesis: 'Мотив тьмы и света: мир во тьме, Бог посылает Свет.',
    focus: {
      references: ['Мф. 1-2', 'Лк. 1-2', 'Лк. 1:68-79', 'Ин. 1:5,9'],
    },
    intensity: 'low'
  },
  {
    type: 'drama-scene',
    actNumber: 'Акт I',
    sceneTitle: 'Юность Иисуса: единственный безгрешный Сын',
    dynamic: 'Контраст с непослушанием человечества',
    plot: [
      'Послушание Иисуса Отцу в отличие от непослушания Израиля и всего человечества.',
      'Он — истинный Сын, который исполнит то, в чём все остальные согрешили.'
    ],
    thesis: 'Иисус — образец послушания там, где всё человечество провалилось.',
    focus: {
      references: ['Лк. 2:41-52'],
      explanation: '«Мне должно быть в том, что принадлежит Отцу Моему.»'
    },
    intensity: 'low'
  },
  {
    type: 'drama-image',
    actNumber: 'Акт I',
    title: 'Крещение: Солидарность со грешниками',
    image: BaptismImage,
    caption: 'Святой становится в один ряд с грешными',
    verse: {
      text: 'Ибо так надлежит нам исполнить всякую правду.',
      reference: 'Мф. 3:15'
    },
    intensity: 'medium'
  },
  {
    type: 'drama-scene',
    actNumber: 'Акт I',
    sceneTitle: 'Идентификация: Иисус входит в воды грешников',
    dynamic: 'Солидарность. Святой в ряду с грешными',
    plot: [
      'Крещение Иисуса — Святой становится в один ряд с грешными.',
      'Спасение — это не «вытягивание» сверху, а схождение вниз.'
    ],
    thesis: 'Иисус берёт на себя идентификацию с грешным человечеством.',
    focus: {
      references: ['Мф. 3:13-17', 'Мк. 1:9-11', 'Лк. 3:21-22'],
      explanation: '«Ибо так надлежит нам исполнить всякую правду» (Мф. 3:15).'
    },
    intensity: 'medium'
  },
  {
    type: 'drama-scene',
    actNumber: 'Акт I',
    sceneTitle: 'Искушение в пустыне: начало победы над грехом',
    dynamic: 'Победа там, где Адам и Израиль пали',
    plot: [
      'Иисус — новый Адам и новый Израиль, проходящий испытания без падения.',
      'Победа над сатаной на уровне искушения — фундамент для последующей победы над грехом и смертью.'
    ],
    thesis: 'Искушение — первая битва в войне против греха.',
    focus: {
      references: ['Мф. 4:1-11', 'Мк. 1:12-13', 'Лк. 4:1-13'],
      explanation: 'Три искушения — тело, гордость, власть. Победа Словом Божьим.'
    },
    intensity: 'medium'
  },
  {
    type: 'drama-scene',
    actNumber: 'Акт I',
    sceneTitle: 'Диагностика: Переопределение греха',
    dynamic: 'Углубление конфликта. От внешнего к внутреннему',
    plot: [
      'Нагорная проповедь и конфликты с фарисеями.',
      'Иисус показывает, что грех — это не «грязные руки», а «грязное сердце».'
    ],
    thesis: 'Закон не спасает, он лишь вскрывает рану.',
    focus: {
      references: ['Мф. 5-7', 'Мк. 2:17'],
      explanation: '«Вы слышали... а Я говорю вам...» Гнев = убийство, вожделение = прелюбодеяние. «Я пришёл призвать не праведников, но грешников».'
    },
    intensity: 'medium'
  },
  {
    type: 'drama-parallel',
    actNumber: 'Акт I',
    title: 'Нагорная проповедь: Новый стандарт',
    left: {
      label: 'Вы слышали...',
      content: ['Не убивай', 'Не прелюбодействуй', 'Око за око'],
      tone: 'dark'
    },
    right: {
      label: 'А Я говорю вам...',
      content: ['Гнев = убийство', 'Вожделение = прелюбодеяние', 'Любите врагов'],
      tone: 'light'
    },
    conclusion: 'Закон вскрывает рану, благодать исцеляет.',
    intensity: 'medium'
  }
];

// ============= СЕКЦИЯ: АКТ II — ЭСКАЛАЦИЯ =============

export const act2Slides: RedemptionDramaSlide[] = [
  {
    type: 'drama-act',
    actNumber: 'Акт II',
    actName: 'Эскалация',
    subtitle: 'Нарастание напряжения',
    verse: {
      text: 'Сыну Человеческому должно много пострадать.',
      reference: 'Мк. 8:31'
    }
  },
  {
    type: 'drama-scene',
    actNumber: 'Акт II',
    sceneTitle: 'Призыв учеников: спасение как призыв следовать',
    dynamic: 'Выход из прежней жизни',
    plot: [
      'Оставить прежнюю жизнь, «сети» — выход из прежнего пути греха и самодостаточности.',
      'Призыв не только «оставить грехи», но войти в новое призвание.'
    ],
    thesis: 'Спасение — это не только «от чего», но и «для чего».',
    focus: {
      references: ['Мф. 4:18-22', 'Мк. 1:16-20', 'Лк. 5:1-11', 'Ин. 1:35-51'],
    },
    intensity: 'medium'
  },
  {
    type: 'drama-scene',
    actNumber: 'Акт II',
    sceneTitle: 'Демонстрация: Наступление Царства на последствия греха',
    dynamic: 'Активное действие. Спасение как реставрация',
    plot: [
      'Чудеса исцеления, изгнание бесов, воскрешение мёртвых.',
      'Грех принёс болезнь, смерть и одержимость. Иисус физически демонстрирует, как выглядит Спасение.'
    ],
    thesis: 'Исцеление тела — знак исцеления души. Сначала «прощаются грехи», потом «встань и иди».',
    focus: {
      references: ['Мк. 2:1-12'],
      explanation: 'Связь духовной причины и физического следствия. Власть прощать грехи.'
    },
    intensity: 'medium'
  },
  {
    type: 'drama-scene',
    actNumber: 'Акт II',
    sceneTitle: 'Точка невозврата: Тень Креста',
    dynamic: 'Поворот сюжета. От популярности к отвержению',
    plot: [
      'Исповедание Петра и первое предсказание о страстях.',
      'Иисус «твёрдо обращает лицо к Иерусалиму». Ученики ждут политического триумфа, Иисус идёт на казнь.'
    ],
    thesis: 'Спасение невозможно без Жертвы.',
    focus: {
      references: ['Мк. 8:27-33', 'Лк. 9:51'],
      explanation: 'Пётр протестует против страданий. Непонимание природы Спасения даже ближайшими учениками.'
    },
    intensity: 'high'
  },
  {
    type: 'drama-scene',
    actNumber: 'Акт II',
    sceneTitle: 'Пик конфликта: Религиозный грех vs. Божья Благодать',
    dynamic: 'Открытая конфронтация',
    plot: [
      'Притчи о виноградарях, обличение книжников, очищение Храма.',
      'Самый страшный грех — религиозная гордыня, которая отвергает Спасителя, считая себя здоровой.'
    ],
    thesis: 'Религиозность без покаяния — худшая форма греха.',
    focus: {
      references: ['Мф. 23', 'Ин. 8:31-59'],
      explanation: '«Горе вам, книжники и фарисеи, лицемеры!» Спор об отцовстве дьявола.'
    },
    intensity: 'high'
  }
];

// ============= СЕКЦИЯ: АКТ III — КУЛЬМИНАЦИЯ =============

export const act3Slides: RedemptionDramaSlide[] = [
  {
    type: 'drama-act',
    actNumber: 'Акт III',
    actName: 'Кульминация',
    subtitle: 'Страстная неделя',
    verse: {
      text: 'Душа Моя скорбит смертельно.',
      reference: 'Мф. 26:38'
    }
  },
  {
    type: 'drama-scene',
    actNumber: 'Акт III',
    sceneTitle: 'Чаша: Вес греха',
    dynamic: 'Предельное давление. Битва воли',
    plot: [
      'Гефсимания. Ужас не перед физической смертью, а перед «Чашей» гнева Божьего на грех.',
      'Иисус добровольно принимает на Себя проклятие. Человеческое естество содрогается перед бездной греха.'
    ],
    thesis: 'В Гефсимании решалась судьба человечества — не на Голгофе.',
    focus: {
      references: ['Лк. 22:39-46', 'Мф. 26:36-46'],
      explanation: 'Кровавый пот (Лк. 22:44). «Да минует Меня чаша сия; впрочем не как Я хочу, но как Ты».'
    },
    intensity: 'climax'
  },
  {
    type: 'drama-scripture',
    actNumber: 'Акт III',
    verses: [
      { text: 'Душа Моя скорбит смертельно; побудьте здесь и бодрствуйте со Мною.' },
      { text: 'Отче Мой! если возможно, да минует Меня чаша сия; впрочем не как Я хочу, но как Ты.' }
    ],
    reference: 'Мф. 26:38-39',
    context: 'Гефсимания. Последние часы перед арестом.',
    intensity: 'climax'
  },
  {
    type: 'drama-image',
    actNumber: 'Акт III',
    title: 'Голгофа',
    image: CrucifixionImage,
    caption: 'Место черепа. Проклятие за нас.',
    verse: {
      text: 'Он грехи наши Сам вознёс телом Своим на древо.',
      reference: '1 Пет. 2:24'
    },
    intensity: 'climax'
  },
  {
    type: 'drama-climax',
    title: 'Распятие: Суд и Оправдание',
    moment: 'darkness',
    statements: [
      'Абсолютный мрак. Кажущееся поражение Бога.',
      'В одной точке сходятся вершина человеческого Греха (богоубийство) и вершина Божьего Спасения (жертвенная любовь).',
      'Тьма покрыла землю. Бог отвернулся от Сына, несущего грех мира.'
    ],
    cry: 'Совершилось!',
    focus: {
      references: ['Ин. 19:30', 'Мф. 27:45-51'],
      significance: 'Tetelestai — долг уплачен. Разрыв завесы — доступ открыт, проблема разделения решена навсегда.'
    }
  }
];

// ============= СЕКЦИЯ: ФИНАЛ — РАЗВЯЗКА =============

export const finaleSlides: RedemptionDramaSlide[] = [
  {
    type: 'drama-act',
    actNumber: 'Финал',
    actName: 'Развязка и Новая Реальность',
    subtitle: 'После тьмы — Свет',
    verse: {
      text: 'Смерть! где твоё жало? ад! где твоя победа?',
      reference: '1 Кор. 15:55'
    }
  },
  {
    type: 'drama-climax',
    title: 'Воскресение: Победа над возмездием греха',
    moment: 'resurrection',
    statements: [
      'Взрыв жизни. Неожиданный поворот.',
      'Пустая гробница. Смерть — главное последствие греха — побеждена.',
      'Спасение подтверждено. Это не просто прощение, это Новая Жизнь.'
    ],
    cry: 'Он воскрес!',
    focus: {
      references: ['1 Кор. 15:17', 'Ин. 20-21'],
      significance: 'Если Христос не воскрес, вы ещё во грехах ваших. Восстановление Петра — как благодать работает с тем, с чем мы не справились.'
    }
  },
  {
    type: 'drama-image',
    actNumber: 'Финал',
    title: 'Воскресение Христа',
    image: ResurrectionImage,
    caption: 'Победитель смерти. Первенец из мёртвых.',
    verse: {
      text: 'Я есмь воскресение и жизнь',
      reference: 'Ин. 11:25'
    },
    intensity: 'climax'
  },
  {
    type: 'drama-image',
    actNumber: 'Финал',
    title: 'Пустая гробница',
    image: EmptyTombImage,
    caption: 'Смерть побеждена. Камень отвален.',
    verse: {
      text: 'Его нет здесь — Он воскрес!',
      reference: 'Мф. 28:6'
    },
    intensity: 'climax'
  },
  {
    type: 'drama-scene',
    actNumber: 'Финал',
    sceneTitle: 'Поручение: Динамика продолжается',
    dynamic: 'От центростремительной к центробежной',
    plot: [
      'Великое поручение. Вознесение.',
      'От «все идут к Иисусу» к «ученики идут в мир». Церковь получает власть «связывать и разрешать».'
    ],
    thesis: 'Спасение получено, чтобы быть переданным. Прощение грехов — во всех народах.',
    focus: {
      references: ['Мф. 28:18-20', 'Лк. 24:47', 'Деян. 1:8'],
      explanation: '«Проповедану быть покаянию и прощению грехов во всех народах, начиная с Иерусалима».'
    },
    intensity: 'medium'
  }
];

// ============= СТРУКТУРА РАЗДЕЛОВ =============

export interface RedemptionSection {
  id: string;
  name: string;
  slides: RedemptionDramaSlide[];
}

export const redemptionSections: RedemptionSection[] = [
  { id: 'intro', name: 'Вступление', slides: introSlides },
  { id: 'act1', name: 'Акт I: Вторжение', slides: act1Slides },
  { id: 'act2', name: 'Акт II: Эскалация', slides: act2Slides },
  { id: 'act3', name: 'Акт III: Кульминация', slides: act3Slides },
  { id: 'finale', name: 'Финал', slides: finaleSlides }
];

// Все слайды для режима презентации
export const redemptionDrama: RedemptionDramaSlide[] = [
  ...introSlides,
  ...act1Slides,
  ...act2Slides,
  ...act3Slides,
  ...finaleSlides
];

export const redemptionThumbnail = SalvationThumbnail;
