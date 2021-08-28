# CloudFront

아마존의 글로벌 CDN

## Amazon CloudFront에서 캐싱이 작동하는 방식

1. 요청이 최적의 엣지 로케이션으로 라우팅됨
2. 캐시되지 않은 콘텐츠가 오리진으로부터 검색됨
3. 오리진 콘텐츠가 캐싱을 위해 CloudFront 엣지 로케이션으로 전송됨
4. 데이터가 최종 사용자에게 전송됨

### 캐시할 컨텐츠의 유형

-   보안
-   사용자 입력
-   동영상
-   동적 (TTL)

## CloudFront를 구성하는 방법

1. S3 버킷, HTTP/S 엔드포인트
2. 웹 배포
3. DNS 할당
4. 구성정보

## 콘텐츠 만료 방법

Time To Live (TTL)

-   기간 고정 (만료 기간)
-   고객이 설정
-   CloudFront에서 오리진으로 GET 요청에 If-Modified-Since header를 사용

객체 이름 변경

-   ~v1.jpg를 ~v2.jpg로 변경

## 아키텍처 예제

사용자 -> CloudFront / **인터넷**
CloudFront -> AWS EC2 (동적 콘텐츠) / **AWS 망**
CloudFront -> AWS S3 (정적 콘텐츠) / **AWS 망**

### DDoS 완화의 에

사용자 -> Route 53 -> WAF -> CloudFront -> AWS VPC

DDoS 같은 잘 알려진 공격은 WAF를 통해 보안 강화 가능

