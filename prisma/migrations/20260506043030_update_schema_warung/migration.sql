-- DropForeignKey
ALTER TABLE "Presensi" DROP CONSTRAINT "Presensi_userId_fkey";

-- DropForeignKey
ALTER TABLE "RiwayatStok" DROP CONSTRAINT "RiwayatStok_barangId_fkey";

-- AlterTable
ALTER TABLE "Barang" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "harga" INTEGER NOT NULL DEFAULT 0,
ALTER COLUMN "kategori" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Presensi" ALTER COLUMN "fotoUrl" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Presensi" ADD CONSTRAINT "Presensi_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RiwayatStok" ADD CONSTRAINT "RiwayatStok_barangId_fkey" FOREIGN KEY ("barangId") REFERENCES "Barang"("id") ON DELETE CASCADE ON UPDATE CASCADE;
