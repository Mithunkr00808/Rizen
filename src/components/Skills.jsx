import React from 'react';
import './Section.css';

export default function Skills() {
  const skills = [
    'JavaScript (ES6+)', 'React', 'HTML/CSS', 'Node.js', 
    'HL7', 'EDI', 'PACS Integration', 'Healthcare IT',
    'WebGL / Spline', 'Git', 'Agile / Scrum', 'System Design'
  ];

  return (
    <section id="skills" className="portfolio-section">
      <h2 className="text-gradient section-title">Technical Skills</h2>
      <div className="skills-grid">
        {skills.map(skill => (
          <div key={skill} className="glass skill-item">
            {skill}
          </div>
        ))}
      </div>
    </section>
  );
}
