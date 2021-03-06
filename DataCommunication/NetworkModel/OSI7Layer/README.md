## 네트워크 모델

#### OSI 모델 - 7계층

#### 인터넷 모델 - 5계층

### 네트워크 분류

-   LAN, 근거리 통신망
-   MAN, 도시 통신망
-   WAN, 광역 통신망
-   PAN, 개인 영역 통신망
-   BAN, 신체 통신망

## 프로토콜

-   개체간에 이루어진 데이터 통신을 제어하는 규칙들의 집합

**주요 요소**

-   무엇을 -> 구문
    -   데이터 구조와 형식, 부호화, 크기
    -   무엇을 어떤 순서로 전송할 것인가에 관한 내용
-   어떻게 -> 의미
    -   데이터 형태에 대해 어떻게 해석하고 어떤 동작을 취할 것인가?
-   언제 -> 타이밍
    -   수신자와 송신자간의 데이터 전송 시간과 속도 조절

## 표준

-   통신기기 시장을 개방적이고 경쟁적으로 만들기 위한 관리 문서
-   국제 또는 국내의 데이터 통신 기술 및 처리에 대한 호환성 보장

-   법률 표준
-   사실 표준
    -   특허 표준
    -   비특허 표준

### 표준화 기구

-   ISO
-   ITU-T
-   ANSI
-   IEEE
-   EIA
-   Forum (광대역 포럼, 인터넷 협회, WWW 컨소시엄)

## OSI 모델

-   국제표준화기구 (ISO)에서 제정한 개방시스템 상호연결 모델
-   1970년 후반에 처음 소개
-   모든 유형의 컴퓨터 시스템 간의 통신을 허용하는 네트워크 시스템을 설계하기 위한 계층 구조를 갖는 모델
-   OSI : Open System Inteerconnection
-   Basic Reference Model : ISO-7498

## OSI 모델 7계층

7 : 응용
6 : 표현
5 : 세션
4 : 전송 (수송)
3 : 네트워크
2 : 데이터 링크
1 : 물리

#### 계층 구조

각 임무들이 계층구조에서 주어진 순서대로 수행

#### 서비스

-   각 계층은 바로 아래 계층의 서비스 이용
-   아래 계층은 상위 계층에 서비스를 제공

## OSI 모델 계층 구조

[osimodel](https://img1.daumcdn.net/thumb/R800x0/?scode=mtistory2&fname=https%3A%2F%2Ft1.daumcdn.net%2Fcfile%2Ftistory%2F2274164853480D0514)

#### 대등-대-대등 (Peer-to-Peer) 프로세스

-   해당 계층에서 통신하는 각 시스템의 프로세스
-   시스템 간의 통신은 적절한 프로토콜을 사용하는 해당 계층의 대등-대-대등 프로세스

#### 계층간 인터페이스

-   자신의 바로 위 계층에 제공되는 정보(SDU)와 서비스를 정의

#### 계층의 기본구조

-   계층 1, 2, 3 - 네트워크 지원 계층
-   계층 5, 6, 7 - 사용자 지원 계층
-   계층 4 - 전송 계층

    -   네트워크 지원 계층과 사용자 지원 계층을 서로 연결

-   캡슐화
    -   7~3 계층 : 헤더 추가, 상위 계층이 추가한 헤더는 볼 수 없음
    -   2 계층 : Trailer, 에러 발생 유무를 처리

## 물리층

-   물리적인 매체를 통해 비트 흐름을 전송하기 위해 요구되는 기능 제어
-   데이터 링크층으로부터 한 단위의 데이터를 받아 통신 링크를 따라 전송될 수 있는 형태로 변환
-   비트 스트림을 전자기 신호로 변환
-   전송매체를 통한 신호 전송 감독

-   고려사항
    -   회선 구성 : 점대점, 다중점
    -   데이터 전송 방식 : 단방향, 반이중, 전이중
    -   물리적인 접속형태: 메쉬, 스타, 버스, 링
    -   신호 : 신호 유형, 전자기/광 신호
    -   부호화 : 아날로그, 디지털
    -   인터페이스 장치와 전송매체 간의 연결
    -   전송매체
    -   데이터 속도
    -   비트의 동기화

## 데이터 링크층

-   `프레임`
-   하나의 지국에서 다른 지국으로 **오류 없는 데이터 전달에 대한 책임**을 가짐
-   노드-대-노드(홉-대-홉) 전달
-   세 번째 층으로부터 데이터를 받아서 주소와 제어 정보를 포함하고 시작(header)과 끝(trailer)에 서비스 제공에 필요한 정보비트를 추가한다 (프레임, frame)

-   기능
    -   프레임 짜기
    -   물리주소 주솟지정
    -   접근 제어
    -   흐름 제어
    -   오류 처리

## 네트워크 계층

-   `패킷`
-   다중 네트워크 링크를 통해 패킷의 발신지-대-발신지 전달에 대한 책임을 가짐
-   두 가지 관련 서비스를 제공

    -   교환 (Switching)
        네트워크 전송을 위해 물리적 링크 간의 임시적인 연결 (전화 시스템)
    -   경로지정 (Routing)
        한 지점에서 다른 지점으로 패킷을 전송할 수 있는 여러 경로가 있을 때 가장 좋은 경로를 선택하는 기능

-   기능
    -   패킷의 발신지-대-목적지 전달
    -   논리적인 주소지정
    -   경로지정
    -   주소 변환
    -   다중화

## 전송 계층

-   전체 메시지의 발신지-대-목적지 프로세스 간 전달에 대한 책임을 가짐

-   기능
    -   Process-to-Process Delivery (프로세스 대 프로세스 전달)
    -   서비스 지점 주소 지정
    -   분할(단편화)과 재조립
    -   연결 제어
    -   흐름 제어
    -   오류 제어

## 세션층

-   네트워크의 대화(dialog) 제어자
-   기능
    -   대화 제어 - 프로세스 간에 반이중 또는 전이중 방식 대화
    -   동기화 - 확인점 또는 동기점 이용
    -   원활한 종료

## 표현층

-   통신 장치간의 상호 연동(interoperability) 보장
-   기능
    -   변환 (Tranlation)
    -   암/복호화 (Encryption / Decryption)
    -   압축 및 압축해제 (Compression)
    -   보안 (Security)

## 응용층

-   네트워크 상의 소프트웨어 사용자에게 사용자 인터페이스 제공

-   서비스
    -   네트워크 가상 터미널
    -   파일 접근, 전송, 관리
    -   우편 서비스
    -   디렉토리 서비스
