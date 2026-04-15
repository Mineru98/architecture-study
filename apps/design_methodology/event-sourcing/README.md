# Event Sourcing 설계 가이드

## 1. 개념 요약

현재 상태 대신 상태 변경 이벤트를 진실의 원천으로 저장한다.

## 2. 언제 선택하는가

- 감사 추적과 상태 재구성이 중요한 경우
- 변경 이력을 직접 분석해야 하는 도메인일 때

## 3. 핵심 설계 포인트

- 이벤트 스키마와 버전 전략을 먼저 정한다.
- 현재 상태는 이벤트 재생이나 프로젝션으로 구성한다.
- 읽기 모델과 쓰기 모델을 분리하는 편이 안전하다.

## 4. 프론트엔드 적용 포인트

- 타임라인 UI와 현재 상태 비교 뷰를 제공한다.
- 이벤트 단위의 설명 텍스트를 사용자 언어로 번역한다.

- 이 workspace에서는 `frontend` 대시보드에서 해당 패턴을 선택하고 사례 메모를 기록하도록 구성한다.

## 5. 백엔드 적용 포인트

- append-only 이벤트 저장소와 projection 업데이트를 분리한다.
- 리플레이와 스냅샷 전략을 함께 설계한다.

- 이 workspace에서는 `backend` API가 패턴 개요, 스터디 사례, 메모 저장용 엔드포인트를 제공한다.

## 6. 스터디 시나리오

멤버십 포인트 적립/차감 시스템에서 이벤트 로그를 기반으로 현재 포인트와 감사 타임라인을 함께 보여준다.

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

- 이벤트 이름 규칙을 만든다.
- 버전 업 전략과 스냅샷 기준을 문서화한다.
- 프로젝션 재구성 절차를 정리한다.

## 9. 주의점

- 이벤트 설계가 부정확하면 이후 수정 비용이 크다.
- 읽기 모델 지연을 사용자가 이해하도록 안내해야 한다.

## 실행 메모

현재 프로젝트 루트에서 아래 명령으로 실행한다.

```bash
bun run dev:design_methodology:event-sourcing:frontend
bun run dev:design_methodology:event-sourcing:backend
```

## 10. 연결 포인트

- 상위 가이드: [Design Methodology Study Workspace](../README.md)
- 기준 질문: 시스템을 어떤 책임 경계로 나눌 것인가
- 예시 도메인: 구조화 설계 의사결정
