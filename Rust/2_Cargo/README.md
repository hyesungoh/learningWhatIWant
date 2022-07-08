# Cargo

`cargo`는 러스트의 빌드 시스템 및 패키지 매니저

## cargo 설치 확인

```bash
cargo --version
```

## cargo를 사용해 프로젝트 생성

```bash
cargo new project_name --bin

cd project_name
```

`project_name`이라는 실행 가능한 바이너리를 생선하는 커맨드인데,

`--bin` 인자가 라이브러리가 아닌 실행 가능한 애플리케이션으로 만들어주는 역할을 한다. (binary)

## Cargo.toml

TOML 포맷으로 작성된 파일은 cargo의 환경설정 포맷

`[package]` 이후의 문장들은 프로그램을 컴파일하기 위해 필요로 하는 정보에 대한 설정을 함

> 이름, 버전, 작성자 등

`[dependencies]`는 프로젝트의 의존성들의 리스트를 적을 수 있는 섹션

러스트에서는 코드의 패키지를 `crate(크레이트)`라고 부름

## 빌드하고 실행하기

```bash
# cargo 프로젝트 디렉토리에서
cargo build
```

build 커맨드는 `target` 하위 디렉토리에 파일들을 만들며, 실행 파일은 `target/debug/project_name`으로 생성됨

```bash
./target/debug/project_name
```

이처럼 `cargo build`로 프로젝트를 빌드하고, 직접 바이너리 파일을 실행할 수도 있지만, `cargo run`을 사용해 한 번의 커맨드로 코드를 컴파일한 다음 실행할 수 있음

```bash
cargo run

Hello, world!
```

`build` 후에 `cargo run`을 했으면 컴파일 중이라는 출력을 볼 수 없는데, 이는 cargo가 파일들이 변경된 적이 없음을 알아내고 그저 실행만 했을 뿐이란 것을 의미

만약 변경 사항이 있으면 프로젝트를 다시 빌드하는 출력을 볼 수 있음

## 컴파일되는지 확인

```bash
cargo check
```

명령어를 이용해 코드가 컴파일되는지를 빠르게 확인만하는 커맨드가 존재

## 릴리즈용 빌드

러스트는 릴리즈용 빌드를 할 수 있는데, 아래 커맨드로 할 수 있음

```bash
cargo build --release
```

이는 그냥 `cargo build`와 달리 `target/debug`가 아닌, `target/release`에 실행파일을 생섬

`build`와 달리 `build --release`는 최적화를 통해 러스트 코드를 더 빠르게 만들어주지만, 컴파일하는데 드는 시간을 길게 함

이게 두 개의 서로 다른 프로파일이 있는 이유인데, 하나는 빠르게 자주 다시 빌드하기 원하는 개발용 `build`, 그리고 다른 하나는 반복적으로 빌드할 필요 없고 사용자들이 가능한 빠르게 실행되는 프로그램을 빌드하기 위한 용도 `build --release`
