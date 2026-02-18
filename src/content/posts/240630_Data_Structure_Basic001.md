---
title: 240630_Data_Structure_Basic001
published: 2024-06-30
description: '자료구조(Data Structure)의 개념과 종류'
image: ''
tags: [rust, algorithms, DataStructure, std]
category: 'rust_algorithms'
draft: false 
lang: ''
---

# link

- [자료구조(Data Structure) 잘 정리된 한국_티스토리 Blog](https://yangpro8549.tistory.com/m/62)
- [내가 정리한 Algorithms(Github)](https://github.com/YoungHaKim7/Algorithm_Training)

- 성능비교
  - [`Array`, `Dynamic array`, `Vec`, `VecDeque`, `LinkedList`, `HashMap`, `BTreeMap` 기타 등등 표로 비교(Big-O Chart)](../240630_vector/#cost-of-collection-operations)

- [(rust-unofiicial)Learn Rust With Entirely Too Many Linked Lists](https://rust-unofficial.github.io/too-many-lists/)
  - A Bad Singly-Linked Stack
  - An Ok Singly-Linked Stack
  - A Persistent Singly-Linked Stack
  - A Bad But Safe Doubly-Linked Deque
  - An Unsafe Singly-Linked Queue
  - TODO: An Ok Unsafe Doubly-Linked Deque
  - Bonus: A Bunch of Silly Lists

- 그림이 굿
  - https://github.com/daolq3012/Kotlin-Algorithms

<hr />

- [표로 정리__자료구조란? | 배열(array) | 리스트(list) | 스택( stack) | 큐(queue) | 데큐(deque) | 트리(tree) | 그래프(graph)](#자료구조란--배열array--리스트list--스택-stack--큐queue--데큐deque--트리tree--그래프graph--혀니c코딩)
  - [개념잡기 좋다.파이썬 코드 8 Data Structures Every Programmer Should Know | ForrestKnight](https://youtu.be/gxdQiBkidWk?si=y1yb_GQLcNsiyf6R) 
  - 1. 선형구조
    - [배열(array)](#array-배열)
    - [리스트(list)](#list리스트head가-필요--첫번째-원소의-주소가-저장됨)
    - [스택(stack)](#stack스택)
      - [stack](#stack스택)
      - [pop](#pop자료-뺄때--)
    - [큐(queue)](#큐queue마트에서-줄서는거-생각하면됨)
    - [데큐(deque)](데크deque스택과-큐가-합쳐진-형태)

  - 2. 비선형구조
    - [트리tree](#tree트리)
    - [그래프(graph)](#graph그래프상위root가-없다)

  - [(모아보기)자료구조&알고리즘 혀니C코딩](https://youtube.com/playlist?list=PLrj92cHmwIMfxmffI2RSuSmWfmHvLksoB&si=EWhHSz4eQjDmO_yJ)
   
<hr>

- C언어로 코드 구현하기
  - [Stack 자료구조(C언어) 배열을 이용한 스택 | 삽입(push), 삭제(pop), 출력(print), 초기화(clear)](#stack-자료구조--c언어-코드-완벽-구현--배열을-이용한-스택--삽입push-삭제pop-출력print-초기화clear-혀니c코딩)
  - [원형 큐(Circular Queue) | 배열을 이용한 C언어(C++) 코드 구현 | FIFO(First In First Out) | enqueue | dequeue |clear | 혀니C코딩](https://youtu.be/RQnbWEdj_NY?si=5UXZsuogI6Ms63b2)
  - [큐(Queue) C언어 | C++ 코드 구현 | 연결리스트(Linked List)를 이용한 코드 완벽 구현 | enqueue | dequeue | clear | FIFO | 혀니C코딩](https://youtu.be/so9K8g_zkyE?si=qU7Mn1QuIt5Rg2QJ)

<hr>

# Summary

<img width="500" height="500" alt="Image" src="https://github.com/user-attachments/assets/cd1dd965-ab12-4a37-8f9e-d1a841a7ac06" />

- 출처 : https://yangpro8549.tistory.com/m/62

# 자료 구조Data Structures

https://github.com/YoungHaKim7/c_project/tree/main/exercise/002stack

- 영어 출처
  https://en.wikipedia.org/wiki/Association_list

<table border="1">
    <tr>
    <td colspan="2" align="center">자료 구조(Well-known data structures)</td>
    </tr>
    <tr align="center">
        <td>유형(Type) </td>
        <td> 컬렉션(Collection) , 컨테이너(Container)</td>
    </tr>
    <tr align="center">
        <td> 추상ADT<br>Abstract Data Type </td>
        <td> 연관 배열(Associative array), 우선 순위 덱(Priority Deque), 덱(Deque), 리스트(List),<br> 멀티맵, 우선순위 큐(Priority Queue), 큐(Queue), <br>집합 (멀티셋, 분리 집합),<br> 스택(stack) <br>
Associative array(Multimap, Retrieval Data Structure), List, StackQueue(Double-ended queue), Priority queue(Double-ended priority queue), Set(Multiset, Disjoint-set)
    </td>
    </tr>
    <tr align="center">
        <td>배열(Array) </td>
        <td> 
비트 배열(Bit Array), 환형 배열(Circular array), 동적 배열(Dynamic Array),<br> 해시 테이블(Hash Table), 해시드 어레이 트리(Hashed Array Tree), 희소 배열(Sparse array)
        </td>
    </tr>
    <tr align="center">
        <td>연결형(Linked) </td>
        <td> 연관 리스트(Association list), 
        <br>
        <br>연결 리스트(Linked List) - 단일연결(Singly Linked List), 이중연결(Doubly Linked List), 원형 연결(Circular Linked List)<br><br>Association list,<br> Linked list, Skip list, Unrolled linked list, XOR linked list</td>
    </tr>
    <tr align="center">
        <td>트리(Trees) </td>
        <td>B 트리,<br> 이진 탐색 트리(AA, AVL, 레드-블랙, 자가 균형, splay) <br> 힙(이진 힙, 피보나치) ,<br> R 트리( R*, R+, 힐버트),<br> 트리(해시 트리)<br><br>B-tree, Binary search tree(AA tree, AVL tree, Red–black tree, Self-balancing tree, Splay tree),<br> Heap(Binary heap, Binomial heap, Fibonacci heap),<br> R-tree(R* tree, R+ tree, Hilbert R-tree), Trie Hash tree
    </td>
    </tr>
    <tr align="center">
        <td>그래프(Graphs) </td>
        <td>이진 결정 다이어그램<br>Binary decision diagram, Directed acyclic graph, Directed acyclic word graph </td>
    </tr>
</table>

<br>

<hr>

# Big-O Cheat Sheet(그림으로 이쁘게)

https://dev.to/deciduously/big-o-cheat-sheet-3i7d
- Big O Notation - Full Course | freeCodeCamp.org
  - https://youtu.be/Mo4vesaut8g?si=nAkWivuZir0LBPsn
- Big O Notation & Time Complexity Analysis Tutorial | Tech With Tim
  - https://youtu.be/6aDHWSNKlVw?si=nTwG6_TIeVhzNiGb



<br>

<br>

<hr>

<br>

<hr>

# Big-o-Cheat-sheet

- [출처: 8 Data Structures Every Programmer Should Know | ForrestKnight](https://youtu.be/gxdQiBkidWk?si=C2-UJ4dpCE1OgJvp)
  - [약간 비슷한거 _ 3 Types of Algorithms Every Programmer Needs to Know | ForrestKnight](https://youtu.be/Uym4-KhP3Lc?si=ZoWi4kZF4yflRqNd) 

![Screenshot 2024-10-08 at 9 58 03 PM](https://github.com/user-attachments/assets/28cfb269-f2c0-4232-9c43-319e23311958)

![3_types_of_algorithms](https://github.com/user-attachments/assets/59f88d07-badb-4f5e-b46f-4f6eca50595a)

![big-o-cheat-sheet-poster](https://user-images.githubusercontent.com/67513038/236633081-7365b27e-a749-4b27-b8bd-717dd3911e76.png)

![bio-o-](https://user-images.githubusercontent.com/67513038/236633173-26995f68-24df-46ec-92df-ef6204d7ec7c.png)

## Big-O Cheat Sheet(그림으로 이쁘게) https://dev.to/deciduously/big-o-cheat-sheet-3i7d

<hr>

# C언어 자료 구조 만들기
https://youtu.be/1PFFgRcZLAk

<hr>

# 유료) 그림으로 알고리즘 이랑 코드 비교해서 알려줌 최고

https://log2base2.com/

```c
struct node *head = NULL;
void addFirst(int val)
{
    struct node *newNode = malloc(sizeof(struct node));
    newNode->data = val;
    newNode->next = head;

    head = newNode;
}

```


<br>

<hr>

```c
void mirror(struct node *root){
    if(root == NULL)
        return;
    else
    {
        mirror(root->left);
        mirror(root->right);

        struct node *temp = root->left;
        root->left = root->right;
        root->right = temp;
    }
}
    
```


<br>

<hr>


<br>

<hr>

```c
int *prt;

ptr = malloc(5 * sizeof(int));

ptr = realloc(ptr, 2 * sizeof(int));
ptr = realloc(ptr, 6 * sizeof(int));
    
```



<br>

<hr>



<br>

<hr>


<br>

<hr>




https://log2base2.com/

# Introduction to Programming and Data Structures

https://youtu.be/4OGMB4Fhh50


# C Programming & Data Structrues(Series)

https://youtube.com/playlist?list=PLBlnK6fEyqRhX6r2uhhlubuF5QextdCSM

## C Programming

C Programming:
1) Introduction to the course.
2) Variables 
3) Global vs Local variables. 
4) Data types  
5) Operators in C  
6) Conditionals and loops 
7) Functions 
8) Recursion  
9) Pointers and arrays 
10) Strings
11) Structure and union 
12) File Handling

Data Structures:
1) Stacks  
2) Queues  
3) Linked list 
4) Trees  
5) Binary search trees  
6) Binary Heaps  
7) Graphs  
8) Tree Traversals  
 
X - X - X

<br>

<hr>

<br>

# c언어로 만든 싱글 링크드 리스트 linked list ( 추가, 삽입 , 삭제) 백지부터 설명 시작

https://youtu.be/3ZdafcIvREw

<br>

<hr>

# [📌연결 리스트 완전 정복 10] 이중 연결 리스트(doubly linked list) 역순 연결

<br>

https://youtu.be/bWJma-gywpQ





# 자료구조란? | 배열(array) | 리스트(list) | 스택( stack) | 큐(queue) | 데큐(deque) | 트리(tree) | 그래프(graph) | 혀니C코딩[|🔝|](#link)
- https://youtu.be/RZHYuAhUrwE?si=_1XPXvbxiE9p3RLG

<table border="1">
    <tr>
        <td>큰 분류</td>
        <td></td>
        <td>장점</td>
        <td>단점</td>
        <td>쓰기 적합한 곳</td>
    </tr>
    <tr align="left" >
        <td rowspan="5">1. 선형구조</td>
        <td>- 배열(array)</td>
        <td>Random Access<br>읽기전용이구만 ㅋㅋ<br>접속이 아주 많은 경우는<br>Array가 적합하다.<br>데이터에 접근할 일이 많은 경우</td>
        <td>배열 중간에 있는거 꺼낼때<br> 전체 copy와 move가 <br>일어나서 성능 저하 ㅠㅠ<br>Overhead발생 ㅠㅠ <br>Overhead가 커질수록 성능 저하</td>
        <td>읽기 전용이 무지 많은 곳<br>시작점 index[0]</td>
    </tr>
    <tr align="left">
        <td>- 리스트(list)<br> (단일, 이중, 원형)</td>
        <td> Array단점 보완<br>중간삭제 추가시 Overhead가 X<br>오버헤드 없음(x)<br>중간 index번호100번같이 데이터 삭제 추가가 <br>편하다.head하고 tail값만 수정해주면 됨. 대박 편함.<br>원소 하나하나가 따로 따로</td>
        <td>Memory를 많이 사용함 ㅠㅠ<br>Random Access가 불가능<br>무조건 head부터 <br>추적해서 들어가야한다. ㅠㅠ</td>
        <td>데이터 추가 /삭제가 <br>아주 많이 빈번한곳 <br>시작점 head</td>
    </tr>
    <tr align="left">
        <td>- 스택<br>(stack)</td>
        <td>메모장 복사하기 되돌리기 생각하면 됨</td>
        <td></td>
        <td></td>
    </tr>
    <tr align="left">
        <td>- 큐<br>(queue)</td>
        <td></td>
        <td></td>
        <td>Printer출력<br>연결리스트가 성능이 좋다.</td>
    </tr>
    <tr align="left">
        <td>- 데크<br>(Deque)</td>
        <td>stack+queue형태<br>앞뒤양쪽방향에서<br>추가,삭제가 가능</td>
        <td></td>
        <td></td>
    </tr>
    <tr align="left">
        <td rowspan="2">2. 비선형구조</td>
        <td>- 트리</td>
        <td>부모와 자식관계<br>방향이 존재하는<br>방향 그래프</td>
        <td></td>
        <td>시작점root</td>
    </tr>
    <tr align="left">
        <td>- 그래프</td>
        <td >시작점x<br>정해진 방향은x</td>
        <td ></td>
        <td >네비게이션 생각하면 됨</td>
    </tr>
</table>

<hr>

# array 배열[|🔝|](#link)

```
[1,  2,  3,  4,  5,  6]
[0] [1] [2] [3] [4] [5]
// index

Random Access가 가능
```

<hr>

# list리스트(head가 필요- 첫번째 원소의 주소가 저장됨)[|🔝|](#link)
- 원형리스트는 null이 없다.(꼬리와 머리가 이어져 있기 때문에 ^^)
- 다음 주소를 저장할 Pointer가 필요함
  - 마지막에 저장값이 없다면 tail에 null를 저장함

```
head에 시작 주소
       ┌-----┓       ┌-----┓
       | head|       | head|
       └┭----┘    ┌> └┭----┘
        ┌--┓      |   ┌--┓
node -> |1 |      |   |2 |
        └--┘      |   └--┘
       ┌--┴--┓    |  ┌--┴--┓   반복
       | tail| ---┘  | tail| ---┘
       └-----┘       └-----┘
       tail에는 다음 주소
       8 bytes

```
- [자료구조] 단일 연결 리스트 2시간 라이브 스트리밍[첫 번째 특강] | 2023년 10월 15일 오후 12시
  - https://www.youtube.com/live/2-7vBNP4YFI?si=G0Qsjwp1Niv_bYvX 

# Stack스택(+)[|🔝|](#link)
- 접시를 쌓는다 생각하면 됨 한쪽 방향으로만 데이터가 쌓임
  - LIFO(Last In First Out)

# Pop(자료 뺄때, -)[|🔝|](#link)
- 접시에서 상단부터 빼는거 생각하면 됨.stack과 pop
  - LIFO(Last In First Out)

# 큐queue(마트에서 줄서는거 생각하면됨)[|🔝|](#link)
- Print종이 나오는거 생각하면됨. First처음 들어오면 처음 나가는거 굿
- FIFO(First In First Out)
- 큐queue구현은 연결list가 오버헤드없이 구현해야 최적화 잘됨.
  - 삽입(enqueue)
  - 삭제(dequeue)
    - Difference between "enqueue" and "dequeue" 
      - https://stackoverflow.com/questions/16433397/difference-between-enqueue-and-dequeue 

# 데크(Deque)(스택과 큐가 합쳐진 형태)[|🔝|](#link)


# Tree트리[|🔝|](#link)


```
           root
           1
        
        2     3

   4   5     6   7
```


# Graph그래프(상위root가 없다.)[|🔝|](#link)


```
   자유로운 영혼들
   1     2     5

     3     4
```

<hr>

# Stack 자료구조 | C언어 코드 완벽 구현 | 배열을 이용한 스택 | 삽입(push), 삭제(pop), 출력(print), 초기화(clear) 혀니C코딩[|🔝|](#link)
- https://youtu.be/1PFFgRcZLAk?si=6Da6I9xvcgkzo0sS






