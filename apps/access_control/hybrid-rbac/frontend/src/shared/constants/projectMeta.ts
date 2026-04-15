import type { ProjectMeta } from "../types/project";

export const projectMeta: ProjectMeta = {
  "title": "Hybrid RBAC Study Project",
  "category": "Access Control",
  "slug": "hybrid-rbac",
  "question": "누가 어떤 리소스에 언제 접근할 수 있는가",
  "scenario": "Hybrid RBAC Study Project 기준으로 단일 구조와 비교 포인트를 함께 정리한다.",
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
