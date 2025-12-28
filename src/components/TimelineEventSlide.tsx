import { motion } from 'framer-motion';
import { Calendar, AlertTriangle, BookOpen, Lightbulb } from 'lucide-react';
import type { TimelineEventSlide as TimelineEventSlideType } from '@/data/kings-prophets';

interface TimelineEventSlideProps {
  slide: TimelineEventSlideType;
  direction: 'next' | 'prev';
}

const TimelineEventSlide = ({ slide }: TimelineEventSlideProps) => {
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

  // Determine if this is a negative event (fall, destruction)
  const isNegativeEvent = slide.event.includes('Падение') || slide.event.includes('Разделение');
  const gradientClass = isNegativeEvent 
    ? 'from-red-950 via-stone-900 to-stone-950'
    : 'from-amber-950 via-stone-900 to-stone-950';
  const accentColor = isNegativeEvent ? 'text-red-400' : 'text-amber-400';
  const glowColor = isNegativeEvent ? 'bg-red-500/10' : 'bg-amber-500/10';

  return (
    <div className={`min-h-screen bg-gradient-to-b ${gradientClass} flex flex-col relative overflow-hidden`}>
      {/* Background glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute top-1/4 left-1/4 w-96 h-96 ${glowColor} rounded-full blur-3xl`} />
        <div className={`absolute bottom-1/4 right-1/4 w-80 h-80 ${glowColor} rounded-full blur-3xl`} />
      </div>

      <motion.div 
        className="flex-1 flex flex-col justify-center items-center px-4 md:px-8 lg:px-16 py-6 md:py-8 relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Year Badge */}
        <motion.div 
          variants={itemVariants}
          className={`mb-6 flex items-center gap-3 px-6 py-3 rounded-2xl bg-stone-800/60 border border-stone-700/50`}
        >
          <Calendar className={`w-6 h-6 ${accentColor}`} />
          <span className={`text-3xl md:text-4xl font-bold ${accentColor}`}>{slide.year}</span>
          <span className="text-stone-400 text-lg">до н.э.</span>
        </motion.div>

        {/* Event Title */}
        <motion.div variants={itemVariants} className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-2">
            {isNegativeEvent && <AlertTriangle className={`w-8 h-8 ${accentColor}`} />}
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white">
              {slide.event}
            </h1>
            {isNegativeEvent && <AlertTriangle className={`w-8 h-8 ${accentColor}`} />}
          </div>
        </motion.div>

        {/* Description Card */}
        <motion.div 
          variants={itemVariants}
          className="max-w-3xl w-full bg-stone-800/40 rounded-2xl border border-stone-700/50 p-6 md:p-8 backdrop-blur-sm mb-6"
        >
          <ul className="space-y-4">
            {slide.description.map((item, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.15 }}
                className="flex items-start gap-3"
              >
                <span className={`mt-1.5 w-2 h-2 rounded-full flex-shrink-0 ${accentColor.replace('text-', 'bg-')}`} />
                <span className="text-lg text-stone-200 leading-relaxed">{item}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* Significance */}
        <motion.div 
          variants={itemVariants}
          className={`max-w-3xl w-full p-5 rounded-xl ${isNegativeEvent ? 'bg-red-500/10 border border-red-500/20' : 'bg-amber-500/10 border border-amber-500/20'}`}
        >
          <div className="flex items-start gap-3">
            <Lightbulb className={`w-5 h-5 mt-0.5 flex-shrink-0 ${accentColor}`} />
            <p className="text-lg text-stone-200 italic leading-relaxed">
              {slide.significance}
            </p>
          </div>
        </motion.div>

        {/* References */}
        <motion.div 
          variants={itemVariants}
          className="mt-6 flex items-center gap-2"
        >
          <BookOpen className={`w-4 h-4 ${accentColor}`} />
          <div className="flex flex-wrap gap-2">
            {slide.references.map((ref) => (
              <span key={ref} className="text-sm text-stone-500">{ref}</span>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default TimelineEventSlide;
