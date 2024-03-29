# 메시지와 인터페이스

애플리케이션은 클래스로 구성되지만 메시지를 통해 정의된다는 사실을 기억하라

# 협력과 메시지

## 클라이언트-서버 모델

- 두 객체 사이의 협력 관계를 설명하기 위해 사용하는 전통적인 메타포는 클라이언트-서버 모델이다.

협력은 어떤 객체가 다른 객체에게 무언가를 요청할 때 시작된다.

메시지는 객체 사이의 협력을 가능하게 하는 매개체다.

## 메시지와 메서드

- 실행 시점에 메시지와 메서드를 바인딩하는 메커니즘은 두 객체 사이의 결합도를 낮춤으로써 유연하고 확장 가능한 코드를 작성할 수 있게 만든다.

## 퍼블릭 인터페이스와 오퍼레이션

프로그래밍 언어의 관점에서 퍼블릭 인터페이스에 포함된 메시지를 오퍼레이션(operation)이라고 부른다.

## 시그니처

오퍼레이션(또는 메서드)의 이름과 파라미터 목록을 합쳐 시그니처(signature)라고 부른다.

중요한 것은 객체가 수신할 수 있는 메시지가 객체의 퍼블릭 인터페이스와 그 안에 포함될 오퍼레이션을 결정한다는 것이다.

객체의 퍼블릭 인터페이스가 객체의 품질을 결정하기 때문에 결국 메시지가 객체의 품질을 결정한다고 할 수 있다.

<br />

# 인터페이스와 설계 품질

좋은 인터페이스는 **최소한의 인터페이스와 추상적인 인터페이스**라는 조건을 만족해야 한다.

- 최소한의 인터페이스는 꼭 필요한 오퍼레이션만을 인터페이스에 포함한다.
- 추상적인 인터페이스는 어떻게 수행하는지가 아니라 무엇을 하는지를 표현한다.

## 디미터 법칙

협력하는 객체의 내부 구조에 대한 결합으로 인해 발생하는 설계 문제를 해결하기 위해 제안된 원칙이 바로 디미터 법칙(Law of Demeter) 이다.

<br />

디미터 법칙을 간단하게 요약하면 객체의 내부 구조에 강하게 결합되지 않도록 협력 경로를 제한하라는 것이다.

디미터 법칙은 "낯선 자에게 말하지 말라" 또는 "오직 인접한 이웃하고만 말하라"로 요약할 수 있다.

자바나 C#과 같이 '도트(.)'를 이용해 메시지 전송을 표현하는 언어에서는 "오직 하나의 도트만 사용하라"라는 말로 요약되기도 한다.

<br />

클래스 내부의 메서드가 아래 조건을 만족하는 인스턴스에만 메시지를 전송하도록 프로그래밍해야 한다라고 이해해도 무방하다

- this 객체
- 메서드의 매개변수
- this의 속성
- this의 속성인 컬렉션의 요소
- 메서드 내에서 생성된 지역 객체

> 디미터 법칙을 따르면 부끄럼타는 코드(shy code)를 작성할 수 있다.
> 부끄럼타는 코드란 불필요한 어떤 것도 다른 객체에게 보여주지 않으며, 다른 객체의 구현에 의존하지 않는 코드를 말한다.

### 디미터 법칙과 캡슐화

디미터 법칙은 캡슐화를 다른 관점에서 표현한 것이다.

디미터 법칙이 가치 있는 이유는 클래스를 캡슐화하기 위해 따라야하는 구체적인 지침을 제공하기 때문이다.

디미터 법칙은 협력과 구현이라는 사뭇 달라 보이는 두 가지 문맥을 하나의 유기적인 개념으로 통합한다.

클래스의 내부 구현을 채워가는 동시에 현재 협력하고 있는 클래스에 관해서도 고민하도록 주의를 환기시키기 때문이다.

<br />

디미터 법칙은 객체가 자기 자신을 책임지는 자율적인 존재여야 한다는 사실을 강조한다.

정보를 처리하는 데 필요한 책임을 정보로 알고 있는 객체에게 할당하기 때문에 응집도가 높은 객체가 만들어진다.

하지만 무비판적으로 디미터 법칙을 수용하면 퍼블릭 인터페이스 관점에서 객체의 응집도가 낮아질 수도 있다.

## 묻지 말고 시켜라

디미터 법칙은 훌륭한 메시지는 객체의 상태에 관해 묻지 말고 원하는 것을 시켜야 한다는 사실을 강조한다.

