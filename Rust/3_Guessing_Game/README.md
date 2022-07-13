# 추리 게임

실습 프로젝트를 통해 러스트를 사용해보는 과정

여기서는 실제 프로젝트에서 몇몇 일반적인 Rust 개념이 어떻게 활용되는지 소개해, `let`, `match`, `메소드`, `연관함수(associated functions)`, `외부 크레이트(external crates)`의 활용 방법을 배울 수 있음

## 결과물

1~100 사이의 임의의 정수를 생성하고, 플레이어가 추리한 정수를 입력.
그리고 프로그램은 입력받은 추리값이 정답보다 높거나 낮은지를 알려주는 프로그램

## 표준 입출력

사용자 입력을 받고 결과값을 표시하기 위해서는 `io` 라이브러리를 스코프로 가져와야 하고, 이는 `std`라 불리는 표준 라이브러리가 있음

```rs
use std::io;
```

## 변수

```rs
let foo = 5; // 불변 변수
let mut guess = String::new(); // 가변 변수
```

러스트의 변수는 기본적으로 불변

### String::new()

- String은 표준 라이브러리에서 제공하는 확장 가능한 UTF-8 인코딩의 문자열 타입

`::new`에 있는 `::`는 new가 String 타입의 **연관함수**임을 나타냄

- 연관함수는 하나의 타입을 위한 함수
- 이 경우에는 하나의 String 인스턴스가 아니라 String 타입을 위한 함수
- 몇몇 언어에서는 이것을 **정적 메소드**라고 부름

## 입력

```rs
io::stdin().read_line(&mut guess)
    .expect("Failed to read line");
```

### `io::stdin()`

- `io`의 연관함수인 `stdin`을 호출
  - 만약 `use std::io`문을 작성하지 않았으면, `std::io::stdin`처럼 작성해야 함
- stdin 함수는 터미널의 표준 입력의 핸들(handle) 타입인 `std::io::Stdin`의 인스턴스를 반환

### `.read_line(&mut guess)`

- 입력을 받기 위해 표준 입력 핸들에서 `read_line` 메소드를 호출하는 것
- `read_line`의 인자로 `&mut guess`를 넘김
- `read_line`은 입력된 문자들을 하나의 문자열에 저장하므로, 인자로 값을 저장할 문자열이 필요하며 이는 **가변**이어야 함

- `&`는 여러 부분에서 데이터를 메모리로 복사하지 않고 접근하기 위한 **참조자**
  - 참조자를 사용함으로써 러스트는 안전성과 용이성을 얻음
  - 참조자는 변수처럼 기본적으로 **불변**
  - 가변으로 바꾸기 위해 `&guess`가 아닌 `&mut guess`로 작성한 것

## 실패 다루기

`read_line`은 인자로 넘긴 문자열에 입력값을 저장할 뿐 아니라 하나의 값을 반환하는데,

여기서 돌려준 값은 `io::Result`

> 러스트는 표준 라이브러리에 여러 종류의 Result 타입을 가지고 있는데, `제네릭 Result`이나, `io::Result`가 그 예시

`Result` 타입은 **열거형 (enums)**

> Enum은 정해진 값들만 가질 수 있으며 이러한 값들은 열거형의 variants라고 부름

Result의 variants는 `Ok`와 `Err`, `Ok`는 처리가 성공했음을 나타내며 `Err`은 처리가 실패했음을 나타내고 그 이유에 대한 정보를 가지고 있음

Result 타입은 다른 타입들처럼 메소드들을 가지고 있는데, `io::Result` 인스턴스는 `expect` 메소드를 가지고 있음

- `io::Result`의 인스턴스가 `Err`일 경우 expect 메소드는 프로그램 작동을 멈추고 expect 인자로 넘겼던 메세지를 출력함

```rs
io::stdin().read_line(&mut guess);
```

만약 위처럼 `expect`를 호출하지 않는다면 컴파일은 되지만 경고 메세지가 나오게 됨

## println! 변경자

```rs
println!("You guessed: {}", guess);
```

위 라인은 사용자가 입력한 값을 저장한 문자열을 출력함

`{}`는 변경자로써 값이 표시되는 위치를 나타냄

```rs
let x = 10;
let y = 20;

println!("x = {} and y = {}", x, y);
```

위 코드처럼 변경자를 이용해 여러 값을 표시할 수 있음

## 의존성

1에서 100사이의 임의의 수를 사용할 것인데, 러스트는 아직 표준 라이브러리에 임의의 값을 생성하는 기능이 없음

