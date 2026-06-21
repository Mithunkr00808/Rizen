import React, { useEffect, useState } from 'react';
import Spline from '@splinetool/react-spline';

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

  // Use percentages instead of vw to avoid scrollbar width throwing off the mathematical center!
  // On Desktop: Shift canvas so sphere rests beautifully on the right side, but close to the center (-16%).
  // On Mobile: Keep canvas pulled heavily left to mathematically perfectly center the sphere (-25%).
  const parallaxTransform = isMobile
    ? `translateX(-25%) translateY(calc(-15vh + ${yOffset}px)) scale(${scale})`
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



      {/* Animated Wrapper for Spline */}
      <div style={{
        width: '100%',
        height: '100%',
        opacity: isLoaded ? opacity : 0,
        transition: 'opacity 2.5s ease-in-out',
        position: 'absolute',
        top: 0,
        left: 0
      }}>
        <Spline
          scene="https://prod.spline.design/lRjwJUmMoOAlnAXk/scene.splinecode"
          onLoad={() => {
            // Force a slight delay so the browser registers the opacity: 0 state first
            // allowing the CSS transition to fully trigger
            setTimeout(() => setIsLoaded(true), 100);
          }}
          style={{
            width: '150%',
            height: '100vh',
            transform: parallaxTransform,
            // Disable lethal GPU blending and filtering on mobile to fix stuttering
            mixBlendMode: isMobile ? 'normal' : 'screen',
            filter: isMobile ? 'none' : `sepia(1) hue-rotate(${hueRotation}) saturate(5) brightness(1.6)`,
            transition: 'transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1), filter 1s ease-in-out'
          }}
        />
      </div>
    </div>
  );
}
