import { ReflectionSlide as ReflectionSlideType } from "@/data/joseph-story";

interface ReflectionSlideProps {
  slide: ReflectionSlideType;
  direction?: 'next' | 'prev';
}

const ReflectionSlide = ({ slide, direction = 'next' }: ReflectionSlideProps) => {
  const animationClass = direction === 'next' 
    ? 'animate-slide-in-right' 
    : 'animate-slide-in-left';

  return (
    <div className={`absolute inset-0 gradient-overlay flex items-center justify-center p-8 ${animationClass}`}>
      <div className="max-w-3xl w-full text-center space-y-12">
        {/* Icon */}
        <div className="flex justify-center">
          <div className="w-24 h-24 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
            <svg 
              className="w-12 h-12 text-white" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
              />
            </svg>
          </div>
        </div>

        {/* Subtitle */}
        {slide.subtitle && (
          <div className="inline-block px-6 py-2 bg-white/10 backdrop-blur-sm rounded-full">
            <span className="text-sm font-sans font-medium text-white uppercase tracking-wider">
              {slide.subtitle}
            </span>
          </div>
        )}

        {/* Question */}
        <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight px-4">
          {slide.question}
        </h2>

        {/* Decorative line */}
        <div className="flex justify-center">
          <div className="w-32 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent"></div>
        </div>
      </div>
    </div>
  );
};

export default ReflectionSlide;
