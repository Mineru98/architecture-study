# MVVM

## 개념
MVVM은 ViewModel을 둬서 View의 상태와 이벤트를 상태 바인딩으로 관리한다.
- View: 사용자 UI
- ViewModel: 상태 계산, 이벤트 해석, View 데이터 준비
- Model: 데이터 소스

## 언제 쓰는지
- 화면 상태가 많아지고 폼/필터/탭 등 상태 전이가 길어질 때
- 컴포넌트 내부 로직을 줄이고 테스트 가능한 상태 관리가 필요할 때
- 입력 기반 화면에서 유효성, 파생 상태 계산이 많이 필요한 경우

## 기본 데이터 흐름
1. View가 사용자 입력(버튼/폼 입력)을 ViewModel에 이벤트로 전달
2. ViewModel이 Model API 호출 또는 캐시 갱신
3. Model 결과를 정제해 View 상태로 변환
4. View가 상태 변경을 감지해 렌더링

## NestJS + React 예시 구상
- 시나리오: 일정 등록 마법사
- NestJS: `StudyPlanController`가 일정 생성/조회 API 제공
- React: `useStudyPlanViewModel()` 훅이 폼 상태, 에러, 단계별 유효성 관리
- API 호출 후 Model 응답을 ViewModel에서 화면 바인딩용 형태로 가공
- React Query + Zustand는 선택적으로 상태 캐시/세션 상태 보조 역할

## 스터디 범위
- use* 훅을 ViewModel로 볼 때의 설계 규칙
- 입력 이벤트와 파생 상태 계산 분리
- 테스트 가능한 ViewModel 단위 테스트
- 하나의 화면(일정 생성/편집/조회) 단위로 MVVM 구현 실습
