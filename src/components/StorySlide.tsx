import { StorySlide as StorySlideType } from "@/data/joseph-story";

interface StorySlideProps {
  slide: StorySlideType;
  direction?: 'next' | 'prev';
}

const StorySlide = ({ slide, direction = 'next' }: StorySlideProps) => {
  const animationClass = direction === 'next' 
    ? 'animate-slide-in-right' 
    : 'animate-slide-in-left';

  // Variant with image
  if (slide.image) {
    return (
      <div className={`absolute inset-0 gradient-warm flex items-center justify-center p-8 ${animationClass}`}>
        <div className="max-w-7xl w-full">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Image Section */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary via-accent to-primary opacity-30 blur-2xl group-hover:opacity-50 transition-smooth rounded-2xl" />
              <div className="relative aspect-[3/4] overflow-hidden rounded-2xl shadow-premium">
                <img 
                  src={slide.image} 
                  alt={slide.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Content Section */}
            <div className="space-y-6">
              {/* Chapter Badge */}
              <div className="inline-block px-6 py-2 bg-primary/20 backdrop-blur-sm rounded-full">
                <span className="text-sm font-sans font-medium text-primary uppercase tracking-wider">
                  {slide.chapter}
                </span>
              </div>

              {/* Title */}
              <h2 className="text-4xl md:text-5xl font-bold text-foreground leading-tight">
                {slide.title}
              </h2>

              {/* Story */}
              <div className="relative space-y-4 max-h-[50vh] overflow-y-auto pr-4 custom-scrollbar">
                {slide.story.map((paragraph, index) => (
                    <p
                        key={index}
                        className="text-lg md:text-xl text-muted-foreground leading-relaxed font-sans"
                    >
                      {paragraph}
                    </p>
                ))}
              </div>

              {/* Decorative element */}
              <div className="flex items-center gap-2 opacity-30">
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-primary to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Variant without image (current design)
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

        {/* Story */}
        <div className="relative space-y-4 max-h-[50vh] overflow-y-auto pr-4 custom-scrollbar">
          {slide.story.map((paragraph, index) => (
              <p
                  key={index}
                  className="text-xl md:text-2xl text-muted-foreground leading-relaxed font-sans"
              >
                {paragraph}
              </p>
          ))}
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
