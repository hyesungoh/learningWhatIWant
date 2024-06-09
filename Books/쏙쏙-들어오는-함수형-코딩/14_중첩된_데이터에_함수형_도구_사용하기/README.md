# 중첩된 데이터에 함수형 도구 사용하기

## update

* 객체를 다루기 위한 고차 함수

```js
function update(object, key, modify) {
    const value = object[key];
    const newValue = modify(value);
    return {
        ...object,
        [key]: newValue
    };
}
```

## 중첩된 객체에 update 적용하기

* 재귀를 이용해 구현

```js
function nestedUpdate(object, keys, modify) {
    if (keys.length === 0) {
        return modify(object);
    }

    const [head, ...tail] = keys;
    return update(object, head, value => {
        return nestedUpdate(value, tail, modify);
    });
}
```

## 안전한 재귀 사용법

* 종료 조건
* 재귀 호출
* 종료 조건에 다가가기

## 깊이 중첩된 데이터에 추상화 벽 사용하기

* 깊게 중첩되어 있으면 데이터 구조를 이해하기 어려움
* 이를 일부 추상화 시켜 두뇌 용량을 극복할 수 있음

```js
// as is
nestedUpdate(object, ['posts', '12', 'author', 'name'], capitalize);

// to be
function updatePostById(object, id, modifyPost) {
    return nestedUpdate(object, ['posts', id], modifyPost);
}

function updateAuthor(post, modifyAuthor) {
    return update(post, 'author', modifyAuthor);
}

function capitalizeName(user) {
    return update(user, 'name', capitalize);
}

updatePostById(object, '12', post => {
    return updateAuthor(post, capitalizeName);
});
```

> 기억할 게 줄었다고 말할 수 있을까?
> > 난 잘 모르겠는데, 위에가 더 간결한 거 같기도 하고
>
> 이는 암묵적 인자가 아닌가? 암묵적 인자와 추상화 벽의 사이를 알잘딱 해야겠지만
