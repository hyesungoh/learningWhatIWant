## For State Management

2021 software maestro mentoring

## Using

> TypeScript, Next.js, Emotion, Chakra, Recoil, framer-motion, immer, lodash

#### \_app.tsx

CRA의 app과 같은 사용, provider 위치

```tsx
function MyApp({ Component, pageProps }: AppProps) {
    return (
        <RecoilRoot>
            <QueryClientProvider client={queryClient}>
                <ChakraProvider>
                    <Component {...pageProps} />
                </ChakraProvider>
                <ReactQueryDevtools initialIsOpen={false} />
            </QueryClientProvider>
        </RecoilRoot>
    );
}
```

#### React-Query

-   data fetch와 cashing을 동시에 할 수 있는 것이 가장 큰 강점

-   메모리, 퍼포먼스 측면의 이점도 있음

-   재방문, 5분 경과등의 규칙으로 자동 Refresh

-   `key` 값을 기준으로 재호출 방지

```tsx
const { data, isLoading, error } = useQuery("keyValue", fetchingFunc);
```

#### React-Query-Devtools

```tsx
// _app.tsx
import { ReactQueryDevtools } from "react-query/devtools";
...

<ReactQueryDevtools initialIsOpen={false} />
```

#### Custom Hooks with React-query

**Custom Hook**을 이용하여 data fetching, global state management를 하여, render 함수를 최대한 간소하게 만드는 것이 좋다

#### React-Query useMutation

-   첫 번째 인자는 promise를 반환하는 함수

-   post, update와 같이 cashing이 필요없는 요청일 때 사용

-   onSuccess와 같이 상태에 따라 함수를 실행 가능

#### React-Query queryClient.invalidateQueries

데이터가 바뀌었을 때 `key` 값을 기준으로 refetching 가능

```ts
const refresh = () => {
    queryClient.invalidateQueries(["todoList"]);
};

const createMutation = useMutation(
    () => {
        return axios.post("api/todo", {
            fields: { Name: "새 투두", Done: false },
        });
    },
    {
        onSuccess: () => {
            refresh();
        },
    }
);
```

#### Immer

mutation한 코드를 immutable하게 생성할 수 있게 됨

```tsx
import produce from "immer";
const newTodo = produce(todo, (nextTodo) => {
    nextTodo.fields.Done = checked;
});
```

#### Debouncing

마지막 이벤트 기점으로 시간을 계산

적합한 곳 : Input, 자동완성

#### Throttling

한 번 실행 후, 정해진 시간 동안 무시 후, 재 실행

적합한 곳 : Scroll

Debouncing, Throttling을 포함한 다양한 기능이 있는 lodash 사용 가능

#### Recoil Atoms

전역으로 사용하는 state와 매우 유사

```tsx
// store.ts
import { atom } from "recoil";

export const somethingState = atom<boolean>({
    key: "somethingState",
    default: false,
});

// component.tsx
import { useRecoilState } from "recoil";
import { somethingState } from "store";

const [something, setSomething] = useRecoilState(somethingState);
```

#### React-Query + Global State 분류 예제

Data fetching > React-Query

선택한 값과 같은 임시적인 값이며 여러 곳에서 쓴다 > Global State

새로고침 후에도 유지, url 공유시에도 똑같이 > query-parameter, url-parameter
