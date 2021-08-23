## [Docker](https://github.com/hyesungoh/learningFrontEnd/tree/master/k8s/Docker)

## [Orchestration](https://github.com/hyesungoh/learningFrontEnd/tree/master/k8s/Orchestration)

## Kubernetes 소개

> K8s = Kubernetes

-   Container Cluster Manager
-   컨테이너 오케스트레이터 (실행 및 관리)
-   다양한 클라우드 및 베어메탈 환경지원
-   Google Borg에서 시작되어 오픈소스화
-   2015년 7월 CNCF (Cloud Native Computing Foundation) 가입
-   Go 언어로 작성

### 메인 매커니즘

**Observer -> diff -> Act -> Observer**

Current State와 Desired State를 감시, 비교, 관리한다.

## Kubernetes Cluister Control Plane

-   Kubernetes Node

    -   Container Runtime
        컨테이너 실행을 위한 Docker Engine 포함

    -   Kubelet
        Master의 명령 수행을 위한 k8s 에이전트

    -   Kube-proxy
        인바운드 또는 아웃바운드 트래픽에 대한 네트워크 프록시 담당

    -   cAdvisor
        Container Advisor 리소스 사용 / 성능 통계를 제공

## 기능 간 시퀸스 다이어그램

![k8s scheduler](https://user-images.githubusercontent.com/26461307/130236439-4eead740-a775-4f0d-9ffc-6bda4df05959.png)

## 실습

1. AWS EC2 CentOS 7 생성 (1 Master, 2 Worker)

2. Set up

```bash
sudo yum install -y yum-utils

sudo yum-config-manager \
    --add-repo \
    https://download.docker.com/linux/centos/docker-ce.repo

sudo yum install docker-ce docker-ce-cli containerd.io
# sudo yum install docker-ce 19.03 docker-ce-cli 19.03 containerd.io

sudo systemctl start docker
sudo systemctl enable docker

cat <<EOF > /etc/yum.repos.d/kubernetes.repo
[kubernetes]
name=Kubernetes
baseurl=https://packages.cloud.google.com/yum/repos/kubernetes-el7-x86_64
enabled=1
gpgcheck=1
repo_gpgcheck=1
gpgkey=https://packages.cloud.google.com/yum/doc/yum-key.gpg https://packages.cloud.google.com/yum/doc/rpm-package-key.gpg
EOF

setenforce 0

sed -i --follow-symlinks 's/SELINUX=enforcing/SELINUX=disabled/g' /etc/sysconfig/selinux

systemctl stop firewalld && systemctl disable firewalld

sudo yum install -y kubeadm-1.19.12-0.x86_64 kubectl-1.19.12-0.x86_64 kubelet-1.19.12-0.x86_64 --disableexcludes=kubernetes


sudo systemctl enable --now kubelet

cat <<EOF >  /etc/sysctl.d/k8s.conf
net.bridge.bridge-nf-call-ip6tables = 1
net.bridge.bridge-nf-call-iptables = 1
net.ipv4.ip_forward = 1
EOF

sysctl --system


swapoff -a && sed -i '/swap/s/^/#/' /etc/fstab
```

```bash
# 마스터노드

kubeadm init

mkdir -p $HOME/.kube

sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config

sudo chown $(id -u):$(id -g) $HOME/.kube/config

export KUBECONFIG=/etc/kubernetes/admin.conf

kubectl get nodes

# 위브넷
kubectl apply -f "https://cloud.weave.works/k8s/net?k8s-version=$(kubectl version | base64 | tr -d '\n')"
```

```bash
# 각 워커 노드

# 마스터 노드에서 kubeadm join 하는 명령어 복붗
```

```bash
# 자동완성 배시 등록
source <(kubectl completion bash)

echo "source <(kubectl completion bash)" >> ~/.bashrc
```

### Unable to connect to the server: x509 에러

```bash
[root@ip-172-31-44-114 ~]# kubectl get nodes
Unable to connect to the server: x509: certificate signed by unknown authority (possibly because of "crypto/rsa: verification error" while trying to verify candidate authority certificate "kubernetes")
```

해결 방법

```bash
mkdir -p $HOME/.kube
sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config
sudo chown $(id -u):$(id -g) $HOME/.kube/config


kubectl get nodes
NAME                                          STATUS     ROLES    AGE     VERSION
ip-172-31-38-33.us-east-2.compute.internal    NotReady   <none>   2m47s   v1.19.12
ip-172-31-44-114.us-east-2.compute.internal   Ready      master   3m4s    v1.19.12
```
