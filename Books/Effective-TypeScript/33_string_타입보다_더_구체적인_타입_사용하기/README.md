# string 타입보다 더 구체적인 타입 사용하기

string은 any와 비슷한 문제를 가지고 있고, 이런 string 타입을 남발된 코드를 "stringly typed(문자열을 남발하여 선언되었다)"고 표현한다.

## pluck 예제

```ts
function pluck<T, K extends keyof T>(records: T[], key: K): T[K][] {
  return records.map((r) => r[key]);
}
```

## 요약

- 문자열을 남발하여 선언된 코드를 피하자. 모든 문자열을 할당할 수 있는 string 타입보다는 더 구체적인 타입을 사용하는 것이 좋다.

- 변수의 범위를 보다 정확하게 표현하고 싶다면 string 타입보다는 문자열 리터럴 타입의 유니온을 사용하면 된다.
  타입 체크를 더 엄격히 할 수 있고 생산성을 향상시킬 수 있다.

- 객체의 속성 이름을 함수 매개변수로 받을 때는 string보다 keyof T를 사용하는 것이 좋다.
