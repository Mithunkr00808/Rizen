import React from 'react';
import './Section.css';

export default function Footer() {
  return (
    <footer className="glass portfolio-footer">
      <div className="footer-content">
        <h2 className="text-gradient">Let's Connect</h2>
        <p>Currently open for new opportunities, collaborations, and interesting projects.</p>
        <a 
          href="https://www.linkedin.com/in/mithun-kr-034014328/" 
          target="_blank" 
          rel="noreferrer" 
          className="glass-button primary"
          style={{ textDecoration: 'none', display: 'inline-block', marginTop: '30px' }}
        >
          Message me on LinkedIn
        </a>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Mithun KR. All rights reserved.</p>
      </div>
    </footer>
  );
}
