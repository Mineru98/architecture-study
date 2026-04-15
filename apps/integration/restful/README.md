# RESTful 설계 가이드

## 1. 개념 요약

자원 중심 URL과 HTTP 메서드 규약으로 CRUD와 범용 API 계약을 만든다.

## 2. 언제 선택하는가

- 범용성이 중요하고 여러 클라이언트가 동일 API를 소비할 때
- CRUD 중심 관리 기능을 빠르게 안정화하고 싶을 때

## 3. 핵심 설계 포인트

- 명사형 리소스 경로를 사용한다.
- HTTP 메서드 의미와 상태 코드를 일관되게 맞춘다.
- 에러 포맷과 버전 관리 전략을 문서화한다.

## 4. 프론트엔드 적용 포인트

- React Query와 Axios로 CRUD 흐름을 단순하게 연결한다.
- 리소스 중심 캐시 키를 유지한다.

- 이 workspace에서는 `frontend` 대시보드에서 해당 패턴을 선택하고 사례 메모를 기록하도록 구성한다.

## 5. 백엔드 적용 포인트

- Controller는 자원 단위 엔드포인트를 제공한다.
- DTO 검증과 상태 코드 정책을 통일한다.

- 이 workspace에서는 `backend` API가 패턴 개요, 스터디 사례, 메모 저장용 엔드포인트를 제공한다.

## 6. 스터디 시나리오

학습 항목 관리 API에서 목록 조회, 생성, 수정, 삭제를 RESTful하게 구성하고 프론트 캐시 동기화를 비교한다.

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

- 리소스 이름과 경로 규칙을 정한다.
- 상태 코드 표를 만든다.
- 에러 응답 포맷을 통일한다.

## 9. 주의점

- 액션성 작업을 URL에 무리하게 넣지 않는다.
- 버전 전략 없이 확장하면 계약이 깨지기 쉽다.

## 실행 메모

현재 프로젝트 루트에서 아래 명령으로 실행한다.

```bash
bun run dev:integration:restful:frontend
bun run dev:integration:restful:backend
```

## 10. 연결 포인트

- 상위 가이드: [Integration Study Workspace](../README.md)
- 기준 질문: 데이터를 어떤 방식으로 연결하고 전달할 것인가
- 예시 도메인: 시스템 연동 전략
