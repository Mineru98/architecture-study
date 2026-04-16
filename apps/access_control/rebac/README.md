# ReBAC 설계 가이드

## 1. 개념 요약

사용자와 리소스의 관계를 중심으로 접근 가능 범위를 계산한다.

## 2. 언제 선택하는가

- 판매자 조직과 브랜드 관계가 얽혀 있을 때
- 리소스 소유권과 협업 관계가 권한 판정의 핵심일 때

## 3. 핵심 설계 포인트

- 관계 타입을 명확하게 이름 붙인다.
- 관계 탐색 깊이와 캐시 전략을 정한다.
- 관계 그래프와 권한 판정을 분리해 유지한다.

## 4. 프론트엔드 적용 포인트

- 현재 사용자가 어떤 관계로 리소스에 연결되어 있는지 시각화한다.
- 관계 유형에 따라 메뉴와 상세 액션을 나눈다.

- 이 workspace에서는 `frontend` 대시보드에서 해당 패턴을 선택하고 사례 메모를 기록하도록 구성한다.

## 5. 백엔드 적용 포인트

- 관계 조회 API와 권한 판정 서비스를 분리한다.
- 관계 확장 탐색 시 깊이 제한과 조회 순서를 고정한다.

- 이 workspace에서는 `backend` API가 패턴 개요, 스터디 사례, 메모 저장용 엔드포인트를 제공한다.

## 6. 스터디 시나리오

브랜드 운영자, 판매자 직원, 구매자 관계를 동시에 비교하면서 주문 조회와 리뷰 답변 권한이 어떻게 달라지는지 확인한다.

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

- 핵심 관계 타입 목록을 고정한다.
- 관계 탐색 실패와 권한 거부를 구분한다.
- 그래프 조회 비용을 측정 가능한 지표로 남긴다.

## 9. 주의점

- 관계 모델이 느슨하면 예외 규칙이 숨어든다.
- 그래프 탐색은 성능 병목이 되기 쉽다.

## 실행 메모

현재 프로젝트 루트에서 아래 명령으로 실행한다.

```bash
bun run dev:ac:rebac:frontend
bun run dev:ac:rebac:backend
```

## 10. 연결 포인트

- 상위 가이드: [Access Control Study Workspace](../README.md)
- 기준 질문: 누가 어떤 리소스에 언제 접근할 수 있는가
- 예시 도메인: 쇼핑몰 권한 설계
