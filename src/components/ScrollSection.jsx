import React, { useRef, useEffect } from 'react';

export default function ScrollSection({ scrollY, children, offsetMultiplier = 0.2 }) {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;
    
    const isMobile = window.innerWidth <= 768;

    // On mobile, skip the parallax entirely — elements just appear naturally
    if (isMobile) {
      ref.current.style.opacity = 1;
      ref.current.style.transform = 'translateY(0px)';
      return;
    }

    // Get the element's actual position relative to the viewport
    const rect = ref.current.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    
    // Calculate how many pixels the element has scrolled PAST the bottom of the viewport
    const visibleAmount = windowHeight - rect.top;
    
    // Parallax slide up
    const translateY = Math.max(0, 100 - visibleAmount * offsetMultiplier);
    
    // Direct DOM manipulation to avoid state re-renders on scroll
    ref.current.style.opacity = 1;
    ref.current.style.transform = `translateY(${translateY}px)`;
  }, [scrollY, offsetMultiplier]);

  return (
    <div ref={ref} style={{ opacity: 0, transform: 'translateY(100px)', transition: 'opacity 0.1s ease-out, transform 0.1s ease-out' }}>
      {children}
    </div>
  );
}
