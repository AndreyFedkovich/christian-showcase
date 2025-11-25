import { Card } from "@/components/ui/card";
import { JosephSlide } from "@/data/joseph-story";
import { BookOpen, HelpCircle, Lightbulb } from "lucide-react";

interface SeminarSlideCardProps {
  slide: JosephSlide;
  onClick: () => void;
}

const SeminarSlideCard = ({ slide, onClick }: SeminarSlideCardProps) => {
  const getIcon = () => {
    switch (slide.type) {
      case 'story':
        return <BookOpen className="w-6 h-6" />;
      case 'reflection':
        return <HelpCircle className="w-6 h-6" />;
      case 'conclusion':
        return <Lightbulb className="w-6 h-6" />;
    }
  };

  const getTypeName = () => {
    switch (slide.type) {
      case 'story':
        return 'История';
      case 'reflection':
        return 'Задумайтесь';
      case 'conclusion':
        return 'Вывод';
    }
  };

  const getTitle = () => {
    if (slide.type === 'story') return slide.title;
    if (slide.type === 'reflection') return slide.subtitle || 'Вопрос для размышления';
    if (slide.type === 'conclusion') return slide.title;
  };

  return (
    <Card 
      className="group relative overflow-hidden cursor-pointer transition-smooth hover:-translate-y-2 shadow-card hover:shadow-premium"
      onClick={onClick}
    >
      <div className="aspect-[4/3] relative overflow-hidden gradient-warm p-8 flex flex-col justify-between">
        {/* Type Badge */}
        <div className="inline-block px-4 py-2 bg-primary/20 backdrop-blur-sm rounded-full self-start">
          <div className="flex items-center gap-2">
            <div className="text-primary">
              {getIcon()}
            </div>
            <span className="text-sm font-sans font-medium text-primary uppercase tracking-wider">
              {getTypeName()}
            </span>
          </div>
        </div>

        {/* Slide Number */}
        <div className="absolute top-8 right-8 w-12 h-12 rounded-full bg-accent/20 backdrop-blur-sm flex items-center justify-center">
          <span className="text-lg font-bold text-accent-foreground">{slide.id}</span>
        </div>

        {/* Title */}
        <div>
          <h3 className="text-2xl font-bold text-foreground group-hover:text-primary transition-smooth">
            {getTitle()}
          </h3>
        </div>
      </div>
    </Card>
  );
};

export default SeminarSlideCard;
