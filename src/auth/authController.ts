import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  // 1. Cari user berdasarkan email
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    return res.status(404).json({ message: "User tidak ditemukan" });
  }

  // 2. Bandingkan password asli dengan HASH di database
  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.status(401).json({ message: "Password salah" });
  }

  // 3. Jika benar, beri respon sukses (atau token)
  res.json({ message: "Login Berhasil", user });
};