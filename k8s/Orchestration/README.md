## 오케스트레이션

다수의 컨테이너를 자동으로 관리해주는 오케스트레이션 (Kubernetes) 이 등장

-   **IaaS** (Infrastructure as a Service)

    서버 자원, IP, Network, Storage, 전력 등을 가상 환경에서 쉽고 편하게 이용할 수 있는 서비스 형태

-   **Paas** (Platform as a Service)

    서비스를 개발 할 수 있는 안정적인 환경

-   **SaaS** (Softwrae as a Service)

    Cloud 환경에서 동작하는 응용프로그램을 서비스 형태로 제공하는 것s

### 필요 이유

-   고가용성을 위해 애플리케이션을 유지
-   필요에 따라 MicroService를 확장
-   여러 호스트에서 애플리케이션을 로드밸런스
-   호스트에서 애플리케이션의 하드웨어 리소스를 제한
-   여러 서비스를 쉽게 배포

#### 비유

캠핑을 즐길 때 선택 할 수 있는 옵션

-   내가 다 준비한다 : On-premise
-   바닥은 있어야지 : IaaS
-   먹을거만 사자 : PaaS
-   돈만 있으면 되지 : Saas

#### Strata of the Container Ecosystem

Layer 5 : Kubernetes, Docker Swarm
Layer 4 : Container Engine (Docker)
Layer 3 : OS (Ubuntu)
Layer 2 : Virtual Infra (vSphere, EC2, GCP, Azure)
Layer 1 : Physical Infra (Paw Compute, Storage, Network)
