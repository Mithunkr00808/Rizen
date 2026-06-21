import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import { Gamepad2 } from 'lucide-react';
import { fadeIn } from '../utils/motion';
import BorderGlow from './BorderGlow';

const XboxGameCard = ({ game, index }) => {
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
          glowColor="120 100 30" // Xbox Green 
          colors={['#107C10', '#9bf00b', '#39ff14']}
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
            {isHovered && game.gameAch && (
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
                  width: '200px',
                  padding: '1rem',
                  borderRadius: '16px',
                  pointerEvents: 'none',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.8)',
                  textAlign: 'center'
                }}
              >
                <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '0.9rem', color: '#107C10', textTransform: 'uppercase', letterSpacing: '1px' }}>
                  Achievements
                </h4>
                <div style={{ fontSize: '1.1rem', fontWeight: 'bold', color: 'white' }}>
                  {game.gameAch}
                </div>
              </motion.div>
            )}
            {game.coverUrl ? (
              <img src={game.coverUrl} alt={game.title} style={{ width: '100%', height: '280px', objectFit: 'cover', borderTopLeftRadius: '16px', borderTopRightRadius: '16px' }} />
            ) : (
              <div style={{ width: '100%', height: '280px', background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', borderTopLeftRadius: '16px', borderTopRightRadius: '16px' }}>
                <Gamepad2 size={48} color="#107C10" />
              </div>
            )}
            
            <div style={{ display: 'flex', flexDirection: 'column', flex: 1, padding: '1.25rem' }}>
              <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.2rem', lineHeight: 1.2 }}>
                {game.title}
              </h3>
              
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: 'auto' }}>
                {game.gameScore && (
                  <span className="glass-badge" style={{ color: '#107C10', padding: '0.4rem 0.8rem', fontSize: '0.85rem' }}>
                    {game.gameScore} G
                  </span>
                )}
                {game.lastPlayed && (
                  <span className="glass-badge" style={{ color: 'rgba(255,255,255,0.6)', padding: '0.4rem 0.8rem', fontSize: '0.85rem' }}>
                    {game.lastPlayed}
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

export default XboxGameCard;
