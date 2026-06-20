import React, { useState, useRef } from "react";

export default function Carousel3D({
  items = [],
  cardWidth = 280, // width in pixels
  perspective = "1200px",
  radius: fixedRadius, // optional fixed radius
  containerClassName = "",
  itemClassName = "",
}) {
  const n = items.length;
  
  const [rotation, setRotation] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const startX = useRef(0);
  const startRotation = useRef(0);

  if (n === 0) return null;

  // Calculate the radius (translateZ) purely in JS for perfect cross-browser support
  const gap = 20; // 20px gap between cards
  const calculatedRadius = Math.max((cardWidth / 2 + gap) / Math.tan(Math.PI / n), cardWidth); // Ensure minimum radius
  const radius = fixedRadius || calculatedRadius;

  const handlePointerDown = (e) => {
    setIsDragging(true);
    startX.current = e.clientX || (e.touches && e.touches[0].clientX);
    startRotation.current = rotation;
  };

  const handlePointerMove = (e) => {
    if (!isDragging) return;
    const clientX = e.clientX || (e.touches && e.touches[0].clientX);
    const deltaX = clientX - startX.current;
    
    // Convert pixel delta to degrees. Reduced multiplier for slower, precise rotation.
    const newRotation = startRotation.current + (deltaX * 0.05);
    setRotation(newRotation);
  };

  const handlePointerUp = () => {
    setIsDragging(false);
  };

  return (
    <div
      className={containerClassName}
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        minHeight: "450px",
        perspective: perspective,
        cursor: isDragging ? "grabbing" : "grab",
        touchAction: "none", // Prevent page scrolling while dragging
      }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
      onPointerCancel={handlePointerUp}
    >
      <div
        style={{
          position: "relative",
          width: `${cardWidth}px`,
          height: "450px", // Increased to support ultra-tall portrait cards
          transformStyle: "preserve-3d",
          transform: `translateZ(-${radius}px) rotateY(${rotation}deg)`,
          transition: isDragging ? "none" : "transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)",
        }}
      >
        {items.map((item, i) => (
          <div
            key={i}
            className={itemClassName}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
              transform: `rotateY(${i * (360 / n)}deg) translateZ(${radius}px)`,
              // Prevent images/text from being highlighted or dragged natively
              userSelect: "none",
              pointerEvents: isDragging ? "none" : "auto",
            }}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}
