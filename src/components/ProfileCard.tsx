import { Card } from "@/components/ui/card";
import { Disciple } from "@/data/disciples";

interface DiscipleCardProps {
  disciple: Disciple;
  slideNumber: number;
  onClick: () => void;
}

const ProfileCard = ({ disciple, slideNumber, onClick }: DiscipleCardProps) => {
  return (
    <Card 
      className="group relative overflow-hidden cursor-pointer transition-smooth hover:-translate-y-2 shadow-card hover:shadow-premium"
      onClick={onClick}
    >
      <div className="aspect-[3/4] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/40 to-transparent z-10 opacity-80 group-hover:opacity-90 transition-smooth" />
        <img 
          src={disciple.image} 
          alt={disciple.name}
          className="w-full h-full object-cover transition-smooth group-hover:scale-110"
        />
        <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
          <div className="inline-block px-3 py-1 bg-accent/80 backdrop-blur-sm rounded-full mb-3">
            <span className="text-xs font-sans font-medium text-[#FFF5E6] uppercase tracking-wider">
              Апостол {slideNumber}
            </span>
          </div>
          <h3 className="text-2xl font-bold text-primary-foreground mb-2">
            {disciple.name}
          </h3>
          <p className="text-sm text-primary-foreground/80 font-sans italic">
            {disciple.subtitle}
          </p>
        </div>
      </div>
    </Card>
  );
};

export default ProfileCard;
