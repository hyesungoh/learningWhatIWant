# 일급 함수 2

## 고차 함수를 만들어서 얻는 이점

코드가 더 길어질 수도 있지만

* 이후 중복을 방지할 수 있고 (새로운 동작에 원칙을 적용)
* 한 원칙에 대한 코드를 한 곳에서 관리할 수 있음
* 여러 개를 변경할 떄 최적화가 용이
  + 4개의 연산을 위해 4개의 복사본을 만들었던 것에서, 4개의 연산을 1개의 복사본에서 수행할 수 있음

## 함수를 리턴하는 함수

```js
function wrapLogging(f) {
    return (arg) => {
        try {
            f(arg);
        } catch (error) {
            logToSystem(error);
        }
    }
}

const saveDataWithLogging = wrapLogging(saveData);
```

* 매번 고차 함수로 감싸는 것이 아닌, 감싸진 함수를 할당해 재사용 할 수 있음
  + 함수 팩토리

> 팩토리 메소드 패턴과 비슷한 간지라고 느꼈어요
> https://www.hyesungoh.xyz/factoryMethod
> https://johngrib.github.io/wiki/pattern/factory-method/

## 모든 것을 고차 함수로?

* 직관적인 방법과 고차 함수로 만든 것을 항상 비교하자
  + 어떤 것이 더 코드를 읽기 쉬울까?
  + 얼마나 많은 중복을 없앨 수 있을까?
  + 코드가 하는 일이 무엇인지 쉽게 알 수 있을까?

* 고차 함수는 강력한 기능이지만, 비용이 따름
* 능숙하게 쓸 줄 알아야 하지만 더 좋은 코드를 만드는 데 써야 함
