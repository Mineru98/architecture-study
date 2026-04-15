# Hierarchical RBAC

## 개요

Hierarchical RBAC는 상위 역할이 하위 역할의 권한을 상속하는 방식이다.

## 쇼핑몰 역할 계층 예시

```
platform-admin
├─ ops-manager
│  └─ cs-agent
└─ settlement-manager

seller-owner
└─ seller-staff
```

## 권한 예시

```
cs-agent:
- order.read:all
- refund.request:all
- review.hide:all

ops-manager:
- inherits cs-agent
- refund.approve:low-risk
- promotion.publish

platform-admin:
- inherits ops-manager
- inherits settlement-manager
- user.manage
- role.manage
- audit.read
```

## 특징

- 공통 운영 권한을 상위 역할에 모을 수 있다.
- 상위 역할 권한 변경이 하위 역할에 자동 반영된다.
- 계층 설계를 잘못하면 실제 조직보다 복잡한 모델이 된다.

## 적합한 상황

- 본사 운영 조직과 판매자 조직이 비교적 명확한 쇼핑몰
- 역할 중복을 줄이고 싶은 서비스

## 실행 메모

현재 프로젝트 루트에서 아래 명령으로 실행한다.

```bash
bun run dev:access_control:hierarchical-rbac:frontend
bun run dev:access_control:hierarchical-rbac:backend
```
