# 콜백 함수

콜백 함수는 다른 코드에 인자로 넘겨줌으로써 그 **제어권**도 함께 위임한 함수

- 콜백 함수를 호출하는 시점을 스스로 판단해서 실행

```js
setTimeout(function () {
  console.log("foo");
}, 300);
```

## 콜백 함수 인자

콜백 함수를 호출할 때 인자로 넘겨줄 값들 및 그 순서가 정해져 있음

이 순서를 따르지 않으면 엉뚱한 결과를 얻게 됨

```js
[1, 2, 3].map(function (curr, index, arr) {});
```

## 콜백 함수의 this

콜백 함수의 this가 무엇을 바라보도록 할지가 정해져 있는 경우가 있음

정하지 않은 경우에는 전역객체를 바라보며 임의로 this를 바꾸고 싶을 경우 bind 메서드를 사용하면 됨

```js
var obj1 = {
  func: function () {
    console.log(this);
  },
};

obj1.func(); // {func: function()} (메서드로써 실행하기 때문에 this가 obj1를 가르킴)

setTimeout(obj1.func, 300); // Window
// (콜백 함수도 함수이기 때문에 전달한다면 함수로써 실행되어 전역 객체를 바라봄)

setTimeout(obj1.func.bind({ x: 1 }), 300); // {x: 1}
// bind 메서드를 이용할 수 있음
```

## 비동기 제어

비동기 제어를 위해 콜백 함수를 사용하다 보면 콜백 지옥에 빠지기 쉬움

```js
setTimout(
  function (name) {
    var coffeeList = name;

    setTimeout(
      function (name) {
        coffeeList += ", " + name;

        setTimeout(
          function (name) {
            coffeeList += ", " + name;

            setTimeout(
              function (name) {
                coffeeList += ", " + name;
              },
              300,
              "카페라떼"
            );
          },
          300,
          "카페모카"
        );
      },
      300,
      "아메리카너"
    );
  },
  300,
  "에스프레소"
);
```

- Promise
- Generator
- async/await

를 사용해 콜백 지옥을 벗어날 수 있음

### Promise

new 연산자와 함께 호출한 Promise의 인자로 넘겨주는 콜백 함수는 호출할 때 바로 실행되지만

그 내부에 resolve 또는 reject 함수를 호출하는 구문이 있을 경우 둘 중 하나가 실행되기 전까지 다음(then) 또는 오류 (catch)로 넘어가지 않음

```js
var addCoffee = function (name) {
  return function (prevName) {
    return new Promise(function (resolve) {
      setTimeout(function () {
        var newName = prevName ? prevName + ", " + name : name;
        resolve(newName);
      }, 300);
    });
  };
};

addCoffee("에스프레소")()
  .then(addCoffee("아메리카노"))
  .then(addCoffee("카페모카"))
  .then(addCoffee("카페라떼"));
```

### Generator

```js
var addCoffee = function (prevName, name) {
  setTimeout(function () {
    coffeeMaker.next(prevName ? prevName + ", " + name : name);
  }, 300);
};

var coffeeGenerator = function* () {
  var esp = yield addCoffee("", "에스프레소");
  var ame = yield addCoffee(esp, "아메리카노");
  var moc = yield addCoffee(ame, "카페모카");
  var lat = yield addCoffee(moc, "카페라떼");
};

var coffeeMaker = coffeeGenerator();
coffeeMaker.next();
```

`*`이 붙은 함수가 Generator 함수

Generator 함수를 실행하면 Iterator가 반환되는데, 이는 next라는 메서드를 가지고 있음

next 메서드를 호출하면 Generator 함수 내부에서 가장 먼저 등장하는 yield에서 함수의 실행을 멈춤

이후 다시 next 메서드를 호출하면 앞서 멈췄던 부분부터 시작해서 다음 yield에서 실행을 멈춤

### async/await

```js
var addCoffe = function (name) {
  return new Promise(function (resolve) {
    setTimeout(function () {
      resolve(name);
    }, 300);
  });
};

var coffeeMaker = async function () {
  var coffeeList = "";
  var _addCoffee = async function (name) {
    coffeeList += coffeeList ? "," : "" + (await addCoffee(name));
  };

  await _addCoffee("에스프레소");
  await _addCoffee("아메리카노");
  await _addCoffee("카페모카");
  await _addCoffee("카페라떼");
};

coffeeMaker();
```
