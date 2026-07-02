import React, { useRef } from 'react';
import Tilt from 'react-parallax-tilt';
import { motion } from 'framer-motion';
import { Code2, Monitor, Database, Server, Cpu, Layers, Activity, Network, HeartPulse, Palette, GitBranch, Briefcase } from 'lucide-react';
import './Section.css';
import GradientText from './GradientText';

const Skills = () => {
  const containerRef = useRef(null);

  const skills = [
    { name: 'JavaScript (ES6+)', icon: <Code2 size={40} color="#ff2a5f" /> },
    { name: 'React', icon: <Monitor size={40} color="#00ffcc" /> },
    { name: 'HTML/CSS', icon: <Palette size={40} color="#7a22ff" /> },
    { name: 'Node.js', icon: <Server size={40} color="#00ffcc" /> },
    { name: 'HL7', icon: <Activity size={40} color="#ff2a5f" /> },
    { name: 'EDI', icon: <Network size={40} color="#7a22ff" /> },
    { name: 'PACS Integration', icon: <HeartPulse size={40} color="#ff2a5f" /> },
    { name: 'Healthcare IT', icon: <Database size={40} color="#00ffcc" /> },
    { name: 'WebGL / Spline', icon: <Layers size={40} color="#7a22ff" /> },
    { name: 'Git', icon: <GitBranch size={40} color="#ff2a5f" /> },
    { name: 'Agile / Scrum', icon: <Briefcase size={40} color="#00ffcc" /> },
    { name: 'System Design', icon: <Cpu size={40} color="#7a22ff" /> }
  ];

  return (
    <section id="skills" className="portfolio-section" ref={containerRef}>
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 1, type: "spring" }}
      >
        <h2 className="section-title" style={{ marginBottom: '1rem' }}>
          <GradientText colors={["#ff2a5f", "#7a22ff", "#00ffcc", "#ff2a5f"]} animationSpeed={5}>
            Interactive Tech Stack
          </GradientText>
        </h2>
        <p style={{ color: 'rgba(255,255,255,0.6)', textAlign: 'center', marginBottom: '3rem', fontSize: '0.9rem' }}>
          Feel free to grab and toss the tech around!
        </p>
      </motion.div>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '1.5rem', position: 'relative' }}>
        {skills.map((skill, index) => {
          // Generate deterministic pseudo-random values based on index to avoid hydration mismatches 
          const randomY = (index % 3 === 0 ? 10 : index % 2 === 0 ? -12 : 8);
          const randomDuration = 3 + (index % 3) * 0.5;
          
          return (
            <motion.div 
              key={skill.name}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{
                opacity: { duration: 0.5, delay: index * 0.05 },
                scale: { duration: 0.5, delay: index * 0.05 }
              }}
              style={{ height: '100%', width: '100%', position: 'relative', zIndex: 2 }}
            >
              <motion.div
                drag
                dragConstraints={{ top: 0, bottom: 0, left: 0, right: 0 }}
                dragElastic={1}
                dragTransition={{ bounceStiffness: 600, bounceDamping: 20 }}
                whileDrag={{ scale: 1.1, zIndex: 50 }}
                style={{ height: '100%', width: '100%' }}
              >
                <motion.div
                  animate={{
                    y: [0, randomY, 0],
                  }}
                  transition={{
                    y: { repeat: Infinity, duration: randomDuration, ease: "easeInOut" }
                  }}
                  style={{ height: '100%', width: '100%' }}
                >
                  <Tilt
                    glareEnable
                    tiltEnable
                    tiltMaxAngleX={25}
                    tiltMaxAngleY={25}
                    glareColor="#ffffff"
                    glareMaxOpacity={0.2}
                    style={{ height: '100%', pointerEvents: 'none' }}
                  >
                    <div 
                      className="glass"
                      style={{ 
                        borderRadius: '16px', 
                        padding: '24px 16px', 
                        height: '100%',
                        minHeight: '160px',
                        boxSizing: 'border-box',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: 'rgba(20, 20, 25, 0.6)', 
                        border: '1px solid rgba(255,255,255,0.05)',
                        textAlign: 'center',
                        userSelect: 'none'
                      }}
                    >
                      <div style={{ marginBottom: '16px' }}>
                        {skill.icon}
                      </div>
                      <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#fff', margin: 0 }}>
                        {skill.name}
                      </h3>
                    </div>
                  </Tilt>
                </motion.div>
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default React.memo(Skills);
