import React, { useRef, useEffect, useState } from 'react';
import './Section.css';
import './LiquidGlass.css';

export default function GamingToggle({ isGamingMode, setIsGamingMode, scrollY }) {
  const ref = useRef(null);
  const [progress, setProgress] = useState(0); // Removing progress state to prevent React hook mismatch

  useEffect(() => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const isMobile = window.innerWidth <= 768;

    let currentProgress;

    if (isMobile) {
      // On mobile: just track visibility for potential animations, but don't auto-toggle
      const isVisible = rect.top < windowHeight && rect.bottom > 0;
      currentProgress = isVisible && rect.top < windowHeight * 0.65 ? 1 : 0;
    } else {
      // Desktop: calculate progress for animations if needed
      const startY = windowHeight * 0.70;
      const endY = windowHeight * 0.10;
      const totalDistance = startY - endY;
      currentProgress = Math.max(0, Math.min(1, (startY - rect.top) / totalDistance));
    }
    
    // We intentionally removed the automatic setIsGamingMode trigger here
    // because it was causing infinite loops and scroll jumping on mobile devices.
    // The mode is now exclusively controlled by clicking the toggle!
  }, [scrollY]);

  const [isMobile, setIsMobile] = useState(typeof window !== 'undefined' && window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Max X translation is 164px on desktop, 50% on mobile. Snap directly to 0 or that value.
  const sliderX = isGamingMode ? (isMobile ? '50%' : '164px') : '0px';

  // Blend colors dynamically based on state
  const sliderBg = isGamingMode 
    ? 'linear-gradient(135deg, rgba(0, 255, 204, 0.8), rgba(0, 136, 255, 0.8))'
    : 'linear-gradient(135deg, rgba(255, 42, 95, 0.8), rgba(122, 34, 255, 0.8))';

  const handleClick = () => {
    if (isMobile) {
      // On mobile, directly toggle the mode — the scroll-based detection can be unreliable
      setIsGamingMode(prev => !prev);
    } else {
      if (!isGamingMode) {
        window.scrollBy({ top: 300, behavior: 'smooth' });
      } else {
        window.scrollBy({ top: -300, behavior: 'smooth' });
      }
    }
  };

  return (
    <div ref={ref} style={{ textAlign: 'center', margin: '-4vh auto 0 auto', width: '100%', position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h2 className="text-gradient" style={{ fontSize: 'clamp(1.5rem, 5vw, 2.5rem)', marginBottom: '2rem' }}>Ready for player two?</h2>
      
      <div 
        onClick={handleClick}
        className="liquid-glass-toggle"
      >
        <div 
          className="toggle-slider" 
          style={{ 
            transform: `translateX(${sliderX})`,
            background: sliderBg,
            transition: 'background 0.5s ease, transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)'
          }} 
        />
        <div className="toggle-label" style={{ color: !isGamingMode ? '#fff' : 'rgba(255,255,255,0.6)' }}>WORK</div>
        <div className="toggle-label" style={{ color: isGamingMode ? '#fff' : 'rgba(255,255,255,0.6)' }}>GAMING</div>
      </div>
      
      <p style={{ color: 'rgba(255,255,255,0.5)', fontStyle: 'italic' }}>
        {isGamingMode ? "Welcome to the neon grid." : "Scroll down to unlock the gaming setup."}
      </p>
    </div>
  );
}
