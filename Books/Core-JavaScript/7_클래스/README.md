# 클래스

자바스크립트는 프로토타입 기반 언어라서 클래스 및 상속 개념은 존재하지 않지만

프로토타입을 기반으로 클래스와 비슷하게 동작하게끔 하는 다양한 기법들이 도입돼 왔다.

## 클래스란

클래스는 어떤 사물의 공통 속성을 모아 정의한 추상적인 개념이고

인스턴스는 클래스의 속성을 지니는 구체적인 사례이다.

상위 클래스(superclass)의 조건을 충족하면서 더욱 구체적인 조건이 추가된 것을 하위 클래스(subclass)라고 한다.

## 프로토타입 메서드

클래스의 prototype 내부에 정의된 메서드를 `프로토타입 메서드`라고 한다.

이들은 인스턴스가 마치 자신의 것처럼 호출할 수 있다.

```js
var Rectangle = function (width, height) {
  this.width = width;
  this.height = height;
};

Rectangle.prototype.getArea = function () {
  return this.width * this.height;
};

var rect = new Rectangle(3, 4);
rect.getArea();
```

## 스태틱 메서드

클래스(생성자 함수)에 직접 정의한 메서드를 스태틱 메서드라고 하며

이들은 인스턴스가 직접 호출할 수 없고 클래스(생성자 함수)에 의해서만 호춯할 수 있다.

```js
Rectangle.isRectangle = function (instance) {
  return (
    instance instanceof Rectangle && instance.width > 0 && instance.height > 0
  );
};

Rectangle.isRectangle(rect);
```

## 클래스 상속 흉내 내기

- SubClass.prototype에 SuperClass의 인스턴스를 할당한 다음 프로퍼티를 모두 삭제
- 빈 함수(bridge)를 활용하는 방법
- Object.create를 이용하는 방법

이후 constructor 프로퍼티가 원래의 생성자 함수를 바라보도록 조정해야 함

## ES6

ES6에서는 클래스 문법이 도입

```js
var Rectangle = class {
  constructor(width, height) {
    this.width = width;
    this.height = height;
  }

  getArea() {
    return this.width * this.height;
  }
};

var Square = class extends Rectangle {
  constructor(width) {
    super(width, width);
  }

  getArea() {
    console.log("size is : ", super.getArea());
  }
};
```
