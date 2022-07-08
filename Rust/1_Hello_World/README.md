# Hello World

러스트의 확장자 `.rs`

> 한 단어 이상을 파일에 사용할 때는 단어 구분을 위해 언더스코어(\_) 사용을 추천, helloworld.rs -> hello_world.rs

```rs
// hello_world.rs

fn main() {
    println("Hello, world!");
}
```

파일을 저장하고 실행하기 위해서는 Linux, macOS 기준으로 아래 순서대로

1. 파일을 컴파일하고
2. 실행할 수 있음

```bash
# 1
rustc hello_world.rs
# 2
./hello_world
```

## 들여다보기

### 함수

함수는 일반적인 다른 언어와 비슷하게 사용

```rs
fn main() {

}
```

> 여는 중괄호 기호를 함수 정의부와 같은 줄에 한 칸 띄워서 위치하는 것이 권장 스타일이라고 함

### 출력

```rs
    println!("Hello, world!");
```

- 러스트는 탭이 아닌 네 개의 스페이스로 들여쓰기를 권장

- `println!`은 러스트의 매크로(macro)라 불림

  만약 함수라고 불리려면 끝에 `!`가 없이 사용되었어야 할 것

- 대다수의 다른 언어처럼 세미콜론을 사용

### 컴파일과 실행

```bash
rustc hello_world.rs
```

위 커맨드는 `hello_world` 러스트 파일을 실행가능한 바이너리로 출력하는 `컴파일` 과정

러스트는 `ahead-of-time compiled` 언어인데, 이는 컴파일된 실행파일을 다른 이들에게 주면 그들은 러스트를 설치하지 않고 이를 실행할 수 있다는 의미

프로젝트가 커지면, 모든 옵션을 관리하고 코드를 공유하기 쉽도록 하기 원할텐데, 이를 위해 rust는 `cargo`라는 도구가 존재
