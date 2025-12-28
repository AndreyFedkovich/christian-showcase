import { motion } from 'framer-motion';
import type { TimelineIntroSlide as TimelineIntroSlideType } from '@/data/kings-prophets';

interface TimelineIntroSlideProps {
  slide: TimelineIntroSlideType;
  direction: 'next' | 'prev';
}

const TimelineIntroSlide = ({ slide }: TimelineIntroSlideProps) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  const totalYears = slide.timeline.startYear - slide.timeline.endYear;
  const unitedWidth = ((slide.kingdoms.united.start - slide.kingdoms.united.end) / totalYears) * 100;
  const northernWidth = ((slide.kingdoms.northern.start - slide.kingdoms.northern.end) / totalYears) * 100;
  const southernWidth = ((slide.kingdoms.southern.start - slide.kingdoms.southern.end) / totalYears) * 100;
  
  const northernStart = ((slide.timeline.startYear - slide.kingdoms.northern.start) / totalYears) * 100;
  const southernStart = ((slide.timeline.startYear - slide.kingdoms.southern.start) / totalYears) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-950 via-stone-900 to-stone-950 flex flex-col relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-amber-400/10 rounded-full blur-3xl" />
        {/* Crown pattern */}
        <div className="absolute top-10 right-10 text-amber-500/10 text-9xl">👑</div>
        <div className="absolute bottom-10 left-10 text-amber-500/10 text-9xl rotate-180">👑</div>
      </div>

      <motion.div 
        className="flex-1 flex flex-col justify-center items-center px-4 md:px-8 lg:px-16 py-8 relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Title */}
        <motion.div variants={itemVariants} className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-amber-100 mb-4 tracking-tight">
            {slide.title}
          </h1>
          <p className="text-xl md:text-2xl text-amber-200/80 font-light">
            {slide.subtitle}
          </p>
        </motion.div>

        {/* Timeline period */}
        <motion.div 
          variants={itemVariants}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-4 bg-stone-800/50 px-8 py-4 rounded-2xl border border-amber-500/20">
            <span className="text-3xl md:text-4xl font-bold text-amber-400">{slide.timeline.startYear}</span>
            <span className="text-2xl text-stone-400">—</span>
            <span className="text-3xl md:text-4xl font-bold text-amber-400">{slide.timeline.endYear}</span>
            <span className="text-xl text-stone-400 ml-2">до н.э.</span>
          </div>
          <p className="text-stone-400 mt-3 text-lg">{totalYears} лет истории</p>
        </motion.div>

        {/* Visual Timeline */}
        <motion.div 
          variants={itemVariants}
          className="w-full max-w-5xl"
        >
          <div className="bg-stone-800/40 rounded-2xl p-6 md:p-8 border border-stone-700/50 backdrop-blur-sm">
            {/* United Kingdom */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-4 h-4 rounded-full bg-amber-500" />
                <span className="text-amber-200 font-semibold text-lg">Объединённое царство</span>
                <span className="text-stone-400 text-sm">
                  ({slide.kingdoms.united.start}-{slide.kingdoms.united.end} до н.э.)
                </span>
              </div>
              <div className="h-8 bg-stone-700/50 rounded-lg overflow-hidden relative">
                <motion.div 
                  className="absolute left-0 top-0 h-full bg-gradient-to-r from-amber-600 to-amber-500 rounded-lg"
                  initial={{ width: 0 }}
                  animate={{ width: `${unitedWidth}%` }}
                  transition={{ duration: 1, delay: 0.8 }}
                />
              </div>
            </div>

            {/* Divided Kingdoms */}
            <div className="grid grid-cols-1 gap-6">
              {/* Northern Kingdom */}
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-4 h-4 rounded-full bg-red-500" />
                  <span className="text-red-200 font-semibold text-lg">Северное царство (Израиль)</span>
                  <span className="text-stone-400 text-sm">
                    ({slide.kingdoms.northern.start}-{slide.kingdoms.northern.end} до н.э.)
                  </span>
                </div>
                <div className="h-8 bg-stone-700/50 rounded-lg overflow-hidden relative">
                  <motion.div 
                    className="absolute top-0 h-full bg-gradient-to-r from-red-700 to-red-500 rounded-lg"
                    style={{ left: `${northernStart}%` }}
                    initial={{ width: 0 }}
                    animate={{ width: `${northernWidth}%` }}
                    transition={{ duration: 1, delay: 1 }}
                  />
                </div>
              </div>

              {/* Southern Kingdom */}
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-4 h-4 rounded-full bg-blue-500" />
                  <span className="text-blue-200 font-semibold text-lg">Южное царство (Иудея)</span>
                  <span className="text-stone-400 text-sm">
                    ({slide.kingdoms.southern.start}-{slide.kingdoms.southern.end} до н.э.)
                  </span>
                </div>
                <div className="h-8 bg-stone-700/50 rounded-lg overflow-hidden relative">
                  <motion.div 
                    className="absolute top-0 h-full bg-gradient-to-r from-blue-700 to-blue-500 rounded-lg"
                    style={{ left: `${southernStart}%` }}
                    initial={{ width: 0 }}
                    animate={{ width: `${southernWidth}%` }}
                    transition={{ duration: 1, delay: 1.2 }}
                  />
                </div>
              </div>
            </div>

            {/* Timeline markers */}
            <div className="flex justify-between mt-6 text-stone-400 text-sm">
              <span>{slide.timeline.startYear}</span>
              <span>930 (разделение)</span>
              <span>722 (падение Израиля)</span>
              <span>{slide.timeline.endYear}</span>
            </div>
          </div>
        </motion.div>

        {/* Legend */}
        <motion.div 
          variants={itemVariants}
          className="flex flex-wrap justify-center gap-6 mt-8 text-sm"
        >
          <div className="flex items-center gap-2 bg-stone-800/40 px-4 py-2 rounded-lg">
            <span className="text-2xl">👑</span>
            <span className="text-stone-300">19 царей Израиля</span>
          </div>
          <div className="flex items-center gap-2 bg-stone-800/40 px-4 py-2 rounded-lg">
            <span className="text-2xl">👑</span>
            <span className="text-stone-300">20 царей Иудеи</span>
          </div>
          <div className="flex items-center gap-2 bg-stone-800/40 px-4 py-2 rounded-lg">
            <span className="text-2xl">📜</span>
            <span className="text-stone-300">16+ пророков</span>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default TimelineIntroSlide;
