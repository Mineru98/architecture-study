# MVVM 설계 가이드

## 1. 개념 요약

ViewModel을 통해 View 상태와 입력 이벤트를 테스트 가능한 상태 계산으로 분리한다.

## 2. 언제 선택하는가

- 폼, 필터, 단계형 UI처럼 상태 전이가 많은 경우
- 컴포넌트 내부 로직을 얇게 만들고 싶은 경우

## 3. 핵심 설계 포인트

- View는 입력과 출력만 다룬다.
- ViewModel이 파생 상태와 이벤트를 계산한다.
- Model은 데이터 소스로 유지한다.

## 4. 프론트엔드 적용 포인트

- useStudyPlanViewModel 같은 훅으로 상태를 캡슐화한다.
- 유효성, 에러, 단계 이동 규칙을 ViewModel에 모은다.

- 이 workspace에서는 `frontend` 대시보드에서 해당 패턴을 선택하고 사례 메모를 기록하도록 구성한다.

## 5. 백엔드 적용 포인트

- 백엔드는 화면에 필요한 상태 계산 결과를 제공하되, 최종 표현 가공은 ViewModel이 담당한다.
- 입력 단위 API를 명확히 분리한다.

- 이 workspace에서는 `backend` API가 패턴 개요, 스터디 사례, 메모 저장용 엔드포인트를 제공한다.

## 6. 스터디 시나리오

일정 등록 마법사에서 단계 전이와 파생 상태를 ViewModel 훅으로 구현해 화면 책임을 줄인다.

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

- ViewModel 인터페이스를 먼저 정의한다.
- 파생 상태와 원본 상태를 구분한다.
- View는 ViewModel만 소비하게 한다.

## 9. 주의점

- ViewModel이 너무 커지면 새로운 God object가 된다.
- 화면별로 재사용을 과하게 시도하면 복잡해진다.

## 실행 메모

현재 프로젝트 루트에서 아래 명령으로 실행한다.

```bash
bun run dev:implementation:mvvm:frontend
bun run dev:implementation:mvvm:backend
```

## 10. 연결 포인트

- 상위 가이드: [Implementation Pattern Study Workspace](../README.md)
- 기준 질문: 코드 수준에서 관심사를 어떻게 나눌 것인가
- 예시 도메인: 코드 패턴 비교 학습
