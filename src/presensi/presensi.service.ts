import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePresensiDto } from './dto/create-presensi.dto';

@Injectable()
export class PresensiService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreatePresensiDto) {
    // 1. Logika untuk Absen KELUAR
    if (dto.tipe === 'KELUAR') {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      // Cari data absen masuk user hari ini yang belum ada jam keluarnya
      const existingPresensi = await this.prisma.presensi.findFirst({
        where: {
          userId: dto.userId,
          waktuMasuk: { gte: today },
          waktuKeluar: null,
        },
      });

      if (existingPresensi) {
        return this.prisma.presensi.update({
          where: { id: existingPresensi.id },
          data: { 
            waktuKeluar: new Date(),
            // Opsional: Update lokasi terakhir saat keluar
            latitude: dto.latitude,
            longitude: dto.longitude,
          },
        });
      }
    }

    // 2. Logika untuk Absen MASUK (Default)
    return this.prisma.presensi.create({
      data: {
        userId: Number(dto.userId),
        latitude: dto.latitude,
        longitude: dto.longitude,
        status: "HADIR",
        fotoUrl: dto.fotoUrl || "",
        // waktuMasuk akan terisi otomatis secara default dari schema
      },
    });
  }

  // Mengambil semua riwayat untuk monitoring di Flutter
  async findAll() {
    return this.prisma.presensi.findMany({
      include: { 
        user: {
          select: {
            nama: true,
            email: true,
          }
        } 
      },
      orderBy: { waktuMasuk: 'desc' },
    });
  }
}