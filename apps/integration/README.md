# Integration Study Workspace

동기 API와 비동기 메시징 패턴을 단일 사례 기준으로 비교하는 workspace.

## 스터디 질문

- 데이터를 어떤 방식으로 연결하고 전달할 것인가
- 기준 도메인: 시스템 연동 전략
- 사용자 맥락: 프론트와 백엔드, 외부 시스템 사이의 통신 방식을 결정하는 엔지니어

## 포함 패턴

- [RESTful](./restful/README.md)
- [GraphQL](./graphql/README.md)
- [RPC](./rpc/README.md)
- [WebSocket](./websocket/README.md)
- [MQTT](./mqtt/README.md)
- [Pub/Sub](./pub-sub/README.md)
- [Message Queue](./message-queue/README.md)
- [Outbox Pattern](./outbox-pattern/README.md)

## 예시 시스템

- 프론트엔드: React + Vite + styled-components + React Query + Zustand + React Hook Form
- 백엔드: NestJS + ConfigModule + Throttler + Swagger + class-validator
- 공통 UI: `@vibe-architecture/react`, `@vibe-architecture/css`
- 시나리오: 같은 학습 플랫폼 요구사항을 REST, GraphQL, RPC, WebSocket, MQTT, Pub/Sub, Message Queue, Outbox 패턴으로 나눠 연동 전략을 비교한다.

## 워크스페이스 구조

```text
integration/
  frontend/
  backend/
  restful/
  graphql/
  rpc/
  websocket/
  mqtt/
  pub-sub/
  message-queue/
  outbox-pattern/
```

## 실행 메모

```bash
bun --filter @architecture-study/integration run backend:dev
bun --filter @architecture-study/integration run frontend:dev
```

## 학습 순서 제안

1. RESTful로 기본 계약 학습
2. GraphQL/RPC/WebSocket/MQTT로 통신 모델 확장
3. Pub/Sub, MQ, Outbox로 비동기 통합 신뢰성 설계
