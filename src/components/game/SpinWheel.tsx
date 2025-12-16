import { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface SpinWheelProps<T> {
    items: { value: T; label: string; icon?: string; color?: string }[];
    onComplete: (value: T) => void;
    spinning: boolean;
    className?: string;
}

function SpinWheel<T>({
                          items,
                          onComplete,
                          spinning,
                          className
                      }: SpinWheelProps<T>) {
    const [rotation, setRotation] = useState(0);
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    // Длительность 8 секунд
    const SPIN_DURATION = 8000;

    useEffect(() => {
        if (spinning) {
            const winnerIndex = Math.floor(Math.random() * items.length);
            const segmentAngle = 360 / items.length;

            // Смещение, чтобы элемент оказался наверху
            const indexOffset = winnerIndex * segmentAngle;
            // Центрирование элемента относительно стрелки
            const centerOffset = segmentAngle / 2;

            // 10-14 оборотов
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

    const backgroundGradient = `conic-gradient(
    from 0deg,
    ${items.map((item, i) => {
        const start = (i * 100) / items.length;
        const end = ((i + 1) * 100) / items.length;
        // Чередование цветов: фиолетовый / индиго
        const defaultColor = i % 2 === 0 ? '#7c3aed' : '#4f46e5';
        return `${item.color || defaultColor} ${start}% ${end}%`;
    }).join(', ')}
  )`;

    return (
        <div className={cn("relative flex flex-col items-center justify-center py-10 overflow-hidden", className)}>

            {/* Стрелка */}
            <div className="absolute top-4 z-20 drop-shadow-2xl">
                <div className="w-0 h-0 border-l-[24px] border-r-[24px] border-t-[48px] border-l-transparent border-r-transparent border-t-yellow-400" />
            </div>

            {/*
         РАЗМЕРЫ:
         w-[380px] h-[380px] -> Мобилка (очень крупно)
         md:w-[700px] md:h-[700px] -> Десктоп (гигантское)
      */}
            <div className="relative w-[380px] h-[380px] md:w-[700px] md:h-[700px] rounded-full border-[8px] border-gray-800 shadow-2xl bg-gray-900">
                <div
                    className="w-full h-full rounded-full overflow-hidden"
                    style={{
                        transform: `rotate(${rotation}deg)`,
                        background: backgroundGradient,
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
                                style={{
                                    transform: `rotate(${rotate}deg)`,
                                }}
                            >
                                {/*
                    КОНТЕНТ:
                    pt-12 md:pt-16 -> Отступ от внешнего края.
                */}
                                <div
                                    className="flex flex-col items-center justify-start pt-12 md:pt-16 h-1/2 text-white font-bold"
                                    style={{
                                        transformOrigin: 'bottom center',
                                    }}
                                >
                                    {/* Иконка (убрали rotate-180, теперь она стоит прямо) */}
                                    <span className="text-4xl md:text-6xl drop-shadow-md mb-3">
                    {item.icon}
                  </span>

                                    {/*
                     ТЕКСТ:
                     w-[120px] md:w-[240px] -> Ограничение ширины заставляет текст переноситься
                     whitespace-normal -> Разрешает перенос
                     leading-tight -> Уменьшает расстояние между строками
                  */}
                                    <span className="text-lg md:text-2xl uppercase tracking-wider drop-shadow-md text-center leading-tight whitespace-normal w-[120px] md:w-[240px]">
                    {item.label}
                  </span>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Центральная часть */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 md:w-32 md:h-32 bg-white rounded-full shadow-inner border-[6px] border-gray-200 z-10 flex items-center justify-center">
                    <div className="w-5 h-5 md:w-8 md:h-8 bg-gray-300 rounded-full" />
                </div>
            </div>
        </div>
    );
}

export default SpinWheel;
