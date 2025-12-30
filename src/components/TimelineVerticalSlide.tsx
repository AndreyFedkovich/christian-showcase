import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Crown, BookOpen, Calendar, ArrowDown } from 'lucide-react';
import { TimelineSlide as TimelineSlideType, King, Prophet } from '@/data/kings-prophets';

// --- CONFIGURATION ---
const PIXELS_PER_YEAR = 15;
const MIN_BLOCK_HEIGHT = 50;
const LANE_WIDTH = 140;
const LANE_GAP = 10;
const COL_GAP = 20;
const AXIS_WIDTH = 80;
const SHORT_KING_THRESHOLD = 3;

interface TimelineSlideProps {
  slide: TimelineSlideType;
  direction: 'next' | 'prev';
}

interface LayoutItem<T> {
  item: T;
  realTop: number;
  renderTop: number;
  height: number;
  lane: number;
  visualEnd: number;
  isCallout: boolean;
}

// --- LOGIC ---
const calculateVerticalLayout = <T extends { startYear: number; endYear: number }>(
    items: T[],
    startYear: number,
    endYear: number,
    isKings: boolean
): LayoutItem<T>[] => {
  if (!items.length) return [];

  // Сортировка
  const sortedItems = [...items].sort((a, b) => {
    if (a.startYear !== b.startYear) return b.startYear - a.startYear;
    return b.endYear - a.endYear;
  });

  const result: LayoutItem<T>[] = [];
  const lanesState: { visualEnd: number; historicalEnd: number }[] = [];

  for (const item of sortedItems) {
    const offsetYears = startYear - item.startYear;

    // 1. Историческая длительность (для логики выносок/isCallout)
    const historicalDuration = Math.max(0.1, item.startYear - item.endYear);

    // 2. Видимая длительность (для расчета высоты блока)
    // Находим пересечение интервала правления [end, start] и интервала слайда [endYear, startYear]
    const visibleStart = Math.min(item.startYear, startYear);
    const visibleEnd = Math.max(item.endYear, endYear);
    const visibleDuration = Math.max(0, visibleStart - visibleEnd);

    const realTop = Math.max(0, offsetYears * PIXELS_PER_YEAR);

    // Высота считается от ВИДИМОЙ части правления
    const naturalHeight = visibleDuration * PIXELS_PER_YEAR;
    const height = Math.max(naturalHeight, MIN_BLOCK_HEIGHT);

    const realBottom = realTop + naturalHeight;

    let renderTop = realTop;
    let assignedLane = 0;
    let isCallout = false;

    if (isKings) {
      // ЛОГИКА ДЛЯ ЦАРЕЙ

      // Используем historicalDuration для определения "короткого" царя
      if (historicalDuration < SHORT_KING_THRESHOLD) {
        isCallout = true;
        assignedLane = 1;
      } else {
        const lane0End = lanesState[0]?.visualEnd || 0;
        const tolerance = PIXELS_PER_YEAR * 0.8;

        if (realTop < lane0End - tolerance) {
          assignedLane = 1;
        } else {
          assignedLane = 0;
        }
      }
    } else {
      // ЛОГИКА ДЛЯ ПРОРОКОВ
      assignedLane = -1;
      for(let i=0; i<lanesState.length; i++) {
        if (realTop >= (lanesState[i]?.historicalEnd || 0) - PIXELS_PER_YEAR) {
          assignedLane = i;
          break;
        }
      }
      if (assignedLane === -1) assignedLane = lanesState.length;
    }

    if (!lanesState[assignedLane]) {
      lanesState[assignedLane] = { visualEnd: 0, historicalEnd: 0 };
    }

    const lane = lanesState[assignedLane];

    if (renderTop < lane.visualEnd + 2) {
      renderTop = lane.visualEnd + 2;
    }

    lane.visualEnd = renderTop + height;
    lane.historicalEnd = realBottom;

    result.push({
      item,
      lane: assignedLane,
      realTop,
      renderTop,
      height,
      visualEnd: renderTop + height,
      isCallout
    });
  }

  return result;
};

