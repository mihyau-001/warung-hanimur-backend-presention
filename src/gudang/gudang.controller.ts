import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  Patch, 
  Param, 
  Delete, 
  ParseIntPipe,
  Query
} from '@nestjs/common';
import { GudangService } from './gudang.service';
import { CreateGudangDto } from './dto/create-gudang.dto';
import { UpdateGudangDto } from './dto/update-gudang.dto';

@Controller('gudang')
export class GudangController {
  constructor(private readonly gudangService: GudangService) {}

  // 1. Pendaftaran Barang Baru (Admin/Owner)
  @Post()
  create(@Body() createGudangDto: CreateGudangDto) {
    return this.gudangService.create(createGudangDto);
  }

  // 2. Endpoint Barang Masuk (Purchasing/Owner)
  // Digunakan setelah pembayaran berhasil dikonfirmasi
  @Post('barang-masuk')
  async barangMasuk(@Body() data: { 
    namaBarang: string; 
    jumlah: number; 
    noTransaksi: string; 
    catatanBelanja?: string 
  }) {
    return this.gudangService.prosesBarangMasuk(data);
  }

  // 3. Endpoint Barang Keluar (Maker/Karyawan)
  // Digunakan untuk mencatat daftar belanja atau pengeluaran barang
  @Post('barang-keluar')
  async barangKeluar(@Body() data: { 
    namaBarang: string; 
    jumlah: number; 
    noTransaksi: string 
  }) {
    return this.gudangService.prosesBarangKeluar(data);
  }

  // 4. Ketersediaan Stok (Menu Utama)
  @Get()
  findAll() {
    return this.gudangService.findAll();
  }

  // 5. Laporan Harian & Bulanan (Owner)
  // Query param contoh: ?start=2026-05-01&end=2026-05-31
  @Get('laporan')
  getLaporan(
    @Query('start') start: string, 
    @Query('end') end: string
  ) {
    return this.gudangService.getLaporan({ start, end });
  }

  // 6. Data Struk untuk Printer Thermal 80mm
  @Get('struk/:noTransaksi')
  getStruk(@Param('noTransaksi') noTransaksi: string) {
    return this.gudangService.getStrukData(noTransaksi);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.gudangService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number, 
    @Body() updateGudangDto: UpdateGudangDto
  ) {
    return this.gudangService.update(id, updateGudangDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.gudangService.remove(id);
  }
}