## 장점 및 특징

**끊임없이 개발하고 수정하는 일을 반복하면서 고객이 가장 만족할 수 있는 방향으로 소프트웨어를 개발**하는 방식을 구현할 수 있는 도구

## CICD 파이프라인을 설계할 때 고려 사항

-   단계
-   테스트 유형
-   테스트 순서
    -   병렬 실행 가능 여부
-   실패 감지 및 보고
-   리전
-   프로비저닝 및 관리
-   롤백

## 지속적 통합

코드 변경 사항을 중앙 리포지토리에 정기적으로 병합하고 자동화된 빌드 및 테스트를 실행

-   코드 리포지토리 사용
-   일관적이고 반복 가능한 환경에서 코드를 구축하고 테스트
-   배포에 사용할 아티팩트를 지속적으로 준비
-   빌드 실패 시 피드백 루프를 지속적으로

## 소스 제어란 ?

코드 변경 사항 추적 및 관리 활동

-   변경 사항 추적, 수정 이력 보기, 이전 버전으로 되돌리기, 협업, 격리 및 변경 사항의 빠른 식별

#### 소스 코드 관리 시스템의 예시

git, mercurial, apache subversion

#### 도구

AWS CodeCommit, Github

## AWS CodeCommit

-   안전한 Git 기반 리포지토리를 호스팅하는 완전관리형 소스 제어 서비스
-   S3에서 지원
-   간편한 확장
-   언제든지 무엇이든 저장 가능

## CICD 파이프라인의 테스트 시나리오

#### 지속적 통합

개발

-   단위 테스트
-   정적 코드 분석

빌드

-   통합 테스트
-   구성 요소 테스트
-   회귀 테스트

#### 지속적 전달 / 배포

스테이징

-   시스템 테스
-   성능 테스트
-   로드 테스트
-   규정 준수 테스트
-   UAT

프로덕션

-   A/B 테스트
-   Canary 분석
