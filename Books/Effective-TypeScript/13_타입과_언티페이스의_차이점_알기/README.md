# 타입과 인터페이스의 차이점 알기

## 비슷한 점

- 인덱스 시그니처

```ts
type T = {
  [key: string]: string;
};

interface I {
  [key: string]: string;
}
```

- 함수 타입

```ts
type T = (x: number) => string;

interface I {
  (x: number): string;
}

const toStrT: T = (x) => x.toString();
const toStrI: I = (x) => x.toString();
```

- 제너릭
- 확장
- 클래스 구현 (implements)

## 다른 점

- 유니온 타입

```ts
type AorB = "A" | "B";
```

- 유니온 타입에 name 속성을 붙인 타입을 만들 수도 있음

```ts
type Named = (FooType | BarType) & { name: string };
```

- 튜플과 배열 타입은 type 별칭을 사용하는 게 더 간결

- 인터페이스는 보강이 가능 (augment)

```ts
interface Foo {
  name: string;
}

interface Foo {
  age: number;
}

const oh: Foo = {
  name: "hs",
  age: 26,
}; // 정상
```

> 이 예제처럼 속성을 확장하는 것을 선언 병합(declaration merging)이라고 한다

주로 타입 선언 파일에 사용된다.

예를 들어 Array 인터페이스는 `lib.es5.d.ts`에 정의되어 있고 기본적으로 사용되는데, tsconfig의 lib 목록에 `ES2015`를 추가하면 타입스크립트는 `lib.es2015.d.ts`에 선언된 인터페이스를 병합한다.

결과적으로 각 선언이 병합되어 전체 메서드를 가지는 하나의 Array 타입을 얻게 된다.

> 프로젝트 내부적으로 사용되는 타입에 선언 병합이 발생하는 것은 잘못된 설계이다.

## 요약

- 타입과 인터페이스의 차이점과 비슷한 점을 이해해야 한다.
- 한 타입을 type과 interface 두 가지 문법을 사용해서 작성하는 방법을 터득해야 한다.
- 프로젝트에서 어떤 문법을 사용할지 결정할 때 한 가지 일관된 스타일을 확립하고, 보강 기법이 필요한지 고려해야 한다.
