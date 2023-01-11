# 일관성 있는 별칭 사용하기

```ts
const baz = foo.bar; // 별칭
```

## 함수의 타입 정제

타입스크립트는 함수가 타입 정제를 무효화하지 않는다고 가정한다.

```ts
polygon.bbox; // BoundingBox | undefined

if (polygon.bbox) {
  polygon.bbox; // BoundingBox
  fn(polygon);
  polygon.bbox; // BoundingBox
}
```

그러나 실제로는 무효화될 가능성이 있다.

위 예제에서 `polygon.bbox` 대신 `bbox` 지역 변수로 뽑아내 사용하면 bbox의 타입은 정확히 유지되지만,

polygon.bbox의 값과 같게 유지되지 않을 수 있다.

## 요약

- 별칭은 타입스크립트가 타입을 좁히는 것을 방해한다.
  따라서 변수에 별칭을 사용할 때는 일관되게 사용해야 한다.

- 비구조화 문법을 사용해서 일관된 이름을 사용하는 것이 좋다.

- 함수 호출이 객체 속성의 타입 정제를 무효화할 수 있다는 점을 주의해야 한다.
  속성보다 지역 변수를 사용하면 타입 정제를 믿을 수 있다.
