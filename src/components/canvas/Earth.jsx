import { Suspense, useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Preload, useGLTF } from "@react-three/drei";

const RotatingEarth = ({ rotation }) => {
  const earthRef = useRef();

  useFrame((_, delta) => {
    if (!earthRef.current) return;
    // Always auto-rotate slightly, plus apply user drag
    rotation.autoY += delta * 0.3;
    earthRef.current.rotation.y = rotation.autoY + rotation.dragY;
    earthRef.current.rotation.x = 0.15 + rotation.dragX;
  });

  const { scene } = useGLTF("/planet/scene.gltf");
  return <primitive ref={earthRef} object={scene} scale={3.2} />;
};

const EarthCanvas = () => {
  const containerRef = useRef(null);
  // Single mutable rotation object — no state, no re-renders
  const rotation = useRef({ autoY: 0, dragY: 0, dragX: 0 });
  const drag = useRef({ active: false, lastX: 0, lastY: 0 });

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const onDown = (e) => {
      drag.current.active = true;
      drag.current.lastX = e.clientX;
      drag.current.lastY = e.clientY;
      el.setPointerCapture(e.pointerId);
    };

    const onMove = (e) => {
      if (!drag.current.active) return;
      const dx = e.clientX - drag.current.lastX;
      const dy = e.clientY - drag.current.lastY;
      drag.current.lastX = e.clientX;
      drag.current.lastY = e.clientY;
      // Accumulate drag rotation (sensitivity: 0.005 radians per pixel)
      rotation.current.dragY += dx * 0.008;
      rotation.current.dragX += dy * 0.005;
      // Clamp vertical tilt so globe doesn't flip
      rotation.current.dragX = Math.max(-0.6, Math.min(0.6, rotation.current.dragX));
    };

    const onUp = () => {
      drag.current.active = false;
    };

    el.addEventListener("pointerdown", onDown);
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerup", onUp);
    el.addEventListener("pointercancel", onUp);
    el.addEventListener("pointerleave", onUp);

    return () => {
      el.removeEventListener("pointerdown", onDown);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerup", onUp);
      el.removeEventListener("pointercancel", onUp);
      el.removeEventListener("pointerleave", onUp);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        width: "100%",
        height: "100%",
        cursor: "grab",
        touchAction: "none",
        userSelect: "none",
      }}
    >
      <Canvas
        camera={{ fov: 45, near: 0.1, far: 200, position: [-4, 3, 6] }}
        gl={{ preserveDrawingBuffer: true }}
        style={{ pointerEvents: "none" }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={1.2} />
        <Suspense fallback={null}>
          <RotatingEarth rotation={rotation.current} />
          <Preload all />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default EarthCanvas;

// Preload the heavy GLTF model immediately in the background on page load
useGLTF.preload("/planet/scene.gltf");
