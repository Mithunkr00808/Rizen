import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Scene from './components/Scene';
import Card from './components/Card';
import Experience from './components/Experience';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Footer from './components/Footer';

import ScrollSection from './components/ScrollSection';
import GamingToggle from './components/GamingToggle';
import GamingSection from './components/GamingSection';
import AuroraShader from './components/AuroraShader';
import StarsCanvas from './components/canvas/Stars';
import SplashScreen from './components/SplashScreen';
import CustomCursor from './components/CustomCursor';
import { ErrorBoundary } from 'react-error-boundary';
import { useGLTF } from '@react-three/drei';
import { useKonamiCode } from './hooks/useKonamiCode';
import confetti from 'canvas-confetti';

// Preload the heavy GLTF model immediately in the background on page load
if (typeof window !== 'undefined' && window.innerWidth > 768) {
  useGLTF.preload('/bmw_m_hybrid_v8_lmdh_draco.glb');
}

const AURORA_COLORS = ["#ff2a5f", "#7a22ff", "#00ffcc"];

function Fallback({ error }) {
  return (
    <div style={{ color: 'red', padding: '2rem', background: 'rgba(255,0,0,0.1)', borderRadius: '10px' }}>
      <h2>Gaming Section Crashed</h2>
      <pre>{error.message}</pre>
    </div>
  );
}

function App() {
  const [scrollY, setScrollY] = useState(0);
  const [isGamingMode, setIsGamingMode] = useState(false);
  const isKonamiUnlocked = useKonamiCode();
  const [isMobile, setIsMobile] = useState(typeof window !== 'undefined' ? window.innerWidth <= 768 : false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (isKonamiUnlocked) {
      confetti({
        particleCount: 200,
        spread: 160,
        origin: { y: 0.6 },
        colors: ['#ff2a5f', '#7a22ff', '#00ffcc'],
        zIndex: 9999
      });
    }
  }, [isKonamiUnlocked]);

  useEffect(() => {
    // Prevent browser from automatically restoring scroll position on refresh
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    // Force scroll to top on initial load so hero section is always sharp
    window.scrollTo(0, 0);

    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isGamingMode) {
      document.body.classList.add('gaming-mode');
    } else {
      document.body.classList.remove('gaming-mode');
    }
  }, [isGamingMode]);

  return (
    <div className="portfolio-container" style={{ position: 'relative' }}>
      <CustomCursor />
      <SplashScreen />
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100vh', zIndex: 1, pointerEvents: 'none' }}>
        {!isMobile && <div style={{ position: 'absolute', inset: 0, zIndex: 1 }}><AuroraShader colorStops={AURORA_COLORS} blend={0.8} amplitude={1.2} speed={0.5} /></div>}
        {!isMobile && <div style={{ position: 'absolute', inset: 0, zIndex: 2 }}><StarsCanvas /></div>}
      </div>
      <Scene scrollY={scrollY} isGamingMode={isGamingMode} />
      <Card />
      <Header />
      
      {/* Portfolio Content Sections below the fold */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4vh', position: 'relative', zIndex: 10, pointerEvents: 'none', marginTop: isMobile ? '2vh' : '-10vh' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4vh', pointerEvents: 'none' }}>
          <ScrollSection scrollY={scrollY} offsetMultiplier={0.2}>
            <Experience />
          </ScrollSection>
          
          {/* Projects uses sticky positioning, which breaks if any parent has overflow: hidden or transform. 
              Since ScrollSection applies transform, we don't wrap Projects in ScrollSection. */}
          <div style={{ pointerEvents: 'auto' }}>
            <Projects />
          </div>
          
          <div style={{ pointerEvents: 'auto' }}>
            <Skills />
          </div>

          {/* Liquid Glass Gaming Switch */}
          <ScrollSection scrollY={scrollY} offsetMultiplier={0.1}>
            <GamingToggle isGamingMode={isGamingMode} setIsGamingMode={setIsGamingMode} scrollY={scrollY} />
          </ScrollSection>

          {/* Gaming Content (Only shows if gaming mode is active) */}
          <ErrorBoundary FallbackComponent={Fallback}>
            <ScrollSection scrollY={scrollY} offsetMultiplier={0.1}>
              <GamingSection isGamingMode={isGamingMode} />
            </ScrollSection>
          </ErrorBoundary>

          {/* Spacer to allow scrolling when gaming mode is OFF so auto-trigger can fire */}
          {!isGamingMode && (
            <div style={{ height: '100vh', pointerEvents: 'none' }} />
          )}
        </div>
      </div>
      
      {isGamingMode && (
        <ScrollSection scrollY={scrollY} offsetMultiplier={0.1}>
          <Footer />
        </ScrollSection>
      )}
    </div>
  );
}

export default App;
