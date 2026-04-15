# Event Sourcing 설계 가이드

## 1. 개념 요약

상태 대신 이벤트를 누적 저장하고 재생해 현재 상태를 재구성한다.

## 2. 언제 선택하는가

- 감사 추적과 과거 상태 재현이 중요할 때
- 복잡한 상태 전이를 분석해야 할 때

## 3. 핵심 설계 포인트

- 이벤트 로그가 영속성의 중심이다.
- 상태 복원과 읽기 모델을 별도 고려한다.
- 버전, 멱등성, 스냅샷을 함께 설계한다.

## 4. 프론트엔드 적용 포인트

- 타임라인 UI와 현재 상태 요약을 함께 보여준다.
- 이벤트 설명을 사용자 언어로 번역한다.

- 이 workspace에서는 `frontend` 대시보드에서 해당 패턴을 선택하고 사례 메모를 기록하도록 구성한다.

## 5. 백엔드 적용 포인트

- 이벤트 저장과 상태 복원을 분리한다.
- 프로젝션 갱신과 감사 조회 경로를 제공한다.

- 이 workspace에서는 `backend` API가 패턴 개요, 스터디 사례, 메모 저장용 엔드포인트를 제공한다.

## 6. 스터디 시나리오

학습 세션 감사 시스템에서 세션 시작, 일시정지, 완료 이벤트를 누적하고 현재 상태를 재구성한다.

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

- 이벤트 이름과 버전 정책을 정한다.
- 리플레이 전략을 만든다.
- 스냅샷 기준과 감사 조회 화면을 준비한다.

## 9. 주의점

- 이벤트 설계 오류는 나중에 고치기 어렵다.
- 도메인 가치가 낮으면 구조 비용만 커진다.

## 10. 연결 포인트

- 상위 가이드: [Implementation Pattern Study Workspace](../README.md)
- 기준 질문: 코드 수준에서 관심사를 어떻게 나눌 것인가
- 예시 도메인: 코드 패턴 비교 학습
