import React from 'react';
import { Layers } from 'lucide-react';
import './Header.css';

export default function Header() {
  return (
    <header className="floating-header-container">
      <nav className="glass floating-navbar">
        <div className="logo">
          <Layers className="logo-icon" size={24} color="#ff2a5f" />
          <span className="logo-text">Mithun</span>
        </div>
        

        
        <div className="nav-actions">
          <button className="glass-button">Sign In</button>
          <button className="glass-button primary">Get Started</button>
        </div>
      </nav>
    </header>
  );
}
