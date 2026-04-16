# Graph-Based Structure 설계 가이드

## 1. 개념 요약

사용자, 조직, 브랜드, 리소스를 그래프로 연결해 복합 권한 경로를 계산한다.

## 2. 언제 선택하는가

- 다대다 조직 관계가 많을 때
- 판매자 조직과 브랜드, 카테고리 운영 관계를 함께 다뤄야 할 때

## 3. 핵심 설계 포인트

- 노드 타입과 엣지 의미를 명확히 정의한다.
- 탐색 깊이와 순환 방지 규칙을 둔다.
- 구조 이해용 시각화가 필수다.

## 4. 프론트엔드 적용 포인트

- 조직-브랜드-카테고리 관계를 그래프처럼 보여준다.
- 선택한 경로에 따라 허용 액션이 어떻게 달라지는지 비교한다.

- 이 workspace에서는 `frontend` 대시보드에서 해당 패턴을 선택하고 사례 메모를 기록하도록 구성한다.

## 5. 백엔드 적용 포인트

- 관계 그래프 저장소와 판정 서비스를 분리한다.
- 탐색 쿼리와 권한 계산 결과를 캐시 가능한 단위로 나눈다.

- 이 workspace에서는 `backend` API가 패턴 개요, 스터디 사례, 메모 저장용 엔드포인트를 제공한다.

## 6. 스터디 시나리오

카테고리 운영자이면서 특정 브랜드 담당 조직에 속한 사용자만 프로모션을 승인하도록 구성해 그래프 구조의 표현력을 살핀다.

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

- 노드/엣지 사전을 만든다.
- 순환 관계 처리 규칙을 만든다.
- 탐색 실패와 거부 사유를 분리한다.

## 9. 주의점

- 저장소 선택이 성능과 운영 난도를 좌우한다.
- 관계가 복잡할수록 디버깅 도구가 필요하다.

## 실행 메모

현재 프로젝트 루트에서 아래 명령으로 실행한다.

```bash
bun run dev:ac:graph-based:frontend
bun run dev:ac:graph-based:backend
```

## 10. 연결 포인트

- 상위 가이드: [Access Control Study Workspace](../README.md)
- 기준 질문: 누가 어떤 리소스에 언제 접근할 수 있는가
- 예시 도메인: 쇼핑몰 권한 설계
