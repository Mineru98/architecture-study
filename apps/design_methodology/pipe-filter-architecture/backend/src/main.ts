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
    .setTitle("Pipe-Filter Architecture Study Project")
    .setDescription("Pipe-Filter Architecture 기준으로 단일 구조 학습 사례를 프론트엔드와 백엔드 예시로 정리한다.")
    .setVersion("0.1.0")
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api/docs", app, document);

  const listenPort = Number(process.env.PORT ?? 4307);
  await app.listen(listenPort);
  Logger.log("Pipe-Filter Architecture Study Project backend listening on http://localhost:" + listenPort, "Bootstrap");
}

bootstrap();
