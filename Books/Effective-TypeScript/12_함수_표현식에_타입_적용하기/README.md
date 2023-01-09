# 함수 표현식에 타입 적용하기

자바스크립트, 타입스크립트에서는 함수 문장(statement)과 함수 표현식(expression)을 다르게 인식한다.

```ts
function rollDice1(sides: number): number {} // 문장

const rollDice2 = function (sides: number): number {}; // 표현식
const rollDice3 = (sides: number): number => {}; // 표현식
```

타입스크립트에서는 함수 표현식을 사용하는 것이 좋다.

- 함수의 매개변수부터 반환값까지 전체를 함수 타입으로 선언하여 함수 표현식에 재사용할 수 있다는 장점이 있기 때문
- 타입 구문이 적고, 구현부가 분리되어 있어 로직이 보다 분명해진다.

```ts
// 문장
function add(a: number, b: number) {
  return a + b;
}
function sum(a: number, b: number) {
  return a - b;
}

type BinaryFn = (a: number, b: number) => number;
const add: BinaryFn = (a, b) => a + b;
const sum: BinaryFn = (a, b) => a - b;
```

라이브러리는 공통 함수 시그니처를 타입으로 제공하기도 한다.

> 리액트의 매개변수에 명시하는 `MouseEvent` 타입 대신에 함수 전체에 적용할 수 있는 `MouseEventHandler`

## 요약

- 매개변수나 반환 값에 타입을 명시하기보다는 함수 표현식 전체에 타입 구문을 적용하는 것이 좋다.

- 만약 같은 타입 시그니처를 반복적으로 작성한 코드가 있다면 함수 타입을 분리해 내거나 이미 존재하는 타입을 찾아보도록 한다.
  라이브러리를 직접 만든다면 공통 콜백에 타입을 제공해야 한다.

- 다른 함수의 시그니처를 참조하려면 `typeof fn`을 사용하면 된다.
