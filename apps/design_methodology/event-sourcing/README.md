# 이벤트 소싱 학습 가이드

## 목적
현재 상태보다 상태 변경 이벤트를 진실의 원천으로 보관해 추적성과 재구성 능력을 확보한다.

## 핵심 개념
- 엔티티는 이벤트 기록을 통해 재생성한다.
- 읽기 모델과 쓰기 모델을 구분하면 조회 성능과 기록 정합성을 함께 다루기 쉽다.
- 이벤트 버전 관리로 호환성 문제를 통제한다.

## 프론트엔드 예시 구조
```text
frontend/
  src/pages
  src/stream
    eventLog.ts
  src/reducers
  src/components/event-timeline
```

## 백엔드 예시 구조
```text
backend/
  src/orders/commands
  src/orders/events
  src/orders/projections
  src/orders/read-model
```

## 간단한 스터디 시나리오
포인트 적립/차감이 잦은 멤버십 시스템을 구현한다.  
모든 변경을 이벤트로 저장한 뒤, 회원의 현재 포인트는 읽기 모델에서 계산해 조회하고 감사 로그를 시각화한다.

## 추천 기술 연결
- 프론트엔드: react, qs, nanoid(이벤트 트랜잭션 ID 생성), dayjs(타임라인 처리)
- 백엔드: @nestjs/core, @nestjs/typeorm, class-transformer, class-validator, uuid
- 추가: rxjs(스트림 소비), @nestjs/swagger(이벤트 스키마 문서화)

