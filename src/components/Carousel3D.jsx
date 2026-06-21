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
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;
  const effectiveCardWidth = isMobile ? Math.min(cardWidth, 200) : cardWidth;
  const containerHeight = isMobile ? 320 : 450;
  
  const [rotation, setRotation] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const startX = useRef(0);
  const startRotation = useRef(0);

  if (n === 0) return null;

  // Calculate the radius (translateZ) purely in JS for perfect cross-browser support
  const gap = isMobile ? 10 : 20; // smaller gap on mobile
  const calculatedRadius = Math.max((effectiveCardWidth / 2 + gap) / Math.tan(Math.PI / n), effectiveCardWidth); // Ensure minimum radius
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
        minHeight: `${containerHeight}px`,
        perspective: perspective,
        cursor: isDragging ? "grabbing" : "grab",
        touchAction: "pan-y", // Allow vertical scroll, horizontal drag rotates
        overflow: "visible",
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
          width: `${effectiveCardWidth}px`,
          height: `${containerHeight}px`,
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
