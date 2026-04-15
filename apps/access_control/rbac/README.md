# RBAC 설계 가이드

## 1. 개념 요약

역할에 권한을 묶고 사용자를 역할에 매핑해 운영 메뉴와 API 경계를 단순하게 유지한다.

## 2. 언제 선택하는가

- 역할 집합이 비교적 안정적일 때
- 백오피스와 판매자 콘솔 메뉴를 명확히 분리해야 할 때

## 3. 핵심 설계 포인트

- User-Role-Permission 매핑을 명시적으로 유지한다.
- 역할 변경은 메뉴, API, 감사 로그 정책과 함께 관리한다.
- 리소스별 예외가 많아지면 ABAC 또는 ReBAC로 확장할 준비를 한다.

## 4. 프론트엔드 적용 포인트

- 역할별 대시보드 카드와 액션 버튼을 조건부로 노출한다.
- 선택한 역할에 따라 화면 예시와 허용 액션 목록을 비교한다.

- 이 workspace에서는 `frontend` 대시보드에서 해당 패턴을 선택하고 사례 메모를 기록하도록 구성한다.

## 5. 백엔드 적용 포인트

- JWT의 roles 클레임을 기반으로 Guard를 적용한다.
- 역할과 권한 매핑 테이블을 기준으로 엔드포인트 접근을 제한한다.

- 이 workspace에서는 `backend` API가 패턴 개요, 스터디 사례, 메모 저장용 엔드포인트를 제공한다.

## 6. 스터디 시나리오

판매자 콘솔에서는 상품 등록과 주문 확인만 허용하고, 운영자 콘솔에서는 환불 승인과 역할 관리 화면을 열어 RBAC의 장점을 확인한다.

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

- 역할 카탈로그를 먼저 고정한다.
- 권한 문자열을 리소스 단위로 정규화한다.
- 역할 변경 이력을 감사 로그에 남긴다.

## 9. 주의점

- 예외 규칙이 누적되면 역할 폭증이 발생한다.
- 리소스 소유권 판정은 역할만으로 해결하지 않는다.

## 실행 메모

현재 프로젝트 루트에서 아래 명령으로 실행한다.

```bash
bun run dev:access_control:rbac:frontend
bun run dev:access_control:rbac:backend
```

## 10. 연결 포인트

- 상위 가이드: [Access Control Study Workspace](../README.md)
- 기준 질문: 누가 어떤 리소스에 언제 접근할 수 있는가
- 예시 도메인: 쇼핑몰 권한 설계
