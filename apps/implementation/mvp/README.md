# MVP 설계 가이드

## 1. 개념 요약

Presenter가 View 업데이트와 Model 연계를 전담해 UI 로직을 분리한다.

## 2. 언제 선택하는가

- 뷰 구현자와 프레젠테이션 로직 구현자를 분리하고 싶을 때
- 테스트 가능한 표시 로직이 필요한 경우

## 3. 핵심 설계 포인트

- Presenter가 사용자 액션을 해석한다.
- View는 렌더링 인터페이스에 집중한다.
- Model 응답을 View용 형태로 매핑한다.

## 4. 프론트엔드 적용 포인트

- Presenter 또는 presenter hook이 문구와 표시 상태를 조합한다.
- View는 Presenter가 준 props만 사용한다.

- 이 workspace에서는 `frontend` 대시보드에서 해당 패턴을 선택하고 사례 메모를 기록하도록 구성한다.

## 5. 백엔드 적용 포인트

- 백엔드는 표현용 포맷보다 원시 도메인 데이터를 안정적으로 제공한다.
- 예외와 상태 코드를 일관되게 유지한다.

- 이 workspace에서는 `backend` API가 패턴 개요, 스터디 사례, 메모 저장용 엔드포인트를 제공한다.

## 6. 스터디 시나리오

학습 진행률 위젯에서 Presenter가 포인트와 상태 문구, 경고 메시지를 조합하도록 구성한다.

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

- View 인터페이스를 정의한다.
- Presenter 테스트 케이스를 먼저 정한다.
- 문자열/상태 매핑을 Presenter에 모은다.

## 9. 주의점

- Presenter가 View 세부 구현을 알기 시작하면 결합이 커진다.
- 작은 화면에는 오히려 구조 비용이 클 수 있다.

## 실행 메모

현재 프로젝트 루트에서 아래 명령으로 실행한다.

```bash
bun run dev:implementation:mvp:frontend
bun run dev:implementation:mvp:backend
```

## 10. 연결 포인트

- 상위 가이드: [Implementation Pattern Study Workspace](../README.md)
- 기준 질문: 코드 수준에서 관심사를 어떻게 나눌 것인가
- 예시 도메인: 코드 패턴 비교 학습
