# Hierarchical Structure

## 개요

Hierarchical 구조는 상위 권한 또는 역할이 하위 권한을 포함하는 트리형 구조다.

## 쇼핑몰 예시

운영 조직을 기준으로 역할 계층을 둔다.

- `platform-admin`
  - `ops-manager`
    - `cs-agent`
  - `settlement-manager`
- `seller-owner`
  - `seller-staff`

예를 들어 `platform-admin`은 `ops-manager`와 `cs-agent`가 가진 주문 조회, 리뷰 관리 권한을 모두 포함한다.

## 핵심 개념

- 상속 규칙이 존재한다.
- 공통 권한을 상위 레벨에 모을 수 있다.
- 운영 조직 구조와 연결하기 쉽다.

## React + NestJS 스터디 예시

프론트엔드는 `platform-admin > ops-manager > cs-agent` 같은 역할 체인을 기준으로 화면을 분기한다.
백엔드는 상속된 권한을 계산하는 헬퍼 또는 서비스 계층을 둔다.

## 적합한 사례

- 본사 운영 조직이 명확한 쇼핑몰
- 판매자 조직도까지 함께 다뤄야 하는 마켓플레이스

## 주의점

- 상속 방향과 충돌 규칙을 명확히 해야 한다.
- 너무 깊은 계층은 실제 운영자에게 이해 비용을 키운다.
