import { Card } from "@/components/ui/card";
import { JosephSlide } from "@/data/joseph-story";
import { BookOpen, HelpCircle, Lightbulb, Book } from "lucide-react";
import storyDefault from "@/assets/story-default.jpg";
import reflectionDefault from "@/assets/reflection-default.jpg";
import conclusionDefault from "@/assets/conclusion-default.jpg";
import scriptureDefault from "@/assets/scripture-default.jpg";

interface SeminarSlideCardProps {
  slide: JosephSlide;
  onClick: () => void;
}

const SeminarSlideCard = ({ slide, onClick }: SeminarSlideCardProps) => {
  const getIcon = () => {
    switch (slide.type) {
      case 'story':
        return <BookOpen className="w-5 h-5" />;
      case 'reflection':
        return <HelpCircle className="w-5 h-5" />;
      case 'conclusion':
        return <Lightbulb className="w-5 h-5" />;
      case 'scripture':
        return <Book className="w-5 h-5" />;
      case 'scripture-dark':
        return <Book className="w-5 h-5" />;
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
      case 'scripture':
        return 'Писание';
      case 'scripture-dark':
        return 'Писание';
    }
  };

  const getTitle = () => {
    if (slide.type === 'story') return slide.title;
    if (slide.type === 'reflection') return slide.subtitle || 'Вопрос для размышления';
    if (slide.type === 'conclusion') return slide.title;
    if (slide.type === 'scripture') return slide.reference;
    if (slide.type === 'scripture-dark') return slide.reference;
  };

  const getSlideImage = () => {
    if (slide.type === 'story' && slide.image) {
      return slide.image;
    }
    if (slide.type === 'story') {
      return storyDefault;
    }
    if (slide.type === 'reflection') {
      return reflectionDefault;
    }
    if (slide.type === 'conclusion') {
      return conclusionDefault;
    }
    if (slide.type === 'scripture') {
      return scriptureDefault;
    }
    if (slide.type === 'scripture-dark') {
      return scriptureDefault;
    }
  };

  return (
    <Card 
      className="group relative overflow-hidden cursor-pointer transition-smooth hover:-translate-y-2 shadow-card hover:shadow-premium"
      onClick={onClick}
    >
      <div className="aspect-[3/4] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/40 to-transparent z-10 opacity-30 group-hover:opacity-40 transition-smooth" />
        <img 
          src={getSlideImage()} 
          alt={getTitle()}
          className="w-full h-full object-cover transition-smooth group-hover:scale-110"
        />
        
        {/* Slide Number */}
        <div className="absolute top-6 right-6 w-12 h-12 rounded-full bg-accent/80 backdrop-blur-sm flex items-center justify-center z-20">
          <span className="text-lg font-bold text-[#FFF5E6]">{slide.id}</span>
        </div>

        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
          <div className="inline-block px-3 py-1 bg-accent/80 backdrop-blur-sm rounded-full mb-3">
            <div className="flex items-center gap-2">
              <div className="text-[#FFF5E6]">
                {getIcon()}
              </div>
              <span className="text-xs font-sans font-medium text-[#FFF5E6] uppercase tracking-wider">
                {getTypeName()}
              </span>
            </div>
          </div>
          <h3 className="text-2xl font-bold text-primary-foreground group-hover:text-primary-foreground transition-smooth">
            {getTitle()}
          </h3>
        </div>
      </div>
    </Card>
  );
};

export default SeminarSlideCard;
