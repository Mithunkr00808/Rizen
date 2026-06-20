import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import { Gamepad2 } from 'lucide-react';
import { fadeIn } from '../utils/motion';

const SteamGameCard = ({ game, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div 
      variants={fadeIn("up", "spring", index * 0.2, 0.75)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.1 }}
    >
      <Tilt
        glareEnable
        tiltEnable
        tiltMaxAngleX={15}
        tiltMaxAngleY={15}
        glareColor="#00ffcc"
        glarePosition="all"
        glareBorderRadius="16px"
      >
        <div 
          className="glass project-card" 
          style={{ 
            padding: '1.25rem', 
            display: 'flex', 
            alignItems: 'center', 
            gap: '1rem',
            cursor: 'pointer',
            marginBottom: 0,
            position: 'relative',
            borderRadius: '16px',
            background: isHovered ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.03)',
            transform: isHovered ? 'translateY(-5px) scale(1.02)' : 'translateY(0) scale(1)',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
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
            <img src={game.icon} alt={game.title} style={{ width: '56px', height: '56px', borderRadius: '12px' }} />
          ) : (
            <div style={{ width: '56px', height: '56px', background: 'rgba(255,255,255,0.05)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Gamepad2 size={28} color="var(--color-primary)" />
            </div>
          )}
          
          <div style={{ display: 'flex', flexDirection: 'column', flex: 1, overflow: 'hidden' }}>
            <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.1rem', lineHeight: 1.2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {game.title}
            </h3>
            
            {game.hours !== undefined ? (
              <span className="glass-badge" style={{ color: 'var(--color-primary)', padding: '0.2rem 0.5rem', fontSize: '0.75rem', alignSelf: 'flex-start' }}>
                {game.hours} hours
              </span>
            ) : (
              <span className="glass-badge" style={{ color: 'var(--color-primary)', padding: '0.2rem 0.5rem', fontSize: '0.75rem', alignSelf: 'flex-start' }}>
                {game.rank}
              </span>
            )}
          </div>
        </div>
      </Tilt>
    </motion.div>
  );
};

export default SteamGameCard;
