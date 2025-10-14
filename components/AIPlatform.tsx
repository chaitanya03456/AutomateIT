import React, { useRef, useMemo } from 'react';
import { cn } from '../lib/utils';
import { useScrollProgressInSection } from '../hooks/useScrollProgressInSection';
import { DataLayerIcon, ModelingLayerIcon, ApplicationLayerIcon, SecurityIcon } from './icons/IconComponents';

interface AIPlatformFeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  align?: 'left' | 'right';
}

const AIPlatformFeature: React.FC<AIPlatformFeatureProps> = ({ icon, title, description, align = 'left' }) => {
  return (
    <div className={cn(
      "p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-lg ai-platform-feature flex flex-col items-start text-left h-full",
      align === 'right' && 'lg:items-end lg:text-right'
    )}>
      <div className="flex items-center justify-center h-14 w-14 rounded-lg bg-white/10 border border-white/20 mb-5">
        {icon}
      </div>
      <dt className="font-semibold text-white text-lg">
        {title}
      </dt>
      <dd className="mt-2 text-base leading-7 text-neutral-400">{description}</dd>
    </div>
  );
};

const rectsConfig = [
  { w: 280, h: 480, perimeter: (280 + 480) * 2 }, // Outer
  { w: 230, h: 410, perimeter: (230 + 410) * 2 }, // Middle
  { w: 180, h: 340, perimeter: (180 + 340) * 2 }, // Inner
];

const getRoundedRectPath = (x: number, y: number, w: number, h: number, r: number) => {
  return `M${x + r},${y} H${x + w - r} A${r},${r} 0 0 1 ${x + w},${y + r} V${y + h - r} A${r},${r} 0 0 1 ${x + w - r},${y + h} H${x + r} A${r},${r} 0 0 1 ${x},${y + h - r} V${y + r} A${r},${r} 0 0 1 ${x + r},${y} Z`;
};


const AnimatedPlatformGraphic: React.FC<{ scrollProgress: number, showCoreText: boolean }> = ({ scrollProgress, showCoreText }) => {
  const pathRefs = useRef<(SVGPathElement | null)[]>([]);
  const [glowPositions, setGlowPositions] = React.useState(rectsConfig.map(() => ({ x: -10, y: -10 })));

  React.useEffect(() => {
    const newPositions = rectsConfig.map((config, i) => {
      const path = pathRefs.current[i];
      if (!path) return { x: -10, y: -10 };

      const totalLength = config.perimeter;

      const startProgress = i / rectsConfig.length;
      const endProgress = (i + 1) / rectsConfig.length;

      const rectProgress = (scrollProgress - startProgress) / (endProgress - startProgress);
      const clampedProgress = Math.max(0, Math.min(1, rectProgress));

      if (clampedProgress <= 0.001 || clampedProgress >= 0.999) {
        return { x: -10, y: -10 };
      }

      const point = path.getPointAtLength(clampedProgress * totalLength);
      return { x: point.x, y: point.y };
    });
    setGlowPositions(newPositions);
  }, [scrollProgress]);

  const getStrokeOffset = (index: number, totalProgress: number) => {
    const perimeter = rectsConfig[index].perimeter;
    const startProgress = index / rectsConfig.length;
    const endProgress = (index + 1) / rectsConfig.length;

    const rectProgress = (totalProgress - startProgress) / (endProgress - startProgress);
    const clampedProgress = Math.max(0, Math.min(1, rectProgress));

    return perimeter * (1 - clampedProgress);
  };
  
  const isDrawn = scrollProgress >= 1;

  return (
    <div className="relative flex items-center justify-center w-full h-full min-h-[280px] md:min-h-[400px] lg:min-h-[500px] animated-platform-graphic">
       <svg
        viewBox="0 0 300 500"
        className="absolute w-full h-full"
        style={{
          width: 'min(80%, 300px)',
          height: 'min(90%, 500px)',
          overflow: 'visible',
          transition: 'filter 0.5s ease-in-out',
          filter: isDrawn ? 'drop-shadow(0 0 15px rgba(var(--accent-text-rgb), 0.7))' : 'drop-shadow(0 0 5px rgba(var(--accent-text-rgb), 0.3))'
        }}
      >
        <defs>
          <filter id="line-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
          </filter>
        </defs>
        {rectsConfig.map((rect, i) => (
          <path
            key={i}
            ref={el => { pathRefs.current[i] = el; }}
            d={getRoundedRectPath((300 - rect.w) / 2, (500 - rect.h) / 2, rect.w, rect.h, 8)}
            fill="none"
            stroke="rgb(var(--card-border-rgb))"
            strokeWidth="1"
            strokeDasharray={rect.perimeter}
            strokeDashoffset={getStrokeOffset(i, scrollProgress)}
          />
        ))}
        {glowPositions.map((pos, i) => (
            <circle
              key={`glow-${i}`}
              cx={pos.x}
              cy={pos.y}
              r="4"
              fill="rgba(var(--accent-text-rgb), 0.9)"
              filter="url(#line-glow)"
              style={{ transition: 'opacity 0.2s', opacity: pos.x > -10 ? 1 : 0 }}
            />
        ))}
      </svg>
      <div
        className={cn("absolute flex flex-col items-center text-center z-10 transition-opacity duration-500", showCoreText ? 'opacity-100' : 'opacity-0')}
        style={{ transform: 'translateY(-1rem)' }}
      >
        <span className="text-5xl font-semibold text-neutral-400">AI</span>
        <span className="text-sm font-semibold text-neutral-600 tracking-[0.3em] mt-2">CORE</span>
      </div>
    </div>
  );
};


