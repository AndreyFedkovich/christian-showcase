import { motion } from "framer-motion";
import { CreationDiagramSlide as CreationDiagramSlideType } from "@/data/creation";

interface CreationDiagramSlideProps {
  slide: CreationDiagramSlideType;
  direction: 'next' | 'prev';
}

const CreationDiagramSlide = ({ slide, direction }: CreationDiagramSlideProps) => {
  const maxAge = Math.max(...slide.bars.map(b => b.age));

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/5 via-transparent to-transparent" />

      <div className="relative z-10 w-full max-w-6xl px-8 py-10">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-4 text-center"
        >
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-3">
            {slide.title}
          </h2>
          {slide.subtitle && (
            <p className="text-xl text-white/50 font-sans">
              {slide.subtitle}
            </p>
          )}
        </motion.div>

        {/* Legend */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex justify-center gap-8 mb-8"
        >
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-sm bg-emerald-500" />
            <span className="text-base text-white/70 font-sans">До потопа</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-sm bg-amber-500" />
            <span className="text-base text-white/70 font-sans">После потопа</span>
          </div>
        </motion.div>

        {/* Bars */}
        <div className="space-y-3">
          {slide.bars.map((bar, index) => {
            const widthPercent = (bar.age / maxAge) * 100;
            const isPreFlood = bar.era === 'pre-flood';

            return (
              <motion.div
                key={bar.name}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.4 + index * 0.08 }}
                className="flex items-center gap-4"
              >
                {/* Name */}
                <div className="w-28 text-right">
                  <span className="text-lg font-sans text-white/80 font-medium">
                    {bar.name}
                  </span>
                </div>

                {/* Bar */}
                <div className="flex-1 relative h-8">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${widthPercent}%` }}
                    transition={{ 
                      duration: 0.8, 
                      delay: 0.6 + index * 0.08,
                      ease: [0.4, 0, 0.2, 1],
                    }}
                    className={`h-full rounded-r-md relative ${
                      isPreFlood 
                        ? 'bg-gradient-to-r from-emerald-600 to-emerald-400' 
                        : 'bg-gradient-to-r from-amber-600 to-amber-400'
                    }`}
                  >
                    {/* Age label inside bar */}
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.2 + index * 0.08 }}
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-sm font-bold text-white drop-shadow-md"
                    >
                      {bar.age} лет
                    </motion.span>
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Flood divider line */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="mt-6 flex items-center gap-3"
        >
          <div className="w-28" />
          <div className="flex-1 relative">
            <div className="absolute left-[52%] -top-[calc(3*2.75rem+3*0.75rem+1.5rem)] h-[calc(11*2.75rem+10*0.75rem)] w-px bg-red-500/40 z-10" 
              style={{ display: 'none' }} 
            />
          </div>
        </motion.div>

        {/* Conclusion */}
        {slide.conclusion && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.2, duration: 0.6 }}
            className="text-center text-xl text-white/60 font-serif italic mt-8 max-w-3xl mx-auto"
          >
            {slide.conclusion}
          </motion.p>
        )}
      </div>
    </div>
  );
};

export default CreationDiagramSlide;
