import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    whitelist: true,
  }));

  // Настройка Swagger
  const config = new DocumentBuilder()
    .setTitle('Система обращений API')
    .setDescription('API для работы с обращениями')
    .setVersion('1.0')
    .addTag('requests')
    .build();
  const document = SwaggerModule.createDocument(app as any, config);
  SwaggerModule.setup('api', app as any, document);
  
  await app.listen(3000);
}
bootstrap(); 