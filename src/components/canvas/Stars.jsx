import React, { useState, useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial, Preload } from "@react-three/drei";
import * as random from "maath/random/dist/maath-random.esm";

const Stars = (props) => {
  const ref = useRef();
  
  // Detect mobile and drastically reduce particle count
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;
  const numStars = isMobile ? 500 : 1600; // 500 points on mobile, 1600 on desktop
  const [sphere] = useState(() => random.inSphere(new Float32Array(numStars * 3), { radius: 1.2 }));

  useFrame((state, delta) => {
    // Completely pause the animation loop on mobile to save GPU cycles
    if (ref.current && !isMobile) {
      ref.current.rotation.x -= delta / 10;
      ref.current.rotation.y -= delta / 15;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled {...props}>
        <PointMaterial
          transparent
          color="#f272c8"
          size={0.002}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
};

const StarsCanvas = () => {
  const dpr = typeof window !== 'undefined' && window.innerWidth <= 768 ? [1, 1] : [1, 2];
  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: -1, height: '100%', width: '100%', pointerEvents: 'none' }}>
      <Canvas camera={{ position: [0, 0, 1] }} dpr={dpr} style={{ pointerEvents: 'none' }}>
        <Suspense fallback={null}>
          <Stars />
        </Suspense>
        <Preload all />
      </Canvas>
    </div>
  );
};

export default React.memo(StarsCanvas);
