import { 
  Controller, 
  Post, 
  Body, 
  Get, 
  UseInterceptors, 
  UploadedFile 
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { PresensiService } from './presensi.service';
import { CreatePresensiDto } from './dto/create-presensi.dto';

@Controller('presensi')
export class PresensiController {
  constructor(private readonly presensiService: PresensiService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('foto', { 
      storage: diskStorage({
        destination: './uploads/presensi', 
        filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, `presensi-${uniqueSuffix}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body() createPresensiDto: CreatePresensiDto,
  ) {
    // FIKS: Gunakan undefined jika file kosong agar sesuai dengan tipe DTO (string | undefined)
    // Ini memperbaiki error "Type 'null' is not assignable" pada gambar image_760477.png
    const fotoUrl = file ? file.path : undefined;

    // Kirim data ke service
    return this.presensiService.create({
      ...createPresensiDto,
      fotoUrl: fotoUrl, // FIKS: Perbaikan sintaks penulisan properti objek
    });
  }

  @Get()
  findAll() {
    return this.presensiService.findAll();
  }
}