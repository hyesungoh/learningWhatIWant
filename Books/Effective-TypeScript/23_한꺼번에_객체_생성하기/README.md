# 한꺼번에 객체 생성하기

## 조건부 속성 추가하기

```ts
const firstLast = { first: "foo", last: "bar" };
const president = { ...firstLast, ...(hasMiddle ? { middle: "S" } : {}) };
// const president = { ...firstLast, ...(hasMiddle ? { middle: "S" } : null) };
```

위처럼 전개 연산자와 함께 사용하면 아래처럼 조건부 속성으로 추론되는 것을 볼 수 있음

```ts
const president: {
  middle?: string;
  first: string;
  last: string;
};
```

마찬가지로 전개 연산자를 이용해 여러 속성을 추가할 수도 있음

```ts
const nameTitle = { name: "foo", title: "bar" };
const pharaoh = {
  ...nameTitle,
  ...(hasDates ? { start: 2022, end: 2023 } : {}),
};
```

다만 여러 속성을 추가하는 경우 유니온 타입으로 추론됨

```ts
const pharaoh:
  | {
      start: number;
      end: number;
      name: string;
      title: string;
    }
  | {
      name: string;
      title: string;
    };
```

이런 경우에는 다음과 같은 헬퍼 함수를 이용할 수 있음

```ts
function addOptional<T extends object, U extends object>(
  a: T,
  b: U | null
): T & Partial<U> {
  return { ...a, ...b };
}

const pharaoh = addOptional(
  nameTitle,
  hasDates ? { start: 2022, end: 2023 } : null
);
```

## 요약

- 속성을 제각각 추가하지 말고 한꺼번에 객체로 만들어야 한다.
  안전한 타입으로 속성을 추가하려면 객체 전개(`{...a, ...b}`)를 사용하면 된다.

- 객체에 조건부로 속성을 추가하는 방법을 익히도록 한다.
