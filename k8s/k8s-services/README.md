## Kubernetes Networking

## Kubernetes Service

-   동일한 서비스를 제공하는 Pod 그룹에 단일 진입점을 제공
-   3가지 Type 지원
    -   ClusterIP, NodePortm, LoadBalancer
    -   default = ClusterIP
-   kube-proxy를 통한 backend iptables rule 생성

### 서비스 관리

-   서비스를 지원하는 Pod는 하나 또는 그 이상일 수 있다.
-   서비스로의 연결은 LoadBalancer(Round Robin) 될 수 있다.
-   서비스의 Pod들은 label selector를 통해 관리된다.

### Cluster IP

-   동일한 서비스를 제공하는 Pod 그룹에 단일 진입점을 제공
-   selector를 지정하여 Pod group을 구성한다.
-   각 Pod의 endpoint의 묶음

```bash
kubectl create deployment webserver --image=nginx:latest
kubectl expose deployment webserver --type=ClusterIP --port=80
kubectl get all
```

```yaml
apiVersion: v1
kind: Service
metadata:
    name: appjs-service
spec:
    ports:
        - port: 80
          targetPort: 8080
    selector:
        app: appjs
```

## Session Affinity

-   특정 클라이언트에서 생성된 모든 요청을 매번 같은 Pod로 연결
-   Session Affinity Type
    -   None
    -   ClientIP

### 서비스에 session affinity 구성

클라이언트에서 생성된 모든 요청이 매번 같은 Pod로 redirect 되도록 할 때,
Session Affinity 값을 기본값인 None 대신 ClientIP로 설정한다.

## externalTrafficPolicy

외부 클라이언트가 서비스로 NodePort를 통해 연결할 때 임의로 선택된 Pod는 연결요청을 받았던 같은 노드일 수도 있고, 아닐 수도 있다. NodePort로 연결될 때 트래픽을  연결한 노드에서 실행중인 Pod로 리다이렉트 할 수 있다.

이것을 지원하는 정책이 externalTrafficPolicy:local이다.

### externalTrafficPolicy : 클러스터

k8s services의 기본 외부 트래픽 정책이다.

### externalTrafficPolicy : 로컬

