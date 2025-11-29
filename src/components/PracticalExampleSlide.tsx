import { PracticalExampleSlide as PracticalExampleSlideType } from "@/data/epistles-structure";
import { BookOpen, CheckCircle2 } from "lucide-react";

interface PracticalExampleSlideProps {
  slide: PracticalExampleSlideType;
  direction?: 'next' | 'prev';
}

const PracticalExampleSlide = ({ slide, direction = 'next' }: PracticalExampleSlideProps) => {
  const animationClass = direction === 'next' 
    ? 'animate-slide-in-right' 
    : 'animate-slide-in-left';

  return (
    <div className={`absolute inset-0 gradient-warm flex items-center justify-center p-8 ${animationClass}`}>
      <div className="max-w-6xl w-full space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-block px-6 py-2 bg-accent/20 backdrop-blur-sm rounded-full">
            <span className="text-sm font-sans font-medium text-accent uppercase tracking-wider">
              Практический пример
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">
            {slide.title}
          </h2>
          <p className="text-xl text-muted-foreground font-sans max-w-3xl mx-auto">
            {slide.scenario}
          </p>
        </div>

        {/* Two Columns: KNOW and DO */}
        <div className="grid md:grid-cols-2 gap-8 mt-12">
          {/* KNOW Section - Green */}
          <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-950 dark:to-emerald-900 rounded-3xl p-8 shadow-card border border-emerald-200 dark:border-emerald-800">
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-emerald-600 flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-emerald-900 dark:text-emerald-100 uppercase tracking-wider">
                  {slide.knowContent.title}
                </h3>
              </div>
              
              <ul className="space-y-4">
                {slide.knowContent.points.map((point, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-emerald-600 rounded-full mt-2 flex-shrink-0" />
                    <span className="text-base text-emerald-800 dark:text-emerald-200 font-sans leading-relaxed">
                      {point}
                    </span>
                  </li>
                ))}
              </ul>

              {slide.knowContent.source && (
                <div className="pt-4 border-t border-emerald-300 dark:border-emerald-700">
                  <p className="text-sm text-emerald-700 dark:text-emerald-300 font-sans italic">
                    📖 {slide.knowContent.source}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* DO Section - Red */}
          <div className="bg-gradient-to-br from-red-50 to-red-100 dark:from-red-950 dark:to-red-900 rounded-3xl p-8 shadow-card border border-red-200 dark:border-red-800">
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-red-600 flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-red-900 dark:text-red-100 uppercase tracking-wider">
                  {slide.doContent.title}
                </h3>
              </div>
              
              <ul className="space-y-4">
                {slide.doContent.points.map((point, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <span className="text-base text-red-800 dark:text-red-200 font-sans leading-relaxed">
                      {point}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Verse */}
        {slide.verse && (
          <div className="relative mt-8 p-8 bg-gradient-to-br from-primary/10 to-accent/10 backdrop-blur-sm rounded-lg border border-primary/20">
            <blockquote className="text-xl md:text-2xl text-foreground italic leading-relaxed mb-4">
              «{slide.verse.text}»
            </blockquote>
            <cite className="text-sm text-muted-foreground font-sans uppercase tracking-wider not-italic">
              — {slide.verse.reference}
            </cite>
          </div>
        )}
      </div>
    </div>
  );
};

export default PracticalExampleSlide;
