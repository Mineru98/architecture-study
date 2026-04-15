import type { ProjectMeta } from "../types/project";

export const projectMeta: ProjectMeta = {
  "title": "Vertical Slice Architecture Study Project",
  "category": "Design Methodology",
  "slug": "vertical-slice-architecture",
  "question": "시스템을 어떤 책임 경계로 나눌 것인가",
  "scenario": "Vertical Slice Architecture 기준으로 단일 구조 학습 사례를 프론트엔드와 백엔드 예시로 정리한다.",
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
