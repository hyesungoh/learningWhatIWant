# 타입 공간과 값 공간의 심벌 구분하기

- 타입스크립트 코드를 읽을 때 타입인지 값인지 구분하는 방법을 터득해야한다.

  - 타입스크립트 플레이 그라운드를 활용할 수 있다.

- 모든 값은 타입을 가지지만, 타입은 값을 가지짖 않는다.
  type과 interface 같은 키워드는 타입 공간에만 존재한다.

- class나 enum같은 키워드는 타입과 값 두 가지로 사용될 수 있다.

- "foo"는 문자열 리터럴이거나, 문자열 리터럴 타입일 수 있다.

- typeof, this 그리고 많은 연산자들과 키워드들은 타입 공간과 값 공간에서 다른 목적으로 사용될 수 있다.

```ts
// 타입의 한정자
interface A<T extends string> {}

// 서브타입
interface A extends Baz {}

// 서브클래스
class Foo extends Bar
```
