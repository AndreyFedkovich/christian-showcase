import { motion } from 'framer-motion';
import { Crown, BookOpen, Users, Calendar, Star } from 'lucide-react';
import type { KingProfileSlide as KingProfileSlideType } from '@/data/kings-prophets';

interface KingProfileSlideProps {
  slide: KingProfileSlideType;
  direction: 'next' | 'prev';
}

const getCharacterStyle = (character: KingProfileSlideType['character']) => {
  switch (character) {
    case 'good':
      return {
        gradient: 'from-emerald-950 via-stone-900 to-stone-950',
        accent: 'text-emerald-400',
        border: 'border-emerald-500/30',
        bg: 'bg-emerald-500/10',
        badge: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
        glow: 'bg-emerald-500/20'
      };
    case 'evil':
      return {
        gradient: 'from-red-950 via-stone-900 to-stone-950',
        accent: 'text-red-400',
        border: 'border-red-500/30',
        bg: 'bg-red-500/10',
        badge: 'bg-red-500/20 text-red-300 border-red-500/40',
        glow: 'bg-red-500/20'
      };
    case 'mixed':
      return {
        gradient: 'from-amber-950 via-stone-900 to-stone-950',
        accent: 'text-amber-400',
        border: 'border-amber-500/30',
        bg: 'bg-amber-500/10',
        badge: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
        glow: 'bg-amber-500/20'
      };
  }
};

const getKingdomLabel = (kingdom: KingProfileSlideType['kingdom']) => {
  switch (kingdom) {
    case 'united':
      return 'Объединённое царство';
    case 'north':
      return 'Северное царство (Израиль)';
    case 'south':
      return 'Южное царство (Иудея)';
  }
};

const KingProfileSlide = ({ slide }: KingProfileSlideProps) => {
  const style = getCharacterStyle(slide.character);

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
    <div className={`min-h-screen bg-gradient-to-b ${style.gradient} flex flex-col relative overflow-hidden`}>
      {/* Background glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute top-1/4 left-1/4 w-96 h-96 ${style.glow} rounded-full blur-3xl`} />
        <div className={`absolute bottom-1/4 right-1/4 w-80 h-80 ${style.glow} rounded-full blur-3xl`} />
      </div>

      <motion.div 
        className="flex-1 flex flex-col px-4 md:px-8 lg:px-16 py-6 md:py-8 relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center mb-6">
          <span className={`text-sm md:text-base font-medium tracking-widest uppercase ${style.accent}`}>
            {getKingdomLabel(slide.kingdom)}
          </span>
        </motion.div>

        {/* King Card */}
        <motion.div 
          variants={itemVariants}
          className={`max-w-4xl mx-auto w-full bg-stone-800/40 rounded-2xl border ${style.border} p-6 md:p-8 backdrop-blur-sm`}
        >
          {/* Name and Crown */}
          <div className="flex items-center justify-center gap-4 mb-4">
            <Crown className={`w-8 h-8 md:w-10 md:h-10 ${style.accent}`} />
            <h1 className="text-3xl md:text-5xl font-bold text-white">{slide.name}</h1>
            <Crown className={`w-8 h-8 md:w-10 md:h-10 ${style.accent}`} />
          </div>

          {/* Title and Badge */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-6">
            <span className="text-stone-300 text-lg">{slide.title}</span>
            <span className={`px-3 py-1 rounded-full border text-sm font-medium ${style.badge}`}>
              {slide.character === 'good' ? '✓ Добрый царь' : slide.character === 'evil' ? '✗ Злой царь' : '◐ Смешанный'}
            </span>
          </div>

          {/* Reign Info */}
          <div className={`flex items-center justify-center gap-6 mb-6 p-4 rounded-xl ${style.bg}`}>
            <div className="flex items-center gap-2">
              <Calendar className={`w-5 h-5 ${style.accent}`} />
              <span className="text-stone-200">
                {slide.reign.start}-{slide.reign.end} до н.э.
              </span>
            </div>
            <div className="w-px h-6 bg-stone-600" />
            <div className="text-stone-200">
              <span className={`font-bold ${style.accent}`}>{slide.years}</span> лет правления
            </div>
          </div>

          {/* Key Facts */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <Star className={`w-5 h-5 ${style.accent}`} />
              <h3 className="text-lg font-semibold text-white">Ключевые факты</h3>
            </div>
            <ul className="space-y-2">
              {slide.keyFacts.map((fact, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="flex items-start gap-2 text-stone-300"
                >
                  <span className={`mt-1.5 w-1.5 h-1.5 rounded-full ${style.accent.replace('text-', 'bg-')}`} />
                  {fact}
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Legacy */}
          <div className={`p-4 rounded-xl ${style.bg} border ${style.border}`}>
            <p className="text-center text-lg italic text-stone-200">
              "{slide.legacy}"
            </p>
          </div>

          {/* Prophets */}
          {slide.prophets && slide.prophets.length > 0 && (
            <div className="mt-6 pt-4 border-t border-stone-700/50">
              <div className="flex items-center gap-2 mb-2">
                <Users className={`w-5 h-5 ${style.accent}`} />
                <span className="text-stone-400 text-sm">Пророки при этом царе:</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {slide.prophets.map((prophet) => (
                  <span 
                    key={prophet}
                    className="px-3 py-1 bg-stone-700/50 rounded-full text-sm text-stone-300"
                  >
                    📜 {prophet}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* References */}
          <div className="mt-4 pt-4 border-t border-stone-700/50">
            <div className="flex items-center gap-2 mb-2">
              <BookOpen className={`w-4 h-4 ${style.accent}`} />
              <span className="text-stone-400 text-sm">Писание:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {slide.references.map((ref) => (
                <span key={ref} className="text-xs text-stone-500">{ref}</span>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default KingProfileSlide;
