# GraphQL 설계 가이드

## 1. 개념 요약

클라이언트가 필요한 데이터 구조를 선언적으로 요청하고 단일 엔드포인트로 조합 응답을 받는다.

## 2. 언제 선택하는가

- 화면마다 필요한 필드가 크게 다를 때
- 여러 도메인 데이터를 한 번에 조합해 가져와야 할 때

## 3. 핵심 설계 포인트

- 스키마가 계약의 중심이다.
- 쿼리, 뮤테이션, 구독을 구분한다.
- Resolver 성능과 캐시 전략을 함께 고려한다.

## 4. 프론트엔드 적용 포인트

- 화면 단위로 필요한 필드만 요청한다.
- 대시보드 조합 조회를 줄이고 과다 응답을 피한다.

- 이 workspace에서는 `frontend` 대시보드에서 해당 패턴을 선택하고 사례 메모를 기록하도록 구성한다.

## 5. 백엔드 적용 포인트

- Resolver 계층과 서비스 계층 책임을 분리한다.
- N+1과 필드 수준 권한을 설계한다.

- 이 workspace에서는 `backend` API가 패턴 개요, 스터디 사례, 메모 저장용 엔드포인트를 제공한다.

## 6. 스터디 시나리오

학습 대시보드에서 학습자, 과제, 진행률을 한 번의 GraphQL 쿼리로 받아와 화면별 필드 차이를 비교한다.

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

- 핵심 타입과 쿼리 계약을 정의한다.
- Resolver 성능 전략을 준비한다.
- 권한 검사 위치를 정한다.

## 9. 주의점

- 스키마만 늘고 도메인 책임이 흐려질 수 있다.
- 캐시 전략을 명확히 하지 않으면 성능 이슈가 생긴다.

## 10. 연결 포인트

- 상위 가이드: [Integration Study Workspace](../README.md)
- 기준 질문: 데이터를 어떤 방식으로 연결하고 전달할 것인가
- 예시 도메인: 시스템 연동 전략
