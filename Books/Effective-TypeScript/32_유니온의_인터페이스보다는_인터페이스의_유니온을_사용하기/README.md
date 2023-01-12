# 유니온의 인터페이스보다는 인터페이스의 유니온을 사용하기

## 인터페이스 예제

#### 유니온의 인터페이스

```ts
interface Layer {
  layout: FillLayout | LineLayout | PointLayout;
  paint: FillPaint | LinePaint | PointPaint;
}
```

위 경우에서는 layout이 `FillLayout`이며, paint가 `LinePaint`일 수 있다.

#### 인터페이스의 유니온

```ts
interface FillLayer {
  layout: FillLayout;
  paint: FillPaint;
}

interface LineLayer {
  layout: LineLayout;
  paint: LinePaint;
}

interface PointLayer {
  layout: PointLayout;
  paint: PointPaint;
}

type Layer = FillLayer | LineLayer | PointLayer;
```

이런 형태로 Layer를 정의하면 속성이 잘못된 조합으로 섞이는 경우를 방지할 수 있다.

#### 인터페이스의 유니온 w/ 태그된 유니온

```ts
interface FillLayer {
  type: "fill";
  layout: FillLayout;
  paint: FillPaint;
}

interface LineLayer {
  type: "line";
  layout: LineLayout;
  paint: LinePaint;
}

interface PointLayer {
  type: "point";
  layout: PointLayout;
  paint: PointPaint;
}

type Layer = FillLayer | LineLayer | PointLayer;
```

type 속성을 태그로 활용해 런타임에 어떤 타입의 Layer가 사용되는지 판단하는 데 쓰일 수 있다.

## null, undefined 핸들링

```ts
// before
interface Person {
  name: string;
  // 둘 다 동시에 있거나 없다
  placeOfBirth?: string;
  dateOfBirth?: Date;
}

// after
interface Person {
  name: string;
  birth?: {
    placeOfBirth: string;
    dateOfBirth: string;
  };
}
```

### 타입 구조에 손 댈 수 없는 상황에서는

```ts
interface Name {
  name: string;
}

interface PersonWithBirth extends Name {
  placeOfBirth: string;
  dateOfBirth: Date;
}

type Person = Name | PersonWithBirth;

function foo(p: Person) {
  if ("placeOfBirth" in p) {
    p; // PersonWithBirth
    p.dateOfBirth; // Date
  }
}
```

## 요약

- 유니온 타입의 속성을 여러 개 가지는 인터페이스에서는 속성 간의 관계가 분명하지 않기 때문에 실수가 자주 발생하므로 주의해야 한다.

- 유니온의 인터페이스보다 인터페이스의 유니온이 더 정확하고 타입스크립트가 이해하기도 좋다.

- 타입스크립트가 제어 흐름을 분석할 수 있도록 타입에 태그를 넣는 것을 고려해야 한다.
  태그된 유니온은 타입스크립트와 매우 잘 맞기 떄문에 자주 볼 수 있는 패턴이다.
