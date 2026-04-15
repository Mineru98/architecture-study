export const projectMeta = {
  "title": "Graph-Based Structure Study Project",
  "category": "Access Control",
  "slug": "graph-based",
  "question": "누가 어떤 리소스에 언제 접근할 수 있는가",
  "scenario": "Graph-Based Structure 기준으로 단일 구조 학습 사례를 프론트엔드와 백엔드 예시로 정리한다.",
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
    "title": "Graph-Based Structure 기준 첫 메모",
    "goal": "누가 어떤 리소스에 언제 접근할 수 있는가를 Graph-Based Structure 관점으로 본다.",
    "decision": "Graph-Based Structure로 먼저 단일 구조를 이해한 뒤 조합형으로 확장한다.",
    "notes": "Graph-Based Structure 패턴은 Access Control 카테고리 안에서 독립 프로젝트로 학습한다.",
    "createdAt": "2026-04-15T09:00:00.000Z"
  }
];
