# Ingress 리소스의 이해

-   HTTP, HTTPS를 통해 클러스터 내부의 서비스를 외부로 노출시키는 API
-   기능
    -   Service에 외부 URL을 제공
    -   트래픽을 로드밸런싱
    -   Virtual Hosting을 지정

k8s의 ingress는 layer 7에서의 요청을 처리할 수 있다.

외부 요청을 어떻게 처리할 것인지를 정의하는 집한인 ingress를 정의한 뒤, 이를 Ingress Controller라고 부르는 특별한 웹 서버에 적용함으로써 추상화된 단게에서 서비스 처리 로직을 정의할 수 있다.

## Ingress와 Ingreess Controller

k8s에서 Ingress를 사용하기 위해서 두가지가 필요하다.

1. YAML 파일에서 Ingress로 정의되는 ingress 오브젝트
2. Ingress 규칙이 적용된 Ingress Controller

```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
    name: ingress-marvel
spec:
    defaultBackend:
        service:
            name: marver-service
            port:
                number: 80
```

```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
    name: marvel-heroes-ingress3
spec:
    rules:
        - http:
              paths:
                  - pathType: Prefix
                    path: "/"
                    backend:
                        service:
                            name: marvel-service
                            port:
                                number: 80
                  - pathType: Prefix
                    path: "/app"
                    backend:
                        service:
                            name: appjs-service
                            port:
                                number: 80
```

```bash
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v0.35.0/deploy/static/provider/baremetal/deploy.yaml
```

