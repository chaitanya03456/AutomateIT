import React from 'react';
import Button from './ui/Button';
import { useScrollPosition } from '../hooks/useScrollPosition';

const AnimatedGridBackground: React.FC = () => {
  const scrollPosition = useScrollPosition();
  const parallaxFactor = 0.5;
  // Updated the background to the new cityscape image
  const backgroundImageUrl = "/Images/herobg.jpg"; 

  return (
    <div className="absolute inset-0 z-0 overflow-hidden bg-black">
      {/* Background image layer with Ken Burns effect */}
      <div 
        className="absolute inset-0 bg-cover bg-center ken-burns-bg"
        style={{ backgroundImage: `url('${backgroundImageUrl}')` }}
      />
      {/* Semi-transparent overlay to ensure text contrast */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Original grid pattern as a top layer */}
      <div 
        className="absolute inset-0 bg-repeat opacity-20 will-change-transform"
        style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'40\' height=\'40\' viewBox=\'0 0 40 40\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23FFFFFF\' fill-opacity=\'0.2\'%3E%3Cpath d=\'M0 38.59l2.83-2.83 1.41 1.41L1.41 40H0v-1.41zM0 1.4l2.83 2.83 1.41-1.41L1.41 0H0v1.41zM38.59 40l-2.83-2.83 1.41-1.41L40 38.59V40h-1.41zM40 1.41l-2.83 2.83-1.41-1.41L38.59 0H40v1.41zM20 18.59l2.83-2.83 1.41 1.41L21.41 20l2.83 2.83-1.41 1.41L20 21.41l-2.83 2.83-1.41-1.41L18.59 20l-2.83-2.83 1.41-1.41L20 18.59z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
          backgroundSize: '40px 40px',
          transform: `translateY(${scrollPosition * parallaxFactor}px)`,
        }}
      ></div>
    </div>
  );
};

const Hero: React.FC = () => {
  const handleScrollClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    const targetId = event.currentTarget.getAttribute('href')?.substring(1);
    if (!targetId) return;

    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };
  
  return (
    <section id="home" className="relative h-screen flex items-center justify-center text-center overflow-hidden">
      <AnimatedGridBackground />
      <div className="relative z-10 container mx-auto px-6">
        <h1
          className="text-5xl md:text-7xl font-black tracking-tighter leading-tight mb-6"
          style={{ color: 'rgb(var(--muted-text-rgb))' }}
        >
          Unlock <span style={{ color: 'rgb(var(--main-text-rgb))' }}>Exponential</span><br /> <span style={{ color: 'rgb(var(--main-text-rgb))' }}>Efficiency</span> with AI
        </h1>
        <p className="text-lg md:text-xl text-neutral-400 max-w-3xl mx-auto mb-10">
          We are an AI Consulting Company aiming to help SMEs digitally transform in this AI era. We envision helping SMEs in AI adoption through strategic and transformative consulting and by building solutions that generate value. We focus on deeply embedding AI in day-to-day operations, which helps SMEs become more efficient and productive, giving them the opportunity for growth.
        </p>
        <div className="flex justify-center">
          <Button as="a" href="#features" variant="secondary" onClick={handleScrollClick}>
            View Our Process
          </Button>
        </div>
      </div>
    </section>
  );
};

export default React.memo(Hero);