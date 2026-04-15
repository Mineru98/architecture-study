# Clean Architecture 설계 가이드

## 1. 개념 요약

핵심 규칙을 프레임워크 바깥에 두고 인터페이스/어댑터로 입력과 출력을 분리한다.

## 2. 언제 선택하는가

- 프레임워크 교체 비용을 낮추고 싶을 때
- 유즈케이스 단위 테스트와 의존 역전이 중요한 경우

## 3. 핵심 설계 포인트

- 엔티티와 유스케이스가 중심이다.
- 어댑터가 외부 시스템과의 연결을 담당한다.
- 의존 방향은 항상 안쪽을 향한다.

## 4. 프론트엔드 적용 포인트

- core/usecases와 adapters/ui를 분리한다.
- 뷰는 유스케이스 결과만 소비한다.

- 이 workspace에서는 `frontend` 대시보드에서 해당 패턴을 선택하고 사례 메모를 기록하도록 구성한다.

## 5. 백엔드 적용 포인트

- usecase와 adapter를 나누고, NestJS는 바깥쪽 인터페이스 계층으로 취급한다.
- 외부 API와 DB를 포트 구현으로 캡슐화한다.

- 이 workspace에서는 `backend` API가 패턴 개요, 스터디 사례, 메모 저장용 엔드포인트를 제공한다.

## 6. 스터디 시나리오

온라인 강의 수강권 결제 서비스를 만들고, 결제 유스케이스를 인프라와 분리해 교체 가능성을 체험한다.

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

- 핵심 유스케이스 목록을 먼저 정의한다.
- 입출력 포트 인터페이스를 고정한다.
- 프레임워크 종속 코드를 가장 바깥에 둔다.

## 9. 주의점

- 소규모 프로젝트에는 구조 비용이 커질 수 있다.
- 용어만 분리하고 데이터 흐름이 뒤섞이면 효과가 없다.

## 실행 메모

현재 프로젝트 루트에서 아래 명령으로 실행한다.

```bash
bun run dev:design_methodology:clean-architecture:frontend
bun run dev:design_methodology:clean-architecture:backend
```

## 10. 연결 포인트

- 상위 가이드: [Design Methodology Study Workspace](../README.md)
- 기준 질문: 시스템을 어떤 책임 경계로 나눌 것인가
- 예시 도메인: 구조화 설계 의사결정
