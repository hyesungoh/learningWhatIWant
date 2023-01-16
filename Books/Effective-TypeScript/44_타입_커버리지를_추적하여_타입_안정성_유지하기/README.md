# 타입 커버리지를 추적하여 타입 안정성 유지하기

## 추척 도구

npm의 `type-coverage`를 활용할 수 있다

```bash
npx type-coverage # 백분율

npx type-coverage --detail # 장소 출력
```

## 요약

- noImplicitAny가 설정되어 있어도, 명시적 any 또는 서드파티 타입 선언(@types)을 통해 any 타입은 코드 내에 여전히 존재할 수 있다는 점을 주의해야 한다.

- 작성한 프로그램의 타입이 얼마나 잘 선언되었는지 추적해야 한다.
  추적함으로써 any의 사용을 줄여 나갈 수 있고 타입 안정성을 꾸준히 높일 수 있다.
