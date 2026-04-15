# Atomic Design 설계 가이드

## 1. 개념 요약

Atoms에서 Pages까지 UI를 단계적으로 조립해 설계 일관성을 높인다.

## 2. 언제 선택하는가

- 디자인 시스템과 페이지 조합 규칙을 동시에 잡아야 할 때
- 팀 내 공통 UI 용어가 필요할 때

## 3. 핵심 설계 포인트

- Atoms, Molecules, Organisms, Templates, Pages 단계를 유지한다.
- 상위 단계는 하위 단계 조합 결과다.
- 디자인 규칙과 코드 구조를 함께 가져간다.

## 4. 프론트엔드 적용 포인트

- 버튼, 배지, 가격 텍스트를 Atom으로 만든다.
- 상세 화면을 Molecule/Organism/Template로 끌어올린다.

- 이 workspace에서는 `frontend` 대시보드에서 해당 패턴을 선택하고 사례 메모를 기록하도록 구성한다.

## 5. 백엔드 적용 포인트

- 페이지 조합에 맞는 응답 단위를 제공한다.
- 디자인 시스템과 API 계약의 이름을 맞춘다.

- 이 workspace에서는 `backend` API가 패턴 개요, 스터디 사례, 메모 저장용 엔드포인트를 제공한다.

## 6. 스터디 시나리오

이커머스 상품 상세 화면을 Atom부터 Template까지 조립해 단계별 책임을 비교한다.

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

- 단계별 컴포넌트 정의를 만든다.
- 디자인 토큰과 variant 규칙을 문서화한다.
- Pages 계층에서만 화면 맥락을 조합한다.

## 9. 주의점

- 단계를 과도하게 엄격히 적용하면 생산성이 떨어질 수 있다.
- 도메인 컴포넌트와 디자인 시스템 컴포넌트를 혼동하지 않아야 한다.

## 10. 연결 포인트

- 상위 가이드: [Design Methodology Study Workspace](../README.md)
- 기준 질문: 시스템을 어떤 책임 경계로 나눌 것인가
- 예시 도메인: 구조화 설계 의사결정
