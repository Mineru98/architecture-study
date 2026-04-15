# Feature-Sliced Design 설계 가이드

## 1. 개념 요약

app, pages, widgets, features, entities, shared 레이어로 프론트엔드 책임 경계를 유지한다.

## 2. 언제 선택하는가

- 프론트엔드 규모가 커지고 기능 단위 변경이 잦을 때
- 레이어별 의존 규칙을 명시적으로 관리하고 싶을 때

## 3. 핵심 설계 포인트

- 의존은 상위에서 하위 방향으로만 흐른다.
- features와 entities를 섞지 않는다.
- shared는 최소 공통 요소만 둔다.

## 4. 프론트엔드 적용 포인트

- pages, widgets, features, entities, shared 구조를 지킨다.
- 기능별 API, model, ui를 한 레이어 안에서 관리한다.

- 이 workspace에서는 `frontend` 대시보드에서 해당 패턴을 선택하고 사례 메모를 기록하도록 구성한다.

## 5. 백엔드 적용 포인트

- 백엔드는 프론트 기능 경계와 맞는 응답을 제공한다.
- 기능 단위의 API 계약을 유지한다.

- 이 workspace에서는 `backend` API가 패턴 개요, 스터디 사례, 메모 저장용 엔드포인트를 제공한다.

## 6. 스터디 시나리오

학습 기록 앱에서 등록, 연속 학습, 리포트 생성 기능을 feature 단위로 나누고 공용 엔티티를 재사용한다.

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

- 레이어 규칙을 먼저 합의한다.
- entities와 features 경계를 리뷰 기준으로 삼는다.
- 공유 모듈 남용을 막는다.

## 9. 주의점

- 레이어 의미를 모르고 폴더만 따라 하면 실패한다.
- shared가 만능 폴더가 되지 않도록 제한해야 한다.

## 실행 메모

현재 프로젝트 루트에서 아래 명령으로 실행한다.

```bash
bun run dev:design_methodology:feature-sliced-design:frontend
bun run dev:design_methodology:feature-sliced-design:backend
```

## 10. 연결 포인트

- 상위 가이드: [Design Methodology Study Workspace](../README.md)
- 기준 질문: 시스템을 어떤 책임 경계로 나눌 것인가
- 예시 도메인: 구조화 설계 의사결정
