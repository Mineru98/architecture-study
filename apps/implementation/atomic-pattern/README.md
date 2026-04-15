# Atomic Pattern 설계 가이드

## 1. 개념 요약

작은 상태 조각과 조합 규칙으로 화면 상태를 세밀하게 분리한다.

## 2. 언제 선택하는가

- 서로 다른 위젯이 일부 상태만 공유할 때
- 세밀한 상태 조합과 재사용이 중요한 경우

## 3. 핵심 설계 포인트

- 상태를 작은 단위로 쪼갠다.
- 상태 조합 규칙을 분명히 한다.
- 읽기와 쓰기 경로를 작게 유지한다.

## 4. 프론트엔드 적용 포인트

- 필터, 선택, 편집 상태를 독립 조각으로 관리한다.
- 상위 화면은 필요한 조각만 조합해 사용한다.

- 이 workspace에서는 `frontend` 대시보드에서 해당 패턴을 선택하고 사례 메모를 기록하도록 구성한다.

## 5. 백엔드 적용 포인트

- 상태 조각별로 독립 갱신 가능한 응답을 제공한다.
- 부분 갱신 API와 전체 조회 API를 구분한다.

- 이 workspace에서는 `backend` API가 패턴 개요, 스터디 사례, 메모 저장용 엔드포인트를 제공한다.

## 6. 스터디 시나리오

리뷰 보드 화면에서 선택된 태그, 정렬, 편집 대상, 모달 상태를 작은 단위로 분리해 조합한다.

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

- 상태 조각 기준을 정한다.
- 조합 규칙과 충돌 규칙을 문서화한다.
- 필요 없는 전역 상태를 줄인다.

## 9. 주의점

- 상태 조각이 너무 많으면 추적이 어려워진다.
- 조합 의존이 복잡하면 오히려 이해하기 힘들다.

## 실행 메모

현재 프로젝트 루트에서 아래 명령으로 실행한다.

```bash
bun run dev:implementation:atomic-pattern:frontend
bun run dev:implementation:atomic-pattern:backend
```

## 10. 연결 포인트

- 상위 가이드: [Implementation Pattern Study Workspace](../README.md)
- 기준 질문: 코드 수준에서 관심사를 어떻게 나눌 것인가
- 예시 도메인: 코드 패턴 비교 학습
