import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: 'https://miralo-delta.vercel.app',
    credentials: true,
  });

  const port = process.env.PORT || 8080;
  await app.listen(port);

  console.log(`API Gateway corriendo en http://localhost:${port}`);
}
bootstrap();
