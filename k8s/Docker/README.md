## 도커 등장 배경

-   서비스 런칭에서 하드웨어 비용에 대한 리스크가 있음.
-   사용자가 적을 때는 서버 점유율이 적음. 따라서 서버 자원 공유에 대한 니즈가 생겨남.
-   서버 자원 공유를 하려다보니, 각 어플리케이션의 환경 분리가 필요해짐.
-   도커 이전에는 VM, 즉 가상환경을 이용해서 사용함.
-   VM은 OS가 필요함. 오버헤드 증가, 어플리케이션이 무거워짐.
-   백업 시 용량이 커서 단점이 있었음.

### 하지만 도커는!

⇒ Docker는 OS가 포함되지 않음. (? 하지만, mac에서 우분투 도커를 돌릴 수 있다?)

⇒ Docker는 버전 컨트롤이 가능함,

⇒ Docker는 한 PC에서 몇십, 몇백개를 돌릴 수 있다.

⇒ Container는 Lightweight VM이 아니다! Hypervisor가 없다.

⇒ Docker는 개발환경, 테스트환경, 배포환경을 한번에 관리할 수 있다.

## Docker의 핵심 기술

-   linux kernel에 들어있다. linux kernel에서 제공하는 Container 기술을 사용한다. Docker는 Container를 가져다 사용하는 것뿐.
-   따라서 Window, macOS에서는 가상화를 사용해서 돌린다.

### linux kernel에서 뭘 해주는 걸까?

-   namespace : 격리해주는 시스템. 남들이 못보게 해줌, 독립된 공간.
-   cgroups : 자원 분배, 제약 기술.

## 이미지 ?

-   컨테이너 실행에 필요한 파일 + 설정값을 갖고 있음.
-   읽기 전용, 변하지 않음.
-   하나의 이미지에서 여러개의 컨테이너를 만들 수 있음.
-   DockerHub를 사용해서 관리 가능함 (GitHub 비슷한 개념)
-   DockerHub등의 이미지 Repo에서 이미지를 pull 해와서 run하면 컨테이너가 생성됨.
-   일반적으로 url방식으로 관리함.

### 레이어 저장방식

도커의 이미지는 다른 이미지를 기반으로 만들어짐.

⇒ ex. WebApp이미지는 Nginx 이미지를 기반으로 만들어짐. Nginx 이미지는 ubuntu 이미지를 기반으로 만들어짐.

이미지는 읽기 전용이므로 이미지를 Container로 실행 시킬 때는 R/W 이미지가 하나 더 덧씌워짐.

ubuntu ⇒ nginx ⇒ webApp ⇒ R/W 이런 방식으로 만들어짐.

## 설치

ubuntu 공식 레포에서 설치

docker 서드파티 레포에서 설치.

⇒ 이런식으로 우분투에 크롬을 설치하려면 구글 서드파티 레포에서 설치함.

⇒ 악용을 막기위해 서드파티 레포를 검증하여 설치하게 됨.

따라서 도커에서는 curl 명령어를 통해 설치하게 해줌.

하지만 굉장히 위험하기 때문에 권장 X.

### 권한

docker는 많은 권한을 필요로 함. 하지만 바로 sudo로 실행하면 안됨.

sudo usermod -aG docker $USER

cat /etc/group | grep docker

권한은 유저가 로그인 할 때 적용됨.

### 설정

docker 이미지의 용량이 꽤 커서 이것저것 다운받다보면 금방 용량이 꽉 찬다.

⇒ 클라우드의 경우 디스크를 마운트한 다음

⇒ docker에서 data-root를 설정해주면 모든 도커 이런게 해당 폴더에서 돌아간다.

/etc/deamon/

### hello world

docker run hello-wolrd

### docker images

내 컴퓨터에 설치된 이미지를 볼 수 있음.

### docker container ls / docker ps

실행되고 있는 컨테이너 보여줌.

### docker info

도커 환경설정 보여줌.

### docker pull ubuntu

docker hub에서 이미지를 받아옴. 태그를 안 붙이면 latest가 기본.

docker pull ubuntu:18.04 ⇒ tag가 18.04인 우분투 이미지.

명령어 실행시 feac53061382: Pull complete 같은 출력이 나옴. 이는 레이어 개수를 말함.

### docker run {image}

이미지를 컨테이너로 띄움.

-   사실 docker pull, docker create, docker start을 한번에 실행해주는 명령어임.
-   docker pull : 이미지가 없을 경우 자동으로 가져와줌.
-   docker create : 컨테이너를 만들어줌.
-   docker exec : 컨테이너를 실행함
-

### docker rm {name}

컨테이너를 삭제함.

### docker에는 OS가 포함되어 있지 않은데 OS 이미지는 어떤 뜻일까?

-   해당 OS의 라이브러리를 가져와서 사용한다는 뜻이다.
-   커널은 호스트 OS의 커널을 사용한다.
-   따라서 tensorflow등 커널, 드라이버가 필요한 환경에서 도커는 별로 좋은 선택이 아니다.

### docker run ngnix

-   보통은 foreground로 돌게 됨.
-   docker run -d ngnix ⇒ 데몬으로 돌려라(background로 돌고 있다)
-   docker run —rm ⇒ 컨테이너가 꺼지면 자동 삭제
-   docker run -d -p 80:80 ⇒ 안에 있는 포트를 바깥 포트로 연결해줘.
-   docker run —name server ⇒ 컨테이너 이름을 server로 만들어줘.

### docker exec

-   띄워놓은 컨테이너에 명령어 실행.
-   docker exec -it ⇒ 인터렉티브한 터미널로 띄워줘.

### docker logs {container id}

-   bg로 실행시킨 container의 터미널에 출력된 내용을 볼 수 있음.

### docker run -e MYSQL_ALLOW_EMPTY_PASSWORD=true mysql

-   -e: 환경변수 설정하는 옵션.

### docker -v {파일 경로}

-   컨테이너를 삭제하게 되면 내용이 다 날라간다.
-   따라서 db 등 뭔가 저장하는건 컨테이너에 직접하면 안된다.
-   해결책 : volume을 만들어서 별도로 저장한다.

### docker volume

-   볼륨을 생성해서 사용.
