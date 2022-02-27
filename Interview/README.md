## Interview

해당 문서는 면접 준비를 위해 정리한 내용입니다.

> 잘못된 내용이 있을 시 피드백 부탁드리겠습니다 !

<details>

<summary>

**DOM event life cycle**

</summary>

이벤트는 각 이벤트가 갖게 되는 전파 경로를 따라 전파됩니다.
최상위 노드인 Window부터 이벤트를 부착한 노드까지 전달되는 Capture 페이즈 (Event Capturing),
이벤트 객체가 이벤트를 등록한 타겟에 도달한 Target 페이즈,
Capture 페이즈와 반대로 최종적으로 Window까지 이벤트 객체가 전달되는 Bubble 페이즈 (Event Bubbling)으로 이루어져있습니다.

추가적으로 이벤트에 따라 지원하지 않는 페이즈가 있습니다. 예를 들어 focus 이벤트는 Bubbling되지 않습니다.

</details>
