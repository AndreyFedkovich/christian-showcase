import { motion } from 'framer-motion';
import { Calendar, AlertTriangle, ArrowRight, History } from 'lucide-react';
import { TimelineEraSlide as TimelineEraSlideType } from '@/data/kings-prophets';

interface TimelineEraSlideProps {
  slide: TimelineEraSlideType;
  direction: 'next' | 'prev';
}

const TimelineEraSlideComponent = ({ slide, direction }: TimelineEraSlideProps) => {
  const { era, causes, consequences } = slide;

  return (
      <motion.div
          initial={{ opacity: 0, x: direction === 'next' ? 100 : -100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: direction === 'next' ? -100 : 100 }}
          transition={{ duration: 0.5 }}
          // Padding увеличен: p-6 md:p-12 -> p-10 md:p-20
          className="min-h-screen w-full bg-gradient-to-br from-amber-900/40 via-slate-900 to-slate-900 p-10 md:p-20 flex flex-col justify-center"
      >
        {/* Ширина увеличена: max-w-4xl -> max-w-7xl */}
        <div className="max-w-7xl mx-auto w-full">
          {/* Year Badge */}
          <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              // Отступ mb-8 -> mb-12
              className="text-center mb-12"
          >
            {/* Бейдж увеличен: px-6 -> px-8, py-3 -> py-4 */}
            <div className="inline-flex items-center gap-4 px-8 py-4 rounded-full bg-amber-500/20 border border-amber-500/40">
              {/* Иконка w-6 -> w-10 */}
              <Calendar className="w-10 h-10 text-amber-400" />
              {/* Текст text-3xl -> text-5xl/6xl */}
              <span className="text-5xl md:text-6xl font-bold text-amber-400">{era.year} до н.э.</span>
            </div>
          </motion.div>

          {/* Era Title */}
          <motion.div
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-center mb-12"
          >
            {/* Заголовок text-4xl -> text-6xl/8xl */}
            <h1 className="text-6xl md:text-8xl font-bold text-slate-100 mb-2">{era.title}</h1>
            {/* Описание text-xl -> text-3xl */}
            <p className="text-3xl text-slate-400 max-w-4xl mx-auto leading-relaxed">{era.description}</p>
          </motion.div>

          {/* Significance Banner */}
          <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              // Баннер p-6 -> p-10, mb-10 -> mb-16
              className="bg-gradient-to-r from-amber-900/40 to-amber-800/20 border border-amber-500/30 rounded-2xl p-10 mb-12 text-center"
          >
            {/* Иконка w-8 -> w-14 */}
            <History className="w-14 h-14 text-amber-400 mx-auto mb-4" />
            {/* Текст text-lg -> text-2xl */}
            <p className="text-2xl text-amber-200">{era.significance}</p>
          </motion.div>

          {/* Causes and Consequences - Flex layout вместо Grid для исправления стрелки */}
          <div className="flex flex-col md:flex-row items-stretch gap-8 md:gap-4">

            {/* Causes (Left Block) */}
            <motion.div
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                // flex-1 чтобы занимал равное место, p-6 -> p-10
                className="flex-1 bg-slate-800/60 border border-slate-700 rounded-2xl p-10"
            >
              {/* Заголовок text-xl -> text-3xl */}
              <h2 className="text-3xl font-semibold text-red-400 mb-8 flex items-center gap-4">
                <AlertTriangle className="w-8 h-8" />
                Причины
              </h2>
              <ul className="space-y-6">
                {causes.map((cause, index) => (
                    <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.6 + index * 0.1 }}
                        // Текст списка text-2xl
                        className="flex items-start gap-4 text-slate-300 text-2xl"
                    >
                      <span className="mt-3 w-3 h-3 rounded-full bg-red-500/60 flex-shrink-0" />
                      <span>{cause}</span>
                    </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Arrow (Middle Item) - Теперь это часть потока flex, а не absolute */}
            <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7 }}
                className="hidden md:flex items-center justify-center px-4"
            >
              {/* Стрелка увеличена w-8 -> w-16 */}
              <ArrowRight className="w-16 h-16 text-amber-400/80" />
            </motion.div>

            {/* Consequences (Right Block) */}
            <motion.div
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
                // flex-1 чтобы занимал равное место, p-6 -> p-10
                className="flex-1 bg-slate-800/60 border border-slate-700 rounded-2xl p-10"
            >
              {/* Заголовок text-xl -> text-3xl */}
              <h2 className="text-3xl font-semibold text-blue-400 mb-8 flex items-center gap-4">
                <ArrowRight className="w-8 h-8" />
                Последствия
              </h2>
              <ul className="space-y-6">
                {consequences.map((consequence, index) => (
                    <motion.li
                        key={index}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.7 + index * 0.1 }}
                        // Текст списка text-2xl
                        className="flex items-start gap-4 text-slate-300 text-2xl"
                    >
                      <span className="mt-3 w-3 h-3 rounded-full bg-blue-500/60 flex-shrink-0" />
                      <span>{consequence}</span>
                    </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </motion.div>
  );
};

export default TimelineEraSlideComponent;
