import { useState, useEffect, RefObject } from 'react';

export const useScrollProgressInSection = (ref: RefObject<HTMLElement>) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const handleScroll = () => {
      const { top, height } = el.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      // The total scrollable distance for the animation inside the sticky container.
      const scrollDistance = height - viewportHeight;

      if (scrollDistance <= 0) {
        // Container is smaller than viewport, handle edge case
        if (top <= 0) setProgress(1);
        else setProgress(0);
        return;
      }
      
      // `top` is the container's top relative to viewport. It will be 0 when sticky starts, then negative.
      // Progress is how much of `scrollDistance` we've scrolled.
      let currentProgress = -top / scrollDistance;

      // Clamp it
      currentProgress = Math.max(0, Math.min(1, currentProgress));
      
      if (!isNaN(currentProgress)) {
         setProgress(currentProgress);
      } else {
         setProgress(0);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Initial call
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [ref]);

  return progress;
};
