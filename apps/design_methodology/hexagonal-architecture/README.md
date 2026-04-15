# Hexagonal Architecture 설계 가이드

## 1. 개념 요약

도메인을 중심에 두고 인바운드/아웃바운드 포트와 어댑터로 외부 시스템을 연결한다.

## 2. 언제 선택하는가

- 외부 API, 메시지, 저장소가 자주 바뀔 수 있을 때
- 도메인을 기술 세부 구현과 분리하고 싶을 때

## 3. 핵심 설계 포인트

- 도메인은 포트만 안다.
- 어댑터는 입출력 방향을 기준으로 나눈다.
- 외부 연동 교체 비용을 줄인다.

## 4. 프론트엔드 적용 포인트

- view, state, adapters를 분리해 API 교체 영향을 줄인다.
- 에러 바운더리와 상태 캐시를 어댑터 바깥에 두지 않는다.

- 이 workspace에서는 `frontend` 대시보드에서 해당 패턴을 선택하고 사례 메모를 기록하도록 구성한다.

## 5. 백엔드 적용 포인트

- adapters/in, adapters/out 구조를 분리한다.
- 도메인 서비스는 포트를 통해서만 저장소와 외부 API를 호출한다.

- 이 workspace에서는 `backend` API가 패턴 개요, 스터디 사례, 메모 저장용 엔드포인트를 제공한다.

## 6. 스터디 시나리오

주차장 통합 조회 서비스에서 센서 벤더와 결제 API를 교체해도 도메인 로직이 유지되도록 설계한다.

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

- 인바운드/아웃바운드 포트를 목록화한다.
- 어댑터 책임을 기술 축으로 나눈다.
- 포트 테스트 더블을 준비한다.

## 9. 주의점

- 포트가 과도하게 잘게 쪼개지면 복잡해진다.
- 도메인 바깥 규칙이 내부로 스며들지 않도록 주의해야 한다.

## 10. 연결 포인트

- 상위 가이드: [Design Methodology Study Workspace](../README.md)
- 기준 질문: 시스템을 어떤 책임 경계로 나눌 것인가
- 예시 도메인: 구조화 설계 의사결정
