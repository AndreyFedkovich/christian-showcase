import { HermeneuticsSlide as HermeneuticsSlideType } from "@/data/epistles-structure";

interface HermeneuticsSlideProps {
  slide: HermeneuticsSlideType;
  direction: 'next' | 'prev';
}

const HermeneuticsSlide = ({ slide, direction }: HermeneuticsSlideProps) => {
  return (
    <div 
      className={`w-full h-screen gradient-warm flex items-center justify-center p-8 animate-in fade-in duration-500 ${
        direction === 'next' ? 'slide-in-from-right-12' : 'slide-in-from-left-12'
      }`}
    >
      <div className="max-w-7xl w-full space-y-8">
        {/* Book Name */}
        <div className="text-center space-y-3">
          <h1 className="text-6xl md:text-7xl font-bold text-foreground tracking-tight">
            {slide.bookName}
          </h1>
          <p className="text-xl text-muted-foreground font-sans">
            Структура послания
          </p>
        </div>

        {/* Visual Progress Bar */}
        <div className="w-full h-16 rounded-full overflow-hidden flex shadow-premium">
          <div 
            className="bg-gradient-to-r from-emerald-500 to-emerald-600 flex items-center justify-center text-white font-bold text-lg transition-all"
            style={{ width: `${slide.knowSection.percentage}%` }}
          >
            {slide.knowSection.percentage}%
          </div>
          <div 
            className="bg-gradient-to-r from-amber-400 to-amber-500 flex items-center justify-center text-white font-bold text-lg transition-all"
            style={{ width: `${slide.doSection.percentage}%` }}
          >
            {slide.doSection.percentage}%
          </div>
        </div>

        {/* Two Sections */}
        <div className="grid md:grid-cols-2 gap-8 mt-12">
          {/* KNOW Section */}
          <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-950 dark:to-emerald-900 rounded-3xl p-8 shadow-card">
            <div className="space-y-4">
              <div className="inline-block px-4 py-2 bg-emerald-600 text-white rounded-full font-bold text-sm uppercase tracking-wider">
                Знать
              </div>
              <h2 className="text-3xl font-bold text-emerald-900 dark:text-emerald-100">
                {slide.knowSection.chapters}
              </h2>
              <ul className="space-y-3">
                {slide.knowSection.themes.map((theme, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-emerald-600 rounded-full mt-3 flex-shrink-0" />
                    <span className="text-2xl text-emerald-800 dark:text-emerald-200 font-sans">
                      {theme}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* DO Section */}
          <div className="bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-950 dark:to-amber-900 rounded-3xl p-8 shadow-card">
            <div className="space-y-4">
              <div className="inline-block px-4 py-2 bg-amber-600 text-white rounded-full font-bold text-sm uppercase tracking-wider">
                Делать
              </div>
              <h2 className="text-3xl font-bold text-amber-900 dark:text-amber-100">
                {slide.doSection.chapters}
              </h2>
              <ul className="space-y-3">
                {slide.doSection.themes.map((theme, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-amber-500 rounded-full mt-3 flex-shrink-0" />
                    <span className="text-2xl text-amber-800 dark:text-amber-200 font-sans">
                      {theme}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Key Verse (if exists) */}
        {slide.keyVerse && (
          <div className="mt-8 p-6 bg-secondary/50 rounded-2xl border-l-4 border-accent">
            <p className="text-2xl italic text-foreground font-serif leading-relaxed">
              "{slide.keyVerse.text}"
            </p>
            <p className="text-xl text-muted-foreground font-sans mt-3 font-semibold">
              — {slide.keyVerse.reference}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default HermeneuticsSlide;
