# 의존성 분리를 위해 미러 타입 사용하기

csv 파일을 파싱하는 라이브러리를 작성한다고 가정하고,

NodeJS 사용자를 위해 매개변수에 Buffer 타입을 허용한다면 다음과 같다.

```ts
// Buffer 타입은 @types/node 에 포함돼 있음

function parseCSV(contnet: string: Buffer): {[col: string]: string}[] {
  if (typeof contents === 'object') {
    // 버퍼인 경우
    return parseCSV(contents.toString('utf8'))
  }
}
```

`@types/node` 의존성은 다음과 같은 사용자에게는 필요가 없다.

- @types와 무관한 자바스크립트 개발자
- NodeJS와 무관한 타입스크립트 웹 개발자

이런 경우 인코딩 정보를 매개변수로 받는 toString 메서드를 가지는 인터페이스를 별도로 만들어 사용하면 된다.

```ts
interface CsvBuffer {
  toString(encodeing: stirng): string;
}

function parseCSV(contnet: string: CsvBuffer): {[col: string]: string}[] {};
```

이처럼 작성 중인 라이브러리가 의존하는 라이브러리의 구현과 무관하게 타입에만 의존한다면,

필요한 선언부만 추출하여 작성 중인 라이브러리에 넣는 것(미러링)을 고려해 보는 것도 좋다.

## 요약

- 필수가 아닌 의존성을 분리할 때는 구조적 타이핑을 사용하면 된다.
- 공개한 라이브러리를 사용하는 자바스크립트 사용자가 @types 의존성을 가지지 않게 해야 한다.
  그리고 웹 개발자가 NodeJS 관련된 의존성을 가지지 않게 해야 한다.
