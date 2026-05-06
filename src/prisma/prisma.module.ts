import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global() // Tambahkan decorator Global ini
@Module({
  providers: [PrismaService],
  exports: [PrismaService], // Jangan lupa di-export
})
export class PrismaModule {}