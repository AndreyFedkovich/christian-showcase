import { Card } from "@/components/ui/card";
import { UniversalSlide } from "@/types/slides";
import { 
  BookOpen, 
  HelpCircle, 
  Lightbulb, 
  Book, 
  FileText,
  BookMarked,
  User,
  Bot,
  ThumbsUp,
  ThumbsDown,
  Theater,
  Flame,
  Sunrise,
  Image,
  Quote,
  Columns,
  Crown,
  Map,
  CalendarDays,
  Milestone,
  Scroll
} from "lucide-react";
import storyDefault from "@/assets/story-default-generic.jpg";

interface SlideCardRendererProps {
  slide: UniversalSlide;
  slideNumber: number;
  onClick: () => void;
}

const SlideCardRenderer = ({ slide, slideNumber, onClick }: SlideCardRendererProps) => {
  const getIcon = () => {
    switch (slide.type) {
      case 'profile':
        return <User className="w-5 h-5" />;
      case 'story':
      case 'story-image':
        return <BookOpen className="w-5 h-5" />;
      case 'reflection':
        return <HelpCircle className="w-5 h-5" />;
      case 'conclusion':
        return <Lightbulb className="w-5 h-5" />;
      case 'scripture-dark':
        return <Book className="w-5 h-5" />;
      case 'introduction':
        return <FileText className="w-5 h-5" />;
      case 'hermeneutics':
        return <BookMarked className="w-5 h-5" />;
      case 'practical-example':
        return <Lightbulb className="w-5 h-5" />;
      case 'dialogue-question':
        return <User className="w-5 h-5" />;
      case 'dialogue-answer':
      case 'dialogue-answer-image':
        return <Bot className="w-5 h-5" />;
      case 'argument':
        return (slide as any).argumentType === 'pro' ? <ThumbsUp className="w-5 h-5" /> : <ThumbsDown className="w-5 h-5" />;
      case 'drama-act':
        return <Theater className="w-5 h-5" />;
      case 'drama-scene':
        return <BookOpen className="w-5 h-5" />;
      case 'drama-climax':
        return (slide as any).moment === 'darkness' ? <Flame className="w-5 h-5" /> : <Sunrise className="w-5 h-5" />;
      case 'drama-image':
        return <Image className="w-5 h-5" />;
      case 'drama-scripture':
        return <Quote className="w-5 h-5" />;
      case 'drama-parallel':
        return <Columns className="w-5 h-5" />;
      case 'timeline-intro':
        return <Crown className="w-5 h-5" />;
      case 'timeline-overview':
        return <Map className="w-5 h-5" />;
      case 'timeline-vertical':
        return <CalendarDays className="w-5 h-5" />;
      case 'timeline-era':
        return <Milestone className="w-5 h-5" />;
      case 'king-profile':
        return <Crown className="w-5 h-5" />;
      case 'prophet-profile':
        return <Scroll className="w-5 h-5" />;
      default:
        return <FileText className="w-5 h-5" />;
    }
  };

  const getTypeName = () => {
    switch (slide.type) {
      case 'profile':
        return 'Апостол';
      case 'story':
      case 'story-image':
        return 'История';
      case 'reflection':
        return 'Задумайтесь';
      case 'conclusion':
        return 'Вывод';
      case 'scripture-dark':
        return 'Писание';
      case 'introduction':
        return 'Введение';
      case 'hermeneutics':
        return 'Герменевтика';
      case 'practical-example':
        return 'Практика';
      case 'dialogue-question':
        return 'Вопрос';
      case 'dialogue-answer':
      case 'dialogue-answer-image':
        return 'Ответ ИИ';
      case 'argument':
        return (slide as any).argumentType === 'pro' ? 'ЗА' : 'ПРОТИВ';
      case 'drama-act':
        return 'Акт';
      case 'drama-scene':
        return 'Сцена';
      case 'drama-climax':
        return (slide as any).moment === 'darkness' ? 'Тьма' : 'Свет';
      case 'drama-image':
        return 'Образ';
      case 'drama-scripture':
        return 'Писание';
      case 'drama-parallel':
        return 'Контраст';
      case 'timeline-intro':
        return 'Введение';
      case 'timeline-overview':
        return 'Легенда';
      case 'timeline-vertical':
        return 'Хронология';
      case 'timeline-era':
        return 'Эпоха';
      case 'king-profile':
        return 'Царь';
      case 'prophet-profile':
        return 'Пророк';
      default:
        return 'Слайд';
    }
  };

  const getTitle = () => {
    const s = slide as any;
    switch (slide.type) {
      case 'profile':
        return s.name;
      case 'story':
      case 'story-image':
        return s.title;
      case 'reflection':
        return s.subtitle || 'Вопрос для размышления';
      case 'conclusion':
        return s.title;
      case 'scripture-dark':
        return s.reference;
      case 'introduction':
        return s.title;
      case 'hermeneutics':
        return s.bookName;
      case 'practical-example':
        return s.title;
      case 'dialogue-question':
        return s.question;
      case 'dialogue-answer':
      case 'dialogue-answer-image':
        return s.title;
      case 'argument':
        return s.name;
      case 'drama-act':
        return s.actName;
      case 'drama-scene':
        return s.sceneTitle;
      case 'drama-climax':
        return s.title;
      case 'drama-image':
        return s.title;
      case 'drama-scripture':
        return s.reference;
      case 'drama-parallel':
        return s.title;
      case 'timeline-intro':
        return s.title;
      case 'timeline-overview':
        return s.title;
      case 'timeline-vertical':
        return s.title;
      case 'timeline-era':
        return s.era?.title;
      case 'king-profile':
        return s.king?.name;
      case 'prophet-profile':
        return s.prophet?.name;
      default:
        return 'Слайд';
    }
  };

  const getSubtitle = () => {
    if (slide.type === 'profile') return (slide as any).subtitle;
    return undefined;
  };

  const getSlideImage = () => {
    const s = slide as any;
    if (slide.type === 'profile') return s.image;
    if (slide.type === 'story') return s.image || storyDefault;
    if (slide.type === 'story-image') return s.image;
    if (slide.type === 'drama-image') return s.image;
    if (slide.type === 'dialogue-answer-image') return s.image;
    return undefined;
  };

  const getCardStyle = () => {
    switch (slide.type) {
      case 'reflection':
        return 'from-purple-600 via-purple-700 to-purple-900';
      case 'conclusion':
        return 'from-stone-800 via-stone-700 to-amber-900/80';
      case 'scripture-dark':
        return 'from-slate-950 via-slate-800 to-stone-700';
      case 'introduction':
        return 'from-amber-700 via-orange-600 to-amber-800';
      case 'hermeneutics':
        return 'from-slate-800 via-slate-700 to-slate-600';
      case 'practical-example':
        return 'from-blue-600 via-indigo-500 to-purple-600';
      case 'dialogue-question':
        return 'from-slate-800 via-slate-700 to-blue-900';
      case 'dialogue-answer':
        return 'from-slate-100 via-white to-emerald-50';
      case 'dialogue-answer-image':
        return 'from-emerald-900 via-emerald-800 to-teal-900';
      case 'argument':
        return (slide as any).argumentType === 'pro' 
          ? 'from-emerald-800 via-emerald-700 to-teal-800'
          : 'from-rose-800 via-rose-700 to-red-800';
      case 'drama-act':
        return 'from-slate-950 via-indigo-950 to-slate-900';
      case 'drama-scene':
        return 'from-slate-950 via-purple-950 to-violet-950';
      case 'drama-climax':
        return (slide as any).moment === 'darkness' 
          ? 'from-black via-red-950 to-black'
          : 'from-amber-950 via-yellow-900 to-amber-950';
      case 'drama-image':
        return 'from-slate-900 via-indigo-900 to-slate-800';
      case 'drama-scripture':
        return 'from-slate-950 via-violet-950 to-slate-900';
      case 'drama-parallel':
        return 'from-slate-800 via-purple-900 to-amber-900';
      case 'timeline-intro':
        return 'from-amber-700 via-amber-600 to-yellow-700';
      case 'timeline-overview':
        return 'from-slate-700 via-slate-600 to-slate-500';
      case 'timeline-vertical':
        return 'from-indigo-800 via-indigo-700 to-blue-800';
      case 'timeline-era':
        return 'from-red-900 via-red-800 to-rose-900';
      case 'king-profile': {
        const king = (slide as any).king;
        if (king?.kingdom === 'Иуда') {
          return 'from-blue-800 via-blue-700 to-indigo-800';
        }
        return 'from-orange-700 via-orange-600 to-amber-700';
      }
      case 'prophet-profile':
        return 'from-purple-800 via-purple-700 to-violet-800';
      default:
        return 'from-primary via-primary/90 to-primary/80';
    }
  };

  const getBadgeStyle = () => {
    switch (slide.type) {
      case 'profile':
        return 'bg-accent/80 text-[#FFF5E6]';
      case 'story':
        return 'bg-accent/80 text-[#FFF5E6]';
      case 'reflection':
        return 'bg-purple-500/80 text-white';
      case 'conclusion':
        return 'bg-accent/80 text-white';
      case 'scripture-dark':
        return 'bg-accent/80 text-white';
      case 'introduction':
        return 'bg-white/20 text-white';
      case 'hermeneutics':
        return 'bg-accent/80 text-white';
      case 'practical-example':
        return 'bg-purple-500/80 text-white';
      case 'dialogue-question':
        return 'bg-blue-500/80 text-white';
      case 'dialogue-answer':
        return 'bg-emerald-500/80 text-white';
      case 'argument':
        return (slide as any).argumentType === 'pro' 
          ? 'bg-emerald-500/80 text-white'
          : 'bg-rose-500/80 text-white';
      case 'timeline-intro':
        return 'bg-amber-500/80 text-white';
      case 'timeline-overview':
        return 'bg-slate-500/80 text-white';
      case 'timeline-vertical':
        return 'bg-indigo-500/80 text-white';
      case 'timeline-era':
        return 'bg-red-500/80 text-white';
      case 'king-profile':
        return 'bg-amber-500/80 text-white';
      case 'prophet-profile':
        return 'bg-purple-500/80 text-white';
      default:
        return 'bg-accent/80 text-[#FFF5E6]';
    }
  };

  const getTextColor = () => {
    if (slide.type === 'dialogue-answer') return 'text-slate-800';
    if (slide.type === 'dialogue-answer-image') return 'text-white';
    return 'text-white';
  };

  const renderCenterIcon = () => {
    switch (slide.type) {
      case 'reflection':
        return <div className="text-8xl text-white/40 font-bold -mt-16 group-hover:text-white/50 transition-smooth">?</div>;
      case 'conclusion':
        return (
          <div className="w-20 h-20 rounded-full bg-amber-500/20 flex items-center justify-center -mt-16 group-hover:bg-amber-500/30 transition-smooth">
            <Lightbulb className="w-10 h-10 text-amber-300" />
          </div>
        );
      case 'scripture-dark':
        return (
          <div className="flex items-center justify-center h-[180px]">
            <span className="text-[6rem] md:text-[10rem] lg:text-[10rem] text-accent font-serif leading-none opacity-85 group-hover:opacity-90">“</span>
          </div>
        );
      case 'hermeneutics':
        return (
          <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mb-6 group-hover:bg-white/30 transition-smooth">
            <BookMarked className="w-10 h-10 text-white" />
          </div>
        );
      case 'practical-example':
        return (
          <div className="w-24 h-24 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:bg-white/30 transition-smooth -mt-8">
            <Lightbulb className="w-12 h-12 text-white" />
          </div>
        );
      case 'introduction':
        return (
          <div className="w-20 h-20 rounded-full bg-white/10 flex items-center justify-center -mt-16 group-hover:bg-white/20 transition-smooth">
            <FileText className="w-10 h-10 text-white/80" />
          </div>
        );
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
        return (slide as any).argumentType === 'pro' ? (
          <div className="w-20 h-20 rounded-full bg-emerald-500/30 flex items-center justify-center -mt-8">
            <ThumbsUp className="w-10 h-10 text-emerald-300" />
          </div>
        ) : (
          <div className="w-20 h-20 rounded-full bg-rose-500/30 flex items-center justify-center -mt-8">
            <ThumbsDown className="w-10 h-10 text-rose-300" />
          </div>
        );
      case 'timeline-intro':
        return (
          <div className="w-24 h-24 rounded-full bg-amber-500/30 flex items-center justify-center -mt-8">
            <Crown className="w-12 h-12 text-amber-300" />
          </div>
        );
      case 'timeline-overview':
        return (
          <div className="w-24 h-24 rounded-full bg-slate-500/30 flex items-center justify-center -mt-8">
            <Map className="w-12 h-12 text-slate-300" />
          </div>
        );
      case 'timeline-vertical':
        return (
          <div className="flex flex-col items-center gap-2 -mt-8">
            <div className="w-3 h-3 rounded-full bg-indigo-400" />
            <div className="w-0.5 h-12 bg-indigo-400/50" />
            <div className="w-3 h-3 rounded-full bg-indigo-400" />
            <div className="w-0.5 h-12 bg-indigo-400/50" />
            <div className="w-3 h-3 rounded-full bg-indigo-400" />
          </div>
        );
      case 'timeline-era':
        return (
          <div className="w-24 h-24 rounded-full bg-red-500/30 flex items-center justify-center -mt-8">
            <Milestone className="w-12 h-12 text-red-300" />
          </div>
        );
      case 'king-profile': {
        const king = (slide as any).king;
        const colorClass = king?.character === 'evil' ? 'bg-red-500/30 text-red-300' 
          : king?.character === 'good' ? 'bg-emerald-500/30 text-emerald-300'
          : 'bg-amber-500/30 text-amber-300';
        return (
          <div className={`w-24 h-24 rounded-full ${colorClass} flex items-center justify-center -mt-8`}>
            <Crown className="w-12 h-12" />
          </div>
        );
      }
      case 'prophet-profile':
        return (
          <div className="w-24 h-24 rounded-full bg-purple-500/30 flex items-center justify-center -mt-8">
            <Scroll className="w-12 h-12 text-purple-300" />
          </div>
        );
      default:
        return null;
    }
  };

  // Profile slides - image with overlay
  if (slide.type === 'profile') {
    return (
      <Card 
        className="group relative overflow-hidden cursor-pointer transition-smooth hover:-translate-y-2 shadow-card hover:shadow-premium"
        onClick={onClick}
      >
        <div className="aspect-[3/4] relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/40 to-transparent z-10 opacity-80 group-hover:opacity-90 transition-smooth" />
          <img 
            src={getSlideImage()} 
            alt={getTitle()}
            className="w-full h-full object-cover transition-smooth group-hover:scale-110"
          />
          <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
            <div className={`inline-block px-3 py-1 ${getBadgeStyle()} backdrop-blur-sm rounded-full mb-3`}>
              <span className="text-xs font-sans font-medium uppercase tracking-wider">
                {getTypeName()} {slideNumber}
              </span>
            </div>
            <h3 className="text-2xl font-bold text-primary-foreground mb-2">
              {getTitle()}
            </h3>
            {getSubtitle() && (
              <p className="text-sm text-primary-foreground/80 font-sans italic">
                {getSubtitle()}
              </p>
            )}
          </div>
        </div>
      </Card>
    );
  }

  // Story slides - image with overlay
  if (slide.type === 'story' || slide.type === 'story-image') {
    return (
      <Card 
        className="group relative overflow-hidden cursor-pointer transition-smooth hover:-translate-y-2 shadow-card hover:shadow-premium"
        onClick={onClick}
      >
        <div className="aspect-[3/4] relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-amber-950/90 via-amber-950/40 to-transparent z-10 opacity-70 group-hover:opacity-80 transition-smooth" />
          <img 
            src={getSlideImage()} 
            alt={getTitle()}
            className="w-full h-full object-cover transition-smooth group-hover:scale-110"
          />
          
          <div className="absolute top-6 right-6 w-12 h-12 rounded-full bg-amber-500/80 backdrop-blur-sm flex items-center justify-center z-20">
            <span className="text-lg font-bold text-white">{slideNumber}</span>
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
            <div className="inline-block px-3 py-1 bg-amber-500/80 backdrop-blur-sm rounded-full mb-3">
              <div className="flex items-center gap-2">
                <div className="text-white">
                  {getIcon()}
                </div>
                <span className="text-xs font-sans font-medium text-white uppercase tracking-wider">
                  {getTypeName()}
                </span>
              </div>
            </div>
            <h3 className="text-2xl font-bold text-white group-hover:text-white transition-smooth">
              {getTitle()}
            </h3>
          </div>
        </div>
      </Card>
    );
  }

  // Drama-image slides - image with overlay
  if (slide.type === 'drama-image') {
    return (
      <Card 
        className="group relative overflow-hidden cursor-pointer transition-smooth hover:-translate-y-2 shadow-card hover:shadow-premium"
        onClick={onClick}
      >
        <div className="aspect-[3/4] relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10 opacity-70 group-hover:opacity-80 transition-smooth" />
          <img 
            src={getSlideImage()} 
            alt={getTitle()}
            className="w-full h-full object-cover transition-smooth group-hover:scale-110"
          />
          
          <div className="absolute top-6 right-6 w-12 h-12 rounded-full bg-amber-500/80 backdrop-blur-sm flex items-center justify-center z-20">
            <span className="text-lg font-bold text-white">{slideNumber}</span>
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
            <div className="inline-block px-3 py-1 bg-amber-500/80 backdrop-blur-sm rounded-full mb-3">
              <div className="flex items-center gap-2 text-white">
                <Image className="w-4 h-4" />
                <span className="text-xs font-sans font-medium uppercase tracking-wider">
                  Образ
                </span>
              </div>
            </div>
            <h3 className="text-xl font-bold text-white line-clamp-2">
              {getTitle()}
            </h3>
          </div>
        </div>
      </Card>
    );
  }

  // Dialogue-answer-image slides - image with overlay (AI response with full-screen image)
  if (slide.type === 'dialogue-answer-image') {
    return (
      <Card 
        className="group relative overflow-hidden cursor-pointer transition-smooth hover:-translate-y-2 shadow-card hover:shadow-premium"
        onClick={onClick}
      >
        <div className="aspect-[3/4] relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/90 via-emerald-950/50 to-transparent z-10 opacity-80 group-hover:opacity-90 transition-smooth" />
          <img 
            src={getSlideImage()} 
            alt={getTitle()}
            className="w-full h-full object-cover transition-smooth group-hover:scale-110"
          />
          
          <div className="absolute top-6 right-6 w-12 h-12 rounded-full bg-emerald-500/80 backdrop-blur-sm flex items-center justify-center z-20">
            <span className="text-lg font-bold text-white">{slideNumber}</span>
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
            <div className="inline-block px-3 py-1 bg-emerald-500/80 backdrop-blur-sm rounded-full mb-3">
              <div className="flex items-center gap-2 text-white">
                <Bot className="w-4 h-4" />
                <span className="text-xs font-sans font-medium uppercase tracking-wider">
                  Ответ ИИ
                </span>
              </div>
            </div>
            <h3 className="text-xl font-bold text-white line-clamp-2">
              {getTitle()}
            </h3>
          </div>
        </div>
      </Card>
    );
  }

  // All other slides - gradient with center icon
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

export default SlideCardRenderer;
