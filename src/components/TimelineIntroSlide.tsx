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
      className="min-h-screen w-full bg-gradient-to-br from-slate-900 via-blue-950/30 to-slate-900 flex flex-col items-center justify-center p-6 md:p-12 relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          transition={{ delay: 0.5 }}
          className="absolute top-10 left-10 w-64 h-64 rounded-full bg-blue-500 blur-3xl"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          transition={{ delay: 0.7 }}
          className="absolute bottom-10 right-10 w-64 h-64 rounded-full bg-orange-500 blur-3xl"
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Crown Icon */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, type: 'spring' }}
          className="mb-8"
        >
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-amber-500/30 to-amber-700/20 border border-amber-500/40">
            <Crown className="w-12 h-12 text-amber-400" />
          </div>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-5xl md:text-7xl font-bold text-slate-100 mb-4"
        >
          {title}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-xl md:text-2xl text-slate-400 mb-6"
        >
          {subtitle}
        </motion.p>

        {/* Period Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-400 mb-10"
        >
          <Calendar className="w-5 h-5" />
          <span className="text-lg font-medium">{period}</span>
        </motion.div>

        {/* Description Points */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="space-y-4"
        >
          {description.map((desc, index) => (
            <motion.p
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 + index * 0.15 }}
              className="text-lg text-slate-300 flex items-center justify-center gap-3"
            >
              <span className="w-2 h-2 rounded-full bg-amber-500" />
              {desc}
            </motion.p>
          ))}
        </motion.div>

        {/* Bottom Icons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="mt-12 flex items-center justify-center gap-8"
        >
          <div className="flex flex-col items-center gap-2">
            <div className="w-12 h-12 rounded-full bg-blue-500/20 border border-blue-500/40 flex items-center justify-center">
              <Crown className="w-6 h-6 text-blue-400" />
            </div>
            <span className="text-sm text-blue-400">Иуда</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="w-12 h-12 rounded-full bg-orange-500/20 border border-orange-500/40 flex items-center justify-center">
              <Crown className="w-6 h-6 text-orange-400" />
            </div>
            <span className="text-sm text-orange-400">Израиль</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="w-12 h-12 rounded-full bg-purple-500/20 border border-purple-500/40 flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-purple-400" />
            </div>
            <span className="text-sm text-purple-400">Пророки</span>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default TimelineIntroSlideComponent;
