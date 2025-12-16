import { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface SpinWheelProps<T> {
  items: { value: T; label: string; icon?: string; color?: string }[];
  onComplete: (value: T) => void;
  spinning: boolean;
  className?: string;
}

const premiumGradients = [
  { start: '#667eea', end: '#764ba2' },  // Фиолетово-лиловый
  { start: '#f093fb', end: '#f5576c' },  // Розово-коралловый  
  { start: '#4facfe', end: '#00f2fe' },  // Голубой
  { start: '#43e97b', end: '#38f9d7' },  // Изумрудный
  { start: '#fa709a', end: '#fee140' },  // Розово-золотой
  { start: '#f6d365', end: '#fda085' },  // Оранжево-персиковый
];

function SpinWheel<T>({
  items,
  onComplete,
  spinning,
  className
}: SpinWheelProps<T>) {
  const [rotation, setRotation] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const SPIN_DURATION = 8000;

  useEffect(() => {
    if (spinning) {
      const winnerIndex = Math.floor(Math.random() * items.length);
      const segmentAngle = 360 / items.length;

      const indexOffset = winnerIndex * segmentAngle;
      const centerOffset = segmentAngle / 2;

      const randomSpins = 360 * (10 + Math.floor(Math.random() * 4));
      const targetRotation = rotation + randomSpins + (360 - indexOffset) - centerOffset;

      setRotation(targetRotation);

      if (timerRef.current) clearTimeout(timerRef.current);

      timerRef.current = setTimeout(() => {
        onComplete(items[winnerIndex].value);
      }, SPIN_DURATION);
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [spinning]);

  // Функция для создания SVG path сектора
  const createSectorPath = (index: number, total: number, radius: number, centerX: number, centerY: number) => {
    const anglePerSector = (2 * Math.PI) / total;
    const startAngle = index * anglePerSector - Math.PI / 2;
    const endAngle = startAngle + anglePerSector;

    const x1 = centerX + radius * Math.cos(startAngle);
    const y1 = centerY + radius * Math.sin(startAngle);
    const x2 = centerX + radius * Math.cos(endAngle);
    const y2 = centerY + radius * Math.sin(endAngle);

    const largeArcFlag = anglePerSector > Math.PI ? 1 : 0;

    return `M ${centerX} ${centerY} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2} Z`;
  };

  const radius = 200;
  const center = 200;

  return (
    <div className={cn("relative flex flex-col items-center justify-center py-10 overflow-hidden", className)}>
      {/* Стрелка */}
      <div className="absolute top-4 z-20" style={{ filter: 'drop-shadow(0 0 20px rgba(251, 191, 36, 0.8))' }}>
        <div 
          className="w-0 h-0 border-l-[28px] border-r-[28px] border-t-[56px] border-l-transparent border-r-transparent"
          style={{
            borderTopColor: '#fbbf24',
            filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))'
          }}
        />
      </div>

      {/* Внешний glow контейнер */}
      <div 
        className="relative w-[380px] h-[380px] md:w-[700px] md:h-[700px] rounded-full"
        style={{
          boxShadow: '0 0 80px rgba(124, 58, 237, 0.5), 0 0 120px rgba(124, 58, 237, 0.3)'
        }}
      >
        {/* Золотая рамка */}
        <div 
          className="absolute inset-0 rounded-full"
          style={{
            background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 50%, #d97706 100%)',
            padding: '8px'
          }}
        >
          <div className="w-full h-full rounded-full overflow-hidden">
            {/* SVG колесо */}
            <svg
              viewBox="0 0 400 400"
              className="w-full h-full"
              style={{
                transform: `rotate(${rotation}deg)`,
                transition: `transform ${SPIN_DURATION}ms cubic-bezier(0.2, 0, 0.1, 1)`
              }}
            >
              <defs>
                {items.map((_, i) => {
                  const gradient = premiumGradients[i % premiumGradients.length];
                  return (
                    <linearGradient
                      key={`gradient-${i}`}
                      id={`sector-gradient-${i}`}
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="100%"
                    >
                      <stop offset="0%" stopColor={gradient.start} />
                      <stop offset="100%" stopColor={gradient.end} />
                    </linearGradient>
                  );
                })}
              </defs>

              {/* Секторы */}
              {items.map((_, index) => (
                <path
                  key={`sector-${index}`}
                  d={createSectorPath(index, items.length, radius, center, center)}
                  fill={`url(#sector-gradient-${index})`}
                  stroke="rgba(255,255,255,0.2)"
                  strokeWidth="2"
                />
              ))}
            </svg>

            {/* Текст и иконки поверх SVG */}
            <div 
              className="absolute inset-0"
              style={{
                transform: `rotate(${rotation}deg)`,
                transition: `transform ${SPIN_DURATION}ms cubic-bezier(0.2, 0, 0.1, 1)`
              }}
            >
              {items.map((item, index) => {
                const segmentAngle = 360 / items.length;
                const rotate = index * segmentAngle + (segmentAngle / 2);

                return (
                  <div
                    key={index}
                    className="absolute top-0 left-0 w-full h-full"
                    style={{ transform: `rotate(${rotate}deg)` }}
                  >
                    <div
                      className="flex flex-col items-center justify-start pt-10 md:pt-16 h-1/2 text-white font-bold"
                      style={{ transformOrigin: 'bottom center' }}
                    >
                      <span 
                        className="text-3xl md:text-5xl mb-2"
                        style={{ textShadow: '0 2px 8px rgba(0,0,0,0.5)' }}
                      >
                        {item.icon}
                      </span>
                      <span 
                        className="text-sm md:text-xl uppercase tracking-wider text-center leading-tight w-[90px] md:w-[180px] break-words hyphens-auto"
                        style={{ textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}
                      >
                        {item.label}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Центральная часть */}
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 md:w-28 md:h-28 rounded-full z-10 flex items-center justify-center"
          style={{
            background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 50%, #d97706 100%)',
            boxShadow: '0 4px 20px rgba(251, 191, 36, 0.5), inset 0 2px 4px rgba(255,255,255,0.3)'
          }}
        >
          <div 
            className="w-12 h-12 md:w-16 md:h-16 rounded-full"
            style={{
              background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
              boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.5)'
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default SpinWheel;
