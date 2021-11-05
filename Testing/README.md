## Health Check

대상 서비스를 호출하여 상태 응답이 정상적으로 오는지 확인하는 간단하고 빠른 속도로 진행되는 테스트

#### 테스트 범위

-   마이크로 서비스 실행에 필요한 관련 마이크로 서비스, 리소스 등

#### 기대 효과

-   서비스 간의 연결 상태가 정상인지 확인 할 수 있음
-   연결된 서비스의 생존 여부를 파악 할 수 있음

## Smoke Test

주요 기능을 중심으로 내외부 연동 기능의 정상 동작을 확인하는 테스

정상 케이스를 중점으로 테스트 함

#### 테스트 범위

-   주요 핵심 기능

#### 기대 효과

-   FE E2E 테스트 진행

## Module Test

단일 Module의 기능이 정상 동작하는지 확인하는 것으로 기능성, 정합성, 결합여부 등을 테스트하여 정해진 기능을 제대로 수행하는지 확인

화면 단위 Module Test는 UI 형태의 테스트, BE 서비스 단위 Module Test는 API Call 형태의 테스트

Module Test도 Unit test와 마찬가지로 개발 단계에서 Mocking을 사용하여 타 Module과의 연동을 배제하여 테스트 설계 및 수행

#### 테스트 범위

-   FE UI 상의 모든 기능
-   BE 모든 API

#### 기대효과

-   프로그램의 각 부분을 Module 별로 나누어 각각의 부분이 정확하게 동작하는지 확인하여 문제 발생 시 정확히 어느 부분이 잘못되었는지 빠르게 확인 가능
-   화면 Module 및 API에 대해 반복적으로 기능 보증 할 수 있음

## Unit Test

Function, Method에 대한 로직이 의도한 대로 구현되었는지 확인

#### 테스트 범위

-   함수
-   클래스

#### 기대 효과

-   Code Level에서 변경 영향도를 확인하여 결함을 빨리 제거할 수 있음
-   반복적인 검증을 통해 기능 완성도를 확보 할 수 있고 예외사항을 사전에 검증할 수 있음

## FE CI 방향

1. Unit Test
2. Module Test
3. Dev branch 병합
4. Smoke Test

## 자동화 테스트 도구

**Cypress.io**

## Cypress

#### 특징

-   Javascript only
-   Chrome, Firefox, Edge, Electron, Brave
-   Mock Server built-in

#### Directory structure - POM

Page Object Model

#### Mocking

```js
cy.server();
cy.route({
    method: "GET",
    url: "**/v1/foo"
    response: {
        ok: true
        data: {
            name: "foo"
        }
    }
});
```
