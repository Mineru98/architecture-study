# Design Methodology Study Workspace

백엔드와 프론트엔드 구조화 철학을 단일 패턴 기준으로 비교하는 workspace.

## 스터디 질문

- 시스템을 어떤 책임 경계로 나눌 것인가
- 기준 도메인: 구조화 설계 의사결정
- 사용자 맥락: 패턴을 선택하기 전에 팀 구조와 변경 흐름을 검토하는 설계자

## 포함 패턴

- [Layered Architecture](./layered-architecture/README.md)
- [DDD](./ddd/README.md)
- [Clean Architecture](./clean-architecture/README.md)
- [Hexagonal Architecture](./hexagonal-architecture/README.md)
- [Event Sourcing](./event-sourcing/README.md)
- [Microkernel Architecture](./microkernel-architecture/README.md)
- [Pipe-Filter Architecture](./pipe-filter-architecture/README.md)
- [Modular Monolith](./modular-monolith/README.md)
- [Onion Architecture](./onion-architecture/README.md)
- [Vertical Slice Architecture](./vertical-slice-architecture/README.md)
- [Component-Based Architecture](./component-based-architecture/README.md)
- [Atomic Design](./atomic-design/README.md)
- [Feature-Sliced Design](./feature-sliced-design/README.md)

## 예시 시스템

- 프론트엔드: React + Vite + styled-components + React Query + Zustand + React Hook Form
- 백엔드: NestJS + ConfigModule + Throttler + Swagger + class-validator
- 공통 UI: `@vibe-architecture/react`, `@vibe-architecture/css`
- 시나리오: 하나의 서비스 요구사항을 여러 설계 방법론으로 풀어 보면서 폴더 구조, 의존 방향, 확장 전략이 어떻게 달라지는지 기록한다.

## 워크스페이스 구조

```text
design_methodology/
  frontend/
  backend/
  layered-architecture/
  ddd/
  clean-architecture/
  hexagonal-architecture/
  event-sourcing/
  microkernel-architecture/
  pipe-filter-architecture/
  modular-monolith/
  onion-architecture/
  vertical-slice-architecture/
  component-based-architecture/
  atomic-design/
  feature-sliced-design/
```

## 실행 메모

```bash
bun --filter @architecture-study/design-methodology run backend:dev
bun --filter @architecture-study/design-methodology run frontend:dev
```

## 학습 순서 제안

1. Layered/Modular Monolith로 기본 경계 이해
2. DDD/Clean/Hexagonal/Onion으로 의존 역전과 도메인 중심 모델 검토
3. FSD/Atomic Design/Component-Based로 프론트 구조 확정
