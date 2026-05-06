import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  Patch, 
  Param, 
  Delete, 
  ParseIntPipe 
} from '@nestjs/common';
import { GudangService } from './gudang.service';
import { CreateGudangDto } from './dto/create-gudang.dto';
import { UpdateGudangDto } from './dto/update-gudang.dto';

@Controller('gudang')
export class GudangController {
  constructor(private readonly gudangService: GudangService) {}

  @Post()
  create(@Body() createGudangDto: CreateGudangDto) {
    // Digunakan untuk pendaftaran barang baru pertama kali
    return this.gudangService.create(createGudangDto);
  }

  // --- FIKS: Tambahkan endpoint untuk Barang Masuk ---
  @Post('barang-masuk')
  async barangMasuk(@Body() data: any) {
    // Menerima data noTransaksi, namaBarang, dan jumlah dari Flutter
    return this.gudangService.prosesBarangMasuk(data);
  }

  @Get()
  findAll() {
    // Menampilkan semua stok barang di Warung Hanimur
    return this.gudangService.findAll();
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
    // Update stok manual atau koreksi data barang
    return this.gudangService.update(id, updateGudangDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.gudangService.remove(id);
  }
}