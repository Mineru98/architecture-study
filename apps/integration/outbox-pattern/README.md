# Outbox Pattern 설계 가이드

## 1. 개념 요약

DB 변경과 메시지 발행을 같은 트랜잭션 경계로 묶어 이벤트 유실을 줄인다.

## 2. 언제 선택하는가

- 분산 트랜잭션 없이도 높은 신뢰성이 필요할 때
- DB 변경 후 이벤트 전파 누락을 막아야 할 때

## 3. 핵심 설계 포인트

- 비즈니스 데이터와 Outbox 레코드를 함께 기록한다.
- Relay가 발행과 재시도를 담당한다.
- 소비자는 멱등하게 처리한다.

## 4. 프론트엔드 적용 포인트

- 포인트 적립 같은 비동기 결과를 신뢰성 있게 확인할 수 있다.
- 결과 반영이 약간 늦을 수 있음을 UI에 반영한다.

- 이 workspace에서는 `frontend` 대시보드에서 해당 패턴을 선택하고 사례 메모를 기록하도록 구성한다.

## 5. 백엔드 적용 포인트

- 트랜잭션 경계에서 Outbox insert를 함께 처리한다.
- Relay/Poller와 발행 상태 전이를 분리한다.

- 이 workspace에서는 `backend` API가 패턴 개요, 스터디 사례, 메모 저장용 엔드포인트를 제공한다.

## 6. 스터디 시나리오

과제 제출과 포인트 적립 이벤트 발행을 한 트랜잭션에 묶어 메시지 유실 없이 포인트를 반영한다.

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

- Outbox 스키마를 정의한다.
- Relay 주기와 재시도 전략을 만든다.
- 중복 발행 방지 기준을 정한다.

## 9. 주의점

- Poller 운영과 청소 전략이 필요하다.
- 소비자 멱등성이 없으면 중복 발행에 취약하다.

## 10. 연결 포인트

- 상위 가이드: [Integration Study Workspace](../README.md)
- 기준 질문: 데이터를 어떤 방식으로 연결하고 전달할 것인가
- 예시 도메인: 시스템 연동 전략
