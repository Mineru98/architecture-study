# Delegation Structure 설계 가이드

## 1. 개념 요약

기존 권한 일부를 다른 사용자에게 범위와 기간을 제한해 위임한다.

## 2. 언제 선택하는가

- 휴가나 대행 처리처럼 임시 권한 이양이 잦을 때
- 감사 로그와 승인 이력이 중요한 운영 조직일 때

## 3. 핵심 설계 포인트

- 위임자, 수임자, 범위, 기간을 반드시 분리한다.
- 민감 권한은 재위임 금지 규칙을 둔다.
- 실제 사용 로그와 위임 로그를 연결한다.

## 4. 프론트엔드 적용 포인트

- 위임 생성 폼과 위임 이력 목록을 제공한다.
- 현재 사용 중인 위임 권한과 만료 시간을 강조한다.

- 이 workspace에서는 `frontend` 대시보드에서 해당 패턴을 선택하고 사례 메모를 기록하도록 구성한다.

## 5. 백엔드 적용 포인트

- 원권한과 위임 범위를 함께 검증한다.
- 만료된 위임은 자동 무효화하고 로그를 남긴다.

- 이 workspace에서는 `backend` API가 패턴 개요, 스터디 사례, 메모 저장용 엔드포인트를 제공한다.

## 6. 스터디 시나리오

판매자 대표가 일정 기간 동안 staff에게 주문 확인 권한을 넘기고, 고객센터 팀장이 특정 환불 승인 권한을 하루 동안 위임한다.

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

- 위임 가능한 액션 목록을 정한다.
- 만료와 철회 정책을 만든다.
- 사용 이력을 감사 레코드와 연결한다.

## 9. 주의점

- 감사 로그가 없으면 사고 원인 추적이 어렵다.
- 민감 권한은 위임 범위 제한이 없으면 위험하다.

## 실행 메모

현재 프로젝트 루트에서 아래 명령으로 실행한다.

```bash
bun run dev:access_control:delegation:frontend
bun run dev:access_control:delegation:backend
```

## 10. 연결 포인트

- 상위 가이드: [Access Control Study Workspace](../README.md)
- 기준 질문: 누가 어떤 리소스에 언제 접근할 수 있는가
- 예시 도메인: 쇼핑몰 권한 설계
