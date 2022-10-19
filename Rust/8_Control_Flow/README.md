# Control flow (제어문)

## if 표현식

```rust
fn main() {
  let number = 3;

  if number < 5 {
    println!("true");
  } else {
    println!("false");
  }
}
```

**조건은 반드시 `bool`이어야 함**

```rust

if number {} // error

if number != 0 {} // success

```

### else if

```rust
fn main() {
  let number = 4;

  if number % 4 == 0 {
    //
  } else if number % 3 == 0 {
    //
  } else {
    //
  }
}
```

**너무 많은 else if는 코드를 이해하기 어렵게 하므로 `match`라 불리는 강력한 분기 생성자를 이용하면 좋음**

### let 구문에서 if 사용하기

if가 표현식이기 때문에 let 구문의 우측에 사용할 수 있음

```rust
fn main() {
  let condition = true;
  let number = if condition {
    5
  } else {
    6
  }
}
```

코드 블록은 그들의 마지막에 위치한 표현식을 산출함, 그리고 숫자는 그 자체로 표현식임.

**이 경우 전체 if 식에 속한 갈래는 반드시 같은 타입이어야 함**

만약 아래와 같은 코드가 있다면, Rust는 정확히 어느 지점에 문제가 있는지 말해줌

```rust
fn main() {
  let condition = true;

  let number = if condition {
    5
  } else {
    'six'
  }
}
```

if는 정수형을 산출하는 식이고, else는 문자열을 산출하는 식이기 때문

> 변수가 가질 수 있는 타입이 오직 하나이기 떄문

