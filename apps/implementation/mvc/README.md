# MVC

## 개념
MVC는 사용자 요청 처리에서 **Model, View, Controller**를 분리해 역할을 명확히 나누는 패턴이다.
- Model: 데이터와 비즈니스 규칙
- View: 화면 렌더링
- Controller: 입력 처리와 흐름 제어

## 언제 쓰는지
- 화면 단위가 명확하고 팀 구조도 단순한 초중급 단계에서 빠르게 팀원 이해를 맞출 때
- CRUD가 중심이고 데이터 가공이 복잡하지 않을 때
- 기능을 빠르게 분리해 검증하거나 교육용 샘플을 만들 때

## 기본 데이터 흐름
1. React 화면에서 사용자가 액션 트리거
2. Controller(또는 라우터 핸들러)가 요청을 수신
3. Service/Model에서 도메인 로직 처리
4. 결과를 DTO로 변환해 View 계층으로 전달
5. View가 화면에 반영

## NestJS + React 예시 구상
- 시나리오: 학습 카드 CRUD
- NestJS Controller: `GET /study-cards`, `POST /study-cards`
- Service/Model: 카드 목록 조회, 생성, 유효성 검사
- React View: `CardListView`, `CardCreateForm`
- Controller-View 연결: Axios 호출 + React Query 캐시 갱신

## 스터디 범위
- Controller와 Service 책임 분리 기준 정리
- DTO/ValidationPipe의 사용 위치 실습
- React 쪽 View를 최소 책임으로 두는 방법
- 단일 기능(카드 등록/조회)을 통째로 구현하면서 Controller-Model-View 계층 경계 확인
