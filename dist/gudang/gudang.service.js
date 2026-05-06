"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GudangService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let GudangService = class GudangService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createGudangDto) {
        return this.prisma.barang.create({
            data: {
                ...createGudangDto,
                batasMinimum: createGudangDto.batasMinimum || 5,
            },
        });
    }
    async prosesBarangMasuk(data) {
        return this.prisma.$transaction(async (tx) => {
            const barang = await tx.barang.findFirst({
                where: { namaBarang: data.namaBarang },
            });
            if (!barang) {
                throw new common_1.NotFoundException(`Barang ${data.namaBarang} tidak ditemukan`);
            }
            const updatedBarang = await tx.barang.update({
                where: { id: barang.id },
                data: { stok: { increment: data.jumlah } },
            });
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
    async findAll() {
        return this.prisma.barang.findMany({
            orderBy: { createdAt: 'desc' },
            include: { riwayatStok: true },
        });
    }
    async findOne(id) {
        const barang = await this.prisma.barang.findUnique({
            where: { id },
        });
        if (!barang)
            throw new common_1.NotFoundException('Barang tidak ditemukan');
        return barang;
    }
    async update(id, updateGudangDto) {
        return this.prisma.barang.update({
            where: { id },
            data: updateGudangDto,
        });
    }
    async remove(id) {
        await this.prisma.riwayatStok.deleteMany({ where: { barangId: id } });
        return this.prisma.barang.delete({
            where: { id },
        });
    }
};
exports.GudangService = GudangService;
exports.GudangService = GudangService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], GudangService);
//# sourceMappingURL=gudang.service.js.map