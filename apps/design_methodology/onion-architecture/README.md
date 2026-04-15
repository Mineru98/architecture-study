# Onion Architecture 설계 가이드

## 1. 개념 요약

도메인을 중심에 두고 바깥쪽 계층의 기술 의존을 고립한다.

## 2. 언제 선택하는가

- 도메인 규칙을 장기간 안정적으로 유지해야 할 때
- 인프라 교체와 테스트 용이성이 동시에 필요할 때

## 3. 핵심 설계 포인트

- 중심은 엔티티와 비즈니스 규칙이다.
- 바깥쪽은 인터페이스를 통해서만 중심과 연결된다.
- 도메인은 인프라나 UI를 몰라야 한다.

## 4. 프론트엔드 적용 포인트

- domain, application, infrastructure, ui 레이어를 명시한다.
- 화면 코드가 도메인 규칙을 직접 구현하지 않게 한다.

- 이 workspace에서는 `frontend` 대시보드에서 해당 패턴을 선택하고 사례 메모를 기록하도록 구성한다.

## 5. 백엔드 적용 포인트

- application 서비스가 도메인과 인프라를 중재한다.
- 어댑터와 저장소 구현을 바깥쪽에 둔다.

- 이 workspace에서는 `backend` API가 패턴 개요, 스터디 사례, 메모 저장용 엔드포인트를 제공한다.

## 6. 스터디 시나리오

숙박 예약 서비스의 할인 계산 규칙을 도메인 중심에 고정하고, 저장소와 인증 구현은 바깥 계층으로 분리한다.

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

- 도메인 규칙과 기술 구현을 구분한다.
- 레이어 간 의존 방향을 검토한다.
- 도메인 모델 테스트를 독립시킨다.

## 9. 주의점

- 클린/헥사고날과 혼용할 때 용어 혼란이 생길 수 있다.
- 레이어 구분보다 실제 의존 방향이 더 중요하다.

## 실행 메모

현재 프로젝트 루트에서 아래 명령으로 실행한다.

```bash
bun run dev:design_methodology:onion-architecture:frontend
bun run dev:design_methodology:onion-architecture:backend
```

## 10. 연결 포인트

- 상위 가이드: [Design Methodology Study Workspace](../README.md)
- 기준 질문: 시스템을 어떤 책임 경계로 나눌 것인가
- 예시 도메인: 구조화 설계 의사결정
