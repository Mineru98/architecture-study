# Component-Based Architecture 설계 가이드

## 1. 개념 요약

재사용 가능한 컴포넌트 단위로 UI를 조립해 개발 속도와 일관성을 높인다.

## 2. 언제 선택하는가

- UI 재사용이 핵심일 때
- 공통 컴포넌트 계층을 먼저 정리하고 싶을 때

## 3. 핵심 설계 포인트

- 각 컴포넌트는 단일 책임을 가진다.
- 상위 컴포넌트는 단방향 데이터 흐름으로 조합한다.
- 도메인 의존은 가능한 늦게 붙인다.

## 4. 프론트엔드 적용 포인트

- atoms, molecules, organisms 식으로 단위를 나눈다.
- 공통 입력, 카드, 섹션 컴포넌트를 조합해 화면을 만든다.

- 이 workspace에서는 `frontend` 대시보드에서 해당 패턴을 선택하고 사례 메모를 기록하도록 구성한다.

## 5. 백엔드 적용 포인트

- 백엔드는 컴포넌트가 소비하기 쉬운 응답 구조를 제공한다.
- 응답 포맷과 에러 구조를 일관되게 유지한다.

- 이 workspace에서는 `backend` API가 패턴 개요, 스터디 사례, 메모 저장용 엔드포인트를 제공한다.

## 6. 스터디 시나리오

예약 카드 뷰어를 구성하며 카드, 버튼, 입력, 모달을 컴포넌트 단위로 조합한다.

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

- 컴포넌트 책임을 문서화한다.
- 공통 props 규칙을 만든다.
- 도메인 의존 컴포넌트와 순수 컴포넌트를 구분한다.

## 9. 주의점

- 공통화가 너무 빠르면 추상화가 무거워진다.
- 컴포넌트명만 다르고 책임이 겹치면 관리가 어렵다.

## 실행 메모

현재 프로젝트 루트에서 아래 명령으로 실행한다.

```bash
bun run dev:design_methodology:component-based-architecture:frontend
bun run dev:design_methodology:component-based-architecture:backend
```

## 10. 연결 포인트

- 상위 가이드: [Design Methodology Study Workspace](../README.md)
- 기준 질문: 시스템을 어떤 책임 경계로 나눌 것인가
- 예시 도메인: 구조화 설계 의사결정
