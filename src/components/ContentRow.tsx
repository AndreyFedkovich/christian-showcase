import { ReactNode, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ContentRowProps {
  title: string;
  children: ReactNode;
  className?: string;
}

const ContentRow = ({ title, children, className }: ContentRowProps) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return;
    const container = scrollContainerRef.current;
    const scrollAmount = container.clientWidth * 0.75;
    container.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth'
    });
  };

  return (
    <div className={cn("relative group py-6", className)}>
      {/* Section Title */}
      <h2 className="text-xl md:text-2xl font-bold text-foreground mb-4 px-6 md:px-12">
        {title}
      </h2>

      {/* Scroll Buttons - Desktop only */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute left-0 top-1/2 translate-y-2 z-10 hidden md:flex opacity-0 group-hover:opacity-100 transition-opacity bg-background/80 hover:bg-background/90 rounded-full shadow-lg"
        onClick={() => scroll('left')}
      >
        <ChevronLeft className="w-6 h-6" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-0 top-1/2 translate-y-2 z-10 hidden md:flex opacity-0 group-hover:opacity-100 transition-opacity bg-background/80 hover:bg-background/90 rounded-full shadow-lg"
        onClick={() => scroll('right')}
      >
        <ChevronRight className="w-6 h-6" />
      </Button>

      {/* Scrollable Container */}
      <div
        ref={scrollContainerRef}
        className="flex gap-3 md:gap-4 overflow-x-auto scroll-smooth px-6 md:px-12 pb-4 scrollbar-hide"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default ContentRow;
