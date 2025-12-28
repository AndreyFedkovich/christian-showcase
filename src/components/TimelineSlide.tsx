import { motion } from 'framer-motion';
import { Crown, BookOpen, Calendar, ChevronRight } from 'lucide-react';
import { TimelineSlide as TimelineSlideType, King, Prophet } from '@/data/kings-prophets';

interface TimelineSlideProps {
  slide: TimelineSlideType;
  direction: 'next' | 'prev';
}

interface LayoutItem<T> {
  item: T;
  left: number;
  width: number;
  lane: number;
}

// Calculate layout with proper clipping to visible period and lane assignment
const calculateLayout = <T extends { startYear: number; endYear: number }>(
  items: T[],
  periodStart: number,
  periodEnd: number,
  minWidthPercent: number = 3
): LayoutItem<T>[] => {
  const timelineWidth = periodStart - periodEnd;
  
  // Calculate visual positions for each item, clipped to visible period
  const itemsWithPositions = items.map(item => {
    // Clip to visible period (for BC: larger number = earlier)
    const displayStart = Math.min(item.startYear, periodStart); // Can't start before period
    const displayEnd = Math.max(item.endYear, periodEnd); // Can't end after period
    
    // Calculate percentages
    let left = ((periodStart - displayStart) / timelineWidth) * 100;
    let width = ((displayStart - displayEnd) / timelineWidth) * 100;
    
    // Clamp left to valid range
    left = Math.max(0, Math.min(left, 100));
    
    // Apply minimum width and clamp to not exceed bounds
    width = Math.max(minWidthPercent, width);
    width = Math.min(width, 100 - left);
    
    return {
      item,
      left,
      width,
      right: left + width,
      lane: 0
    };
  });
  
  // Sort by left position (ascending), then by width (descending for longer first)
  const sorted = [...itemsWithPositions].sort((a, b) => {
    if (a.left !== b.left) return a.left - b.left;
    return b.width - a.width;
  });
  
  // Assign lanes based on visual positions with small gap
  const gap = 0.5; // Small gap to prevent touching
  const laneEnds: number[] = []; // Tracks the right edge of the last item in each lane
  
  for (const entry of sorted) {
    let assigned = false;
    
    // Try to find an existing lane where this item fits
    for (let i = 0; i < laneEnds.length; i++) {
      if (laneEnds[i] + gap <= entry.left) {
        entry.lane = i;
        laneEnds[i] = entry.right;
        assigned = true;
        break;
      }
    }
    
    // If no lane found, create a new one
    if (!assigned) {
      entry.lane = laneEnds.length;
      laneEnds.push(entry.right);
    }
  }
  
  return sorted.map(({ item, left, width, lane }) => ({ item, left, width, lane }));
};

