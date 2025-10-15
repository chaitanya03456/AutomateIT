import React, { useState, useCallback, useRef, useLayoutEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import WorkCarousel from './components/WorkCarousel';
import AIPlatform from './components/AIPlatform';
import Footer from './components/Footer';
import PharmaPage from './components/PharmaPage';
import ComingSoonPage from './components/ComingSoonPage';
import { useScrollPosition } from './hooks/useScrollPosition';
import { cn } from './lib/utils';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [scrollTarget, setScrollTarget] = useState<string | null>(null);
  const [isMouseInside, setIsMouseInside] = useState(true);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const mousePos = useRef({ x: 0, y: 0 });
  const glowPos = useRef({ x: 0, y: 0 });
  const animationFrameId = useRef<number | null>(null);
  const scrollPosition = useScrollPosition();

  React.useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      mousePos.current = { x: event.clientX, y: event.clientY };
    };

    const handleMouseDown = () => setIsMouseDown(true);
    const handleMouseUp = () => setIsMouseDown(false);
    const handleMouseLeave = () => setIsMouseInside(false);
    const handleMouseEnter = () => {
      // Snap position to cursor on re-entry to avoid the glow flying in from its last position.
      glowPos.current = { x: mousePos.current.x, y: mousePos.current.y };
      setIsMouseInside(true);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.body.addEventListener('mouseleave', handleMouseLeave);
    document.body.addEventListener('mouseenter', handleMouseEnter);

    const updateGlow = () => {
      const { x: targetX, y: targetY } = mousePos.current;
      const { x: currentX, y: currentY } = glowPos.current;

      // The smoothing factor determines how quickly the glow follows the cursor.
      // A lower value results in more lag.
      const smoothing = 0.15;
      const newX = currentX + (targetX - currentX) * smoothing;
      const newY = currentY + (targetY - currentY) * smoothing;

      glowPos.current = { x: newX, y: newY };

      document.documentElement.style.setProperty('--mouse-x', `${newX}px`);
      document.documentElement.style.setProperty('--mouse-y', `${newY}px`);

      animationFrameId.current = requestAnimationFrame(updateGlow);
    };

    animationFrameId.current = requestAnimationFrame(updateGlow);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
      document.body.removeEventListener('mouseenter', handleMouseEnter);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, []);

  const navigateTo = useCallback((page: string, anchor?: string) => {
    if (currentPage === page) {
      // If we are already on the correct page, just scroll.
      if (anchor) {
        const element = document.getElementById(anchor);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          return;
        }
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // If we are changing the page, set the new page and the anchor to scroll to.
      setCurrentPage(page);
      setScrollTarget(anchor || 'top');
    }
  }, [currentPage]);
  
  useLayoutEffect(() => {
    if (scrollTarget) {
      if (scrollTarget === 'top') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        const element = document.getElementById(scrollTarget);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
      setScrollTarget(null); // Reset after scrolling
    }
  }, [currentPage, scrollTarget]);

  const navigateToPharma = useCallback(() => {
    navigateTo('pharma');
  }, [navigateTo]);

  const navigateToComingSoon = useCallback(() => {
    navigateTo('coming-soon');
  }, [navigateTo]);

  const handleBack = useCallback(() => {
    navigateTo('home');
  }, [navigateTo]);

  const scrollToTop = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, []);

  const glowSize = isMouseDown ? 450 : 600;
  const isScrollButtonVisible = scrollPosition > 300;

  return (
    <div className="text-neutral-200 antialiased selection:bg-white/20">
      <div
        className="pointer-events-none fixed inset-0 z-30"
        style={{
          opacity: isMouseInside ? 1 : 0,
          background: `radial-gradient(${glowSize}px at var(--mouse-x) var(--mouse-y), rgba(var(--mouse-glow-rgb), 0.08), transparent 80%)`,
          transition: 'opacity 0.3s ease-in-out, background 0.2s ease-out',
        }}
      />
      <Header onNavigate={navigateTo} />
      <main>
        {currentPage === 'home' && (
          <>
            <Hero />
            <Features />
            <WorkCarousel onNavigate={navigateToPharma} />
            <AIPlatform />
          </>
        )}
        {currentPage === 'pharma' && (
          <PharmaPage onBack={handleBack} />
        )}
        {currentPage === 'coming-soon' && (
          <ComingSoonPage onBack={handleBack} />
        )}
      </main>
      <Footer onNavigate={navigateToComingSoon} />

      <button
        onClick={scrollToTop}
        className={cn(
          'fixed bottom-8 right-8 z-50 p-3 rounded-full bg-neutral-800/80 border border-neutral-700 text-neutral-300 backdrop-blur-lg shadow-lg transition-all duration-300 ease-in-out hover:bg-neutral-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-blue-500 transform hover:scale-110',
          isScrollButtonVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
        )}
        aria-label="Scroll to top"
      >
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
        </svg>
      </button>
    </div>
  );
};

export default App;