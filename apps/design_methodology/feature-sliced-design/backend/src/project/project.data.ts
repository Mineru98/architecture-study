export const projectMeta = {
  "title": "Feature-Sliced Design Study Project",
  "category": "Design Methodology",
  "slug": "feature-sliced-design",
  "question": "시스템을 어떤 책임 경계로 나눌 것인가",
  "scenario": "Feature-Sliced Design 기준으로 단일 구조 학습 사례를 프론트엔드와 백엔드 예시로 정리한다.",
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
    "title": "Feature-Sliced Design 기준 첫 메모",
    "goal": "시스템을 어떤 책임 경계로 나눌 것인가를 Feature-Sliced Design 관점으로 본다.",
    "decision": "Feature-Sliced Design로 먼저 단일 구조를 이해한 뒤 조합형으로 확장한다.",
    "notes": "Feature-Sliced Design 패턴은 Design Methodology 카테고리 안에서 독립 프로젝트로 학습한다.",
    "createdAt": "2026-04-15T09:00:00.000Z"
  }
];
