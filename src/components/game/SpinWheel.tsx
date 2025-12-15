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
  // Текущий угол поворота колеса
  const [rotation, setRotation] = useState(0);
  // Индекс выбранного элемента (для подсветки после остановки)
  const [winnerIndex, setWinnerIndex] = useState<number | null>(null);

  const wheelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (spinning) {
      setWinnerIndex(null); // Сбрасываем победителя при начале вращения

      // 1. Выбираем случайный индекс победителя
      const newWinnerIndex = Math.floor(Math.random() * items.length);

      // 2. Рассчитываем математику вращения
      const segmentAngle = 360 / items.length;

      // Чтобы нужный сектор оказался наверху (под стрелкой), нужно учесть смещение.
      // Обычно 0 градусов - это 3 часа (справа). Повернем на -90, чтобы 0 был сверху.
      // Но проще считать так: сколько градусов нужно открутить назад, чтобы элемент встал наверх.
      const indexOffset = newWinnerIndex * segmentAngle;

      // Добавляем случайное количество полных оборотов (минимум 5, максимум 10)
      // + добавляем текущее вращение, чтобы колесо не крутилось назад
      const spins = 360 * (5 + Math.floor(Math.random() * 5));

      // Расчет конечного угла:
      // spins (обороты) + (360 - смещение элемента)
      // Мы вычитаем смещение, чтобы "подтянуть" элемент к верху (0 градусов)
      const targetRotation = rotation + spins + (360 - indexOffset % 360);

      // Запускаем вращение
      setRotation(targetRotation);

      // 3. Обработка завершения (через время анимации CSS)
      // Время должно совпадать с duration в CSS (например, 4s)
      const timeoutId = setTimeout(() => {
        setWinnerIndex(newWinnerIndex);
        onComplete(items[newWinnerIndex].value);
      }, 4000); // 4 секунды анимации

      return () => clearTimeout(timeoutId);
    }
  }, [spinning]);

  const segmentAngle = 360 / items.length;

  return (
      <div className={cn("relative flex flex-col items-center justify-center py-10", className)}>

        {/* Указатель (Стрелка) - неподвижен, указывает вниз на колесо */}
        <div className="absolute top-8 z-20 translate-y-2">
          <div className="w-0 h-0 border-l-[15px] border-r-[15px] border-t-[25px] border-l-transparent border-r-transparent border-t-red-500 drop-shadow-md" />
        </div>

        {/* Контейнер колеса с обрезкой краев */}
        <div className="relative w-72 h-72 md:w-96 md:h-96 rounded-full overflow-hidden shadow-2xl border-4 border-gray-800 bg-white">

          {/* Вращающаяся часть */}
          <div
              ref={wheelRef}
              className="w-full h-full transition-transform duration-[4000ms] cubic-bezier(0.2, 0.8, 0.2, 1)"
              style={{
                transform: `rotate(${rotation}deg)`
              }}
          >
            {items.map((item, index) => {
              // Угол поворота для конкретного сектора
              const rotate = index * segmentAngle;

              // Цвета для секторов (чередование)
              const isEven = index % 2 === 0;
              const bgColor = item.color || (isEven ? 'bg-indigo-500' : 'bg-violet-600');

              return (
                  <div
                      key={index}
                      className="absolute w-full h-full left-0 top-0 text-center"
                      style={{
                        transform: `rotate(${rotate}deg)`,
                      }}
                  >
                    {/* Сектор (визуальная линия) */}
                    <div
                        className={cn(
                            "absolute top-0 left-1/2 -ml-[1px] h-1/2 w-[2px] bg-white/20 origin-bottom",
                        )}
                    />

                    {/* Контент сектора */}
                    <div
                        className="absolute left-1/2 top-4 -translate-x-1/2 flex flex-col items-center justify-start pt-2 gap-1 text-white font-bold text-sm md:text-base"
                        style={{
                          // Поворачиваем текст, чтобы он был читаем
                          // Высота сектора — половина колеса. Контент ставим ближе к краю.
                          height: '50%',
                          transformOrigin: 'bottom center'
                        }}
                    >
                      {item.icon && <span className="text-2xl">{item.icon}</span>}
                      <span className="max-w-[80px] truncate drop-shadow-md">
                    {item.label}
                  </span>
                    </div>
                  </div>
              );
            })}

            {/* Фоновый градиент (создает сектора визуально) */}
            <div
                className="absolute inset-0 -z-10"
                style={{
                  background: `conic-gradient(
                from 0deg,
                ${items.map((_, i) => {
                    // Генерируем CSS градиент для фона
                    const start = (i * 100) / items.length;
                    const end = ((i + 1) * 100) / items.length;
                    const color = i % 2 === 0 ? '#6366f1' : '#7c3aed'; // indigo-500 / violet-600
                    return `${color} ${start}% ${end}%`;
                  }).join(', ')}
              )`
                }}
            />
          </div>

          {/* Центральная заглушка (ступица) */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center z-10 border-4 border-gray-100">
            <div className="text-gray-400">
              {winnerIndex !== null ? '🎉' : 'Spin'}
            </div>
          </div>
        </div>
      </div>
  );
}

export default SpinWheel;
