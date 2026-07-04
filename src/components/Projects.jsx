import React, { useRef } from 'react';
import Tilt from 'react-parallax-tilt';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link as LinkIcon } from 'lucide-react';
import './Section.css';
import BorderGlow from './BorderGlow';
import GradientText from './GradientText';
import TextReveal from './TextReveal';

export default function Projects() {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  // Adjust scroll distance depending on the number of cards. 
  // -50% works well for 2 cards plus intro text.
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);

  const projects = [
    {
      title: "Layana Boutique",
      description: "A modern, high-performance e-commerce experience. Built with Next.js 16 and React 19, it features a responsive UI with Tailwind CSS and Framer Motion. Backend powered by Firebase, with Razorpay checkout and Resend automated emails.",
      tags: [{ name: "Next.js", color: "text-[#00ffcc]" }, { name: "Firebase", color: "text-[#ff2a5f]" }, { name: "Razorpay", color: "text-[#7a22ff]" }],
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=600&h=400",
      sourceCodeLink: "https://layanaboutique.in"
    },
    {
      title: "Slice of Cake 🍰",
      description: "Premium artisanal bakery e-commerce for custom cakes. Features interactive shopping, admin dashboard for live order tracking, automated HTML emails via Resend, and visually stunning fluid animations.",
      tags: [{ name: "Next.js", color: "text-[#00ffcc]" }, { name: "Tailwind v4", color: "text-[#ff2a5f]" }, { name: "Resend", color: "text-[#7a22ff]" }],
      image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80&w=600&h=400",
      sourceCodeLink: "https://cake-lemon-zeta.vercel.app/"
    }
  ];

  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;

  if (isMobile) {
    return (
      <section ref={targetRef} className="portfolio-section" style={{ position: "relative", padding: "10vh 5vw", display: "flex", flexDirection: "column", gap: "3rem" }}>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", textAlign: 'center' }}>
          <h2 className="section-title">
            <GradientText colors={["#ff2a5f", "#7a22ff", "#00ffcc", "#ff2a5f"]} animationSpeed={5}>
              Featured Work
            </GradientText>
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.6)', marginTop: '-1rem', lineHeight: 1.6, fontSize: "1rem" }}>
            <TextReveal delay={0.2} stagger={0.02}>
              Scroll down to explore my projects. This timeline showcases my skills and experience through real-world examples, reflecting my ability to solve complex problems and work with different technologies.
            </TextReveal>
          </p>
        </div>

        {projects.map((project, index) => (
          <div key={project.title} style={{ width: '100%', margin: '0 auto' }}>
            <BorderGlow
              animated={true}
              glowColor="345 100 58"
              colors={['#ff2a5f', '#7a22ff', '#00f0ff']}
              borderRadius={16}
              style={{ padding: '20px', height: '100%' }}
            >
              {/* Content Container */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                  <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#fff', margin: 0, paddingRight: '16px' }}>{project.title}</h3>
                  <div
                    onClick={() => window.open(project.sourceCodeLink, "_blank")}
                    style={{
                      background: 'linear-gradient(135deg, rgba(0,0,0,0.9), rgba(40,40,40,0.9))',
                      width: '36px',
                      height: '36px',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      flexShrink: 0,
                      border: '1px solid rgba(255,255,255,0.1)'
                    }}
                  >
                    <LinkIcon size={18} color="#fff" />
                  </div>
                </div>
                <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '14px', lineHeight: 1.5, margin: 0 }}>{project.description}</p>
              </div>

              {/* Tags Container */}
              <div style={{ marginTop: '16px', display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {project.tags.map((tag) => (
                  <p key={tag.name} className={tag.color} style={{ fontSize: '12px', margin: 0, fontWeight: 500 }}>
                    #{tag.name}
                  </p>
                ))}
              </div>
            </BorderGlow>
          </div>
        ))}
      </section>
    );
  }

  return (
    <section ref={targetRef} className="portfolio-section" style={{ height: "300vh", position: "relative", padding: 0 }}>
      <div style={{ position: "sticky", top: "15vh", height: "70vh", display: "flex", alignItems: "center", overflow: "hidden" }}>
        <motion.div style={{ x, display: "flex", gap: "4rem", padding: "0 10vw" }}>
          
          <div style={{ width: "80vw", maxWidth: "600px", flexShrink: 0, display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <h2 className="section-title">
              <GradientText colors={["#ff2a5f", "#7a22ff", "#00ffcc", "#ff2a5f"]} animationSpeed={5}>
                Featured Work
              </GradientText>
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.6)', marginTop: '-1rem', lineHeight: 1.6, fontSize: "1.1rem" }}>
              <TextReveal delay={0.2} stagger={0.02}>
                Swipe or scroll down to explore my projects. This horizontal timeline showcases my skills and experience through real-world examples, reflecting my ability to solve complex problems and work with different technologies.
              </TextReveal>
            </p>
          </div>

          {projects.map((project, index) => {
            return (
              <div key={project.title} style={{ width: '80vw', maxWidth: '400px', flexShrink: 0 }}>
                <Tilt
                  tiltEnable
                  tiltMaxAngleX={15}
                  tiltMaxAngleY={15}
                  style={{ height: '100%' }}
                >
                  <BorderGlow
                    animated={true}
                    glowColor="345 100 58"
                    colors={['#ff2a5f', '#7a22ff', '#00f0ff']}
                    borderRadius={16}
                    style={{ 
                      padding: '20px', 
                      height: '100%'
                    }}
                  >
                    {/* Content Container */}
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                        <h3 style={{ fontSize: '24px', fontWeight: 'bold', color: '#fff', margin: 0, paddingRight: '16px' }}>{project.title}</h3>
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
                            flexShrink: 0,
                            border: '1px solid rgba(255,255,255,0.1)',
                            transition: 'transform 0.2s'
                          }}
                          onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                          onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                        >
                          <LinkIcon size={20} color="#fff" />
                        </div>
                      </div>
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
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
