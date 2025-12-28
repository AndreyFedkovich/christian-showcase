import { motion } from 'framer-motion';
import type { TimelineDualSlide as TimelineDualSlideType, Ruler, Prophet } from '@/data/kings-prophets';

interface TimelineDualSlideProps {
  slide: TimelineDualSlideType;
  direction: 'next' | 'prev';
}

const getCharacterColor = (character: Ruler['character']) => {
  switch (character) {
    case 'good':
      return 'bg-emerald-600/80 border-emerald-400';
    case 'evil':
      return 'bg-red-700/80 border-red-400';
    case 'mixed':
      return 'bg-amber-600/80 border-amber-400';
  }
};

const getCharacterBadge = (character: Ruler['character']) => {
  switch (character) {
    case 'good':
      return { text: 'Добрый', color: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' };
    case 'evil':
      return { text: 'Злой', color: 'bg-red-500/20 text-red-300 border-red-500/30' };
    case 'mixed':
      return { text: 'Смешанный', color: 'bg-amber-500/20 text-amber-300 border-amber-500/30' };
  }
};

const RulerCard = ({ ruler, index }: { ruler: Ruler; index: number }) => {
  const badge = getCharacterBadge(ruler.character);
  
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.3 + index * 0.1 }}
      className={`p-3 rounded-lg border-l-4 bg-stone-800/60 backdrop-blur-sm ${getCharacterColor(ruler.character)}`}
    >
      <div className="flex items-start justify-between gap-2 mb-1">
        <h4 className="font-bold text-white text-sm md:text-base">{ruler.name}</h4>
        <span className={`text-xs px-2 py-0.5 rounded-full border ${badge.color}`}>
          {badge.text}
        </span>
      </div>
      <div className="text-xs text-stone-400 mb-1">
        {ruler.reign.start}-{ruler.reign.end} до н.э. • {ruler.years} {typeof ruler.years === 'number' ? 'лет' : ''}
      </div>
      <p className="text-xs text-stone-300 italic leading-relaxed">{ruler.highlight}</p>
    </motion.div>
  );
};

const ProphetBadge = ({ prophet, index }: { prophet: Prophet; index: number }) => {
  const focusColor = {
    north: 'bg-red-900/40 border-red-500/30 text-red-200',
    south: 'bg-blue-900/40 border-blue-500/30 text-blue-200',
    both: 'bg-purple-900/40 border-purple-500/30 text-purple-200',
    nations: 'bg-amber-900/40 border-amber-500/30 text-amber-200'
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.8 + index * 0.1 }}
      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border ${focusColor[prophet.focus]}`}
    >
      <span className="text-lg">📜</span>
      <span className="font-medium text-sm">{prophet.name}</span>
      <span className="text-xs opacity-70">
        {prophet.ministry.start}-{prophet.ministry.end}
      </span>
    </motion.div>
  );
};

const TimelineDualSlide = ({ slide }: TimelineDualSlideProps) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-950 via-stone-900 to-stone-950 flex flex-col relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-1/2 h-full bg-red-950/20" />
        <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-950/20" />
      </div>

      <motion.div 
        className="flex-1 flex flex-col px-3 md:px-6 py-4 md:py-6 relative z-10 overflow-hidden"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center mb-4">
          <span className="text-amber-400/80 text-sm md:text-base font-medium tracking-widest uppercase">
            Хронология
          </span>
          <h1 className="text-xl md:text-3xl font-bold text-white mt-1">
            {slide.period}
          </h1>
        </motion.div>

        {/* Kingdoms Grid */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-4 overflow-hidden">
          {/* Northern Kingdom */}
          {slide.northernKingdom && (
            <motion.div 
              variants={itemVariants}
              className="flex flex-col bg-red-950/30 rounded-xl border border-red-500/20 p-3 md:p-4 overflow-hidden"
            >
              <div className="flex items-center gap-2 mb-3 pb-2 border-b border-red-500/20">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <h2 className="text-lg md:text-xl font-bold text-red-200">{slide.northernKingdom.label}</h2>
                <span className="text-xs text-red-300/60 ml-auto">📍 {slide.northernKingdom.capital}</span>
              </div>
              <div className="flex-1 overflow-y-auto space-y-2 pr-1 scrollbar-thin">
                {slide.northernKingdom.rulers.map((ruler, index) => (
                  <RulerCard key={ruler.name} ruler={ruler} index={index} />
                ))}
              </div>
            </motion.div>
          )}

          {/* Southern Kingdom */}
          <motion.div 
            variants={itemVariants}
            className={`flex flex-col bg-blue-950/30 rounded-xl border border-blue-500/20 p-3 md:p-4 overflow-hidden ${!slide.northernKingdom ? 'lg:col-span-2 max-w-3xl mx-auto w-full' : ''}`}
          >
            <div className="flex items-center gap-2 mb-3 pb-2 border-b border-blue-500/20">
              <div className="w-3 h-3 rounded-full bg-blue-500" />
              <h2 className="text-lg md:text-xl font-bold text-blue-200">{slide.southernKingdom.label}</h2>
              <span className="text-xs text-blue-300/60 ml-auto">📍 {slide.southernKingdom.capital}</span>
            </div>
            <div className="flex-1 overflow-y-auto space-y-2 pr-1 scrollbar-thin">
              {slide.southernKingdom.rulers.map((ruler, index) => (
                <RulerCard key={ruler.name} ruler={ruler} index={index} />
              ))}
            </div>
          </motion.div>
        </div>

        {/* Prophets */}
        {slide.prophets.length > 0 && (
          <motion.div 
            variants={itemVariants}
            className="mt-4 pt-3 border-t border-stone-700/50"
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="text-stone-400 text-sm font-medium">Пророки этого периода:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {slide.prophets.map((prophet, index) => (
                <ProphetBadge key={prophet.name} prophet={prophet} index={index} />
              ))}
            </div>
          </motion.div>
        )}

        {/* Legend */}
        <motion.div 
          variants={itemVariants}
          className="flex flex-wrap justify-center gap-3 mt-3 text-xs"
        >
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded bg-emerald-600" />
            <span className="text-stone-400">Добрый царь</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded bg-red-700" />
            <span className="text-stone-400">Злой царь</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded bg-amber-600" />
            <span className="text-stone-400">Смешанный</span>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default TimelineDualSlide;
