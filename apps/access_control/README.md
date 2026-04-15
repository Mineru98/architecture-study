# Access Control Study Workspace

쇼핑몰 백오피스와 판매자 콘솔을 기준으로 접근 제어 모델과 권한 구조를 단일 패턴별로 학습하는 workspace.

## 스터디 질문

- 누가 어떤 리소스에 언제 접근할 수 있는가
- 기준 도메인: 쇼핑몰 권한 설계
- 사용자 맥락: platform-admin, seller, cs-agent 같은 운영 주체가 동시에 쓰는 시스템

## 포함 패턴

- [RBAC](./rbac/README.md)
- [ABAC](./abac/README.md)
- [ReBAC](./rebac/README.md)
- [Flat Structure](./flat/README.md)
- [Hierarchical Structure](./hierarchical/README.md)
- [Delegation Structure](./delegation/README.md)
- [Graph-Based Structure](./graph-based/README.md)

## 예시 시스템

- 프론트엔드: React + Vite + styled-components + React Query + Zustand + React Hook Form
- 백엔드: NestJS + ConfigModule + Throttler + Swagger + class-validator
- 공통 UI: `@vibe-architecture/react`, `@vibe-architecture/css`
- 시나리오: 상품, 주문, 환불, 정산, 리뷰 리소스에 대한 접근 정책을 비교하고, 선택한 패턴에 맞춘 권한 설계 결정을 기록한다.

## 워크스페이스 구조

```text
access_control/
  frontend/
  backend/
  rbac/
  abac/
  rebac/
  flat/
  hierarchical/
  delegation/
  graph-based/
```

## 실행 메모

```bash
bun --filter @architecture-study/access-control run backend:dev
bun --filter @architecture-study/access-control run frontend:dev
```

## 학습 순서 제안

1. RBAC로 기본 역할 경계 정리
2. ABAC/ReBAC로 문맥 규칙 확장
3. Flat/Hierarchical/Delegation/Graph-Based로 권한 구조 선택
