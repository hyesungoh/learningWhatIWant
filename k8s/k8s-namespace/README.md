## Namespace ?

-   클러스터 내의 네임 스페이스
-   동일 물리 클러스터에 있는 복수의 가상 클러스터 생성 가능
-   All Logically Isolated

namespace는 CPU나 메모리와 같은 자원 사용에 대한 한도 및 제한을 하는 기능을 제공한다.

## Default Namespace

-   default: 오브젝트를 위한 기본 네임스페이스
-   kube-system: 쿠버네티스 시스템에서 생성한 오브젝트를 위한 네임스페이스
-   kube-public: 모든 사용자가 읽기 권한으로 접근할 수 있는 네임스페이스. 주로 전체 클러스터 중에 공개적으로 드러나서 읽을 수 있는 리소스를 위해 예약되어 있다.
-   kube-node-lease: node lease 기능이 활성화되면, 각 노드는 주기적으로 노드에 의해 갱신되는 kube-node-lease 네임스페이스 내 연관된 Lease 오브젝트를 가지고 NodeStatus와 Node lease는 둘 다 노드로부터의 하트 비트로 취급된다.
