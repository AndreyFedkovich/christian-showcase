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

  // Story slides - keep current design
  if (slide.type === 'story') {
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
          
          <div className="absolute top-6 right-6 w-12 h-12 rounded-full bg-accent/80 backdrop-blur-sm flex items-center justify-center z-20">
            <span className="text-lg font-bold text-[#FFF5E6]">{slide.id}</span>
          </div>

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
  }

  // Scripture slides - Premium Orange design for all
  if (slide.type === 'scripture' || slide.type === 'scripture-dark') {
    return (
      <Card 
        className="group relative overflow-hidden cursor-pointer transition-smooth hover:-translate-y-2 shadow-card hover:shadow-premium"
        onClick={onClick}
      >
        <div className="aspect-[3/4] relative overflow-hidden">
          {/* Dark gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-800 to-stone-700" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent z-10" />
          
          {/* Slide number badge - golden accent on dark background */}
          <div className="absolute top-6 right-6 w-12 h-12 rounded-full bg-accent/80 backdrop-blur-sm flex items-center justify-center z-20">
            <span className="text-lg font-bold text-white">{slide.id}</span>
          </div>

          {/* Golden quotation marks - centered */}
          <div className="absolute inset-0 flex items-center justify-center z-20">
            <div className="flex items-center justify-center h-[180px]">
              <span className="text-[6rem] md:text-[10rem] lg:text-[10rem] text-accent font-serif leading-none">"</span>
            </div>
          </div>

          {/* Type badge and title - bottom */}
          <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
            <div className="inline-block px-3 py-1 bg-accent/80 backdrop-blur-sm rounded-full mb-3">
              <div className="flex items-center gap-2">
                <div className="text-white">
                  {getIcon()}
                </div>
                <span className="text-xs font-sans font-medium text-white uppercase tracking-wider">
                  {getTypeName()}
                </span>
              </div>
            </div>
            <h3 className="text-xl font-bold text-white">
              {getTitle()}
            </h3>
          </div>
        </div>
      </Card>
    );
  }

  // Reflection slides - purple gradient with large question mark
  if (slide.type === 'reflection') {
    return (
      <Card 
        className="group relative overflow-hidden cursor-pointer transition-smooth hover:-translate-y-2 shadow-card hover:shadow-premium"
        onClick={onClick}
      >
        <div className="aspect-[3/4] relative overflow-hidden bg-gradient-to-br from-purple-600 via-purple-700 to-purple-900">
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent z-10" />
          
          <div className="absolute top-6 right-6 w-12 h-12 rounded-full bg-purple-500/80 backdrop-blur-sm flex items-center justify-center z-20">
            <span className="text-lg font-bold text-white">{slide.id}</span>
          </div>

          {/* Large question mark - in center/slightly above */}
          <div className="absolute inset-0 flex items-center justify-center z-20">
            <div className="text-8xl text-white/20 font-bold -mt-16 group-hover:text-white/30 transition-smooth">
              ?
            </div>
          </div>

          {/* Badge and title - at bottom */}
          <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
            <div className="inline-block px-3 py-1 bg-purple-500/80 backdrop-blur-sm rounded-full mb-3">
              <div className="flex items-center gap-2">
                <div className="text-white">
                  {getIcon()}
                </div>
                <span className="text-xs font-sans font-medium text-white uppercase tracking-wider">
                  {getTypeName()}
                </span>
              </div>
            </div>
            <h3 className="text-xl font-bold text-white">
              {getTitle()}
            </h3>
          </div>
        </div>
      </Card>
    );
  }

  // Conclusion slides - light green style with lightbulb
  if (slide.type === 'conclusion') {
    return (
      <Card 
        className="group relative overflow-hidden cursor-pointer transition-smooth hover:-translate-y-2 shadow-card hover:shadow-premium"
        onClick={onClick}
      >
        <div className="aspect-[3/4] relative overflow-hidden bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50">
          <div className="absolute inset-0 bg-gradient-to-t from-emerald-100/50 via-transparent to-transparent z-10" />
          
          <div className="absolute top-6 right-6 w-12 h-12 rounded-full bg-emerald-500/80 backdrop-blur-sm flex items-center justify-center z-20">
            <span className="text-lg font-bold text-white">{slide.id}</span>
          </div>

          {/* Lightbulb icon - in center/slightly above */}
          <div className="absolute inset-0 flex items-center justify-center z-20">
            <div className="w-20 h-20 rounded-full bg-emerald-500/20 flex items-center justify-center -mt-16 group-hover:bg-emerald-500/30 transition-smooth">
              <Lightbulb className="w-10 h-10 text-emerald-600" />
            </div>
          </div>

          {/* Badge and title - at bottom */}
          <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
            <div className="inline-block px-3 py-1 bg-emerald-500/80 backdrop-blur-sm rounded-full mb-3">
              <div className="flex items-center gap-2">
                <div className="text-white">
                  {getIcon()}
                </div>
                <span className="text-xs font-sans font-medium text-white uppercase tracking-wider">
                  {getTypeName()}
                </span>
              </div>
            </div>
            <h3 className="text-xl font-bold text-emerald-800">
              {getTitle()}
            </h3>
          </div>
        </div>
      </Card>
    );
  }

  return null;
};

export default SeminarSlideCard;
