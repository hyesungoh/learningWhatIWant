# DOM 계층 구조 이해하기

## DOM 계층의 타입 들

`HTMLButtonElement` 등 < `HtmlElement` < `Element` < `Node` < `EventTarget`

| 타입              | 예시                    |
| ----------------- | ----------------------- |
| EventTarget       | window, XMLHttpsRequest |
| Node              | document, Text, Comment |
| Element           | HTMLElement, SVGElement |
| HTMLElement       | <i>, <b>                |
| HTMLButtonElement | <button>                |

## Event 타입 계층

`MouseEvent` 등 < `Event`

## 요약

- 자바스크립트를 사용할 때는 신경쓰지 않았겠지만, DOM에는 타입 계층 구조가 있다.
  DOM 타입은 타입스크립트에서 중요한 정복이며, 브라우저 관련 프로젝트에서 타입스크립트를 사용할 때 유용하다.

- Node, Element, HtmlElemnt, EventTarget 간의 차이점,
  Event와 MouseEvent의 차이점을 알아야 한다.

- DOM 엘리먼트와 이벤트에는 충분히 구체적인 타입 정보를 사용하거나,
  타입스크립트가 추론할 수 있도록 문맥 정보를 활용해야 한다.
