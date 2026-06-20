import React from 'react';
import Tilt from 'react-parallax-tilt';
import { motion } from 'framer-motion';
import { Link as LinkIcon } from 'lucide-react';
import './Section.css';
import BorderGlow from './BorderGlow';
import GradientText from './GradientText';

// Framer Motion variant directly ported from the reference repo
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

export default function Projects() {
  const projects = [
    {
      title: "Clinical Data Aggregator",
      description: "A robust backend system processing thousands of HL7 messages daily to synchronize patient records across hospital networks seamlessly and securely.",
      tags: [{ name: "HL7", color: "text-[#00ffcc]" }, { name: "Node.js", color: "text-[#ff2a5f]" }, { name: "Healthcare", color: "text-[#7a22ff]" }],
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=600&h=400",
      sourceCodeLink: "https://github.com"
    },
    {
      title: "PACS Viewer Integration",
      description: "Integrated seamless medical imaging retrieval directly into the provider portal using standard DICOM/PACS protocols for instant radiology access.",
      tags: [{ name: "PACS", color: "text-[#00ffcc]" }, { name: "React", color: "text-[#ff2a5f]" }, { name: "Web API", color: "text-[#7a22ff]" }],
      image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=600&h=400",
      sourceCodeLink: "https://github.com"
    }
  ];

  return (
    <section id="work" className="portfolio-section">
      <motion.div variants={fadeIn("up", "spring", 0.1, 1)} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.25 }}>
        <h2 className="section-title">
          <GradientText colors={["#ff2a5f", "#7a22ff", "#00ffcc", "#ff2a5f"]} animationSpeed={5}>
            Featured Work
          </GradientText>
        </h2>
        <p style={{ color: 'rgba(255,255,255,0.6)', marginTop: '-1rem', marginBottom: '3rem', maxWidth: '600px', lineHeight: 1.6 }}>
          Following projects showcase my skills and experience through real-world examples of my work. Each project is briefly described with links to code repositories and live demos in it. It reflects my ability to solve complex problems, work with different technologies, and manage projects effectively.
        </p>
      </motion.div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem' }}>
        {projects.map((project, index) => (
          <motion.div 
            key={project.title}
            variants={fadeIn("up", "spring", index * 0.5, 0.75)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            style={{ width: '100%', maxWidth: '360px' }}
          >
            <Tilt
              tiltEnable
              tiltMaxAngleX={30}
              tiltMaxAngleY={30}
              style={{ height: '100%' }}
            >
              <BorderGlow
                animated={true}
                glowColor="345 100 58" // matching --color-primary #ff2a5f
                colors={['#ff2a5f', '#7a22ff', '#00f0ff']}
                borderRadius={16}
                style={{ 
                  padding: '20px', 
                  height: '100%'
                }}
              >
                {/* Image Container */}
                <div style={{ position: 'relative', height: '230px', width: '100%', marginBottom: '20px' }}>
                  <img
                    src={project.image}
                    alt={project.title}
                    style={{ height: '100%', width: '100%', borderRadius: '16px', objectFit: 'cover' }}
                  />
                  {/* GitHub Link Overlay */}
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, margin: '12px', display: 'flex', justifyContent: 'flex-end' }}>
                    <div
                      onClick={() => window.open(project.sourceCodeLink, "_blank")}
                      style={{
                        background: 'linear-gradient(135deg, rgba(0,0,0,0.9), rgba(40,40,40,0.9))',
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        border: '1px solid rgba(255,255,255,0.1)',
                        transition: 'transform 0.2s'
                      }}
                      onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                      onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                    >
                      <LinkIcon size={20} color="#fff" />
                    </div>
                  </div>
                </div>

                {/* Content Container */}
                <div>
                  <h3 style={{ fontSize: '24px', fontWeight: 'bold', color: '#fff', margin: '0 0 10px 0' }}>{project.title}</h3>
                  <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '14px', lineHeight: 1.5, margin: 0 }}>{project.description}</p>
                </div>

                {/* Tags Container */}
                <div style={{ marginTop: '16px', display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {project.tags.map((tag) => (
                    <p key={tag.name} className={tag.color} style={{ fontSize: '14px', margin: 0, fontWeight: 500 }}>
                      #{tag.name}
                    </p>
                  ))}
                </div>
              </BorderGlow>
            </Tilt>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
