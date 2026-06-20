import React from 'react';
import './Section.css';

export default function Footer() {
  return (
    <footer className="glass portfolio-footer">
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Mithun KR. All rights reserved.</p>
      </div>
    </footer>
  );
}
