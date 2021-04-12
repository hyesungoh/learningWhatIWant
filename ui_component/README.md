## UI Component

#### Context Menu

-   Event.stopPropagation()
    이벤트 캡쳐링과 버블링에 있어 현재 이벤트 이후의 전파를 막는다

-   html details tag
    summary와 자식 객체를 이용하여 구현가능

```html
<details>
    <summary>title</summary>
    <p>body</p>
</details>
```

```css
/* 마커 삭제 */
summary::marker,
summary::-webkit-details-marker {
    display: none;
}
```

    클릭 시 Open 속성 부여

```css
/* 스타일링 시 */
details[open] {
    ...;
}
```

```js
// 속성 삭제
detailsItem.removeAttribute("open");

// 속성 추가
detailsItem.setAttribute("open");
```

#### Scroll Spy
