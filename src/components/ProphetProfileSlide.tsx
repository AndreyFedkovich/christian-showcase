import { motion } from 'framer-motion';
import { BookOpen, Calendar, Users, Scroll, Quote } from 'lucide-react';
import { ProphetProfileSlide as ProphetProfileSlideType } from '@/data/kings-prophets';

interface ProphetProfileSlideProps {
  slide: ProphetProfileSlideType;
  direction: 'next' | 'prev';
}

const ProphetProfileSlideComponent = ({ slide, direction }: ProphetProfileSlideProps) => {
  const { prophet, details, keyVerse } = slide;

  return (
      <motion.div
          initial={{ opacity: 0, x: direction === 'next' ? 100 : -100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: direction === 'next' ? -100 : 100 }}
          transition={{ duration: 0.5 }}
          // Padding увеличен: p-6 md:p-12 -> p-10 md:p-20
          className="min-h-screen w-full bg-gradient-to-br from-purple-900/60 via-slate-900 to-slate-900 p-10 md:p-20 flex flex-col justify-center"
      >
        {/* Ширина контейнера увеличена: max-w-4xl -> max-w-7xl */}
        <div className="max-w-7xl mx-auto w-full">
          {/* Header */}
          <motion.div
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              // Отступ снизу увеличен: mb-8 -> mb-12
              className="mb-12"
          >
            {/* Prophet Badge */}
            {/* Увеличен размер бейджа, иконок и шрифта */}
            <div className="inline-flex items-center gap-3 px-5 py-3 rounded-full bg-purple-500/20 text-purple-400 text-xl mb-6">
              <Scroll className="w-6 h-6" />
              <span>Пророк</span>
            </div>

            {/* Prophet Name */}
            <div className="flex items-center gap-8 mb-8">
              {/* Круг увеличен: w-16 -> w-28 */}
              <div className="w-28 h-28 rounded-full bg-purple-500/20 border-4 border-purple-500/50 flex items-center justify-center">
                {/* Иконка увеличена: w-8 -> w-14 */}
                <BookOpen className="w-14 h-14 text-purple-400" />
              </div>
              <div>
                {/* Заголовок увеличен: text-4xl -> text-6xl/7xl */}
                <h1 className="text-6xl md:text-7xl font-bold text-slate-100 mb-2">{prophet.name}</h1>
                {/* Подзаголовок увеличен: text-lg -> text-3xl */}
                <p className="text-3xl text-purple-400 font-medium">{prophet.keyMessage}</p>
              </div>
            </div>

            {/* Meta Info */}
            {/* Увеличен gap и базовый размер шрифта до text-xl */}
            <div className="flex flex-wrap gap-8 text-xl text-slate-400">
              <div className="flex items-center gap-3">
                <Calendar className="w-6 h-6" />
                <span>{prophet.startYear}–{prophet.endYear} до н.э.</span>
              </div>
              {prophet.book && (
                  <div className="flex items-center gap-3 text-purple-400">
                    <BookOpen className="w-6 h-6" />
                    <span>Книга: {prophet.book}</span>
                  </div>
              )}
              {prophet.relatedKings && prophet.relatedKings.length > 0 && (
                  <div className="flex items-center gap-3">
                    <Users className="w-6 h-6" />
                    <span>При царях: {prophet.relatedKings.join(', ')}</span>
                  </div>
              )}
            </div>
          </motion.div>

          {/* Content Grid */}
          {/* Gap увеличен: gap-8 -> gap-16 */}
          <div className="grid md:grid-cols-2 gap-16">
            {/* Left: Details */}
            <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
            >
              {/* Заголовок секции увеличен */}
              <h2 className="text-3xl font-semibold text-slate-200 mb-8 flex items-center gap-4">
                <span className="w-2 h-10 rounded bg-purple-500/40" />
                О служении
              </h2>
              {/* Список увеличен */}
              <ul className="space-y-6">
                {details.map((detail, index) => (
                    <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 + index * 0.1 }}
                        className="flex items-start gap-5 text-slate-300 text-2xl"
                    >
                      <span className="mt-3 w-3 h-3 rounded-full bg-purple-500/40 flex-shrink-0" />
                      <span>{detail}</span>
                    </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Right: Key Verse */}
            <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
                className="flex flex-col justify-center"
            >
              {keyVerse && (
                  <div className="bg-gradient-to-br from-purple-900/40 to-slate-800/60 border border-purple-500/30 rounded-xl p-9 relative overflow-hidden">
                    {/* Аккуратная кавычка в левом верхнем углу */}
                    <Quote
                        className="absolute top-4 left-4 w-10 h-10 text-purple-500/25 pointer-events-none"
                    />
                    <p className="relative z-10 mt-6 text-3xl md:text-4xl text-slate-100 italic leading-relaxed">
                      «{keyVerse.text}»
                    </p>
                    <p className="relative z-10 text-purple-400 mt-6 text-right font-medium text-2xl">
                      — {keyVerse.reference}
                    </p>
                  </div>
              )}

              {/* Timeline visualization */}
              <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 }}
                  className="mt-12"
              >
                <p className="text-slate-500 text-xl mb-3">Период служения</p>
                <div className="relative h-12 bg-slate-800/60 rounded-full overflow-hidden">
                  <div
                      className="absolute inset-y-0 left-0 bg-gradient-to-r from-purple-600 to-purple-400 rounded-full"
                      style={{ width: '100%' }}
                  />
                  <div className="absolute inset-0 flex items-center justify-between px-6 text-lg text-slate-200">
                    <span>{prophet.startYear}</span>
                    <span className="font-medium">
                    {prophet.endYear - prophet.startYear} лет
                  </span>
                    <span>{prophet.endYear}</span>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.div>
  );
};

export default ProphetProfileSlideComponent;
