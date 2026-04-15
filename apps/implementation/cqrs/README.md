# CQRS 설계 가이드

## 1. 개념 요약

쓰기(Command)와 조회(Query) 모델을 분리해 서로 다른 최적화 방향을 취한다.

## 2. 언제 선택하는가

- 조회와 쓰기 요구가 명확히 다를 때
- 랭킹, 대시보드처럼 조회 최적화가 중요한 경우

## 3. 핵심 설계 포인트

- Command와 Query를 별도 계약으로 다룬다.
- 쓰기 이후 읽기 모델 갱신 전략을 정한다.
- 비동기 일관성 여부를 사용자가 이해할 수 있어야 한다.

## 4. 프론트엔드 적용 포인트

- 제출 폼과 조회 화면을 अलग힌 API로 소비한다.
- 낙관적 UI와 조회 갱신 타이밍을 명시한다.

- 이 workspace에서는 `frontend` 대시보드에서 해당 패턴을 선택하고 사례 메모를 기록하도록 구성한다.

## 5. 백엔드 적용 포인트

- Command Handler와 Query Handler를 분리한다.
- Projection 업데이트와 읽기 저장소 최적화를 설계한다.

- 이 workspace에서는 `backend` API가 패턴 개요, 스터디 사례, 메모 저장용 엔드포인트를 제공한다.

## 6. 스터디 시나리오

퀴즈 제출과 랭킹 조회를 분리해 쓰기 정확성과 조회 성능 요구가 어떻게 달라지는지 비교한다.

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

- Command와 Query 계약을 분리한다.
- 프로젝션 갱신 지연을 문서화한다.
- 쓰기 검증 규칙을 강화한다.

## 9. 주의점

- 단순한 CRUD에는 과한 구조일 수 있다.
- 읽기 모델 지연을 숨기면 사용자 혼란이 생긴다.

## 실행 메모

현재 프로젝트 루트에서 아래 명령으로 실행한다.

```bash
bun run dev:implementation:cqrs:frontend
bun run dev:implementation:cqrs:backend
```

## 10. 연결 포인트

- 상위 가이드: [Implementation Pattern Study Workspace](../README.md)
- 기준 질문: 코드 수준에서 관심사를 어떻게 나눌 것인가
- 예시 도메인: 코드 패턴 비교 학습
