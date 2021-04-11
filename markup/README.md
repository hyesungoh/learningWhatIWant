## Markup

#### Input with Label

-   명시적 레이블 활용법

```html
<lable for="name">이름</lable> <input id="name" type="text" />
```

-   암시적 레이블 활용법
    각각 분리되어 스타일을 주기 어렵다

```html
<lable>
    <span>이름</span>
    <input type="text" />
</lable>
```

-   label을 적지 않는 경우

```html
<input type="text" aria-label="이름 " />
```

#### SASS color palete to values

-   색상과 사용처를 나누어 디자인 수정 시 더욱 용이하게

```scss
$gray1: #333333;
$gray2: #444444;

// f == form, bd == border
$f-bg-color: $gray1;
$f-text-color: $gray2;
$f-bd-color: $gray2;
```

#### Style 예외처리

-   `not`을 사용하여 예외처리 가능

```scss
.something:not(:disabled) {
    ...
}

// multiple
.something:not(:disabled):not(.error)... {
    ...
}
```

#### contenteditable

-   div를 textarea처럼 사용 가능
-   모든 브라우저에서 사용 가능
-   disabled, readonly는 사용 불가

```html
<div contentediable="true"></div>
```

#### Hiding system input

```scss
.some_input {
    // 스크린 리더기에서 읽을 수 없거나 초점이 사라져 웹 접근성 지침에 어긋남
    // display: none;
    // visibility: hidden;
    // opacity: 0;

    // 시스템 속성을 없애기 위한 appearance 사용
    // IE 11부터 하위 브라우져 지원 X
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
}
```

<br/>

## Cross browsing

#### Safari's input

```css
input {
    -webkit-appearance: none;
}
```

#### input's placeholder

```css
/* Chrome, Safari, Firefox */
input::placeholder {
    color: red;
}
/* IE, Edge */
input:-ms-input-placeholder {
    color: red;
}
/* Old IE's clear btn */
input::-ms-clear,
input::-ms-reveal {
    display: none;
}
```

#### read-only

```css
input:read-only {
    /* IE doesnt support */
}

input[readonly] {
    /* SUPPORT WITH ANOTHER */
}
```

#### textarea resize

-   IE는 resize가 되지 않음
