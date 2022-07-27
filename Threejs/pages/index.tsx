import { Canvas, useFrame } from "@react-three/fiber";

export default function home() {
  return (
    <div>
      <h1>is this awesome?</h1>

      <Canvas>
        <ambientLight intensity={0.1} />
        <directionalLight color="red" position={[0, 0, 5]} />

        <mesh>
          <boxGeometry />
          <meshStandardMaterial />
        </mesh>
      </Canvas>
    </div>
  );
}
