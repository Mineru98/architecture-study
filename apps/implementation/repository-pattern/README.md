# Repository 패턴

## 개념
Repository 패턴은 도메인 계층과 데이터 접근을 분리해 데이터 소스 변경 충격을 줄인다.
- Repository 인터페이스: 비즈니스가 요구하는 메서드 집합
- 구현체: DB/외부 API/메모리 캐시 등 실제 접근

## 언제 쓰는지
- 저장소를 교체하거나 다중 데이터 소스를 조합해야 할 때
- 테스트에서 실제 DB 의존도를 줄여야 할 때
- 도메인 서비스가 SQL/ORM 세부 사항을 몰라야 할 때

## 기본 데이터 흐름
1. Service가 Repository 인터페이스에 메서드 호출
2. Repository 구현이 ORM 또는 API로 실제 조회
3. 반환값을 Entity/DTO로 변환
4. Service가 트랜잭션/검증 후 결과 반환

## NestJS + React 예시 구상
- 시나리오: 학습 이력 조회 기능
- NestJS: `StudyHistoryRepository` 인터페이스와 TypeORM 구현체, 테스트용 InMemory 구현체 제공
- React: `useStudyHistory()` 훅이 API만 의존, 저장소 방식은 백엔드 내부에서 캡슐화
- Repository Mock으로 프런트 연동 테스트를 빠르게 수행

## 스터디 범위
- 인터페이스-first 설계
- 영속성 계층 교체 테스트
- 트랜잭션 경계/예외 매핑 정책 정의
- 단일 기능에서 Repository와 Service 분리된 코드 작성
