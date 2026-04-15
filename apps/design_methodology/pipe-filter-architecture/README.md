# 파이프-필터 아키텍처 학습 가이드

## 목적
요청 또는 데이터가 여러 변환 단계(필터)를 순차적으로 통과하게 하여 처리 흐름을 명확히 한다.

## 핵심 개념
- 각 필터는 단일 책임으로 입력을 가공해 출력한다.
- 필터 체인은 교체/삽입이 쉬워야 한다.
- 입출력 계약이 안정적이면 실험적 규칙 추가가 빠르다.

## 프론트엔드 예시 구조
```text
frontend/
  src/pipeline
    input
    filters
    output
  src/pages
```

## 백엔드 예시 구조
```text
backend/
  src/filter
    validate-filter
    enrich-filter
    transform-filter
  src/engine
```

## 간단한 스터디 시나리오
사용자 로그를 분석해 스팸 점수를 계산하는 파이프라인을 만든다.  
요청 파싱 -> 규칙 필터 -> 이상치 필터 -> 점수 계산 -> 결과 필터링 순으로 처리한다.

## 추천 기술 연결
- 프론트엔드: @tanstack/react-query, react-hook-form, nanoid
- 백엔드: @nestjs/core, class-validator, rxjs, class-transformer
- 추가: dayjs(타임윈도우 필터링), @nestjs/throttler(요청 수 제한)

