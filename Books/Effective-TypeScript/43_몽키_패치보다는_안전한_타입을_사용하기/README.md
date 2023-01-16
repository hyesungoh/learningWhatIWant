# 몽키 패치보다는 안전한 타입을 사용하기

자바스크립트의 가장 유명한 특징 중 하나인 몽키패치는, 객체와 클래스에 임의의 속성을 추가할 수 있을 만큼 유연하다는 것

```ts
document.monkey = "Foo";
```

## 안전한 타입 접근법

### 보강

```tsx
interface Document {
  monkey: string;
}

document.monkey = "Foo";

// 모듈 관점에서는 global 선언을 추가

declare global {
  interface Document {
    monkey: string;
  }
}
```

### 사용자 정의 인터페이스 단언

```ts
interface MonkeyDocument extends Document {
  monkey: string;
}

(document as MonkeyDocument).monkey = "Bar";
```

## 요약

- 전역 변수나 DOM에 데이터를 저장하지 말고, 데이터를 분리하여 사용해야 한다.

- 내장 타입에 데이터를 저장해야 하는 경우, 안전한 타입 접근법 중 하나(보강, 사용자 정의 인터페이스로 단언)를 사용해야 한다.

- 보강이ㅡ 모듈 영역 문제를 이해해야 한다.
