import React, { useState, useRef, useEffect } from 'react';
import { Cpu, MemoryStick, CircuitBoard, Monitor, Keyboard, Mouse, Gamepad2, Disc, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import { fadeIn, textVariant } from '../utils/motion';
import PlayerCard from './PlayerCard';
import useSteamLibrary from '../hooks/useSteamLibrary';
import useXboxLibrary from '../hooks/useXboxLibrary';
import ValorantCard from './ValorantCard';
import EarthCanvas from './canvas/Earth';
import PlayCanvasViewer from './canvas/PlayCanvasViewer';
import SteamGameCard from './SteamGameCard';
import XboxGameCard from './XboxGameCard';
import Carousel3D from './Carousel3D';
import BorderGlow from './BorderGlow';
import GradientText from './GradientText';
import './Section.css';

const GamingSection = ({ isGamingMode }) => {
  const cardRef = useRef(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  
  // Use the new Library hook
  const { library, isLoading: isLoadingLibrary, error: libraryError } = useSteamLibrary();
  const { library: xboxLibrary, isLoading: isLoadingXbox, error: xboxError } = useXboxLibrary();

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Unmounting WebGL canvases when not in Gaming Mode to save mobile GPU memory!

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const card = cardRef.current.getBoundingClientRect();
    const x = e.clientX - card.left - card.width / 2;
    const y = e.clientY - card.top - card.height / 2;
    
    // Tilt the rig card subtly
    setRotation({
      x: -(y / card.height) * 20,
      y: (x / card.width) * 20
    });
  };

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 });
  };

  // Fallback games if the API is broken or missing a key
  const fallbackGames = [
    { title: "Valorant", rank: "Ascendant 2", role: "Initiator" },
    { title: "Apex Legends", rank: "Diamond", role: "Flex" },
    { title: "Elden Ring", rank: "Completed", role: "Strength Build" }
  ];

  // Use the live API data, otherwise fall back to hardcoded data, limited to top 12
  const displayGames = (library.length > 0 ? library : fallbackGames).slice(0, 12);
  const xboxGames = (xboxLibrary?.recentGames ? xboxLibrary.recentGames : []).slice(0, 12);

  const rigSpecs = [
    { icon: <Cpu size={24} />, name: "Ryzen 5 5600", label: "CPU" },
    { icon: <CircuitBoard size={24} />, name: "RTX 4060ti", label: "GPU" },
    { icon: <MemoryStick size={24} />, name: "16GB DDR4", label: "RAM" },
    { icon: <Monitor size={24} />, name: 'Samsung Odyssey G5 27"', label: "Display" },
    { icon: <Keyboard size={24} />, name: "Kreo Swarm", label: "Keyboard" },
    { icon: <Mouse size={24} />, name: "Kreo Pegasus", label: "Mouse" },
    { icon: <Gamepad2 size={24} />, name: "Xbox Controller", label: "Controller" },
    { icon: <Disc size={24} />, name: "Thrustmaster TX Leather", label: "Sim Wheel" }
  ];

  return (
    <motion.section 
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0 }}
      id="gaming"
      className="gaming-section"
      style={{ 
        position: isGamingMode ? 'relative' : 'absolute', 
        opacity: isGamingMode ? 1 : 0,
        pointerEvents: isGamingMode ? 'auto' : 'none',
        visibility: isGamingMode ? 'visible' : 'hidden',
        zIndex: 0, 
        margin: '0 auto', 
        width: '100%', 
        boxSizing: 'border-box', 
        marginTop: '-4vh', 
        padding: '0 5vw',
        transition: 'opacity 0.5s ease-in-out'
      }}
    >
      
      <motion.div variants={textVariant()} style={{ width: '100%', textAlign: 'center' }}>
        <h2 className="section-title" style={{ textAlign: 'center', marginBottom: '3rem', color: '#fff', textShadow: '0 0 20px rgba(0,255,204,0.4)', fontSize: 'clamp(1.5rem, 5vw, 2.5rem)', fontWeight: 800, letterSpacing: '2px', textTransform: 'uppercase' }}>
          <GradientText colors={["#00ffcc", "#00f0ff", "#7a22ff", "#00ffcc"]} animationSpeed={5}>
            The Battlestation
          </GradientText>
        </h2>
      </motion.div>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4rem', maxWidth: '1200px', margin: '0 auto', alignItems: 'center' }}>
        
        {/* Top: 3D Player Card & Earth Globe */}
        <motion.div variants={fadeIn("up", "spring", 0.3, 0.75)} className="gaming-hero-row" style={{ width: '100%', minHeight: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap', gap: '2rem' }}>
          <PlayerCard />
          {/* Temporarily disabled Earth Globe for performance testing */}
          {/* <div className="earth-container" style={{ width: '100%', maxWidth: '400px', height: isMobile ? '250px' : '400px', maxHeight: '500px', zIndex: 10, position: 'relative', transform: isMobile ? 'none' : 'translateX(40px)' }}>
            {isGamingMode && <EarthCanvas />}
          </div> */}
        </motion.div>

        {/* 3D PlayCanvas Model Viewer moved to bottom */}

        {/* Bottom: Static Rig Card */}
        <motion.div variants={fadeIn("up", "spring", 0.5, 0.75)} style={{ width: '100%' }}>
          <BorderGlow
            animated={true}
            glowColor="180 100 50" // Cyberpunk Cyan
            colors={['#00ffcc', '#00f0ff', '#7a22ff']}
            borderRadius={24}
            className="experience-card" 
            style={{ 
              padding: '2.5rem',
              boxShadow: '0 10px 40px rgba(0,0,0,0.4), inset 0 0 20px rgba(255,255,255,0.05)',
              width: '100%',
              boxSizing: 'border-box'
            }}
          >
            <div className="experience-header" style={{ marginBottom: '2rem' }}>
              <h3 style={{ color: 'var(--color-primary)', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <CircuitBoard size={28} /> MY RIG
              </h3>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.25rem' }}>
              {rigSpecs.map((spec, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '1rem', background: 'rgba(255,255,255,0.03)', padding: '16px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
                  <div style={{ color: 'var(--color-primary)' }}>{spec.icon}</div>
                  <div>
                    <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '1px' }}>{spec.label}</div>
                    <div style={{ fontWeight: 600, fontSize: '1.05rem' }}>{spec.name}</div>
                  </div>
                </div>
              ))}
            </div>
          </BorderGlow>
        </motion.div>
      </div>

      {/* Bottom Row: Description & Games Grid */}
      <div style={{ maxWidth: '1200px', margin: '3rem auto 0 auto', display: 'flex', flexDirection: 'column', gap: '2rem' }}>

        <motion.div variants={fadeIn("up", "spring", 0.7, 0.75)} style={{ marginTop: '3rem', marginBottom: '3rem' }}>
          <ValorantCard />
        </motion.div>


        <motion.h3 variants={textVariant()} style={{ fontSize: '1.8rem', marginTop: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
          <GradientText colors={["#00ffcc", "#00f0ff", "#7a22ff", "#00ffcc"]} animationSpeed={5} className="left-align-gradient">
            Steam Library (Top Played)
          </GradientText>
          {isLoadingLibrary && <Loader2 size={24} className="animate-spin" color="var(--color-primary)" />}
        </motion.h3>
        
        {libraryError && <p style={{ color: 'red', fontStyle: 'italic' }}>Live data currently unavailable. Showing last known roster.</p>}

        <div style={{ width: '100%', margin: '2rem 0' }}>
          <Carousel3D 
            items={displayGames.map((game, idx) => <SteamGameCard key={game.appid || game.title} game={game} index={idx} />)}
            duration={45} 
            cardWidth={280} 
            rotationDirection="left"
          />
        </div>

        {/* Xbox Section */}
        <motion.h3 variants={textVariant()} style={{ fontSize: '1.8rem', marginTop: '3rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', color: '#107C10', textShadow: '0 0 20px rgba(16,124,16,0.4)' }}>
          <GradientText colors={["#00ffcc", "#00f0ff", "#7a22ff", "#00ffcc"]} animationSpeed={5} className="left-align-gradient">
            Xbox Live Activity
          </GradientText>
          {isLoadingXbox && <Loader2 size={24} className="animate-spin" color="#107C10" />}
        </motion.h3>
        
        {xboxError && <p style={{ color: 'red', fontStyle: 'italic' }}>Live data currently unavailable.</p>}

        {xboxGames.length > 0 && (
          <div style={{ width: '100%', margin: '2rem 0' }}>
            <Carousel3D 
              items={xboxGames.map((game, idx) => <XboxGameCard key={game.title} game={game} index={idx} />)}
              duration={40} 
              cardWidth={280} 
              rotationDirection="right"
            />
          </div>
        )}

        {/* Removed MY FAV section per user request */}
      </div>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </motion.section>
  );
};

export default React.memo(GamingSection);
