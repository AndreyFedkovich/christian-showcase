import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, Clock, Layers } from "lucide-react";
import { Presentation } from "@/data/presentations";

interface PresentationCardProps {
  presentation: Presentation;
  onClick: () => void;
}

const PresentationCard = ({ presentation, onClick }: PresentationCardProps) => {
  return (
    <Card 
      className="group relative overflow-hidden cursor-pointer transition-smooth hover:shadow-premium"
      onClick={onClick}
    >
      <div className="flex flex-col md:flex-row gap-6">
        {/* Thumbnail */}
        <div className="md:w-1/3 aspect-[3/4] relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/60 via-accent/40 to-primary/80 z-10 opacity-70 group-hover:opacity-80 transition-smooth" />
          <img 
            src={presentation.thumbnail} 
            alt={presentation.title}
            className="w-full h-full object-cover transition-smooth group-hover:scale-110"
          />
        </div>

        {/* Content */}
        <div className="flex-1 p-6 md:py-8 md:pr-8 flex flex-col justify-between">
          <div className="space-y-4">
            <h3 className="text-3xl md:text-4xl font-bold text-foreground group-hover:text-accent transition-smooth">
              {presentation.title}
            </h3>
            
            <p className="text-muted-foreground font-sans text-base md:text-lg leading-relaxed">
              {presentation.description}
            </p>

            {/* Stats */}
            <div className="flex flex-wrap gap-4 pt-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Layers className="h-4 w-4 text-accent" />
                <span className="font-sans">{presentation.slideCount} слайдов</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4 text-accent" />
                <span className="font-sans">{presentation.duration}</span>
              </div>
            </div>
          </div>

          {/* Action Button */}
          <div className="pt-6">
            <Button 
              size="lg"
              className="gradient-gold hover:opacity-90 text-base px-6 py-3 rounded-full shadow-premium transition-smooth hover:scale-105 font-sans font-semibold"
            >
              <Play className="mr-2 h-5 w-5" />
              Открыть презентацию
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default PresentationCard;
