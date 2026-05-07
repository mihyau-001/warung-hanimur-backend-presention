import { PrismaService } from '../prisma/prisma.service';
import { CreateGudangDto } from './dto/create-gudang.dto';
import { UpdateGudangDto } from './dto/update-gudang.dto';
export declare class GudangService {
    private prisma;
    constructor(prisma: PrismaService);
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
    prosesBarangMasuk(data: any): Promise<{
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
    prosesBarangKeluar(data: any): Promise<{
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
    findAll(): Promise<{
        riwayatStok: {
            id: number;
            status: import(".prisma/client").$Enums.StatusStok;
            createdAt: Date;
            barangId: number;
            tipe: import(".prisma/client").$Enums.TipeMutasi;
            jumlah: number;
            noTransaksi: string;
            keterangan: string | null;
        }[];
        id: number;
        namaBarang: string;
        stok: number;
        batasMinimum: number;
    }[]>;
    getLaporan(filter: {
        start: string;
        end: string;
    }): Promise<({
        barang: {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            namaBarang: string;
            kodeBarang: string;
            stok: number;
            kategori: string | null;
            harga: number;
            batasMinimum: number;
        };
    } & {
        id: number;
        status: import(".prisma/client").$Enums.StatusStok;
        createdAt: Date;
        barangId: number;
        tipe: import(".prisma/client").$Enums.TipeMutasi;
        jumlah: number;
        noTransaksi: string;
        keterangan: string | null;
    })[]>;
    getStrukData(noTransaksi: string): Promise<({
        barang: {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            namaBarang: string;
            kodeBarang: string;
            stok: number;
            kategori: string | null;
            harga: number;
            batasMinimum: number;
        };
    } & {
        id: number;
        status: import(".prisma/client").$Enums.StatusStok;
        createdAt: Date;
        barangId: number;
        tipe: import(".prisma/client").$Enums.TipeMutasi;
        jumlah: number;
        noTransaksi: string;
        keterangan: string | null;
    }) | null>;
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
