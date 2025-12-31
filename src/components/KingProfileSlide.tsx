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
          label: 'Благчестивый царь',
          bgColor: 'bg-emerald-500/20',
          textColor: 'text-emerald-400',
          borderColor: 'border-emerald-500/50',
          gradient: 'from-emerald-900/50 via-slate-900 to-slate-900'
        };
      case 'evil':
        return {
          icon: AlertTriangle,
          label: 'Нечестивый царь',
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
          // Увеличено p-6 md:p-12 -> p-10 md:p-20
          className={`min-h-screen w-full bg-gradient-to-br ${config.gradient} p-10 md:p-20 flex flex-col justify-center`}
      >
        {/* Увеличено max-w-4xl -> max-w-7xl */}
        <div className="max-w-7xl mx-auto w-full">
          {/* Header */}
          <motion.div
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              // Увеличено mb-8 -> mb-12
              className="mb-12"
          >
            {/* Kingdom Badge */}
            {/* Увеличено px-3 py-1.5 -> px-5 py-3, text-sm -> text-xl, gap-2 -> gap-3, mb-4 -> mb-6 */}
            <div className={`inline-flex items-center gap-3 px-5 py-3 rounded-full bg-slate-800/80 ${kingdomColor} text-xl mb-6`}>
              {/* Иконка w-4 -> w-6 */}
              <MapPin className="w-6 h-6" />
              <span>{kingdomLabel}</span>
            </div>

            {/* King Name */}
            {/* Увеличено gap-4 -> gap-8, mb-4 -> mb-8 */}
            <div className="flex items-center gap-8 mb-8">
              {/* Круг w-16 h-16 -> w-28 h-28 (112px) */}
              <div className={`w-28 h-28 rounded-full ${config.bgColor} ${config.borderColor} border-4 flex items-center justify-center`}>
                {/* Корона w-8 h-8 -> w-14 h-14 */}
                <Crown className={`w-14 h-14 ${config.textColor}`} />
              </div>
              <div>
                {/* Заголовок text-4xl/5xl -> text-6xl/7xl */}
                <h1 className="text-6xl md:text-7xl font-bold text-slate-100 mb-2">{king.name}</h1>
                {/* Подзаголовок text-lg -> text-3xl */}
                <p className={`text-3xl ${config.textColor} font-medium`}>{king.characteristic}</p>
              </div>
            </div>

            {/* Meta Info */}
            {/* Увеличено gap-4 -> gap-8, text-slate-400 -> text-xl text-slate-400 */}
            <div className="flex flex-wrap gap-8 text-xl text-slate-400">
              <div className="flex items-center gap-3">
                <Calendar className="w-6 h-6" />
                <span>{king.startYear}–{king.endYear} до н.э.</span>
              </div>
              <div className="flex items-center gap-3">
                <span>Правление: {king.duration}</span>
              </div>
              <div className={`flex items-center gap-3 ${config.textColor}`}>
                <CharacterIcon className="w-6 h-6" />
                <span>{config.label}</span>
              </div>
            </div>
          </motion.div>

          {/* Details Grid */}
          {/* Увеличено gap-8 -> gap-16 */}
          <div className="grid md:grid-cols-2 gap-16">
            {/* Left: Details */}
            <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
            >
              {/* Заголовок секции text-xl -> text-3xl, mb-4 -> mb-8 */}
              <h2 className="text-3xl font-semibold text-slate-200 mb-8 flex items-center gap-4">
                {/* Полоска w-1 h-6 -> w-2 h-10 */}
                <span className={`w-2 h-10 rounded ${config.bgColor}`} />
                Ключевые факты
              </h2>
              {/* Список space-y-3 -> space-y-6 */}
              <ul className="space-y-6">
                {details.map((detail, index) => (
                    <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 + index * 0.1 }}
                        // Текст списка -> text-2xl, gap-3 -> gap-5
                        className="flex items-start gap-5 text-slate-300 text-2xl"
                    >
                      {/* Буллит w-2 h-2 -> w-3 h-3, mt-2 -> mt-3 */}
                      <span className={`mt-3 w-3 h-3 rounded-full ${config.bgColor} flex-shrink-0`} />
                      <span>{detail}</span>
                    </motion.li>
                ))}
              </ul>

              {king.keyEvent && (
                  <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8 }}
                      // Карточка mt-6 -> mt-10, p-4 -> p-8
                      className={`mt-10 p-8 rounded-xl ${config.bgColor} ${config.borderColor} border-2`}
                  >
                    {/* Лейбл text-sm -> text-lg */}
                    <p className={`text-lg ${config.textColor} font-medium mb-3`}>Ключевое событие</p>
                    {/* Текст события -> text-2xl */}
                    <p className="text-2xl text-slate-200">{king.keyEvent}</p>
                  </motion.div>
              )}
            </motion.div>

            {/* Right: Scriptures */}
            <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
            >
              {/* Заголовок секции text-xl -> text-3xl */}
              <h2 className="text-3xl font-semibold text-slate-200 mb-8 flex items-center gap-4">
                <BookOpen className="w-8 h-8 text-amber-400" />
                Из Писания
              </h2>
              {/* Карточки space-y-4 -> space-y-8 */}
              <div className="space-y-8">
                {scriptures.map((scripture, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 + index * 0.15 }}
                        // Паддинг p-4 -> p-8
                        className="bg-slate-800/60 border border-slate-700 rounded-xl p-8"
                    >
                      {/* Текст цитаты -> text-2xl */}
                      <p className="text-2xl text-slate-200 italic leading-relaxed">«{scripture.text}»</p>
                      {/* Ссылка text-sm -> text-lg, mt-2 -> mt-4 */}
                      <p className="text-amber-400 text-lg mt-4 text-right">— {scripture.reference}</p>
                    </motion.div>
                ))}
              </div>

              {king.scriptures && (
                  <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1 }}
                      // Футер mt-6 -> mt-10, text-sm -> text-lg
                      className="mt-10 text-slate-500 text-lg"
                  >
                    <p className="font-medium text-slate-400 mb-2">Читать подробнее:</p>
                    <p className="text-xl">{king.scriptures.join(' • ')}</p>
                  </motion.div>
              )}
            </motion.div>
          </div>
        </div>
      </motion.div>
  );
};

export default KingProfileSlideComponent;
