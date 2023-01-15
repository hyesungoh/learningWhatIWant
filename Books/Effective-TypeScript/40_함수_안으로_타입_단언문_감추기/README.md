# 함수 안으로 타입 단언문 감추기

함수의 모든 부분을 안전한 타입으로 구현하는 것이 이상적이지만, 불필요한 예외 상황까지 고려해 가며 타입 정보를 힘들게 구성할 필요는 없다.

함수 내부에는 타입 단언을 사용하고 함수 외부로 드러나는 타입 정의를 정확히 명시하는 정도로 끝내는 게 낫다.

프로젝트 전반에 위험한 타입 단언문이 드러나 있는 것보다, 제대로 타입이 정의된 함수 안으로 타입 단언문을 감추는 것이 더 좋은 설계이다.

## 함수의 마지막 호출을 캐시하는 예제

```ts
// before
function cacheLast<T extends Function>(fn: T): T {
  let lastArgs: any[] | null = null;
  let lastResult: any;

  return function (...args: any[]) {
    // 에러 발생 (T 형식에 할당할 수 없습니다.)
    if (!lastArgs || !shallowEqual(lastArgs, args)) {
      lastResult = fn(...args);
      lastArgs = args;
    }
    return lastResult;
  };
}

// after
function cacheLast<T extends Function>(fn: T): T {
  let lastArgs: any[] | null = null;
  let lastResult: any;

  return function (...args: any[]) {
    if (!lastArgs || !shallowEqual(lastArgs, args)) {
      lastResult = fn(...args);
      lastArgs = args;
    }
    return lastResult;
  } as unknown as T;
}
```

> 앞의 코드에서는 사실 두 문제가 있다. 함수를 연속으로 호출하는 경우에 this의 값이 동일한지 체크하지 않고, 원본 함수가 객체처럼 속성 값을 가지고 있었다면 래퍼 함수에는 속성 값이 없기 때문에 타입이 달라진다.

## 객체를 매개변수로 비교하는 예제

```ts
// before
function shallowObjectEqual<T extends object>(a: T, b: T): boolean {
  for (const [k, aVal] of Object.entries(a)) {
    if (!(k in b) || aVal !== b[k]) {
      // 에러 발생 ({} 형식에 인덱스 시그니처가 없으므로..)
      return false;
    }
  }

  return Object.keys(a).length === Object.keys(b).length;
}

// after
function shallowObjectEqual<T extends object>(a: T, b: T): boolean {
  for (const [k, aVal] of Object.entries(a)) {
    if (!(k in b) || aVal !== (b as any)[k]) {
      return false;
    }
  }

  return Object.keys(a).length === Object.keys(b).length;
}
```

## 요약

- 타입 선언문은 일반적으로 타입을 위험하게 만들지만 상황에 따라 필요하기도 하고 현실적인 해결책이 되기도 한다.
  불가피하게 사용해야 한다면, 정확한 정의를 가지는 함수 아느로 숨기도록 하자.
