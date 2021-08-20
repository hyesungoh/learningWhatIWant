## [Docker](https://github.com/hyesungoh/learningFrontEnd/tree/master/k8s/Docker)

## [Orchestration](https://github.com/hyesungoh/learningFrontEnd/tree/master/k8s/Orchestration)

## Kubernetes 소개

> K8s = Kubernetes

-   Container Cluster Manager
-   컨테이너 오케스트레이터 (실행 및 관리)
-   다양한 클라우드 및 베어메탈 환경지원
-   Google Borg에서 시작되어 오픈소스화
-   2015년 7월 CNCF (Cloud Native Computing Foundation) 가입
-   Go 언어로 작성

## Kubernetes 메인 매커니즘

**Observer -> diff -> Act -> Observer**

Current State와 Desired State를 감시, 비교, 관리한다.
