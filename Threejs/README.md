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
