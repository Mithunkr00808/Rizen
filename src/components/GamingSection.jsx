import React, { useState, useRef } from 'react';
import { Cpu, MemoryStick, CircuitBoard, Monitor, Keyboard, Mouse, Gamepad2, Disc, Loader2 } from 'lucide-react';
import PlayerCard from './PlayerCard';
import useSteamStats from '../hooks/useSteamStats';
import './Section.css';

export default function GamingSection({ isGamingMode }) {
  const cardRef = useRef(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const { games, isLoading, error } = useSteamStats();

  if (!isGamingMode) return null;

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

  // Use the live API data, otherwise fall back to hardcoded data
  const displayGames = games.length > 0 ? games : fallbackGames;

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
    <div style={{ marginTop: '-4vh', animation: 'fadeIn 0.5s ease-out', padding: '0 10vw' }}>
      <h2 className="section-title" style={{ textAlign: 'center', marginBottom: '3rem', color: '#fff', textShadow: '0 0 20px rgba(0,255,204,0.4)', fontSize: '2.5rem', fontWeight: 800, letterSpacing: '2px', textTransform: 'uppercase' }}>The Battlestation</h2>
      
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '3rem', maxWidth: '1200px', margin: '0 auto', alignItems: 'center' }}>
        
        {/* Left Side: Dynamic Rig Card */}
        <div style={{ flex: '1 1 400px', perspective: '1000px' }}>
          <div 
            ref={cardRef}
            className="glass experience-card" 
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ 
              padding: '2.5rem',
              transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
              transition: rotation.x === 0 && rotation.y === 0 ? 'transform 0.5s ease-out' : 'none',
              boxShadow: '0 10px 40px rgba(0,0,0,0.4), inset 0 0 20px rgba(255,255,255,0.05)',
              border: '1px solid rgba(0, 255, 204, 0.3)'
            }}
          >
            <div className="experience-header" style={{ marginBottom: '2rem' }}>
              <h3 style={{ color: 'var(--color-primary)', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <CircuitBoard size={28} /> MY RIG
              </h3>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {rigSpecs.map((spec, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '1rem', background: 'rgba(255,255,255,0.03)', padding: '12px 16px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
                  <div style={{ color: 'var(--color-primary)' }}>{spec.icon}</div>
                  <div>
                    <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '1px' }}>{spec.label}</div>
                    <div style={{ fontWeight: 600, fontSize: '1.05rem' }}>{spec.name}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side: 3D Player Card */}
        <div style={{ flex: '1 1 400px', minHeight: '600px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <PlayerCard />
        </div>
      </div>

      {/* Bottom Row: Description & Games Grid */}
      <div style={{ maxWidth: '1200px', margin: '3rem auto 0 auto', display: 'flex', flexDirection: 'column', gap: '2rem' }}>


        <h3 style={{ fontSize: '1.8rem', marginTop: '1rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          Active Roster (Steam)
          {isLoading && <Loader2 size={24} className="animate-spin" color="var(--color-primary)" />}
        </h3>
        
        {error && <p style={{ color: 'red', fontStyle: 'italic' }}>Live data currently unavailable. Showing last known roster.</p>}

        <div className="projects-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))' }}>
          {displayGames.map(game => (
            <div key={game.title} className="glass project-card" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
              {/* If it's live Steam data, it has an icon! */}
              {game.icon ? (
                <img src={game.icon} alt={game.title} style={{ width: '64px', height: '64px', borderRadius: '12px' }} />
              ) : (
                <div style={{ width: '64px', height: '64px', background: 'rgba(255,255,255,0.05)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Gamepad2 size={32} color="var(--color-primary)" />
                </div>
              )}
              
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.2rem', lineHeight: 1.2 }}>{game.title}</h3>
                
                {/* Live Data rendering vs Hardcoded rendering */}
                {game.playtime_forever !== undefined ? (
                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    <span className="glass-badge" style={{ color: 'var(--color-primary)', padding: '0.2rem 0.6rem', fontSize: '0.75rem' }}>
                      {game.playtime_2weeks}h / 2 weeks
                    </span>
                    <span className="glass-badge" style={{ padding: '0.2rem 0.6rem', fontSize: '0.75rem' }}>
                      {game.playtime_forever}h total
                    </span>
                  </div>
                ) : (
                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    <span className="glass-badge" style={{ color: 'var(--color-primary)', padding: '0.2rem 0.6rem', fontSize: '0.75rem' }}>{game.rank}</span>
                    <span className="glass-badge" style={{ padding: '0.2rem 0.6rem', fontSize: '0.75rem' }}>{game.role}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
