# Volumes

- k8s는 실제 데이터가 있는 디렉토리를 보존하기 위해서 저장소 볼륨을 정의
- Pod같은 최상위 리소스는 아니지만, Pod의 일부로 정의되며, Pod와 라이프 사이클이 같다


```yaml
apiVersion: v1
kind: Pod
metadata:
    name: dynamic-web
spec:
    containers:
        - image: smlinux/cowsay-web
          name: web-generator
          volumeMounts:
              - name: html
                mountPath: /webdata
        - image: nginx:1.14
          name: web-server
          ports:
              - containerPort: 80
          volumeMounts:
              - name: html
                mountPath: /usr/share/nginx/html
                readOnly: true
    volumes:
        - name: html
          emptyDir: {}
```

```yaml
apiVersion: apps/v1
kind: DaemonSet
metadata:
    name: fluentd-elasticsearch
    namespace: kube-system
    labels:
        k8s-app: fluentd-logging
spec:
    selector:
        matchLabels:
            name: fluentd-elasticsearch
    template:
        metadata:
            labels:
                name: fluentd-elasticsearch
        spec:
            tolerations:
                - key: node-role.kubernetes.io/master
                  effect: NoSchedule
            containers:
                - name: fluentd-elasticsearch
                  image: quay.io/fluentd_elasticsearch/fluentd:v2.5.2
                  resources:
                      limits:
                          memory: 200Mi
                      requests:
                          cpu: 100m
                          memory: 200Mi
                  volumeMounts:
                      - name: varlog
                        mountPath: /var/log
                      - name: varlibdockercontainers
                        mountPath: /var/lib/docker/containers
                        readOnly: true
            terminationGracePeriodSeconds: 30
            volumes:
                - name: varlog
                  hostPath:
                    path: /var/log
                - name: varlibdockercontainers
                hostPath:
                    path: /var/lib/docker/containers
```

```yaml
apiVersion: v1
kind: PersistentVolume
metadata:
    name: pv-nfs
    labels:
        storage: pv-nfs
spec:
    capacity:
        storage: 1Gi
    volumeMode: Filesystem
    accessModes:
        - ReadWriteMany
    persistentVolumeReclaimPolicy: Delete
    nfs:
        path: /data/nfs-server
        servser: 192.168.52.0
```

```yaml
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
    name: my-nfs-pvc
spec:
    accessModes:
        - ReadWriteMany
    resources:
        requests:
            storage: 1Gi
    selector:
        matchLabels:
            storage: pv-nfs
```

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
    name: nfs-deployment
    labels:
        app: nfs-nginx
spec:
    replicas: 1
    selector:
        matchLabels:
            app: nfs-pod
    template:
        metadata:
            labels:
                app: nfs-pod
        spec:
            containers:
                - name: nginx
                  image: nginx:1.14
                  ports:
                      - containerPort: 80
                  volumeMounts:
                      - mountPath: /data
                        name: nfs-volume
            volumes:
                - name: nfs-volume
                  persistentVolumeClaim:
                      claimName: my-nfs-pvc
```
