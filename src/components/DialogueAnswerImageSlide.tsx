import { motion } from "framer-motion";
import { Bot } from "lucide-react";
import { useTypewriter } from "@/hooks/use-typewriter";

export interface DialogueAnswerImageSlideType {
  type: 'dialogue-answer-image';
  title: string;
  content: string[];
  image: string;
}

interface DialogueAnswerImageSlideProps {
  slide: DialogueAnswerImageSlideType;
  direction: 'next' | 'prev';
}

const DialogueAnswerImageSlide = ({ slide }: DialogueAnswerImageSlideProps) => {
  const { displayedText: titleText, isComplete: titleComplete } = useTypewriter({ text: slide.title, speed: 35 });

  return (
    <div className="min-h-screen w-full relative overflow-hidden">
      {/* Full-screen background image */}
      <motion.div
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="absolute inset-0"
      >
        <img
          src={slide.image}
          alt={slide.title}
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* Gradient overlay from bottom - emerald/dark theme */}
      <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/95 via-emerald-950/70 to-emerald-950/30" />

      {/* Subtle animated glow */}
      <motion.div
        className="absolute inset-0 bg-emerald-500/5"
        animate={{ opacity: [0.02, 0.08, 0.02] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Content positioned at bottom */}
      <div className="absolute inset-0 flex flex-col justify-end z-10">
        <div className="w-full max-w-6xl mx-auto px-8 pb-16 md:pb-20">
          {/* AI Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-emerald-500/30 border border-emerald-400/30 backdrop-blur-sm mb-6"
          >
            <Bot className="w-5 h-5 text-emerald-200" />
            <span className="text-emerald-200 font-sans text-2xl font-medium uppercase tracking-wider">
              Ответ ИИ
            </span>
          </motion.div>

          {/* Title with typewriter effect */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-white mb-8 drop-shadow-2xl"
          >
            {titleText}
            {!titleComplete && (
              <span className="inline-block w-1 h-[0.9em] bg-emerald-400 ml-1 animate-pulse" />
            )}
          </motion.h1>

          {/* Content in blurred block */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="bg-black/30 backdrop-blur-md rounded-xl p-6 md:p-8 border border-white/10 max-w-4xl"
          >
            {slide.content.map((paragraph, index) => (
              <motion.p
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1 + index * 0.15 }}
                className="text-2xl md:text-3xl lg:text-4xl text-emerald-100/90 leading-relaxed mb-4 last:mb-0"
              >
                {paragraph}
              </motion.p>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default DialogueAnswerImageSlide;
