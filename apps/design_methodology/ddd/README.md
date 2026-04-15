# DDD(도메인 주도 설계) 학습 가이드

## 목적
비즈니스 규칙을 소프트웨어 중심이 아닌 도메인 언어 중심으로 모델링해, 기능 확장 시 변경 비용을 줄인다.

## 핵심 개념
- 유비쿼트된 언어를 중심으로 엔티티, 밸류 오브젝트, 애그리게이트 루트를 정의한다.
- 도메인 이벤트로 핵심 비즈니스 상태 변화를 표현한다.
- 바운디드 컨텍스트로 모듈의 책임 범위를 분리한다.

## 프론트엔드 예시 구조
```text
frontend/
  src/domain
    reservation/
    inventory/
  src/application
    use-cases
  src/ui
  src/shared
```

## 백엔드 예시 구조
```text
backend/
  src/order/domain
  src/order/application
  src/order/infrastructure
  src/order/interfaces
  src/shared
```

## 간단한 스터디 시나리오
공유 킥보드 예약 시스템을 만든다. 예약, 결제, 반납 규칙을 도메인 서비스로 표현하고, "예약 시작/연장/완료" 상태 전이를 도메인 이벤트로 추적한다.

## 추천 기술 연결
- 프론트엔드: zustand(도메인 상태 반영), react-query(쿼리 캐시), dayjs(시간 규칙)
- 백엔드: @nestjs/typeorm, class-transformer, class-validator, uuid, @nestjs/config
- 추가: rxjs(도메인 이벤트 스트림 구독)

