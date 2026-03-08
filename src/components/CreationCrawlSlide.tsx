import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { CreationCrawlSlide as CreationCrawlSlideType } from "@/data/creation";

interface CreationCrawlSlideProps {
  slide: CreationCrawlSlideType;
  direction: 'next' | 'prev';
}

const CreationCrawlSlide = ({ slide, direction }: CreationCrawlSlideProps) => {
  const crawlRef = useRef<HTMLDivElement>(null);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    // Double rAF to ensure animation restarts on slide change
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setAnimating(true);
      });
    });
    return () => setAnimating(false);
  }, [slide]);

  return (
    <div className="min-h-screen w-full bg-black relative overflow-hidden flex items-center justify-center">
      {/* Star field */}
      <div className="absolute inset-0">
        {Array.from({ length: 120 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              width: Math.random() * 2 + 0.5,
              height: Math.random() * 2 + 0.5,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.6 + 0.1,
            }}
          />
        ))}
      </div>

      {/* Perspective container */}
      <div 
        className="relative w-full max-w-4xl mx-auto"
        style={{
          perspective: '400px',
          perspectiveOrigin: '50% 100%',
          height: '80vh',
          overflow: 'hidden',
        }}
      >
        {/* Gradient masks - top and bottom */}
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-black to-transparent z-10 pointer-events-none" />

        {/* Crawling text */}
        <div
          ref={crawlRef}
          className={animating ? 'creation-crawl-animate' : ''}
          style={{
            transformOrigin: '50% 100%',
            transform: 'rotateX(20deg)',
            position: 'absolute',
            left: '10%',
            right: '10%',
            bottom: animating ? undefined : '-100%',
          }}
        >
          {slide.lines.map((line, index) => (
            <p
              key={index}
              className={`text-3xl md:text-4xl font-serif leading-relaxed text-center ${
                line === '' ? 'h-10' : 'text-amber-300/90'
              }`}
            >
              {line}
            </p>
          ))}
          
          {slide.reference && (
            <p className="text-2xl text-amber-400/70 font-sans uppercase tracking-widest text-center mt-16">
              — {slide.reference}
            </p>
          )}
        </div>
      </div>

      {/* Inline animation keyframes */}
      <style>{`
        .creation-crawl-animate {
          animation: creationCrawl 35s linear forwards;
        }
        @keyframes creationCrawl {
          0% { 
            bottom: -80%;
          }
          100% { 
            bottom: 120%;
          }
        }
      `}</style>
    </div>
  );
};

export default CreationCrawlSlide;
