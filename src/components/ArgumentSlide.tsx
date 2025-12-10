import { ArgumentSlide as ArgumentSlideType } from "@/data/god-exists";
import { ThumbsUp, ThumbsDown, Lightbulb, Quote } from "lucide-react";

interface ArgumentSlideProps {
  slide: ArgumentSlideType;
  direction?: 'next' | 'prev';
}

const ArgumentSlide = ({ slide, direction = 'next' }: ArgumentSlideProps) => {
  const animationClass = direction === 'next' 
    ? 'animate-slide-in-right' 
    : 'animate-slide-in-left';

  const isPro = slide.argumentType === 'pro';

  return (
    <div className={`absolute inset-0 flex items-center justify-center p-8 ${animationClass} ${
      isPro 
        ? 'bg-gradient-to-br from-emerald-900 via-emerald-800 to-teal-900' 
        : 'bg-gradient-to-br from-rose-900 via-rose-800 to-red-900'
    }`}>
      {/* Decorative background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className={`absolute top-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl ${
          isPro ? 'bg-emerald-500/20' : 'bg-rose-500/20'
        }`} />
        <div className={`absolute bottom-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl ${
          isPro ? 'bg-teal-500/20' : 'bg-red-500/20'
        }`} />
      </div>

      <div className="relative max-w-4xl w-full space-y-8">
        {/* Header */}
        <div className="flex items-center gap-4">
          <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
            isPro ? 'bg-emerald-500/30' : 'bg-rose-500/30'
          }`}>
            {isPro ? (
              <ThumbsUp className="w-8 h-8 text-emerald-300" />
            ) : (
              <ThumbsDown className="w-8 h-8 text-rose-300" />
            )}
          </div>
          <div className={`inline-block px-4 py-2 rounded-full ${
            isPro ? 'bg-emerald-500/30' : 'bg-rose-500/30'
          }`}>
            <span className={`text-sm font-sans font-bold uppercase tracking-wider ${
              isPro ? 'text-emerald-300' : 'text-rose-300'
            }`}>
              {isPro ? 'Аргумент ЗА' : 'Аргумент ПРОТИВ'}
            </span>
          </div>
        </div>

        {/* Argument Name */}
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
          {slide.name}
        </h2>

        {/* Idea Section */}
        <div className={`relative p-8 rounded-2xl border ${
          isPro 
            ? 'bg-emerald-800/30 border-emerald-500/30' 
            : 'bg-rose-800/30 border-rose-500/30'
        }`}>
          <div className="absolute -top-4 left-6">
            <div className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
              isPro ? 'bg-emerald-500 text-emerald-950' : 'bg-rose-500 text-rose-950'
            }`}>
              <div className="flex items-center gap-1">
                <Lightbulb className="w-3 h-3" />
                Идея
              </div>
            </div>
          </div>
          <p className="text-xl md:text-2xl text-white/90 leading-relaxed mt-2">
            {slide.idea}
          </p>
        </div>

        {/* Summary Section */}
        <div className={`relative p-6 rounded-xl ${
          isPro ? 'bg-emerald-500/20' : 'bg-rose-500/20'
        }`}>
          <div className="flex items-start gap-4">
            <Quote className={`w-8 h-8 flex-shrink-0 ${
              isPro ? 'text-emerald-400' : 'text-rose-400'
            }`} />
            <div>
              <p className={`text-sm font-bold uppercase tracking-wider mb-2 ${
                isPro ? 'text-emerald-400' : 'text-rose-400'
              }`}>
                Коротко
              </p>
              <p className="text-2xl md:text-3xl font-semibold text-white italic">
                {slide.summary}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArgumentSlide;
