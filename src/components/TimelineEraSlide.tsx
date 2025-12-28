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
      className="min-h-screen w-full bg-gradient-to-br from-amber-900/40 via-slate-900 to-slate-900 p-6 md:p-12 flex flex-col justify-center"
    >
      <div className="max-w-4xl mx-auto w-full">
        {/* Year Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-amber-500/20 border border-amber-500/40">
            <Calendar className="w-6 h-6 text-amber-400" />
            <span className="text-3xl md:text-4xl font-bold text-amber-400">{era.year} до н.э.</span>
          </div>
        </motion.div>

        {/* Era Title */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-slate-100 mb-4">{era.title}</h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">{era.description}</p>
        </motion.div>

        {/* Significance Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-gradient-to-r from-amber-900/40 to-amber-800/20 border border-amber-500/30 rounded-xl p-6 mb-10 text-center"
        >
          <History className="w-8 h-8 text-amber-400 mx-auto mb-3" />
          <p className="text-lg text-amber-200">{era.significance}</p>
        </motion.div>

        {/* Causes and Consequences */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Causes */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-slate-800/60 border border-slate-700 rounded-xl p-6"
          >
            <h2 className="text-xl font-semibold text-red-400 mb-4 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" />
              Причины
            </h2>
            <ul className="space-y-3">
              {causes.map((cause, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  className="flex items-start gap-3 text-slate-300"
                >
                  <span className="mt-2 w-2 h-2 rounded-full bg-red-500/60 flex-shrink-0" />
                  <span>{cause}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Arrow */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.7 }}
            className="hidden md:flex items-center justify-center absolute left-1/2 -translate-x-1/2"
          >
            <ArrowRight className="w-8 h-8 text-amber-400" />
          </motion.div>

          {/* Consequences */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-slate-800/60 border border-slate-700 rounded-xl p-6"
          >
            <h2 className="text-xl font-semibold text-blue-400 mb-4 flex items-center gap-2">
              <ArrowRight className="w-5 h-5" />
              Последствия
            </h2>
            <ul className="space-y-3">
              {consequences.map((consequence, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                  className="flex items-start gap-3 text-slate-300"
                >
                  <span className="mt-2 w-2 h-2 rounded-full bg-blue-500/60 flex-shrink-0" />
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
