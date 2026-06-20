import React from 'react';
import Tilt from 'react-parallax-tilt';
import { motion } from 'framer-motion';
import { Code2, Monitor, Database, Server, Cpu, Layers, Activity, Network, HeartPulse, Palette, GitBranch, Briefcase } from 'lucide-react';
import './Section.css';

const fadeIn = (direction, type, delay, duration) => {
  return {
    hidden: {
      x: direction === "left" ? 100 : direction === "right" ? -100 : 0,
      y: direction === "up" ? 100 : direction === "down" ? -100 : 0,
      opacity: 0,
    },
    show: {
      x: 0,
      y: 0,
      opacity: 1,
      transition: {
        type,
        delay,
        duration,
        ease: "easeOut",
      },
    },
  };
};

const Skills = () => {
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
    <section id="skills" className="portfolio-section">
      <motion.div variants={fadeIn("up", "spring", 0.1, 1)} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.25 }}>
        <h2 className="text-gradient section-title">Technical Skills</h2>
      </motion.div>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '1.5rem' }}>
        {skills.map((skill, index) => (
          <motion.div 
            key={skill.name}
            variants={fadeIn("up", "spring", index * 0.1, 0.75)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            style={{ height: '100%', width: '100%' }}
          >
            <Tilt
              glareEnable
              tiltEnable
              tiltMaxAngleX={25}
              tiltMaxAngleY={25}
              glareColor="#ffffff"
              glareMaxOpacity={0.2}
              style={{ height: '100%' }}
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
                  textAlign: 'center'
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
        ))}
      </div>
    </section>
  );
};

export default React.memo(Skills);
