# 거대한 표현을 잘게 쪼개기

- 최근 한 연구에 따르면 우리는 보통 서너 개 '일'만 생각할 수 있다고 한다. 즉 코드의 표현이 커지면 커질수록 이해하기 더 어렵다.
- 거대한 표현을 더 소화하기 쉬운 여러 조각으로 나눈다.

## 설명 변수

```js
const username = line.split(':')[0].trim();
```

## 요약 변수

```js
if (req.userId === docs.id) {}

// ->
const userOwnDocs = req.userId === docs.id;
if (userOwnDocs) {}
```

## 드모르간 법칙 사용하기

## 쇼트 서킷 논리 오용 말기

- 대부분의 프로그래밍 언어에서 불리언 연산은 쇼트 서킷 평가를 수행한다.
  - 예를 들어 if (a || b)에서 a가 참이면 b는 평가하지 않는다.

- '영리하게' 작성된 코드에 유의하라. 나중에 다른 사람이 읽으면 그런 코드가 종종 혼란을 초래한다.

## 거대한 구문 나누기

- 하위표현을 간결한 이름으로 대체하여 코드를 문서화한다.
- 코드를 읽는 사람이 코드의 핵심 '개념'을 파악하는 것을 돕는다.

## 표현을 단순화하는 다른 창의적인 방법들

- ex. 매크로
