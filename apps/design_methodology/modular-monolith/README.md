# 모듈러 모놀리스 학습 가이드

## 목적
단일 배포 단위의 단순성을 유지하면서도 도메인별 모듈 분리를 통해 대규모 확장을 준비한다.

## 핵심 개념
- 하나의 실행 단위 안에서 팀/도메인별 모듈을 강하게 경계한다.
- 모듈 간 통신은 명확한 퍼블릭 인터페이스로 제한한다.
- 기능 간 의존도는 최소화하고 릴리즈 안정성을 높인다.

## 프론트엔드 예시 구조
```text
frontend/
  src/modules
    auth
    catalog
    order
  src/shared
```

## 백엔드 예시 구조
```text
backend/
  src/modules
    user
    product
    order
  src/shared-kernel
```

## 간단한 스터디 시나리오
중고거래 플랫폼을 단일 NestJS 앱으로 구현한다.  
주문, 결제, 알림 모듈을 분리해 각 모듈을 독립 배포 없이도 변경 충돌을 줄이고 팀 단위로 작업한다.

## 추천 기술 연결
- 프론트엔드: react-router, styled-components, react-query
- 백엔드: @nestjs/core, @nestjs/typeorm, @nestjs/config
- 추가: @nestjs/jwt, @nestjs/passport

