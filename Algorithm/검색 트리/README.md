# 검색 트리

- 데이터의 저장과 검색은 자료구조와 알고리즘 분야에서 매우 중요한 주제
- 데이터의 저장/검색을 효율적으로 하기 위해서는 적절한 자료구조, 알고리즘을 사용하는 것이 중요
  1. 데이터가 들어오는 순서대로 배열에 저장하는 방법
     - 새로운 자료 하나를 저장하는 시간 O(1)
     - 자료를 검색하는 시간은 평균 O(n)
  2. 데이터를 트리 모양의 자료구조인 검색 트리에 저장하는 방법
     - 새로운 자료 하나를 저장하는 시간 O(log n)
     - 자료를 검색하는 시간도 평균 O(log n)

## 레코드와 키

### 레코드

- 개체에 대해 수집된 모든 정보를 포함하고 있는 저장 단위
- 예) 주민등록번호, 이름, 주소 등

### 필드

- 레코드에서 각각의 정보를 나타내는 부분
- 예) 주민등록번호 필드, 이름 필드, 주소 필드 등

### 검색키 또는 키

- 다른 레코드와 중복되지 않도록 각 레코드를 대표하는 필드
- 키는 하나의 필드로 이루어질 수도 있고, 두 개 이상의 필드로 이루어질 수도 있다.
- 예) 주민등록번호 필드

### 검색트리

- 트리 구조로서 각 노드가 규칙에 맞도록 하나씩의 키를 지니며, 이를 통해 해당 레코드가 저장된 위치를 알 수 있다.

## 검색 트리의 분류

### 자식 노드 개수에 따라

- 이진검색트리 : 자식 노드 최대 개수가 2
- 다진검색트리 : 자식 노드 최대 개수가 3 이상
  - k진검색트리 : 자식 노드 최대 개수가 k

### 저장 장소에 따라

- 내부검색트리 : 검색트리가 메인 메모리에 존재
- 외부검색트리 : 검색트리가 외부(주로 디스크)에 존재

### 검색키에 포함된 필드 수에 따라

- 일차원 검색트리 : 필드가 하나
  - 이진검색트리, B-트리, AVL-트리, 레드블랙트리
- 다차원 검색트리 : 필드가 두 개 이상
  - KD-트리, KDB-트리, R-트리

---

## 이진검색트리 (Binary Search Tree)

- 각 노드는 키 값을 하나씩 가지며, 키 값은 모두 다르다.
- 최사위 레벨에 루트 노트가 있고, 각 노드는 최대 두 개의 자식을 갖는다.
- 각 노드의 키값은 자신의 왼쪽 서브트리 모든 노드의 키 값보다 크고, 오른쪽 서브트리 모든 노드의 키 값보다 작다.

### 노드 구조

[left / key / right]
[left child에 대한 링크 / 키와 그밖의 데이터 / right child에 대한 링크]

### 순회

```ts
function treeInorderTraverse(t: Node) {
  if (t !== null) {
    treeInorderTraverse(t.left);
    console.log(t.key);
    treeInorderTraverse(t.right);
  }
}
```

### 검색

```ts
// t: 트리의 루트 노드
// x: 검색하고자 하는 키
function treeSearch(t: Node, x: Node) {
  // 루트 노드가 없거나, 찾는 값이 루트 노드일 시
  if (t === null or t.key = x) return t;
  // 찾는 값이 작을 시
  if (x < t.key) return treeSearch(t.left, x);
  // 찾는 값이 클 시
  else return treeSearch(t.right, x);
}
```

### 삽입

```ts
// t: 트리의 루트 노드
// x: 삽입하고자 하는 키
function treeInsert(t: Node, x: Node) {
  // 루트 노드가 없을 시
  if (t === null) {
    r.key = x;
    return k;
  }

  // 삽입할 값이 작을 시
  if (x < t.key) {
    t.left = treeInsert(t.left, x);
    return t;
  } else {
    // 삽입할 값이 클 시
    t.right = treeInsert(t.right, x);
    return t;
  }
}
```

