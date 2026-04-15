# Flat RBAC

## 개요

Flat RBAC는 모든 역할이 같은 레벨에 있고, 상속 없이 각 역할의 권한을 독립적으로 정의하는 방식이다.

## 쇼핑몰 역할 예시

```
customer
seller
seller-manager
cs-agent
settlement-manager
platform-admin
```

## 권한 예시

```
customer:
- order.read:self
- refund.request:self
- review.create:self

seller:
- product.read:own
- product.create:own
- product.update:own
- order.read:own-store
- order.confirm:own-store

cs-agent:
- order.read:all
- payment.read:all
- refund.request:all
- review.hide:all

platform-admin:
- user.manage
- role.manage
- audit.read
- refund.approve
- settlement.approve
```

## 특징

- 각 역할을 명시적으로 모두 정의해야 한다.
- `order.read` 같은 공통 권한이 여러 역할에 반복된다.
- 구현은 단순하지만 역할 수가 늘수록 관리 비용이 빠르게 커진다.

## 적합한 상황

- 작은 쇼핑몰
- 운영 조직이 단순한 초기 서비스

## 실행 메모

현재 프로젝트 루트에서 아래 명령으로 실행한다.

```bash
bun run dev:access_control:flat-rbac:frontend
bun run dev:access_control:flat-rbac:backend
```
