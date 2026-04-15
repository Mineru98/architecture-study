# RPC 설계 가이드

## 1. 개념 요약

원격 메서드 호출처럼 명확한 오퍼레이션 단위 인터페이스를 제공한다.

## 2. 언제 선택하는가

- 내부 서비스 간 강한 계약과 낮은 오버헤드가 필요할 때
- 하나의 원자적 오퍼레이션을 명확히 호출하고 싶을 때

## 3. 핵심 설계 포인트

- 메서드와 파라미터 계약을 고정한다.
- 직렬화 규약과 에러 코드를 정한다.
- 타임아웃, 재시도, 버전 전략을 명확히 한다.

## 4. 프론트엔드 적용 포인트

- 버튼 기반 원자 호출 흐름에 적합하다.
- 실패 시 재시도와 타임아웃 UX를 분리한다.

- 이 workspace에서는 `frontend` 대시보드에서 해당 패턴을 선택하고 사례 메모를 기록하도록 구성한다.

## 5. 백엔드 적용 포인트

- 메서드별 handler를 분리한다.
- 인터페이스 정의 파일과 실제 구현을 동기화한다.

- 이 workspace에서는 `backend` API가 패턴 개요, 스터디 사례, 메모 저장용 엔드포인트를 제공한다.

## 6. 스터디 시나리오

학습 세션 시작/종료를 RPC 스타일 호출로 제어하고, REST와 달리 오퍼레이션 중심 계약이 어떻게 보이는지 비교한다.

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

- 메서드 목록을 정의한다.
- 타임아웃과 재시도 규칙을 정한다.
- 에러 코드 표를 만든다.

## 9. 주의점

- 외부 공개 API에는 과도한 결합이 될 수 있다.
- 계약 관리가 느슨하면 버전 충돌이 난다.

## 실행 메모

현재 프로젝트 루트에서 아래 명령으로 실행한다.

```bash
bun run dev:integration:rpc:frontend
bun run dev:integration:rpc:backend
```

## 10. 연결 포인트

- 상위 가이드: [Integration Study Workspace](../README.md)
- 기준 질문: 데이터를 어떤 방식으로 연결하고 전달할 것인가
- 예시 도메인: 시스템 연동 전략
