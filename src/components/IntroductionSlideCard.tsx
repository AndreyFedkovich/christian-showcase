import { Card } from "@/components/ui/card";
import { IntroductionSlide } from "@/data/epistles-structure";
import { FileText } from "lucide-react";

interface IntroductionSlideCardProps {
  slide: IntroductionSlide;
  onClick: () => void;
}

const IntroductionSlideCard = ({ slide, onClick }: IntroductionSlideCardProps) => {
  return (
    <Card 
      className="group relative overflow-hidden cursor-pointer transition-smooth hover:-translate-y-2 shadow-card hover:shadow-premium"
      onClick={onClick}
    >
      <div className="aspect-[3/4] relative overflow-hidden">
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/40 to-transparent z-10 opacity-30 group-hover:opacity-40 transition-smooth" />
        
        {/* Background image */}
        <img 
          src={slide.image} 
          alt={slide.title}
          className="w-full h-full object-cover transition-smooth group-hover:scale-110"
        />
        
        {/* Slide number */}
        <div className="absolute top-6 right-6 w-12 h-12 rounded-full bg-accent/80 backdrop-blur-sm flex items-center justify-center z-20">
          <span className="text-lg font-bold text-[#FFF5E6]">{slide.id}</span>
        </div>

        {/* Badge and title at bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
          <div className="inline-block px-3 py-1 bg-accent/80 backdrop-blur-sm rounded-full mb-3">
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-[#FFF5E6]" />
              <span className="text-xs font-sans font-medium text-[#FFF5E6] uppercase tracking-wider">
                Введение
              </span>
            </div>
          </div>
          <h3 className="text-2xl font-bold text-primary-foreground group-hover:text-primary-foreground transition-smooth">
            {slide.title}
          </h3>
        </div>
      </div>
    </Card>
  );
};

export default IntroductionSlideCard;
