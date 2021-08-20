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

### 메인 매커니즘

**Observer -> diff -> Act -> Observer**

Current State와 Desired State를 감시, 비교, 관리한다.

## Kubernetes Cluister Control Plane

-   Kubernetes Node

    -   Container Runtime
        컨테이너 실행을 위한 Docker Engine 포함

    -   Kubelet
        Master의 명령 수행을 위한 k8s 에이전트

    -   Kube-proxy
        인바운드 또는 아웃바운드 트래픽에 대한 네트워크 프록시 담당

    -   cAdvisor
        Container Advisor 리소스 사용 / 성능 통계를 제공

## 기능 간 시퀸스 다이어그램

![k8s scheduler](https://user-images.githubusercontent.com/26461307/130236439-4eead740-a775-4f0d-9ffc-6bda4df05959.png)

## 실습

1. AWS EC2 CentOS 7 생성 (1 Master, 2 Worker)
2. Set up the repository

```bash
sudo yum install -y yum-utils

sudo yum-config-manager \
    --add-repo \
    https://download.docker.com/linux/centos/docker-ce.repo
```

3. Install Docker Engine

```bash
sudo yum install docker-ce docker-ce-cli containerd.io
```
