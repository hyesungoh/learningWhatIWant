# 객체 래퍼 타입 피하기

자바스크립트에는 객체 외에도 기본형 값들에 대한 일곱 가지 타입이 있다.

```
string, number, boolean, null, undefined, symbol, bigint
```

기본형들은 불변이며 메서드를 가지지 않는다.

근데 기본형인 `string`의 경우 메서드를 가지고 있는 것 처럼 보인다.

```
'foo'.charAt(1);
```

위의 `charAt`과 같은 메서드들은 `string`의 메서드가 아니며, String 객체 타입에 정의되어 있다.

> string 기본형에 charAt과 같은 메서드를 사용할 때, 자바스크립트는 기본형을 String 객체로 래핑하고 메서드를 호출하고 마지막에 래핑한 객체를 버린다.


## 요약

- 기본형 값에 메서드를 제공하기 위해 객체 래퍼 타입이 어떻게 쓰이는지 이해해야 한다.
  직접 사용하거나 인스턴스를 생성하는 것은 피해야 한다.

```js
'hello' === new String('hello'); // false

new String('foo') === new String('foo') // false
```

- 타입스크립트 객체 래퍼 타입은 지양하고, 대신 기본형 타입을 사용해야 한다.
  String -> string, Number -> number ...

string을 매개변수로 받는 메서드에 String을 전달하는 순간 문제가 발생하기 때문

```ts
function isGreet(s: String) {
  return ['foo'].includes(s); // error
}
```