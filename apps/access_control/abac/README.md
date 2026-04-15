# ABAC 설계 가이드

## 1. 개념 요약

사용자, 리소스, 액션, 환경 속성을 조합해 문맥 기반 접근 결정을 내린다.

## 2. 언제 선택하는가

- 역할만으로는 처리하기 어려운 조건이 많을 때
- 판매자별 예외 정책이나 보안 문맥이 중요한 서비스일 때

## 3. 핵심 설계 포인트

- Subject, Resource, Action, Environment 속성을 분리한다.
- 정책 표현식과 정책 실행 결과를 디버깅 가능하게 남긴다.
- 속성 조회 비용과 캐시 전략을 함께 설계한다.

## 4. 프론트엔드 적용 포인트

- 선택한 주문이나 상품 컨텍스트에 따라 허용 액션을 실시간으로 계산한다.
- 정책 결과와 근거 속성을 카드 형태로 보여준다.

- 이 workspace에서는 `frontend` 대시보드에서 해당 패턴을 선택하고 사례 메모를 기록하도록 구성한다.

## 5. 백엔드 적용 포인트

- 정책 평가 서비스를 별도 계층으로 둔다.
- DTO 검증 이후 리소스 속성과 환경 속성을 결합해 최종 판정을 수행한다.

- 이 workspace에서는 `backend` API가 패턴 개요, 스터디 사례, 메모 저장용 엔드포인트를 제공한다.

## 6. 스터디 시나리오

같은 seller 역할이라도 자신의 상품만 수정 가능하고, 고액 환불은 신뢰된 IP와 추가 승인 속성이 있어야 처리되도록 구성한다.

## 7. 추천 구조

```text
frontend/
  src/app
  src/features
  src/shared/api
  src/shared/store
  src/shared/constants
```

```text
backend/
  src/main.ts
  src/app.module.ts
  src/study/study.controller.ts
  src/study/study.service.ts
  src/study/study.data.ts
```

## 8. 구현 체크리스트

- 속성 조회 출처를 문서화한다.
- 정책 실패 사유 코드를 정의한다.
- 테스트 케이스를 정책별로 분리한다.

## 9. 주의점

- 정책 수가 많아지면 가독성이 급격히 떨어진다.
- 속성 누락 시 기본 거부 전략을 강제해야 한다.

## 10. 연결 포인트

- 상위 가이드: [Access Control Study Workspace](../README.md)
- 기준 질문: 누가 어떤 리소스에 언제 접근할 수 있는가
- 예시 도메인: 쇼핑몰 권한 설계
