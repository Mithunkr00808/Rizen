import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import { Gamepad2 } from 'lucide-react';
import { fadeIn } from '../utils/motion';

const XboxGameCard = ({ game, index }) => {
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
        glareColor="#107C10" /* Xbox Green */
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
            background: isHovered ? 'rgba(16, 124, 16, 0.15)' : 'rgba(255,255,255,0.03)',
            transform: isHovered ? 'translateY(-5px) scale(1.02)' : 'translateY(0) scale(1)',
            transition: 'all 0.3s ease',
            border: isHovered ? '1px solid rgba(16, 124, 16, 0.5)' : '1px solid rgba(255, 255, 255, 0.05)'
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {game.coverUrl ? (
            <img src={game.coverUrl} alt={game.title} style={{ width: '56px', height: '56px', borderRadius: '12px', objectFit: 'cover' }} />
          ) : (
            <div style={{ width: '56px', height: '56px', background: 'rgba(255,255,255,0.05)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Gamepad2 size={28} color="#107C10" />
            </div>
          )}
          
          <div style={{ display: 'flex', flexDirection: 'column', flex: 1, overflow: 'hidden' }}>
            <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.1rem', lineHeight: 1.2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {game.title}
            </h3>
            
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {game.gameScore && (
                <span className="glass-badge" style={{ color: '#107C10', padding: '0.2rem 0.5rem', fontSize: '0.75rem' }}>
                  {game.gameScore} G
                </span>
              )}
              {game.lastPlayed && (
                <span className="glass-badge" style={{ color: 'rgba(255,255,255,0.6)', padding: '0.2rem 0.5rem', fontSize: '0.75rem' }}>
                  {game.lastPlayed}
                </span>
              )}
            </div>
          </div>
        </div>
      </Tilt>
    </motion.div>
  );
};

export default XboxGameCard;
