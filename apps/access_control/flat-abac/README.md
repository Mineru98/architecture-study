# Flat ABAC

## 개요

Flat ABAC는 역할 계층 없이 속성과 규칙을 평면적으로 나열해 접근 제어를 판단하는 방식이다.

## 쇼핑몰 속성 예시

```text
subject.department = seller-support
subject.level = staff
resource.storeId = s-1024
resource.type = order
action = refund.approve
environment.ipTrust = internal
environment.timeWindow = business-hours
```

## 규칙 예시

```text
- subject.department == seller-support and resource.storeId in subject.allowedStoreIds
- action == refund.approve and environment.ipTrust == internal
- action == order.read and resource.ownerId == subject.userId
```

## 특징

- 역할 상속 없이 규칙을 직접 비교한다.
- 초기에는 단순하지만 규칙 수가 많아지면 중복이 빠르게 늘어난다.
- 정책 엔진을 두지 않으면 규칙 관리가 흩어지기 쉽다.

## 적합한 상황

- 역할 구조보다 속성 조건이 먼저 중요한 서비스
- 작은 범위에서 빠르게 속성 기반 제어를 실험할 때

## 실행 메모

현재 프로젝트 루트에서 아래 명령으로 실행한다.

```bash
bun run dev:access_control:flat-abac:frontend
bun run dev:access_control:flat-abac:backend
```
