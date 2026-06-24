import React, { useMemo, useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

const GalaxyParticles = ({ isVisible }) => {
  const pointsRef = useRef();
  
  // Drop particle count drastically on mobile to save GPU fill-rate!
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;
  const count = isMobile ? 800 : 50000;
  
  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);

    const colorInside = new THREE.Color(0xff6030);
    const colorOutside = new THREE.Color(0x1b3984);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const radius = Math.random() * 9; 
      const spinAngle = radius * 1.2;
      const branchAngle = ((i % 4) / 4) * Math.PI * 2;

      const randomness = 0.4;
      const randomX = Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * randomness * radius;
      const randomY = Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * randomness * radius;
      const randomZ = Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * randomness * radius;

      pos[i3] = Math.cos(branchAngle + spinAngle) * radius + randomX;
      pos[i3 + 1] = randomY;
      pos[i3 + 2] = Math.sin(branchAngle + spinAngle) * radius + randomZ;

      const mixedColor = colorInside.clone();
      mixedColor.lerp(colorOutside, radius / 9);
      col[i3] = mixedColor.r;
      col[i3 + 1] = mixedColor.g;
      col[i3 + 2] = mixedColor.b;
    }
    
    return [pos, col];
  }, [count]);

  useFrame(() => {
    // Only spin the massive galaxy if it is actually visible on screen!
    if (pointsRef.current && isVisible) {
      pointsRef.current.rotation.y += 0.001;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-color" count={count} array={colors} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial 
        size={isMobile ? 0.03 : 0.05} 
        sizeAttenuation={true} 
        depthWrite={false} 
        blending={isMobile ? THREE.NormalBlending : THREE.AdditiveBlending} 
        vertexColors={true} 
      />
    </points>
  );
};

const GalaxyCanvas = () => {
  const containerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (!containerRef.current) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { rootMargin: '100px' } // Add a 100px buffer before it unmounts to prevent visual popping
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;
  const dpr = isMobile ? [1, 1] : [1, 2];

  return (
    <div ref={containerRef} style={{ width: '100%', height: '100%', pointerEvents: 'auto' }}>
      <Canvas 
        camera={{ position: [0, 14, 21], fov: 75 }} 
        gl={{ antialias: false, powerPreference: "high-performance" }}
        dpr={dpr}
        frameloop={isVisible ? 'always' : 'demand'}
      >
        <OrbitControls enableZoom={false} enableDamping={true} dampingFactor={0.05} />
        <GalaxyParticles isVisible={isVisible} />
      </Canvas>
    </div>
  );
};

export default React.memo(GalaxyCanvas);
