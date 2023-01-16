# 모르는 타입의 값에는 any 대신 unknown을 사용하기

any가 강력하고 위험한 이유는 다음과 같다.

- 어떠한 타입이든 any 타입에 할당 가능하다.
- any 타입은 never를 제외한 모든 타입으로도 할당 가능하다.

타입 체커는 집합 기반이기 때문에 any를 사용하면 타입 체커가 무용지물이 되기 때문이다.

허나 unknown은

- 어떤한 타입이든 unknown 타입에 할당 가능하다.
- unknown은 오직 unknownrㅘ any에만 할당 가능하다.

집합의 관점에서 더욱 안전하다.

## `{}`, `object`, `unknown` type의 차이점

{}와 object는 unknown만큼 넓은 타입이지만, unknown보다는 범위가 약간 좁다

- `{}` 타입은 null과 undefined를 제외한 모든 값을 포함한다.
- `object` 타입은 모든 비기본형(non-primitive) 타입으로 이루어진다.

## 요약

- unknown은 any 대신 사용할 수 있는 안전한 타입이다.
  어떠한 값이 있지만 그 타입을 알지 못하는 경우라면 unknown을 사용하면 된다.

- 사용자가 타입 단언문이나 타입 체크를 사용하도록 강제하려면 unknown을 사용하면 된다.

- `{}`, `object`, `unknown`의 차이점을 이해해야 한다.
