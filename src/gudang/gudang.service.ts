import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateGudangDto } from './dto/create-gudang.dto';
import { UpdateGudangDto } from './dto/update-gudang.dto';

@Injectable()
export class GudangService {
  constructor(private prisma: PrismaService) {}

  // 1. Membuat Barang Baru
  async create(createGudangDto: CreateGudangDto) {
    return this.prisma.barang.create({
      data: {
        ...createGudangDto,
        batasMinimum: createGudangDto.batasMinimum || 5,
      },
    });
  }

  // 2. FIKS: Logika Barang Masuk (Update Stok & Catat Riwayat)
  async prosesBarangMasuk(data: any) {
    return this.prisma.$transaction(async (tx) => {
      // Cari barang berdasarkan nama (sesuai input dari Flutter)
      const barang = await tx.barang.findFirst({
        where: { namaBarang: data.namaBarang },
      });

      if (!barang) {
        throw new NotFoundException(`Barang ${data.namaBarang} tidak ditemukan`);
      }

      // Update jumlah stok di tabel Barang
      const updatedBarang = await tx.barang.update({
        where: { id: barang.id },
        data: { stok: { increment: data.jumlah } },
      });

      // Catat mutasi ke tabel RiwayatStok
      await tx.riwayatStok.create({
        data: {
          barangId: barang.id,
          jumlah: data.jumlah,
          tipe: 'MASUK',
          keterangan: `Nomor Transaksi: ${data.noTransaksi}`,
        },
      });

      return updatedBarang;
    });
  }

  // 3. Mengambil Semua Stok Barang
  async findAll() {
    return this.prisma.barang.findMany({
      orderBy: { createdAt: 'desc' },
      include: { riwayatStok: true }, // Menampilkan riwayat jika dibutuhkan
    });
  }

  // 4. Mengambil Satu Barang berdasarkan ID
  async findOne(id: number) {
    const barang = await this.prisma.barang.findUnique({
      where: { id },
    });
    if (!barang) throw new NotFoundException('Barang tidak ditemukan');
    return barang;
  }

  // 5. Update Data Barang (Patch)
  async update(id: number, updateGudangDto: UpdateGudangDto) {
    return this.prisma.barang.update({
      where: { id },
      data: updateGudangDto,
    });
  }

  // 6. Hapus Barang
  async remove(id: number) {
    // Menghapus riwayat terkait dulu agar tidak error constraint (optional)
    await this.prisma.riwayatStok.deleteMany({ where: { barangId: id } });
    return this.prisma.barang.delete({
      where: { id },
    });
  }
}