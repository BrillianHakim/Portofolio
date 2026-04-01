const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcrypt')

const prisma = new PrismaClient()

async function main() {
  const hashedPassword = await bcrypt.hash('Bintang12#', 10)

  await prisma.user.upsert({
    where: { email: 'bintangbrillianhakim@gmail.com' },
    update: {
      password: hashedPassword,
    },
    create: {
      email: 'bintangbrillianhakim@gmail.com',
      password: hashedPassword,
    },
  })

  console.log('✅ Admin upserted')
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect()
  })