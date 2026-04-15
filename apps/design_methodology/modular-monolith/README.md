# Modular Monolith 설계 가이드

## 1. 개념 요약

단일 배포 단위를 유지하면서 도메인별 모듈 경계를 강하게 세운다.

## 2. 언제 선택하는가

- 마이크로서비스까지는 이르지만 기능 분리가 필요한 경우
- 팀 단위 변경 충돌을 줄이고 싶은 경우

## 3. 핵심 설계 포인트

- 하나의 런타임 안에서 모듈 경계를 엄격히 둔다.
- 모듈 간 통신은 공개 API로 제한한다.
- 공유 커널은 최소 범위로 유지한다.

## 4. 프론트엔드 적용 포인트

- 모듈별 화면과 공유 컴포넌트를 분리한다.
- 도메인별 상태와 API 모듈을 섞지 않는다.

- 이 workspace에서는 `frontend` 대시보드에서 해당 패턴을 선택하고 사례 메모를 기록하도록 구성한다.

## 5. 백엔드 적용 포인트

- modules/* 와 shared-kernel 구조를 유지한다.
- 모듈 내부 구현을 외부에서 직접 참조하지 않게 제한한다.

- 이 workspace에서는 `backend` API가 패턴 개요, 스터디 사례, 메모 저장용 엔드포인트를 제공한다.

## 6. 스터디 시나리오

중고거래 플랫폼에서 주문, 결제, 알림 모듈을 단일 NestJS 앱 안에서 분리해 팀 경계와 배포 단순성을 함께 본다.

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

- 모듈 책임 범위를 먼저 정한다.
- 퍼블릭 인터페이스를 명시한다.
- 공유 커널 남용을 막는다.

## 9. 주의점

- 모듈 경계 규칙이 약하면 결국 큰 모놀리스가 된다.
- 공유 유틸이 늘어나면 결합도가 높아진다.

## 실행 메모

현재 프로젝트 루트에서 아래 명령으로 실행한다.

```bash
bun run dev:design_methodology:modular-monolith:frontend
bun run dev:design_methodology:modular-monolith:backend
```

## 10. 연결 포인트

- 상위 가이드: [Design Methodology Study Workspace](../README.md)
- 기준 질문: 시스템을 어떤 책임 경계로 나눌 것인가
- 예시 도메인: 구조화 설계 의사결정
