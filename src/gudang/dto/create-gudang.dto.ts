export class CreateGudangDto {
  namaBarang!: string;
  kodeBarang!: string;
  stok!: number;
  kategori!: string; // Pakai tanda seru (!) agar TypeScript yakin ini tidak kosong
  harga: number;
  batasMinimum: number;
}