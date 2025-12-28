import { motion } from 'framer-motion';
import { Crown, BookOpen, Calendar, ChevronRight } from 'lucide-react';
import { TimelineSlide as TimelineSlideType, King, Prophet } from '@/data/kings-prophets';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';

interface TimelineSlideProps {
  slide: TimelineSlideType;
  direction: 'next' | 'prev';
}

const TimelineSlideComponent = ({ slide, direction }: TimelineSlideProps) => {
  const { title, startYear, endYear, kings, prophets } = slide;
  
  const judahKings = kings.filter(k => k.kingdom === 'judah').sort((a, b) => a.startYear - b.startYear);
  const israelKings = kings.filter(k => k.kingdom === 'israel').sort((a, b) => a.startYear - b.startYear);
  const sortedProphets = [...prophets].sort((a, b) => a.startYear - b.startYear);
  
  // For BC dates: larger number = earlier year
  const timelineWidth = startYear - endYear;
  const yearToPercent = (year: number) => ((startYear - year) / timelineWidth) * 100;
  const durationToPercent = (start: number, end: number) => ((start - end) / timelineWidth) * 100;

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

  return (
    <motion.div
      initial={{ opacity: 0, x: direction === 'next' ? 100 : -100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: direction === 'next' ? -100 : 100 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen w-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4 md:p-8 flex flex-col"
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-center mb-6"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/20 text-amber-300 text-sm mb-3">
          <Calendar className="w-4 h-4" />
          <span>{startYear}–{endYear} до н.э.</span>
        </div>
        <h1 className="text-2xl md:text-4xl font-bold text-slate-100">{title}</h1>
      </motion.div>

      {/* Timeline Container */}
      <ScrollArea className="flex-1 w-full">
        <div className="min-w-[800px] px-4 pb-4">
          {/* Prophets Row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="relative h-24 mb-2"
          >
            <div className="absolute left-0 top-1/2 -translate-y-1/2 text-purple-400 text-sm font-medium flex items-center gap-2 w-24">
              <BookOpen className="w-4 h-4" />
              Пророки
            </div>
            <div className="ml-28 relative h-full">
              {sortedProphets.map((prophet, index) => {
                const left = yearToPercent(prophet.startYear);
                const width = durationToPercent(prophet.startYear, prophet.endYear);
                return (
                  <motion.div
                    key={prophet.name}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 + index * 0.05 }}
                    className="absolute group"
                    style={{ 
                      left: `${left}%`, 
                      width: `${Math.max(width, 3)}%`,
                      top: `${(index % 3) * 32}px`
                    }}
                  >
                    <div className="bg-purple-600/80 border border-purple-400 rounded-lg px-2 py-1 text-xs text-purple-100 truncate cursor-pointer hover:bg-purple-500 transition-colors">
                      {prophet.name}
                    </div>
                    {/* Tooltip */}
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity z-20 pointer-events-none">
                      <div className="bg-slate-800 border border-purple-400/50 rounded-lg p-3 min-w-48 shadow-xl">
                        <p className="text-purple-300 font-medium">{prophet.name}</p>
                        <p className="text-slate-400 text-xs">{prophet.startYear}–{prophet.endYear} до н.э.</p>
                        <p className="text-slate-300 text-xs mt-1">{prophet.keyMessage}</p>
                        {prophet.book && (
                          <p className="text-purple-400 text-xs mt-1">📖 {prophet.book}</p>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Year Scale */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="relative h-12 border-y border-slate-600 bg-slate-800/50"
          >
            <div className="absolute left-0 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-medium w-24">
              Годы
            </div>
            <div className="ml-28 relative h-full">
              {yearMarkers.map((year) => {
                const left = yearToPercent(year);
                return (
                  <div
                    key={year}
                    className="absolute top-0 h-full flex flex-col items-center justify-center"
                    style={{ left: `${left}%` }}
                  >
                    <div className="w-px h-3 bg-slate-500" />
                    <span className="text-slate-400 text-xs mt-1">{year}</span>
                  </div>
                );
              })}
              {/* Arrow indicating time direction */}
              <div className="absolute right-0 top-1/2 -translate-y-1/2 flex items-center gap-1 text-slate-500 text-xs">
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>
          </motion.div>

          {/* Judah Row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="relative h-28 bg-blue-950/30 border-b border-slate-700"
          >
            <div className="absolute left-0 top-1/2 -translate-y-1/2 text-blue-400 text-sm font-medium flex items-center gap-2 w-24">
              <Crown className="w-4 h-4" />
              Иуда
            </div>
            <div className="ml-28 relative h-full py-2">
              {judahKings.map((king, index) => {
                const left = yearToPercent(king.startYear);
                const width = durationToPercent(king.startYear, king.endYear);
                return (
                  <motion.div
                    key={king.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 + index * 0.03 }}
                    className="absolute group"
                    style={{ 
                      left: `${left}%`, 
                      width: `${Math.max(width, 2)}%`,
                      top: '50%',
                      transform: 'translateY(-50%)'
                    }}
                  >
                    <div className={`${getCharacterColor(king.character)} border rounded-lg p-2 text-xs cursor-pointer hover:scale-105 transition-transform shadow-lg`}>
                      <p className="text-slate-100 font-medium truncate">{king.name}</p>
                      <p className="text-slate-200/70 text-[10px]">{king.duration}</p>
                    </div>
                    {/* Tooltip */}
                    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity z-20 pointer-events-none">
                      <div className="bg-slate-800 border border-blue-400/50 rounded-lg p-3 min-w-56 shadow-xl">
                        <div className="flex items-center justify-between mb-2">
                          <p className="text-blue-300 font-medium">{king.name}</p>
                          <span className={`px-2 py-0.5 rounded text-[10px] ${
                            king.character === 'good' ? 'bg-emerald-500/30 text-emerald-300' :
                            king.character === 'evil' ? 'bg-red-500/30 text-red-300' :
                            'bg-amber-500/30 text-amber-300'
                          }`}>
                            {getCharacterBadge(king.character)}
                          </span>
                        </div>
                        <p className="text-slate-400 text-xs">{king.startYear}–{king.endYear} до н.э. ({king.duration})</p>
                        <p className="text-slate-300 text-xs mt-2">{king.characteristic}</p>
                        {king.keyEvent && (
                          <p className="text-slate-400 text-xs mt-1 italic">{king.keyEvent}</p>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Israel Row */}
          {israelKings.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="relative h-28 bg-orange-950/30"
            >
              <div className="absolute left-0 top-1/2 -translate-y-1/2 text-orange-400 text-sm font-medium flex items-center gap-2 w-24">
                <Crown className="w-4 h-4" />
                Израиль
              </div>
              <div className="ml-28 relative h-full py-2">
                {israelKings.map((king, index) => {
                  const left = yearToPercent(king.startYear);
                  const width = durationToPercent(king.startYear, king.endYear);
                  return (
                    <motion.div
                      key={king.name}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.7 + index * 0.03 }}
                      className="absolute group"
                      style={{ 
                        left: `${left}%`, 
                        width: `${Math.max(width, 2)}%`,
                        top: '50%',
                        transform: 'translateY(-50%)'
                      }}
                    >
                      <div className={`${getCharacterColor(king.character)} border rounded-lg p-2 text-xs cursor-pointer hover:scale-105 transition-transform shadow-lg`}>
                        <p className="text-slate-100 font-medium truncate">{king.name}</p>
                        <p className="text-slate-200/70 text-[10px]">{king.duration}</p>
                      </div>
                      {/* Tooltip */}
                      <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity z-20 pointer-events-none">
                        <div className="bg-slate-800 border border-orange-400/50 rounded-lg p-3 min-w-56 shadow-xl">
                          <div className="flex items-center justify-between mb-2">
                            <p className="text-orange-300 font-medium">{king.name}</p>
                            <span className={`px-2 py-0.5 rounded text-[10px] ${
                              king.character === 'good' ? 'bg-emerald-500/30 text-emerald-300' :
                              king.character === 'evil' ? 'bg-red-500/30 text-red-300' :
                              'bg-amber-500/30 text-amber-300'
                            }`}>
                              {getCharacterBadge(king.character)}
                            </span>
                          </div>
                          <p className="text-slate-400 text-xs">{king.startYear}–{king.endYear} до н.э. ({king.duration})</p>
                          <p className="text-slate-300 text-xs mt-2">{king.characteristic}</p>
                          {king.keyEvent && (
                            <p className="text-slate-400 text-xs mt-1 italic">{king.keyEvent}</p>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          )}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>

      {/* Legend */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="flex flex-wrap justify-center gap-4 mt-4 text-xs"
      >
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-emerald-500" />
          <span className="text-slate-400">Добрый царь</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-red-500" />
          <span className="text-slate-400">Злой царь</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-amber-500" />
          <span className="text-slate-400">Смешанный</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-purple-600" />
          <span className="text-slate-400">Пророк</span>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default TimelineSlideComponent;
