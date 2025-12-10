import { DialogueQuestionSlide as DialogueQuestionSlideType } from "@/data/god-exists";
import { User } from "lucide-react";

interface DialogueQuestionSlideProps {
  slide: DialogueQuestionSlideType;
  direction?: 'next' | 'prev';
}

const DialogueQuestionSlide = ({ slide, direction = 'next' }: DialogueQuestionSlideProps) => {
  const animationClass = direction === 'next' 
    ? 'animate-slide-in-right' 
    : 'animate-slide-in-left';

  return (
    <div className={`absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-8 ${animationClass}`}>
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-4xl w-full">
        {/* User bubble */}
        <div className="flex items-start gap-6">
          {/* Avatar */}
          <div className="flex-shrink-0 w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg">
            <User className="w-8 h-8 text-white" />
          </div>

          {/* Message bubble */}
          <div className="flex-1">
            <div
                className="
                  relative
                  bg-gradient-to-br from-blue-500/20 to-blue-600/20
                  backdrop-blur-sm rounded-2xl p-8
                  border border-blue-500/30
                  before:content-['']
                  before:absolute before:-left-3 before:top-4
                  before:w-6 before:h-6
                  before:bg-[#26395c]                /* фон такой же, как у пузыря */
                  before:border-l before:border-b  /* рисуем только внешние стороны */
                  before:border-blue-500/30
                  before:rotate-45
                  rounded-tl-none
                "
            >
              {/* Label */}
              <div className="inline-block px-4 py-1 bg-blue-500/30 rounded-full mb-6">
                  <span className="text-sm font-sans font-medium text-blue-300 uppercase tracking-wider">
                    Вопрос человека
                  </span>
              </div>

              {/* Question */}
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                {slide.question}
              </h2>
            </div>
          </div>
        </div>

        {/* Hint text */}
        <div className="mt-12 text-center">
          <p className="text-3xl text-slate-400 italic">
            Вопрос задан искусственному интеллекту...
          </p>
        </div>
      </div>
    </div>
  );
};

export default DialogueQuestionSlide;
