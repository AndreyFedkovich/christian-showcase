import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

interface IntroSlideProps {
  onStart: () => void;
  title: string;
  subtitle?: string;
  description: string;
}

const IntroSlide = ({ onStart, title, subtitle, description }: IntroSlideProps) => {
  return (
    <div className="h-full w-full flex items-center justify-center p-8 animate-[fade-in_1s_ease-out]">
      <div className="max-w-4xl w-full text-center space-y-8">
        {/* Main Title with staggered animation */}
        <div className="space-y-7">
          <h1 className="text-5xl md:text-8xl font-bold text-foreground animate-[fade-in_1s_ease-out,slide-in-from-top_1s_ease-out]">
            {title}
          </h1>
          <div className="h-1 w-32 mx-auto gradient-gold rounded-full animate-[scale-in_0.8s_ease-out_0.5s_both]" />
        </div>

        {/* Subtitle */}
        {subtitle && (
          <p className="text-2xl md:text-3xl text-accent font-semibold italic animate-[fade-in_1s_ease-out_0.3s_both]">
            {subtitle}
          </p>
        )}

        {/* Description */}
        <p className="text-lg md:text-xl text-foreground/80 leading-relaxed max-w-2xl mx-auto font-sans animate-[fade-in_1s_ease-out_0.6s_both]">
          {description}
        </p>

        {/* Decorative element */}
        <div className="flex justify-center gap-2 animate-[fade-in_1s_ease-out_0.9s_both]">
          <div className="w-2 h-2 rounded-full bg-accent/60 animate-pulse" style={{ animationDelay: '0s' }} />
          <div className="w-2 h-2 rounded-full bg-accent/60 animate-pulse" style={{ animationDelay: '0.2s' }} />
          <div className="w-2 h-2 rounded-full bg-accent/60 animate-pulse" style={{ animationDelay: '0.4s' }} />
        </div>

        {/* Start Button */}
        <Button
          size="lg"
          onClick={onStart}
          className="mt-8 px-8 py-6 text-lg gradient-gold text-primary-foreground hover:shadow-premium transition-smooth animate-[fade-in_1s_ease-out_1.2s_both,scale-in_0.5s_ease-out_1.2s_both] group"
        >
          Начать путешествие
          <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-smooth" />
        </Button>

        {/* Bottom text */}
        <p className="text-sm text-muted-foreground font-sans animate-[fade-in_1s_ease-out_1.5s_both]">
          Используйте стрелки, пробел или клик для навигации
        </p>
      </div>
    </div>
  );
};

export default IntroSlide;
