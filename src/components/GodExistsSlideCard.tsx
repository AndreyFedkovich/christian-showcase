import { Card } from "@/components/ui/card";
import { GodExistsSlide } from "@/data/god-exists";
import { 
  User, 
  Bot, 
  ThumbsUp, 
  ThumbsDown, 
  FileText, 
  HelpCircle, 
  Lightbulb 
} from "lucide-react";

interface GodExistsSlideCardProps {
  slide: GodExistsSlide;
  slideNumber: number;
  onClick: () => void;
}

const GodExistsSlideCard = ({ slide, slideNumber, onClick }: GodExistsSlideCardProps) => {
  const getIcon = () => {
    switch (slide.type) {
      case 'dialogue-question':
        return <User className="w-5 h-5" />;
      case 'dialogue-answer':
        return <Bot className="w-5 h-5" />;
      case 'argument':
        return slide.argumentType === 'pro' ? <ThumbsUp className="w-5 h-5" /> : <ThumbsDown className="w-5 h-5" />;
      case 'introduction':
        return <FileText className="w-5 h-5" />;
      case 'reflection':
        return <HelpCircle className="w-5 h-5" />;
      case 'conclusion':
        return <Lightbulb className="w-5 h-5" />;
    }
  };

  const getTypeName = () => {
    switch (slide.type) {
      case 'dialogue-question':
        return 'Вопрос';
      case 'dialogue-answer':
        return 'Ответ ИИ';
      case 'argument':
        return slide.argumentType === 'pro' ? 'ЗА' : 'ПРОТИВ';
      case 'introduction':
        return 'Введение';
      case 'reflection':
        return 'Размышление';
      case 'conclusion':
        return 'Вывод';
    }
  };

  const getTitle = () => {
    switch (slide.type) {
      case 'dialogue-question':
        return slide.question;
      case 'dialogue-answer':
        return slide.title;
      case 'argument':
        return slide.name;
      case 'introduction':
        return slide.title;
      case 'reflection':
        return slide.question;
      case 'conclusion':
        return slide.title;
    }
  };

  const getCardStyle = () => {
    switch (slide.type) {
      case 'dialogue-question':
        return 'from-slate-800 via-slate-700 to-blue-900';
      case 'dialogue-answer':
        return 'from-slate-100 via-white to-emerald-50';
      case 'argument':
        return slide.argumentType === 'pro' 
          ? 'from-emerald-800 via-emerald-700 to-teal-800'
          : 'from-rose-800 via-rose-700 to-red-800';
      case 'introduction':
        return 'from-amber-700 via-orange-600 to-amber-800';
      case 'reflection':
        return 'from-purple-600 via-purple-700 to-purple-900';
      case 'conclusion':
        return 'from-amber-600 via-yellow-500 to-amber-600';
    }
  };

  const getBadgeStyle = () => {
    switch (slide.type) {
      case 'dialogue-question':
        return 'bg-blue-500/80 text-white';
      case 'dialogue-answer':
        return 'bg-emerald-500/80 text-white';
      case 'argument':
        return slide.argumentType === 'pro' 
          ? 'bg-emerald-500/80 text-white'
          : 'bg-rose-500/80 text-white';
      case 'introduction':
        return 'bg-accent/80 text-[#FFF5E6]';
      case 'reflection':
        return 'bg-purple-500/80 text-white';
      case 'conclusion':
        return 'bg-amber-800/80 text-white';
    }
  };

  const getTextColor = () => {
    switch (slide.type) {
      case 'dialogue-answer':
        return 'text-slate-800';
      default:
        return 'text-white';
    }
  };

  const renderCenterIcon = () => {
    switch (slide.type) {
      case 'dialogue-question':
        return (
          <div className="w-20 h-20 rounded-full bg-blue-500/30 flex items-center justify-center -mt-8">
            <User className="w-10 h-10 text-blue-300" />
          </div>
        );
      case 'dialogue-answer':
        return (
          <div className="w-20 h-20 rounded-full bg-emerald-500/30 flex items-center justify-center -mt-8">
            <Bot className="w-10 h-10 text-emerald-600" />
          </div>
        );
      case 'argument':
        return slide.argumentType === 'pro' ? (
          <div className="w-20 h-20 rounded-full bg-emerald-500/30 flex items-center justify-center -mt-8">
            <ThumbsUp className="w-10 h-10 text-emerald-300" />
          </div>
        ) : (
          <div className="w-20 h-20 rounded-full bg-rose-500/30 flex items-center justify-center -mt-8">
            <ThumbsDown className="w-10 h-10 text-rose-300" />
          </div>
        );
      case 'introduction':
        return (
          <div className="w-20 h-20 rounded-full bg-amber-500/30 flex items-center justify-center -mt-8">
            <FileText className="w-10 h-10 text-amber-200" />
          </div>
        );
      case 'reflection':
        return (
          <div className="text-8xl text-white/40 font-bold -mt-16">?</div>
        );
      case 'conclusion':
        return (
          <div className="w-20 h-20 rounded-full bg-amber-800/30 flex items-center justify-center -mt-8">
            <Lightbulb className="w-10 h-10 text-amber-100" />
          </div>
        );
    }
  };

  return (
    <Card 
      className="group relative overflow-hidden cursor-pointer transition-smooth hover:-translate-y-2 shadow-card hover:shadow-premium"
      onClick={onClick}
    >
      <div className={`aspect-[3/4] relative overflow-hidden bg-gradient-to-br ${getCardStyle()}`}>
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent z-10" />
        
        {/* Slide number badge */}
        <div className={`absolute top-6 right-6 w-12 h-12 rounded-full ${getBadgeStyle()} backdrop-blur-sm flex items-center justify-center z-20`}>
          <span className="text-lg font-bold">{slideNumber}</span>
        </div>

        {/* Center icon */}
        <div className="absolute inset-0 flex items-center justify-center z-20">
          {renderCenterIcon()}
        </div>

        {/* Type badge and title - at bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
          <div className={`inline-block px-3 py-1 ${getBadgeStyle()} backdrop-blur-sm rounded-full mb-3`}>
            <div className="flex items-center gap-2">
              {getIcon()}
              <span className="text-xs font-sans font-medium uppercase tracking-wider">
                {getTypeName()}
              </span>
            </div>
          </div>
          <h3 className={`text-xl font-bold ${getTextColor()} line-clamp-2`}>
            {getTitle()}
          </h3>
        </div>
      </div>
    </Card>
  );
};

export default GodExistsSlideCard;
