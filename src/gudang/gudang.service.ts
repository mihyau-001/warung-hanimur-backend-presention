import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateGudangDto } from './dto/create-gudang.dto';
import { UpdateGudangDto } from './dto/update-gudang.dto';

@Injectable()
export class GudangService {
  constructor(private prisma: PrismaService) {}

  // 1. MAKER: Membuat Barang Baru
  async create(createGudangDto: CreateGudangDto) {
    return this.prisma.barang.create({
      data: {
        ...createGudangDto,
        batasMinimum: createGudangDto.batasMinimum || 5,
      },
    });
  }

  // 2. ALUR BARANG MASUK (Owner/Purchasing)
  async prosesBarangMasuk(data: any) {
    return this.prisma.$transaction(async (tx) => {
      const barang = await tx.barang.findFirst({
        where: { namaBarang: data.namaBarang },
      });

      if (!barang) throw new NotFoundException(`Barang ${data.namaBarang} tidak ditemukan`);

      const updatedBarang = await tx.barang.update({
        where: { id: barang.id },
        data: { stok: { increment: data.jumlah } },
      });

      // FIKS: Menambahkan noTransaksi dan Status sesuai skema baru
      await tx.riwayatStok.create({
        data: {
          barangId: barang.id,
          jumlah: data.jumlah,
          tipe: 'MASUK',
          noTransaksi: data.noTransaksi || `IN-${Date.now()}`, 
          status: 'COMPLETED', // Langsung selesai karena ini barang masuk/purchasing
          keterangan: `Note: ${data.catatanBelanja || 'Tanpa catatan'}`,
        },
      });

      return updatedBarang;
    });
  }

  // 3. ALUR BARANG KELUAR (Maker/Karyawan)
  async prosesBarangKeluar(data: any) {
    return this.prisma.$transaction(async (tx) => {
      const barang = await tx.barang.findFirst({
        where: { namaBarang: data.namaBarang },
      });

      if (!barang || barang.stok < data.jumlah) {
        throw new ForbiddenException('Stok tidak mencukupi atau barang tidak ada');
      }

      const updatedBarang = await tx.barang.update({
        where: { id: barang.id },
        data: { stok: { decrement: data.jumlah } },
      });

      // FIKS: Menambahkan noTransaksi dan Status PENDING untuk alur Maker
      await tx.riwayatStok.create({
        data: {
          barangId: barang.id,
          jumlah: data.jumlah,
          tipe: 'KELUAR',
          noTransaksi: data.noTransaksi || `OUT-${Date.now()}`,
          status: 'PENDING', // Butuh approval Owner nanti
          keterangan: data.keterangan || 'Barang Keluar',
        },
      });

      return updatedBarang;
    });
  }

  // 4. KETERSEDIAAN STOK
  async findAll() {
    return this.prisma.barang.findMany({
      orderBy: { namaBarang: 'asc' },
      select: {
        id: true,
        namaBarang: true,
        stok: true,
        batasMinimum: true,
        riwayatStok: {
          take: 5,
          orderBy: { createdAt: 'desc' }
        }
      }
    });
  }

  // 5. LAPORAN (Harian & Bulanan)
  async getLaporan(filter: { start: string; end: string }) {
    return this.prisma.riwayatStok.findMany({
      where: {
        createdAt: {
          gte: new Date(filter.start),
          lte: new Date(filter.end),
        },
      },
      include: { barang: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  // 6. DATA UNTUK STRUK (Thermal 80mm)
  async getStrukData(noTransaksi: string) {
    // FIKS: Mencari langsung berdasarkan kolom noTransaksi yang sudah @unique
    return this.prisma.riwayatStok.findUnique({
      where: { noTransaksi: noTransaksi },
      include: { barang: true },
    });
  }

  async findOne(id: number) {
    const barang = await this.prisma.barang.findUnique({ where: { id } });
    if (!barang) throw new NotFoundException('Barang tidak ditemukan');
    return barang;
  }

  async update(id: number, updateGudangDto: UpdateGudangDto) {
    return this.prisma.barang.update({
      where: { id },
      data: updateGudangDto,
    });
  }

  async remove(id: number) {
    await this.prisma.riwayatStok.deleteMany({ where: { barangId: id } });
    return this.prisma.barang.delete({ where: { id } });
  }
}