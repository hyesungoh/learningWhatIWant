# 실행 컨텍스트

실행 컨텍스트는 `실행할 코드에 제공할 환경 정보들을 모아놓은 객체`

> 전역 공간에서 자동으로 생성되는 전역 컨텍스트, eval 및 함수 실행에 의한 컨텍스트 등이 있음

실행 컨텍스트 객체는 활성화되는 시정에 `VariableEnvironment`, `LexicalEnvironment`, `ThisBinding`의 세 가지 정보를 수집

## VariableEnvironment

VariableEnvironment는 LexicalEnvironment와 동일한 내용으로 구성되지만

최초 실행 시의 스냅샷을 유지함

> 실행 컨텍스트를 실행할 때 VariableEnvironment에 먼저 담은 다음, 이를 그대로 복사해서 LexialEnvironment를 만들고 이후에는 LexicalEnvironment가 수정되며 주로 활용됨

## LexicalEnvironment

VariableEnvironment와 다르게 함수 실행 도중에 변경되는 사항이 즉시 반영됨

VariableEnvironment와 동일하게 아래 요소로 구성되어 있음

- environmentRecord
- outer-EnvironmentReference

### environmentRecord

매개변수명, 변수의 식별자, 선언한 함수의 함수명을 수집

#### 호이스팅

코드 해석을 수월하게 하기 위해 environmentRecord의 수집 과정을 추상화한 개념

변수 선언과 값 할당이 동시에 이뤄지는 문장은 '선언부'만을 호이스틍하고, 할당 과정은 원래 자리에 남아있음

이 때 함수 선언문과 함수 표현식의 차이가 발생

#### 함수 선언문과 함수 표현식

```js
function a() {} // 함수 선언문

var b = function () {}; // 익명 함수 표현식

var c = function d() {}; // 기명 함수 표현식

a(); // 실행
b(); // 실행
c(); // 실행

d(); // 에러
```

함수 선언문은 함수 전체를 호이스팅함

함수 표현식은 변수 선언부만 호이스팅함

### outerEnvironmentReference

바로 직전 컨텍스트의 LexicalEnvironment 정보를 참조

#### 스코츠

스코프는 변수의 유효범위를 말함

코드 상에서 어떤 변수에 접근할 시 아래와 같은 순서로 동작함

1. 현재 컨텍스트의 LexicalEnvironment를 참조
   1. 발견 시 그 값을 반환
2. 발견하지 못할 경우 outerEnvironmentReference에 담긴 LexicalEnvrionment를 탐색
3. 전역 컨텍스트의 LexicalEnvironment까지 탐색해도 찾지 못할 시 undefined를 반환

> 전역 컨텍스트의 LexicalEnvironment에 담긴 변수를 전역변수라 함

> ES6에서는 블록에서 let과 const 그리고 strict mode에서의 함수 선언이 블록 스코프를 갖음

#### this

this는 실행 컨텍스트를 활성화하는 당시에 지정된 this가 저장됨

함수 호출 방법에 따라 그 값이 달라지며, 지정하지 않은 경우 전역 객체가 저장됨

다음 장에서 자세히 다룰 예정
