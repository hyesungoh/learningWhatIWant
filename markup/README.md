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

색상과 사용처를 나누어 디자인 수정 시 더욱 용이하게

```scss
$gray1: #333333;
$gray2: #444444;

// f == form, bd == border
$f-bg-color: $gray1;
$f-text-color: $gray2;
$f-bd-color: $gray2;
```

#### Style 예외처리

    - `not`을 사용하여 예외처리 가능

```scss
.something:not(:disabled) {
    ...
}

// multiple
.something:not(:disabled):not(.error)... {
    ...
}
```

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
