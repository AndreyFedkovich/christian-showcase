import { motion } from 'framer-motion';
import { Crown, Calendar, Map, BookOpen } from 'lucide-react';
import { TimelineIntroSlide as TimelineIntroSlideType } from '@/data/kings-prophets';

interface TimelineIntroSlideProps {
  slide: TimelineIntroSlideType;
  direction: 'next' | 'prev';
}

const TimelineIntroSlideComponent = ({ slide, direction }: TimelineIntroSlideProps) => {
  const { title, subtitle, period, description } = slide;

  return (
      <motion.div
          initial={{ opacity: 0, x: direction === 'next' ? 100 : -100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: direction === 'next' ? -100 : 100 }}
          transition={{ duration: 0.5 }}
          // Padding увеличен: p-6 md:p-12 -> p-10 md:p-24
          className="min-h-screen w-full bg-gradient-to-br from-slate-900 via-blue-950/70 to-slate-900 flex flex-col items-center justify-center p-10 md:p-24 relative overflow-hidden"
      >
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.1 }}
              transition={{ delay: 0.5 }}
              // Размер пятен увеличен: w-64 -> w-96
              className="absolute top-10 left-10 w-96 h-96 rounded-full bg-blue-500 blur-3xl"
          />
          <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.1 }}
              transition={{ delay: 0.7 }}
              // Размер пятен увеличен: w-64 -> w-96
              className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-orange-500 blur-3xl"
          />
        </div>

        {/* Ширина увеличена: max-w-4xl -> max-w-7xl */}
        <div className="relative z-10 max-w-7xl mx-auto text-center">
          {/* Crown Icon */}
          <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, type: 'spring' }}
              // Отступ mb-8 -> mb-12
              className="mb-12"
          >
            {/* Круг увеличен: w-24 h-24 -> w-40 h-40 */}
            <div className="inline-flex items-center justify-center w-40 h-40 rounded-full bg-gradient-to-br from-amber-500/30 to-amber-700/20 border-2 border-amber-500/40">
              {/* Иконка увеличена: w-12 h-12 -> w-20 h-20 */}
              <Crown className="w-20 h-20 text-amber-400" />
            </div>
          </motion.div>

          {/* Title */}
          <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              // Шрифт увеличен: text-5xl/7xl -> text-7xl/9xl, mb-4 -> mb-8
              className="text-7xl md:text-9xl font-bold text-slate-100 mb-8 leading-tight"
          >
            {title}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              // Шрифт увеличен: text-xl/2xl -> text-3xl/4xl, mb-6 -> mb-10
              className="text-3xl md:text-4xl text-slate-400 mb-10"
          >
            {subtitle}
          </motion.p>

          {/* Period Badge */}
          <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
              // Паддинг увеличен: px-6 py-3 -> px-10 py-5, mb-10 -> mb-16
              className="inline-flex items-center gap-4 px-10 py-5 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-400 mb-16"
          >
            {/* Иконка w-5 -> w-8 */}
            <Calendar className="w-8 h-8" />
            {/* Текст text-lg -> text-3xl */}
            <span className="text-3xl font-medium">{period}</span>
          </motion.div>

          {/* Description Points */}
          <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              // Отступы между элементами увеличены space-y-4 -> space-y-6
              className="space-y-6"
          >
            {description.map((desc, index) => (
                <motion.p
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 + index * 0.15 }}
                    // Шрифт text-lg -> text-3xl, gap-3 -> gap-5
                    className="text-3xl text-slate-300 flex items-center justify-center gap-5"
                >
                  {/* Точка увеличена w-2 -> w-4 */}
                  <span className="w-4 h-4 rounded-full bg-amber-500" />
                  {desc}
                </motion.p>
            ))}
          </motion.div>

          {/* Bottom Icons */}
          <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              // Отступ mt-12 -> mt-20, gap-8 -> gap-16
              className="mt-20 flex items-center justify-center gap-16"
          >
            <div className="flex flex-col items-center gap-4">
              {/* Круг иконок w-12 -> w-20 */}
              <div className="w-20 h-20 rounded-full bg-blue-500/20 border border-blue-500/40 flex items-center justify-center">
                {/* Иконка w-6 -> w-10 */}
                <Crown className="w-10 h-10 text-blue-400" />
              </div>
              {/* Текст text-sm -> text-xl */}
              <span className="text-xl text-blue-400">Иуда</span>
            </div>

            <div className="flex flex-col items-center gap-4">
              <div className="w-20 h-20 rounded-full bg-orange-500/20 border border-orange-500/40 flex items-center justify-center">
                <Crown className="w-10 h-10 text-orange-400" />
              </div>
              <span className="text-xl text-orange-400">Израиль</span>
            </div>

            <div className="flex flex-col items-center gap-4">
              <div className="w-20 h-20 rounded-full bg-purple-500/20 border border-purple-500/40 flex items-center justify-center">
                <BookOpen className="w-10 h-10 text-purple-400" />
              </div>
              <span className="text-xl text-purple-400">Пророки</span>
            </div>
          </motion.div>
        </div>
      </motion.div>
  );
};

export default TimelineIntroSlideComponent;
