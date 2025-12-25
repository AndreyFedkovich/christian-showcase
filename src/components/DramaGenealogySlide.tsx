import { motion, type Easing } from 'framer-motion';

interface GenealogyEra {
  era: string;
  names: string[];
  highlight?: string;
}

interface DramaGenealogySlideProps {
  slide: {
    type: 'drama-genealogy';
    actNumber: string;
    title: string;
    subtitle?: string;
    introVerse: {
      text: string;
      reference: string;
    };
    genealogy: GenealogyEra[];
    intensity: 'low' | 'medium' | 'high' | 'climax';
  };
  direction: 'next' | 'prev';
}

const easeOut: Easing = [0.4, 0, 0.2, 1];

const DramaGenealogySlide = ({ slide, direction }: DramaGenealogySlideProps) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: easeOut }
    }
  };

  const eraVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.6, ease: easeOut }
    }
  };

  const highlightedNames = ['Давид', 'Соломон', 'Фамарь', 'Раав', 'Руфь', 'Вирсавия', 'Иисус'];
  const womenNames = ['Фамарь', 'Раав', 'Руфь', 'Вирсавия'];

  const getNameStyle = (name: string) => {
    if (name === 'Иисус' || name === 'ИИСУС') {
      return 'text-amber-400 font-bold';
    }
    if (name === 'Давид') {
      return 'text-amber-300 font-semibold';
    }
    if (womenNames.some(w => name.includes(w))) {
      return 'text-rose-300 italic';
    }
    return 'text-slate-300';
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 flex flex-col relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-amber-400/5 rounded-full blur-3xl" />
        {/* Genealogy tree pattern */}
        <svg className="absolute inset-0 w-full h-full opacity-5">
          <pattern id="tree-lines" patternUnits="userSpaceOnUse" width="100" height="100">
            <line x1="50" y1="0" x2="50" y2="100" stroke="currentColor" strokeWidth="1" className="text-amber-400" />
            <line x1="0" y1="50" x2="100" y2="50" stroke="currentColor" strokeWidth="1" className="text-amber-400" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#tree-lines)" />
        </svg>
      </div>

      <motion.div 
        className="flex-1 flex flex-col px-4 md:px-8 lg:px-12 py-6 md:py-8 relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center mb-12 mt-8">
          <span className="text-amber-400/80 text-sm md:text-xl font-medium tracking-widest uppercase">
            {slide.actNumber}
          </span>
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mt-2">
            {slide.title}
          </h1>
        </motion.div>

        {/* Intro Verse */}
        <motion.div 
          variants={itemVariants}
          className="max-w-5xl mx-auto mb-6 p-6 md:p-8 bg-slate-800/40 rounded-xl border border-slate-700/50 backdrop-blur-sm"
        >
          <p className="text-slate-200 text-lg md:text-xl lg:text-2xl italic leading-relaxed text-center">
            "{slide.introVerse.text}"
          </p>
          <p className="text-amber-400/80 text-base md:text-lg mt-3 text-center font-medium">
            — {slide.introVerse.reference}
          </p>
        </motion.div>

        {/* Genealogy Chart */}
        <div className="flex-1 flex flex-col justify-center">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 w-full px-2 md:px-4">
            {slide.genealogy.map((era, eraIndex) => (
              <motion.div
                key={eraIndex}
                variants={eraVariants}
                className="relative"
              >
                {/* Era container */}
                <div className="bg-slate-800/50 rounded-2xl border border-slate-700/50 p-8 backdrop-blur-sm h-full">
                  {/* Era header */}
                  <div className="text-center mb-5 pb-4 border-b border-slate-700/50">
                    <span className="text-amber-400 text-sm md:text-base font-semibold tracking-wider uppercase">
                      Эра {eraIndex + 1}
                    </span>
                    <h3 className="text-white font-bold text-xl md:text-2xl mt-2">
                      {era.era}
                    </h3>
                  </div>

                  {/* Names grid */}
                  <div className="flex flex-wrap gap-3 justify-center">
                    {era.names.map((name, nameIndex) => (
                      <motion.span
                        key={nameIndex}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ 
                          delay: 0.5 + eraIndex * 0.3 + nameIndex * 0.05,
                          duration: 0.3
                        }}
                        className={`
                          text-lg md:text-xl px-4 py-2 rounded-lg
                          ${getNameStyle(name)}
                          ${name === era.highlight ? 'bg-amber-500/20 ring-2 ring-amber-400/50' : 'bg-slate-700/30'}
                        `}
                      >
                        {name}
                        {nameIndex < era.names.length - 1 && (
                          <span className="text-slate-600 ml-2">→</span>
                        )}
                      </motion.span>
                    ))}
                  </div>

                  {/* 14 generations badge */}
                  <div className="text-center mt-5 pt-4 border-t border-slate-700/30">
                    <span className="text-slate-400 text-base font-medium">14 родов</span>
                  </div>
                </div>

                {/* Connector arrow between eras */}
                {eraIndex < slide.genealogy.length - 1 && (
                  <div className="hidden lg:flex absolute -right-5 top-1/2 -translate-y-1/2 z-10">
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1 + eraIndex * 0.3 }}
                      className="text-amber-400/60 text-2xl"
                    >
                      ▶
                    </motion.div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          {/* Legend */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-wrap justify-center gap-6 mt-6 text-xl"
          >
            <div className="flex items-center gap-2">
              <span className="w-4 h-4 bg-amber-400/30 rounded border border-amber-400/50" />
              <span className="text-slate-400">Ключевые фигуры</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-4 h-4 bg-rose-400/20 rounded" />
              <span className="text-slate-400">Женщины в родословной</span>
            </div>
          </motion.div>
        </div>

      </motion.div>
    </div>
  );
};

export default DramaGenealogySlide;
