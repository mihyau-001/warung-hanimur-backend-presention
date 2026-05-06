export class CreatePresensiDto {
  userId!: number;
  latitude!: number;
  longitude!: number;
  tipe!: 'MASUK' | 'KELUAR';
  fotoUrl?: string; // Tanda tanya (?) karena foto sifatnya opsional
}