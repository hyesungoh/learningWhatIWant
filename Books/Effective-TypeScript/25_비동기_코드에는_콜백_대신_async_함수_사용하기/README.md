# 비동기 코드에는 콜백 대신 async 함수 사용하기

## 콜백, 프로미스, async await

#### 콜백보다 프로미스인 이유

- 콜백보다는 프로미스가 코드를 작성하기 쉽다.
- 콜백보다는 프로미스가 타입을 추론하기 쉽다.

#### 프로미스를 생성하기보다 async/await를 사용해야하는 이유

- 일반적으로 더 간결하고 직관적인 코드가 된다.
- async 함수는 항상 프로미스를 반환하도록 강제된다.
  - 반동기 함수 같은 경우를 배제한다.

#### Promise.race와 타입 추론 예제

```ts
function timeout(millis: number): Promise<never> {
  return new Promise((resolve, reject) => {
    setTimeout(() => reject("timeout", millis));
  });
}

async function fetchWithTimeout(url: string, ms: number) {
  return Promise.race([fetch(url), timeout(ms)]);
}
```

`fetchWithTimeout`의 반환 타입은 `Promise<Response>`로 추론된다.

추론 단계는 다음과 같다.

1. Promise.race의 반환 타입은 입력 타입들의 유니온이라 `Promise<Response | never>`가 된다.
2. 그러나 never와의 유니온은 아무런 효과가 없어 `Promise<Response>`가 된다.

## 요약

- 콜백보다는 프로미스를 사용하는 게 코드 작성과 타입 추론 면에서 유리하다.

- 가능하면 프로미스를 생성하기보다 async/await를 사용하는 것이 좋다.
  간결하고 직관적인 코드를 작성할 수 있고 모든 종류의 오류를 제거할 수 있다.

- 어떤 함수가 프로미스를 반환한다면 async로 선언하는 것이 좋다.
