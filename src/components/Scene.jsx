import React, { useEffect, useState } from 'react';

export default function Scene({ scrollY = 0, isGamingMode = false }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const vh = typeof window !== 'undefined' ? window.innerHeight : 800;
  const zoomThreshold = vh * 1.2; // The point where we start zooming out (right after Experience)

  let scale = 1;
  let opacity = 1;
  let yOffset = scrollY * 0.15;

  if (scrollY < zoomThreshold) {
    // Zoom IN slowly during the intro and Experience section
    scale = 1 + scrollY * 0.0005;
  } else {
    // Zoom OUT aggressively after the Experience section
    const maxScale = 1 + zoomThreshold * 0.0005;
    const scrollPast = scrollY - zoomThreshold;

    // Shrink down until it completely vanishes
    scale = Math.max(0, maxScale - scrollPast * 0.0015);

    // Fade out the transparency so it dissolves into the black background
    opacity = Math.max(0, 1 - scrollPast * 0.002);
  }

  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;

  // On mobile: Make it 30% smaller, start it higher up, and make it scroll UP and AWAY as the user scrolls down!
  // This prevents the bright sphere from overlapping and hiding the text of the Work cards.
  const mobileScale = scale * 0.7; 
  const mobileYOffset = -scrollY * 0.2; 

  const parallaxTransform = isMobile
    ? `translateX(-20%) translateY(calc(-20vh + ${mobileYOffset}px)) scale(${mobileScale})`
    : `translateX(-16%) translateY(${yOffset}px) scale(${scale})`;

  // 300deg = Hot Pink (Office), 180deg = Cyan (Gaming)
  const hueRotation = isGamingMode ? '180deg' : '300deg';

  // Intercept the wheel event before it reaches the Spline canvas.
  // 3D libraries often capture mouse wheel events (for zooming) and call e.preventDefault(),
  // which breaks page scrolling. By stopping propagation here, the browser scrolls normally!
  useEffect(() => {
    const allowScroll = (e) => {
      e.stopPropagation();
    };
    window.addEventListener('wheel', allowScroll, { capture: true, passive: true });
    return () => window.removeEventListener('wheel', allowScroll, { capture: true });
  }, []);

  // Smoothly blend background based on gaming mode!
  const bgOpacity = isGamingMode ? Math.min(1, scrollY / 500) : 0;

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100vh', zIndex: 0, background: 'transparent', overflow: 'hidden' }}>


      {/* Dark gaming background layer */}
      <div style={{
        position: 'absolute',
        top: 0, left: 0, right: 0, bottom: 0,
        background: `rgba(5, 5, 8, ${bgOpacity})`,
        zIndex: 1,
        pointerEvents: 'none',
        transition: 'background 0.5s ease'
      }} />



    </div>
  );
}
