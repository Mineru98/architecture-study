<instructions>
@apps/README.md 이 내용 기준으로 시스템 설계 공부 목적으로 개념서(지침 가이드라인)를 먼저 조합형이 아니라 단일 구조로 각 사례별로 만들어 보고 싶어.

- apps/access_control
- apps/design_methodology
- apps/implementation
- apps/integration

이렇게 네가지 항목 아래 문서상에 있는 각 패턴별 내용대로 만들어보기 위한 설계 문서 제작 작업을 하는데
전재 조건은 프로젝트 최상위에 bun 기준으로 공통적으로 사용하는 package.json 파일에 공통적으로 사용하는 의존성 라이브러리를 먼저 구성을 하고 각 프로젝트에서 프론트+백엔드를 조합을 해서 시스템이 동작하는 간단한 예시 스터디 사례들을 만듭니다.

packages/* 에 있는 패키지를 사용해서 프론트엔드 쪽에 반영해줘.
</instructions>

<tech_stack>
- 프론트엔드 기본 기술 스텍
    - react
    - react-dom
    - styled-components
    - tailwind
    - nanoid
    - vite
    - react-error-boundary
    - zustand
    - react-hook-form
    - axios
    - qs
    - path-to-regexp
    - es-toolkit
    - dayjs
    - uuid
    - @tanstack/react-query
    - @tanstack/react-query-devtools
- 백엔드 기본 기술 스텍
    - @nestjs/core
    - @nestjs/config
    - @nestjs/swagger
    - @nestjs/platform-express
    - @nestjs/typeorm
    - @nestjs/throttler
    - class-transformer
    - class-validator
    - rxjs
    - reflect-metadata
    - @nestjs/passport
    - @nestjs/jwt

더 필요한 라이브러리가 있다면 상황에 맞춰서 추가해줘.
</tech_stack>

<frontend_rule>
SRP(단일 책임 원칙)을 적용해서 해당 컴포넌트에서만 사용이 되는 요소 같은 경우에는 다음과 같은 구조로 구성을 해야 합니다.
- {ui_component_name} : PascalCase
    - index.tsx(필수)
    - types.ts(필수)
    - styles.ts
    - hooks.ts
    - helpers.ts
    - utils.ts
    - constants.ts
    - store.ts
    - index.test.tsx
- {hook_component_name} : camelCase
- {util_component_name} : camelCase
- {folder_name} : kebab-case
</frontend_rule>