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

  const lastScrollY = useRef(0);

  useFrame((state, delta) => {
    // Completely pause the continuous rotation on mobile to save GPU cycles, but still apply scroll parallax
    if (ref.current) {
      if (!isMobile) {
        ref.current.rotation.x -= delta / 10;
        ref.current.rotation.y -= delta / 15;
      }
      
      // Apply parallax using rotation instead of position so the sphere never runs out of stars
      const scrollDelta = window.scrollY - lastScrollY.current;
      if (scrollDelta !== 0) {
        ref.current.rotation.x -= scrollDelta * 0.0005;
        lastScrollY.current = window.scrollY;
      }
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
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;
  const dpr = isMobile ? [1, 1] : [1, 2];
  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: -1, height: '100%', width: '100%', pointerEvents: 'none' }}>
      <Canvas camera={{ position: [0, 0, 1] }} dpr={dpr} frameloop={isMobile ? "demand" : "always"} style={{ pointerEvents: 'none' }}>
        <Suspense fallback={null}>
          <Stars />
        </Suspense>
        <Preload all />
      </Canvas>
    </div>
  );
};

export default React.memo(StarsCanvas);
