import { Card } from "@/components/ui/card";
import { HermeneuticsSlide } from "@/data/epistles-structure";
import { BookMarked } from "lucide-react";

interface HermeneuticsSlideCardProps {
  slide: HermeneuticsSlide;
  slideNumber: number;
  onClick: () => void;
}

const HermeneuticsSlideCard = ({ slide, slideNumber, onClick }: HermeneuticsSlideCardProps) => {
  return (
    <Card 
      className="group relative overflow-hidden cursor-pointer transition-smooth hover:-translate-y-2 shadow-card hover:shadow-premium"
      onClick={onClick}
    >
      <div className="aspect-[3/4] relative overflow-hidden">
        {/* Dark premium gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-800 via-slate-700 to-slate-600" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent z-10" />
        
        {/* Slide number badge */}
        <div className="absolute top-6 right-6 w-12 h-12 rounded-full bg-accent/80 backdrop-blur-sm flex items-center justify-center z-20">
          <span className="text-lg font-bold text-white">{slideNumber}</span>
        </div>

        {/* Book icon and progress visualization - centered */}
        <div className="absolute inset-0 flex flex-col items-center justify-center z-20 px-6">
          <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mb-6 group-hover:bg-white/30 transition-smooth">
            <BookMarked className="w-10 h-10 text-white" />
          </div>


        </div>

        {/* Book name - at bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
          <div className="inline-block px-3 py-1 bg-accent/80 backdrop-blur-sm rounded-full mb-3">
            <div className="flex items-center gap-2">
              <BookMarked className="w-4 h-4 text-white" />
              <span className="text-xs font-sans font-medium text-white uppercase tracking-wider">
                Герменевтика
              </span>
            </div>
          </div>
          <h3 className="text-2xl font-bold text-white">
            {slide.bookName}
          </h3>
        </div>
      </div>
    </Card>
  );
};

export default HermeneuticsSlideCard;
