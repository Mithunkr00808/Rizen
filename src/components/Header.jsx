import React from 'react';
import { Layers } from 'lucide-react';
import MusicPlayer from './MusicPlayer';
import './Header.css';

const Header = () => {
  return (
    <header className="floating-header-container">
      <nav className="glass floating-navbar">
        <div className="logo">
          <Layers className="logo-icon" size={24} color="#ff2a5f" />
          <span className="logo-text">Mithun</span>
        </div>
        
        
        <div className="nav-actions" style={{ display: 'flex', gap: '16px', alignItems: 'center', pointerEvents: 'auto' }}>
          <MusicPlayer />
        </div>
      </nav>
    </header>
  );
};

export default React.memo(Header);
