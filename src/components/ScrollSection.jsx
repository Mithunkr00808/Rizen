import React, { useRef, useState, useEffect } from 'react';

export default function ScrollSection({ scrollY, children, offsetMultiplier = 0.2 }) {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;
    
    // Get the element's actual position relative to the viewport
    const rect = ref.current.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    
    // Calculate how many pixels the element has scrolled PAST the bottom of the viewport
    const visibleAmount = windowHeight - rect.top;
    
    // Only use parallax translation, let Framer Motion handle opacity fade-ins
    const opacity = 1;
    
    // Parallax slide up
    const translateY = Math.max(0, 100 - visibleAmount * offsetMultiplier);
    
    // Direct DOM manipulation to avoid state re-renders on scroll
    ref.current.style.opacity = opacity;
    ref.current.style.transform = `translateY(${translateY}px)`;
  }, [scrollY, offsetMultiplier]);

  return (
    <div ref={ref} style={{ opacity: 0, transform: 'translateY(100px)', transition: 'opacity 0.1s ease-out, transform 0.1s ease-out' }}>
      {children}
    </div>
  );
}
