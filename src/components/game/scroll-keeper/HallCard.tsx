import { Hall, HallType } from '@/data/scroll-keeper';
import { cn } from '@/lib/utils';

interface HallCardProps {
  hall: Hall;
  hallNumber: number;
  onClick: () => void;
}

const hallGradients: Record<HallType, string> = {
  shadows: 'from-slate-950 via-slate-800 to-slate-900',
  scriptorium: 'from-amber-900 via-orange-800 to-amber-700',
  echo: 'from-violet-900 via-purple-800 to-fuchsia-900',
  gallery: 'from-rose-900 via-pink-800 to-rose-800',
  treasury: 'from-yellow-900 via-amber-700 to-yellow-600',
  voices: 'from-cyan-900 via-teal-800 to-cyan-800',
  spiral: 'from-indigo-900 via-blue-800 to-indigo-800',
};

export function HallCard({ hall, hallNumber, onClick }: HallCardProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        "relative aspect-[3/4] rounded-xl overflow-hidden cursor-pointer group",
        "transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl",
        "border border-white/10"
      )}
    >
      {/* Background gradient */}
      <div className={cn(
        "absolute inset-0 bg-gradient-to-br",
        hallGradients[hall.type]
      )} />
      
      {/* Decorative overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
      
      {/* Large icon in center */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-8xl opacity-80 group-hover:scale-110 transition-transform duration-300">
          {hall.icon}
        </span>
      </div>
      
      {/* Content at bottom */}
      <div className="absolute bottom-0 left-0 right-0 p-5 space-y-2">
        {/* Hall number badge */}
        <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-accent/80 text-white text-sm font-medium">
          Зал {hallNumber}
        </div>
        
        {/* Title */}
        <h3 className="text-xl font-bold text-white leading-tight">
          {hall.name}
        </h3>
        
        {/* Description */}
        <p className="text-white/70 text-sm line-clamp-2">
          {hall.description}
        </p>
      </div>
      
      {/* Hover glow effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-t from-amber-500/20 via-transparent to-transparent" />
    </div>
  );
}
