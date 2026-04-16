/**
 * Bun + NestJS 서버 시작점
 * ABAC 접근 제어 백엔드
 */

import "reflect-metadata";
import { NestFactory } from "@nestjs/core";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { AppModule } from "./app.module.js";
import { resourceAttributeMiddleware } from "./middleware/resource-attribute.middleware.js";
import { policyStore } from "./abac/engine/policy-store.js";

/**
 * 서버 시작
 */
async function bootstrap() {
  // Policy Store 초기화 (시드 정책 로드)
  policyStore.initialize();
  console.log("[Main] ABAC Policy Store initialized");

  // NestJS 앱 생성
  const app = await NestFactory.create(AppModule, {
    logger: console,
  });

  // 미들웨어 등록 (PIP 역할)
  app.use(resourceAttributeMiddleware);

  // 포트 설정
  const port = process.env.PORT || 3000;

  // Swagger 설정
  const config = new DocumentBuilder()
    .setTitle("ABAC Access Control API")
    .setDescription("Attribute-Based Access Control 백엔드 API")
    .setVersion("1.0")
    .addTag("health", "헬스체크")
    .addTag("users", "사용자 관리")
    .addTag("products", "상품 관리")
    .addTag("refunds", "환불 관리")
    .addTag("access-check", "ABAC 접근 평가")
    .build();

  // Swagger 문서 생성 (에러 방지를 위해 try-catch)
  try {
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup("api/docs", app, document);
    console.log(`[Main] Swagger UI: http://localhost:${port}/api/docs`);
  } catch (err) {
    console.warn("[Main] Swagger initialization failed, skipping API docs:", err instanceof Error ? err.message : err);
  }

  // CORS 설정
  app.enableCors();

  // 서버 시작
  await app.listen(port);
  console.log(`[Main] ABAC Backend running on http://localhost:${port}`);
}

bootstrap().catch((err) => {
  console.error("[Main] Failed to start server:", err);
  process.exit(1);
});