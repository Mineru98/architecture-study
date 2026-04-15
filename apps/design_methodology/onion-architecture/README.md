# 어니언 아키텍처 학습 가이드

## 목적
의존성 역전을 통해 도메인 계층을 중심에 두고 바깥쪽 계층의 기술 의존을 고립한다.

## 핵심 개념
- 중심은 엔티티와 비즈니스 규칙이다.
- 인터페이스(포트)로 바깥과 통신한다.
- 인프라와 UI는 도메인에 대해 알 필요가 없다.

## 프론트엔드 예시 구조
```text
frontend/
  src/domain
  src/application
  src/infrastructure
  src/ui
```

## 백엔드 예시 구조
```text
backend/
  src/domain
  src/application
  src/adapters
  src/infrastructure
```

## 간단한 스터디 시나리오
예약 금액 계산 엔진이 있는 숙박 서비스에서 할인 규칙을 도메인에 고정하고, 영속화는 adapter에서 처리한다.  
DB나 인증 라이브러리를 교체해도 계산 규칙은 영향 없이 유지되도록 실습한다.

## 추천 기술 연결
- 프론트엔드: react, qs, react-error-boundary
- 백엔드: @nestjs/core, @nestjs/swagger, @nestjs/passport, @nestjs/jwt
- 추가: class-validator, class-transformer

