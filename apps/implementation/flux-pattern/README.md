# Flux Pattern 설계 가이드

## 1. 개념 요약

Dispatcher, Store, Action, View의 단방향 순환으로 상태 갱신 규칙을 고정한다.

## 2. 언제 선택하는가

- 변경 주체를 분명히 하고 싶을 때
- 간결한 단방향 이벤트 구조가 필요한 초기 설계 단계일 때

## 3. 핵심 설계 포인트

- Dispatcher가 액션을 배포한다.
- Store가 상태와 도메인 규칙을 가진다.
- View는 Store 변경만 구독한다.

## 4. 프론트엔드 적용 포인트

- 알림 센터 같은 단방향 흐름 기능에 적합하다.
- View가 직접 상태를 바꾸지 않도록 강제한다.

- 이 workspace에서는 `frontend` 대시보드에서 해당 패턴을 선택하고 사례 메모를 기록하도록 구성한다.

## 5. 백엔드 적용 포인트

- 이벤트성 응답과 읽음 처리 API를 분리해 단순 흐름을 지원한다.
- 카운트와 목록을 독립 조회하도록 제공한다.

- 이 workspace에서는 `backend` API가 패턴 개요, 스터디 사례, 메모 저장용 엔드포인트를 제공한다.

## 6. 스터디 시나리오

알림 센터에서 markAllRead, appendNotify 액션을 Dispatcher-Store 흐름으로 처리한다.

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

- 액션 이름과 Store 책임을 정한다.
- View가 Store를 우회하지 않게 한다.
- 이벤트 흐름 문서를 만든다.

## 9. 주의점

- Store가 커지면 다시 복잡해진다.
- Flux와 Redux를 혼용하면 팀 혼란이 생길 수 있다.

## 실행 메모

현재 프로젝트 루트에서 아래 명령으로 실행한다.

```bash
bun run dev:implementation:flux-pattern:frontend
bun run dev:implementation:flux-pattern:backend
```

## 10. 연결 포인트

- 상위 가이드: [Implementation Pattern Study Workspace](../README.md)
- 기준 질문: 코드 수준에서 관심사를 어떻게 나눌 것인가
- 예시 도메인: 코드 패턴 비교 학습
