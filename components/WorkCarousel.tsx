import React, { useRef, useState, useEffect } from 'react';
import { cn } from '../lib/utils';
import { useOnScreen } from '../hooks/useOnScreen';
import Button from './ui/Button';

const Cube: React.FC<{ style?: React.CSSProperties }> = ({ style }) => (
    <div className="cube" style={style}>
        <div className="cube__face cube__face--front"></div>
        <div className="cube__face cube__face--back"></div>
        <div className="cube__face cube__face--right"></div>
        <div className="cube__face cube__face--left"></div>
        <div className="cube__face cube__face--top"></div>
        <div className="cube__face cube__face--bottom"></div>
    </div>
);

const Sparkle: React.FC<{ style: React.CSSProperties }> = ({ style }) => <div className="sparkle" style={style}></div>;

const BlockchainGraphic: React.FC = () => {
  const sparkles = Array.from({ length: 15 }).map((_, i) => ({
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    animationDelay: `${Math.random() * 12}s`,
  }));

  return (
    <div className="relative w-full h-full flex items-center justify-center min-h-[400px]">
      {sparkles.map((style, i) => <Sparkle key={i} style={style} />)}
      <div className="scene">
        <div className="cube-cluster">
          <Cube style={{ top: '0', left: '0' }} />
          <Cube style={{ top: '0', left: '100px', animationDelay: '-2s' }} />
          <Cube style={{ top: '100px', left: '0', animationDelay: '-4s' }} />
          <Cube style={{ top: '100px', left: '100px', animationDelay: '-6s' }} />
          <Cube style={{ top: '50px', left: '-100px', animationDelay: '-8s' }} />
          <Cube style={{ top: '50px', left: '200px', animationDelay: '-10s' }} />
        </div>
      </div>
    </div>
  );
};

const StarfieldBackground: React.FC = () => (
    <div className="starfield" aria-hidden="true">
        <div className="stars"></div>
        <div className="stars2"></div>
        <div className="stars3"></div>
    </div>
);


interface WorkCarouselProps {
    onNavigate: () => void;
}

const WorkCarousel: React.FC<WorkCarouselProps> = ({ onNavigate }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const isVisible = useOnScreen(sectionRef);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [normMousePos, setNormMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (sectionRef.current) {
          const rect = sectionRef.current.getBoundingClientRect();
          const x = event.clientX - rect.left;
          const y = event.clientY - rect.top;
          setMousePosition({ x, y });
          setNormMousePos({ x: (x / rect.width - 0.5) * 2, y: (y / rect.height - 0.5) * 2 });
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const sectionStyle = {
    '--mouse-x': `${mousePosition.x}px`,
    '--mouse-y': `${mousePosition.y}px`,
  } as React.CSSProperties;

  const graphicStyle = {
    transform: `rotateY(${normMousePos.x * 5}deg) rotateX(${-normMousePos.y * 5}deg)`,
    transition: 'transform 0.3s ease-out',
  }

  return (
    <section 
        id="our-work" 
        ref={sectionRef} 
        className="relative py-24 sm:py-32 border-t border-neutral-900 overflow-hidden"
        style={sectionStyle}
    >
      <StarfieldBackground />
      <div className="relative z-10 container mx-auto px-6 max-w-7xl">
        <div className="grid lg:grid-cols-5 gap-24 items-center">
            <div className={cn("text-left fade-in-up lg:col-span-3", isVisible && "is-visible")}>
                <div className="max-w-2xl">
                    <h2 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">Our Work</h2>
                    <p className="mt-6 text-lg leading-8 text-neutral-400">
                        We are dedicated to solving complex industry challenges through applied AI. Explore our focus areas to see how we're driving transformation and creating value for our partners.
                    </p>
                </div>
                <div className="mt-12 max-w-2xl" style={{ transitionDelay: '0.3s' }}>
                    <div
                        className="liquid-glass interactive-glow rounded-2xl p-8 md:p-12 flex flex-col items-start transition-all duration-300 hover:shadow-xl hover:shadow-blue-900/30"
                    >
                        <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">Pharmaceutical Industry</h3>
                        <p className="text-lg text-neutral-300 mb-8">
                            Developing AI-driven solutions to streamline regulatory compliance, optimize supply chains, and enhance operational efficiency for pharma SMEs.
                        </p>
                        <Button variant="secondary" onClick={onNavigate}>Learn More &rarr;</Button>
                    </div>
                </div>
            </div>

            <div className={cn("hidden lg:flex justify-center items-center fade-in-up lg:col-span-2", isVisible && "is-visible")} style={{ transitionDelay: '0.5s', transform: 'translateY(-5rem)' }}>
                <div style={graphicStyle}>
                    <BlockchainGraphic />
                </div>
            </div>
        </div>
      </div>
    </section>
  );
};

export default React.memo(WorkCarousel);