### 삭제

```ts
// t: 트리의 루트 노드
// r: 삭제하고자 하는 노드
function deleteNode(r) {
  // r이 리프 노드인 경우
  if (r.left === null && r.right === null) return null;
  // r의 자식 노드가 하나인 경우
  // r의 부모가 r의 자식을 직접 가리키도록
  else if (r.left === null && r.right !== null) return r.right;
  else if (r.left !== null && r.right === null) return r.left;
  // 자식 노드가 두 개인 경우
  else {
    // r의 right subtree 중 최소인 s를 찾는 과정
    let s = r.right;
    while (s.left !== null) {
      let parent = s;
      s = s.left;
    }

    // s의 내용을 r에 복사한 후, s를 삭제
    r.key = s.key;
    if (s === r.right) r.right = s.right;
    else parent.left = s.right;
    return r;
  }
}
```

### 성능

노드 수 n, 높이 h인 이진검색트리에서 하나의 노드 검색/삽입/삭제 연산의 수행시간은 `O(h)`

- 평균적으로는 O(log n)
- 최악의 경우 O(n)

-> 레드블랙트리, AVL 트리와 균형 잡힌 트리를 이용하면 최악의 경우 O(log n)의 성능을 얻을 수 있음

## 레드 블랙 트리 (Red-Black Tree)

균형잡힌 이진 검색 트리

- BST에 몇가지 조건을 추가하여 Balanced tree가 되도록 변경시킨 것
- 트리의 높이가 O(log n), 단 n은 노드 수
- 검색/삽입/삭제 연산의 수행시간은 O(log n)

Red-black tree는 BST의 모든 노드에 Red 또는 Black의 색을 칠하되 다음고 같은 레드 블랙 특성을 만족해야 한다.

1. 루트는 블랙이다
2. 모든 리프는 블랙이다
3. 노드가 레드이면 그 노드의 자식은 반드시 블랙이다.
4. 루트 노드에서 임의의 리프 노드에 이르는 경로에서 만나는 블랙 노드의 수는 모두 같다.

### 검색

BST와 동일

### 삽입/삭제

기본적으로 BST와 동일한 방식이지만, 레드 블랙 특성이 깨지지 않으면 그대로 연산을 완료하고

깨지는 경우 적절한 작업을 수행하여 레드 블랙 특성을 만족하도록 바로 잡는다.

### 삽입

기본적으로 BST와 동일한 방식이지만, **새로 삽입된 노드를 레드로 칠한다 (x)**

> 비어있는 트리에 처음 삽입되는 노드는 루트 노드이므로 블랙으로

만일 x의 부모 노드 p의 색상이

- 블랙이면 아무 문제 없다.
- 레드이면 레드블랙 특성 (3)이 깨진다.

Case 1: s가 레드

![스크린샷 2022-04-26 오전 2 12 59](https://user-images.githubusercontent.com/26461307/165139516-6a7d7678-2d8e-42ef-be8f-ad7cd752a0ef.png)

Case 2-1: s가 블랙이고, x가 p의 오른쪽 자식

![스크린샷 2022-04-26 오전 2 14 30](https://user-images.githubusercontent.com/26461307/165139747-8fb82a96-ad1d-498a-8ff5-d8809dfa68c9.png)

Case 2-2: s가 블랙이고, x가 p의 왼쪽 자식

![스크린샷 2022-04-26 오전 2 15 07](https://user-images.githubusercontent.com/26461307/165139829-981541ea-b608-4e07-af53-190174ed3b66.png)

예: 1 2 3 4 10 8 9

![스크린샷 2022-04-26 오전 2 37 24](https://user-images.githubusercontent.com/26461307/165143311-1b2c15b0-fb38-48c0-a7a2-3d32f660d492.png)
