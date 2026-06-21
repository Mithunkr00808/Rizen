import React, { useState, useEffect, useRef, useMemo } from 'react';
import EarthCanvas from './canvas/Earth';
import './Card.css';

export default function Card({ scrollY = 0 }) {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const cardRef = useRef(null);

  // Generate 50 random particles once for the dissolve effect
  const particles = useMemo(() => {
    return Array.from({ length: 50 }).map(() => ({
      startX: (Math.random() - 0.5) * 350, // Card width is approx 350px
      startY: (Math.random() - 0.5) * 450, // Card height is approx 450px
      targetX: (Math.random() - 0.5) * 800 + 100, // Drift slightly right
      targetY: (Math.random() - 1) * 600 - 100,   // Drift strongly UP (wind)
      size: Math.random() * 5 + 2,
      color: Math.random() > 0.2 ? 'rgba(255, 255, 255, 0.8)' : 'var(--color-primary)',
      rotationSpeed: (Math.random() - 0.5) * 720
    }));
  }, []);

  useEffect(() => {
    const stopSpline = (e) => {
      if (cardRef.current && cardRef.current.contains(e.target)) {
        e.stopPropagation();
        e.stopImmediatePropagation();
      }
    };

    window.addEventListener('mousemove', stopSpline, true);
    window.addEventListener('pointermove', stopSpline, true);

    return () => {
      window.removeEventListener('mousemove', stopSpline, true);
      window.removeEventListener('pointermove', stopSpline, true);
    };
  }, []);

  const handleMouseMove = (e) => {
    const card = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - card.left - card.width / 2;
    const y = e.clientY - card.top - card.height / 2;

    setRotation({
      x: -(y / card.height) * 30,
      y: (x / card.width) * 30
    });
  };

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 });
  };

  const parallaxY = scrollY * -0.3;

  // Math for the dissolve effect
  const dissolveProgress = Math.min(1, Math.max(0, scrollY / 300));
  const cardOpacity = Math.max(0, 1 - scrollY / 200); // Fades out faster than particles
  const cardBlur = scrollY * 0.05; // Gets blurry as it dissolves
  const cardScale = 1 + scrollY * 0.002; // Expands slightly
  const pointerEvents = cardOpacity > 0 ? 'auto' : 'none';

  const [isMobile, setIsMobile] = useState(typeof window !== 'undefined' && window.innerWidth <= 768);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const transformStyle = isMobile 
    ? `translate(-50%, calc(0% + ${parallaxY}px))` // Removed negative vertical translation so it sits below the sphere
    : `translateY(calc(-50% + ${parallaxY}px))`; // Left-aligned on desktop
    
  // Push it further down on mobile to make room for the 3D sphere above it!
  const topStyle = isMobile ? '70vh' : '50%';

  return (
    <div className="card-container" style={{
      top: topStyle,
      transform: transformStyle,
      pointerEvents: pointerEvents,
      transition: 'transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1)'
    }}>

      {/* The Main Card */}
      <div className="glass-card-wrapper" style={{
        opacity: cardOpacity,
        filter: scrollY > 0 ? `blur(${cardBlur}px)` : 'none',
        transform: `scale(${cardScale})`,
        transition: 'all 0.6s cubic-bezier(0.2, 0.8, 0.2, 1)'
      }}>
        <div
          ref={cardRef}
          className="glass-card"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{
            transform: `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
            transition: rotation.x === 0 && rotation.y === 0 ? 'transform 0.5s ease-out' : 'none'
          }}
        >
          {/* Dedicated background layer for the glass effect to prevent 3D flattening bugs */}
          <div className="glass" style={{ position: 'absolute', inset: 0, borderRadius: '24px', zIndex: 0, transform: 'translateZ(0)' }} />

          <div className="card-content" style={{ position: 'relative', zIndex: 1 }}>
            <div className="card-icon">✧</div>
            <h3>MITHUN KR</h3>
            <p style={{ fontWeight: 600, color: 'var(--color-primary)', marginBottom: '8px' }}>Software Engineer 2 @ Philips</p>
            <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.5)', marginBottom: '16px', letterSpacing: '0.5px', textTransform: 'uppercase' }}>Bengaluru, India • REVA University</p>
            <p>Specializing in Healthcare tech, including HL7, EDI, and PACS Integration.</p>
          </div>
        </div>
      </div>

      {/* The Earth Globe (placed to the right) */}
      <div className="hero-earth" style={{
        width: isMobile ? '100%' : '500px',
        height: isMobile ? '350px' : '500px',
        opacity: cardOpacity,
        filter: scrollY > 0 ? `blur(${cardBlur}px)` : 'none',
        transform: `scale(${cardScale})`,
        transition: 'all 0.6s cubic-bezier(0.2, 0.8, 0.2, 1)',
        pointerEvents: pointerEvents,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <EarthCanvas />
      </div>

      {/* The Particles */}
      {particles.map((p, i) => {
        // Particles fade in as the card fades out, then they fade out completely
        const pOpacity = Math.max(0, Math.min(1, scrollY / 50)) * Math.max(0, 1 - scrollY / 400);
        const currentX = p.startX + (p.targetX - p.startX) * dissolveProgress;
        const currentY = p.startY + (p.targetY - p.startY) * Math.pow(dissolveProgress, 1.5); // Accel upward
        const currentRot = p.rotationSpeed * dissolveProgress;

        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: `${p.size}px`,
              height: `${p.size}px`,
              background: p.color,
              borderRadius: i % 3 === 0 ? '50%' : '2px', // Mix of squares and circles
              opacity: pOpacity,
              transform: `translate(-50%, -50%) translate(${currentX}px, ${currentY}px) rotate(${currentRot}deg)`,
              pointerEvents: 'none',
              boxShadow: `0 0 ${p.size}px ${p.color}`,
              zIndex: 10,
              transition: 'all 0.6s cubic-bezier(0.2, 0.8, 0.2, 1)'
            }}
          />
        );
      })}

    </div>
  );
}
