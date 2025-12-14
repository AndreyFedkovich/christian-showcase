import { HermeneuticsSlide as HermeneuticsSlideType } from "@/data/epistles-structure";
import iconPromise from "@/assets/icon-promise.png";
import iconExample from "@/assets/icon-example.png";
import iconGlory from "@/assets/icon-glory.png";

interface HermeneuticsSlideProps {
  slide: HermeneuticsSlideType;
  direction: 'next' | 'prev';
}

const powerSourceConfig = {
  promise: {
    gradient: 'from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900',
    badge: 'bg-blue-600',
    title: 'text-blue-900 dark:text-blue-100',
    text: 'text-blue-800 dark:text-blue-200',
    bullet: 'bg-blue-600',
    border: 'border-blue-300 dark:border-blue-700',
    progressBar: 'from-blue-500 to-blue-600',
    icon: iconPromise,
  },
  example: {
    gradient: 'from-violet-50 to-violet-100 dark:from-violet-950 dark:to-violet-900',
    badge: 'bg-violet-600',
    title: 'text-violet-900 dark:text-violet-100',
    text: 'text-violet-800 dark:text-violet-200',
    bullet: 'bg-violet-600',
    border: 'border-violet-300 dark:border-violet-700',
    progressBar: 'from-violet-500 to-violet-600',
    icon: iconExample,
  },
  glory: {
    gradient: 'from-yellow-50 to-yellow-100 dark:from-yellow-950 dark:to-yellow-900',
    badge: 'bg-yellow-600',
    title: 'text-yellow-900 dark:text-yellow-100',
    text: 'text-yellow-800 dark:text-yellow-200',
    bullet: 'bg-yellow-500',
    border: 'border-yellow-300 dark:border-yellow-700',
    progressBar: 'from-yellow-400 to-yellow-500',
    icon: iconGlory,
  },
  status: {
    gradient: 'from-emerald-50 to-emerald-100 dark:from-emerald-950 dark:to-emerald-900',
    badge: 'bg-emerald-600',
    title: 'text-emerald-900 dark:text-emerald-100',
    text: 'text-emerald-800 dark:text-emerald-200',
    bullet: 'bg-emerald-600',
    border: 'border-emerald-300 dark:border-emerald-700',
    progressBar: 'from-emerald-500 to-emerald-600',
    icon: iconGlory,
  },
  default: {
    gradient: 'from-emerald-50 to-emerald-100 dark:from-emerald-950 dark:to-emerald-900',
    badge: 'bg-emerald-600',
    title: 'text-emerald-900 dark:text-emerald-100',
    text: 'text-emerald-800 dark:text-emerald-200',
    bullet: 'bg-emerald-600',
    border: 'border-emerald-300 dark:border-emerald-700',
    progressBar: 'from-emerald-500 to-emerald-600',
    icon: null as string | null,
  }
};

const doSectionConfig = {
  promise: {
    gradient: 'from-teal-50 to-teal-100 dark:from-teal-950 dark:to-teal-900',
    badge: 'bg-teal-600',
    title: 'text-teal-900 dark:text-teal-100',
    text: 'text-teal-800 dark:text-teal-200',
    bullet: 'bg-teal-500',
    progressBar: 'from-teal-400 to-teal-500',
  },
  example: {
    gradient: 'from-pink-50 to-pink-100 dark:from-pink-950 dark:to-pink-900',
    badge: 'bg-pink-600',
    title: 'text-pink-900 dark:text-pink-100',
    text: 'text-pink-800 dark:text-pink-200',
    bullet: 'bg-pink-500',
    progressBar: 'from-pink-400 to-pink-500',
  },
  glory: {
    gradient: 'from-orange-50 to-orange-100 dark:from-orange-950 dark:to-orange-900',
    badge: 'bg-orange-600',
    title: 'text-orange-900 dark:text-orange-100',
    text: 'text-orange-800 dark:text-orange-200',
    bullet: 'bg-orange-500',
    progressBar: 'from-orange-400 to-orange-500',
  },
  status: {
    gradient: 'from-amber-50 to-amber-100 dark:from-amber-950 dark:to-amber-900',
    badge: 'bg-amber-600',
    title: 'text-amber-900 dark:text-amber-100',
    text: 'text-amber-800 dark:text-amber-200',
    bullet: 'bg-amber-500',
    progressBar: 'from-amber-400 to-amber-500',
  },
  default: {
    gradient: 'from-amber-50 to-amber-100 dark:from-amber-950 dark:to-amber-900',
    badge: 'bg-amber-600',
    title: 'text-amber-900 dark:text-amber-100',
    text: 'text-amber-800 dark:text-amber-200',
    bullet: 'bg-amber-500',
    progressBar: 'from-amber-400 to-amber-500',
  }
};

const HermeneuticsSlide = ({ slide, direction }: HermeneuticsSlideProps) => {
  const powerSourceType = slide.knowSection.powerSourceType || 'default';
  const knowConfig = powerSourceConfig[powerSourceType];
  const doConfig = doSectionConfig[powerSourceType];

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
            className={`bg-gradient-to-r ${knowConfig.progressBar} flex items-center justify-center text-white font-bold text-lg transition-all`}
            style={{ width: `${slide.knowSection.percentage}%` }}
          >
            {slide.knowSection.percentage}%
          </div>
          <div 
            className={`bg-gradient-to-r ${doConfig.progressBar} flex items-center justify-center text-white font-bold text-lg transition-all`}
            style={{ width: `${slide.doSection.percentage}%` }}
          >
            {slide.doSection.percentage}%
          </div>
        </div>

        {/* Two Sections */}
        <div className="grid md:grid-cols-2 gap-8 mt-12">
          {/* KNOW Section */}
          <div className={`bg-gradient-to-br ${knowConfig.gradient} rounded-3xl p-8 shadow-card`}>
            <div className="space-y-4">
              <div className={`inline-block px-4 py-2 ${knowConfig.badge} text-white rounded-full font-bold text-sm uppercase tracking-wider`}>
                Знать
              </div>
              <h2 className={`text-3xl font-bold ${knowConfig.title}`}>
                {slide.knowSection.chapters}
              </h2>
              <ul className="space-y-3">
                {slide.knowSection.themes.map((theme, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className={`w-2 h-2 ${knowConfig.bullet} rounded-full mt-3 flex-shrink-0`} />
                    <span className={`text-2xl ${knowConfig.text} font-sans`}>
                      {theme}
                    </span>
                  </li>
                ))}
              </ul>

              {slide.knowSection.powerSource && (
                <div className={`pt-4 border-t ${knowConfig.border}`}>
                  <p className={`text-lg ${knowConfig.text} font-sans italic flex items-center gap-3`}>
                    {knowConfig.icon ? (
                      <img src={knowConfig.icon} alt="" className="w-16 h-16 object-contain" />
                    ) : (
                      <span>📖</span>
                    )}
                    {slide.knowSection.powerSource}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* DO Section */}
          <div className={`bg-gradient-to-br ${doConfig.gradient} rounded-3xl p-8 shadow-card`}>
            <div className="space-y-4">
              <div className={`inline-block px-4 py-2 ${doConfig.badge} text-white rounded-full font-bold text-sm uppercase tracking-wider`}>
                Делать
              </div>
              <h2 className={`text-3xl font-bold ${doConfig.title}`}>
                {slide.doSection.chapters}
              </h2>
              <ul className="space-y-3">
                {slide.doSection.themes.map((theme, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className={`w-2 h-2 ${doConfig.bullet} rounded-full mt-3 flex-shrink-0`} />
                    <span className={`text-2xl ${doConfig.text} font-sans`}>
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
