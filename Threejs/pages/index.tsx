import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";

import { Environment } from "@react-three/drei";

export default function home() {
  return (
    <div>
      <h1>is this awesome?</h1>

      <Canvas shadows>
        <ambientLight intensity={1} />

        <Suspense fallback={null}>
          <boxGeometry />
          <meshStandardMaterial />
          <Environment preset="city" />
        </Suspense>
      </Canvas>
    </div>
  );
}
