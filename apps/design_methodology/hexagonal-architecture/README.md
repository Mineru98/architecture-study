# 헥사고날 아키텍처 학습 가이드

## 목적
도메인과 외부 시스템의 결합도를 낮추고, 포트/어댑터로 외부 연동을 교체 가능한 모듈로 만든다.

## 핵심 개념
- 내부는 도메인 포트(입출력)만 노출한다.
- DB, 외부 API, 메시지 큐는 어댑터로만 연결한다.
- 비즈니스 로직은 기술 스택과 무관하게 테스트 가능한 상태를 유지한다.

## 프론트엔드 예시 구조
```text
frontend/
  src/app
    ports
    adapters
    views
    state
```

## 백엔드 예시 구조
```text
backend/
  src/domain/ports
  src/domain/services
  src/adapters/in
  src/adapters/out
  src/config
```

## 간단한 스터디 시나리오
주차장 통합 조회 서비스를 만든다.  
센서 데이터 수집기, 외부 결제 API, 내부 알림 서버를 각각 아웃바운드 어댑터로 분리해 센서 벤더만 교체해도 도메인을 변경하지 않도록 한다.

## 추천 기술 연결
- 프론트엔드: react-query, axios, react-error-boundary
- 백엔드: @nestjs/core, @nestjs/typeorm, @nestjs/config, rxjs
- 추가: @nestjs/throttler, class-validator

