## Deployments

- deployment = ReplicaSet + History (Revision)
- Pod 배포에 대한 버전 관리가 가능
- Pod 배포와 업데이트

`kubectl set`

### 실습

deployment를 통한 rolling update와 auto-scaling

1. Deployment를 사용한 업데이트

```yaml
# deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
    name: app-deploy
spec:
    selector:
        matchLabels:
            app: hpe
    replicas: 3
    template:
        metadata:
            labels:
                app: hpe
        spec:
            containers:
            - image: smlinux/app:v1
              name: app-container
              ports:
              - containerPort: 8080
```

```yaml
# service.yaml
apiVersion: v1
kind: Service
metadata:
    name: app-service
spec:
    selector:
        app: hpe
    ports:
    - port: 80
      targetPort: 8080
```

```bash
kubectl create -f deployment.yaml
```

2. deploy rollout 히스토리 확인 (아무 정보도 표시되지 않는다)

```bash
kubectl rollout history deployment app-deploy
```

3. update 정보를 기록할 수 있게 deployment를 다시 실행

```bash
kubectl delete deployment app-deploy
kubectl create -f deployment.yaml --record
kubectl rollout history deployment app-deploy
```

4. 동작중인 deployment를 편집하여 이력기록으로 history 개수와 롤링업데이트 delay 시간을 설정해본다

```bash
kubectl edit deployment app-deploy
```

```yaml
spec:
    progressDeadlineSeconds: 600
    replicas: 3
    revisionHistoryLimit: 10
...
```

5. minReadySeconds (업데이트를 천천히 진행하도록 구성)

```bash
kubectl get deployment app-deploy -o yaml | grep -i minready

kubectl patch deployment app-deploy -p '{"spec": {"minReadySeconds": 10}}'
kubectl get deployment app-deploy -o yaml | grep -i minready
```

6. deployment 업데이트 실습

```bash
kubectl set image deployment app-deploy app-container=smlinux/app:v2 --record

kubectl set image deployment app-deploy app-container=smlinux/app:v3 --record

# 모니터링
kubectl rollout status deployment app-deploy
kubectl describe deployment app-deploy
```

7. rollout 히스토리 확인

```bash
kubectl rollout history deployment app-deploy
```

8. 잘못된 업데이트 롤백하기

```bash
kubectl rollout undo deployment app-deploy

kubectl rollout history deployment app-deploy
```

9. revisionNUM을 두면 특정 상태로 되돌리기 가능

```bash
kubectl set image deployment app-deploy app-container=smlinux/app:v4 --record
kubectl rollout deployment app-deploy
kubectl rollout undo deployment app-deploy --to-revision=1
kubectl get deployment app-deploy -o yaml | grep -i history
```