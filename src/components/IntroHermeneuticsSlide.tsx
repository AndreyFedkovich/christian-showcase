import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";
import { IntroHermeneuticsSlide as IntroHermeneuticsSlideType } from "@/data/epistles-structure";

interface IntroHermeneuticsSlideProps {
  slide: IntroHermeneuticsSlideType;
  onStart: () => void;
}

const IntroHermeneuticsSlide = ({ slide, onStart }: IntroHermeneuticsSlideProps) => {
  return (
    <div className="w-full h-screen gradient-warm flex items-center justify-center p-8 animate-in fade-in duration-700">
      <div className="max-w-4xl text-center space-y-8">
        <div className="space-y-4">
          <h1 className="text-6xl md:text-7xl font-bold text-foreground tracking-tight animate-in slide-in-from-bottom-8 duration-700">
            {slide.title}
          </h1>
          <p className="text-2xl text-accent font-sans font-semibold animate-in slide-in-from-bottom-8 duration-700 delay-100">
            {slide.subtitle}
          </p>
        </div>
        
        <div className="max-w-2xl mx-auto animate-in slide-in-from-bottom-8 duration-700 delay-200">
          <p className="text-xl text-muted-foreground font-sans leading-relaxed">
            {slide.description}
          </p>
        </div>

        <div className="animate-in slide-in-from-bottom-8 duration-700 delay-300">
          <Button
            size="lg"
            onClick={onStart}
            className="gradient-gold hover:opacity-90 text-lg px-8 py-6 rounded-full shadow-premium transition-smooth hover:scale-105 font-sans font-semibold"
          >
            <Play className="mr-2 h-6 w-6" />
            Начать просмотр
          </Button>
        </div>

        <div className="text-sm text-muted-foreground font-sans animate-in fade-in duration-700 delay-500">
          <p>Нажмите пробел или стрелку вправо для продолжения</p>
        </div>
      </div>
    </div>
  );
};

export default IntroHermeneuticsSlide;
