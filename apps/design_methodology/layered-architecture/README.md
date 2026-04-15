# Layered Architecture 설계 가이드

## 1. 개념 요약

표현, 애플리케이션, 도메인, 인프라 계층을 분리해 변경 전파를 줄인다.

## 2. 언제 선택하는가

- 도메인 복잡도가 높지 않고 계층적 설명이 필요한 팀일 때
- CRUD 중심 기능을 안정적으로 분리하고 싶을 때

## 3. 핵심 설계 포인트

- 상위 계층이 하위 계층만 의존한다.
- 계층별 책임을 명확하게 문서화한다.
- 컨트롤러와 리포지토리 사이에 서비스 계층을 고정한다.

## 4. 프론트엔드 적용 포인트

- pages -> widgets -> services 흐름으로 책임을 나눈다.
- 화면 로직과 API 호출 로직을 분리한다.

- 이 workspace에서는 `frontend` 대시보드에서 해당 패턴을 선택하고 사례 메모를 기록하도록 구성한다.

## 5. 백엔드 적용 포인트

- controller -> service -> repository -> infrastructure 구조를 유지한다.
- 계층 경계를 넘는 유틸 사용을 제한한다.

- 이 workspace에서는 `backend` API가 패턴 개요, 스터디 사례, 메모 저장용 엔드포인트를 제공한다.

## 6. 스터디 시나리오

교육 플랫폼에서 회원 조회, 수강 등록, 수료증 발급 기능을 계층별로 나눠 변경 영향 범위를 학습한다.

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

- 계층 정의 문서를 먼저 작성한다.
- 하위 계층 인터페이스를 고정한다.
- 직접 의존 금지 규칙을 코드 리뷰 체크포인트로 둔다.

## 9. 주의점

- 도메인이 커지면 서비스 계층이 비대해질 수 있다.
- 단순한 계층 분리는 기능 응집도를 떨어뜨릴 수 있다.

## 실행 메모

현재 프로젝트 루트에서 아래 명령으로 실행한다.

```bash
bun run dev:design_methodology:layered-architecture:frontend
bun run dev:design_methodology:layered-architecture:backend
```

## 10. 연결 포인트

- 상위 가이드: [Design Methodology Study Workspace](../README.md)
- 기준 질문: 시스템을 어떤 책임 경계로 나눌 것인가
- 예시 도메인: 구조화 설계 의사결정
