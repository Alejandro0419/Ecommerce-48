import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { LoggerMiddleware } from './middlewares/logger';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
const PORT = process.env.PORT || 3000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Ecommerce API - Backend Docs')
    .setDescription('API for multi-purpose virtual store. Display the details of each endpoint for testing. Proyect made entirely by Alejandro Campaya')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('/', app, document);

  app.use(LoggerMiddleware);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  await app.listen(PORT);
  //console.log('Server listening on http://localhost:3000');
}
bootstrap();
