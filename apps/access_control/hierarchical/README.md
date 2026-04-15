# Hierarchical Structure 설계 가이드

## 1. 개념 요약

상위 역할이나 권한이 하위 권한을 포함하는 계층 구조로 운영 조직을 반영한다.

## 2. 언제 선택하는가

- 본사 운영 조직이 명확한 계층을 가질 때
- 상위 관리자 역할이 하위 역할 권한을 자연스럽게 포함할 때

## 3. 핵심 설계 포인트

- 상속 방향을 문서와 코드에서 동일하게 유지한다.
- 상위 권한과 직접 권한의 충돌 규칙을 정한다.
- 깊이가 깊어질수록 설명 비용이 커진다.

## 4. 프론트엔드 적용 포인트

- 역할 체인과 상속된 액션을 함께 보여준다.
- 조직도와 메뉴 구조를 맞춰 학습 효율을 높인다.

- 이 workspace에서는 `frontend` 대시보드에서 해당 패턴을 선택하고 사례 메모를 기록하도록 구성한다.

## 5. 백엔드 적용 포인트

- 상속된 권한 계산 헬퍼를 별도 서비스로 둔다.
- 권한 병합 결과를 토큰 또는 캐시에 반영한다.

- 이 workspace에서는 `backend` API가 패턴 개요, 스터디 사례, 메모 저장용 엔드포인트를 제공한다.

## 6. 스터디 시나리오

platform-admin > ops-manager > cs-agent 같은 역할 체인을 통해 상속된 주문 조회와 리뷰 관리 권한을 확인한다.

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

- 상속 트리를 시각 자료로 먼저 정리한다.
- 깊이 제한을 정한다.
- 충돌 시 우선순위를 문서화한다.

## 9. 주의점

- 깊은 계층은 이해 비용이 높다.
- 예외 권한이 많아지면 계층 구조가 오히려 불명확해진다.

## 실행 메모

현재 프로젝트 루트에서 아래 명령으로 실행한다.

```bash
bun run dev:access_control:hierarchical:frontend
bun run dev:access_control:hierarchical:backend
```

## 10. 연결 포인트

- 상위 가이드: [Access Control Study Workspace](../README.md)
- 기준 질문: 누가 어떤 리소스에 언제 접근할 수 있는가
- 예시 도메인: 쇼핑몰 권한 설계
