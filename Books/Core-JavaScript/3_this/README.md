# this

자바스크립트에서의 this는 어디서든 사용할 수 있다.

상황에 따라 this가 바라보는 대상이 달라지는데, `함수와 메서드의 구분`이 느슨한 자바스크립트에서의 this를 실질적으로 구분하는 거의 유일한 기능이다.

---

자바스크립트에서 this는 기본적으로 실행 컨텍스트가 생성될 때 함께 결정된다.

실행 컨텍스트는 함수를 호출할 때 생성되므로, `this는 함수를 호출할 때 결정된다`라고 할 수 있다.

## 자바스크립트의 변수

전역 공간에서의 this는 전역 객체를 가리킨다.

자바스크립트의 모든 변수는 실은 **특정 객체**의 프로퍼티로서 동작한다.

```js
var a = 1;

console.log(a); // 1
console.log(window.a); // 1
console.log(this.a); // 1
```

특정 객체란 바로 실행 컨텍스트의 `LexicalEnvironment`

실행 컨텍스트는 변수를 수집해서 LexicalEnvironment의 프로퍼티로 저장하고, 변수를 호출하면 LexicalEnvironment를 조회해서 일치하는 프로퍼티가 있을 경우 그 값을 반환한다.

전역 컨텍스트의 경우 LexicalEnvironment는 전역객체를 그대로 참조한다.

## 명시적으로 this 바인딩이 없을 때

- 전역 공간에서의 this는 전역객체를 참조

- 어떤 함수를 메서드(`foo.func()`)로서 호출한 경우 this는 메서드 호출 주체를 참조

- 어떤 함수를 메서드로써 호출한 경우 this는 전역객체를 참조. 메서드의 내부함수도 동일

```js
var obj1 = {
  outer: function () {
    console.log(this);

    var innerFunc = function () {
      console.log(this);
    };
    innerFunc();

    var obj2 = {
      innerMethod: innerFunc,
    };

    obj2.innerMethod();
  },
};

obj1.outer();

// 출력 결과는 다음과 같다
// obj
// Window (전역객체)
// obj2
```

- 콜백 함수 내부에서의 this는 해당 콜백 함수의 제어권을 넘겨받은 함수가 정의한 바에 따르며, 정의하지 않은 경우에는 전역객체를 참조

- 생성자 함수에서의 this는 생성될 인스턴스를 참조

```js
var Cat = function (name, age) {
  this.bark = "야옹";
  this.name = name;
  this.age = age;
};

var choco = new Cat("초코", 6);

console.log(choco); // Cat {bark: '야옹', name: '초코', age: 6}
```

## this를 바인딩하지 않는 함수

ES6에서는 함수 내부에서 this가 전역객체를 바라보는 문제를 보완하고자,

this를 바인딩하지 않는 `화살표 함수`를 새로 도입했다.

**화살표 함수는 실행 컨텍스트를 생성할 때 this 바인딩 과정 자체가 빠지게 되어, 상위 스코프의 this를 그대로 활용한다.**

```js
var obj = {
  outer: function () {
    console.log(this); // {outer: f}
    var innerFunc = () => {
      console.log(this); // {outer: f}
    };

    innerFunc();
  },
};

obj.outer();
```

## 명시적 this 바인딩

- call, apply 메서드는 this를 명시적으로 지정하면서 함수 또는 메서드를 호출

```js
var func = function (a, b) {
  console.log(this, a, b);
};

func(1, 2); // Window{...} 1 2
func.call({ x: 1 }, 3, 4); // {x: 1} 3 4
func.apply({ x: 1 }, [3, 4]); // {x: 1} 3 4
```

- bind 메서드는 this 및 함수에 넘길 인수를 일부 지정해서 새로운 함수를 만듬

```js
var func = function (a, b, c) {
  console.log(this, a, b, c);
};

func(1, 2, 3); // Window{...} 1 2 3

var bindFunc1 = func.bind({ x: 1 });
bindFunc1(4, 5, 6); // {x: 1} 4 5 6

var bindFunc2 = func.bind({ x: 1 }, 7, 8);
bindFunc3(9); // {x: 1} 7 8 9
```

- 요소를 순회하면서 콜백 함수를 반복 호출하는 내용의 일부 메서드는 별도의 인자로 this를 받기도 함

```
- Array.prototype.forEach(callback[, thisArg])
- Array.prototype.map(callback[, thisArg])
- Array.prototype.filter(callback[, thisArg])
...
```
