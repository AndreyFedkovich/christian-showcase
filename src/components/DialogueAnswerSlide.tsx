import { DialogueAnswerSlide as DialogueAnswerSlideType } from "@/data/god-exists";
import { Bot } from "lucide-react";
import { useTypewriter } from "@/hooks/use-typewriter";
import { motion } from "framer-motion";

interface DialogueAnswerSlideProps {
  slide: DialogueAnswerSlideType;
  direction?: 'next' | 'prev';
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.4, 0, 0.2, 1] as const
    }
  }
};

const imageVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.4, 0, 0.2, 1] as const
    }
  }
};

const DialogueAnswerSlide = ({ slide }: DialogueAnswerSlideProps) => {
  const { displayedText: titleText, isComplete: titleComplete } = useTypewriter({
    text: slide.title,
    speed: 25,
    delay: 300,
  });

  // Variant with image
  if (slide.image) {
    return (
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-slate-100 flex items-center justify-center p-8 md:p-12">
        <motion.div 
          className="max-w-8xl w-full"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Content Section */}
            <div className="space-y-8">
              {/* AI Header */}
              <motion.div className="flex items-center gap-5" variants={itemVariants}>
                <div className="flex-shrink-0 w-20 h-20 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg">
                  <Bot className="w-10 h-10 text-white" />
                </div>
                <div className="inline-block px-5 py-2 bg-emerald-500/20 rounded-full">
                  <span className="text-base md:text-lg font-sans font-medium text-emerald-700 uppercase tracking-wider">
                    Ответ ИИ
                  </span>
                </div>
              </motion.div>

              {/* Title with typewriter */}
              <motion.h2 
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight"
                variants={itemVariants}
              >
                {titleText}
                {!titleComplete && (
                  <span className="animate-blink text-emerald-500 ml-1">|</span>
                )}
              </motion.h2>

              {/* Content - appears after title completes */}
              <motion.div 
                className="space-y-5"
                initial={{ opacity: 0 }}
                animate={{ opacity: titleComplete ? 1 : 0 }}
                transition={{ duration: 0.5 }}
              >
                {slide.content.map((paragraph, index) => (
                  <motion.p
                    key={index}
                    className="text-2xl md:text-3xl text-slate-700 leading-relaxed font-sans"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: titleComplete ? 1 : 0, y: titleComplete ? 0 : 20 }}
                    transition={{ duration: 0.5, delay: index * 0.15 }}
                  >
                    {paragraph}
                  </motion.p>
                ))}
              </motion.div>
            </div>

            {/* Image Section */}
            <motion.div 
              className="relative group"
              variants={imageVariants}
              initial="hidden"
              animate={titleComplete ? "visible" : "hidden"}
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-500 opacity-30 blur-2xl group-hover:opacity-50 transition-smooth rounded-2xl" />
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-premium">
                <img 
                  src={slide.image} 
                  alt={slide.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    );
  }

  // Variant without image
  return (
    <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-slate-100 flex items-center justify-center p-8 md:p-12">
      <motion.div 
        className="max-w-5xl w-full"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* AI bubble */}
        <div className="flex items-start gap-8">
          {/* Avatar */}
          <motion.div 
            className="flex-shrink-0 w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg"
            variants={itemVariants}
          >
            <Bot className="w-10 h-10 md:w-12 md:h-12 text-white" />
          </motion.div>

          {/* Message */}
          <motion.div className="flex-1" variants={itemVariants}>
            {/* Label */}
            <div className="inline-block px-5 py-2 bg-emerald-500/20 rounded-full mb-6">
              <span className="text-base md:text-lg font-sans font-medium text-emerald-700 uppercase tracking-wider">
                Ответ ИИ
              </span>
            </div>

            {/* Title with typewriter */}
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight mb-10">
              {titleText}
              {!titleComplete && (
                <span className="animate-blink text-emerald-500 ml-1">|</span>
              )}
            </h2>

            {/* Content - appears after title completes */}
            <motion.div 
              className="space-y-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: titleComplete ? 1 : 0 }}
              transition={{ duration: 0.5 }}
            >
              {slide.content.map((paragraph, index) => (
                <motion.p
                  key={index}
                  className="text-2xl md:text-3xl text-slate-700 leading-relaxed font-sans"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: titleComplete ? 1 : 0, y: titleComplete ? 0 : 20 }}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                >
                  {paragraph}
                </motion.p>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Decorative element */}
        <motion.div 
          className="mt-14 flex items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: titleComplete ? 0.3 : 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-emerald-500 to-transparent" />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default DialogueAnswerSlide;
