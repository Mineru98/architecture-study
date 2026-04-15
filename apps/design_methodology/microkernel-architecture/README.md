# 마이크로커널 아키텍처 학습 가이드

## 목적
핵심 기능을 안정적으로 유지하고, 필요 기능을 플러그인처럼 동적으로 조립해 진화 속도를 높인다.

## 핵심 개념
- 코어 커널은 최소 기능(라이프사이클, 확장 포인트)만 담당한다.
- 플러그인은 독립적으로 배포·교체 가능한 기능 덩어리로 분리한다.
- 공통 규약을 통해 플러그인 간 충돌을 최소화한다.

## 프론트엔드 예시 구조
```text
frontend/
  src/core
  src/plugins
    payment-plugin
    notification-plugin
  src/plugin-runtime
```

## 백엔드 예시 구조
```text
backend/
  src/kernel
  src/plugins
    tenant-auth
    audit-log
  src/extension-point
```

## 간단한 스터디 시나리오
기능별 요금제가 있는 SaaS 대시보드를 만든다.  
기본 코어에는 조직 관리만 두고, 과금, 알림, 보고서 플러그인을 운영 환경 설정으로 켜고 끄는 형태로 실습한다.

## 추천 기술 연결
- 프론트엔드: styled-components, react, react-dom, es-toolkit
- 백엔드: @nestjs/core, @nestjs/config, class-validator, class-transformer
- 추가: path-to-regexp(플러그인 라우팅 규격), @nestjs/swagger