const AIPlatform: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const progress = useScrollProgressInSection(sectionRef);

  const animationStartProgress = 0;
  const animationEndProgress = 0.7;

  const drawingProgress = Math.max(0, Math.min(1, 
    (progress - animationStartProgress) / (animationEndProgress - animationStartProgress)
  ));
  
  const showCoreText = drawingProgress >= 1;

  const features = useMemo(() => ({
    left: [
      { icon: <DataLayerIcon />, title: 'Data Integration', description: 'Connect and unify data from any source, in any format, at any scale.' },
      { icon: <ModelingLayerIcon />, title: 'Semantic Modeling', description: 'Create a dynamic, digital twin of your organization with our powerful ontology.' },
    ],
    right: [
      { icon: <ApplicationLayerIcon />, title: 'Application Layer', description: 'Build custom applications and workflows on top of your data foundation.' },
      { icon: <SecurityIcon />, title: 'Secure by Design', description: 'Purpose-built for sensitive data with granular security at every layer.' }
    ]
  }), []);

  const allFeatures = useMemo(() => [...features.left, ...features.right], [features]);

  return (
    <section 
      id="ai-platform" 
      ref={sectionRef} 
      className="bg-black lg:relative lg:h-[300vh]"
    >
      {/* Desktop scroll animation container */}
      <div className="hidden lg:flex sticky top-0 h-screen w-full items-center overflow-hidden">
        <div className="container mx-auto px-6 lg:px-12 h-full flex items-center justify-center">
            <div className={cn("grid grid-cols-3 gap-y-16 lg:gap-x-4 items-center w-full ai-platform-features-wrapper", showCoreText && "is-revealed")}>
                <div className="space-y-16 flex flex-col justify-around h-full left-features">
                    {features.left.map((feature) => (
                        <AIPlatformFeature key={feature.title} {...feature} align="right" />
                    ))}
                </div>
                <div className={cn("order-first lg:order-none ai-platform-graphic-wrapper", showCoreText && "is-drawn")}>
                    <AnimatedPlatformGraphic scrollProgress={drawingProgress} showCoreText={showCoreText} />
                </div>
                <div className="space-y-16 flex flex-col justify-around h-full right-features">
                    {features.right.map((feature) => (
                        <AIPlatformFeature key={feature.title} {...feature} />
                    ))}
                </div>
            </div>
        </div>
      </div>

      {/* Mobile static layout */}
      <div className="lg:hidden py-24 sm:py-32">
        <div className="container mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto">
                <h2 className="text-4xl font-bold tracking-tight sm:text-5xl" style={{ color: 'rgb(var(--main-text-rgb))' }}>
                Our Unified <span style={{ color: 'rgb(var(--accent-text-rgb))' }}>AI Platform</span>
                </h2>
                <p className="mt-6 text-lg leading-8" style={{ color: 'rgb(var(--muted-text-rgb))' }}>
                A single, integrated environment to accelerate your entire AI journey, from data integration to operational applications.
                </p>
            </div>
            <div className="mt-16 flex justify-center">
                <div className={cn("ai-platform-graphic-wrapper is-drawn")}>
                    {/* Pass static props to show final state */}
                    <AnimatedPlatformGraphic scrollProgress={1} showCoreText={true} />
                </div>
            </div>
            <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
                {allFeatures.map((feature) => (
                    <AIPlatformFeature key={feature.title} {...feature} />
                ))}
            </div>
        </div>
      </div>
    </section>
  );
};

export default React.memo(AIPlatform);