const TimelineSlideComponent = ({ slide, direction }: TimelineSlideProps) => {
  const { title, startYear, endYear, kings, prophets } = slide;
  
  const judahKings = kings.filter(k => k.kingdom === 'judah');
  const israelKings = kings.filter(k => k.kingdom === 'israel');
  
  // Calculate layouts with proper clipping and lane assignment
  const judahLayout = calculateLayout(judahKings, startYear, endYear, 3);
  const israelLayout = calculateLayout(israelKings, startYear, endYear, 3);
  const prophetLayout = calculateLayout(prophets, startYear, endYear, 4);
  
  const maxJudahLanes = judahLayout.length > 0 ? Math.max(...judahLayout.map(k => k.lane)) + 1 : 1;
  const maxIsraelLanes = israelLayout.length > 0 ? Math.max(...israelLayout.map(k => k.lane)) + 1 : 1;
  const maxProphetLanes = prophetLayout.length > 0 ? Math.max(...prophetLayout.map(k => k.lane)) + 1 : 1;
  
  // For BC dates: larger number = earlier year
  const timelineWidth = startYear - endYear;
  const yearToPercent = (year: number) => ((startYear - year) / timelineWidth) * 100;

  const getCharacterColor = (character: King['character']) => {
    switch (character) {
      case 'good': return 'bg-emerald-500/90 border-emerald-400';
      case 'evil': return 'bg-red-500/90 border-red-400';
      case 'mixed': return 'bg-amber-500/90 border-amber-400';
    }
  };

  const getCharacterBadge = (character: King['character']) => {
    switch (character) {
      case 'good': return 'Добрый';
      case 'evil': return 'Злой';
      case 'mixed': return 'Смешанный';
    }
  };

  // Generate year markers
  const yearMarkers: number[] = [];
  const step = timelineWidth > 200 ? 50 : timelineWidth > 100 ? 25 : 10;
  for (let year = Math.ceil(startYear / step) * step; year >= endYear; year -= step) {
    yearMarkers.push(year);
  }

  const laneHeight = 36; // Height per lane in pixels
  const prophetSectionHeight = maxProphetLanes * laneHeight + 16;
  const judahSectionHeight = maxJudahLanes * laneHeight + 16;
  const israelSectionHeight = maxIsraelLanes * laneHeight + 16;

  return (
    <motion.div
      initial={{ opacity: 0, x: direction === 'next' ? 100 : -100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: direction === 'next' ? -100 : 100 }}
      transition={{ duration: 0.5 }}
      className="h-screen w-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4 md:p-6 flex flex-col overflow-hidden"
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-center mb-4 shrink-0"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs mb-2">
          <Calendar className="w-3 h-3" />
          <span>{startYear}–{endYear} до н.э.</span>
        </div>
        <h1 className="text-xl md:text-2xl font-bold text-slate-100">{title}</h1>
      </motion.div>

      {/* Timeline Container - fills remaining space */}
      <div className="flex-1 flex flex-col min-h-0 overflow-visible">
        {/* Prophets Row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="relative shrink-0 overflow-visible"
          style={{ height: `${prophetSectionHeight}px` }}
        >
          <div className="absolute left-0 top-1/2 -translate-y-1/2 text-purple-400 text-xs font-medium flex items-center gap-1 w-20">
            <BookOpen className="w-3 h-3" />
            Пророки
          </div>
          <div className="ml-20 relative h-full overflow-visible">
            {prophetLayout.map(({ item: prophet, left, width, lane }, index) => (
              <motion.div
                key={prophet.name}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 + index * 0.03 }}
                className="absolute group overflow-visible"
                style={{ 
                  left: `${left}%`, 
                  width: `${width}%`,
                  top: `${lane * laneHeight + 8}px`
                }}
              >
                <div className="bg-purple-600/80 border border-purple-400 rounded px-2 py-1 text-[10px] text-purple-100 truncate cursor-pointer hover:brightness-110 hover:z-10 transition-all">
                  {prophet.name}
                </div>
                {/* Tooltip - position below to avoid top clipping */}
                <div className="absolute top-full left-0 mt-1 opacity-0 group-hover:opacity-100 transition-opacity z-50 pointer-events-none">
                  <div className="bg-slate-800 border border-purple-400/50 rounded-lg p-2 w-48 shadow-xl">
                    <p className="text-purple-300 font-medium text-xs">{prophet.name}</p>
                    <p className="text-slate-400 text-[10px]">{prophet.startYear}–{prophet.endYear} до н.э.</p>
                    <p className="text-slate-300 text-[10px] mt-1">{prophet.keyMessage}</p>
                    {prophet.book && (
                      <p className="text-purple-400 text-[10px] mt-1">📖 {prophet.book}</p>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Year Scale */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="relative h-8 border-y border-slate-600 bg-slate-800/50 shrink-0"
        >
          <div className="absolute left-0 top-1/2 -translate-y-1/2 text-slate-400 text-xs font-medium w-20">
            Годы
          </div>
          <div className="ml-20 relative h-full">
            {yearMarkers.map((year) => {
              const left = yearToPercent(year);
              return (
                <div
                  key={year}
                  className="absolute top-0 h-full flex flex-col items-center justify-center"
                  style={{ left: `${left}%` }}
                >
                  <div className="w-px h-2 bg-slate-500" />
                  <span className="text-slate-400 text-[10px] mt-0.5">{year}</span>
                </div>
              );
            })}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 flex items-center gap-1 text-slate-500 text-xs">
              <ChevronRight className="w-3 h-3" />
            </div>
          </div>
        </motion.div>

        {/* Judah Row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="relative bg-blue-950/30 border-b border-slate-700 shrink-0 overflow-visible"
          style={{ height: `${judahSectionHeight}px` }}
        >
          <div className="absolute left-0 top-1/2 -translate-y-1/2 text-blue-400 text-xs font-medium flex items-center gap-1 w-20">
            <Crown className="w-3 h-3" />
            Иуда
          </div>
          <div className="ml-20 relative h-full overflow-visible">
            {judahLayout.map(({ item: king, left, width, lane }, index) => (
              <motion.div
                key={king.name}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + index * 0.02 }}
                className="absolute group overflow-visible"
                style={{ 
                  left: `${left}%`, 
                  width: `${width}%`,
                  top: `${lane * laneHeight + 8}px`
                }}
              >
                <div className={`${getCharacterColor(king.character)} border rounded px-1.5 py-1 text-[10px] cursor-pointer hover:brightness-110 hover:z-10 hover:ring-2 hover:ring-white/30 transition-all shadow-lg`}>
                  <p className="text-slate-100 font-medium truncate">{king.name}</p>
                  <p className="text-slate-200/70 text-[8px]">{king.duration}</p>
                </div>
                {/* Tooltip */}
                <div className="absolute top-full left-0 mt-1 opacity-0 group-hover:opacity-100 transition-opacity z-50 pointer-events-none">
                  <div className="bg-slate-800 border border-blue-400/50 rounded-lg p-2 w-52 shadow-xl">
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-blue-300 font-medium text-xs">{king.name}</p>
                      <span className={`px-1.5 py-0.5 rounded text-[9px] ${
                        king.character === 'good' ? 'bg-emerald-500/30 text-emerald-300' :
                        king.character === 'evil' ? 'bg-red-500/30 text-red-300' :
                        'bg-amber-500/30 text-amber-300'
                      }`}>
                        {getCharacterBadge(king.character)}
                      </span>
                    </div>
                    <p className="text-slate-400 text-[10px]">{king.startYear}–{king.endYear} до н.э. ({king.duration})</p>
                    <p className="text-slate-300 text-[10px] mt-1">{king.characteristic}</p>
                    {king.keyEvent && (
                      <p className="text-slate-400 text-[10px] mt-1 italic">{king.keyEvent}</p>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Israel Row */}
        {israelLayout.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="relative bg-orange-950/30 shrink-0 overflow-visible"
            style={{ height: `${israelSectionHeight}px` }}
          >
            <div className="absolute left-0 top-1/2 -translate-y-1/2 text-orange-400 text-xs font-medium flex items-center gap-1 w-20">
              <Crown className="w-3 h-3" />
              Израиль
            </div>
            <div className="ml-20 relative h-full overflow-visible">
              {israelLayout.map(({ item: king, left, width, lane }, index) => (
                <motion.div
                  key={king.name}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 + index * 0.02 }}
                  className="absolute group overflow-visible"
                  style={{ 
                    left: `${left}%`, 
                    width: `${width}%`,
                    top: `${lane * laneHeight + 8}px`
                  }}
                >
                  <div className={`${getCharacterColor(king.character)} border rounded px-1.5 py-1 text-[10px] cursor-pointer hover:brightness-110 hover:z-10 hover:ring-2 hover:ring-white/30 transition-all shadow-lg`}>
                    <p className="text-slate-100 font-medium truncate">{king.name}</p>
                    <p className="text-slate-200/70 text-[8px]">{king.duration}</p>
                  </div>
                  {/* Tooltip */}
                  <div className="absolute top-full left-0 mt-1 opacity-0 group-hover:opacity-100 transition-opacity z-50 pointer-events-none">
                    <div className="bg-slate-800 border border-orange-400/50 rounded-lg p-2 w-52 shadow-xl">
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-orange-300 font-medium text-xs">{king.name}</p>
                        <span className={`px-1.5 py-0.5 rounded text-[9px] ${
                          king.character === 'good' ? 'bg-emerald-500/30 text-emerald-300' :
                          king.character === 'evil' ? 'bg-red-500/30 text-red-300' :
                          'bg-amber-500/30 text-amber-300'
                        }`}>
                          {getCharacterBadge(king.character)}
                        </span>
                      </div>
                      <p className="text-slate-400 text-[10px]">{king.startYear}–{king.endYear} до н.э. ({king.duration})</p>
                      <p className="text-slate-300 text-[10px] mt-1">{king.characteristic}</p>
                      {king.keyEvent && (
                        <p className="text-slate-400 text-[10px] mt-1 italic">{king.keyEvent}</p>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>

      {/* Legend */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="flex flex-wrap justify-center gap-3 mt-3 text-[10px] shrink-0"
      >
        <div className="flex items-center gap-1">
          <div className="w-2.5 h-2.5 rounded bg-emerald-500" />
          <span className="text-slate-400">Добрый</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-2.5 h-2.5 rounded bg-red-500" />
          <span className="text-slate-400">Злой</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-2.5 h-2.5 rounded bg-amber-500" />
          <span className="text-slate-400">Смешанный</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-2.5 h-2.5 rounded bg-purple-600" />
          <span className="text-slate-400">Пророк</span>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default TimelineSlideComponent;
