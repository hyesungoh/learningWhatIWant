# 함수형 반복

## Map

```js
function map(arr, f) {
    const newArr = []
    for (const val of arr) {
        newArr.push(f(val))
    }
    return newArr
}
```

## Filter

```js
function filter(arr, f) {
    const newArr = []
    for (const val of arr) {
        if (f(val)) newArr.push(val)
    }
    return newArr
}
```

## Reduce

```js
function reduce(arr, init, f) {
    let acc = init
    for (const val of arr) {
        acc = f(acc, val)
    }
    return acc
}
```

* fold 라는 이름으로도 사용됨
  + foldLeft, foldRight 같이 탐색 방향에 따른 버전도 있음
