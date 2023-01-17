# API 주석에 TSDoc 사용하기

```ts
/** 인사말을 생성합니다. 결과는 보기 좋게 꾸며집니다.
 *
 * @param name 인사할 사람의 이름
 * @returns 사람이 보기 좋은 형태의 인사말
 */
function greet(name) {
  return `Hello ${name}`;
}

interface Foo {
  /** 사용자의 이름 */
  name: string;
}
```

## 요약

- 익스포트된 함수, 클래스, 타입에 주석을 달 때는 JSDoc/TSDoc 형태를 사용한다.
  JSDoc/TSDoc 형태의 주석을 달면 편집기가 주석 정보를 표시해 준다.

- @param, @returns 구문과 문서 서식을 위해 마크다운을 사용할 수 있다.

- 주석에 타입 정보를 포함하면 안된다.
