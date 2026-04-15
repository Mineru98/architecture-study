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

## 4. ABAC 아키텍처

```text
Request → PEP(AbacGuard) → PIP(AttributeResolver/Middleware) → PDP(PolicyDecisionPoint) → Allow/Deny + 근거
```

### 핵심 컴포넌트

| 컴포넌트 | 역할 | 구현 |
|---------|------|-----|
| **PDP** (Policy Decision Point) | 정책 매칭 → 조건 평가 → 결정 | `policy-decision-point.ts` |
| **PEP** (Policy Enforcement Point) | 접근 결정 강제 실행 | `abac.guard.ts` |
| **PIP** (Policy Information Point) | 요청에서 속성 추출 | Middleware + `@CheckAccess` |
| **Policy Store** | 정책 저장/조회 | `policy-store.ts` |

### 시드 정책 (우선순위 순)

| 정책 | 우선순위 | 효과 | 조건 |
|------|---------|------|------|
| Admin Full Access | 100 | allow | role === "admin" |
| High Value Refund Trusted Allow | 91 | allow | refund && amount ≥ 100K && trustedNetwork && trustLevel ≥ 3 |
| High Value Refund Deny | 90 | deny | refund && amount ≥ 100K |
| Business Hours Only | 85 | deny | update/delete && (hour < 9 or hour ≥ 18) |
| Seller Own Product Update | 80 | allow | seller && update && ownerId matches |
| Default Refund Allow | 20 | allow | refund (저액) |
| Default Read Allow | 10 | allow | read |

## 5. 프론트엔드 적용 포인트

- **Policy Simulator**: 사용자/리소스/액션/환경을 선택하고 접근 평가를 실행
- **Attribute Inspector**: 4속성(Subject·Resource·Action·Environment) 분해 뷰어
- **Policy List**: 등록된 정책 카드 목록 (조건식, 효과, 우선순위)
- **Access Decision Log**: 평가 이력 타임라인

## 6. 백엔드 적용 포인트

- 정책 평가 서비스를 별도 계층(AbacModule)으로 분리
- `@CheckAccess` 데코레이터 + `AbacGuard`로 엔드포인트별 접근 제어
- Middleware로 리소스 속성을 사전 조회하여 Guard에 전달
- 감사 로그(AuditService)로 모든 평가 결과 기록

## 7. 스터디 시나리오

1. 같은 seller 역할이라도 자신의 상품만 수정 가능
2. 고액 환불(≥100,000원)은 신뢰된 IP + 추가 승인 속성이 있어야 처리
3. 관리자(admin)는 모든 리소스에 접근 가능 (업무시간 제한도 무시)
4. 업무 시간(09:00-18:00) 외에는 수정/삭제 차단

## 8. 구조

```text
frontend/
  src/app/AbacDashboard         # 메인 대시보드
  src/features/PolicySimulator  # 접근 평가 시뮬레이터
  src/features/PolicyList       # 정책 카드 목록
  src/features/AccessDecisionLog # 감사 로그 타임라인
  src/features/AttributeInspector # 4속성 분해 뷰어
  src/shared/api/abacApi.ts     # API 클라이언트
  src/shared/store/simulatorStore.ts # 시뮬레이터 상태
  src/shared/types/abac.ts      # ABAC 도메인 타입
```

```text
backend/
  src/main.ts
  src/app.module.ts
  src/abac/                     # ABAC 코어 엔진
    engine/policy.types.ts
    engine/policy-decision-point.ts
    engine/policy-store.ts
    attribute/attribute.types.ts
    guard/abac.guard.ts
    guard/check-access.decorator.ts
  src/user/                     # 사용자 도메인
  src/product/                  # 상품 도메인 (ABAC 가드 적용)
  src/refund/                   # 환불 도메인 (ABAC 가드 적용)
  src/access-check/             # 접근 평가 API (프론트 연동)
  src/audit/                    # 감사 로그
```

## 9. API 엔드포인트

| Method | Path | 설명 |
|--------|------|------|
| GET | /api/health | 헬스체크 |
| GET | /api/users | 사용자 목록 (속성 포함) |
| GET | /api/users/:id | 사용자 상세 |
| GET | /api/products | 상품 목록 |
| PUT | /api/products/:id | 상품 수정 (ABAC 가드) |
| GET | /api/refunds | 환불 요청 목록 |
| POST | /api/refunds | 환불 요청 생성 (ABAC 가드) |
| POST | /api/access-check | 접근 평가 시뮬레이션 |
| GET | /api/policies | 정책 목록 |
| GET | /api/audit-log | 감사 로그 (최대 50건) |
| GET | /api/docs | Swagger UI |

## 10. 구현 체크리스트

- [x] 4속성(SRAE) 분리 설계
- [x] PDP/PEP/PIP 분리 구현
- [x] 정책 우선순위 기반 평가
- [x] 동적 속성 참조 (`${subject.userId}`)
- [x] 정책 매칭 상세 근거 포함
- [x] 감사 로그 기록
- [x] 프론트엔드 시뮬레이터 UI
- [x] 시나리오별 테스트 검증

## 11. 주의점

- 정책 수가 많아지면 가독성이 급격히 떨어진다.
- 속성 누락 시 기본 거부 전략을 강제해야 한다.
- 현재 구현은 first-match-wins 전략이다. 같은 우선순위에서 deny/allow 우선 구분이 없으므로, 정책 우선순위를 겹치지 않게 설계해야 한다.

## 실행 메모

현재 프로젝트 루트에서 아래 명령으로 실행한다.

```bash
bun run dev:ac:abac:frontend
bun run dev:ac:abac:backend
# or
bun run dev:ac:abac
```

## 12. 연결 포인트

- 상위 가이드: [Access Control Study Workspace](../README.md)
- 기준 질문: 누가 어떤 리소스에 언제 접근할 수 있는가
- 예시 도메인: 쇼핑몰 권한 설계
