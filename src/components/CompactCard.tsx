import { motion } from "framer-motion";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { cn } from "@/lib/utils";

interface CompactCardProps {
  title: string;
  thumbnail: string;
  subtitle?: string;
  onClick: () => void;
  className?: string;
}

const CompactCard = ({ title, thumbnail, subtitle, onClick, className }: CompactCardProps) => {
  return (
    <motion.div
      className={cn(
        "flex-shrink-0 w-[200px] md:w-[260px] cursor-pointer group/card p-2",
        className
      )}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
    >
      {/* Card Container */}
      <div className="relative rounded-xl overflow-hidden bg-card shadow-lg transition-shadow group-hover/card:shadow-xl group-hover/card:shadow-primary/10">
        <AspectRatio ratio={2/3}>
          {thumbnail ? (
            <img
              src={thumbnail}
              alt={title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover/card:scale-105"
            />
          ) : (
            <div className="w-full h-full bg-muted flex items-center justify-center">
              <span className="text-4xl">📖</span>
            </div>
          )}
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-70 group-hover/card:opacity-90 transition-opacity" />
          
          {/* Title at bottom */}
          <div className="absolute bottom-0 left-0 right-0 p-3">
            <h3 className="text-white font-semibold text-sm md:text-base leading-tight line-clamp-2">
              {title}
            </h3>
            {subtitle && (
              <p className="text-white/70 text-xs mt-1 line-clamp-1">
                {subtitle}
              </p>
            )}
          </div>
        </AspectRatio>
      </div>
    </motion.div>
  );
};

export default CompactCard;
