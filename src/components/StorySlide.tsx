import { StorySlide as StorySlideType } from "@/data/joseph-story";

interface StorySlideProps {
  slide: StorySlideType;
  direction?: 'next' | 'prev';
}

const StorySlide = ({ slide, direction = 'next' }: StorySlideProps) => {
  const animationClass = direction === 'next' 
    ? 'animate-slide-in-right' 
    : 'animate-slide-in-left';

  return (
    <div className={`absolute inset-0 gradient-warm flex items-center justify-center p-8 ${animationClass}`}>
      <div className="max-w-4xl w-full space-y-8">
        {/* Chapter Badge */}
        <div className="inline-block px-6 py-2 bg-primary/20 backdrop-blur-sm rounded-full">
          <span className="text-sm font-sans font-medium text-primary uppercase tracking-wider">
            {slide.chapter}
          </span>
        </div>

        {/* Title */}
        <h2 className="text-5xl md:text-6xl font-bold text-foreground leading-tight">
          {slide.title}
        </h2>

        {/* Content */}
        <div className="relative">
          <div className="absolute -left-4 top-0 w-1 h-full bg-gradient-to-b from-primary via-primary/50 to-transparent rounded-full" />
          <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed pl-8 font-sans">
            {slide.content}
          </p>
        </div>

        {/* Decorative element */}
        <div className="flex items-center gap-2 opacity-30">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-primary to-transparent" />
        </div>
      </div>
    </div>
  );
};

export default StorySlide;
