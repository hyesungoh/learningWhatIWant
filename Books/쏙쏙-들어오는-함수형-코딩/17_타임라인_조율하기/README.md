# 타임라인 조율하기

## 타임라인을 나누기 위한 동시성 기본형

* 경쟁 조건(race condition)?
  + 어떤 동작이 먼저 끝나는 타임라인에 의존할 때 발생

## Cut

* 다른 요청을 기다리기
* Promise.all()

```js
function Cut(num, callback) {
    var num_finished = 0;
    return function() {
        num_finished += 1;
        if (num_finished === num) {
            callback();
        }
    }
}

var done = Cut(2, function() {
    console.log('Done');
});

done();
done();
```

* 자바스크립트는 단일 스레드이기 때문에 같은 자원을 이용해 타임라인을 조율할 수 있음

## 딱 한 번만 호출하는 기본형

```js
function JustOnce(action) {
    var alreadyCalled = false;
    return function(...args) {
        if (alreadyCalled) return;
        alreadyCalled = true;
        return action(...args);
    }
}
```

* 최초 한 번만 효과가 발생하는 액션을 `멱등원`이라고 함