**묻지 말고 시켜라(Tell. Don't Ask)**는 이런 스타일의 메시지 작성을 장려하는 원칙을 가리키는 용어다.

> 절차적인 코드는 정보를 얻은 후에 결정한다. 객체지향 코드는 객체에게 그것을 하도록 시킨다.

<br />

인터페이스는 객체가 어떻게 하는지가 아니라 무엇을 하는지를 서술해야 한다.

## 의도를 드러내는 인터페이스

'어떻게'가 아니라 '무엇을' 하는지를 드러내는 이름은 코드를 읽고 이해하기 쉽게 만들뿐만 아니라 유연한 코드를 낳는 지름길이다.

> 어떻게 하느냐가 아니라 무엇을 하느냐에 따라 메서드의 이름을 짓는 패턴을 **의도를 드러내는 선택자(Intention Revealing Selector)**라고 부른다.

> 하나의 구현을 가진 메시지의 이름을 일반화하도록 도와주는 간단한 훈련 방법을 소개하겠다.
> 매우 다른 두 번째 구현을 상상하라. 그러고는 해당 메서드에 동일한 이름을 붙인다고 상상해보라. 그렇게 하면 아마도 그 순간에 여러분이 할 수 있는 한 가장 추상적인 이름을 메서드에 붙일 것이다.

# 원칙의 함정

디미터 법칙과 묻지 말고 시켜라 스타일은 객체의 퍼블릭 인터페이스를 깔끔하고 유연하게 만들 수 있는 훌륭한 설계 원칙이다.

하지만 절대적인 법칙은 아니다. 소프트웨어 설계에 법칙이란 존재하지 않는다.

법칙에는 예외가 없지만 원칙에는 예외가 넘친다.

<br />

잊지 말아야 하는 사실은 설계가 트레이드오프의 산물이라는 것이다.

> 포보자는 원칙을 맹몽적으로 추종한다.
> 심지어 적용하려는 원칙들이 서로 충돌하는 경우에도 원칙에 정당성을 부여하고 억지로 끼워 맞추려고 노력한다.
> 결과적으로 설계는 일관성을 잃어버리고 코드는 무질서 속에 파묻히며 개발자는 길을 잃은 채 방황하게 된다.

원칙이 현재 상황에 부적합하다고 판단된다면 과감하게 원칙을 무시하라.

원칙을 아는 것보다 더 중요한 것은 언제 원칙이 유용하고 언제 유용하지 않은지를 판단할 수 있는 능력을 기르는 것이다.

## 결합도와 응집도의 충돌

객체에게 시키는 것이 항상 가능한 것은 아니다. 가끔씩은 물어야 한다.

소프트웨어 설계에 존재하는 몇 안 되는 법칙 중 하나는 "경우에 따라 다르다"라는 사실을 명심하라.

# 명령-쿼리 분리 원칙

어떤 절차를 묶어 호출 가능하도록 이름을 부여한 기능 모듈을 루틴(routine)이라고 부른다.

루틴은 다시 프로시저(procedure)와 함수(function)으로 구분할 수 있다.

- 프로시저는 부수효과를 발생시킬 수 있지만 값을 반환할 수 없다.
- 함수는 값을 반환할 수 있지만 부수효과를 발생시킬 수 없다.

명령(Command)과 쿼리(Query)는 객체의 인터페이스 측면에서 프로시저와 함수를 부르는 또 다른 이름이다.

객체의 상태를 수정하는 오퍼레이션을 명령이라고 부르고 객체와 관련된 정보를 반환하는 오퍼레이션을 쿼리라고 부른다.

따라서 개념적으로 명령은 프로시저와 동일하고 쿼리는 함수와 동일하다.

<br />

명령-쿼리 분리 원칙의 요지는 오퍼레이션은 부수효과를 발생시키는 명령이거나

부수효과를 발생시키지 않는 쿼리 중 하나여야 한다는 것이다.

- 객체의 상태를 변경하는 명령은 반환값을 가질 수 없다.
- 객체의 정보를 반환하는 쿼리는 상태를 변경할 수 없다.

<br />

이를 통해 코드는 예측 가능하고 이해하기 쉬우며 디버깅이 용이한 동시에 유지보수가 수월해질 것이다.

## 책임에 초점을 맞춰라

메시지를 먼저 선택하는 방식이 디미터 법칙, 묻지 말고 시켜라 스타일, 의도를 드러내는 인터페이스, 명령-쿼리 분리 원칙에 미치는 긍정적인 영향을 살펴보면 다음과 같다.

- 디미터 법칙
  - 협력이라는 컨텍스트 안에서 객체보다 메시지를 먼저 결정하면 두 객체 사이의 구조적인 결합도를 낮출 수 있다.
- 묻지 말고 시켜라
  - 메시지를 먼저 선택하면 묻지 말고 시켜라 스타일에 따라 협력을 구조화하게 된다.
- 의도를 드러내는 인터페이스
  - 메시지를 먼저 선택한다는 것은 메시지를 전송하는 클라이언트의 관점에서 메시지의 이름을 정한다는 것이다.
    당연히 그 이름에는 클라이언트가 무엇을 원하는지, 그 의도가 분명하게 드러날 수밖에 없다.
- 명령-쿼리 분리 원칙
  - 메시지를 먼저 선택한다는 것은 협력이라는 문맥 안에서 객체의 인터페이스에 관해 고민한다는 것을 의미한다.
    객체가 단순히 어떤 일을 해야 하는지뿐만 아니라 협력 속에서 객체의 상태를 예측하고 이해하기 쉽게 만들기 위한 방법에 관해 고민하게 된다. 따라서 예측 가능한 협력을 만들기 위해 명령과 쿼리를 분리하게 될 것이다.

훌륭한 메시지를 얻기 위한 출발점은 책임 주도 설계 원칙을 따르는 것이다.

<br />

책임 주도 설계 방법에 따라 메시지가 객체를 결정하게 하라.

그러면 여러분의 설계가 아름답고 깔끔해지며 심지어 우아해진다는 사실을 실감하게 될 것이다.
