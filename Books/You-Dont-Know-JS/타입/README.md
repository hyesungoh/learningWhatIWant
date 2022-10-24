자바스크립트 같은 동적 언어는 `Type` 개념이 없다고 생각하는 개발자가 많지만,

ECMA 표준 명세서 5.1에는 다음과 같이 기술되어 있다.

> 이 명세에 수록된 알고리즘에서 사용되는 모든 값은 이 절에서 정의한 타입 목록 중 하나에 해당한다. 타입은 ECMAScript 언어 타입과 명세 타입으로 하위 분류된다. <br/>
> ECMAScript 개발자가 ECMAScript 언어를 이용하여 직접 조작하는 값들의 타입이 바로 ECMAScript 언어 타입이다. ECMAScript 언어 타입에는 `Undefined`, `Null`, `Boolean`, `String`, `Number`, `Object`가 있다.

## 내장 타입

- Undefined
- Null
- Boolean
- String
- Number
- Object

> Object를 제외한 이들을 원시 타입 (Primitives) 이라고 한다.

값 타입은 `typeof` 연산자를 이용하여 알 수 있으며, 동일한 문자열을 반환한다.

```js
typeof undefined === "undefined"; // true
typeof true === "boolean"; // true
typeof 42 === "number"; // true
typeof "42" === "string"; // true
typeof { foo: 42 } === "object"; // true
```

하지만 `null`의 경우 아래와 같이 반환된다.

```js
typeof null === "object"; // true
```

`null`을 반환할 것이라고 예상했으나, 이 버그는 20년 동안 끈질기게 버티고 있다고 한다.

이제 와서 수정을 하자니, 지금까지 작동하던 소프트웨어가 멈춰버릴 경우가 너무 많아서, 앞으로도 해결될 가능성은 좀처럼 없어 보인다고 한다.

그래서 `null` 값을 정확히 확인하려면 아래와 같은 조건이 필요하다.

```js
const foo = null;
!foo && typeof a === "object"; // true
```

`null`은 `falsy`한 유일한 원시 값이지만, 타입은 `object`인 특별한 존재이다.

### function

`typeof`가 반환하는 문자열은 하나 더 있는데, 그것은 바로 `function` 이다.

```js
typeof function (a) {} === "function"; // true
```

`function`은 최상위 레벨의 내장 타입이 아닌,

`object`의 **하위 타입**이다.

> 자세히는 '호출 가능한 객체'라고 명시되어 있다.

```js
function foo(bar, baz) {}
foo.length; // 2
```

`function`은 다음과 같이 인자의 수를 `length` 프로퍼티로 알 수 있다.

### array

```js
typeof [1, 2, 3] === "object"; // true
```

`array`도 function과 마찬가지로 숫자 인덱스, 자동으로 관리되는 length의 특성을 지닌 객체의 **하위 타입**이다.

## 변수의 Type ?

JavaScript에서 변수는 Type을 갖지 않는다.

즉, `typeof` 연산자는 "이 변수의 타입이 무엇이냐?"가 아니라, <b>"이 변수에 들어있는 값의 타입은 무엇이냐?"</b>이다.

## Undefined vs Undeclared

```js
var a;

a; // undefined
b; // ReferenceError: b is not defined
```

`undefined`는 접근 가능한 스코프에 변수가 선언되었으나, 값이 할당되지 않은 상태이며,

`undeclared`는 접근 가능한 스코프에 변수 자체가 선언조차 되지 않은 상태이다.

하지만 브라우저는 "b is not defined"와 같이 헷갈리게 에러를 반환한다.

```js
var a;

typeof a; // "undefined"
typeof b; // "undefined"
```

`typeof` 연산자는 `undeclared` 변수도 `undefined`로 나온다.

선언조차 하지 않은 변수에 `typeof`를 해도 브라우저는 오류 처리를 하지 않는데,

바로 이것이 `typeof`만의 독특한 안전 가드(_Safety Guard_) 이다.

### 쓸모있는 typeof 안전 가드

한 파일에 전역으로 사용할 변수를 만들어둔 후,

다른 파일에서 사용한다고 했을 때 `typeof 안전 가드`는 다음과 같이 사용할 수 있다.

```js
// debug.js
var DEBUG = "something";

// foobar.js

if (DEBUG) {
} // ERROR

if (typeof DEBUG !== "undefined") {
} // 안전하게 존재 여부를 확인
```

`typeof`를 사용하지 않고 전역 변수를 확인하는 방법은,

전역 변수가 모두 전역 객체(window)의 프로퍼티라는 점을 이용하는 것이다.

```js
if (window.DEBUG) {
}
```

선언되지 않은 변수와 달리 **어떤 객체의 프로퍼티를 접근할 때, 그 프로퍼티가 존재하지 않아도 ReferenceError가 나지 않는다.**

하지만 window 객체를 통한 참조는 가급적 삼가는 것이 좋은데, 전역 변수를 꼭 window 객체로만 호출하지 않는 <b>다중 스크립트 환경(nodeJS)</b>가 있기 때문이다.

### 전역 변수를 사용하지 않을 때의 typeof

```js
function foo() {
  var bar = typeof doSomeThing !== "undefined" ? doSomeThing : function () {};
}
```

만약 다른 개발자가 내가 작성한 함수를 복붙하여 사용하는데, 특정 변수값이 정의되어 있는 지 확인해야하는 상황에 위 처럼 사용할 수 있다.

혹은 `의존성 주입` (_Dependency Injection_) 설계 패턴을 선호할 경우 다음과 같이 의존 관계를 전달 할 수 있다.

```js
function foo(doSomeThing) {
  var bar = doSomeThing || function () {};
}
```

## 정리

- 자바스크립트에서는 7가지 내장 타입 `null`, `undefined`, `boolean`, `number`, `string`, `object`, `symbol`이 있다.
- `typeof` 연산자로 타입명을 알아낼 수 있다.
- 변수는 타입이 없고, 값은 타입이 있으며 타입은 값의 내재된 특성을 정의한다.
- `undefined`와 `undeclared`는 다르다.
- typeof 안전 가드는 쓸 만 하다.

## 내 느낀 점

요즘은 TypeScript로만 개발을 하여, JavaScript의 type은 깊게 생각해보지 않았는데 책을 읽고 상당히 흥미로운 부분이 많았다.

너무 오랫동안 고쳐지지않아 고칠 수 없어져버린 버그, typeof의 활용 등 확실히 책 제목처럼 나는 JavaScript를 모르고 있던 것이 분명했다.
