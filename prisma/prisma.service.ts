import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  // Fungsi ini otomatis jalan saat server NestJS baru nyala
  async onModuleInit() {
    await this.$connect();
    console.log('Database terhubung di Absen Hanimur!');
  }

  // Fungsi ini otomatis jalan saat server dimatikan
  async onModuleDestroy() {
    await this.$disconnect();
  }
}