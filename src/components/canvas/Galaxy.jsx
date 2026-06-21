import React, { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

const GalaxyParticles = () => {
  const pointsRef = useRef();
  const count = 50000;
  
  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);

    const colorInside = new THREE.Color(0xff6030);
    const colorOutside = new THREE.Color(0x1b3984);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const radius = Math.random() * 4.5; // Condensed further to prevent edge clipping
      const spinAngle = radius * 1.2;
      const branchAngle = ((i % 4) / 4) * Math.PI * 2;

      // Reduced randomness to prevent dust particles from shooting outside the canvas bounding box
      const randomness = 0.4;
      const randomX = Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * randomness * radius;
      const randomY = Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * randomness * radius;
      const randomZ = Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * randomness * radius;

      pos[i3] = Math.cos(branchAngle + spinAngle) * radius + randomX;
      pos[i3 + 1] = randomY;
      pos[i3 + 2] = Math.sin(branchAngle + spinAngle) * radius + randomZ;

      const mixedColor = colorInside.clone();
      mixedColor.lerp(colorOutside, radius / 4.5);
      col[i3] = mixedColor.r;
      col[i3 + 1] = mixedColor.g;
      col[i3 + 2] = mixedColor.b;
    }
    
    return [pos, col];
  }, [count]);

  useFrame(() => {
    if (pointsRef.current) {
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
        size={0.05} 
        sizeAttenuation={true} 
        depthWrite={false} 
        blending={THREE.AdditiveBlending} 
        vertexColors={true} 
      />
    </points>
  );
};

const GalaxyCanvas = () => {
  return (
    <div style={{ width: '100%', height: '100%', pointerEvents: 'auto' }}>
      <Canvas camera={{ position: [0, 8, 12], fov: 75 }} gl={{ antialias: true }}>
        <OrbitControls enableZoom={false} enableDamping={true} dampingFactor={0.05} />
        <GalaxyParticles />
      </Canvas>
    </div>
  );
};

export default React.memo(GalaxyCanvas);
