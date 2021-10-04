## ConfigMap

컨테이너화된 애플리케이션에게 설정 데이터 전달 방법

-   Command Line Argument를 통한 전달
-   각 컨테이너에 대한 사용자 정의 환경변수를 통해 전달
-   볼륨 마운트를 통해 구성파일 전달

```yaml
apiVersion: v1
kind: Pod
metadata:
    name: fortune2s
spec:
    volumes:
        - name: html
          emptyDir: {}

    containers:
        - image: smlinux/fortune:args
          env:
              - name: INTERVAL
                value: "2"
          name: html-generator
          volumeMounts:
              - name: html
                mountPath: /val/htdocs

        - image: nginx:alpine
          name: web-server
          volumeMounts:
              - name: html
                mountPath: /usr/share/nginx/html
                readOnly: true
          ports:
              - containerPort: 80
```

## ConfigMap 전달

정의된 ConfigMap을 전달하는 방법

-   Command-line Argument
-   volume에 ConfigMap 엔트리 사용

### 실습

```bash
kubectl get configmap

kubectl create configmap fortune-config --from-literal=sleep_interval=25

kubectl get configmap
```

```yaml
apiVersion: v1
kind: Pod
metadata:
    name: fortune-arg-cm
spec:
    containers:
        - image: smlinux/fortune:env
          env:
              - name: INTERVAL
                valueFrom:
                    configMapKeyRef:
                        name: fortune-config
                        key: sleep-interval
          name: html-generator
          volumeMounts:
              - name: html
                mountPath: /var/htdocs
```

```yaml
apiVersion: v1
kind: Pod
metadata:
    name: fortune-cm-volume
spec:
    volumes:
        - name: html
          emptyDir: {}
        - name: config
          configMap:
              name: fortune-config
    containers:
        - image: smlinux/fortune:env
          env:
              - name: INTERVAL
                valueFrom:
                    configMapKeyRef:
                        name: fortune-config
                        key: sleep-interval
          name: html-generator
          volumeMounts:
              - name: html
                mountPath: /var/htdocs
        - image: nginx:alpine
          name: web-server
          volumeMounts:
              - name: html
                mountPath: /usr/share/nginx/html
                readOnly: true
              - name: config
                mountPath: /etc/nginx/conf.d
                readOnly: true
          ports:
              - containerPort: 80
```

## Secret

### 실습

-   인증서 생성
-   생선된 인증서를 secret으로 base64 인코딩
-   웹서버 Pod를 실행 시 인증정보를 전달
-   웹서버 Pod의 구성 정보에 인증 정보를 추가, 이 부분은 `configMap`으로 구성

1. 인증서 생성

```bash
mkdir secret
cd secret
openssl genrsa -out https.key 2048
openssl req -new -x509 -key https.key -out https.crt -days 365 -subj /CN=hp.com
ls -l https.*
```

2. 인증서를 base64 인코딩

```bash
kubectl create secret generic fortune-https --from-file=https.key --from-file=https.crt --from-file=foo

kubectl get secret
kubectl describe secret fortune-https
kubectl get secret fortune-https -o yaml
```

3. 웹서버 Pod에 전달할 configMap 정보를 확인하고 인증서 파일정보를 추가

```bash
kubectl get cm
kubectl describe cm fortune-config

kubectl edit cm fortune-config
```

```yaml
apiVersion: v1
data: my-nginx-config.conf |
    server {
    listen  80;
    listen  443 ssl;
    server_name www.example.com;

    ssl_cerificate certs/https.crt;
    ssl_cerificate_key certs/https.key;
    ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
    ssl_ciphers HIGH:!aNULL:!MD5;

    gzip off;
    }
```

4. 포드 소스에 인증서를 volume 마운트해서 전달

```bash
vi fortune-volume-cm-secret.yaml
```

```yaml
apiVersion: v1
kind: Pod
metadata:
    name: fortune-cm-volume2-secret
spec:
    containers:
        - image: smlinux/fortune:env
          name: html-generator
          env:
              - name: INTERVAL
                valueFrom:
                    configMapKeyRef:
                        name: fortune-config
                        key: sleep-interval
          volumeMounts:
              - name: html
                mountPath: /var/htdocs
        - image: nginx:alpine
          name: web-server
          volumeMounts:
              - name: html
                mountPath: /usr/share/nginx/html
                readOnly: true
              - name: config
                mountPath: /etc/nginx/conf.d
                readOnly: true
              - name: certs
                mountPath: /etc/nginx/certs/
                readOnly: true
          ports:
              - containerPort: 80
              - containerPort: 443
    volumes:
        - name: html
          emptyDir: {}
        - name: config
          configMap:
              name: fortune-config
              items:
                  - key: my-nginx-config.conf
                    path: https.conf
        - name: certs
          secret:
              secretName: fortune-https
```

```bash
kubectl create -f fortune-volume-cm-secret.yaml

kubectl get po

kubectl exec fortune-cm-volume2-secret -c web-server  -- mount | grep nginx

kubectl exec fortune-cm-volume2-secret -c web-server -- ls /etc/nginx/certs -l
```

5. 인증서 확인

```bash
kubectl get pod -o wide

curl -k https:// ~
curl -k https:// ~ -v

```
