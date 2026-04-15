# WebSocket 설계 가이드

## 1. 개념 요약

장기 연결을 통해 서버가 클라이언트에 실시간 이벤트를 푸시한다.

## 2. 언제 선택하는가

- 즉시성이 핵심인 알림, 협업, 진행률 화면일 때
- Polling 비용이 높고 양방향 이벤트가 필요한 경우

## 3. 핵심 설계 포인트

- 연결 생성, 재연결, 종료 정책을 정한다.
- 이벤트 타입과 버전을 표준화한다.
- 인증과 채널 권한을 명확히 한다.

## 4. 프론트엔드 적용 포인트

- 실시간 진행률과 알림 패널을 갱신한다.
- 재연결 상태를 사용자에게 드러낸다.

- 이 workspace에서는 `frontend` 대시보드에서 해당 패턴을 선택하고 사례 메모를 기록하도록 구성한다.

## 5. 백엔드 적용 포인트

- Gateway에서 채널과 인증을 관리한다.
- 이벤트 발행 주체와 스키마를 분리한다.

- 이 workspace에서는 `backend` API가 패턴 개요, 스터디 사례, 메모 저장용 엔드포인트를 제공한다.

## 6. 스터디 시나리오

스터디 진행률 공동 편집 화면에서 progress.updated 이벤트를 받아 막대와 로그를 즉시 갱신한다.

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

- 이벤트 이름과 payload 스키마를 정한다.
- 재연결 전략을 준비한다.
- 연결 권한 정책을 문서화한다.

## 9. 주의점

- 연결 상태 관리가 어렵다.
- 이벤트 폭주 시 백프레셔 전략이 필요하다.

## 실행 메모

현재 프로젝트 루트에서 아래 명령으로 실행한다.

```bash
bun run dev:integration:websocket:frontend
bun run dev:integration:websocket:backend
```

## 10. 연결 포인트

- 상위 가이드: [Integration Study Workspace](../README.md)
- 기준 질문: 데이터를 어떤 방식으로 연결하고 전달할 것인가
- 예시 도메인: 시스템 연동 전략
