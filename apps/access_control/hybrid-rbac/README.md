# Hybrid RBAC

## 개요

Hybrid RBAC는 기본은 역할 기반으로 관리하되, 일부 예외를 직접 권한이나 조건으로 보완하는 방식이다.

## 쇼핑몰 예시

- 기본 역할은 `seller`, `cs-agent`, `settlement-manager`, `platform-admin`으로 관리한다.
- 여기에 예외 권한을 추가한다.
  - 특정 판매자만 `promotion.publish`
  - 특정 상담원만 `refund.approve:low-risk`
  - 특정 정산 담당자만 해외 스토어 정산 조회

## 예시 구성

```
Role:
- seller
- cs-agent
- settlement-manager

Direct grants:
- user: kim-cs-lead -> refund.approve:low-risk
- user: park-seller -> promotion.publish

Conditional grants:
- settlement-manager can settlement.read when market in ["KR", "JP"]
```

## 특징

- RBAC의 단순함을 유지하면서 쇼핑몰 운영 예외를 흡수하기 쉽다.
- 예외 규칙이 많아지면 결국 ABAC나 ReBAC로 넘어가야 할 수 있다.
- 역할과 예외 권한의 우선순위를 명확히 정해야 한다.

## 적합한 상황

- RBAC만으로는 부족하지만 전면적인 정책 엔진 도입은 과한 쇼핑몰
- 운영 예외가 주기적으로 생기는 성장 단계 서비스

## 실행 메모

현재 프로젝트 루트에서 아래 명령으로 실행한다.

```bash
bun run dev:ac:hybrid-rbac:frontend
bun run dev:ac:hybrid-rbac:backend
```
