export const projectMeta = {
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
} as const;

export const initialStudyMemos = [
  {
    "id": "seed-1",
    "title": "Hybrid RBAC Study Project 첫 메모",
    "goal": "비교형 접근 제어 구조를 확인한다.",
    "decision": "조합형도 독립 프로젝트 구조로 맞춘다.",
    "notes": "hybrid-rbac 프로젝트를 독립 실행 단위로 구성했다.",
    "createdAt": "2026-04-15T09:40:00.000Z"
  }
];
