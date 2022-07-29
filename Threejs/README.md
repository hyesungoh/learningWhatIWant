# React Three fiber with Next.js

## 설치

```BASH
yarn add three @react-three/fiber
```

- typescript

```BASH
yarn add @types/three
```

### Next.js

```BASH
yarn add next-transpile-modules -D
```

```js
// next.config.js
const withTM = require("next-transpile-modules")(["three"]);

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
};

module.exports = withTM(nextConfig);
```

> 'next/babel' 오류 시, eslint extends에 'next/babel' 추가

## Controls

`@react-three/drei` 를 설치해 여러가지 컨트롤 컴포넌트를 사용할 수 있음

```BASH
yarn add @react-three/drei
```

```tsx
<Canvas camera={{ near: 0.1, far: 1000, zoom: 1 }}>
  <OrbitControls />

  <Suspense fallback={null}>
    <Scene />
  </Suspense>
</Canvas>
```

## FBX model 색상 지정

```tsx
function Pill() {
  const fbx = useFBX("/pill.fbx");

  return (
    <mesh {...fbx.children[0]}>
      <meshStandardMaterial color="red" />
    </mesh>
  );
}
````
