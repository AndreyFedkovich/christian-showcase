import { DialogueAnswerSlide as DialogueAnswerSlideType } from "@/data/god-exists";
import { Bot } from "lucide-react";

interface DialogueAnswerSlideProps {
  slide: DialogueAnswerSlideType;
  direction?: 'next' | 'prev';
}

const DialogueAnswerSlide = ({ slide, direction = 'next' }: DialogueAnswerSlideProps) => {
  const animationClass = direction === 'next' 
    ? 'animate-slide-in-right' 
    : 'animate-slide-in-left';

  // Variant with image
  if (slide.image) {
    return (
      <div className={`absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-slate-100 flex items-center justify-center p-8 ${animationClass}`}>
        <div className="max-w-7xl w-full">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Content Section */}
            <div className="space-y-6">
              {/* AI Header */}
              <div className="flex items-center gap-4">
                <div className="flex-shrink-0 w-14 h-14 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg">
                  <Bot className="w-7 h-7 text-white" />
                </div>
                <div className="inline-block px-4 py-1 bg-emerald-500/20 rounded-full">
                  <span className="text-sm font-sans font-medium text-emerald-700 uppercase tracking-wider">
                    Ответ ИИ
                  </span>
                </div>
              </div>

              {/* Title */}
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 leading-tight">
                {slide.title}
              </h2>

              {/* Content */}
              <div className="space-y-4">
                {slide.content.map((paragraph, index) => (
                  <p
                    key={index}
                    className="text-xl md:text-2xl text-slate-700 leading-relaxed font-sans"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            {/* Image Section */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-500 opacity-30 blur-2xl group-hover:opacity-50 transition-smooth rounded-2xl" />
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-premium">
                <img 
                  src={slide.image} 
                  alt={slide.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Variant without image
  return (
    <div className={`absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-slate-100 flex items-center justify-center p-8 ${animationClass}`}>
      <div className="max-w-4xl w-full">
        {/* AI bubble */}
        <div className="flex items-start gap-6">
          {/* Avatar */}
          <div className="flex-shrink-0 w-16 h-16 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg">
            <Bot className="w-8 h-8 text-white" />
          </div>

          {/* Message */}
          <div className="flex-1">
            {/* Label */}
            <div className="inline-block px-4 py-1 bg-emerald-500/20 rounded-full mb-4">
              <span className="text-sm font-sans font-medium text-emerald-700 uppercase tracking-wider">
                Ответ ИИ
              </span>
            </div>

            {/* Title */}
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 leading-tight mb-8">
              {slide.title}
            </h2>

            {/* Content */}
            <div className="space-y-6">
              {slide.content.map((paragraph, index) => (
                <p
                  key={index}
                  className="text-xl md:text-2xl text-slate-700 leading-relaxed font-sans"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>

        {/* Decorative element */}
        <div className="mt-12 flex items-center gap-2 opacity-30">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-emerald-500 to-transparent" />
        </div>
      </div>
    </div>
  );
};

export default DialogueAnswerSlide;
