# any 타입은 가능한 한 좁은 범위에서만 사용하기

```ts
// worse
function f1() {
  const x: any = returnFoo();
  processBar(x);
}

// better
function f2() {
  const x = returnFoo();
  processBar(x as any);
}

// worse
const config: Config = {
  a: 1,
  b: 2,
  c: {
    key: value,
  },
} as any;

// better
const config: Conifg = {
  a: 1,
  b: 2,
  c: {
    key: value as any,
  },
};
```

## 요약

- 의도치 않은 타입 안전성의 손실을 피하기 위해서 any의 사용 범위를 최소한으로 좁혀야 한다.

- 함수의 반환 타입이 any인 경우 타입 안정성이 나빠진다.
  따라서 any 타입을 반환하면 절대 안된다.

- 강제로 타입 오류를 제거하려면 any 대신 `@ts-ignore`를 사용하는 것이 좋다.
