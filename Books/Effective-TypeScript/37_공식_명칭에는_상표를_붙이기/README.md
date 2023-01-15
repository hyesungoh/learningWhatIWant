# 공식 명칭에는 상표를 붙이기

구조적 타이핑의 특성 때문에 가끔 코드가 이상한 결과를 낼 수 있다

```ts
interface Vertor2D {
  x: number;
  y: number;
}

function calculateNorm(p: Vector2D) {
  return Math.sqrt(p.x * p.x + p.y * p.y);
}

calculateNorm({ x: 3, y: 4 }); // 정상, 결과는 5

const vec3D = { x: 3, y: 4, z: 1 };
calculateNorm(vec3D); // 정상, 결과는 동일하게 5
```

위 코드는 구조적 타이핑 관점에서는 문제가 없지만 수학적으로 따지면 2차원 벡터를 사용해야 이치에 맞다

위 예제에서 3차원 벡터를 허용하지 않게 하려면 공식 명칭(nominal typing)을 사용하면 된다.

**공식 명칭 개념을 타입스크립트에서 흉내 내려면 상표(brand)를 붙이면 된다.**

```ts
interface Vector2D {
  _brand: "2d";
  x: number;
  y: number;
}

function vec2D(x: number, y: number): Vector2D {
  return { x, y, _brand: "2d" };
}

function calculateNorm(p: Vector2D) {
  return Math.sqrt(p.x * p.x + p.y * p.y);
}

calculateNorm({ x: 3, y: 4 }); // 정상, 결과는 5

const vec3D = { x: 3, y: 4, z: 1 };
calculateNorm(vec3D); // error
```

상표 기법은 타입 시스템에서 동작하지만 런타임에 상표를 검사하는 것과 동일한 효과를 얻을 수 있다.

> 타입 시스템이기 때문에 런타임 오버헤드를 없앨 수 있다.

## 상표화를 통해 여러 속성 모델링

```ts
type AbsolutePath = string & { _brand: "abs" };

function isAbsolutePath(path: string): path is AbsolutePath {
  return path.startsWith("/");
}
```

```ts
type SortedList<T> = T[] & { _brand: "sorted" };

function isSortedList<T>(xs: T[]): xs is SortedList<T> {
  for (let i = 1; i < xs.length; i++) {
    if (xs[i] < xs[i - 1]) {
      return false;
    }
    return true;
  }
}
```

```ts
type Meters = number & { _brand: "meters" };
type Seconds = number & { _brand: "seconds" };

const meters = (m: number) => m as Meters;
const seconds = (s: number) => s as Seconds;

const oneKm = meters(1000); // Meters
const oneMin = seconds(60); // Seconds

// number 타입은 상표를 붙여도 산술 연산 후에는 상표가 없어진다

const tenKm = oneKm * 10; // number;
```

코드에 여러 단위가 혼합된 많은 수의 숫자가 들어 있는 경우, 숫자의 단위를 문선화하는 괜찮은 방법일 수 있다.

## 요약

- 타입스크립트는 구조적 타이핑(덕 타이핑)을 사용하기 떄문에, 값을 세밀하게 구분하지 못하는 경우가 있다.
  값을 구분하기 위해 공식 명칭이 필요하다면 상표를 붙이는 것을 고려해야 한다.

- 상표 기법은 타입 시스템에서 동작하지만 런타임에 상표를 검사하는 것과 동일한 효과를 얻을 수 있다.
