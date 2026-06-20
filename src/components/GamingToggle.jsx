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

    // Start sliding later (when it reaches 70% from the bottom).
    // Finish sliding higher up the screen (10% from top) to make the slide much slower.
    const startY = windowHeight * 0.70;
    const endY = windowHeight * 0.10;
    const totalDistance = startY - endY;
    
    // Calculate 0.0 to 1.0 progress
    const currentProgress = Math.max(0, Math.min(1, (startY - rect.top) / totalDistance));

    // Automatically trigger the global mode shift when it crosses the center!
    if (currentProgress > 0.5 && !isGamingMode) {
      setIsGamingMode(true);
    } else if (currentProgress <= 0.5 && isGamingMode) {
      setIsGamingMode(false);
    }
  }, [scrollY, isGamingMode, setIsGamingMode]);

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
    if (!isGamingMode) {
      window.scrollBy({ top: 300, behavior: 'smooth' });
    } else {
      window.scrollBy({ top: -300, behavior: 'smooth' });
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
