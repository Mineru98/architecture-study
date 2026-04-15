# Vertical Slice Architecture 설계 가이드

## 1. 개념 요약

기능 하나를 처음부터 끝까지 하나의 슬라이스로 묶어 독립적 변경 속도를 높인다.

## 2. 언제 선택하는가

- 기능 단위로 팀이 작업하고 싶을 때
- 기능별 테스트와 배포 범위를 작게 유지하고 싶을 때

## 3. 핵심 설계 포인트

- 기능 단위로 프론트와 백엔드 책임을 함께 본다.
- 슬라이스 내부에서 DTO, 핸들러, 뷰를 묶는다.
- 공통화보다 기능 응집을 우선한다.

## 4. 프론트엔드 적용 포인트

- features/order/create-order 같은 경로로 기능을 나눈다.
- 슬라이스 단위로 폼, 상태, API 호출을 함께 둔다.

- 이 workspace에서는 `frontend` 대시보드에서 해당 패턴을 선택하고 사례 메모를 기록하도록 구성한다.

## 5. 백엔드 적용 포인트

- commands, queries, handlers를 기능 경로로 구성한다.
- 공용 로직은 shared로 최소화한다.

- 이 workspace에서는 `backend` API가 패턴 개요, 스터디 사례, 메모 저장용 엔드포인트를 제공한다.

## 6. 스터디 시나리오

커뮤니티 게시글 기능을 작성, 댓글 등록, 좋아요 슬라이스로 나누고 변경 범위를 비교한다.

## 7. 추천 구조

```text
frontend/
  src/app
  src/features
  src/shared/api
  src/shared/store
  src/shared/constants
```

```text
backend/
  src/main.ts
  src/app.module.ts
  src/study/study.controller.ts
  src/study/study.service.ts
  src/study/study.data.ts
```

## 8. 구현 체크리스트

- 슬라이스 경계를 기능 이벤트 기준으로 정한다.
- 공용 추상화 도입을 늦춘다.
- 슬라이스별 테스트 범위를 정의한다.

## 9. 주의점

- 공통화 압력이 너무 빠르면 슬라이스 경계가 무너진다.
- 기능이 너무 작으면 오히려 파일 수만 늘어난다.

## 10. 연결 포인트

- 상위 가이드: [Design Methodology Study Workspace](../README.md)
- 기준 질문: 시스템을 어떤 책임 경계로 나눌 것인가
- 예시 도메인: 구조화 설계 의사결정
