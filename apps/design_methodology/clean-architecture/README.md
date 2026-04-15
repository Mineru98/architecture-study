# 클린 아키텍처 학습 가이드

## 목적
외부 프레임워크에 대한 의존을 내부 핵심 규칙에서 완전히 분리해, 변경 주체가 분명한 구조로 운영한다.

## 핵심 개념
- 핵심은 엔티티와 유즈케이스 유닛이 중심이다.
- 인터페이스/어댑터를 통해 입력/출력을 분리한다.
- 바깥 계층이 안쪽 계층을 의존하지 않도록 규칙을 고정한다.

## 프론트엔드 예시 구조
```text
frontend/
  src/core/entities
  src/core/usecases
  src/adapters/api
  src/adapters/ui
  src/framework/components
```

## 백엔드 예시 구조
```text
backend/
  src/domain
  src/usecase
  src/interface
  src/adapter
  src/infra
```

## 간단한 스터디 시나리오
온라인 강의 수강권 결제 서비스를 만든다.  
결제 유스케이스는 DB, 결제 게이트웨이, API 프레임워크와 독립적으로 동작하고, 각 인프라는 어댑터로 주입해 교체 가능하게 구성한다.

## 추천 기술 연결
- 프론트엔드: react-query, axios, es-toolkit
- 백엔드: @nestjs/core, @nestjs/swagger, @nestjs/passport, @nestjs/jwt
- 추가: @nestjs/throttler(요청 제한), qs(요청 파라미터 정규화)

