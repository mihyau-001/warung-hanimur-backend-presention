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
exports.PresensiService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let PresensiService = class PresensiService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(dto) {
        if (dto.tipe === 'KELUAR') {
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            const existingPresensi = await this.prisma.presensi.findFirst({
                where: {
                    userId: dto.userId,
                    waktuMasuk: { gte: today },
                    waktuKeluar: null,
                },
            });
            if (existingPresensi) {
                return this.prisma.presensi.update({
                    where: { id: existingPresensi.id },
                    data: {
                        waktuKeluar: new Date(),
                        latitude: dto.latitude,
                        longitude: dto.longitude,
                    },
                });
            }
        }
        return this.prisma.presensi.create({
            data: {
                userId: Number(dto.userId),
                latitude: dto.latitude,
                longitude: dto.longitude,
                status: "HADIR",
                fotoUrl: dto.fotoUrl || "",
            },
        });
    }
    async findAll() {
        return this.prisma.presensi.findMany({
            include: {
                user: {
                    select: {
                        nama: true,
                        email: true,
                    }
                }
            },
            orderBy: { waktuMasuk: 'desc' },
        });
    }
};
exports.PresensiService = PresensiService;
exports.PresensiService = PresensiService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PresensiService);
//# sourceMappingURL=presensi.service.js.map