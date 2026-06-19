import React from 'react';
import './Section.css';

export default function Projects() {
  const projects = [
    {
      title: "Clinical Data Aggregator",
      description: "A robust backend system processing thousands of HL7 messages daily to synchronize patient records across hospital networks seamlessly and securely.",
      tags: ["HL7", "Node.js", "Healthcare"]
    },
    {
      title: "PACS Viewer Integration",
      description: "Integrated seamless medical imaging retrieval directly into the provider portal using standard DICOM/PACS protocols for instant radiology access.",
      tags: ["PACS", "React", "Web API"]
    }
  ];

  return (
    <section id="work" className="portfolio-section">
      <h2 className="text-gradient section-title">Featured Work</h2>
      <div className="projects-grid">
        {projects.map(project => (
          <div key={project.title} className="glass project-card">
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <div className="project-tags">
              {project.tags.map(tag => (
                <span key={tag} className="glass-badge">{tag}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
