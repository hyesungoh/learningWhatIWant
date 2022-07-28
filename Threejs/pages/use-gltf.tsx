import * as THREE from "three";
import { OrbitControls, useGLTF } from "@react-three/drei";
import {
  Canvas,
  PrimitiveProps,
  ThreeElements,
  useFrame,
} from "@react-three/fiber";
import { Suspense, useRef } from "react";

function Scene() {
  const spaceRef = useRef<THREE.Mesh>(null);
  const { scene } = useGLTF("/space.gltf");

  useFrame(() => {
    spaceRef.current!.rotation.y += 0.0001;
  });

  return (
    <>
      <gridHelper />
      <primitive ref={spaceRef} object={scene} position={[-1.5, -1.4, 1.5]} />
    </>
  );
}

export default function GLTFExample() {
  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      <Canvas
        shadows
        camera={{ near: 0.1, far: 1000, zoom: 1 }}
        onCreated={({ gl }) => {
          gl.setClearColor("#000");
        }}
      >
        <OrbitControls />

        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  );
}
