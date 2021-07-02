# OS with Process

S/W를 운영하는데 필요한 사람 -> SE (System Engineer)

SW를 동작하는데 필요한 것 -> 플랫폼

## 소프트웨어 입장의 플랫폼

프로그램이 구동, 종료될 수 있는 메모리 공간
즉, 런타임의 진입점 (Entrypoint of Runtime)

## 메모리 적재

소프트웨어는 결국 OS 위의 메모리 공간에서 구동
-> 누군가 내 프로그램을 메모리에 올려주면 되겠지 ?

## 프로세스 실행

소프트웨어는 결국 메모리 공간에서 구동
-> 그 메모리에 프로그램 카운터만 이동해주면 실행되겠지 ?

**Program Counter** : CPU 입장에서 현재 실행하고 있는 위치
필요 이유 : 컨텍스트 스위칭

PC를 이동(JMP)하는데 제일 편한 방법 : Function Call (함수 호출)

## 소프트웨어의 Runtime 형태

응용 프로그램과 **프로세스**

## Process with Code

```c++
int iVar1; //
int iVar2 = 10;
const double dVar1 = 1.0;
int g_arr[1024];

void aFunc(int p) {
}

int main(void) {
    int local = 1; // Stack
    char *l_pszValue = "test"; // Stack
    int *p = malloc(sizeof(void*)); // 잡혀있는 번지의 참조값이 Stack
}

```

## Process Layout

#### Windows OS의 프로세스 레이아웃

-   Stack (위로 점유, 리미트를 두고 한정적으로 쓴다)
-   Heap (아래로 점유)
-   Program image
    -   PE header
    -   text (code)
    -   rdata
    -   data
    -   rsrc
-   DLL (공유 자원들)
-   PEB
-   Shared user page
-   No access

_보이저호는 CPU 1.6Mhz RAM 4kb ROM 6kb이고 150억km가 떨어져있지만 아직도 지구와 통신하고 있다._

#### Linux 환경의 프로세스 레이아웃

_Windows와 상하 반대_

-   Systme
-   Stack
-   Shared Lib
    -   Heap
-   Data
-   Text (Compiled code)

컴파일된 코드를 원하는 메모리 번지로 가져다 놓는 것 : Linker

## 영역별

#### STACK

-   함수를 선언했을 때 파라미터
-   함수 안의 로컬 변수 (로컬 변수가 아니라면 STACK에 포함되지 않는다)
-   함수의 리턴 주소

#### HEAP

-   동적 변수 (malloc, new, free etc)

#### BSS

-   초기화 되지 **않은** 전역 변수
-   정적 (Static) 변수
    -   **코드가 적재되기 이전에 선언된다. 즉, 생성되는 시점이 앞선다**

#### DATA

-   초기화 **된** 전역 변수
-   정적 (Static) 변수

#### TEXT

-   코드
-   **상수**
    -   컴파일러가 최적화할 때 변수를 선언하지 않음 (코드 취급)
    -   OS에 따라 DATA에 들어갈 수도 있다

#### 스택 영역 세분화

-   Main 함수의 argc, argv
-   Main 함수안의 변수 선언
-   다른 A 함수 호출 (스택 영역 점유)
-   A 함수에서 로컬 변수를 선언하고 실행

## 멀티 스레드와 스택

-   각 스레드마다 고유한 STACK, Register, Program Counter
-   멀티 스레드시 스택 연산을 늘리는 것은 위험한 행위

## ARM Function Calling Convention

#### A32

0 ~ 3 레지스터 : 함수의 파라미터

#### A64

0 ~ 7 레지스터 : 함수의 파라미터 (6개까지 파라미터로 사용가능)

## 32Bit 환경

-   물리 메모리 제약 없음
-   가상 메모리 최대 4GB
-   즉, 프로세스별 할당 가능한 메모리 4GB
-   커널 영역 메모리 1~2GB
-   활용가능한 최대 HEAP: 2~3GB

## 64Bit Window 환경

-   Win 10

Enterprise 2TB, Home 128GB

-   Win 8

최대 512GB, 최소 128GB

-   Win 7

최대 192GB, 최소 8GB

