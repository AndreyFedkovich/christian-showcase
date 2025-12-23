import { DialogueQuestionSlide as DialogueQuestionSlideType } from "@/data/god-exists";
import { User } from "lucide-react";
import { useTypewriter } from "@/hooks/use-typewriter";
import { motion } from "framer-motion";

interface DialogueQuestionSlideProps {
  slide: DialogueQuestionSlideType;
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

const DialogueQuestionSlide = ({ slide }: DialogueQuestionSlideProps) => {
  const { displayedText, isComplete } = useTypewriter({
    text: slide.question,
    speed: 40,
    delay: 300,
  });

  return (
    <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-8 md:p-12">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
      </div>

      <motion.div 
        className="relative max-w-5xl w-full"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* User bubble */}
        <div className="flex items-start gap-8">
          {/* Avatar */}
          <motion.div 
            className="flex-shrink-0 w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg"
            variants={itemVariants}
          >
            <User className="w-10 h-10 md:w-12 md:h-12 text-white" />
          </motion.div>

          {/* Message bubble */}
          <motion.div className="flex-1" variants={itemVariants}>
            <div className="relative group">

              {/*
              1. ОСНОВНОЙ КОНТЕЙНЕР
              - z-10: Самый нижний слой
              - border-l-0: Убираем левую границу (рисуем сами)
              - rounded-2xl: Фон закругляется, чтобы заполнить углы цветом
              */}
              <div
                  className="
                      relative z-10
                      bg-gradient-to-br from-blue-500/20 to-blue-600/20
                      backdrop-blur-sm
                      rounded-2xl p-10 md:p-12
                      border-t border-r border-b border-l-0 border-blue-500/30
                    "
              >
                {/* Label */}
                <div className="inline-block px-5 py-2 bg-blue-500/30 rounded-full mb-8">
                  <span className="text-base md:text-lg font-sans font-medium text-blue-300 uppercase tracking-wider">
                    Вопрос человека
                  </span>
                </div>

                {/* Question with typewriter effect */}
                <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
                  {displayedText}
                  {!isComplete && (
                      <span className="animate-blink text-blue-400 ml-1">|</span>
                  )}
                </h2>
              </div>

              {/* =========================================================
                PIXEL PERFECT СБОРКА ЛЕВОЙ ГРАНИЦЫ
               ========================================================= */}

              {/*
              СЕГМЕНТ 1: ВЕРХНЯЯ ЛИНИЯ
              - z-20: Лежит поверх фона, но под треугольником
              - h-[34px]: Чуть длиннее, чем 32px (top-8), чтобы зайти ПОД треугольник и закрыть дырку
              */}
              <div
                  className="
                    absolute left-0 top-0
                    w-4 h-[27px]
                    border-l border-blue-500/30
                    rounded-tl-2xl
                    z-20 pointer-events-none
                  "
              />

              {/*
              СЕГМЕНТ 2: НИЖНЯЯ ЛИНИЯ
              - z-20: Лежит поверх фона, но под треугольником
              - top-[64px]: Начинается чуть выше конца треугольника (66px), чтобы создать нахлест
              - bottom-0: Тянется до самого низа
              */}
              <div
                  className="
                    absolute left-0 bottom-0 top-[61px]
                    w-4
                    border-l border-blue-500/30
                    rounded-bl-2xl
                    z-20 pointer-events-none
                  "
              />

              {/*
              СЕГМЕНТ 3: ХВОСТИК (ПЕРЕКРЫТИЕ)
              - z-30: Самый верхний слой! Перекрывает концы линий.
              - top-8 (32px): Позиция
              - left-[-13px]: Сдвиг влево для идеальной центровки по линии
              - clip-path: Убирает правую часть квадрата (избегаем наложения прозрачности внутри блока)
              */}
              <div
                  className="
                    absolute z-30
                    top-8 -left-[12px]
                    w-6 h-6 rotate-45
                    bg-gradient-to-br from-blue-500/20 to-blue-600/20
                    backdrop-blur-sm
                    border-l border-b border-blue-500/30
                    [clip-path:polygon(0_0,0_100%,100%_100%)]
                  "
              />
            </div>
          </motion.div>
        </div>

        {/* Hint text - appears after typing complete */}
        <motion.div 
          className="mt-14 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isComplete ? 1 : 0, y: isComplete ? 0 : 20 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-2xl md:text-3xl text-slate-400 italic">
            Вопрос задан искусственному интеллекту...
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default DialogueQuestionSlide;
