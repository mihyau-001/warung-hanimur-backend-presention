import { PresensiService } from './presensi.service';
import { CreatePresensiDto } from './dto/create-presensi.dto';
export declare class PresensiController {
    private readonly presensiService;
    constructor(presensiService: PresensiService);
    create(file: Express.Multer.File, createPresensiDto: CreatePresensiDto): Promise<{
        id: number;
        userId: number;
        waktuMasuk: Date;
        waktuKeluar: Date | null;
        latitude: number;
        longitude: number;
        akurasi: number | null;
        fotoUrl: string | null;
        status: string;
    }>;
    findAll(): Promise<({
        user: {
            nama: string;
            email: string;
        };
    } & {
        id: number;
        userId: number;
        waktuMasuk: Date;
        waktuKeluar: Date | null;
        latitude: number;
        longitude: number;
        akurasi: number | null;
        fotoUrl: string | null;
        status: string;
    })[]>;
}
