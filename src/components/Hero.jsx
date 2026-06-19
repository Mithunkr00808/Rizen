import React from 'react';
import './Hero.css';

export default function Hero() {
  return (
    <div className="hero-container">
      <div className="hero-content">
        <p className="hero-subtitle">
          Experience a beautiful 3D interface built with React Three Fiber, featuring fluid shapes, glassmorphism, and neon lighting.
        </p>
        <div className="hero-actions">
          <button className="glass-button primary hero-button">Start Exploring</button>
        </div>
      </div>
    </div>
  );
}
