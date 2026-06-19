import React, { useRef, useState, useEffect } from 'react';

export default function ScrollSection({ scrollY, children, offsetMultiplier = 0.2 }) {
  const ref = useRef(null);
  const [style, setStyle] = useState({ opacity: 0, transform: 'translateY(100px)' });

  useEffect(() => {
    if (!ref.current) return;
    
    // Get the element's actual position relative to the viewport
    const rect = ref.current.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    
    // Calculate how many pixels the element has scrolled PAST the bottom of the viewport
    const visibleAmount = windowHeight - rect.top;
    
    // Fade in over 400 pixels of scrolling
    const opacity = Math.min(1, Math.max(0, visibleAmount / 400));
    
    // Parallax slide up
    const translateY = Math.max(0, 100 - visibleAmount * offsetMultiplier);
    
    setStyle({
      opacity,
      transform: `translateY(${translateY}px)`
    });
  }, [scrollY, offsetMultiplier]);

  return (
    <div ref={ref} style={{ ...style, transition: 'opacity 0.1s ease-out, transform 0.1s ease-out' }}>
      {children}
    </div>
  );
}
