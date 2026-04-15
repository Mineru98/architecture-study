# vibe-architecture package implementation prompt

이 문서는 `vibe-architecture` 공통 패키지 구현 기준이다.

## 목표

- `packages/css`와 `packages/react`를 분리한다.
- `packages/css`는 토큰, 테마, 베이스 스타일을 담당한다.
- `packages/react`는 공통 UI 컴포넌트 바인딩을 담당한다.
- seed-design의 역할 분리는 참고하되, 브랜드 시그니처는 제거한다.

## package roles

### `packages/css`

담당 범위:
- color, spacing, radius, typography token
- base css
- theme css
- component recipe의 기반 class rule

권장 구조:
```text
packages/css
  package.json
  README.md
  base.css
  all.css
  vars/
    colors.css
    spacing.css
    radius.css
    typography.css
    index.css
  theming/
    default.css
    index.css
```

규칙:
- 기본 테마는 black / white 조합이다.
- CSS 변수 prefix는 `--va-`를 사용한다.
- 앱 전역에서 재사용되는 값만 둔다.
- 특정 화면 전용 규칙은 넣지 않는다.

### `packages/react`

담당 범위:
- 공통 primitive UI component
- 공통 layout component
- form helper component
- css package를 소비하는 React binding

권장 구조:
```text
packages/react
  package.json
  README.md
  src/
    index.ts
    primitive/
      Button/
        index.tsx
        types.ts
        styles.ts
      Card/
        index.tsx
        types.ts
        styles.ts
      Input/
        index.tsx
        types.ts
        styles.ts
      index.ts
    layout/
      Stack/
        index.tsx
        types.ts
        styles.ts
      index.ts
```

규칙:
- SRP를 지킨다.
- 컴포넌트 폴더는 PascalCase 이름을 사용한다.
- 컴포넌트마다 `index.tsx`, `types.ts`는 필수다.
- 필요할 때만 `styles.ts`, `hooks.ts`, `helpers.ts`, `utils.ts`, `constants.ts`, `store.ts`, `index.test.tsx`를 추가한다.
- 폴더명은 목적 단위로만 나눈다.

## implementation principles

- `packages/css`가 먼저이고 `packages/react`는 그 위에 쌓인다.
- 앱은 직접 스타일 토큰을 재정의하지 않고 `packages/css`를 우선 사용한다.
- 새 코어 컴포넌트는 앱 내부에 중복 생성하지 않고 `packages/react`로 올린다.
- 공통 컴포넌트는 시각 요소와 상태 책임을 과도하게 섞지 않는다.

## first components

초기 구현 대상:
- Button
- Card
- Input
- Stack

이 네 가지로 대부분의 스터디 예제 화면 골격을 구성한다.
