import React from 'react';
import { motion } from 'framer-motion';
import './Section.css';
import BorderGlow from './BorderGlow';
import GradientText from './GradientText';

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

const Experience = () => {
  return (
    <section id="experience" className="portfolio-section">
      <motion.div variants={fadeIn("up", "spring", 0.1, 1)} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.25 }}>
        <h2 className="section-title">
          <GradientText colors={["#ff2a5f", "#7a22ff", "#00ffcc", "#ff2a5f"]} animationSpeed={5}>
            Experience
          </GradientText>
        </h2>
      </motion.div>
      
      <motion.div 
        variants={fadeIn("up", "spring", 0.3, 0.75)} 
        initial="hidden" 
        whileInView="show" 
        viewport={{ once: true, amount: 0.25 }}
      >
        <BorderGlow
          animated={true}
          glowColor="345 100 58"
          colors={['#ff2a5f', '#7a22ff', '#00f0ff']}
          className="experience-card"
          style={{ padding: '2.5rem' }}
        >
          <div className="experience-header">
            <h3>Software Engineer 2</h3>
            <span className="experience-company text-gradient-accent">@ Philips</span>
          </div>
          <p className="experience-duration">Present</p>
          <p className="experience-description">
            Specializing in Healthcare tech. Core focus on building and integrating robust solutions using HL7, EDI, and PACS Integration to streamline medical data workflows and improve patient care systems.
          </p>
          <div className="experience-skills">
            <span className="glass-badge">HL7</span>
            <span className="glass-badge">EDI</span>
            <span className="glass-badge">PACS</span>
            <span className="glass-badge">Healthcare Tech</span>
          </div>
        </BorderGlow>
      </motion.div>

      {/* Oracle */}
      <motion.div 
        variants={fadeIn("up", "spring", 0.5, 0.75)} 
        initial="hidden" 
        whileInView="show" 
        viewport={{ once: true, amount: 0.25 }}
      >
        <BorderGlow
          animated={true}
          glowColor="345 100 58"
          colors={['#ff2a5f', '#7a22ff', '#00f0ff']}
          className="experience-card"
          style={{ padding: '2.5rem' }}
        >
          <div className="experience-header">
            <h3>Interface Engineer</h3>
            <span className="experience-company text-gradient-accent">@ Oracle</span>
          </div>
          <p className="experience-duration">Aug 2022 – Feb 2025 · 2 yrs 7 mos · Full-time</p>
          <p className="experience-location">Bengaluru, Karnataka, India · Remote</p>
          <p className="experience-description">
            Customized client interfaces to accept client-specific HL7 message event types including ADTs, ORMs, ORUs, VXUs and QBP messages sent via TCP/IP using HL7 lower layer transfer protocol. Designed outbound interfaces to regional platforms and EHR vendors. Performed unit and internal testing on interfaces to ensure they function per specifications. Assisted with mapping logic from source files to HIE and coordinated connectivity testing, system integration testing, and User Acceptance testing. Managed all new interface projects, meeting with vendors and application owners to define scope, goals, objectives and timelines. Troubleshot and resolved technical and conceptual issues related to interfaces, providing close monitoring to ensure they run properly. Configured various environments for development and testing, including deployment to staging before go-live and maintaining them post-production. Utilized mapping techniques to convert HL7 to JSON, XML and more.
          </p>
          <div className="experience-skills">
            <span className="glass-badge">HL7 Standards</span>
            <span className="glass-badge">EDI</span>
            <span className="glass-badge">TCP/IP</span>
            <span className="glass-badge">EHR Integration</span>
            <span className="glass-badge">JSON</span>
            <span className="glass-badge">XML</span>
            <span className="glass-badge">HIE</span>
            <span className="glass-badge">Interface Design</span>
          </div>
        </BorderGlow>
      </motion.div>

      <motion.div 
        variants={fadeIn("up", "spring", 0.7, 0.75)} 
        initial="hidden" 
        whileInView="show" 
        viewport={{ once: true, amount: 0.25 }}
      >
        <BorderGlow
          animated={true}
          glowColor="345 100 58"
          colors={['#ff2a5f', '#7a22ff', '#00f0ff']}
          className="experience-card"
          style={{ padding: '2.5rem' }}
        >
          <div className="experience-header">
            <h3>System Intern</h3>
            <span className="experience-company text-gradient-accent">@ Oracle</span>
          </div>
          <p className="experience-duration">Jan 2022 – Aug 2022 · 8 mos</p>
          <p className="experience-description">
            Built brand new HL7 interfaces from the ground up — design, build, test and deployment. Worked on ADT, ORM, ORU, DFT, SIU and VXU message types. Investigated production issues and identified root causes. Implemented skip logics, translation tables, user exits, memory and counter variables. Monitored error queues, logs, and traces, resolving failed messages and providing ongoing support.
          </p>
          <div className="experience-skills">
            <span className="glass-badge">EDI</span>
            <span className="glass-badge">Cerner CCL</span>
            <span className="glass-badge">HL7 Interfaces</span>
            <span className="glass-badge">Production Support</span>
            <span className="glass-badge">Troubleshooting</span>
          </div>
        </BorderGlow>
      </motion.div>
    </section>
  );
};

export default React.memo(Experience);
