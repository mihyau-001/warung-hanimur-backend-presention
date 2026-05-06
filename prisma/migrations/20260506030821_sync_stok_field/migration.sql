/*
  Warnings:

  - You are about to drop the column `stokSaatIni` on the `Barang` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Barang" DROP COLUMN "stokSaatIni",
ADD COLUMN     "stok" INTEGER NOT NULL DEFAULT 0;
