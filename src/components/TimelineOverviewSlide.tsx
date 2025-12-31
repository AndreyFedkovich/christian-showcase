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
      case 'Благчестивый царь':
        return CheckCircle;
      case 'Нечестивый царь':
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
          // Padding увеличен: p-6 md:p-12 -> p-10 md:p-20
          className="min-h-screen w-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex flex-col items-center justify-center p-10 md:p-20"
      >
        {/* Ширина увеличена: max-w-4xl -> max-w-7xl */}
        <div className="max-w-7xl mx-auto w-full">
          {/* Header */}
          <motion.div
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              // Margin увеличен: mb-10 -> mb-16
              className="text-center mb-16"
          >
            {/* Badge увеличен */}
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-slate-700/50 text-slate-300 text-lg mb-6">
              <Info className="w-6 h-6" />
              Легенда
            </div>
            {/* Title увеличен: text-3xl/4xl -> text-5xl/6xl */}
            <h1 className="text-5xl md:text-6xl font-bold text-slate-100">{title}</h1>
          </motion.div>

          {/* Legends Grid */}
          {/* Gap увеличен: gap-4 -> gap-8 */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {legends.map((legend, index) => {
              const Icon = getIcon(legend.label);
              const colors = getColorClasses(legend.color);

              return (
                  <motion.div
                      key={legend.label}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                      // Padding увеличен: p-5 -> p-8
                      className={`${colors.bg} ${colors.border} border-2 rounded-2xl p-8 hover:scale-105 transition-transform`}
                  >
                    <div className="flex items-center gap-4 mb-4">
                      {/* Иконка увеличена: w-6 -> w-10 */}
                      <Icon className={`w-10 h-10 ${colors.icon}`} />
                      {/* Заголовок карточки увеличен: text-lg -> text-2xl */}
                      <h3 className={`text-2xl font-semibold ${colors.text}`}>{legend.label}</h3>
                    </div>
                    {/* Описание увеличено: text-sm -> text-lg */}
                    <p className="text-slate-300 text-lg leading-relaxed">{legend.description}</p>
                  </motion.div>
              );
            })}
          </div>



          {/* Timeline Preview */}
          <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
          >
            {/* Контейнер увеличен: p-6 -> p-10 */}
            <div className="bg-slate-800/60 rounded-2xl p-10 overflow-hidden border border-slate-700/50">
              {/* Mini timeline preview */}
              {/* Вертикальный ритм увеличен: space-y-4 -> space-y-8 */}
              <div className="space-y-8">

                {/* Prophets row */}
                <div className="flex items-center gap-6">
                  {/* Лейбл ряда увеличен: text-xs -> text-base, w-20 -> w-28 */}
                  <span className="text-purple-400 text-base font-semibold w-28 uppercase tracking-wide">Пророки</span>
                  <div className="flex-1 flex gap-3">
                    {/* Элементы увеличены: px-3 py-1 -> px-4 py-2, text-xs -> text-sm */}
                    <div className="bg-purple-600/60 rounded-md px-4 py-2 text-sm text-purple-100 font-medium border border-purple-500/30">Илия</div>
                    <div className="bg-purple-600/60 rounded-md px-4 py-2 text-sm text-purple-100 font-medium border border-purple-500/30">Елисей</div>
                    <div className="bg-purple-600/60 rounded-md px-4 py-2 text-sm text-purple-100 font-medium border border-purple-500/30">Исаия</div>
                  </div>
                </div>

                {/* Year scale */}
                <div className="flex items-center gap-6">
                  <span className="text-slate-500 text-base font-semibold w-28 uppercase tracking-wide">Годы</span>
                  <div className="flex-1 h-0.5 bg-slate-600 relative my-2">
                    {/* Метки лет увеличены: text-xs -> text-sm */}
                    <span className="absolute left-0 -top-8 text-sm text-slate-400 font-medium">930</span>
                    <span className="absolute left-1/2 -translate-x-1/2 -top-8 text-sm text-slate-400 font-medium">800</span>
                    <span className="absolute right-0 -top-8 text-sm text-slate-400 font-medium">586</span>
                  </div>
                </div>

                {/* Judah row */}
                <div className="flex items-center gap-6">
                  <span className="text-blue-400 text-base font-semibold w-28 uppercase tracking-wide">Иуда</span>
                  <div className="flex-1 flex gap-2">
                    <div className="bg-emerald-500/60 rounded-md px-3 py-2 text-sm text-slate-100 font-medium border border-emerald-500/30">Аса</div>
                    <div className="bg-emerald-500/60 rounded-md px-3 py-2 text-sm text-slate-100 font-medium border border-emerald-500/30">Иосафат</div>
                    <div className="bg-red-500/60 rounded-md px-3 py-2 text-sm text-slate-100 font-medium border border-red-500/30">Ахаз</div>
                    <div className="bg-emerald-500/60 rounded-md px-3 py-2 text-sm text-slate-100 font-medium border border-emerald-500/30">Езекия</div>
                  </div>
                </div>

                {/* Israel row */}
                <div className="flex items-center gap-6">
                  <span className="text-orange-400 text-base font-semibold w-28 uppercase tracking-wide">Израиль</span>
                  <div className="flex-1 flex gap-2">
                    <div className="bg-red-500/60 rounded-md px-3 py-2 text-sm text-slate-100 font-medium border border-red-500/30">Ахав</div>
                    <div className="bg-amber-500/60 rounded-md px-3 py-2 text-sm text-slate-100 font-medium border border-amber-500/30">Ииуй</div>
                    <div className="bg-red-500/60 rounded-md px-3 py-2 text-sm text-slate-100 font-medium border border-red-500/30">Иеровоам II</div>
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
