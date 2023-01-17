# 오버로딩 타입보다는 조건부 타입을 사용하기

오버로딩 타입을 사용한다면

```ts
function double(x: number): number;
function double(x: string): string;

// 위 예는 x: number|string 타입을 인자로 받지 못한다.
```

조건부 타입을 사용한다면

```ts
function double<T extends string | number>(
  x: T
): T extends string ? string : number;
```

각각의 오버로딩 타입이 독립적으로 처리되는 반면, 조건부 타입은 타입 체커가 단일 표현식으로 받아들이기 때문에 유니온 문제를 해결할 수 있다.

> 오버로딩 타입을 작성 중이라면 조건부 타입을 사용해서 개선할 수 있을 지 검토해 보자

## 요약

- 오버로딩 타입보다 조건부 타입을 사용하는 것이 좋다.
  조건부 타입은 추가적인 오버로딩 없이 유니온 타입을 지원할 수 있다.
