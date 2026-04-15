# MQTT 설계 가이드

## 1. 개념 요약

브로커 기반 경량 메시징으로 저대역 환경과 IoT 장치 연동에 적합하다.

## 2. 언제 선택하는가

- 저대역 환경이나 다수 장치 연동이 필요한 경우
- 경량 실시간 상태 전달과 QoS 조절이 필요할 때

## 3. 핵심 설계 포인트

- 토픽 계층을 명확히 설계한다.
- QoS와 영속성 전략을 구분한다.
- 브로커 인증과 보안 모델을 마련한다.

## 4. 프론트엔드 적용 포인트

- 장치 상태 패널과 경고 토픽을 구분해 표시한다.
- 실시간 상태와 보조 조회를 함께 보여준다.

- 이 workspace에서는 `frontend` 대시보드에서 해당 패턴을 선택하고 사례 메모를 기록하도록 구성한다.

## 5. 백엔드 적용 포인트

- 브로커 수신과 상태 저장을 분리한다.
- 토픽별 스키마 검증과 리레이 로직을 둔다.

- 이 workspace에서는 `backend` API가 패턴 개요, 스터디 사례, 메모 저장용 엔드포인트를 제공한다.

## 6. 스터디 시나리오

출석 센서 상태를 MQTT 토픽으로 받아 관리자 패널에서 장치 상태와 경고를 확인한다.

## 7. 추천 구조

```text
frontend/
  src/app
  src/features
  src/shared/api
  src/shared/store
  src/shared/constants
```

```text
backend/
  src/main.ts
  src/app.module.ts
  src/study/study.controller.ts
  src/study/study.service.ts
  src/study/study.data.ts
```

## 8. 구현 체크리스트

- 토픽 네이밍 규칙을 정한다.
- QoS 기준을 만든다.
- 메시지 스키마 버전을 명시한다.

## 9. 주의점

- 브로커 장애 대응 전략이 필요하다.
- 토픽 체계가 흐트러지면 운영이 어렵다.

## 10. 연결 포인트

- 상위 가이드: [Integration Study Workspace](../README.md)
- 기준 질문: 데이터를 어떤 방식으로 연결하고 전달할 것인가
- 예시 도메인: 시스템 연동 전략
