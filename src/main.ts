import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import authRoutes from './routes/authRoutes';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // 1. Konfigurasi Swagger (Tambahkan SwaggerModule agar tampil)
  const config = new DocumentBuilder()
    .setTitle('Absen Hanimur API')
    .setDescription('Sistem Absensi Warung Hanimur')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document); // Bisa diakses di /docs

  // 2. WAJIB: Aktifkan CORS agar Flutter bisa akses
  app.enableCors(); 
  
  // 3. Gunakan Route Manual
  app.use('/api/auth', authRoutes); 
  
  // 4. FIKS PORT: Mengikuti port dari Render atau default ke 3003 jika lokal
  const port = process.env.PORT || 3003;
  await app.listen(port);
  
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();