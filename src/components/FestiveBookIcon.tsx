import { BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";

interface FestiveBookIconProps {
  className?: string;
}

const FestiveBookIcon = ({ className }: FestiveBookIconProps) => {
  const now = new Date();
  const month = now.getMonth(); // 0 = Jan, 11 = Dec
  const isHolidaySeason = month === 11 || month === 0; // December or January

  if (!isHolidaySeason) {
    return <BookOpen className={className} />;
  }

  return (
    <div className="relative inline-flex items-center justify-center">
      <BookOpen className={className} />
      {/* Santa hat overlay */}
      <svg 
        className="absolute -top-2 -right-1.5 w-4 h-4 drop-shadow-sm" 
        viewBox="0 0 24 24"
        fill="none"
      >
        {/* Hat body - red triangle */}
        <path 
          d="M4 22 L12 2 L20 22 Z" 
          fill="#dc2626"
        />
        {/* White fur trim */}
        <rect 
          x="2" 
          y="19" 
          width="20" 
          height="5" 
          rx="2.5" 
          fill="white"
        />
        {/* White pompom */}
        <circle 
          cx="12" 
          cy="3" 
          r="3" 
          fill="white"
        />
      </svg>
    </div>
  );
};

export default FestiveBookIcon;
