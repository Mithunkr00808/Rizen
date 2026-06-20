import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Image } from '@react-three/drei';
import * as THREE from 'three';

const TrackMap = ({ position = [0, 0, 0], rotation = [0, 0, 0], scale = 1 }) => {
  const imageRef = useRef();

  useFrame((state) => {
    if (imageRef.current) {
      // Add a subtle hovering effect
      imageRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime) * 0.1;
    }
  });

  return (
    <group position={position} rotation={rotation} scale={scale}>
      <Image
        ref={imageRef}
        url="/nurburgring_map.png"
        transparent
        opacity={0.9}
        scale={[6, 4]} // Aspect ratio of the generated track map
        position={[0, 0, 0]}
        toneMapped={false}
      />
      {/* Add a subtle glow behind it */}
      <mesh position={[0, 0, -0.1]}>
        <planeGeometry args={[6, 4]} />
        <meshBasicMaterial color="#00ffcc" transparent opacity={0.15} blending={THREE.AdditiveBlending} />
      </mesh>
    </group>
  );
};

export default TrackMap;
