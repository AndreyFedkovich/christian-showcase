import { motion } from 'framer-motion';
import { Info, Crown, BookOpen, CheckCircle, XCircle, MinusCircle } from 'lucide-react';
import { TimelineOverviewSlide as TimelineOverviewSlideType } from '@/data/kings-prophets';

interface TimelineOverviewSlideProps {
  slide: TimelineOverviewSlideType;
  direction: 'next' | 'prev';
}

const TimelineOverviewSlideComponent = ({ slide, direction }: TimelineOverviewSlideProps) => {
  const { title, legends, note } = slide;

  const getIcon = (label: string) => {
    switch (label) {
      case 'Иуда':
      case 'Израиль':
        return Crown;
      case 'Пророк':
        return BookOpen;
      case 'Добрый царь':
        return CheckCircle;
      case 'Злой царь':
        return XCircle;
      default:
        return MinusCircle;
    }
  };

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'blue':
        return { bg: 'bg-blue-500/20', border: 'border-blue-500/50', text: 'text-blue-400', icon: 'text-blue-400' };
      case 'orange':
        return { bg: 'bg-orange-500/20', border: 'border-orange-500/50', text: 'text-orange-400', icon: 'text-orange-400' };
      case 'green':
        return { bg: 'bg-emerald-500/20', border: 'border-emerald-500/50', text: 'text-emerald-400', icon: 'text-emerald-400' };
      case 'red':
        return { bg: 'bg-red-500/20', border: 'border-red-500/50', text: 'text-red-400', icon: 'text-red-400' };
      case 'purple':
        return { bg: 'bg-purple-500/20', border: 'border-purple-500/50', text: 'text-purple-400', icon: 'text-purple-400' };
      default:
        return { bg: 'bg-slate-500/20', border: 'border-slate-500/50', text: 'text-slate-400', icon: 'text-slate-400' };
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: direction === 'next' ? 100 : -100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: direction === 'next' ? -100 : 100 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen w-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex flex-col items-center justify-center p-6 md:p-12"
    >
      <div className="max-w-4xl mx-auto w-full">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-700/50 text-slate-300 text-sm mb-4">
            <Info className="w-4 h-4" />
            Легенда
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-100">{title}</h1>
        </motion.div>

        {/* Legends Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
          {legends.map((legend, index) => {
            const Icon = getIcon(legend.label);
            const colors = getColorClasses(legend.color);
            
            return (
              <motion.div
                key={legend.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className={`${colors.bg} ${colors.border} border rounded-xl p-5 hover:scale-105 transition-transform`}
              >
                <div className="flex items-center gap-3 mb-2">
                  <Icon className={`w-6 h-6 ${colors.icon}`} />
                  <h3 className={`text-lg font-semibold ${colors.text}`}>{legend.label}</h3>
                </div>
                <p className="text-slate-400 text-sm">{legend.description}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-slate-800/50 border border-slate-700 rounded-lg p-4 text-center"
        >
          <p className="text-slate-400 text-sm flex items-center justify-center gap-2">
            <Info className="w-4 h-4" />
            {note}
          </p>
        </motion.div>

        {/* Timeline Preview */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="mt-10"
        >
          <p className="text-center text-slate-500 text-sm mb-4">Пример временной шкалы</p>
          <div className="bg-slate-800/60 rounded-xl p-6 overflow-hidden">
            {/* Mini timeline preview */}
            <div className="space-y-4">
              {/* Prophets row */}
              <div className="flex items-center gap-4">
                <span className="text-purple-400 text-xs w-20">Пророки</span>
                <div className="flex-1 flex gap-2">
                  <div className="bg-purple-600/60 rounded px-3 py-1 text-xs text-purple-200">Илия</div>
                  <div className="bg-purple-600/60 rounded px-3 py-1 text-xs text-purple-200">Елисей</div>
                  <div className="bg-purple-600/60 rounded px-3 py-1 text-xs text-purple-200">Исаия</div>
                </div>
              </div>
              
              {/* Year scale */}
              <div className="flex items-center gap-4">
                <span className="text-slate-500 text-xs w-20">Годы</span>
                <div className="flex-1 h-px bg-slate-600 relative">
                  <span className="absolute left-0 -top-3 text-xs text-slate-400">930</span>
                  <span className="absolute left-1/2 -translate-x-1/2 -top-3 text-xs text-slate-400">800</span>
                  <span className="absolute right-0 -top-3 text-xs text-slate-400">586</span>
                </div>
              </div>
              
              {/* Judah row */}
              <div className="flex items-center gap-4">
                <span className="text-blue-400 text-xs w-20">Иуда</span>
                <div className="flex-1 flex gap-1">
                  <div className="bg-emerald-500/60 rounded px-2 py-1 text-xs text-slate-200">Аса</div>
                  <div className="bg-emerald-500/60 rounded px-2 py-1 text-xs text-slate-200">Иосафат</div>
                  <div className="bg-red-500/60 rounded px-2 py-1 text-xs text-slate-200">Ахаз</div>
                  <div className="bg-emerald-500/60 rounded px-2 py-1 text-xs text-slate-200">Езекия</div>
                </div>
              </div>
              
              {/* Israel row */}
              <div className="flex items-center gap-4">
                <span className="text-orange-400 text-xs w-20">Израиль</span>
                <div className="flex-1 flex gap-1">
                  <div className="bg-red-500/60 rounded px-2 py-1 text-xs text-slate-200">Ахав</div>
                  <div className="bg-amber-500/60 rounded px-2 py-1 text-xs text-slate-200">Ииуй</div>
                  <div className="bg-red-500/60 rounded px-2 py-1 text-xs text-slate-200">Иеровоам II</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default TimelineOverviewSlideComponent;
