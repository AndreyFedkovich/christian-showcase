import { ConclusionSlide as ConclusionSlideType } from "@/data/joseph-story";
import { Check } from "lucide-react";

interface ConclusionSlideProps {
  slide: ConclusionSlideType;
  direction?: 'next' | 'prev';
}

const ConclusionSlide = ({ slide, direction = 'next' }: ConclusionSlideProps) => {
  const animationClass = direction === 'next' 
    ? 'animate-slide-in-right' 
    : 'animate-slide-in-left';

  return (
    <div className={`absolute inset-0 gradient-warm flex items-center justify-center p-8 ${animationClass}`}>
      <div className="max-w-4xl w-full space-y-10">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-block px-6 py-2 bg-primary/20 backdrop-blur-sm rounded-full">
            <span className="text-sm font-sans font-medium text-primary uppercase tracking-wider">
              Главный вывод
            </span>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold text-foreground">
            {slide.title}
          </h2>
        </div>

        {/* Points */}
        <div className="space-y-6">
          {slide.points.map((point, index) => (
            <div 
              key={index}
              className="flex items-start gap-4 p-6 bg-card/50 backdrop-blur-sm rounded-lg border border-border/50 hover:border-primary/50 transition-smooth hover:-translate-y-1 shadow-card hover:shadow-premium"
            >
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center mt-1">
                <Check className="w-5 h-5 text-primary" />
              </div>
              <p className="text-lg text-foreground font-sans leading-relaxed flex-1">
                {point}
              </p>
            </div>
          ))}
        </div>

        {/* Verse */}
        {slide.verse && (
          <div className="relative mt-12 p-8 bg-gradient-to-br from-primary/10 to-accent/10 backdrop-blur-sm rounded-lg border border-primary/20">
            <div className="absolute -top-4 left-8 text-6xl text-primary/30 font-serif">«</div>
            <div className="absolute -bottom-4 right-8 text-6xl text-primary/30 font-serif">»</div>
            <blockquote className="text-xl md:text-2xl text-foreground italic leading-relaxed mb-4 px-8">
              {slide.verse.text}
            </blockquote>
            <cite className="text-sm text-muted-foreground font-sans uppercase tracking-wider not-italic pl-8">
              — {slide.verse.reference}
            </cite>
          </div>
        )}
      </div>
    </div>
  );
};

export default ConclusionSlide;
