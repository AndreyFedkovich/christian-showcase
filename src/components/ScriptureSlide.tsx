import { ScriptureSlide as ScriptureSlideType } from "@/data/joseph-story";
import { Book } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ScriptureSlideProps {
  slide: ScriptureSlideType;
  direction: 'next' | 'prev';
}

const ScriptureSlide = ({ slide, direction }: ScriptureSlideProps) => {
  const animationClass = direction === 'next' 
    ? 'animate-fade-in' 
    : 'animate-fade-in';

  return (
    <div className="h-full w-full gradient-warm relative overflow-hidden flex items-center justify-center p-8 md:p-16">
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-96 h-96 rounded-full bg-accent blur-3xl" />
        <div className="absolute bottom-20 right-20 w-96 h-96 rounded-full bg-primary blur-3xl" />
      </div>

      <div className={`relative z-10 max-w-4xl w-full ${animationClass}`}>
        {/* Header Badge */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-accent/80 backdrop-blur-sm rounded-full shadow-premium">
            <Book className="w-6 h-6 text-[#FFF5E6]" />
            <span className="text-base font-sans font-bold text-[#FFF5E6] uppercase tracking-wider">
              Священное Писание
            </span>
          </div>
        </div>

        {/* Book Reference */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="h-px w-24 bg-gradient-to-r from-transparent via-accent to-transparent" />
            <div className="h-px w-24 bg-gradient-to-r from-transparent via-accent to-transparent" />
          </div>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-accent mb-2">
            {slide.reference}
          </h1>
          <div className="flex items-center justify-center gap-4 mt-4">
            <div className="h-px w-24 bg-gradient-to-r from-transparent via-accent to-transparent" />
            <div className="h-px w-24 bg-gradient-to-r from-transparent via-accent to-transparent" />
          </div>
        </div>

        {/* Verses Container */}
        <div className="relative">
          {/* Top Quote Mark */}
          <div className="absolute top-1/2 -translate-y-1/2 -left-12 text-8xl text-accent/20 font-serif leading-none">
            «
          </div>
          
          {/* Verses */}
          <div className="bg-card/40 backdrop-blur-sm border-2 border-accent/30 rounded-2xl p-8 md:p-12 shadow-premium h-[65vh] flex flex-col">
            <ScrollArea className="h-full pr-2">
              <div className="space-y-6">
                {slide.verses.map((verse, index) => (
                  <div 
                    key={verse.number}
                    className="flex gap-4 group animate-fade-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    {/* Verse Number Badge */}
                    <div className="flex-shrink-0 w-8 h-8 rounded-full gradient-gold flex items-center justify-center shadow-card">
                      <span className="text-xs font-bold text-primary-foreground">
                        {verse.number}
                      </span>
                    </div>
                    
                    {/* Verse Text */}
                    <p className="font-serif text-lg md:text-xl leading-relaxed text-foreground group-hover:text-accent transition-smooth">
                      {verse.text}
                    </p>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>

          {/* Bottom Quote Mark */}
          <div className="absolute top-1/2 -translate-y-1/2 -right-12 text-8xl text-accent/20 font-serif leading-none">
            »
          </div>
        </div>

        {/* Decorative Footer Line */}
        <div className="mt-12 flex items-center justify-center gap-2 opacity-30">
          <div className="h-px w-32 bg-gradient-to-r from-transparent via-accent to-transparent" />
          <Book className="w-4 h-4 text-accent" />
          <div className="h-px w-32 bg-gradient-to-r from-transparent via-accent to-transparent" />
        </div>
      </div>
    </div>
  );
};

export default ScriptureSlide;
