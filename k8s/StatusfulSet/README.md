## StateFulsets

-   Pod의 지속적인 상태를 유지
    -   Pod name
    -   host name (Network id)
    -   Storage Volume
-   Pod는 고유한 ID를 가지고 순서대로 스케일 업이나 다운
-   Replicas 변경으로 scale out 또는 scale down

statefulsets는 pod가 지속적인 상태를 유지할 수 있도록 한다.

statefulsets를 통해 생성된 pod는 고유한 ID를 가지며, 지정된 순서대로 스케일 아웃이나 다운을 수행할 수 있다.

### 실습

1. Persistent Volume 생성

```yaml
# pv.yaml
kind: List
apiVersion: v1
items:
    - apiVersion: v1
      kind: PersistentVolume
      metadata:
          name: pv-a
      spec:
          storageClassName: nfs-storageclass
          capacity:
              storage: 1Gi
          accessModes:
              - ReadWriteOnce
          persistentVolumeReclaimPolicy: Recycle
          nfs:
              server: 192.168.52.0
              path: /data/pva
    - apiVersion: v1
      kind: PersistentVolume
      metadata:
          name: pv-b
      spec:
          storageClassName: nfs-storageclass
          capacity:
              storage: 1Gi
          accessModes:
              - ReadWriteOnce
          persistentVolumeReclaimPolicy: Recycle
          nfs:
              server: 192.168.52.0
              path: /data/pvb
    - apiVersion: v1
      kind: PersistentVolume
      metadata:
          name: pv-c
      spec:
          storageClassName: nfs-storageclass
          capacity:
              storage: 1Gi
          accessModes:
              - ReadWriteOnce
          persistentVolumeReclaimPolicy: Recycle
          nfs:
              server: 192.168.52.0
              path: /data/pvc
```

2. statefulset 구성

```yaml
# statefulset.yaml
apiVersion: apps/v1
kind: StatefulSet
metadata:
    name: appjs
spec:
    selector:
        matchLabels:
            app: store
    serviceName: appjs
    replicas: 2
    template:
        metadata:
            labels:
                app: store
        spec:
            containers:
                - image: smlinux/app-store
                  name: appjs
                  ports:
                      - containerPort: 8080
                  volumeMounts:
                      - name: data
                        mountPath: /var/data
    volumeClaimTemplates:
        - metadata:
              name: data
          spec:
              storageClassName: nfs-storageclass
              accessModes:
                  - ReadWriteOnce
              resources:
                  requests:
                      storage: 10Mi
```

3. pod 생성 과정 확인, appjs-0이 실행된 후, appjs-1을 동작

```bash
kubectl get po
```

4. 동작된 app-js가 사용하는 스토리지 PV와 PVC 정보 확인

```bash
kubectl get pv

kubectl get pvc
```

5. statefulset 컨트롤러의 포드는 삭제되면 동일한 이름과 동일한 pvc를 사용하는 포드를 생성, 포드 상태가 유지되는 지 확인

```bash
kubectl delete pod appjs-1
```

6. headless 서비스 동작

```yaml
# svc-appjs.yaml
apiVersion: v1
kind: Service
metadata:
    name: appjs
spec:
    clusterIP: None
    selector:
        app: hpe
    ports:
        - port: 80
          targetPort: 8080
```

```bash
kubectl create -f svc-appjs.yaml
```

headless는 클러스터 IP가 할당되지 않는다

7. headless 서비스 운영 시 DNS 서버가 각각의 Pod의 name service를 제공한다.

```bash
kubectl exec -it appjs-1 -- bash

ping appjs-0.appjs.default -c 2
ping appjs-0.appjs.default.svc.cluster.local -c 2

exit
```

8. API 서버를 통해 클러스터 내부의 서비스에 연결

```bash
kubectl proxy

curl localhost:8001/api/v1/namespaces/default/pods/appjs-0/proxy
curl -X POST -d "appjs-0 test" localhost:8001/api/v1/namespaces/default/pods/appjs-0/proxy
curl localhost:8001/api/v1/namespaces/default/pods/appjs-0/proxy
```

9. 앞에서 저장한 POST 내용이 pod를 지운 후에도 보존되는지 확인

```bash
kubectl delete po appjs-0

curl localhost:8001/api/v1/namespaces/default/pods/appjs-0/proxy
```

10. scaleout을 통해 replicas 수를 3개로, 이때 pvc도 함께 확장

```bash
kubectl scale statefulset appjs --replicas=3

kubectl get pvc
kubectl get pv
kubectl get pods
```

11. scaledown 했을 때는 어떤 포드가 삭제되는지 확인, 포드가 삭제되어도 pvc, pv는 삭제되지 않으며, recycle 구성으로 데이터는 지워지고 pv는 재사용 가능

```bash
kubectl get pods
kubectl get pvc
kubectl get pv
```