import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import { Gamepad2 } from 'lucide-react';
import { fadeIn } from '../utils/motion';
import BorderGlow from './BorderGlow';

const SteamGameCard = ({ game, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div style={{ width: '100%', height: '100%' }}>
      <Tilt
        tiltEnable
        tiltMaxAngleX={15}
        tiltMaxAngleY={15}
      >
        <BorderGlow
          animated={true}
          glowColor="180 100 50" // Cyan/Teal for Steam
          colors={['#00ffcc', '#0088ff', '#00f0ff']}
          borderRadius={16}
          style={{ 
            padding: 0, 
            display: 'flex', 
            flexDirection: 'column',
            alignItems: 'stretch',
            cursor: 'pointer',
            marginBottom: 0,
            position: 'relative',
            minHeight: '420px',
            transform: isHovered ? 'translateY(-5px) scale(1.02)' : 'translateY(0) scale(1)',
            transition: 'all 0.3s ease'
          }}
        >
          <div
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{ display: 'flex', flexDirection: 'column', height: '100%', width: '100%' }}
          >
            {isHovered && game.achievements && game.achievements.length > 0 && (
              <motion.div 
                initial={{ opacity: 0, y: 10, x: "-50%" }}
                animate={{ opacity: 1, y: -10, x: "-50%" }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="glass"
                style={{
                  position: 'absolute',
                  bottom: '100%',
                  left: '50%',
                  zIndex: 50,
                  width: '300px',
                  padding: '1rem',
                  borderRadius: '16px',
                  pointerEvents: 'none',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.8)'
                }}
              >
                <h4 style={{ margin: '0 0 1rem 0', fontSize: '0.9rem', color: 'var(--color-primary)', textTransform: 'uppercase', letterSpacing: '1px' }}>
                  Unlocked Achievements
                </h4>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {game.achievements.map((ach, idx) => (
                    <img 
                      key={idx} 
                      src={ach.icon} 
                      alt={ach.name} 
                      title={ach.name}
                      style={{ width: '36px', height: '36px', borderRadius: '4px', objectFit: 'cover' }}
                    />
                  ))}
                </div>
              </motion.div>
            )}

            {game.icon ? (
              <img 
                src={game.icon} 
                alt={game.title} 
                style={{ width: '100%', height: '280px', objectFit: 'cover', borderTopLeftRadius: '16px', borderTopRightRadius: '16px' }} 
                onError={(e) => { 
                  if (e.target.src !== game.fallbackIcon) {
                    e.target.src = game.fallbackIcon; 
                  }
                }}
              />
            ) : (
              <div style={{ width: '100%', height: '280px', background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', borderTopLeftRadius: '16px', borderTopRightRadius: '16px' }}>
                <Gamepad2 size={48} color="var(--color-primary)" />
              </div>
            )}
            
            <div style={{ display: 'flex', flexDirection: 'column', flex: 1, padding: '1.25rem' }}>
              <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.2rem', lineHeight: 1.2 }}>
                {game.title}
              </h3>
              
              <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'flex-start' }}>
                {game.hours !== undefined ? (
                  <span className="glass-badge" style={{ color: 'var(--color-primary)', padding: '0.4rem 0.8rem', fontSize: '0.85rem' }}>
                    {game.hours} hours
                  </span>
                ) : (
                  <span className="glass-badge" style={{ color: 'var(--color-primary)', padding: '0.4rem 0.8rem', fontSize: '0.85rem' }}>
                    {game.rank}
                  </span>
                )}
              </div>
            </div>
          </div>
        </BorderGlow>
      </Tilt>
    </motion.div>
  );
};

export default SteamGameCard;
