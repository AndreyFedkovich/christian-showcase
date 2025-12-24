import { ScriptureDarkSlide as ScriptureDarkSlideType } from "@/data/seminar";
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
      return 'text-3xl md:text-4xl lg:text-6xl lg:leading-[4rem] leading-relaxed';
    } else if (totalChars < 400 && versesCount <= 4) {
      return 'text-2xl md:text-3xl lg:text-4xl leading-relaxed';
    } else if (totalChars < 700) {
      return 'text-xl md:text-2xl lg:text-3xl leading-relaxed';
    } else {
      return 'text-lg md:text-xl lg:text-2xl leading-relaxed';
    }
  };

  return (
    <div className="absolute inset-0 bg-black flex items-center justify-center overflow-hidden">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-800 to-stone-700" />
      
      {/* Main content container */}
      <div className="relative z-10 w-full max-w-5xl px-8 md:px-16 flex flex-col items-center justify-center h-full py-16">
        {/* Decorative quotes at top */}
        <div className="flex items-center justify-center h-[180px]">
          <span className="text-[9rem] md:text-[12rem] lg:text-[16rem] text-accent font-serif leading-none">“</span>
        </div>

        {/* Verses container */}
        <div className={cn(
          "text-white text-center max-w-4xl mb-12 md:mb-16 space-y-4",
          getFontSize()
        )}>
          {slide.verses.map((verse, index) => (
            <p
              key={verse.number}
              className="opacity-0 animate-fade-in"
              style={{ animationDelay: `${index * 400}ms` }}
            >
              {slide.verses.length > 1 && (
                <sup className="text-base md:text-lg text-accent/70 mr-1 font-semibold">{verse.number}</sup>
              )}
              {verse.text}
            </p>
          ))}
        </div>

        {/* Decorative divider */}
        <div className={cn("flex items-center justify-center gap-4 mb-6 opacity-0", direction === 'next' ? 'animate-fade-in' : 'animate-fade-in-reverse')}
             style={{ animationDelay: slide.verses.length * 400 + 300 + 'ms' }}>
          <div className="h-px w-20 md:w-24 bg-accent/40" />
          <div className="w-2 h-2 rounded-full bg-accent" />
          <div className="h-px w-20 md:w-24 bg-accent/40" />
        </div>

        {/* Reference at bottom */}
        <div className={cn(
          "text-accent uppercase tracking-[0.3em] text-lg md:text-xl lg:text-2xl font-semibold opacity-0",
          direction === 'next' ? 'animate-fade-in' : 'animate-fade-in-reverse'
        )}
        style={{ animationDelay: slide.verses.length * 400 + 800 + 'ms' }}
        >
          {slide.reference}
        </div>
      </div>
    </div>
  );
};

export default ScriptureDarkSlide;
