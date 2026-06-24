import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Suspense } from 'react';
import Spline from '@splinetool/react-spline';
import './Card.css';

const Card = () => {
  const [isSplineLoaded, setIsSplineLoaded] = useState(false);
  const [shouldLoadSpline, setShouldLoadSpline] = useState(false);
  
  useEffect(() => {
    // Delay loading the heavy Spline scene until the initial page animation finishes
    const timer = setTimeout(() => setShouldLoadSpline(true), 1500);
    return () => clearTimeout(timer);
  }, []);
  
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const cardRef = useRef(null);

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

  const [isMobile, setIsMobile] = useState(typeof window !== 'undefined' && window.innerWidth <= 768);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: "easeOut" }}
      className="card-container" 
      style={{
        pointerEvents: 'auto'
      }}
    >

      {/* The Main Card */}
      <div className="glass-card-wrapper">
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

      {/* The Spline Sphere (placed to the right) */}
      <div className="hero-earth" style={{
        width: '100%',
        maxWidth: isMobile ? '100%' : '600px', 
        height: isMobile ? '450px' : '600px',  
        flex: '1 1 400px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        opacity: isSplineLoaded ? 1 : 0,
        transition: 'opacity 2.5s ease-in-out'
      }}>
        {shouldLoadSpline && (
          <div style={{
            position: 'absolute',
            width: '1400px',
            height: '900px',
            right: 0,
            transformOrigin: 'right center',
            transform: isMobile ? 'scale(0.42)' : 'scale(0.77)',
            pointerEvents: 'auto',
            clipPath: 'inset(0 0 0 50%)', // Cuts off the left half of the invisible canvas so it doesn't block the profile card!
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <Spline 
              scene="https://prod.spline.design/lRjwJUmMoOAlnAXk/scene.splinecode"
              onLoad={() => {
                setTimeout(() => setIsSplineLoaded(true), 100);
              }}
              style={{
                width: '100%',
                height: '100%',
                mixBlendMode: isMobile ? 'normal' : 'screen',
                filter: isMobile ? 'none' : `sepia(1) hue-rotate(300deg) saturate(5) brightness(1.6)`
              }}
            />
          </div>
        )}
      </div>

    </motion.div>
  );
};

export default React.memo(Card);
