## UI Component

#### Context Menu

-   Event.stopPropagation
    이벤트 캡쳐링과 버블링에 있어 현재 이벤트 이후의 전파를 막는다

```js
const someEvent = (e) => {
    e.stopPropagation();
};
```

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

-   element.offsetTop
    상대적으로 가장 가까운 부모 요소의 상단에서부터의 픽셀값

```js
const ofs = element.offsetTop;
```

-   element.clientHeight
    내부 높이를 픽셀로 반환, padding은 포함, margin은 비포함

```js
const clh = element.clientHeight;
```

-   element.scrollIntoView
    호출된 요소가 사용자에게 표시되도록 요소의 상위 컨테이너를 스크롤

```js
element.scrollIntoView({
    block: "start", // 수직 정렬을 정의
    inline: "nearest", // 수평 정렬을 정의
    behavior: "smooth", // 전환 애니메이션을 정의
});
```

-   Array.findIndex
    주어진 판별 함수를 만족하는 배열의 첫 번째 요소에 대한 인덱스를 반환, 없을 시 -1

```js
// 배열에서 소수 찾기, 출처 : mdn
function isPrime(element, index, array) {
    var start = 2;
    while (start <= Math.sqrt(element)) {
        if (element % start++ < 1) {
            return false;
        }
    }
    return element > 1;
}

console.log([4, 6, 8, 12].findIndex(isPrime)); // -1, not found
console.log([4, 6, 7, 12].findIndex(isPrime)); // 2
```
