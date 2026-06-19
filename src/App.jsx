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

function App() {
  const [scrollY, setScrollY] = useState(0);
  const [isGamingMode, setIsGamingMode] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
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
    <div>
      <Scene scrollY={scrollY} isGamingMode={isGamingMode} />
      <Card scrollY={scrollY} />
      <Header />
      
      {/* Portfolio Content Sections below the fold */}
      <div style={{ paddingTop: '110vh', display: 'flex', flexDirection: 'column', gap: '8vh', paddingBottom: '10vh' }}>
        <ScrollSection scrollY={scrollY} offsetMultiplier={0.2}>
          <Experience />
        </ScrollSection>
        
        <ScrollSection scrollY={scrollY} offsetMultiplier={0.2}>
          <Skills />
        </ScrollSection>
        
        <ScrollSection scrollY={scrollY} offsetMultiplier={0.2}>
          <Projects />
        </ScrollSection>

        {/* Liquid Glass Gaming Switch */}
        <ScrollSection scrollY={scrollY} offsetMultiplier={0.1}>
          <GamingToggle isGamingMode={isGamingMode} setIsGamingMode={setIsGamingMode} scrollY={scrollY} />
        </ScrollSection>

        {/* Gaming Content (Only shows if gaming mode is active) */}
        <ScrollSection scrollY={scrollY} offsetMultiplier={0.1}>
          <GamingSection isGamingMode={isGamingMode} />
        </ScrollSection>
      </div>
      
      <ScrollSection scrollY={scrollY} offsetMultiplier={0.1}>
        <Footer />
      </ScrollSection>
    </div>
  );
}

export default App;
