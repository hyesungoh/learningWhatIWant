# 유효한 상태만 표현하는 타입을 지향하기

유효한 상태만 허용하는 것은 매우 일반적인 원칙이다.

태그된 유니온 (구별된 유니온)을 사용할 수 있다.

```ts
// before
interface State {
  pageText: string;
  isLoading: boolean;
  error?: string;
}

// after
interface RequestPending {
  state: "pending";
}

interface RequestError {
  state: "error";
  error: string;
}

interface RequestSuccess {
  state: "ok";
  pageText: string;
}

type RequestState = RequestPending | RequestError | RequestSuccess;

interface State {
  currentPage: string;
  requests: { [page: string]: RequestState };
}
```

## 요약

- 유효한 상태와 무효한 상태를 둘 다 표현하는 타입은 혼란을 초래하기 쉽고 오류를 유발하게 된다.

- 유효한 상태만 표현하는 타입을 지향해야 한다.
  코드가 길어지거나 표현하기 어렵지만 결국은 시간을 절약하고 고통을 줄일 수 있다.
