# 타입 단언보다는 타입 선언을 사용하기

- 타입 단언(as Type)보다 타입 선언(: Type)을 사용해야 한다.

- 화살표 함수의 반환 타입을 명시하는 방법을 터득해야 한다.

```ts
interface Person = {
  name: string;
}

const names = ['foo', 'bar', 'baz'];

const person = names.map(name => ({name})); // Person[]을 원했지만 {name: string;}[]

const person = names.map((name): Person => ({name})); // Person[]
```

- 타입스크립트보다 타입 정보를 더 잘 알고 있느 상황에서는 타입 단언문과 null 아님 단던문을 사용하면 된다.

```ts
const eNull = document.getElementById("foo"); // HTMLElement | null
const e = document.getElementById("foo")!; // HTMLElement
```
