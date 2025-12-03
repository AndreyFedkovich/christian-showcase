import { Card } from "@/components/ui/card";
import { FileText } from "lucide-react";

// Flexible interface that works with both IntroductionSlide and SeminarIntroductionSlide
interface IntroductionSlideData {
  type: 'introduction';
  title: string;
  subtitle?: string;
  content?: string[];
  image?: string;
}

interface IntroductionSlideCardProps {
  slide: IntroductionSlideData;
  slideNumber: number;
  onClick: () => void;
}

const IntroductionSlideCard = ({ slide, slideNumber, onClick }: IntroductionSlideCardProps) => {
  return (
    <Card 
      className="group relative overflow-hidden cursor-pointer transition-smooth hover:-translate-y-2 shadow-card hover:shadow-premium"
      onClick={onClick}
    >
      <div className="aspect-[3/4] relative overflow-hidden bg-gradient-to-br from-amber-700 via-orange-600 to-amber-800">
        {/* Gradient overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent z-10" />
        
        {/* Slide number */}
        <div className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center z-20">
          <span className="text-lg font-bold text-white">{slideNumber}</span>
        </div>

        {/* Decorative icon in center */}
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <div className="w-20 h-20 rounded-full bg-white/10 flex items-center justify-center -mt-16 group-hover:bg-white/20 transition-smooth">
            <FileText className="w-10 h-10 text-white/80" />
          </div>
        </div>

        {/* Badge and title at bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
          <div className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full mb-3">
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-white" />
              <span className="text-xs font-sans font-medium text-white uppercase tracking-wider">
                Введение
              </span>
            </div>
          </div>
          <h3 className="text-2xl font-bold text-white">
            {slide.title}
          </h3>
        </div>
      </div>
    </Card>
  );
};

export default IntroductionSlideCard;
