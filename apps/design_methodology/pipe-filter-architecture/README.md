# Pipe-Filter Architecture 설계 가이드

## 1. 개념 요약

여러 필터가 입력을 순차 변환하며 처리 흐름을 명확히 만든다.

## 2. 언제 선택하는가

- 정형화된 변환 단계가 연속적으로 필요할 때
- 필터 교체와 삽입이 자주 일어나는 데이터 처리일 때

## 3. 핵심 설계 포인트

- 각 필터의 입출력 계약을 고정한다.
- 파이프라인 상태와 중간 산출물을 추적할 수 있어야 한다.
- 필터는 단일 책임을 가져야 한다.

## 4. 프론트엔드 적용 포인트

- 파이프라인 단계별 결과를 시각적으로 비교한다.
- 폼 입력을 필터 체인에 넣어 중간 결과를 확인하게 한다.

- 이 workspace에서는 `frontend` 대시보드에서 해당 패턴을 선택하고 사례 메모를 기록하도록 구성한다.

## 5. 백엔드 적용 포인트

- validate -> enrich -> transform -> score 같은 순서로 필터를 구성한다.
- 필터 실패 위치와 사유를 명확히 반환한다.

- 이 workspace에서는 `backend` API가 패턴 개요, 스터디 사례, 메모 저장용 엔드포인트를 제공한다.

## 6. 스터디 시나리오

스팸 점수 계산 파이프라인에서 요청 파싱, 규칙 필터, 이상치 필터, 점수 계산을 단계별로 보여준다.

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

- 필터 순서를 정의한다.
- 각 단계의 입출력 타입을 정한다.
- 중간 산출물 로깅 규칙을 만든다.

## 9. 주의점

- 필터가 상태를 공유하면 파이프라인 추론이 어려워진다.
- 예외 처리 규칙이 없으면 실패 원인을 찾기 어렵다.

## 10. 연결 포인트

- 상위 가이드: [Design Methodology Study Workspace](../README.md)
- 기준 질문: 시스템을 어떤 책임 경계로 나눌 것인가
- 예시 도메인: 구조화 설계 의사결정
