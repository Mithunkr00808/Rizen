import React, { useRef, useEffect, useState } from 'react';
import './Section.css';
import './LiquidGlass.css';

export default function GamingToggle({ isGamingMode, setIsGamingMode, scrollY }) {
  const ref = useRef(null);
  const [progress, setProgress] = useState(0); 
  const isAnimating = useRef(false); // Track manual taps to prevent race conditions!

  useEffect(() => {
    if (!ref.current || isAnimating.current) return;
    const rect = ref.current.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const isMobile = window.innerWidth <= 768;

    let currentProgress;

    if (isMobile) {
      // On mobile: trigger when the toggle is slightly above the middle of the screen
      const isVisible = rect.top < windowHeight && rect.bottom > 0;
      currentProgress = isVisible && rect.top < windowHeight * 0.65 ? 1 : 0;
    } else {
      // Desktop: start sliding when it reaches 70% from the bottom, done at 10% from top
      const startY = windowHeight * 0.70;
      const endY = windowHeight * 0.10;
      const totalDistance = startY - endY;
      currentProgress = Math.max(0, Math.min(1, (startY - rect.top) / totalDistance));
    }

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

  // On mobile, the slider needs to translate by its full width (100%) plus the 10px inner gap to reach the other side perfectly.
  const sliderX = isGamingMode ? (isMobile ? 'calc(100% + 10px)' : '164px') : '0px';

  // Blend colors dynamically based on state
  const sliderBg = isGamingMode 
    ? 'linear-gradient(135deg, rgba(0, 255, 204, 0.8), rgba(0, 136, 255, 0.8))'
    : 'linear-gradient(135deg, rgba(255, 42, 95, 0.8), rgba(122, 34, 255, 0.8))';

  const handleClick = () => {
    // Lock the auto-trigger so it doesn't instantly revert our state!
    isAnimating.current = true;
    
    // 1. Instantly flip the state to render the GamingSection
    setIsGamingMode(prev => !prev);
    
    // 2. Give the DOM a tiny fraction of a second to render the massive new section, 
    // then smoothly scroll down into it!
    setTimeout(() => {
      if (!isGamingMode) {
        window.scrollBy({ top: 300, behavior: 'smooth' });
      } else {
        window.scrollBy({ top: -300, behavior: 'smooth' });
      }
      
      // Unlock the auto-trigger after the smooth scroll finishes
      setTimeout(() => {
        isAnimating.current = false;
      }, 800);
    }, 50);
  };

  return (
    <div ref={ref} style={{ textAlign: 'center', margin: '-4vh auto 0 auto', width: '100%', position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', pointerEvents: 'auto' }}>
      <h2 className="text-gradient" style={{ fontSize: 'clamp(1.5rem, 5vw, 2.5rem)', marginBottom: '2rem' }}>Ready for player two?</h2>
      
      <div 
        onClick={handleClick}
        className="liquid-glass-toggle"
      >
        <div className={`toggle-slider ${isGamingMode ? 'gaming' : 'work'}`} />
        <div className="toggle-label" style={{ color: !isGamingMode ? '#fff' : 'rgba(255,255,255,0.6)' }}>WORK</div>
        <div className="toggle-label" style={{ color: isGamingMode ? '#fff' : 'rgba(255,255,255,0.6)' }}>GAMING</div>
      </div>
      
      <p style={{ color: 'rgba(255,255,255,0.5)', fontStyle: 'italic' }}>
        {isGamingMode ? "Welcome to the neon grid." : "Scroll down to unlock the gaming setup."}
      </p>
    </div>
  );
}
