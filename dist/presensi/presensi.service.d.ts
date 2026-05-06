import { PrismaService } from '../prisma/prisma.service';
import { CreatePresensiDto } from './dto/create-presensi.dto';
export declare class PresensiService {
    private prisma;
    constructor(prisma: PrismaService);
    create(dto: CreatePresensiDto): Promise<{
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
