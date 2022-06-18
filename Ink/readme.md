## Ink 프로젝트 생성

1. with `create-ink-app`

```bash

npx create-ink-app

# typescript
npx create-ink-app --typescript

```

## 프로젝트 실행

```bash
yarn start
```

빌드 후 실행

```bash
yarn build

ink # dist/cli.js가 실행됨
```

## Input

```bash
npm install ink-text-input
```

```jsx
import TextInput from "ink-text-input";

function App() {
  const [nickname, setNickname] = useState < string > "";

  return (
    <Box>
      <TextInput
        placeholder="Enter your name"
        value={nickname}
        onChange={setNickname}
      />
    </Box>
  );
}
```
