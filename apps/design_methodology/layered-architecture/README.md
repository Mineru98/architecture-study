# 레이어드 아키텍처 학습 가이드

## 목적
요구사항을 표현 계층, 애플리케이션 계층, 도메인 계층, 인프라 계층으로 분리해 변경 전파를 줄이고, 유지보수 흐름을 단순화한다.

## 핵심 개념
- 계층은 상위 계층이 하위 계층을 호출만 하고 인프라를 직접 의존하지 않는다.
- 의존 방향이 단방향으로 고정되어 테스트가 쉬워진다.
- 계층 사이 인터페이스를 기준으로 구현을 교체할 수 있다.

## 프론트엔드 예시 구조
```text
frontend/
  src/pages
  src/widgets
  src/services
  src/features
  src/lib/api
  src/types
```

## 백엔드 예시 구조
```text
backend/
  src/controllers
  src/services
  src/repositories
  src/entities
  src/infrastructure
```

## 간단한 스터디 시나리오
관리자 전용 대시보드가 있는 교육 플랫폼에서 회원 조회, 수강 등록, 수료증 발급 API를 구현한다.  
프론트는 페이지 -> 위젯 -> 서비스 호출 계층으로 분리하고, 백엔드는 컨트롤러-서비스-리포지토리로 분리해 책임이 엉키지 않도록 구성한다.

## 추천 기술 연결
- 프론트엔드: react, react-dom, react-router, axios, @tanstack/react-query
- 백엔드: @nestjs/core, @nestjs/platform-express, @nestjs/typeorm, class-validator
- 추가: react-hook-form(폼 바인딩), class-transformer(DTO 변환)

