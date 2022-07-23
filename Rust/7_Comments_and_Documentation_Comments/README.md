# Comments (주석)

러스트는 `//`를 이용해 주석 사용 가능

```rust
// this is comment
```

여러 줄도 마찬가지로, 각 줄에 포함시켜 사용할 수 있음

```Rust
// this
// is comment
```

주석과 코드를 나눠 앞 줄에 기재되는 형식이 일반적

```rust
fn main() {
  // this is number
  let num = 8;
}
```

## 문서화 주석

러스트는 문서화를 위한 특별한 주석이 있는데, `문서화 주석`이라고 불림

> JS의 `/** */` 와 같은

이는 `///`를 이용할 수 있고, 마크다운 표기법을 지원함

````rust
/// Adds one to the number given.
///
/// # Examples
///
/// ```
/// let five = 5;
///
/// assert_eq!(6, my_crate::add_one(5));
/// ```
fn add_one(x: i32) -> i32 {
    x + 1
}
````

### 주석을 포함하는 항목을 문서화

문서화 주석의 다른 스타일로 `//!`가 있음

이는 주석 뒤에 오는 항목을 문서화 하는게 아닌 주석을 포함하는 항목을 문서화함

### 문서화

`cargo doc`을 이용해 문서화 주석으로부터 HTML 문서를 생성할 수 있음

이 명령어는 러스트에 들어있는 `rustdoc` 툴을 실행시키고 생성된 HTML 문서를 `target/doc` 디렉토리에 저장함

편리하게 `cargo doc --open` 명령어를 실행해 생성 후 웹 브라우저에서 확인할 수 있음
