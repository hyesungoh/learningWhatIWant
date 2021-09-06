# Kubenetes Controllers

![controllers](https://user-images.githubusercontent.com/26461307/132203591-1c249734-e60e-45f3-947d-5b4676f9474b.png)

-   ReplicationController
-   PelicaSet
-   Deployment
-   DaemonSet
-   job
-   Cronjob

## ReplicationController

-   Pod의; 개수를 관리
    -   current state 개수와 desired state 개수가 같을 때 까지 관리
    -   pod template을 통해 pod가 부족하면 더 생성하고, pod가 많으면 종료시킴

RC는 pod가 항상 실행되도록 유지하는 k8s의 기본적 resource이다.
node가 클러스터에서 사리즌 경우나 노드에서 pod가 제거된 경우와 같이 어떤 이유로든 pod가 사라지면
RC는 누락된 pod를 감지하고 대체 pod를 만든다.

## ReplicationController Definition

-   RC의 세가지 요소
    -   label selector
    -   replica count
    -   pod template

RC의 selector에서 요구하는 pod가 replicas의 수만큼 존재하는지 확인 조정

Replicas의 수에 맞춰 Pod의 개수를 늘리거나 줄여야하는데, 이때 template의 pod definition을 사용

```yaml
# RC
apiVersion: v1
kind: ReplicationController
metadata:
    name: myapp-rc
spec:
    replicas: 3
    selector:
        app: myapp
        version: "1.14"
```

```yaml
# pod
apiVersion: v1 #k8s API version
kind: pod #type of resouces
metadata:
    name: myapp_pod #pod의 이름
    label:
        app: myapp
        version: "1.14"
spec:
    containers:
        - image: nginx:1.14 # 컨테이너 이미지 정보
    name: nginx-container # 컨테이너 이름
```

## ReplicationController 삭제

```bash
kubectl delete rc [rcName] --cascade=false # Rc는 삭제되나 Pod는 남아 있음
```

## ReplicaSet

-   RC의 새 버전으로 풍부한 label selector를 지원
-   autoscale 기능을 지원하고 deployments 리소스의 하위 목록

```yaml
# RS
apiVersion: apps/v1
kind: ReplicaSet
metadata:
    name: nginx-rs
spec:
    replicas: 3
    selector:
        matchLabels:
            app: web
        matchExpressions:
            - { key: version, operator: In, values: ["1.14", "1.15"] }
    template:
        metadata:
            name: nginx-pod
            labels:
                app: web
                version: "1.14"
        spec:
            containers:
                - name: nginx-container
                  image: nginx:1.14
                  ports:
                      - containerPort: 80
```

## Deployment

-   stateless 앱을 배포할 때 사용되는 가장 기본이 되는 컨트롤러이다.
-   deployment는 RS를 관리하게 되는데 배포를 위한 롤링업데이트, 배포중단, 롤백이 가능.
-   지속적으로 배포된 인스턴스들을 모니터링
-   노드가 다운되거나 삭제되면 deployment 컨트롤러가 인스턴스를 클러스터 내부의 다른 노드 인스턴스로 교체해준다.

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
    name: nginx-deploy
spec:
    replicas: 3
    selector:
        matchLabels:
            app: web
        matchExpressions:
            - { key: version, operator: In, values: ["1.14", "1.15"] }
    template:
        metadata:
            name: nginx-pod
            labels:
                app: web
                version: "1.14"
        spec:
            containers:
                - name: nginx-container
                  image: nginx:1.14
                  ports:
                      - containerPort: 80
```

## DaemonSet

-   모든 worker 노드에 pod가 한 개씩 생성되도록 보장
-   동작방식
    -   모든 노드에서 pod가 한 개씩 실행되도록 보장
    -   특정 노드에서만 pod가 실행되도록 보장
    -   로그 수집기, 모니터링 에이전트

DaemonSet은 k8s의 각 노드에 pod가 한개씩 생성되도록 보장해주는 오브젝트.
보통 로그 수집기나 모니터링 에이전트처럼 모든 노드에서 동작하는 시스템 데몬을 배포할 때 DaemonSet을 사용.

```yaml
apiVersion: apps/v1
kind: DaemonSet
metadata:
    name: fluentd
spec:
    selector:
        matchLabels:
            name: fluentd
    template:
        metadata:
            labels:
                name: fluentd
        spec:
            containers:
                - name: fluentd-container
                  image: gcr.io/google-containers/fluentd-elasticsearch:1.19
```

## Job

-   Pod를 실행하고 pod가 정상적으로 종료를 추적관리
    -   컨테이너가 성공으로 종료되면 작업을 완료
    -   컨테이너가 실패로 종료되면 다시 실행
    -   작업이 완료되는 상태가 중요한 서비스에 유용
-   작업이 완료되어도 Pod를 삭제하지 않음
    -   로그 및 결과 등을 분석허용

```yaml
apiVersion: batch/v1
kind: job
metadata:
    name: centos-job
spec:
    template:
        spec:
            containers:
                - name: centos-container
                  image: centos:7
                  command: ["bash"]
                  args:
                      - "-c"
                      - "echo 'Hello world'; sleep 5; echo 'Bye'"
        restartPolicy: Never
```

## CronJob

-   Job 오브젝트에 Linux cronjob의 스케쥴링 기능을 추가
-   다음과 같은 자동화 작업에 유리
    -   Data backup
    -   Send email
    -   Cleaning tasks
    -   Synthesis report
-   Cronjob Controller가 관리

```yaml
apiVersion: batch/v1beta1
kind: CronJob
metadata:
    name: centos-cronjob
    startingDeadlineSeconds: 100
spec:
    schedule: "*/1 * * * *"
    concurrencyPolicy: Allow
    jobTemplate:
        spec:
            template:
                spec:
                    containers:
                        - name: centos-container
                          image: centos:7
                          command: ["bash"]
                          args:
                              - "-c"
                              - "echo 'Hello World'; sleep 5; echo 'Bye'"
                    restartPolicy: Never
```
