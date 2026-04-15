import "reflect-metadata";
import { Logger, ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.setGlobalPrefix("api");
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  const config = new DocumentBuilder()
    .setTitle("ABAC 쇼핑몰 접근 제어 API")
    .setDescription(
      "속성 기반 접근 제어(ABAC) 패턴을 쇼핑몰 도메인에 적용한 학습용 백엔드. " +
      "정책 엔진(PDP), 사용자/상품/환불 도메인, 접근 평가 API, 감사 로그를 포함합니다. " +
      "x-user-id 헤더로 사용자를 식별하고, x-trusted-network: true 헤더로 신뢰 네트워크를 시뮬레이션합니다.",
    )
    .setVersion("1.0.0")
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api/docs", app, document);

  const listenPort = Number(process.env.PORT ?? 4202);
  await app.listen(listenPort);
  Logger.log("ABAC Study Project backend listening on http://localhost:" + listenPort, "Bootstrap");
}

bootstrap();
