import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, Grid, ContactShadows, useGLTF } from "@react-three/drei";

// This loads the lambo model once you place "lambo.glb" in the public directory
const LamboModel = () => {
  // UNCOMMENT THIS ONCE YOU ADD lambo.glb TO THE public FOLDER
  // const { scene } = useGLTF('/lambo.glb');
  // return <primitive object={scene} position={[0, 0, 0]} />;

  // Fallback placeholder until lambo.glb is provided
  return (
    <group>
      <mesh position={[0, 0.5, 0]}>
        <boxGeometry args={[4, 1, 2]} />
        <meshStandardMaterial color="#ff0044" />
      </mesh>
      <mesh position={[0, 1.2, -0.2]}>
        <boxGeometry args={[2, 0.6, 1.8]} />
        <meshStandardMaterial color="#222" />
      </mesh>
    </group>
  );
};

const LamboViewer = () => {
  return (
    <div style={{ width: '100%', height: '500px', cursor: 'grab', position: 'relative', zIndex: 10, marginTop: '4rem' }}>
      <Canvas camera={{ position: [5, 2, 5], fov: 35 }} gl={{ preserveDrawingBuffer: true }}>
        <Suspense fallback={null}>
          
          {/* Environment Lighting (Replaces EnvAtlas) */}
          <Environment preset="city" />

          {/* Background Grid */}
          <Grid infiniteGrid fadeDistance={20} sectionColor="#00ffcc" cellColor="#ffffff" />

          {/* Shadow Catcher */}
          <ContactShadows position={[0, -0.01, 0]} opacity={0.7} scale={10} blur={2.5} far={4} />

          {/* Render the Model */}
          <LamboModel />

          {/* Auto-rotating Orbit Controls */}
          <OrbitControls 
            autoRotate 
            autoRotateSpeed={1} 
            enableDamping 
            minDistance={4} 
            maxDistance={12} 
            maxPolarAngle={Math.PI / 2 - 0.05} // prevent camera from going below ground
          />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default LamboViewer;
