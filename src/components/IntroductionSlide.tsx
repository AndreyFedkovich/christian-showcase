import { IntroductionSlide as IntroductionSlideType } from "@/data/epistles-structure";

interface IntroductionSlideProps {
  slide: IntroductionSlideType;
  direction: 'next' | 'prev';
}

const IntroductionSlide = ({ slide, direction }: IntroductionSlideProps) => {
  return (
    <div className="w-full h-screen gradient-warm flex items-center justify-center p-8 animate-in fade-in duration-700">
      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
        {/* Левая часть - текст (3 колонки из 5) */}
        <div className="lg:col-span-3 space-y-6 animate-in slide-in-from-left-8 duration-700">
          <div className="space-y-2">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground tracking-tight">
              {slide.title}
            </h1>
            {slide.subtitle && (
              <p className="text-xl text-accent font-sans font-semibold">
                {slide.subtitle}
              </p>
            )}
          </div>
          
          <div className="space-y-4">
            {slide.content.map((paragraph, index) => (
              <p 
                key={index} 
                className="text-lg text-muted-foreground font-sans leading-relaxed animate-in slide-in-from-left-8 duration-700"
                style={{ animationDelay: `${(index + 1) * 100}ms` }}
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        {/* Правая часть - изображение (2 колонки из 5) */}
        <div className="lg:col-span-2 animate-in slide-in-from-right-8 duration-700 delay-200">
          <div className="aspect-[3/4] overflow-hidden rounded-2xl shadow-premium">
            <img 
              src={slide.image} 
              alt={slide.title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntroductionSlide;
