import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import authRoutes from './routes/authRoutes';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // 1. Konfigurasi Swagger
  const config = new DocumentBuilder()
    .setTitle('Absen Hanimur API')
    .setDescription('Sistem Absensi Warung Hanimur')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document); 

  // 2. Aktifkan CORS (Sangat Penting untuk Flutter)
  app.enableCors(); 
  
  // 3. Gunakan Route Manual
  app.use('/api/auth', authRoutes); 
  
  // 4. Sesuaikan Port untuk Vercel/Production
  const port = process.env.PORT || 3003;
  await app.listen(port);
  
  // Tambahkan baris ini untuk logging di Vercel Dashboard
  console.log(`Application is running on port: ${port}`);
  
  return app.getHttpAdapter().getInstance(); // Baris tambahan untuk stabilitas di Vercel
}

// Ekspor bootstrap untuk Vercel (Opsional tapi membantu beberapa versi @vercel/node)
export default bootstrap();