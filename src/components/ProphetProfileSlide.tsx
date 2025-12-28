import { motion } from 'framer-motion';
import { Scroll, BookOpen, Users, Calendar, MessageCircle } from 'lucide-react';
import type { ProphetProfileSlide as ProphetProfileSlideType } from '@/data/kings-prophets';

interface ProphetProfileSlideProps {
  slide: ProphetProfileSlideType;
  direction: 'next' | 'prev';
}

const getAudienceStyle = (audience: ProphetProfileSlideType['audience']) => {
  switch (audience) {
    case 'north':
      return {
        label: 'Северное царство (Израиль)',
        color: 'text-red-400',
        bg: 'bg-red-500/10',
        border: 'border-red-500/30'
      };
    case 'south':
      return {
        label: 'Южное царство (Иудея)',
        color: 'text-blue-400',
        bg: 'bg-blue-500/10',
        border: 'border-blue-500/30'
      };
    case 'both':
      return {
        label: 'Оба царства',
        color: 'text-purple-400',
        bg: 'bg-purple-500/10',
        border: 'border-purple-500/30'
      };
    case 'nations':
      return {
        label: 'Языческие народы',
        color: 'text-amber-400',
        bg: 'bg-amber-500/10',
        border: 'border-amber-500/30'
      };
  }
};

const ProphetProfileSlide = ({ slide }: ProphetProfileSlideProps) => {
  const audienceStyle = getAudienceStyle(slide.audience);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-950 via-stone-900 to-stone-950 flex flex-col relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl" />
        {/* Scroll decorations */}
        <div className="absolute top-10 right-10 text-indigo-500/10 text-8xl">📜</div>
        <div className="absolute bottom-10 left-10 text-indigo-500/10 text-8xl">📜</div>
      </div>

      <motion.div 
        className="flex-1 flex flex-col px-4 md:px-8 lg:px-16 py-6 md:py-8 relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center mb-6">
          <span className="text-indigo-400/80 text-sm md:text-base font-medium tracking-widest uppercase">
            Пророк
          </span>
        </motion.div>

        {/* Prophet Card */}
        <motion.div 
          variants={itemVariants}
          className="max-w-4xl mx-auto w-full bg-stone-800/40 rounded-2xl border border-indigo-500/20 p-6 md:p-8 backdrop-blur-sm"
        >
          {/* Name */}
          <div className="flex items-center justify-center gap-4 mb-4">
            <Scroll className="w-8 h-8 md:w-10 md:h-10 text-indigo-400" />
            <h1 className="text-3xl md:text-5xl font-bold text-white">{slide.name}</h1>
            <Scroll className="w-8 h-8 md:w-10 md:h-10 text-indigo-400" />
          </div>

          {/* Ministry Period and Audience */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-6">
            <div className="flex items-center gap-2 bg-stone-700/50 px-4 py-2 rounded-lg">
              <Calendar className="w-4 h-4 text-indigo-400" />
              <span className="text-stone-200">
                {slide.ministry.start}-{slide.ministry.end} до н.э.
              </span>
            </div>
            <div className={`flex items-center gap-2 px-4 py-2 rounded-lg ${audienceStyle.bg} border ${audienceStyle.border}`}>
              <span className={audienceStyle.color}>{audienceStyle.label}</span>
            </div>
          </div>

          {/* Book */}
          {slide.book && (
            <motion.div 
              variants={itemVariants}
              className="flex items-center justify-center gap-2 mb-6"
            >
              <BookOpen className="w-5 h-5 text-indigo-400" />
              <span className="text-indigo-300 font-medium">Книга: {slide.book}</span>
            </motion.div>
          )}

          {/* Key Message */}
          <motion.div 
            variants={itemVariants}
            className="mb-6 p-5 bg-indigo-500/10 rounded-xl border border-indigo-500/20"
          >
            <div className="flex items-center gap-2 mb-3">
              <MessageCircle className="w-5 h-5 text-indigo-400" />
              <h3 className="text-lg font-semibold text-indigo-300">Ключевое послание</h3>
            </div>
            <p className="text-lg text-stone-200 italic leading-relaxed">
              "{slide.keyMessage}"
            </p>
          </motion.div>

          {/* Memorable */}
          <motion.div 
            variants={itemVariants}
            className="mb-6 p-5 bg-stone-700/30 rounded-xl"
          >
            <h3 className="text-sm font-medium text-stone-400 mb-2">Запоминающаяся черта</h3>
            <p className="text-stone-200 leading-relaxed">
              {slide.memorable}
            </p>
          </motion.div>

          {/* Contemporary Kings */}
          <div className="pt-4 border-t border-stone-700/50">
            <div className="flex items-center gap-2 mb-3">
              <Users className="w-5 h-5 text-indigo-400" />
              <span className="text-stone-400 text-sm">Современники-цари:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {slide.contemporaryKings.map((king) => (
                <span 
                  key={king}
                  className="px-3 py-1.5 bg-stone-700/50 rounded-full text-sm text-stone-300 flex items-center gap-1"
                >
                  👑 {king}
                </span>
              ))}
            </div>
          </div>

          {/* References */}
          <div className="mt-4 pt-4 border-t border-stone-700/50">
            <div className="flex items-center gap-2 mb-2">
              <BookOpen className="w-4 h-4 text-indigo-400" />
              <span className="text-stone-400 text-sm">Писание:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {slide.references.map((ref) => (
                <span key={ref} className="text-xs text-stone-500">{ref}</span>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ProphetProfileSlide;
