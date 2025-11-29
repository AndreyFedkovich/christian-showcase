import { Card } from "@/components/ui/card";
import { PracticalExampleSlide } from "@/data/epistles-structure";
import { Lightbulb } from "lucide-react";

interface PracticalExampleSlideCardProps {
  slide: PracticalExampleSlide;
  onClick: () => void;
}

const PracticalExampleSlideCard = ({ slide, onClick }: PracticalExampleSlideCardProps) => {
  return (
    <Card 
      className="group relative overflow-hidden cursor-pointer transition-smooth hover:-translate-y-2 shadow-card hover:shadow-premium"
      onClick={onClick}
    >
      <div className="aspect-[3/4] relative overflow-hidden">
        {/* Gradient background from green to red */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-600 via-amber-500 to-red-600" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent z-10" />
        
        {/* Slide number badge */}
        <div className="absolute top-6 right-6 w-12 h-12 rounded-full bg-accent/80 backdrop-blur-sm flex items-center justify-center z-20">
          <span className="text-lg font-bold text-white">{slide.id}</span>
        </div>

        {/* Lightbulb icon - centered */}
        <div className="absolute inset-0 flex items-center justify-center z-20 -mt-8">
          <div className="w-24 h-24 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:bg-white/30 transition-smooth">
            <Lightbulb className="w-12 h-12 text-white" />
          </div>
        </div>

        {/* Title and badge - at bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
          <div className="inline-block px-3 py-1 bg-accent/80 backdrop-blur-sm rounded-full mb-3">
            <div className="flex items-center gap-2">
              <Lightbulb className="w-4 h-4 text-white" />
              <span className="text-xs font-sans font-medium text-white uppercase tracking-wider">
                Практика
              </span>
            </div>
          </div>
          <h3 className="text-xl font-bold text-white leading-tight">
            {slide.title}
          </h3>
        </div>
      </div>
    </Card>
  );
};

export default PracticalExampleSlideCard;
