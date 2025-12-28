import { motion } from 'framer-motion';

interface TimelineChartSlideProps {
  slide: {
    type: 'timeline-chart';
    title: string;
    image: string;
    caption: string;
    period: string;
  };
  direction: 'next' | 'prev';
}

const TimelineChartSlide = ({ slide }: TimelineChartSlideProps) => {
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
    <div className="min-h-screen bg-gradient-to-b from-stone-950 via-stone-900 to-stone-950 flex flex-col relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-amber-400/5 rounded-full blur-3xl" />
      </div>

      <motion.div 
        className="flex-1 flex flex-col px-4 md:px-6 py-4 md:py-6 relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center mb-4">
          <span className="text-amber-400/80 text-sm md:text-base font-medium tracking-widest uppercase">
            {slide.period}
          </span>
          <h1 className="text-xl md:text-3xl font-bold text-white mt-1">
            {slide.title}
          </h1>
        </motion.div>

        {/* Image Container */}
        <motion.div 
          variants={itemVariants}
          className="flex-1 flex items-center justify-center"
        >
          <div className="relative max-w-5xl w-full">
            <div className="bg-stone-800/40 rounded-2xl border border-stone-700/50 p-2 md:p-4 backdrop-blur-sm">
              <img 
                src={slide.image} 
                alt={slide.title}
                className="w-full h-auto rounded-xl object-contain max-h-[60vh]"
              />
            </div>
          </div>
        </motion.div>

        {/* Caption */}
        <motion.div 
          variants={itemVariants}
          className="text-center mt-4"
        >
          <p className="text-stone-400 text-sm md:text-base italic">
            {slide.caption}
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default TimelineChartSlide;
