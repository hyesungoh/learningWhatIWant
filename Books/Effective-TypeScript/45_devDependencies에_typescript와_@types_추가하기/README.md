# devDependencies에 typescript와 @types 추가하기

- dependencies

  현재 프로젝트를 실행하는 데(런타임에) 필수적인 라이브러리들

- devDependencies

  현재 프로젝트를 개발하고 테스트하는 데 사용되지만, 런타임에는 필요 없는 라이브러리들

- peerDependencies

  런타임에 필요하긴 하지만, 의존성을 직접 관리하지 않는 라이브러리들

## 요약

- 타입스크립트를 시스템 레벨로 설치하면 안된다.
  타입스크립트를 프로젝트의 devDependencies에 포함시키고 팀원 모두가 동일한 버전을 사용하도록 해야 한다.

- @types 의존성은 dependencies가 아니라 devDependencies에 포함시켜야 한다.
  런타임에 @types가 필요한 경우라면 별도의 작업이 필요할 수 있다.
