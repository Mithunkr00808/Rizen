import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Scene from './components/Scene';
import Card from './components/Card';
import Experience from './components/Experience';
import Skills from './components/Skills';
import Footer from './components/Footer';

import ScrollSection from './components/ScrollSection';
import GamingToggle from './components/GamingToggle';
import GamingSection from './components/GamingSection';
import AuroraShader from './components/AuroraShader';
import StarsCanvas from './components/canvas/Stars';
import SplashScreen from './components/SplashScreen';
import { ErrorBoundary } from 'react-error-boundary';

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

  useEffect(() => {
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
      <SplashScreen />
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100vh', zIndex: 1, pointerEvents: 'none' }}>
        <div style={{ position: 'absolute', inset: 0, zIndex: 1 }}><AuroraShader colorStops={AURORA_COLORS} blend={0.8} amplitude={1.2} speed={0.5} /></div>
        <div style={{ position: 'absolute', inset: 0, zIndex: 2 }}><StarsCanvas /></div>
      </div>
      <Scene scrollY={scrollY} isGamingMode={isGamingMode} />
      <Card scrollY={scrollY} />
      <Header />
      
      {/* Portfolio Content Sections below the fold */}
      <div style={{ paddingTop: '110vh', display: 'flex', flexDirection: 'column', gap: '8vh', position: 'relative', zIndex: 10, pointerEvents: 'none' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8vh', pointerEvents: 'none' }}>
          <ScrollSection scrollY={scrollY} offsetMultiplier={0.2}>
            <Experience />
          </ScrollSection>
          
          <ScrollSection scrollY={scrollY} offsetMultiplier={0.2}>
            <Skills />
          </ScrollSection>

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
