# Implementation Pattern Study Workspace

UI, 상태 관리, 데이터 접근 관심사를 코드 수준 패턴으로 비교하는 workspace.

## 스터디 질문

- 코드 수준에서 관심사를 어떻게 나눌 것인가
- 기준 도메인: 코드 패턴 비교 학습
- 사용자 맥락: 화면과 상태, 데이터 접근을 어떤 단위로 나눌지 고민하는 구현 담당자

## 포함 패턴

- [MVC](./mvc/README.md)
- [MVVM](./mvvm/README.md)
- [MVP](./mvp/README.md)
- [Redux Pattern](./redux-pattern/README.md)
- [Reactive Pattern](./reactive-pattern/README.md)
- [Atomic Pattern](./atomic-pattern/README.md)
- [Flux Pattern](./flux-pattern/README.md)
- [Repository Pattern](./repository-pattern/README.md)
- [CQRS](./cqrs/README.md)
- [Event Sourcing](./event-sourcing/README.md)

## 예시 시스템

- 프론트엔드: React + Vite + styled-components + React Query + Zustand + React Hook Form
- 백엔드: NestJS + ConfigModule + Throttler + Swagger + class-validator
- 공통 UI: `@vibe-architecture/react`, `@vibe-architecture/css`
- 시나리오: 동일한 학습 관리 요구사항을 여러 구현 패턴으로 바라보며 데이터 흐름과 책임 분리를 비교한다.

## 워크스페이스 구조

```text
implementation/
  frontend/
  backend/
  mvc/
  mvvm/
  mvp/
  redux-pattern/
  reactive-pattern/
  atomic-pattern/
  flux-pattern/
  repository-pattern/
  cqrs/
  event-sourcing/
```

## 실행 메모

```bash
bun --filter @architecture-study/implementation run backend:dev
bun --filter @architecture-study/implementation run frontend:dev
```

## 학습 순서 제안

1. MVC/MVVM/MVP로 화면 책임 분리 비교
2. Redux/Reactive/Atomic/Flux로 상태 흐름 비교
3. Repository/CQRS/Event Sourcing으로 데이터 접근과 기록 전략 비교
