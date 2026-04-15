# 아토믹 디자인 학습 가이드

## 목적
UI를 원자 수준에서 페이지 수준까지 단계적으로 조립해, 설계 일관성과 재사용성을 강화한다.

## 핵심 개념
- Atoms, Molecules, Organisms, Templates, Pages 단계로 분해한다.
- 각 단계는 상위 단계의 빌딩 블록이 된다.
- 디자인 규칙을 문서화해 팀 내 일관성을 만든다.

## 프론트엔드 예시 구조
```text
frontend/
  src/design-system/atoms
  src/design-system/molecules
  src/design-system/organisms
  src/design-system/templates
  src/design-system/pages
```

## 백엔드 예시 구조
```text
backend/
  src/app.module.ts
  src/catalog
  src/common
  src/config
```

## 간단한 스터디 시나리오
이커머스 상품 상세 화면을 제작한다.  
버튼/배지/가격 텍스트를 Atom으로 만들고, 장바구니 카트는 Molecule/Organism으로 조립해 템플릿과 페이지로 완성한다.

## 추천 기술 연결
- 프론트엔드: styled-components, react-query, nanoid
- 백엔드: @nestjs/core, @nestjs/typeorm, class-validator
- 추가: @tanstack/react-query-devtools, es-toolkit
