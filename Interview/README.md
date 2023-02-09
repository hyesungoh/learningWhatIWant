## Interview

해당 문서는 면접 준비를 위해 정리한 내용입니다.

> 잘못된 내용이 있을 시 피드백 부탁드리겠습니다 !

<details>

<summary> <strong>오버로딩 vs 오버라이딩 w/ typescript</strong> </summary>

오버로딩 : 같은 메소드지만 매개변수에 차이점을 두는 것

```typescript
// typescript 오버로딩
function add(a: number, b: number): number;

function add(a: number, b: number, c: number): number;

// 위 오버로드 선언을 모두 만족하도록 구현해야 함
function add(a: number, b: number, c?: number): number {
  // 구현
}
```

오버라이딩 : 상속 관계에 있는 클래스 간에 같은 이름의 메소드를 정의

</details>

<details>

<summary> <strong>브라우저 렌더링 과정을 설명해주세요</strong> </summary>

서버에서 응답받은 HTML 데이터를 파싱한 후 해당 결과를 통해 DOM 트리를 만듭니다.

파싱 하는 중 CSS 파일 링크를 만나면, CSS 파일을 요청해 받아온 후 CSSOM을 만듭니다.

DOM 트리와 CSSOM이 모두 만들어지면 이를 이용해 렌더 트리를 만들고 각 노드들이 화면의 어디에 위치할 지 계산하는 레이아웃 과정 후 실제로 그리는 페인팅 과정을 거쳐 렌더링됩니다.

추가적으로 화면의 어디에 위치할 지 계산하는 과정을 리플로우,이 후 실제로 그리는 페인팅 과정을 리페인트라고 부르는 것으로 알고 있습니다.

</details>

<details>

<summary> <strong>DOM Event Life Cycle을 설명해주세요</strong> </summary>

이벤트는 각 이벤트가 갖게 되는 전파 경로를 따라 전파됩니다.

최상위 노드인 Window부터 이벤트를 부착한 노드까지 전달되는 Capture 페이즈 (Event Capturing),

이벤트 객체가 이벤트를 등록한 타겟에 도달한 Target 페이즈,

Capture 페이즈와 반대로 최종적으로 Window까지 이벤트 객체가 전달되는 Bubble 페이즈 (Event Bubbling)으로 이루어져있습니다.

추가적으로 이벤트에 따라 지원하지 않는 페이즈가 있습니다. 예를 들어 focus 이벤트는 Bubbling되지 않습니다.

</details>

<details>

<summary> <strong>var, let, const의 차이점은 무엇인가요?</strong> </summary>

var은 전역 스코프를 가지지만, const let은 블록 레벨 스코프를 가집니다.

const는 상수로써 값을 재할당할 수 없지만, let은 가능하며 이는 es6부터 지원하게 되었습니다.

> es6는 2015년 나왔다.

</details>

<details>

<summary> <strong>호이스팅이란?</strong> </summary>

자바스크립트 엔진은 선언과 실행을 구분해서 처리한다.

이 때 선언을 먼저 처리하기 때문에, 선언문이 코드 상단으로 "끌어올려지는" 듯한 효과를 호이스팅이라 한다.

```js
// javascript
var a = 1;

// 위 코드는 크게 var a 선언문과 a = 1 대입문으로 구분할 수 있다.
// 1. 컴파일 단계에서 var a가 등장하면 스코프 내에 변수 a가 존재하는 지 검색
// 2. 존재할 시 선언문을 무시, 없다면 a를 스코프 컬렉션 내에 생성하도록 요청
// 3. 코드 실행 시점에서 a = 1 대입문을 처리한다.
// 4. 변수 a가 현재 스코프에 있으면 대입을 실행하고, 없다면 바깥 스코프까지 거슬러 올라간다.
```

```js
add();

function add() {
  // something...
}

// 마찬가지로 선언이 먼저 되기(호이스팅 되기) 때문에 오류를 일으키지 않는다.
```

</details>

<details>

<summary> <strong>CORS는 무엇이며, 어떻게 대처하나요?</strong> </summary>

동일한 출처의 리소스만 사용해야하는 원칙인 SOP의 허용조건으로, Cross Origin Resource Sharing의 약자입니다.

대처하는 방법은 서버에서 헤더의 Access control allow origin에 알맞은 값을 설정하는 방법과

개발 환경에서 webpack dev server의 proxy 기능을 이용해 CORS 정책을 우회하는 방향으로 대처할 수 있습니다.

</details>

<details>

<summary> <strong>자바스크립트는 단일 스레드 언어이지만, 동시성을 지원하는 방법에 대해 설명해주세요</strong> </summary>

자바스크립트 엔진의 콜 스택에는 호출 스택들이 쌓이게 되는데, 해당 콜 스택의 값이 없을 때

런타임 환경에 위치한 콜백 큐에 있는, 비동기 스택들을 콜 스택에 할당하여 동시성을 지원합니다. 또한 이 행위를 이벤트 루프라고 합니다.

</details>

<details>

<summary> <strong>콜백 큐에는 어떤 큐들이 모여있나요?</strong> </summary>

크게 Microtask 큐, Animation frames, Task 큐로 구성되어 있으며,

Microtask 큐에는 Promise then의 callback 함수 등이,

Animation frames에는 requestAnimationFrame과 같은 애니메이션 관련 콜백이,

Task 큐에는 setTimeout과 같은 Web API가 위치하는 것으로 알고 있습니다.

> 콜백 큐에서 실행 스택으로 옮겨지는 우선 순위는 Microtask > Animation frames, Task 순입니다.

</details>

<details>

<summary> <strong>type alias와 interface의 차이점</strong> </summary>

가장 큰 차이라면 interface는 객체 혹은 클래스에만 적용할 수 있다는 점입니다.

합성에서 성능 차이가 있는 것으로 알고 있는데 interface는 합성할 경우 이가 캐싱되지만, type은 모든 구성요소에 대한 타입을 체크하기 때문입니다.

- computed value는 type에서만 사용가능
- type의 경우 확장시 동일 키 값에 대해 never가 할당될 수 있음

</details>

<details>

<summary> <strong>클로저란 ?</strong> </summary>

어떤 함수에서 선언한 변수를 참조하는 내부함수를 외부로 전달할 경우, 함수의 실행 컨텍스트가 종료된 후에도 해당 변수가 사라지지 않는 현상

> 어떤 함수 A에서 선언한 변수 foo를 참조하는 내부함수 B를 외부로 전달할 경우 A의 실행 컨텍스트가 종료된 이후에도 변수 foo가 사라지지 않는 현상

```js
var outer = function () {
  var a = 1;
  var inner = function () {
    return ++a;
  };

  return inner;
};

var outer2 = outer();
console.log(outer2()); // 2
console.log(outer2()); // 3
```

</details> -->

<!--
<details>

<summary> <strong>제목</strong> </summary>

답변

</details>



<!-- <details>

<summary> <strong>FLUX 패턴이란</strong> </summary>

양방향 데이터 흐름을 갖고 있는 MVC 패턴의 복잡도라는 단점을 해결하기 위해 Facebook에서 고안해냄.

1. 액션 생성자 호출
2. 디스패쳐로 전달
3. 스토어에 전달
4.

</details> -->

<!--
<details>

<summary> <strong>제목</strong> </summary>

답변

</details>
-->
