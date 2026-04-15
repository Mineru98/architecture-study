# Reactive Pattern 설계 가이드

## 1. 개념 요약

Observable 기반 스트림으로 비동기 상태 변화와 이벤트 흐름을 선언적으로 처리한다.

## 2. 언제 선택하는가

- 입력과 외부 이벤트가 빈번히 섞일 때
- 취소, 디바운스, 재시도가 핵심인 기능일 때

## 3. 핵심 설계 포인트

- 데이터 흐름을 스트림으로 표현한다.
- 연산자 선택이 설계의 핵심이다.
- 구독 수명주기를 명확히 관리한다.

## 4. 프론트엔드 적용 포인트

- 검색 입력과 추천 결과를 스트림으로 묶는다.
- BehaviorSubject나 custom hook으로 UI 구독을 단순화한다.

- 이 workspace에서는 `frontend` 대시보드에서 해당 패턴을 선택하고 사례 메모를 기록하도록 구성한다.

## 5. 백엔드 적용 포인트

- 이벤트 기반 응답이나 스트림 친화적 API를 제공한다.
- 재시도와 타임아웃 정책을 명확하게 반환한다.

- 이 workspace에서는 `backend` API가 패턴 개요, 스터디 사례, 메모 저장용 엔드포인트를 제공한다.

## 6. 스터디 시나리오

실시간 검색과 추천 리스트 갱신 화면을 만들며 디바운스, 취소, 최신 응답 우선 전략을 학습한다.

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

- 핵심 스트림 목록을 그린다.
- 구독 해제 규칙을 정한다.
- 실패 시 재시도/중단 기준을 정의한다.

## 9. 주의점

- 스트림이 많아지면 디버깅이 어려워진다.
- Observable 추상화를 남용하면 팀 학습 비용이 커진다.

## 10. 연결 포인트

- 상위 가이드: [Implementation Pattern Study Workspace](../README.md)
- 기준 질문: 코드 수준에서 관심사를 어떻게 나눌 것인가
- 예시 도메인: 코드 패턴 비교 학습
