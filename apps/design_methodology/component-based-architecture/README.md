# 컴포넌트 기반 아키텍처 학습 가이드

## 목적
UI를 재사용 가능한 컴포넌트 단위로 구성해 조립식 개발 속도를 높인다.

## 핵심 개념
- 각 컴포넌트는 단일 책임을 가진다.
- 상위 컴포넌트는 단방향 데이터 흐름으로 조합한다.
- 공통 컴포넌트는 도메인 의존성을 갖지 않는다.

## 프론트엔드 예시 구조
```text
frontend/
  src/components
    atoms
    molecules
    organisms
  src/stories
  src/hooks
```

## 백엔드 예시 구조
```text
backend/
  src/modules
    api
  src/shared
    response
    errors
```

## 간단한 스터디 시나리오
예약 카드 뷰어를 만든다.  
카드, 버튼, 입력, 모달을 원자 단위로 만들고, 이들을 페이지에서 조립해 예약 상세 화면을 완성한다.

## 추천 기술 연결
- 프론트엔드: react, styled-components, react-hook-form
- 백엔드: @nestjs/core, @nestjs/platform-express, @nestjs/swagger
- 추가: react-error-boundary(컴포넌트별 오류 구획화)

