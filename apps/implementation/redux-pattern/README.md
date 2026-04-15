# Redux 패턴

## 개념
Redux 패턴은 단방향 데이터 흐름을 전제해 상태를 액션과 리듀서 중심으로 예측 가능하게 관리한다.
- Action: 상태 변경 의도
- Reducer: 순수 상태 전이
- Store: 단일 진실의 원천

## 언제 쓰는지
- 다수 컴포넌트가 같은 상태를 공유할 때
- 상태 변경 이력을 추적하거나 디버깅이 중요할 때
- 대규모 기능에서 상태 흐름을 일원화할 때

## 기본 데이터 흐름
1. UI 이벤트가 Action 발행
2. Middleware/Thunk/Saga에서 비동기 처리 및 추가 action dispatch
3. Reducer가 순수하게 상태 계산
4. Store 변경 알림으로 UI 반응형 렌더링

## NestJS + React 예시 구상
- 시나리오: 문제집 대시보드 동기화
- NestJS: 토픽별 학습 과제 API와 실시간 점수 반영 API
- React: Zustand 대신 Redux 패턴 기반 커스텀 store 구조로 과제 상태 관리
- Axios 요청 결과를 action payload로 변환, reducer에서 정규화된 `entities`로 보존

## 스터디 범위
- 액션 설계와 reducer 분할 전략
- 비동기 액션 처리 계층 추상화
- DevTools 없이도 상태 전이 추적 가능한 로그 구조 만들기
- 단일 스터디 도메인에서의 전역 상태 설계
