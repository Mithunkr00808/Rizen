import React, { Suspense, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, useGLTF, useProgress, Html } from '@react-three/drei';

function Loader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <div style={{ 
        color: '#00ffcc', 
        fontFamily: 'monospace', 
        fontSize: '1.2rem', 
        textShadow: '0 0 10px rgba(0, 255, 204, 0.5)',
        whiteSpace: 'nowrap'
      }}>
        LOADING ASSETS... {progress.toFixed(0)}%
      </div>
    </Html>
  );
}

const BmwModel = ({ onLoad, isMobile }) => {
  const { scene } = useGLTF('/bmw_m_hybrid_v8_lmdh.glb');
  
  useEffect(() => {
    if (scene) onLoad();
  }, [scene, onLoad]);
  
  // Hide any bounding boxes or studio meshes that came with the model
  scene.traverse((child) => {
    if (child.isMesh) {
      // Common names for studio/room/box meshes in Sketchfab models
      const name = child.name.toLowerCase();
      if (name.includes('box') || name.includes('room') || name.includes('studio') || name.includes('plane') || name.includes('ground') || name.includes('floor')) {
        child.visible = false;
      }
      
      // Also some Sketchfab models have a literal bounding box with a specific material
      if (child.material && child.material.name) {
          const matName = child.material.name.toLowerCase();
          if (matName.includes('wireframe') || matName === 'material.002' || matName === 'material') {
              child.visible = false;
          }
      }
    }
  });

  return (
    <primitive object={scene} position={[0, 0, 0]} scale={isMobile ? 0.6 : 1.0} />
  );
};

const BmwViewer = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div style={{ 
      width: '100%', 
      display: 'flex',
      flexDirection: 'column',
      opacity: isLoaded ? 1 : 0,
      transition: 'opacity 2s ease-in-out'
    }}>

      {/* Content Row: Car + Map */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', flexWrap: 'wrap' }}>

        {/* Left side: Car Model */}
        <div style={{ 
          flex: 1, 
          minWidth: '300px',
          height: '500px', 
          overflow: 'hidden', 
          position: 'relative', 
          zIndex: 10, 
          cursor: 'grab',
        }}>
          <Canvas camera={{ position: [5, 2, 5], fov: isMobile ? 55 : 35 }}>
            <Suspense fallback={<Loader />}>
              <Environment preset="city" />
              <BmwModel onLoad={() => setIsLoaded(true)} isMobile={isMobile} />
              <OrbitControls 
                autoRotate 
                autoRotateSpeed={0.8} 
                enableDamping 
                minDistance={3} 
                maxDistance={12} 
                maxPolarAngle={Math.PI / 2 - 0.05}
              />
            </Suspense>
          </Canvas>
        </div>

        {/* Right side: Nurburgring Map */}
        <div style={{ 
          flex: 1, 
          minWidth: '300px',
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          height: '500px',
          padding: '2rem',
          boxSizing: 'border-box'
        }}>
          <img 
            src="/nurburgring.svg" 
            alt="Nurburgring Nordschleife Map" 
            style={{ 
              width: '100%', 
              maxWidth: '400px',
              filter: 'drop-shadow(0 0 20px rgba(0, 255, 204, 0.5))'
            }} 
          />
        </div>

      </div>

      {/* Labels Row: Both on the same line */}
      <div style={{ display: 'flex', gap: '2rem', marginTop: '1rem', flexWrap: 'wrap' }}>
        <h3 style={{ 
          flex: 1, 
          minWidth: '300px',
          color: '#fff', 
          margin: 0,
          fontFamily: 'monospace', 
          fontSize: '1.1rem',
          letterSpacing: '3px',
          textTransform: 'uppercase',
          textAlign: 'center',
          textShadow: '0 0 10px rgba(0, 255, 204, 0.4)'
        }}>
          BMW M Hybrid V8 LMDh
        </h3>
        <h3 style={{ 
          flex: 1, 
          minWidth: '300px',
          color: '#fff', 
          margin: 0,
          fontFamily: 'monospace', 
          fontSize: '1.1rem',
          letterSpacing: '3px',
          textTransform: 'uppercase',
          textAlign: 'center',
          textShadow: '0 0 10px rgba(0, 255, 204, 0.4)'
        }}>
          Nürburgring Nordschleife
        </h3>
      </div>

    </div>
  );
};

export default BmwViewer;

// Preload the heavy GLTF model immediately in the background on page load
useGLTF.preload('/bmw_m_hybrid_v8_lmdh.glb');


