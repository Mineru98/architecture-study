# RESTful 패턴

## 개념
RESTful은 자원(Resource) 단위로 URL과 HTTP 메서드를 정렬해 CRUD 중심 API를 구성한다.
- 명사형 리소스 경로, HTTP 메서드 의미 일치
- 상태 코드/헤더 표준의 일관적 사용

## 언제 쓰는지
- 웹 클라이언트와 API 표준이 중요하고 범용성이 필요한 경우
- 모바일/웹/타 시스템이 동일 엔드포인트를 공유할 때
- CRUD가 중심인 관리형 기능에서 빠르게 성숙한 API를 원할 때

## 기본 데이터 흐름
1. Client에서 자원 중심 URL로 요청
2. API Gateway/Controller가 라우팅
3. Service에서 인증/권한/검증 후 Model 처리
4. 결과를 DTO로 반환

## NestJS + React 예시 구상
- 시나리오: 학습 항목 관리 API
- NestJS: `GET /lessons`, `POST /lessons`, `PATCH /lessons/:id`, `DELETE /lessons/:id`
- React: React Query로 목록 조회/생성/삭제 캐시 동기화
- axios 인터셉터로 인증 헤더와 에러 처리 공통화

## 스터디 범위
- 리소스 설계 규칙과 버전 관리
- 상태 코드/에러 포맷 표준화
- 프론트-백엔드 계약 기반 개발
- 한 기능에서 CRUD 흐름을 완주해 검증
