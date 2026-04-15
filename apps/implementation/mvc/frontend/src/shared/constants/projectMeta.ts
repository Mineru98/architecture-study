import type { ProjectMeta } from "../types/project";

export const projectMeta: ProjectMeta = {
  "title": "MVC Study Project",
  "category": "Implementation Pattern",
  "slug": "mvc",
  "question": "코드 수준에서 관심사를 어떻게 나눌 것인가",
  "scenario": "MVC 기준으로 단일 구조 학습 사례를 프론트엔드와 백엔드 예시로 정리한다.",
  "frontendTechStack": [
    "react",
    "react-dom",
    "styled-components",
    "tailwind",
    "zustand",
    "react-hook-form",
    "axios",
    "@tanstack/react-query",
    "@vibe-architecture/react"
  ],
  "backendTechStack": [
    "@nestjs/core",
    "@nestjs/config",
    "@nestjs/swagger",
    "@nestjs/platform-express",
    "@nestjs/throttler",
    "class-validator",
    "class-transformer",
    "rxjs"
  ],
  "endpoints": [
    "/api/health",
    "/api/project/meta",
    "/api/study-memos",
    "/api/docs"
  ]
};
