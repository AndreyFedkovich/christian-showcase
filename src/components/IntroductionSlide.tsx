// Flexible interface that works with both IntroductionSlide from epistles and SeminarIntroductionSlide
interface IntroductionSlideData {
  type: 'introduction';
  title: string;
  subtitle?: string;
  content: string[];
  image: string;
}

interface IntroductionSlideProps {
  slide: IntroductionSlideData;
  direction: 'next' | 'prev';
}

const IntroductionSlide = ({ slide, direction }: IntroductionSlideProps) => {
  return (
    <div className="w-full h-screen gradient-warm flex items-center justify-center p-8 animate-in fade-in duration-700">
      <div className="max-w-[100rem] w-full grid grid-cols-1 lg:grid-cols-7 gap-12 items-center">
        {/* Левая часть - текст (3 колонки из 5) */}
        <div className="lg:col-span-3 space-y-9 animate-in slide-in-from-left-8 duration-700">
          <div className="space-y-9">
            <h1 className="text-5xl md:text-6xl font-bold text-foreground tracking-tight">
              {slide.title}
            </h1>
            {slide.subtitle && (
              <p className="text-4xl text-accent font-sans font-semibold leading-[3rem]">
                {slide.subtitle}
              </p>
            )}
          </div>
          
          <div className="space-y-7">
            {slide.content.map((paragraph, index) => (
              <p 
                key={index} 
                className="text-2xl md:text-4xl text-muted-foreground font-sans md:leading-[2.7rem] animate-in slide-in-from-left-8 duration-700"
                style={{ animationDelay: `${(index + 1) * 100}ms` }}
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        {/* Правая часть - изображение (2 колонки из 5) */}
        <div className="lg:col-span-4 animate-in slide-in-from-right-8 duration-700 delay-200">
          <div className="aspect-[5/4] h-[700px] overflow-hidden rounded-2xl shadow-premium">
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
