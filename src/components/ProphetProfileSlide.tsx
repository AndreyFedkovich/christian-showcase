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
      className="min-h-screen w-full bg-gradient-to-br from-purple-900/60 via-slate-900 to-slate-900 p-6 md:p-12 flex flex-col justify-center"
    >
      <div className="max-w-4xl mx-auto w-full">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          {/* Prophet Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-500/20 text-purple-400 text-sm mb-4">
            <Scroll className="w-4 h-4" />
            <span>Пророк</span>
          </div>

          {/* Prophet Name */}
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 rounded-full bg-purple-500/20 border-2 border-purple-500/50 flex items-center justify-center">
              <BookOpen className="w-8 h-8 text-purple-400" />
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-slate-100">{prophet.name}</h1>
              <p className="text-lg text-purple-400 font-medium">{prophet.keyMessage}</p>
            </div>
          </div>

          {/* Meta Info */}
          <div className="flex flex-wrap gap-4 text-slate-400">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>{prophet.startYear}–{prophet.endYear} до н.э.</span>
            </div>
            {prophet.book && (
              <div className="flex items-center gap-2 text-purple-400">
                <BookOpen className="w-4 h-4" />
                <span>Книга: {prophet.book}</span>
              </div>
            )}
            {prophet.relatedKings && prophet.relatedKings.length > 0 && (
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                <span>При царях: {prophet.relatedKings.join(', ')}</span>
              </div>
            )}
          </div>
        </motion.div>

        {/* Content Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Left: Details */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h2 className="text-xl font-semibold text-slate-200 mb-4 flex items-center gap-2">
              <span className="w-1 h-6 rounded bg-purple-500/40" />
              О служении
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
                  <span className="mt-2 w-2 h-2 rounded-full bg-purple-500/40 flex-shrink-0" />
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
              <div className="relative">
                <Quote className="absolute -top-4 -left-2 w-12 h-12 text-purple-500/20" />
                <div className="bg-gradient-to-br from-purple-900/40 to-slate-800/60 border border-purple-500/30 rounded-xl p-6">
                  <p className="text-xl md:text-2xl text-slate-100 italic leading-relaxed">
                    «{keyVerse.text}»
                  </p>
                  <p className="text-purple-400 mt-4 text-right font-medium">
                    — {keyVerse.reference}
                  </p>
                </div>
              </div>
            )}

            {/* Timeline visualization */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="mt-8"
            >
              <p className="text-slate-500 text-sm mb-2">Период служения</p>
              <div className="relative h-8 bg-slate-800/60 rounded-full overflow-hidden">
                <div 
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-purple-600 to-purple-400 rounded-full"
                  style={{ width: '100%' }}
                />
                <div className="absolute inset-0 flex items-center justify-between px-4 text-xs text-slate-200">
                  <span>{prophet.startYear}</span>
                  <span className="font-medium">{prophet.endYear - prophet.startYear} лет</span>
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
