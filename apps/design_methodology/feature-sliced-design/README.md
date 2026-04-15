# 기능 슬라이스 설계(FSD) 학습 가이드

## 목적
프론트엔드를 기능 단위로 계층화해 대형 UI 코드에서 책임 경계를 유지한다.

## 핵심 개념
- app, pages, processes, widgets, features, entities, shared로 레이어를 나눈다.
- 의존은 상위에서 하위 방향으로만 흐르도록 제한한다.
- 기능별로 독립 테스트와 배포 준비를 쉽게 한다.

## 프론트엔드 예시 구조
```text
frontend/
  src/app
  src/pages
  src/widgets
  src/features
  src/entities
  src/shared
```

## 백엔드 예시 구조
```text
backend/
  src/apis
  src/features
  src/entities
  src/common
```

## 간단한 스터디 시나리오
학습 기록 앱에서 `학습 기록 등록`, `연속 학습`, `리포트 생성` 기능을 각각 feature로 분리한다.  
각 기능은 공유 엔티티와 API 모듈을 소비해 화면에서 독립적으로 동작한다.

## 추천 기술 연결
- 프론트엔드: zustand, react-query, react-hook-form, react-error-boundary
- 백엔드: @nestjs/core, @nestjs/typeorm, class-validator, class-transformer
- 추가: qs(필터 파라미터), dayjs(날짜 집계)

