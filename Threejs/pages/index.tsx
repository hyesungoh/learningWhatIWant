import * as THREE from "three";
import {
  Canvas,
  PrimitiveProps,
  ThreeElements,
  useFrame,
  useLoader,
} from "@react-three/fiber";
import { Suspense, useEffect, useMemo, useRef } from "react";

import { Environment, OrbitControls, useFBX } from "@react-three/drei";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import { DynamicDrawUsage, MeshBasicMaterial } from "three";

function Cube() {
  const cube = useRef<THREE.Mesh>(null);

  useFrame(() => {
    cube.current!.rotation.x += 0.01;
    cube.current!.rotation.y += 0.01;
  });

  return (
    <mesh ref={cube}>
      <boxBufferGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="red" />
    </mesh>
  );
}

function Scene() {
  return (
    <>
      <gridHelper />
      <axesHelper />
      <pointLight intensity={1.0} position={[5, 3, 5]} />
      <Cube />
      <Pill />
    </>
  );
}

export default function home() {
  return (
    <div>
      <h1>is this awesome?</h1>

      <div style={{ height: "100vh", width: "100vw" }}>
        <Canvas camera={{ near: 0.1, far: 1000, zoom: 1 }} shadows>
          <ambientLight intensity={1} />

          <OrbitControls />

          <Suspense fallback={null}>
            <Scene />
          </Suspense>
        </Canvas>
      </div>
    </div>
  );
}

function Pill() {
  const fbx = useFBX("/pill.fbx");

  return (
    <mesh {...fbx.children[0]}>
      <meshStandardMaterial color="red" />
    </mesh>
  );
}