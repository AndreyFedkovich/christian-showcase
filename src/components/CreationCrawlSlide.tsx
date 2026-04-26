import { useEffect, useState } from "react";
import { CreationCrawlSlide as CreationCrawlSlideType } from "@/data/creation";

interface CreationCrawlSlideProps {
  slide: CreationCrawlSlideType;
  direction: 'next' | 'prev';
}

const CreationCrawlSlide = ({ slide, direction }: CreationCrawlSlideProps) => {
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    setAnimating(false);
    // Double rAF to ensure animation restarts on slide change
    const id = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setAnimating(true);
      });
    });
    return () => {
      cancelAnimationFrame(id);
    };
  }, [slide]);

  return (
    <div className="min-h-screen w-full bg-black relative overflow-hidden flex items-center justify-center">
      {/* Star field */}
      <div className="absolute inset-0">
        {Array.from({ length: 160 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              width: Math.random() * 2 + 0.5,
              height: Math.random() * 2 + 0.5,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.7 + 0.15,
            }}
          />
        ))}
      </div>

      {/* Perspective viewport — full screen, viewer sits at the bottom */}
      <div
        className="absolute inset-0"
        style={{
          perspective: '300px',
          perspectiveOrigin: '50% 100%',
          overflow: 'hidden',
        }}
      >
        {/* The crawling plane: tilted away from viewer.
            Animation translates the plane upward along its OWN axis,
            so text genuinely recedes into the distance. */}
        <div
          className={`crawl-plane ${animating ? 'crawl-plane-animate' : ''}`}
          style={{
            position: 'absolute',
            top: '100%',
            left: '50%',
            width: '90%',
            maxWidth: '1100px',
            transform: 'translateX(-50%) rotateX(25deg)',
            transformOrigin: '50% 0%',
            color: 'rgb(253 224 71 / 0.95)',
            fontFamily: 'Georgia, serif',
            textAlign: 'center',
            fontWeight: 700,
          }}
        >
          {slide.lines.map((line, index) => (
            <p
              key={index}
              className="leading-[1.4]"
              style={{
                fontSize: 'clamp(2.5rem, 5vw, 5rem)',
                margin: line === '' ? '2.5rem 0' : '0 0 1.2rem 0',
                minHeight: line === '' ? '1rem' : undefined,
                textShadow: '0 0 20px rgba(253, 224, 71, 0.25)',
              }}
            >
              {line}
            </p>
          ))}

          {slide.reference && (
            <p
              style={{
                fontSize: 'clamp(1.5rem, 2.5vw, 2.5rem)',
                color: 'rgb(251 191 36 / 0.8)',
                fontFamily: 'system-ui, sans-serif',
                fontWeight: 500,
                textTransform: 'uppercase',
                letterSpacing: '0.25em',
                marginTop: '5rem',
                marginBottom: '4rem',
              }}
            >
              — {slide.reference}
            </p>
          )}
        </div>

        {/* Top fade — simulates text dissolving into the distance */}
        <div
          className="absolute inset-x-0 top-0 z-10 pointer-events-none"
          style={{
            height: '55%',
            background:
              'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.95) 25%, rgba(0,0,0,0.7) 55%, rgba(0,0,0,0) 100%)',
          }}
        />
        {/* Bottom subtle fade so text emerges smoothly */}
        <div
          className="absolute inset-x-0 bottom-0 z-10 pointer-events-none"
          style={{
            height: '12%',
            background:
              'linear-gradient(to top, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0) 100%)',
          }}
        />
      </div>

      {/* Animation keyframes */}
      <style>{`
        .crawl-plane {
          will-change: transform;
        }
        .crawl-plane-animate {
          animation: creationCrawl 60s linear forwards;
        }
        @keyframes creationCrawl {
          0% {
            transform: translateX(-50%) rotateX(25deg) translateY(0);
          }
          100% {
            transform: translateX(-50%) rotateX(25deg) translateY(-260%);
          }
        }
      `}</style>
    </div>
  );
};

export default CreationCrawlSlide;
