import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import authRoutes from './routes/authRoutes';
import { DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Contoh jika kamu pakai Swagger
  const config = new DocumentBuilder()
  .setTitle('Absen Hanimur API') // Ganti jadi ini
  .setDescription('Sistem Absensi Warung Hanimur')
  .setVersion('1.0')
  .build();

  // WAJIB: Agar HP bisa akses backend tanpa diblokir kebijakan browser/CORS
  app.enableCors(); 
  
  // --- MASUKKAN DI SINI ---
  // Ini memberitahu NestJS untuk menggunakan route manual dari Express
  app.use('/api/auth', authRoutes); 
  // -----------------------
  
  // Pastikan port sesuai dengan baseUrl di Flutter (3003)
  await app.listen(3003); 
}
bootstrap();