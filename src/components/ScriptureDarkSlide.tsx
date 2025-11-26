import { ScriptureDarkSlide as ScriptureDarkSlideType } from "@/data/joseph-story";
import { cn } from "@/lib/utils";

interface ScriptureDarkSlideProps {
  slide: ScriptureDarkSlideType;
  direction: 'next' | 'prev';
}

const ScriptureDarkSlide = ({ slide, direction }: ScriptureDarkSlideProps) => {
  // Calculate font size based on content length
  const getFontSize = () => {
    const totalChars = slide.verses.reduce((acc, v) => acc + v.text.length, 0);
    const versesCount = slide.verses.length;
    
    if (totalChars < 200 && versesCount <= 2) {
      return 'text-2xl md:text-3xl lg:text-4xl leading-relaxed';
    } else if (totalChars < 400 && versesCount <= 4) {
      return 'text-xl md:text-2xl lg:text-3xl leading-relaxed';
    } else if (totalChars < 700) {
      return 'text-lg md:text-xl lg:text-2xl leading-relaxed';
    } else {
      return 'text-base md:text-lg lg:text-xl leading-relaxed';
    }
  };

  return (
    <div className="absolute inset-0 bg-black flex items-center justify-center overflow-hidden">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black to-primary/5" />
      
      {/* Main content container */}
      <div className="relative z-10 w-full max-w-5xl px-8 md:px-16 flex flex-col items-center justify-center h-full py-16">
        {/* Decorative quotes at top */}
        <div className="mb-8 md:mb-12">
          <span className="text-7xl md:text-8xl lg:text-9xl text-accent font-serif leading-none tracking-[0.2em]">❝</span>
        </div>

        {/* Verses container */}
        <div className={cn(
          "text-white text-center max-w-4xl mb-12 md:mb-16 space-y-4",
          getFontSize(),
          direction === 'next' ? 'animate-fade-in' : 'animate-fade-in-reverse'
        )}>
          {slide.verses.map((verse, index) => (
            <p 
              key={verse.number}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {slide.verses.length > 1 && (
                <sup className="text-base md:text-lg text-accent/70 mr-1 font-semibold">{verse.number}</sup>
              )}
              {verse.text}
            </p>
          ))}
        </div>

        {/* Decorative divider */}
        <div className="flex items-center justify-center gap-4 mb-6">
          <div className="h-px w-20 md:w-24 bg-accent/40" />
          <div className="w-2 h-2 rounded-full bg-accent" />
          <div className="h-px w-20 md:w-24 bg-accent/40" />
        </div>

        {/* Reference at bottom */}
        <div className={cn(
          "text-accent uppercase tracking-[0.3em] text-base md:text-lg lg:text-xl font-semibold",
          direction === 'next' ? 'animate-fade-in' : 'animate-fade-in-reverse'
        )}
        style={{ animationDelay: '400ms' }}
        >
          {slide.reference}
        </div>
      </div>
    </div>
  );
};

export default ScriptureDarkSlide;
