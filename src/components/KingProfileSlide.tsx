import { motion } from 'framer-motion';
import { Crown, Calendar, MapPin, BookOpen, Star, AlertTriangle, Minus } from 'lucide-react';
import { KingProfileSlide as KingProfileSlideType } from '@/data/kings-prophets';

interface KingProfileSlideProps {
  slide: KingProfileSlideType;
  direction: 'next' | 'prev';
}

const KingProfileSlideComponent = ({ slide, direction }: KingProfileSlideProps) => {
  const { king, details, scriptures } = slide;

  const getCharacterConfig = () => {
    switch (king.character) {
      case 'good':
        return {
          icon: Star,
          label: 'Добрый царь',
          bgColor: 'bg-emerald-500/20',
          textColor: 'text-emerald-400',
          borderColor: 'border-emerald-500/50',
          gradient: 'from-emerald-900/50 via-slate-900 to-slate-900'
        };
      case 'evil':
        return {
          icon: AlertTriangle,
          label: 'Злой царь',
          bgColor: 'bg-red-500/20',
          textColor: 'text-red-400',
          borderColor: 'border-red-500/50',
          gradient: 'from-red-900/50 via-slate-900 to-slate-900'
        };
      case 'mixed':
        return {
          icon: Minus,
          label: 'Смешанный',
          bgColor: 'bg-amber-500/20',
          textColor: 'text-amber-400',
          borderColor: 'border-amber-500/50',
          gradient: 'from-amber-900/50 via-slate-900 to-slate-900'
        };
    }
  };

  const config = getCharacterConfig();
  const CharacterIcon = config.icon;
  const kingdomColor = king.kingdom === 'judah' ? 'text-blue-400' : 'text-orange-400';
  const kingdomLabel = king.kingdom === 'judah' ? 'Царство Иуды' : 'Царство Израиля';

  return (
    <motion.div
      initial={{ opacity: 0, x: direction === 'next' ? 100 : -100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: direction === 'next' ? -100 : 100 }}
      transition={{ duration: 0.5 }}
      className={`min-h-screen w-full bg-gradient-to-br ${config.gradient} p-6 md:p-12 flex flex-col justify-center`}
    >
      <div className="max-w-4xl mx-auto w-full">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          {/* Kingdom Badge */}
          <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-800/80 ${kingdomColor} text-sm mb-4`}>
            <MapPin className="w-4 h-4" />
            <span>{kingdomLabel}</span>
          </div>

          {/* King Name */}
          <div className="flex items-center gap-4 mb-4">
            <div className={`w-16 h-16 rounded-full ${config.bgColor} ${config.borderColor} border-2 flex items-center justify-center`}>
              <Crown className={`w-8 h-8 ${config.textColor}`} />
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-slate-100">{king.name}</h1>
              <p className={`text-lg ${config.textColor} font-medium`}>{king.characteristic}</p>
            </div>
          </div>

          {/* Meta Info */}
          <div className="flex flex-wrap gap-4 text-slate-400">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>{king.startYear}–{king.endYear} до н.э.</span>
            </div>
            <div className="flex items-center gap-2">
              <span>Правление: {king.duration}</span>
            </div>
            <div className={`flex items-center gap-2 ${config.textColor}`}>
              <CharacterIcon className="w-4 h-4" />
              <span>{config.label}</span>
            </div>
          </div>
        </motion.div>

        {/* Details Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Left: Details */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h2 className="text-xl font-semibold text-slate-200 mb-4 flex items-center gap-2">
              <span className={`w-1 h-6 rounded ${config.bgColor}`} />
              Ключевые факты
            </h2>
            <ul className="space-y-3">
              {details.map((detail, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="flex items-start gap-3 text-slate-300"
                >
                  <span className={`mt-2 w-2 h-2 rounded-full ${config.bgColor} flex-shrink-0`} />
                  <span>{detail}</span>
                </motion.li>
              ))}
            </ul>

            {king.keyEvent && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className={`mt-6 p-4 rounded-lg ${config.bgColor} ${config.borderColor} border`}
              >
                <p className={`text-sm ${config.textColor} font-medium mb-1`}>Ключевое событие</p>
                <p className="text-slate-200">{king.keyEvent}</p>
              </motion.div>
            )}
          </motion.div>

          {/* Right: Scriptures */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
          >
            <h2 className="text-xl font-semibold text-slate-200 mb-4 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-amber-400" />
              Из Писания
            </h2>
            <div className="space-y-4">
              {scriptures.map((scripture, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 + index * 0.15 }}
                  className="bg-slate-800/60 border border-slate-700 rounded-lg p-4"
                >
                  <p className="text-slate-200 italic leading-relaxed">«{scripture.text}»</p>
                  <p className="text-amber-400 text-sm mt-2 text-right">— {scripture.reference}</p>
                </motion.div>
              ))}
            </div>

            {king.scriptures && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="mt-6 text-slate-500 text-sm"
              >
                <p className="font-medium text-slate-400 mb-1">Читать подробнее:</p>
                <p>{king.scriptures.join(' • ')}</p>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default KingProfileSlideComponent;
