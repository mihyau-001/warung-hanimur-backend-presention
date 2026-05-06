import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { PresensiModule } from './presensi/presensi.module';
import { GudangModule } from './gudang/gudang.module';
import { UsersService } from './users/users.service';
import { UsersController } from './users/users.controller';

@Module({
  imports: [
    PrismaModule, 
    PresensiModule, 
    GudangModule
  ],
  controllers: [
    AppController, 
    UsersController // Daftarkan Controller untuk Login
  ],
  providers: [
    AppService, 
    UsersService // Daftarkan Service untuk Login
  ],
})
export class AppModule {}