# 아키텍처 분류 체계

---

## 1. 관점 (Viewpoint)

> 시스템을 어떤 시각으로 바라볼 것인지에 대한 프레임

- 데이터 흐름 관점
- 컴포넌트 구조 관점
- 도메인 모델 관점
- 배포 관점
- 보안 및 접근 제어 관점
- 통합 및 연동 관점

---

## 2. 거시 아키텍처 (System-Level Architecture)

> 시스템 전체의 구성 방식과 서비스 경계를 결정하는 수준

- 모놀리식 아키텍처 (Monolithic Architecture)
- 마이크로서비스 아키텍처 (Microservices Architecture)
- 이벤트 기반 아키텍처 (Event-Driven Architecture)
- 계층화 아키텍처 (Layered Architecture)
- 서버리스 아키텍처 (Serverless Architecture)

---

## 3. 설계 방법론 (Design Methodology)

> 코드와 도메인을 어떻게 구조화할 것인지에 대한 철학 및 방법론

### 3-1. 백엔드 / 공통

- 계층화 아키텍처(Layered Architecture)
- DDD (Domain-Driven Design)
- 클린 아키텍처 (Clean Architecture)
- 헥사고날 아키텍처 (Hexagonal / Ports & Adapters)
- 이벤트 소싱 (Event Sourcing)
- 마이크로커널 아키텍처 (Microkernel)
- 파이프-필터 아키텍처 (Pipe-Filter)
- 모듈러 모놀리스 (Modular Monolith)
- 어니언 아키텍처 (Onion Architecture)
- 버티컬 슬라이스 아키텍처 (Vertical Slice Architecture)

### 3-2. 프론트엔드

- 컴포넌트 기반 아키텍처 (Component-Based Architecture)
- 아토믹 디자인 (Atomic Design)
- 기능 슬라이스 설계 (Feature-Sliced Design, FSD)

---

## 4. 구현 패턴 (Implementation Pattern)

> 코드 수준에서 관심사를 어떻게 분리하고 표현할 것인지에 대한 패턴

### 4-1. UI 패턴

- MVC (Model-View-Controller)
- MVVM (Model-View-ViewModel)
- MVP (Model-View-Presenter)

### 4-2. 상태 관리 패턴

- Redux 패턴
- Reactive 패턴
- Atomic 패턴
- Flux 패턴

### 4-3. 데이터 접근 계층

- Repository 패턴
- CQRS (Command Query Responsibility Segregation)
- Event Sourcing

---

## 5. 통합 및 메시징 패턴 (Integration & Messaging Pattern)

> 서비스 간, 시스템 간 데이터를 어떻게 연결하고 전달할 것인지

### 5-1. 데이터 전송 방식

- RESTful
- GraphQL
- RPC (gRPC 포함)
- WebSocket
- MQTT

### 5-2. 메시징 및 통합 패턴

- Pub/Sub 패턴
- Message Queue (MQ)
- Outbox 패턴

---

## 6. 데이터 구조 (Data Structure)

> 도메인 및 데이터를 어떤 형태로 모델링하고 조직화할 것인지

- 일반 (Flat) 구조
- 계층적 (Hierarchical) 구조
- 그래프 기반 (Graph-Based) 구조
- 태그 기반 (Tag-Based) 구조
- 객체 기반 (Object-Level) 구조

---

## 7. 접근 제어 (Access Control)

> 리소스에 대한 접근 권한을 어떻게 모델링하고 제어할 것인지

### 7-1. 제어 모델

- RBAC (Role-Based Access Control)
- ABAC (Attribute-Based Access Control)
- ReBAC (Relationship-Based Access Control / Graph-Based)

### 7-2. 권한 구조

- 일반 (Flat) 구조
- 계층적 (Hierarchical) 구조
- 위임 기반 (Delegation) 구조
- 그래프 기반 (Graph-Based) 구조

---

## 8. 캐싱 전략 (Caching Strategy)

> 성능 최적화를 위한 데이터 캐싱 방식

- Cache-Aside (Lazy Loading)
- Write-Through
- Write-Behind (Write-Back)
- Read-Through