그레서 `rand` 크레이트(crate)를 사용할 것

### 의존성 추가

```toml
[dependencies]

rand = "0.3.14"
```

`Cargo.toml` 파일에 추가 후

```bash
cargo build
```

명령어를 통해 의존성을 설치할 수 있음

- Cargo는 Crates.io 데이터의 복사본인 레지스트리에서 모든 것을 가져옴

> Crates.io는 러스트의 오픈소스를 공개하는 곳

### Cargo.lock

다른 누구라도 동일한 코드를 빌드할 때 같은 산출물이 나오도록 보장하는 방법

이는 Cargo가 기준을 만족하는 모든 의존 패키지의 버전을 확인하고 Cargo.lock에 기록한 후

빌드할 때 Cargo.lock 파일에 존재하는 명시된 버전들을 사용하는 방법으로 해결함

### 의존성 업그레이드

```bash
cargo update
```

위 명령어를 통해 Cargo.lock 파일을 무시하고 Cargo.toml에 명시된 최신 버전을 확인해 업데이트할 수 있음

#### 예시

만약 `0.3.14`를 Cargo.toml에 기록하였으며, 최신 버전으로 `0.3.15`, `0.4.0`이 있을 때 `cargo update`를 실행하게되면 `0.3.15`가 설치되게 됨

이 때 `0.4.x`에 해당하는 버전을 설치하고 싶다면 다음과 같이 Cargo.toml을 업데이트해야함

```toml
[dependencies]

rand = "0.4.0"
```

## 난수 생성 (의존성 사용)

```rs
extern crate rand;

use rand::Rng;

fn main() {
  let secret_number = rand::thread_rng().gen_range(1, 101);
}
```

위 방법을 통해 난수를 생성할 수 있음

### `extern creat rand`

러스트에게 외부에 의존하는 크레이트가 있음을 알리는 라인

이 라인은 `use rand`로도 표기할 수 있음

> 이후 `rand::`를 앞에 붙여 rand 내의 모든 것을 호출할 수 있음

### `use rand::Rng`

`Rng`는 정수 생성기가 구현한 메소드들을 정의한 `trait`

해당 메소드들을 이용하기 위해서는 반드시 스코프 내에 있어야 하며, 추후에 더 자세히 다룰 예정

### rand 구현부

`rand::thread_rng` 함수는 OS가 시드를 정하고 현재 스레드에서만 사용되는 특별한 정수생성기를 반환함

`gen_range` 메소드는 두 개의 숫자를 인자로 받고 두 숫자 사이에 있는 임의의 숫자를 생성함

> 하한선은 포함, 상한선은 제외

### 의존성 문서

```bash
cargo doc --open
```

위 명령어를 통해 로컬에서 모든 의존 패키지들이 제공하는 문서들을 빌드해 브라우저에 표시할 수 있음

## match 표현식

```rs
use std::cmp::Ordering;

fn main() {
  // ...

  match guess.cmp(&secret_number) {
      Ordering::Less    => println!("Too small!"),
      Ordering::Greater => println!("Too big!"),
      Ordering::Equal   => println!("You win!"),
  }
}
```

### `std::cmp::Ordering`

`Ordering`은 `Result`와 같은 열거형(enum)이지만, Ordering의 값은 Less, Greater, Equal로 이루어져 있음

### `cmp` 메소드

비교 가능한 모든 것들에 대해 호출할 수 있는 메소드이며, 비교하고 싶은 것들의 참조자를 받아 사용할 수 있음

`cmp`는 `Ordering` 열거형을 반환하는데 이 때 match 표현문을 이용해 두 값을 비교한 결과인 Ordering 값에 따라 무엇을 할 것인지 결정할 수 있음

### `match`

match 표현식은 `arm`으로 이루어져 있음

> arm은 하나의 패턴과 표현식에서 주어진 값이 맞는다면 실행할 코드로 이루어져 있음

러스트는 패턴에 맞는지 순서대로 확인함

즉, `cmp` 메소드의 반환 값이 `Ordering::Greater`일 시 다음과 같은 형태로 실행되는 것

```diff
match Ordering::Greater {
-    Ordering::Less    => println!("Too small!"), // 일치하지 않음
+    Ordering::Greater => println!("Too big!"),   // 일치함
-    Ordering::Equal   => println!("You win!"),   // 위에서 일치하여 실행되지 않음
}
```
