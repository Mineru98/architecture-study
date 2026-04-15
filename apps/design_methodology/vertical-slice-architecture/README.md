# 버티컬 슬라이스 아키텍처 학습 가이드

## 목적
기능 단위(슬라이스) 기준으로 백엔드/프론트 코드를 묶어 각 기능의 독립적 변경 속도를 높인다.

## 핵심 개념
- 수직적인 기능 하나를 시작에서 끝까지 하나의 단위로 본다.
- 슬라이스 내에서 DTO, 핸들러, 뷰가 함께 관리된다.
- 슬라이스 경계를 통해 배치/테스트 범위를 제한한다.

## 프론트엔드 예시 구조
```text
frontend/
  src/features/order/create-order
  src/features/order/detail-order
  src/features/payment/process-payment
```

## 백엔드 예시 구조
```text
backend/
  src/order/commands
    create-order
  src/order/queries
  src/payment/commands
```

## 간단한 스터디 시나리오
커뮤니티 게시글 기능을 "게시글 작성", "댓글 등록", "좋아요" 슬라이스로 분리한다.  
각 슬라이스에서 프론트 컴포넌트, API 호출, 유효성 규칙, 백엔드 핸들러를 함께 구현하고 변경 범위를 비교한다.

## 추천 기술 연결
- 프론트엔드: react-query, react-hook-form, axios
- 백엔드: @nestjs/core, @nestjs/config, class-validator
- 추가: path-to-regexp(리소스 경로 규격), @nestjs/swagger

