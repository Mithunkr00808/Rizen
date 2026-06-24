import React, { useRef, useEffect } from 'react';

export default function ScrollSection({ scrollY, children, offsetMultiplier = 0.2 }) {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;
    
    const isMobile = window.innerWidth <= 768;

    // On mobile, skip the parallax entirely — elements just appear naturally
    if (isMobile) {
      // ONLY update the DOM if it hasn't been set yet to prevent style invalidation spam on every scroll tick!
      if (ref.current.style.opacity !== '1') {
        ref.current.style.opacity = 1;
        ref.current.style.transform = 'translateY(0px)';
      }
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

  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;

  return (
    <div 
      ref={ref} 
      style={{ 
        opacity: isMobile ? 1 : 0, 
        transform: isMobile ? 'translateY(0)' : 'translateY(100px)', 
        transition: 'opacity 0.1s ease-out',
        willChange: 'transform'
      }}
    >
      {children}
    </div>
  );
}
