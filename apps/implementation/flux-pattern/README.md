# Flux 패턴

## 개념
Flux는 Dispatcher-Store-Action-View의 단방향 순환 구조로 상태 변경을 예측 가능하게 만든다.
- Dispatcher: 액션 배포
- Store: 상태 저장소
- Action: 변경 의도
- View: 변경 결과 렌더링

## 언제 쓰는지
- 상태 변경 주체가 명확하지 않을 때 제어 구조가 필요할 때
- 데이터 중심 기능에서 이벤트 추적이 필요한 초기 설계 단계일 때
- Redux 이전/대체 형태로 간결한 단방향 흐름을 도입할 때

## 기본 데이터 흐름
1. View 이벤트가 action 생성
2. Dispatcher가 action과 payload를 Store에 전달
3. Store가 도메인 규칙으로 상태 계산
4. View가 Store 변경을 구독하여 렌더링

## NestJS + React 예시 구상
- 시나리오: 알림 센터 상태 동기화
- NestJS: 알림 조회/읽음 처리/카운트 API 제공
- React: 단일 알림 Store에서 `markAllRead`, `appendNotify` action 처리
- Webhook-like 이벤트를 추가 action으로 받아도 동일 흐름으로 처리

## 스터디 범위
- Flux의 단방향성 보장 규칙 정리
- Action 설계와 Store 등록 규칙
- 뷰가 직접 상태를 변경하지 않는 구조 체화
- 알림/카운트처럼 상태 경합이 적은 기능에서 구현 연습
