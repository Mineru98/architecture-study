<common_rule>
- 필요한 경우 도커 컴포저를 구성해서 디비 연결을 하세요.
    - pg : 17
    - redis : 가능하면 알파인 리눅스 계열
- `apps/{category}/{project_name}/docker-compose.yml`
- 가능하면 환경 변수를 docker-compose.yml 파일 안에 넣어서 따로 `.env` 파일을 만들지 않고 동작할 수 있게 하세요.
- 공용 디비 같은 경우에는 인스턴스 자체는 `docker-compose.yml` 에 두고 사용하는데 따로 컨테이너를 너무 많이 만들지 말고 하나를 다같이 공유해서 사용하도록 하고 볼륨도 다같이 쓰는데 디비 이름은 구분해서 쓸 수 있도록 하세요.
</common_rule>

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

<backend_rule>
- 인증 시스템은 가능하면 간소화를 하는데 ac에 따라서 jwt 구현이 필수적이라면 jwt를 인증 기반 시스템으로 운영을 해야합니다.
- 기본은 redis 스토리지를 사용할 수 있도록 하세요.
</backend_rule>