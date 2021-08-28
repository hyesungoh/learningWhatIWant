# ELB

-   HTTP, HTTPS, TCP, UDP 및 SSL 프로토콜을 사용
-   외부 또는 내부에 위치 가능
-   각 로드 밸런서에 DNS 이름이 부여
-   비정상 인스턴스를 인식하고 이에 대응

## 옵션

-   **Application Load Balancer**

    -   유연한 애플리케이션 관리
    -   HTTP, HTTPS 트래픽의 고급 로드 밸런싱
    -   요청수즌(layer 7)에서 운영

-   **Network Load Balancer**
    -   애플리케이션에 대한 탁월한 성능 및 정적 IP
    -   TCP, TLS, UDP 트래픽의 로드 밸런싱
    -   연결 수준(layer 4)에서 운영

## ELB를 사용해야 하는 이유

-   고가용성
-   상태 확인
-   보안 기능
-   TLS 종료

## 세션 관리

사용자 세션을 관리하는 특정 서버로 요청을 라우팅 할 수 있다

- 클라이언트 측 쿠키
- 비용 효율성
- 세션 검색 속도 증가

