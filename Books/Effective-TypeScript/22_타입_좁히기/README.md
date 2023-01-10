# 타입 좁히기

## 태그된/구별된 유니온

tagged union, discriminated union이라 불리는 방법

```ts
interface UploadEvent {
  type: "upload";
  filename: string;
  contents: string;
}

interface DownloadEvent {
  type: "download";
  filename: string;
}

function handleEvent(event: UploadEvent | DownloadEvent) {
  switch (event.type) {
    case "download":
      event; // DownloadEvent
      break;
    case "upload":
      event; // UploadEvent
      break;
  }
}
```

## 사용자 정의 타입 가드

```ts
function isInputElement(el: HTMLElement): el is HTMLInputElement {
  return "value" in el;
}

function getElementContent(el: HTMLElement) {
  if (isInputElement(el)) {
    el; // HTMLInputElement
    return el.value;
  }

  el; // HTMLElement
}
```

반환 타입의 `el is HTMLInputElement`는 함수의 반환이 `true`인 경우 타입 체커에게 매개변수의 타입을 좁힐 수 있다고 알려준다.

## 요약

- 분기문 외에도 여러 종류의 제어 흐름을 살펴보며 타입스크립트가 타입을 좁히는 과정을 이해해야 한다.
- 태그된/구별된 유니온과 사용자 정의 타입 가드를 사용하여 타입 좁히기 과정을 원활하게 만들 수 있다.
