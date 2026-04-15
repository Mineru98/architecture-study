# RBAC

## 개요

RBAC(Role-Based Access Control)는 사용자에게 직접 권한을 부여하지 않고 역할에 권한을 연결한 뒤, 사용자를 역할에 매핑하는 모델이다.

## 쇼핑몰 기준 핵심 역할

- `customer`: 내 주문 조회, 리뷰 작성, 환불 요청
- `seller`: 자신이 등록한 상품 관리, 자신의 주문 확인, 배송 처리
- `seller-manager`: 여러 판매자 계정 관리, 상품 승인 요청 처리
- `cs-agent`: 주문 조회, 환불 접수, 리뷰 블라인드 요청
- `settlement-manager`: 정산 조회, 정산 승인, 정산 내역 다운로드
- `platform-admin`: 사용자/역할 관리, 전체 상품/주문/환불 운영

## 핵심 개념

- 사용자와 권한 사이에 역할 계층을 둔다.
- 권한 변경이 역할 단위로 일어난다.
- 운영 백오피스와 판매자 콘솔처럼 메뉴가 뚜렷한 서비스에 적합하다.

## 기본 구성

- `User`
- `Role`
- `Permission`
- `UserRole`
- `RolePermission`

## 쇼핑몰 권한 예시

- `seller`
  - `product.read`
  - `product.create`
  - `product.update`
  - `order.read`
  - `order.confirm`
- `cs-agent`
  - `order.read`
  - `payment.read`
  - `refund.request`
  - `review.read`
  - `review.hide`
- `platform-admin`
  - `user.manage`
  - `role.manage`
  - `audit.read`
  - `refund.approve`
  - `settlement.approve`

## React + NestJS 스터디 예시

프론트엔드는 로그인한 사용자의 역할에 따라 판매자 콘솔 메뉴와 운영자 메뉴를 다르게 노출한다.
백엔드는 JWT의 `roles` 클레임과 `RolesGuard`로 상품, 주문, 환불 API 접근을 제한한다.

## 데이터 흐름

1. 사용자가 로그인한다.
2. 서버가 역할 목록을 포함한 액세스 토큰을 발급한다.
3. 프론트엔드가 역할 기반 라우트 가드와 버튼 노출 제어를 적용한다.
4. 백엔드가 역할과 권한 매핑을 확인한다.

## 적합한 사례

- 판매자/운영자 메뉴가 명확히 분리된 쇼핑몰
- 백오피스 중심 서비스
- 권한 종류가 비교적 안정적인 B2B 커머스

## 한계

- 판매자별 예외 정책이 많아질수록 역할이 폭증한다.
- "내 상품만 수정 가능" 같은 리소스 문맥 조건을 역할만으로 처리하기 어렵다.
