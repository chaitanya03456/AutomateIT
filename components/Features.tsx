import React, { useRef, useEffect } from 'react';
import { cn } from '../lib/utils';
import { useOnScreen } from '../hooks/useOnScreen';
import { Phase1Icon, Phase2Icon, Phase3Icon } from './icons/IconComponents';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  items?: string[];
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description, items }) => (
  <div className="p-8 rounded-lg transition-all duration-300 h-full flex flex-col backdrop-blur-xl shadow-lg" style={{
    backgroundColor: 'rgba(var(--card-bg-rgb), var(--card-bg-alpha))',
    border: '1px solid rgb(var(--card-border-rgb))',
  }}>
    {icon}
    <h3 className="text-xl font-bold mb-4" style={{ color: 'rgb(var(--main-text-rgb))' }}>{title}</h3>
    <p className="text-base leading-7 mb-6 flex-grow" style={{ color: 'rgb(var(--muted-text-rgb))' }}>{description}</p>
    {items && items.length > 0 &&
      <ul className="space-y-3 text-sm">
        {items.map((item, index) => (
          <li key={index} className="flex items-start gap-x-3" style={{ color: 'rgb(var(--main-text-rgb))' }}>
            <span className="h-2 w-2 mt-1.5 shrink-0" style={{ backgroundColor: 'rgb(var(--accent-text-rgb))' }}></span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    }
  </div>
);

const Features: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isVisible = useOnScreen(sectionRef);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    let ticking = false;

    const updateColors = () => {
      const { top, height } = el.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      const sectionCenterY = top + height / 2;
      const distance = Math.abs(viewportHeight / 2 - sectionCenterY);
      
      let progress = Math.max(0, 1 - distance / viewportHeight);
      progress = progress * progress * (3 - 2 * progress); // Smootherstep easing function

      const interpolate = (start: number, end: number) => start + (end - start) * progress;
      
      const bgColor = Math.round(interpolate(13, 255));
      const textColor = Math.round(interpolate(229, 25));
      const mutedTextColor = Math.round(interpolate(163, 115));
      const cardBorderColor = Math.round(interpolate(38, 229));
      const cardBgAlpha = interpolate(0.5, 0);
      const accentColor = Math.round(interpolate(96, 50));
      const mouseGlowColor = Math.round(interpolate(255, 0));

      const root = document.documentElement;
      root.style.setProperty('--main-bg-rgb', `${bgColor}, ${bgColor}, ${bgColor}`);
      root.style.setProperty('--main-text-rgb', `${textColor}, ${textColor}, ${textColor}`);
      root.style.setProperty('--muted-text-rgb', `${mutedTextColor}, ${mutedTextColor}, ${mutedTextColor}`);
      root.style.setProperty('--accent-text-rgb', `${accentColor}, ${accentColor}, ${accentColor}`);
      root.style.setProperty('--card-bg-rgb', `${cardBorderColor}, ${cardBorderColor}, ${cardBorderColor}`);
      root.style.setProperty('--card-bg-alpha', `${cardBgAlpha}`);
      root.style.setProperty('--card-border-rgb', `${cardBorderColor}, ${cardBorderColor}, ${cardBorderColor}`);
      root.style.setProperty('--mouse-glow-rgb', `${mouseGlowColor}, ${mouseGlowColor}, ${mouseGlowColor}`);
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateColors);
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial call

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id="features" ref={sectionRef} className="py-32 sm:py-40">
      <div className="container mx-auto px-6">
        <div className={cn("text-center max-w-3xl mx-auto fade-in-up", isVisible && 'is-visible')}>
          <h2 className="text-4xl font-bold tracking-tight sm:text-5xl" style={{ color: 'rgb(var(--main-text-rgb))' }}>
            Our <span style={{ color: 'rgb(var(--accent-text-rgb))' }}>Process</span>
          </h2>
          <p className="mt-6 text-lg leading-8" style={{ color: 'rgb(var(--muted-text-rgb))' }}>
            Our consulting process generally comprises a three-phase period, during which we meticulously follow our proprietary strategic consulting framework. Additionally, we leverage our in-house consulting AI model throughout this process, enhancing efficiency and ensuring a data-driven approach. This three-phase period typically extends over two to three weeks, during which we engage thoroughly with our client through calls.
          </p>
        </div>

        <div className={cn("mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 stagger-children", isVisible && 'is-visible')}>
          <FeatureCard
            icon={<Phase1Icon />}
            title="Phase 1"
            description="In this phase our goal is to gain a comprehensive understanding of our client's business and operational dynamics. Our objective is to gain a comprehensive understanding of the client's current situation, including their digital maturity, readiness for artificial intelligence, existing pain points, and potential areas for optimization."
          />
          <FeatureCard
            icon={<Phase2Icon />}
            title="Phase 2"
            description="In this phase, we thoroughly examine the problems and pain points by gaining a comprehensive understanding of the underlying processes. Our goal is to validate whether these processes are suitable for integration with AI solutions. Based on these validations and data, we will design solutions specifically tailored to that particular process."
          />
           <FeatureCard
            icon={<Phase3Icon />}
            title="Phase 3"
            description="In the final phase, we will demonstrate to our clients the potential return on investment (ROI) that can be achieved through these solutions. Following this, we will proceed with the final implementation plan, ensuring support for change management and facilitating team adoption."
          />
        </div>
      </div>
    </section>
  );
};

export default React.memo(Features);