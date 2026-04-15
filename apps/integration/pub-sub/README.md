# Pub/Sub 설계 가이드

## 1. 개념 요약

발행자와 구독자의 직접 결합을 제거하고 이벤트 의미 중심으로 메시지를 분배한다.

## 2. 언제 선택하는가

- 하나의 이벤트를 여러 하위 기능이 받아야 할 때
- 기능 추가 시 기존 발행 코드를 건드리고 싶지 않을 때

## 3. 핵심 설계 포인트

- 이벤트 이름과 payload 스키마를 표준화한다.
- 구독자는 독립적으로 실패 처리한다.
- 중복 처리와 멱등성 기준을 마련한다.

## 4. 프론트엔드 적용 포인트

- 알림 토스트와 배지 갱신처럼 이벤트 구독 결과를 나눠 보여준다.
- 실시간 피드백을 사용자에게 제공한다.

- 이 workspace에서는 `frontend` 대시보드에서 해당 패턴을 선택하고 사례 메모를 기록하도록 구성한다.

## 5. 백엔드 적용 포인트

- Publisher는 이벤트 의미만 발행한다.
- Subscriber별 실패 정책과 재처리를 분리한다.

- 이 workspace에서는 `backend` API가 패턴 개요, 스터디 사례, 메모 저장용 엔드포인트를 제공한다.

## 6. 스터디 시나리오

과제 완료 이벤트 하나가 알림, 통계, 포인트 부여 처리로 동시에 분기되는 흐름을 비교한다.

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

- 이벤트 카탈로그를 만든다.
- 구독자별 실패 정책을 정한다.
- 멱등성 키를 정의한다.

## 9. 주의점

- 이벤트 의미가 모호하면 구독자 결합이 생긴다.
- 누가 어떤 이벤트를 소비하는지 추적 도구가 필요하다.

## 실행 메모

현재 프로젝트 루트에서 아래 명령으로 실행한다.

```bash
bun run dev:integration:pub-sub:frontend
bun run dev:integration:pub-sub:backend
```

## 10. 연결 포인트

- 상위 가이드: [Integration Study Workspace](../README.md)
- 기준 질문: 데이터를 어떤 방식으로 연결하고 전달할 것인가
- 예시 도메인: 시스템 연동 전략
