# Redux Pattern 설계 가이드

## 1. 개념 요약

Action, Reducer, Store 중심의 단방향 흐름으로 상태 전이를 예측 가능하게 관리한다.

## 2. 언제 선택하는가

- 여러 화면이 같은 상태를 공유할 때
- 상태 변경 이력과 디버깅이 중요한 경우

## 3. 핵심 설계 포인트

- 상태 변경은 Action으로 시작한다.
- Reducer는 순수 함수로 상태를 계산한다.
- Store가 단일 진실의 원천이 된다.

## 4. 프론트엔드 적용 포인트

- 학습 과제 상태를 전역 스토어로 보관한다.
- 비동기 요청 결과를 액션으로 정규화한다.

- 이 workspace에서는 `frontend` 대시보드에서 해당 패턴을 선택하고 사례 메모를 기록하도록 구성한다.

## 5. 백엔드 적용 포인트

- 백엔드는 정규화하기 쉬운 응답 형태를 제공한다.
- 변경 이벤트와 조회 응답의 일관성을 유지한다.

- 이 workspace에서는 `backend` API가 패턴 개요, 스터디 사례, 메모 저장용 엔드포인트를 제공한다.

## 6. 스터디 시나리오

문제집 대시보드 상태를 전역 스토어에 두고 과제 목록, 진행률, 필터 상태를 한 흐름으로 관리한다.

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

- 액션 이름 규칙을 정한다.
- 엔티티 정규화 기준을 만든다.
- 비동기 액션 처리 계층을 분리한다.

## 9. 주의점

- 상태 설계가 나쁘면 보일러플레이트만 늘어난다.
- 작은 기능에 과도한 구조를 들이면 부담이 된다.

## 10. 연결 포인트

- 상위 가이드: [Implementation Pattern Study Workspace](../README.md)
- 기준 질문: 코드 수준에서 관심사를 어떻게 나눌 것인가
- 예시 도메인: 코드 패턴 비교 학습
