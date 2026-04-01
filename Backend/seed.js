const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  // HAPUS DATA LAMA (opsional tapi aman)
  await prisma.achievement.deleteMany()

  // INSERT DATA BARU
  await prisma.achievement.createMany({
    data: [
      {
        title: 'Web Development Certificate',
        description: 'Sertifikat pengembangan website modern.',
        year: 2024,
        image: '/certificates/web-dev.jpg',
      },
      {
        title: 'Frontend Developer',
        description: 'Mempelajari HTML, CSS, dan JavaScript.',
        year: 2023,
        image: '/certificates/frontend.jpg',
      },
      {
        title: 'Laravel Fundamental',
        description: 'Membangun aplikasi web menggunakan Laravel.',
        year: 2025,
        image: '/certificates/laravel.jpg',
      },
      {
        title: 'Content Writing Internship',
        description: 'Pengalaman magang sebagai content writer.',
        year: 2023,
        image: '/certificates/content.jpg',
      },
    ],
  })

  console.log('✅ Achievement seed berhasil')
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect()
  })
