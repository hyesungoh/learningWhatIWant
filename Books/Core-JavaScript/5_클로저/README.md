# 클로저

어떤 함수에서 선언한 변수를 참조하는 내부함수를 외부로 전달할 경우, 함수의 실행 컨텍스트가 종료된 후에도 해당 변수가 사라지지 않는 현상

> 어떤 함수 A에서 선언한 변수 foo를 참조하는 내부함수 B를 외부로 전달할 경우 A의 실행 컨텍스트가 종료된 이후에도 변수 foo가 사라지지 않는 현상

```js
var outer = function () {
  var a = 1;
  var inner = function () {
    return ++a;
  };

  return inner;
};

var outer2 = outer();
console.log(outer2()); // 2
console.log(outer2()); // 3
```

inner 함수의 실행 시점에는 outer 함수는 이미 실행이 종료된 상태인데, `outer 함수의 LexicalEnvironment에 어떻게 접근할 수 있는걸까 ?`

가비지 컬렉터의 동작 때문인데,

외부함수인 outer의 실행이 종료되어도 내부함수인 inner 함수는 언젠가 outer2를 실행함으로써 호출될 가능성이 열리고

언젠가 inner 함수의 실행 컨텍스트가 활성화되면 outerEnvironmnetReference가 outer 함수의 LexicalEnvironment를 필요로 할 것이므로 수집 대상에서 제외되기 때문이다.

> 스펙상으로는 선언 당시의 LexicalEnvironment 전부를 GC하지 않도록 돼 있으나, V8의 경우 내부 함수에서 실제로 사용하는 변수만 남겨두고 GC하도록 최적화되어 있다.

## 메모리

클로저는 그 본질이 메모리를 계속 차지하는 개념이므로

더는 사용하지 않게 된 클로저에 대해서는 메모리를 차지하지 않도록 관리해줄 필요가 있다.

```js
outer2 = null;
```

## 활용 사례

### 콜백

```js
var alertFruitBuilder = function (fruit) {
  return function () {
    alert("your choice is" + fruit);
  };
};

fruits.forEach(function (fruit) {
  li.addEventListener("click", alertFruitBuilder(fruit));
});
```

### 정보 은닉 (접근 권한 제어)

```js
var createInfo = function () {
  var privateInfo = 0;
  var publicInfo = "foo";

  return Object.freeze({
    getInfo() {
      return publicInfo;
    },
  });
};
```

클로저를 활용해 접근권한을 제어하는 방법

1. 함수에서 지역변수 및 내부함수 등을 생성
2. 외부에 접근권한을 주고자 하는 대상들로 구성된 참조형 데이터를 반환한다.
   1. 반환한 변수들은 공개 멤버가 되고, 그렇지 않은 변수들은 비공개 멤버가 된다.

### 부분 적용 함수

Partially applied function이란 n개의 인자를 받는 함수에 미리 m개의 인자만 넘겨 기억시켰다가

나중에 n~m개의 인자를 넘기면 비로소 원래 함수의 실행 결괄르 얻을 수 있게끔 하는 함수

> func.bind 메서드의 this를 제외한 것과 같음

<details>

<summary>

예제 보기

</summary>

```js
// 순서에 상관없는 부분 적용 함수 구현

Object.defineProperty(window, "_", {
  value: "EMPTY_SPACE",
  writable: false,
  configurable: false,
  enumerable: false,
});

var partical = function () {
  var originalPartialArgs = arguments;
  var func = originalPartialArgs[0];
  if (typeof func !== "function") {
    throw new Error("첫 인자가 함수가 아닙니다");
  }

  return function() {
    var partialArgs = Array.prototype.slice.call(originalPartialArgs, 1);
    var restArgs = Array.prototype.slice.call(arguments);

    for (var i == 0; i < partialArgs.length; i++) {
      if (partialArgs[i] === _) {
        partialArgs[i] = restArgs.shift();
      }
    }

    return func.apply(this, partialArgs.concat(restArgs))
  }
};

var add = function() {
  var result = 0;
  for (var i = 0; i < arguments.length; i++) {
    result += arguments[i];
  }

  return result;
}

var addPartial = partial(add, 1, 2, _, 4);
console.log(addPartial(3, 5)); // 15
```

</details>

### 참고 - Symbol

위 `부분 적용 함수` 예제에서 `_`를 비워놓음으로 사용하기 위해 전역공간을 사용했다.

ES6에서는 `Symbol.for`를 활용하면 좋은데, 이는 전역 심볼공간에 인자로 넘어온 문자열이 이미 있으면 해당 값을 참조하고

선언돼 있지 않으면 새로 만드는 방식으로 어디서든 접근 가능하면서 유일무이한 상수를 만들고자 할 때 적합하다.

```js
if (partialArgs[i] === Symbol.for('EMPTY_SPACE'))
```

### 커링 함수

여러 개의 인자를 받는 함수를 하나의 인자만 받는 함수로 나눠서 순차적으로 호출될 수 있게 체인 형태로 구성한 것

```js
var curry3 = (func) => (a) => (b) => func(a, b);

var getMaxWith10 = curry3(Math.max)(10);

console.log(getMaxWith10(8)); // 10
console.log(getMaxWith10(25)); // 25
```
