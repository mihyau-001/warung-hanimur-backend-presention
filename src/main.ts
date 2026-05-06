import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  // Membuat instance aplikasi NestJS menggunakan AppModule
  const app = await NestFactory.create(AppModule);

  // 1. Mengaktifkan CORS agar aplikasi Flutter bisa mengakses API ini
  // Tanpa ini, request dari perangkat lain akan diblokir oleh kebijakan keamanan
  app.enableCors();

  // 2. Menjalankan server pada port 3000
  // Penggunaan '0.0.0.0' sangat penting agar laptop/HP lain dalam satu WiFi bisa terhubung
  await app.listen(3002, '0.0.0.0');
  
  console.log(`Application is running on: ${await app.getUrl()}`);
  console.log(`Backend Warung Hanimur siap menerima koneksi dari Flutter!`);
}
bootstrap();