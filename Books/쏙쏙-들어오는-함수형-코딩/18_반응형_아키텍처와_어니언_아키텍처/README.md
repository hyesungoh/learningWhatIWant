# 반응형 아키텍처와 어니언 아키텍처
* 두 패턴은 다른 단계에서 사용함
  + 반응형 아키텍처는 순차적 액션 단계에서
  + 어니언 아키텍처는 서비스의 모든 단계에서

## 반응형 아키텍처

* 애플리케이션을 구조화하는 방법
  + 이벤트에 대한 반응으로 일어날 일을 지정하는 것

```js
// as is
var shopping_cart = [];
shopping_cart = add_item(shopping_cart, item);

// to be

function ValueCell(init) {
    var current = init;
    var watchers = [];

    return {
        val: function() {
            return current;
        },
        update: function(f) {
            var oldValue = current;
            var newValue = f(oldValue);

            if (oldValue !== newValue) {
                current = newValue;
                watchers.forEach(function(w) {
                    w(newValue, oldValue);
                });
            }
        },
        addWatcher: function(f) {
            watchers.push(f);
        }
    }
}
```

> 스프레드시트는 반응형 아키텍처로 구성되어 있음.
> > 셀의 값을 변경하면 그에 대한 반응으로 스프레드시트 함수가 다시 계산

> 감시자(watcher)는 다른 이름으로도 쓰임
> > 감시자, 옵저버, 이벤트 핸들러, 콜백, 리스너

### FormulaCell

* 어떤 셀은 다른 셀의 값을 최신으로 반영하기 위해 파생될 수 있음

```js
function FormulaCell(upstreamCell, f) {
    var myCell = ValueCell(f(upstreamCell.val()));

    upstreamCell.addWatcher((newUpstreamValue) => {
        myCell.update((current) => f(newUpstreamValue));
    });

    return {
        val: myCell.val,
        update: myCell.update,
    }
}

// ...
var shopping_cart = ValueCell({});
var total = FormulaCell(shopping_cart, calculate_total);
```

> atom과 많이 닮아있다 생각했는데, 같은 것이라고 소개하네용

### 반응형 아키텍처가 코드에 주는 영향

* 원인과 효과가 결합된 것을 분리
* 여러 단계를 파이프라인으로 처리
* 타임라인이 유연해짐

> 문제가 없는데 분리하는 것은 좋지 않다.
> 순서대로 표현하는 것이 더 명확할 수 있음.

## 어니언 아키텍처

* 현실 세계와 상호작용하기 위한 서비스 구조를 만드는 방법
  

### 계층

* 인터랙션 계층
  + 바깥세상에 영향을 주거나 받는 액션
* 도메인 계층
  + 비즈니스 규칙을 정의하는 계산
* 언어 계층
  + 언어 유틸리티와 라이브러리

### 규칙

1. 현실 세계와 상호작용은 인터랙션 계층에서 해야 함
2. 계층에서 호출하는 방향은 중심 방향
3. 계층은 외부에 어떤 계층이 있는지 모름
   
- 인터랙션 계층을 바꾸기 쉽고, 도메인 계층을 재사용하기 좋음

### 도메인 규칙은 도메인 용어를 사용

- 도메인 규칙에 속하는지 인터랙션 계층에 속하는지 판단하려면 코드에서 사용하는 용어를 보면 됨

