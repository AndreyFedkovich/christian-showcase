import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { SpiralChallenge } from '@/data/scroll-keeper';
import { Clock, GripVertical, Check, RotateCcw, ChevronUp, ChevronDown } from 'lucide-react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface TimeEvent {
  id: number;
  name: string;
  era: string;
}

interface TimeSpiralProps {
  challenge: SpiralChallenge;
  onAnswer: (answer: string, correct: boolean) => void;
}

const getEraColor = (era: string) => {
  const colors: Record<string, string> = {
    'Творение': 'from-amber-400 to-yellow-500',
    'Патриархи': 'from-emerald-400 to-teal-500',
    'Исход': 'from-orange-400 to-red-500',
    'Цари': 'from-purple-400 to-violet-500',
    'Пророки': 'from-blue-400 to-indigo-500',
    'Пришествие': 'from-rose-400 to-pink-500'
  };
  return colors[era] || 'from-slate-400 to-slate-500';
};

interface SortableEventItemProps {
  event: TimeEvent;
  index: number;
  totalEvents: number;
  onMoveUp: () => void;
  onMoveDown: () => void;
}

function SortableEventItem({ event, index, totalEvents, onMoveUp, onMoveDown }: SortableEventItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: event.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 50 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="relative group"
    >
      {/* Timeline dot */}
      <div className={`
        absolute -left-[42px] top-1/2 -translate-y-1/2 w-6 h-6 rounded-full
        bg-gradient-to-br ${getEraColor(event.era)}
        shadow-lg border-2 border-white/20
        transition-transform group-hover:scale-125
      `} />

      {/* Event card */}
      <div className={`
        flex items-center gap-4 p-5 rounded-xl
        bg-gradient-to-r from-slate-900/90 to-slate-800/90
        border border-cyan-500/20 hover:border-cyan-400/40
        backdrop-blur-sm shadow-lg
        transition-all duration-300
        hover:shadow-cyan-500/10 hover:shadow-xl
        ${isDragging ? 'ring-2 ring-cyan-400 shadow-2xl shadow-cyan-500/30 scale-105' : ''}
      `}>
        {/* Drag handle */}
        <div 
          {...attributes} 
          {...listeners}
          className="text-cyan-500/40 hover:text-cyan-400 transition-colors cursor-grab active:cursor-grabbing"
        >
          <GripVertical className="w-6 h-6" />
        </div>

        {/* Position number */}
        <div className="w-10 h-10 rounded-full bg-cyan-500/20 flex items-center justify-center text-cyan-300 font-bold text-lg">
          {index + 1}
        </div>

        {/* Event info */}
        <div className="flex-1">
          <h3 className="text-white/90 font-medium text-lg">{event.name}</h3>
          <p className={`text-base bg-gradient-to-r ${getEraColor(event.era)} bg-clip-text text-transparent`}>
            {event.era}
          </p>
        </div>

        {/* Move buttons for mobile */}
        <div className="flex flex-col gap-1">
          <button
            onClick={onMoveUp}
            disabled={index === 0}
            className="p-1.5 text-cyan-500/50 hover:text-cyan-400 disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronUp className="w-5 h-5" />
          </button>
          <button
            onClick={onMoveDown}
            disabled={index === totalEvents - 1}
            className="p-1.5 text-cyan-500/50 hover:text-cyan-400 disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronDown className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

export const TimeSpiral: React.FC<TimeSpiralProps> = ({ challenge, onAnswer }) => {
  const [events, setEvents] = useState<TimeEvent[]>([]);
  const [showSpiral, setShowSpiral] = useState(false);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  useEffect(() => {
    const shuffled = [...challenge.events].sort(() => Math.random() - 0.5);
    setEvents(shuffled);
    
    const timer = setTimeout(() => setShowSpiral(true), 300);
    return () => clearTimeout(timer);
  }, [challenge]);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (over && active.id !== over.id) {
      setEvents((items) => {
        const oldIndex = items.findIndex(item => item.id === active.id);
        const newIndex = items.findIndex(item => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const moveEvent = (fromIndex: number, toIndex: number) => {
    if (toIndex < 0 || toIndex >= events.length) return;
    setEvents((items) => arrayMove(items, fromIndex, toIndex));
  };

  const resetOrder = () => {
    const shuffled = [...challenge.events].sort(() => Math.random() - 0.5);
    setEvents(shuffled);
  };

  const handleSubmit = () => {
    const currentOrder = events.map(e => e.id);
    const isCorrect = JSON.stringify(currentOrder) === JSON.stringify(challenge.correctOrder);
    onAnswer(currentOrder.join(','), isCorrect);
  };

  

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950 relative overflow-hidden">
      {/* Animated spiral background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Central spiral glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px]">
          {/* Spiral rings */}
          {[1, 2, 3, 4, 5, 6].map((ring) => (
            <div
              key={ring}
              className="absolute top-1/2 left-1/2 rounded-full border border-cyan-500/20"
              style={{
                width: `${ring * 120}px`,
                height: `${ring * 120}px`,
                transform: `translate(-50%, -50%) rotate(${ring * 30}deg)`,
                animation: `spin ${20 + ring * 5}s linear infinite ${ring % 2 === 0 ? 'reverse' : ''}`
              }}
            />
          ))}
          
          {/* Animated dots on spiral */}
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 rounded-full bg-cyan-400/40"
              style={{
                top: `${50 + Math.sin(i * 0.5) * (20 + i * 3)}%`,
                left: `${50 + Math.cos(i * 0.5) * (20 + i * 3)}%`,
                animation: `twinkle ${2 + Math.random()}s ease-in-out infinite`,
                animationDelay: `${i * 0.2}s`
              }}
            />
          ))}
        </div>

        {/* Time particles */}
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-blue-300/30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${4 + Math.random() * 3}s ease-in-out infinite`,
              animationDelay: `${i * 0.2}s`
            }}
          />
        ))}

        {/* Clock face subtle background */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full border border-cyan-500/10 opacity-30" />
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-8">
        {/* Hall title */}
        <div className="absolute top-8 left-1/2 -translate-x-1/2 flex items-center gap-3">
          <Clock className="w-7 h-7 text-cyan-400 animate-pulse" />
          <h2 className="text-2xl font-light text-cyan-300/80 tracking-wider">СПИРАЛЬ ВРЕМЕНИ</h2>
          <Clock className="w-7 h-7 text-cyan-400 animate-pulse" />
        </div>

        {/* Instructions */}
        <div className={`mb-8 text-center transition-all duration-700 ${showSpiral ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
          <p className="text-cyan-200/70 text-xl">Расставьте события в хронологическом порядке</p>
          <p className="text-cyan-400/50 text-base mt-1">Перетащите события или используйте стрелки</p>
        </div>

        {/* Events list - draggable */}
        <div className={`max-w-2xl w-full transition-all duration-1000 ${showSpiral ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-cyan-500/50 via-cyan-400/30 to-cyan-500/50" />
            
            {/* Timeline markers */}
            <div className="absolute left-8 top-0 w-4 h-4 -translate-x-1/2 rounded-full bg-cyan-400 shadow-lg shadow-cyan-500/50" />
            <div className="absolute left-8 bottom-0 w-4 h-4 -translate-x-1/2 rounded-full bg-cyan-400 shadow-lg shadow-cyan-500/50" />

            {/* Events */}
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <SortableContext
                items={events.map(e => e.id)}
                strategy={verticalListSortingStrategy}
              >
                <div className="space-y-4 pl-16">
                  {events.map((event, index) => (
                    <SortableEventItem
                      key={event.id}
                      event={event}
                      index={index}
                      totalEvents={events.length}
                      onMoveUp={() => moveEvent(index, index - 1)}
                      onMoveDown={() => moveEvent(index, index + 1)}
                    />
                  ))}
                </div>
              </SortableContext>
            </DndContext>
          </div>
        </div>

        {/* Action buttons */}
        <div className={`mt-8 flex gap-4 transition-all duration-700 delay-500 ${showSpiral ? 'opacity-100' : 'opacity-0'}`}>
          <Button
            variant="outline"
            onClick={resetOrder}
            className="border-cyan-500/30 text-cyan-300 hover:bg-cyan-500/10 hover:border-cyan-400/50 text-lg px-6 py-6"
          >
            <RotateCcw className="w-5 h-5 mr-2" />
            Перемешать
          </Button>
          <Button
            onClick={handleSubmit}
            className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white px-8 text-lg py-6"
          >
            <Check className="w-5 h-5 mr-2" />
            Проверить порядок
          </Button>
        </div>
      </div>
    </div>
  );
};
