import React from 'react';
import './Section.css';

export default function Experience() {
  return (
    <section id="experience" className="portfolio-section">
      <h2 className="text-gradient section-title">Experience</h2>
      
      <div className="glass experience-card">
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
      </div>
    </section>
  );
}
