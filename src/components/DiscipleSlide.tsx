import { Disciple } from "@/data/disciples";

interface DiscipleSlideProps {
  disciple: Disciple;
}

const DiscipleSlide = ({ disciple }: DiscipleSlideProps) => {
  return (
    <div className="h-full w-full flex items-center justify-center p-8 md:p-16">
      <div className="max-w-7xl w-full grid md:grid-cols-2 gap-8 md:gap-16 items-center">
        {/* Image Section */}
        <div className="relative group">
          <div className="absolute inset-0 gradient-gold opacity-20 blur-3xl group-hover:opacity-30 transition-smooth" />
          <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-premium">
            <img 
              src={disciple.image} 
              alt={disciple.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-6 right-6 bg-accent/90 backdrop-blur-sm px-4 py-2 rounded-full">
              <span className="text-sm font-sans font-bold text-accent-foreground">
                #{disciple.id}
              </span>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="space-y-6">
          <div>
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-3">
              {disciple.name}
            </h1>
            <p className="text-2xl text-accent font-semibold italic">
              {disciple.subtitle}
            </p>
          </div>

          {/* Traits */}
          <div className="flex flex-wrap gap-2">
            {disciple.traits.map((trait, index) => (
              <span 
                key={index}
                className="px-4 py-2 bg-secondary text-secondary-foreground rounded-full text-sm font-sans font-medium"
              >
                {trait}
              </span>
            ))}
          </div>

          {/* Story */}
          <div className="space-y-4 max-h-[50vh] overflow-y-auto pr-4 custom-scrollbar">
            {disciple.story.map((paragraph, index) => (
              <p 
                key={index}
                className="text-base md:text-lg text-foreground/80 leading-relaxed font-sans"
              >
                {paragraph}
              </p>
            ))}
          </div>

          {/* Quote */}
          {disciple.quote && (
            <blockquote className="border-l-4 border-accent pl-6 py-2 italic text-lg text-muted-foreground">
              "{disciple.quote}"
            </blockquote>
          )}
        </div>
      </div>
    </div>
  );
};

export default DiscipleSlide;
