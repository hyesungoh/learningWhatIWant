# Rust - 설치

## Linux, macOS

```bash
curl https://sh.rustup.rs -sSf | sh
```

`rustup`이라고 하는 러스트 버전 및 관련 도구 관리 커맨드 라인 도구 설치

```bash
source $HOME/.cargo/env
```

시스템 path에 추가

## 업데이트 및 삭제

```bash
rustup update
```

업데이트

```bash
rustup self uninstall
```

삭제

## 설치 확인

```bash
rustc --version
```
