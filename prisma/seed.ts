import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Membuat user Admin pertama
  const admin = await prisma.user.upsert({
    where: { email: 'admin@hanimur.com' },
    update: {},
    create: {
      email: 'admin@hanimur.com',
      nama: 'Ihya Admin',
      password: 'password123', // Nanti bisa kita enkripsi, sementara plain dulu
      role: 'ADMIN',
    },
  });

  console.log({ admin });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });