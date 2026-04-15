# MVP

## 개념
MVP는 Presenter가 View의 동작과 Model 연계를 전담해 UI 로직을 분리한다.
- Model: 데이터/도메인 규칙
- View: 렌더링 중심 인터페이스
- Presenter: 사용자 액션 해석, 포맷 변환, 뷰 업데이트 트리거

## 언제 쓰는지
- 화면 코드에서 비즈니스 로직이 과도하게 커질 때
- 테스트 가능한 프레젠테이션 로직이 필요할 때
- 팀 내에서 UI 구현자와 도메인 구현자를 역할 분리해야 할 때

## 기본 데이터 흐름
1. View에서 사용자 이벤트 수신
2. Presenter에서 이벤트 해석 후 Model API 호출
3. Model 응답을 View용 DTO로 매핑
4. Presenter가 View 업데이트 명령 실행

## NestJS + React 예시 구상
- 시나리오: 학습 진행률 위젯
- NestJS: `ProgressController`가 과제 완료 상태와 포인트 반환
- React: `ProgressPresenter` 클래스(또는 hook 래퍼)가 원시 API 데이터를 UI 문구/차트 포맷으로 변환
- Presenter 테스트에서 성공/실패/로딩 상태 전이를 검증

## 스터디 범위
- View와 Presenter API 경계 정의
- Presenter 단에서 문자열/상태 매핑 로직 책임화
- API 예외 처리 정책 분리
- 한 화면당 하나의 Presenter를 두는 실습
