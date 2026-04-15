export const projectMeta = {
  "title": "Repository Pattern Study Project",
  "category": "Implementation Pattern",
  "slug": "repository-pattern",
  "question": "코드 수준에서 관심사를 어떻게 나눌 것인가",
  "scenario": "Repository Pattern 기준으로 단일 구조 학습 사례를 프론트엔드와 백엔드 예시로 정리한다.",
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
    "title": "Repository Pattern 기준 첫 메모",
    "goal": "코드 수준에서 관심사를 어떻게 나눌 것인가를 Repository Pattern 관점으로 본다.",
    "decision": "Repository Pattern로 먼저 단일 구조를 이해한 뒤 조합형으로 확장한다.",
    "notes": "Repository Pattern 패턴은 Implementation Pattern 카테고리 안에서 독립 프로젝트로 학습한다.",
    "createdAt": "2026-04-15T09:00:00.000Z"
  }
];
