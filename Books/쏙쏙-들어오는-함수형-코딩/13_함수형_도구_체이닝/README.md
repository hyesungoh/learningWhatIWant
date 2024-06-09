# 함수형 도구 체이닝

## 체인을 명확하게 만들기

* 단계에 이름 붙이기

```js
// as is
const foo = filter(() => ...);
const bar = map(() => ...);

// to be
const getFoo = filter(() => ...);
const getBar = map(() => ...);

const foo = getFoo();
const bar = getBar();
```

* 콜백에 이름 붙이기

```js
const calcFoo = () => ...;
const calcBar = () => ...;

const foo = filter(calcFoo);
const bar = map(calcBar);
```

## 최적화

* map과 filter를 두 번 사용해야 한다면 한 반복문에서 사용할 수 있음
* reduce와 같이 사용한다면 한 반복문에서 사용할 수 있음

## 체이닝 리팩터링 팁

* 데이터 만들기
* 배열 전체를 다루기
* 작은 단계로 나누기
* 조건문을 filter로 바꾸기
* 유용한 함수로 추출하기
  + map, filter, reduce 외에

## 체이닝 디버깅 팁

* 구체적인 것을 유지하기
  + 각 단계에서 어떤 것을 하고 있는지 알기 쉽게하기
* 출력해보기
* 타입을 따라가 보기

## 다양한 함수형 도구

* pluck
  + 특정 필드값 가져오기

* concat
  + 배열 안에 배열배기
  + flatmap, mapcat으로도 불림

> Array.prototype.flat https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/flat
> > 모든 하위 배열 요소가 지정된 깊이까지 재귀적으로 연결된 새 배열을 생성합니다.
>
> Array.prototype.flatMap https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/flatMap
> > 배열의 각 요소에 주어진 콜백 함수를 적용한 다음 그 결과를 한 단계씩 평탄화하여 형성된 새 배열을 반환합니다. 이 메서드는 map() 뒤에 깊이 1의 flat()을 붙이는 것과 동일하지만, 두 메서드를 따로 호출하는 것보다 약간 더 효율적입니다.

* frequenciesBy, groupBy

## 도구들

* lodash

> https://npmtrends.com/lodash-vs-ramda-vs-underscore

## 이벤트 소싱

> 데이터 저장 방법에 대한 것이라고 하네용?
> https://mjspring.medium.com/%EC%9D%B4%EB%B2%A4%ED%8A%B8-%EC%86%8C%EC%8B%B1-event-sourcing-%EA%B0%9C%EB%85%90-50029f50f78c

## 인자를 데이터로 만들기

```js
const foo = [
    ['add', 'shirt'],
    ['remove', 'shoes']
];
```

* 인자를 데이터로 만들면 함수형 도구를 체이닝하기 좋음

