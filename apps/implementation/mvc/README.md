# MVC 설계 가이드

## 1. 개념 요약

Model, View, Controller를 분리해 요청 처리 흐름을 이해하기 쉽게 만든다.

## 2. 언제 선택하는가

- CRUD 중심 화면을 빠르게 구현할 때
- 교육용 샘플로 흐름을 명확히 보여주고 싶을 때

## 3. 핵심 설계 포인트

- Controller가 입력 흐름을 제어한다.
- View는 렌더링에 집중한다.
- Model은 데이터와 규칙을 담당한다.

## 4. 프론트엔드 적용 포인트

- View 컴포넌트는 최소 책임만 가진다.
- 컨트롤 흐름은 훅 또는 이벤트 핸들러 계층으로 모은다.

- 이 workspace에서는 `frontend` 대시보드에서 해당 패턴을 선택하고 사례 메모를 기록하도록 구성한다.

## 5. 백엔드 적용 포인트

- NestJS Controller와 Service 경계를 명확히 둔다.
- DTO 검증과 비즈니스 로직을 분리한다.

- 이 workspace에서는 `backend` API가 패턴 개요, 스터디 사례, 메모 저장용 엔드포인트를 제공한다.

## 6. 스터디 시나리오

학습 카드 CRUD에서 등록/조회 흐름을 MVC로 구현해 화면, 흐름 제어, 모델 책임을 나눈다.

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

- 입력 처리 위치를 정한다.
- View가 도메인 규칙을 직접 다루지 않게 한다.
- Controller-Model 계약을 명시한다.

## 9. 주의점

- Controller가 커지면 곧 비대해진다.
- View에서 비즈니스 로직이 새어나오기 쉽다.

## 10. 연결 포인트

- 상위 가이드: [Implementation Pattern Study Workspace](../README.md)
- 기준 질문: 코드 수준에서 관심사를 어떻게 나눌 것인가
- 예시 도메인: 코드 패턴 비교 학습
