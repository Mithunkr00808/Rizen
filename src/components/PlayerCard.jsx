import React, { useState, useRef, useEffect } from 'react';
import './PlayerCard.css';
import { Gamepad2 } from 'lucide-react';

export default function PlayerCard() {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);
  const lastPosRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!isDragging) return;
    const container = containerRef.current;
    if (!container) return;

    const handleMove = (e) => {
      const deltaX = e.clientX - lastPosRef.current.x;
      const deltaY = e.clientY - lastPosRef.current.y;
      lastPosRef.current = { x: e.clientX, y: e.clientY };
      
      setRotation(prev => ({
        x: prev.x - (deltaY * 0.8),
        y: prev.y + (deltaX * 0.8)
      }));
    };

    const handleUp = () => {
      setIsDragging(false);
      setRotation(prev => ({
        x: Math.round(prev.x / 180) * 180,
        y: Math.round(prev.y / 180) * 180
      }));
    };

    // Scope to container element only — do NOT add to window
    container.addEventListener('pointermove', handleMove);
    container.addEventListener('pointerup', handleUp);
    container.addEventListener('pointercancel', handleUp);
    container.setPointerCapture && container.setPointerCapture(container._capturedPointerId);

    return () => {
      container.removeEventListener('pointermove', handleMove);
      container.removeEventListener('pointerup', handleUp);
      container.removeEventListener('pointercancel', handleUp);
    };
  }, [isDragging]);

  const handlePointerDown = (e) => {
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    containerRef.current._capturedPointerId = e.pointerId;
    lastPosRef.current = { x: e.clientX, y: e.clientY };
    setIsDragging(true);
  };

  // Calculate dynamic lighting based on the physical rotation
  const glareX = 50 + (rotation.y % 360) / 3.6;
  const glareY = 50 - (rotation.x % 360) / 3.6;

  return (
    <div 
      ref={containerRef}
      className="player-card-container" 
      onPointerDown={handlePointerDown}
      onDragStart={(e) => e.preventDefault()} // CRITICAL: Prevent HTML5 drag-and-drop hijacking
      style={{ userSelect: 'none', touchAction: 'none', cursor: isDragging ? 'grabbing' : 'grab' }}
    >
      <div 
        className="player-card"
        style={{ 
          transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
          transition: isDragging ? 'none' : 'transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)'
        }}
      >
        
        {/* --- FRONT FACE --- */}
        <div className="card-face card-front" style={{ userSelect: 'none' }}>
          <div className="card-glare" style={{ background: `radial-gradient(farthest-corner circle at ${glareX}% ${glareY}%, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0) 60%)` }} />
          <div className="card-foil" style={{ backgroundPosition: `${glareX}% ${glareY}%` }} />

          <div className="card-content" style={{ userSelect: 'none' }}>
            <div className="card-header">
              <span className="card-rank">Player: MITHUN</span>
              <div className="card-glitch-text">RIZEN</div>
            </div>

            <div className="card-avatar">
              <div className="avatar-placeholder">
                <Gamepad2 size={60} strokeWidth={1.5} />
              </div>
            </div>

            <div className="card-footer">
              <div className="barcode"></div>
              <span>ID: 8492-HL7-XR</span>
            </div>
          </div>
        </div>

        {/* --- BACK FACE --- */}
        <div className="card-face card-back" style={{ userSelect: 'none' }}>
          <div className="card-glare" style={{ background: `radial-gradient(farthest-corner circle at ${glareX}% ${glareY}%, rgba(255, 42, 95, 0.4) 0%, rgba(255, 255, 255, 0) 60%)` }} />
          <div className="card-back-logo">RIZEN</div>
        </div>

      </div>
    </div>
  );
}
