import { GudangService } from './gudang.service';
import { CreateGudangDto } from './dto/create-gudang.dto';
import { UpdateGudangDto } from './dto/update-gudang.dto';
export declare class GudangController {
    private readonly gudangService;
    constructor(gudangService: GudangService);
    create(createGudangDto: CreateGudangDto): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        namaBarang: string;
        kodeBarang: string;
        stok: number;
        kategori: string | null;
        harga: number;
        batasMinimum: number;
    }>;
    barangMasuk(data: any): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        namaBarang: string;
        kodeBarang: string;
        stok: number;
        kategori: string | null;
        harga: number;
        batasMinimum: number;
    }>;
    findAll(): Promise<({
        riwayatStok: {
            id: number;
            createdAt: Date;
            barangId: number;
            tipe: import("@prisma/client").$Enums.TipeMutasi;
            jumlah: number;
            keterangan: string | null;
        }[];
    } & {
        id: number;
        createdAt: Date;
        updatedAt: Date;
        namaBarang: string;
        kodeBarang: string;
        stok: number;
        kategori: string | null;
        harga: number;
        batasMinimum: number;
    })[]>;
    findOne(id: number): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        namaBarang: string;
        kodeBarang: string;
        stok: number;
        kategori: string | null;
        harga: number;
        batasMinimum: number;
    }>;
    update(id: number, updateGudangDto: UpdateGudangDto): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        namaBarang: string;
        kodeBarang: string;
        stok: number;
        kategori: string | null;
        harga: number;
        batasMinimum: number;
    }>;
    remove(id: number): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        namaBarang: string;
        kodeBarang: string;
        stok: number;
        kategori: string | null;
        harga: number;
        batasMinimum: number;
    }>;
}
