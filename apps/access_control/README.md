# Access Control Study Guide

`access_control`은 접근 제어 패턴을 쇼핑몰 서비스 예시로 이해하기 위한 학습 문서 모음이다.

## 학습 목표

- 쇼핑몰에서 필요한 권한을 리소스 단위로 나눠 본다.
- 제어 모델과 권한 구조를 분리해서 이해한다.
- React + NestJS 예시에 어떻게 연결되는지 본다.

## 예시 서비스 가정

- 하나의 쇼핑몰 플랫폼을 운영한다.
- 사용자 유형은 고객, 판매자, 운영자, 정산 담당자, 고객센터 상담원으로 나뉜다.
- 핵심 리소스는 상품, 주문, 결제, 환불, 쿠폰, 리뷰, 정산, 배송 정보다.

## 공통 권한 묶음

- 상품: `product.read`, `product.create`, `product.update`, `product.publish`, `product.delete`
- 주문: `order.read`, `order.cancel`, `order.confirm`, `order.export`
- 결제/환불: `payment.read`, `refund.request`, `refund.approve`, `refund.reject`
- 리뷰: `review.read`, `review.reply`, `review.hide`
- 쿠폰/프로모션: `promotion.read`, `promotion.create`, `promotion.update`, `promotion.publish`
- 정산: `settlement.read`, `settlement.approve`, `settlement.export`
- 운영: `user.manage`, `role.manage`, `audit.read`

## 제어 모델

- [RBAC](./rbac/README.md)
- [ABAC](./abac/README.md)
- [ReBAC](./rebac/README.md)

## 권한 구조

- [Flat](./flat/README.md)
- [Hierarchical](./hierarchical/README.md)
- [Delegation](./delegation/README.md)
- [Graph-Based](./graph-based/README.md)

## 권장 학습 순서

1. RBAC
2. ABAC
3. ReBAC
4. Flat
5. Hierarchical
6. Delegation
7. Graph-Based

## 구현 전제

- 루트 `package.json`에서 Bun workspace로 공통 의존성을 관리한다.
- 프론트엔드는 React, Zustand, React Query 기준으로 본다.
- 백엔드는 NestJS, Passport, JWT 기준으로 본다.
- 예시는 쇼핑몰 관리자 백오피스와 판매자 콘솔을 함께 가진다고 가정한다.

## 레거시 조합형 예시

기존 `flat-rbac`, `hierarchical-rbac`, `hybrid-rbac` 폴더는 조합형 비교 자료다.
단일 패턴 문서와 같은 쇼핑몰 예시를 쓰되, 역할 상속 방식 차이를 비교하는 용도로 본다.
