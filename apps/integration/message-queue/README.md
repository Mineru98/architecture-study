# Message Queue 설계 가이드

## 1. 개념 요약

큐에 메시지를 적재하고 소비자가 비동기로 처리해 응답 지연과 피크 부하를 완화한다.

## 2. 언제 선택하는가

- 즉시 응답이 필요 없는 작업이 많을 때
- 트래픽 피크를 흡수해야 할 때

## 3. 핵심 설계 포인트

- 요청과 실제 처리를 분리한다.
- 재시도와 DLQ 정책을 마련한다.
- 처리 상태 추적 API를 함께 제공한다.

## 4. 프론트엔드 적용 포인트

- 작업 요청 후 상태 조회 또는 실시간 완료 알림을 표시한다.
- 장시간 작업의 진행 상태를 분리해 안내한다.

- 이 workspace에서는 `frontend` 대시보드에서 해당 패턴을 선택하고 사례 메모를 기록하도록 구성한다.

## 5. 백엔드 적용 포인트

- Producer와 Consumer를 분리한다.
- 중복 처리 방지와 상태 전이를 명확히 관리한다.

- 이 workspace에서는 `backend` API가 패턴 개요, 스터디 사례, 메모 저장용 엔드포인트를 제공한다.

## 6. 스터디 시나리오

학습자료 PDF 생성 요청을 큐에 넣고, 프론트는 작업 상태를 poll 또는 WebSocket으로 확인한다.

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

- 큐 메시지 스키마를 정한다.
- 재시도와 DLQ 기준을 만든다.
- 작업 상태 모델을 정의한다.

## 9. 주의점

- 멱등성 없이 재시도하면 중복 처리 문제가 생긴다.
- 처리 지연을 사용자에게 설명해야 한다.

## 10. 연결 포인트

- 상위 가이드: [Integration Study Workspace](../README.md)
- 기준 질문: 데이터를 어떤 방식으로 연결하고 전달할 것인가
- 예시 도메인: 시스템 연동 전략
