import { Canvas, useLoader } from "@react-three/fiber";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";

export default function home() {
  return (
    <div>
      <h1>basic getting started</h1>

      <Canvas>
        <ambientLight intensity={0.1} />
        <directionalLight color="red" position={[0, 0, 5]} />

        <mesh>
          <boxGeometry />
          <meshStandardMaterial />
        </mesh>
        <Pill />
      </Canvas>
    </div>
  );
}

function Pill() {
  const fbx = useLoader(FBXLoader, "/pill.fbx");
  return <primitive object={fbx} />;
}
