import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // WAJIB: Agar HP bisa akses backend tanpa diblokir kebijakan browser/CORS
  app.enableCors(); 
  
  // Pastikan port sesuai dengan baseUrl di Flutter (3003)
  await app.listen(3003); 
}
bootstrap();