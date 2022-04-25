# 점화식

재귀적 성질을 갖는 알고리즘의 복잡도 분석할 때 이용

- 어떤 함수를 자신보다 더 작은 변수에 대한 동일 함수와의 관계로 표현한 것

```ts
function mergeSort(A: number[], p: number, r: number) {
  if (p < r) {
    const q = (p + r) / 2;
    mergeSort(A, p, q);
    mergeSort(A, q + 1, r);
    merge(A, p, q, r);
  }
}
```

수행시간의 점화식 : `T(n) = 2T(n/2) + 후처리 시간`

점근적 표기 : `T(n) = Θ(n log n)`

## 점화식의 점근적 분석 방법

### 반복 대치

더 작은 문제에 대한 함수로 반복해서 대치해 나가는 해법

```js
T(n) = T(n-1) + c;
= T(n-2) + c + c;
= T(n-3) + c + c + c;
...
= T(1) + c + c + ... + c;
= T(1) + (n-1)c
<= c + (n-1)c
= cn
```

`T(n) = O(n)`

### 추정 후 증명

결론을 추정하고 수학적 귀납법을 이용하여 증명하는 방법

`T(n) = 2T(n/2) + n`

추정 : T(n) = O(n log n)

증명

- 경계 조건 : 2에 대해 성립, 즉 T(2) <= c2 log 2인 c가 존재
- 귀납 가정 : n/2에 대해 성립, 즉 T(n/2) <= c(n/2) log (n/2)라고 가정
- n에 대해 성립함을 증명

### 마스터 정리

점화식의 형식이 T(n) = aT(n/b) + f(n)인 경우, 복잡도를 바로 구할 수 있는 정리(theorem)

> 크기가 n인 문제를 푸는 시간 =
> 크기가 n/b인 문제 a개를 푸는 시간 + 나머지 오버헤드 f(n)

```text
예) 병합정렬의 수행시간
T(n) = 2T(n/2) + n
a = 2
b = 2
f(n) = n
```

## 예

```ts
function sample(A: number[], p: number, r: number) {
  if (p === r) return 1;
  const q = (p + r) / 2;
  const tmp = sample(A, p, q) + sample(A, q + 1, r);
  return tmp;
}
```

점화식 = `2T(n/2)`

점근적 표기 = 마스터 정리에 따라 `aT(n/b) + f(n)` => `h(n) = n^logba` => `h(n) = n` => f(n) < h(n) => `Θ(n)`

```js
if (h(n) > f(n)) return T(n) = h(n)
else if (h(n) == f(n)) return h(n) * log n
else {
  if (af(n/b) <= f(n)) {
    return f(n)
  }
}
```
