# DDD 설계 가이드

## 1. 개념 요약

도메인 언어를 중심으로 엔티티, 밸류 오브젝트, 애그리게이트를 설계한다.

## 2. 언제 선택하는가

- 비즈니스 규칙이 복잡하고 용어 정합성이 중요한 경우
- 팀이 도메인 중심 의사소통을 강화해야 할 때

## 3. 핵심 설계 포인트

- 용어와 코드 구조를 일치시킨다.
- 애그리게이트 경계를 먼저 정한다.
- 도메인 이벤트로 핵심 상태 변화를 표현한다.

## 4. 프론트엔드 적용 포인트

- 도메인별 엔티티 모델과 뷰 상태를 분리한다.
- 예약, 결제, 반납 같은 기능 언어를 화면에도 그대로 반영한다.

- 이 workspace에서는 `frontend` 대시보드에서 해당 패턴을 선택하고 사례 메모를 기록하도록 구성한다.

## 5. 백엔드 적용 포인트

- domain/application/infrastructure/interfaces 구조를 분리한다.
- 도메인 서비스와 애그리게이트가 프레임워크를 모르게 유지한다.

- 이 workspace에서는 `backend` API가 패턴 개요, 스터디 사례, 메모 저장용 엔드포인트를 제공한다.

## 6. 스터디 시나리오

공유 킥보드 예약 시스템에서 예약 시작, 연장, 완료 상태 전이를 도메인 언어와 이벤트로 설계한다.

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

- 유비쿼터스 언어 사전을 만든다.
- 애그리게이트 루트 규칙을 정한다.
- 컨텍스트 경계마다 공개 인터페이스를 정의한다.

## 9. 주의점

- 패턴만 흉내 내면 구조만 무거워진다.
- 도메인 경계가 불명확하면 모듈 분리가 무의미해진다.

## 실행 메모

현재 프로젝트 루트에서 아래 명령으로 실행한다.

```bash
bun run dev:design_methodology:ddd:frontend
bun run dev:design_methodology:ddd:backend
```

## 10. 연결 포인트

- 상위 가이드: [Design Methodology Study Workspace](../README.md)
- 기준 질문: 시스템을 어떤 책임 경계로 나눌 것인가
- 예시 도메인: 구조화 설계 의사결정
