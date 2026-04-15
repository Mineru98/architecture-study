# Microkernel Architecture 설계 가이드

## 1. 개념 요약

핵심 기능은 커널에 두고 확장 기능은 플러그인처럼 붙인다.

## 2. 언제 선택하는가

- 테넌트별로 기능 조합이 달라질 때
- 코어 기능과 실험 기능을 분리해야 할 때

## 3. 핵심 설계 포인트

- 코어 커널은 최소 책임만 가진다.
- 플러그인은 규약 기반으로 로드한다.
- 플러그인 충돌과 버전 호환을 관리해야 한다.

## 4. 프론트엔드 적용 포인트

- 플러그인 카드와 활성화 상태를 대시보드에서 제어한다.
- 라우팅 규칙과 UI 슬롯을 플러그인 메타데이터로 다룬다.

- 이 workspace에서는 `frontend` 대시보드에서 해당 패턴을 선택하고 사례 메모를 기록하도록 구성한다.

## 5. 백엔드 적용 포인트

- 확장 포인트 인터페이스를 정의하고 플러그인을 주입한다.
- 설정 기반 활성화와 격리 실패 전략을 제공한다.

- 이 workspace에서는 `backend` API가 패턴 개요, 스터디 사례, 메모 저장용 엔드포인트를 제공한다.

## 6. 스터디 시나리오

조직 관리 SaaS에서 과금, 알림, 보고서 기능을 플러그인처럼 켜고 끄며 코어와 확장 기능의 경계를 학습한다.

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

- 확장 포인트와 플러그인 계약을 정의한다.
- 비활성 플러그인 시나리오를 준비한다.
- 플러그인 오류가 코어를 깨지 않게 보호한다.

## 9. 주의점

- 플러그인 규격이 약하면 코어가 금방 오염된다.
- 버전 호환성 검증이 없으면 운영이 어렵다.

## 10. 연결 포인트

- 상위 가이드: [Design Methodology Study Workspace](../README.md)
- 기준 질문: 시스템을 어떤 책임 경계로 나눌 것인가
- 예시 도메인: 구조화 설계 의사결정
