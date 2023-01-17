# 테스팅 타입의 함정에 주의하기

테스트 코드를 작성하는 것은 필수이며, 타입 선언도 테스트를 거쳐야 한다.

이를 위해 헬퍼 함수를 정의할 수 있다

```ts
function assertType<T>(x: T) {}

assertType<number[]>(map(["foo", "bar"], (name) => name.length));
```

하지만 위 헬퍼 함수는 문제점이 있는데, 두 타입이 동일한지 체크하는 것이 아니라 할당 가능한 지를 체크하고 있는 것이다.

```ts
const n = 12;
assertType<number>(n); // 정상
```

위 예제에서 n은 숫자 리터럴 타입 `12` 이지만, number의 서브타입이기 때문에 통과한다.

또한 함수를 넣어보면 이상한 결과가 나오는 것을 볼 수 있다.

```ts
const add = (a: number, b: number) => a + b;
assertType<(a: number, b: number) => number>(add); // 정상

const double = (x: number) => 2 * x;
assertType<(a: number, b: number) => number>(double); // 정상 ?!
```

위 double 함수의 체크가 성공하는 이유는,

**타입스크립트의 함수는 매개변수가 더 적은 함수 타입에 할당 가능하기 때문이다.**

이를 해결하기 위해 `Parameters`, `ReturnType`을 이용해 분리해 테스트할 수 있다.

> 궁극적으로는 dtslint, tsd 같은 도구를 사용할 수 있다.

## 요약

- 타입을 테스트할 때는 특히 함수 타입의 동일성(equality)과 할당 가능성(assignability)의 차이점을 알고 있어야 한다.

- 콜백이 있는 함수를 테스트할 때, 콜백 매개변수의 추론된 타입을 체크해야 한다.
  또한 this가 API의 일부분이라면 역시 테스트해야 한다.

- 타입 관련된 테스트에서 any를 주의해야 한다.
  더 엄격한 테스트를 위해 dtslint 같은 도구를 사용하는 것이 좋다. (tsd도 있음)
