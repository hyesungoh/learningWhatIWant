# VPC

## VPC로 트래픽 보내기

VPC 서브넷의 인스턴스에 대해 인터넷 액세스를 활성화하려면 다음을 수행해야함

1. 인터넷 게이트웨이를 VPC에 연결
2. 라우팅 테이블을 인터넷 게이트웨이에 연결
3. 인스턴스에 퍼블릭 IP 또는 탄력적인 IP 주소가 있는지 확인
4. 네트워크 ACL과 SG(시큐리티 그룹)이 관련 트래픽 흐름을 허용하는지 확인

