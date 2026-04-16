# Flat Structure 설계 가이드

## 1. 개념 요약

역할과 권한을 동일 레벨에서 독립적으로 정의해 초기 구성을 단순화한다.

## 2. 언제 선택하는가

- 권한 종류가 많지 않은 초기 서비스일 때
- 짧은 시간 안에 관리 화면을 세팅해야 할 때

## 3. 핵심 설계 포인트

- 각 역할이 필요한 권한을 직접 가진다.
- 중복 권한을 문서로 통제한다.
- 변경 영향도를 역할 단위로 바로 계산한다.

## 4. 프론트엔드 적용 포인트

- 단순한 역할 배열만으로 메뉴를 제어한다.
- 권한 비교 표를 통해 역할 간 차이를 빠르게 확인한다.

- 이 workspace에서는 `frontend` 대시보드에서 해당 패턴을 선택하고 사례 메모를 기록하도록 구성한다.

## 5. 백엔드 적용 포인트

- 상수 기반 권한 맵이나 단순 테이블로 시작한다.
- 권한 변경 시 전체 역할 정의를 함께 검토한다.

- 이 workspace에서는 `backend` API가 패턴 개요, 스터디 사례, 메모 저장용 엔드포인트를 제공한다.

## 6. 스터디 시나리오

소규모 쇼핑몰 운영도구에서 customer, seller, cs-agent, platform-admin 역할을 빠르게 정의하고 메뉴 접근을 분기한다.

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

- 역할 목록을 최소화한다.
- 공통 권한 중복 여부를 주기적으로 확인한다.
- 확장 시 상속 구조로 이동할 기준을 정한다.

## 9. 주의점

- 공통 권한 중복이 빠르게 쌓인다.
- 운영 조직이 커지면 유지 비용이 커진다.

## 실행 메모

현재 프로젝트 루트에서 아래 명령으로 실행한다.

```bash
bun run dev:ac:flat:frontend
bun run dev:ac:flat:backend
```

## 10. 연결 포인트

- 상위 가이드: [Access Control Study Workspace](../README.md)
- 기준 질문: 누가 어떤 리소스에 언제 접근할 수 있는가
- 예시 도메인: 쇼핑몰 권한 설계
