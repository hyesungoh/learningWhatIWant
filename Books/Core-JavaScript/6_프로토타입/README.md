# 프로토타입

자바스크립트는 **프로토타입 기반 언어** 이다.

---

어떤 생성자 함수를 `new` 연산자와 함꼐 호출하면

Constructor에서 정의된 내용을 바탕으로 새로운 인스턴스가 생성되는데

**이 인스턴스는 `__proto__`라는, `Constructor의 prototype` 프로퍼티를 참조하는 프로퍼티가 자동으로 부여됨.**

`__proto__`는 생략 가능한 속성이라, `Constructor.prototype`의 메서드를 마치 자신의 메서드인 것처럼 호출 가능

> '생략 가능한 프로퍼티'라는 개념은 언어를 창시하고 전체 구조를 설계한 브랜든 아이크의 머리에서 나온 아이디어로, 이해의 영역이 아니므로 '그냥 그런가보다' 하는 수밖에 없다.

하지만 생략 가능하고, 자바스크립트 메서드의 this binding 때문에 다음과 같은 결과를 얻을 수 있다.

```js
var Person = function (name) {
  this._name = name;
};

Person.prototype.getName = function () {
  return this._name;
};

var suzi = new Person("suzi");
suzi.__proto__.getName(); // undefined, this가 __proto__ 객체이다

suzi.getName(); // suzi, this가 suzi instance이기 때문에
```

## Constructor.prototype.constructor

Constructor.prototype에는 constructor라는 프로퍼티가 있는데

이는 다시 생성자 함수 자신을 가리킨다.

이 프로퍼티는 인스턴스가 자신의 생성자 함수가 무엇인지를 알고자 할 떄 필요한 수단

```js
var arr = [1, 2];
Array.prototype.constructor = Array; // true
arr.__proto__.constructor === Array; // true
arr.constructor === Arry; // true

var arr2 = new arr.constructor(3, 4);
console.log(arr2); // [3, 4]
```

> constructor 값은 읽기 전용 속성이 부여된 경우 (number, string, boolean)을 제외하고 변경할 수 있다.

## 프로토타입 체이닝

`__proto__`를 따라 계속 찾아가면 최종적으로는 `Object.prototype`에 당도한다.

이런 식으로 `__proto__`안에 다시 `__proto__`를 찾아가는 과정을 **프로토타입 체이닝**이라 한다.

프로토타입 체이닝을 통해 각 프로토타입 메서드를 자신의 것처럼 호출할 수 있다.

> 생략할 수 있기 때문에

이때 접근 방식은 가장 가까운 대상부터 먼 대상이고, 원하는 값을 찾으면 검색을 중단한다.

### 메서드 오버라이드 예

```js
var Person = function (name) {
  this.name = name;
};

Person.prototype.getName = function () {
  return this.name;
};

var iu = new Person("지금");

iu.getName = function () {
  return "바로" + this.name;
};

iu.getName(); // 바로 지금

iu.__proto__.getName(); // undefined
// 바인딩된 this __proto__에는 name 프로퍼티가 없기 때문

Person.prototype.name = "이지금";
iu.__proto__.getName(); // 이지금

iu.__proto__.getName.call(iu); // 지금
```

## Object.prototype

Object.prototype에는 모든 데이터 타입에서 사용할 수 있는 범용적인 메서드만이 존재한다.

Object.prototype이 여타의 참조형 데이터뿐 아니라 기본형 데이터조차 `__proto__`에 반복 접근함으로써 도달할 수 있는 최상위 존재이기 때문이다.

그렇기 때문에 객체 전용 메서드는 여느 데이터 타입과 달리 Object 생성자 함수에 스태틱하게 담겨있다.

```js
Object.hasOwnProperty(obj1);
Object.freeze(instance);

// 아래가 안되는 이유
obj1.freeze();
```

### 예외 경우

예외적으로 `Object.create`를 이용하면 Object.prototype의 메서드에 접근할 수 있는 경우가 있다.

```js
var _proto - Object.create(null);
_proto.getValue = function (key) {
  return this[key];
}

var obj = Object.create(_proto);
obj.a = 1;
console.log(obj.getValue('a'));
```

`Object.create(null)`은 `__proto__`가 없는 객체를 생성한다.

이 객체는 자체의 무게가 가벼워짐으로써 성능상 이점을 갖는다.

## 다중 프로토타입 체인

`__proto__`를 연결해나가기만 하면 무한대로 체인 관계를 만들 수 있다.

이 방법으로부터 다른 언어의 클래스와 비슷하게 동작하는 구조를 만들 수 있다.

`__proto__`를 연결하는 방법은, 생성자 함수의 prototype이 연결하고자 하는 상위 생성자 함수의 인스턴스를 바라보게끔 하면 된다.

```js
var Grade = function {
  var args = Array.prototype.slice.call(arguments);
  for (var i =0; i < args.length; i++){
    this[i] = args[i];
  }
  this.length = args.length;
}

Grade.prototype = [];
```

`Grade.prototype = []`을 통해 Grade.protytpe이 배열의 인스턴스를 바라보게 하여

배열 프로토타입 메서드를 사용할 수 있다.

```js
var g = Grade(10, 20);

g.push(30);
g.pop();
```
