# 콜백에서 this에 대한 타입 제공하기

자바스크립트에서 this는 혼란스러운 기능이다.

let, const로 선언된 변수가 렉시컬 스코프인 반면, this는 다이나믹 스코피인 것 때문이다.

> 다이나믹 스코프의 값은 정의된 방식이 아니라 호출된 방식에 따라 달라진다.

## 일반적인 this 사용

전형적으로 객체의 현재 인스턴스를 참조할 때 쓰인다

```ts
class C {
  vals = [1, 2, 3];
  logSquares() {
    for (const val of this.vals) {
      console.log(val * val);
    }
  }
}

const c = new C();
c.logSquares(); // 1, 4, 9
```

위 상황에서 `logSquares`를 외부 변수에 넣고 호출하면 다음과 같은 에러가 발생한다.

```ts
const c = new C();
const method = c.logSquares;
method();
// error, undefined의 vals 속성을 읽을 수 없습니다.
```

`c.logSquares()`가 실제로는 두 가지 작업을 수행하기 떄문에 문제가 발생하는 것이다.

1. C.prototype.logSquares를 호출
2. this의 값을 c로 바인딩

위 코드에서는 참조 변수를 사용함으로써 두 가지 작업을 분리해 this가 `undefined`로 설정된 것

바인딩을 온전히 제어할 수도 있는데 `call`을 이용하면 된다.

```ts
const c = new C();
const method = c.logSquares;

method.call(c);
```

## 타입스크립트에서 this를 사용하는 콜백 함수가 있다면

```ts
function addKeyListener(
  el: HTMLElement,
  fn: (this: HTMLElment, e: KeyboardEvent) => void
) {
  el.addEventListener("keydown", (e) => {
    fn.call(el, e);
  });
}
```

콜백 함수의 매개변수에 this를 추가하고, 콜백 함수를 call로 호출해서 해결할 수 있다.

## 요약

- this 바인딩이 동작하는 원리를 이해해야 한다.
- 콜백 함수에 소is를 사용해야 한다면, 타입 정보를 명시해야 한다.
