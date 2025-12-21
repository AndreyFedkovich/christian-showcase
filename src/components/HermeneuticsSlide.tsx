import { HermeneuticsSlide as HermeneuticsSlideType, PowerSourceType } from "@/data/epistles-structure";
import iconPromise from "@/assets/icon-promise.png";
import iconExample from "@/assets/icon-example.png";
import iconGlory from "@/assets/icon-glory.png";
import iconStatus from "@/assets/icon-status.png";

interface HermeneuticsSlideProps {
  slide: HermeneuticsSlideType;
  direction: 'next' | 'prev';
}

const powerSourceConfig: Record<PowerSourceType | 'default', {
  gradient: string;
  badge: string;
  title: string;
  text: string;
  bullet: string;
  border: string;
  progressBar: string;
  icon: string | null;
  label: string;
  panelGradient: string;
}> = {
  promise: {
    gradient: 'from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900',
    badge: 'bg-blue-600',
    title: 'text-blue-900 dark:text-blue-100',
    text: 'text-blue-800 dark:text-blue-200',
    bullet: 'bg-blue-600',
    border: 'border-blue-400',
    progressBar: 'from-blue-500 to-blue-600',
    icon: iconPromise,
    label: 'Обещания',
    panelGradient: 'from-blue-50/80 to-blue-100/80 dark:from-blue-950/80 dark:to-blue-900/80',
  },
  example: {
    gradient: 'from-violet-50 to-violet-100 dark:from-violet-950 dark:to-violet-900',
    badge: 'bg-violet-600',
    title: 'text-violet-900 dark:text-violet-100',
    text: 'text-violet-800 dark:text-violet-200',
    bullet: 'bg-violet-600',
    border: 'border-violet-400',
    progressBar: 'from-violet-500 to-violet-600',
    icon: iconExample,
    label: 'Пример',
    panelGradient: 'from-violet-50/80 to-violet-100/80 dark:from-violet-950/80 dark:to-violet-900/80',
  },
  glory: {
    gradient: 'from-yellow-50 to-yellow-100 dark:from-yellow-950 dark:to-yellow-900',
    badge: 'bg-yellow-600',
    title: 'text-yellow-900 dark:text-yellow-100',
    text: 'text-yellow-800 dark:text-yellow-200',
    bullet: 'bg-yellow-500',
    border: 'border-yellow-400',
    progressBar: 'from-yellow-400 to-yellow-500',
    icon: iconGlory,
    label: 'Слава Божия',
    panelGradient: 'from-yellow-50/80 to-yellow-100/80 dark:from-yellow-950/80 dark:to-yellow-900/80',
  },
  status: {
    gradient: 'from-emerald-50 to-emerald-100 dark:from-emerald-950 dark:to-emerald-900',
    badge: 'bg-emerald-600',
    title: 'text-emerald-900 dark:text-emerald-100',
    text: 'text-emerald-800 dark:text-emerald-200',
    bullet: 'bg-emerald-600',
    border: 'border-emerald-400',
    progressBar: 'from-emerald-500 to-emerald-600',
    icon: iconStatus,
    label: 'Статус во Христе',
    panelGradient: 'from-emerald-50/80 to-emerald-100/80 dark:from-emerald-950/80 dark:to-emerald-900/80',
  },
  default: {
    gradient: 'from-emerald-50 to-emerald-100 dark:from-emerald-950 dark:to-emerald-900',
    badge: 'bg-emerald-600',
    title: 'text-emerald-900 dark:text-emerald-100',
    text: 'text-emerald-800 dark:text-emerald-200',
    bullet: 'bg-emerald-600',
    border: 'border-emerald-400',
    progressBar: 'from-emerald-500 to-emerald-600',
    icon: null,
    label: '',
    panelGradient: 'from-emerald-50/80 to-emerald-100/80 dark:from-emerald-950/80 dark:to-emerald-900/80',
  }
};

const doSectionConfig: Record<PowerSourceType | 'default', {
  gradient: string;
  badge: string;
  title: string;
  text: string;
  bullet: string;
  progressBar: string;
}> = {
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
  // Get primary type from first powerSource or default
  const primaryType: PowerSourceType | 'default' = slide.powerSources?.[0]?.type || 'default';
  const knowConfig = powerSourceConfig[primaryType];
  const doConfig = doSectionConfig[primaryType];

  return (
    <div 
      className={`w-full h-screen gradient-warm flex items-center justify-center p-8 animate-in fade-in duration-500 ${
        direction === 'next' ? 'slide-in-from-right-12' : 'slide-in-from-left-12'
      }`}
    >
      <div className="max-w-7xl w-full space-y-6">
        {/* Book Name */}
        <div className="text-center space-y-2">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground tracking-tight">
            {slide.bookName}
          </h1>
          <p className="text-lg text-muted-foreground font-sans">
            Структура послания
          </p>
        </div>

        {/* Visual Progress Bar */}
        <div className="w-full h-14 rounded-full overflow-hidden flex shadow-premium">
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

        {/* Power Sources Panels */}
        {slide.powerSources && slide.powerSources.length > 0 && (
          <div 
            className="grid gap-4"
            style={{ 
              gridTemplateRows: `repeat(${Math.min(slide.powerSources.length, 4)}, 1fr)`
            }}
          >
            {slide.powerSources.map((source, idx) => {
              const config = powerSourceConfig[source.type];
              
              return (
                <div 
                  key={idx} 
                  className={`p-5 rounded-2xl border-l-4 ${config.border} bg-gradient-to-br ${config.panelGradient} backdrop-blur-sm shadow-card`}
                >
                  <div className="flex items-center gap-3 mb-3">
                    {config.icon && (
                      <img src={config.icon} alt="" className="w-12 h-12 object-contain" />
                    )}
                    <span className={`font-bold text-lg ${config.title}`}>
                      {config.label}
                    </span>
                  </div>
                  <p className={`text-2xl italic ${config.text} font-serif leading-relaxed`}>
                    "{source.keyVerse.text}"
                  </p>
                  <p className={`text-xl ${config.title} font-sans mt-2 font-semibold`}>
                    — {source.keyVerse.reference}
                  </p>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default HermeneuticsSlide;
