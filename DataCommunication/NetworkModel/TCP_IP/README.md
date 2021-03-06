## TCP/IP 프로토콜

-   OSI 보다 먼저 개발
-   계층구조는 OSI 모델과 정확하게 일치하지 않음
-   계층
    -   물리층과 데이터 링크층
    -   네트워크 계층
        -   **인터넷 프로토콜 IP**
        -   주소 변환 프로토콜 ARP
        -   인터넷 제어 메시지 프로토콜 ICMP
        -   인터넷 그룹 메시지 프로토콜 IGMP
    -   전송 계층
        -   사용자 데이터그램 프로토콜 UDP
        -   **전송 제어 프로토콜 TCP**
        -   스트림 제어 전송 프로토콜 SCTP
    -   응용 계층

## 주소 지정

인터넷에서 4가지 주소 이용

-   물리 주소 (데이터링크, 물리층)
-   논리 주소 (네트워크층)
-   포트 주소 (전송층)
-   특수 주소 (응용층)

## 물리 주소

-   LAN, WAN에 의해 정의된 노드의 주소
-   데이터 링크층에서 사용하는 프레임에 포함
-   이더넷에서는 6바이트 물리 주소 사용
-   NIC(Network Interface Card)에 저장

## 논리 주소

-   전세계적으로 각 시스템(호스트)를 구분하는 주소
-   32비트 사용
-   인터넷 주소 또는 IP 주소
-   물리 주소는 홉을 거칠 때마다 변하지만, 논리주소는 항상 그대로 유지

## 포트 주소

-   10진수로 표현되는 16비트 주소

## 특수 주소

-   사용자에게 편리하게 사용되는 주소
-   예: Email 주소, URL 주소
