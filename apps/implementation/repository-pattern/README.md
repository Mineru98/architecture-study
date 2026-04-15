# Repository Pattern 설계 가이드

## 1. 개념 요약

도메인 계층이 저장소 구현 세부사항을 모르도록 데이터 접근을 인터페이스로 감싼다.

## 2. 언제 선택하는가

- 저장소를 교체할 가능성이 있을 때
- 서비스가 ORM 세부사항을 모르게 하고 싶을 때

## 3. 핵심 설계 포인트

- Repository 인터페이스를 먼저 정의한다.
- 구현체는 데이터 소스별로 나눈다.
- 서비스는 도메인 요구 중심 메서드만 호출한다.

## 4. 프론트엔드 적용 포인트

- 프론트는 API만 소비하고 저장소 방식은 백엔드 내부에 숨긴다.
- 조회 훅은 데이터 소스 세부사항을 모르게 유지한다.

- 이 workspace에서는 `frontend` 대시보드에서 해당 패턴을 선택하고 사례 메모를 기록하도록 구성한다.

## 5. 백엔드 적용 포인트

- TypeORM 구현체와 InMemory 구현체를 나눌 수 있다.
- 트랜잭션 경계는 서비스 또는 유스케이스에서 제어한다.

- 이 workspace에서는 `backend` API가 패턴 개요, 스터디 사례, 메모 저장용 엔드포인트를 제공한다.

## 6. 스터디 시나리오

학습 이력 조회 기능에서 Repository 인터페이스와 여러 구현체를 두고 서비스 계층을 안정적으로 유지한다.

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

- 인터페이스 메서드를 도메인 언어로 정의한다.
- 구현체 책임을 저장소 세부사항으로 제한한다.
- 테스트용 구현체를 준비한다.

## 9. 주의점

- 단순 CRUD까지 과하게 감싸면 의미 없는 추상화가 된다.
- ORM의 장점을 모두 숨기려 하면 오히려 복잡해진다.

## 10. 연결 포인트

- 상위 가이드: [Implementation Pattern Study Workspace](../README.md)
- 기준 질문: 코드 수준에서 관심사를 어떻게 나눌 것인가
- 예시 도메인: 코드 패턴 비교 학습
