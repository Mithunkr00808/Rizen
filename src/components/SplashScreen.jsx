import React, { useState, useEffect } from 'react';
import { useProgress } from '@react-three/drei';

export default function SplashScreen() {
  const { progress, active } = useProgress();
  const [isVisible, setIsVisible] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    let fadeTimer;
    let removeTimer;

    // When progress hits 100%, or if nothing is actively loading after a short delay
    if (progress === 100 || !active) {
      fadeTimer = setTimeout(() => {
        setIsFadingOut(true);
        // Remove the DOM node entirely after the fade completes
        removeTimer = setTimeout(() => {
          setIsVisible(false);
        }, 800);
      }, 500); // 500ms grace period in case loading just hasn't started yet
    }

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, [progress, active]);

  if (!isVisible) return null;

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: '#050508',
      zIndex: 99999, // On top of absolutely everything
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      transition: 'opacity 0.8s ease-out, visibility 0.8s ease-out',
      opacity: isFadingOut ? 0 : 1,
      visibility: isFadingOut ? 'hidden' : 'visible',
      pointerEvents: 'all' // Block clicks while loading
    }}>
      <h1 style={{ 
        color: '#00ffcc', 
        fontFamily: 'monospace', 
        letterSpacing: '4px', 
        textShadow: '0 0 20px rgba(0,255,204,0.5)',
        textTransform: 'uppercase',
        fontSize: '1.5rem'
      }}>
        Initializing Grid
      </h1>
      
      {/* Loading Bar Container */}
      <div style={{ 
        width: '250px', 
        height: '3px', 
        background: 'rgba(255,255,255,0.1)', 
        marginTop: '30px', 
        position: 'relative',
        borderRadius: '3px',
        overflow: 'hidden'
      }}>
        {/* Loading Bar Progress */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          height: '100%',
          background: 'linear-gradient(90deg, #00ffcc, #7a22ff)',
          width: `${progress}%`,
          transition: 'width 0.2s ease-out',
          boxShadow: '0 0 15px rgba(0,255,204,0.8)'
        }} />
      </div>
      
      <p style={{ 
        color: 'rgba(255,255,255,0.6)', 
        marginTop: '15px', 
        fontFamily: 'monospace',
        letterSpacing: '1px'
      }}>
        {progress.toFixed(0)}%
      </p>
    </div>
  );
}
