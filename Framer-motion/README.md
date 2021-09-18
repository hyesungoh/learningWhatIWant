## Scroll Animation

### Viewport scroll 퍼센트 기준

with `useViewportScroll`, `useTransform`

```js
const { scrollY } = useViewportScroll();
const yPosAnim = useTransform(scrollYProgress, [0, 0.4, 1], [0, -250, -100]);
```

-   페이지 스크롤이 0%일 때 0
-   40% 됐을 때 -250
-   100% 됐을 때 -100

## scroll 픽셀 기준

```js
const { scrollY } = useViewportScroll();
const yPosAnim = useTransform(scrollYProgress, [0, 100, 200], [0, -250, -100]);
```

-   페이지 스크롤이 100px 됐을 시 -250
-   200px 됐을 시 -100