// --- HELPERS ---
const getCharacterColor = (character: King['character']) => {
  switch (character) {
    case 'good': return 'bg-emerald-600/90 border-emerald-400 shadow-emerald-900/20';
    case 'evil': return 'bg-red-600/90 border-red-400 shadow-red-900/20';
    case 'mixed': return 'bg-amber-600/90 border-amber-400 shadow-amber-900/20';
    default: return 'bg-slate-600 border-slate-400';
  }
};

const getCharacterBadge = (character: King['character']) => {
  switch (character) {
    case 'good': return 'Благочестивый';
    case 'evil': return 'Нечестивый';
    case 'mixed': return 'Смешанный';
  }
};

// --- COMPONENT ---
const TimelineVerticalSlideComponent = ({ slide }: TimelineSlideProps) => {
  const { title, startYear, endYear, kings, prophets } = slide;

  const judahKings = kings.filter(k => k.kingdom === 'judah');
  const israelKings = kings.filter(k => k.kingdom === 'israel');

  const judahProphets = prophets.filter(p => p.kingdom === 'judah' || (!p.kingdom && ['Исаия', 'Иеремия', 'Иоиль', 'Михей', 'Софония', 'Аввакум'].some(n => p.name.includes(n))));
  const israelProphets = prophets.filter(p => p.kingdom === 'israel' || (!p.kingdom && !judahProphets.includes(p)));

  const judahKingsLayout = calculateVerticalLayout(judahKings, startYear, endYear, true);
  const israelKingsLayout = calculateVerticalLayout(israelKings, startYear, endYear, true);
  const judahProphetsLayout = calculateVerticalLayout(judahProphets, startYear, endYear, false);
  const israelProphetsLayout = calculateVerticalLayout(israelProphets, startYear, endYear, false);

  const totalYears = startYear - endYear;

  const contentHeight = Math.max(
      totalYears * PIXELS_PER_YEAR,
      ...[...judahKingsLayout, ...israelKingsLayout, ...judahProphetsLayout, ...israelProphetsLayout].map(i => i.visualEnd)
  ) + 150;

  const maxJudahLanes = Math.max(1, ...judahKingsLayout.map(i => i.lane + 1));
  const maxIsraelLanes = Math.max(1, ...israelKingsLayout.map(i => i.lane + 1));

  const judahKingsWidth = maxJudahLanes * (LANE_WIDTH + LANE_GAP);
  const israelKingsWidth = maxIsraelLanes * (LANE_WIDTH + LANE_GAP);

  const yearMarkers = useMemo(() => {
    const markers = [];
    const step = 10;
    for (let y = startYear; y >= endYear; y -= step) {
      markers.push({ year: y, top: (startYear - y) * PIXELS_PER_YEAR });
    }
    return markers;
  }, [startYear, endYear]);

  return (
      <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="h-screen w-full bg-slate-900 flex flex-col overflow-hidden text-slate-100 font-sans"
      >
        {/* Header */}
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center mb-4 mt-4 shrink-0"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-2xl mb-2">
            <Calendar className="w-3 h-3" />
            <span>{startYear}–{endYear} до н.э.</span>
          </div>
          <h1 className="text-xl md:text-2xl font-bold text-slate-100">{title}</h1>
        </motion.div>

        {/* SCROLL AREA */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden relative custom-scrollbar bg-[#0f172a]">
          <div className="absolute inset-0 w-full pointer-events-none flex justify-center" style={{ height: contentHeight }}>
            <div className="w-[50%] h-full bg-gradient-to-r from-transparent via-amber-900/5 to-amber-900/10 border-r border-slate-800/50" />
            <div className="w-[50%] h-full bg-gradient-to-l from-transparent via-blue-900/5 to-blue-900/10 border-l border-slate-800/50" />
          </div>

          <div className="relative w-full mx-auto max-w-[1920px]" style={{ height: contentHeight }}>

            {/* JUDAH SECTION */}
            <div
                className="absolute top-0 bottom-0"
                style={{
                  right: `calc(50% + ${AXIS_WIDTH/2}px)`,
                  width: `${judahKingsWidth}px`
                }}
            >
              <div className="absolute -top-8 right-0 flex items-center gap-2 text-amber-500/80 font-bold text-xl whitespace-nowrap z-20">
                ИУДЕЯ <Crown className="w-5 h-5" />
              </div>
              {judahKingsLayout.map((layout) => (
                  <KingCard
                      key={layout.item.name}
                      layout={layout}
                      offset={layout.lane * (LANE_WIDTH + LANE_GAP)}
                      align="right"
                  />
              ))}
            </div>

            <div
                className="absolute top-0 bottom-0"
                style={{
                  right: `calc(50% + ${AXIS_WIDTH/2}px + ${judahKingsWidth}px + ${COL_GAP}px)`,
                  width: '300px'
                }}
            >
              {judahProphetsLayout.map((layout) => (
                  <ProphetCard
                      key={layout.item.name}
                      layout={layout}
                      offset={layout.lane * 120}
                      align="right"
                  />
              ))}
            </div>

            {/* AXIS */}
            <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 border-x border-slate-700/30 bg-slate-900/50 flex flex-col items-center z-10" style={{ width: AXIS_WIDTH }}>
              {yearMarkers.map(({ year, top }) => (
                  <div key={year} className="absolute w-full flex justify-center items-center" style={{ top: `${top}px` }}>
                    <div className="w-2 h-px bg-slate-600 absolute left-0" />
                    <div className="w-2 h-px bg-slate-600 absolute right-0" />
                    <span className="text-xs text-slate-500 font-mono bg-slate-900 px-1">{year}</span>
                  </div>
              ))}
              <div className="sticky top-0 pt-2 pb-4 bg-gradient-to-b from-slate-900 to-transparent w-full flex justify-center z-20">
                <ArrowDown className="w-4 h-4 text-slate-500" />
              </div>
            </div>

            {/* ISRAEL SECTION */}
            <div
                className="absolute top-0 bottom-0"
                style={{
                  left: `calc(50% + ${AXIS_WIDTH/2}px)`,
                  width: `${israelKingsWidth}px`
                }}
            >
              <div className="absolute -top-8 left-0 flex items-center gap-2 text-blue-400/80 font-bold text-xl whitespace-nowrap z-20">
                <Crown className="w-5 h-5" /> ИЗРАИЛЬ
              </div>
              {israelKingsLayout.map((layout) => (
                  <KingCard
                      key={layout.item.name}
                      layout={layout}
                      offset={layout.lane * (LANE_WIDTH + LANE_GAP)}
                      align="left"
                  />
              ))}
            </div>

            <div
                className="absolute top-0 bottom-0"
                style={{
                  left: `calc(50% + ${AXIS_WIDTH/2}px + ${israelKingsWidth}px + ${COL_GAP}px)`,
                  width: '300px'
                }}
            >
              {israelProphetsLayout.map((layout) => (
                  <ProphetCard
                      key={layout.item.name}
                      layout={layout}
                      offset={layout.lane * 120}
                      align="left"
                  />
              ))}
            </div>

          </div>
        </div>
      </motion.div>
  );
};

const KingCard = ({ layout, offset, align }: { layout: LayoutItem<King>, offset: number, align: 'left' | 'right' }) => {
  const { item: king, renderTop, height, isCallout } = layout;

  return (
      <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className={`absolute flex flex-col justify-center px-3 rounded-lg border shadow-lg cursor-pointer group transition-all hover:!z-[100] hover:scale-[1.02] hover:brightness-110 ${getCharacterColor(king.character)}`}
          style={{
            top: `${renderTop}px`,
            height: `${height}px`,
            width: `${LANE_WIDTH}px`,
            [align === 'right' ? 'right' : 'left']: `${offset}px`,
            zIndex: isCallout ? 20 : 10
          }}
      >
        <div className="flex flex-col h-full justify-center w-full relative z-10">
        <span className="font-bold text-white text-[15px] leading-tight mb-1 line-clamp-2">
          {king.name}
        </span>
          <div className="flex items-center text-[11px] text-white/80 font-mono leading-none">
            <span className="whitespace-nowrap">{king.duration}</span>
            <span className="mx-1.5 opacity-40">|</span>
            <span className="whitespace-nowrap">{king.startYear}–{king.endYear}</span>
          </div>
        </div>

        <Tooltip item={king} type="king" align={align} />
      </motion.div>
  );
};

const ProphetCard = ({ layout, offset, align }: { layout: LayoutItem<Prophet>, offset: number, align: 'left' | 'right' }) => {
  const { item: prophet, renderTop, height } = layout;

  return (
      <motion.div
          initial={{ opacity: 0, x: align === 'right' ? -20 : 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="absolute flex items-center justify-center rounded border border-purple-400 bg-purple-600/90 shadow-lg shadow-purple-900/30 cursor-pointer group hover:z-50 transition-transform hover:scale-105"
          style={{
            top: `${renderTop}px`,
            height: `${height}px`,
            width: '110px',
            [align === 'right' ? 'right' : 'left']: `${offset}px`
          }}
      >
        <span className="text-sm font-medium text-white text-center px-1 truncate w-full">{prophet.name}</span>
        <Tooltip item={prophet} type="prophet" align={align} />
      </motion.div>
  );
};

const Tooltip = ({ item, type, align }: { item: any, type: 'king' | 'prophet', align: 'left' | 'right' }) => {
  const positionClass = align === 'right' ? 'right-[105%]' : 'left-[105%]';
  return (
      <div className={`absolute top-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-[60] w-72 p-4 rounded-xl bg-slate-800 border border-slate-600 shadow-2xl ${positionClass}`}>
        <div className="flex flex-col gap-1">
          <div className="flex justify-between items-start">
            <h3 className={`text-lg font-bold ${type === 'king' ? (item.kingdom === 'judah' ? 'text-amber-400' : 'text-blue-400') : 'text-purple-400'}`}>
              {item.name}
            </h3>
            {type === 'king' && (
                <span className={`text-[10px] px-1.5 py-0.5 rounded uppercase tracking-wide ${
                    item.character === 'good' ? 'bg-emerald-500/20 text-emerald-400' :
                        item.character === 'evil' ? 'bg-red-500/20 text-red-400' :
                            'bg-amber-500/20 text-amber-400'
                }`}>
               {getCharacterBadge(item.character)}
             </span>
            )}
          </div>
          <div className="text-sm text-slate-400 font-mono">
            {item.startYear} – {item.endYear} до н.э.
            {type === 'king' && <span className="ml-1 text-slate-500">({item.duration})</span>}
          </div>
          {type === 'king' && (
              <>
                <p className="text-sm text-slate-200 mt-1 leading-snug">{item.characteristic}</p>
                {item.keyEvent && <p className="text-xs text-slate-400 mt-2 italic border-l-2 border-slate-600 pl-2">{item.keyEvent}</p>}
              </>
          )}
          {type === 'prophet' && (
              <>
                <p className="text-sm text-slate-200 mt-1">{item.keyMessage}</p>
                {item.book && <p className="text-xs text-purple-400 mt-2 flex items-center gap-1"><BookOpen className="w-3 h-3"/> Книга: {item.book}</p>}
              </>
          )}
        </div>
      </div>
  );
};

export default TimelineVerticalSlideComponent;
